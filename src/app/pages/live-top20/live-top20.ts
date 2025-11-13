import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface CGCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface BinanceTickerMsg {
  data: {
    e: string;
    s: string; // symbol e.g. BTCUSDT
    c: string; // last price
    P: string; // price change percent
    q: string; // volume
  };
  stream?: string;
}

@Component({
  selector: 'live-top20',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-top20.html'
})
export class LiveTop20 implements OnInit, OnDestroy {
  cryptos: CGCoin[] = [];
  loading = true;
  private ws?: WebSocket;
  private reconnectTimer?: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTop20AndConnect();
  }

  ngOnDestroy(): void {
    this.closeSocket();
    clearTimeout(this.reconnectTimer);
  }

  private loadTop20AndConnect(): void {
    this.loading = true;
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';

    this.http.get<CGCoin[]>(url).subscribe({
      next: (data) => {
        // normalizamos algunos campos que usaremos
        this.cryptos = data.map((c) => ({
          id: c.id,
          symbol: c.symbol.toUpperCase(),
          name: c.name,
          image: c.image,
          current_price: c.current_price,
          market_cap: c.market_cap,
          price_change_percentage_24h: c.price_change_percentage_24h
        }));

        this.loading = false;
        this.connectBinanceSocket();
      },
      error: (err) => {
        console.error('Error fetching top20 from CoinGecko', err);
        this.loading = false;
      }
    });
  }

  private buildStreams(): string[] {
    // intentamos symbol + USDT. Si un símbolo contiene caracteres raros, lo ignoramos.
    const streams: string[] = [];
    for (const c of this.cryptos) {
      const candidate = `${c.symbol}USDT`.toLowerCase();
      // símbolo simple: letras y números
      if (/^[a-z0-9]+$/.test(candidate)) {
        streams.push(`${candidate}@ticker`);
      }
    }
    return streams;
  }

  private connectBinanceSocket(): void {
    this.closeSocket();

    const streams = this.buildStreams();
    if (streams.length === 0) {
      console.warn('No valid streams to subscribe');
      return;
    }

    // Binance acepta hasta cierto largo, pero 20 streams está OK.
    const streamPath = streams.join('/');
    const url = `wss://stream.binance.com:9443/stream?streams=${streamPath}`;

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('Binance WS connected');
    };

    this.ws.onmessage = (ev) => {
      try {
        const msg: BinanceTickerMsg = JSON.parse(ev.data);
        const d = msg.data;
        if (!d || !d.s) return;

        const symbol = d.s.replace('USDT', '');
        const price = parseFloat(d.c);
        const percent = parseFloat(d.P);

        // buscar por symbol (mayúsculas)
        const idx = this.cryptos.findIndex((c) => c.symbol === symbol);
        if (idx !== -1) {
          const updated = { ...this.cryptos[idx] };
          updated.current_price = price;
          updated.price_change_percentage_24h = Number.isFinite(percent) ? percent : updated.price_change_percentage_24h;
          // actualizar in-place pero re-asignar array para disparar render
          this.cryptos[idx] = updated;
          this.cryptos = [...this.cryptos];
        }
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    this.ws.onclose = (ev) => {
      console.warn('Binance WS closed', ev);
      // reconectar después de 2s
      this.reconnectTimer = setTimeout(() => this.connectBinanceSocket(), 2000);
    };

    this.ws.onerror = (err) => {
      console.error('Binance WS error', err);
      // cerrar para activar onclose y reconexión
      try { this.ws?.close(); } catch {}
    };
  }

  private closeSocket(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.ws = undefined;
  }
}
