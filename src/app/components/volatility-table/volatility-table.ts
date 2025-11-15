import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
}

@Component({
  selector: 'volatility-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volatility-table.html',
})
export class VolatilityTable implements OnInit, OnDestroy {
  cryptos: Crypto[] = [];
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  private intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
    this.intervalId = setInterval(() => this.fetchData(), 60000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  fetchData() {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<Crypto[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe({
        next: (data) => {
          const sorted = data
            .sort(
              (a, b) =>
                Math.abs(b.price_change_percentage_24h) -
                Math.abs(a.price_change_percentage_24h)
            )
            .slice(0, 20);
          this.cryptos = sorted;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching data:', err);
          this.loading.set(false);
          this.error.set(err?.message ?? 'No se pudo obtener la información de las criptomonedas. Intenta nuevamente más tarde.');
          return of({
            cryptos: [],
            loading: false,
            error: err?.message ?? 'No se pudo obtener la información de las criptomonedas. Intenta nuevamente más tarde.',
          });
        }
      });
  }
}
