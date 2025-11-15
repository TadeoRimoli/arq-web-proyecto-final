import { Component, OnDestroy, OnInit } from '@angular/core';
import { BinanceService } from '../../services/binance';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './market.html'
})
export class Market implements OnInit, OnDestroy {
  prices: any[] = [];
  loading = true;
  private pricesSub?: Subscription;

  constructor(private binance: BinanceService) {}

  ngOnInit() {
    this.pricesSub = this.binance.getLivePrices(5000).subscribe({
      next: (data) => {
        this.prices = data.filter(p => p.symbol.endsWith('USDT')).slice(0, 20);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.pricesSub?.unsubscribe();
  }
}
