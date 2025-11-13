import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, interval, map, of, Subscription } from 'rxjs';

interface GlobalData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  totalCryptos: number;
  totalExchanges: number;
}

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb?: string;
  price?: number;
}

interface FearGreedIndex {
  value: number;
  classification: string;
  date: string;
}

@Component({
  selector: 'news-global-overview',
  templateUrl: './news-global-overview.html',
  standalone: true,
  imports: [CommonModule],
})
export class NewsGlobalOverview implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;

  globalData: GlobalData | null = null;
  trendingCoins: TrendingCoin[] = [];
  fearGreedIndex: FearGreedIndex | null = null;

  private refreshSub?: Subscription;
  private readonly refreshEveryMs = 5 * 60 * 1000;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
    this.refreshSub = interval(this.refreshEveryMs).subscribe(() => this.loadData());
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  loadData() {
    this.loading = true;
    this.error = null;

    const global$ = this.http.get<any>('https://api.coingecko.com/api/v3/global').pipe(
      map((response) => {
        const data = response?.data ?? {};
        return {
          totalMarketCap: data.total_market_cap?.usd ?? 0,
          totalVolume24h: data.total_volume?.usd ?? 0,
          btcDominance: data.market_cap_percentage?.btc ?? 0,
          ethDominance: data.market_cap_percentage?.eth ?? 0,
          totalCryptos: data.active_cryptocurrencies ?? 0,
          totalExchanges: data.active_exchanges ?? 0,
        } as GlobalData;
      })
    );

    const trending$ = this.http.get<any>('https://api.coingecko.com/api/v3/search/trending').pipe(
      map((response) => {
        const coins = response?.coins ?? [];
        return coins.slice(0, 6).map((entry: any) => {
          const item = entry?.item ?? entry;
          const price = Number(item?.data?.price ?? item?.price);
          const fallbackId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
          return {
            id: item?.id ?? (globalThis.crypto?.randomUUID?.() ?? fallbackId),
            name: item?.name ?? item?.id ?? 'N/A',
            symbol: (item?.symbol ?? '').toUpperCase(),
            thumb: item?.thumb,
            price: Number.isFinite(price) ? price : undefined,
          } as TrendingCoin;
        });
      })
    );

    const fearGreed$ = this.http.get<any>('https://api.alternative.me/fng/').pipe(
      map((response) => {
        const entry = response?.data?.[0];
        if (!entry) {
          return null;
        }
        return {
          value: Number(entry.value),
          classification: entry.value_classification,
          date: new Date(Number(entry.timestamp) * 1000).toLocaleDateString(),
        } as FearGreedIndex;
      })
    );

    forkJoin({
      global: global$,
      trending: trending$,
      fearGreed: fearGreed$,
    })
      .pipe(
        catchError((err) => {
          console.error('Error fetching overview data', err);
          this.error =
            err?.message ??
            'No se pudo obtener la información del mercado. Intenta nuevamente más tarde.';
          return of({
            global: null,
            trending: [],
            fearGreed: null,
          });
        })
      )
      .subscribe(({ global, trending, fearGreed }) => {
        this.globalData = global;
        this.trendingCoins = trending ?? [];
        this.fearGreedIndex = fearGreed;
        this.loading = false;
      });
  }

  getFearGreedColor(value: number) {
    if (value < 25) return 'text-red-500 bg-red-500/10';
    if (value < 45) return 'text-orange-500 bg-orange-500/10';
    if (value < 55) return 'text-yellow-500 bg-yellow-500/10';
    if (value < 75) return 'text-green-500 bg-green-500/10';
    return 'text-green-600 bg-green-600/10';
  }
}
