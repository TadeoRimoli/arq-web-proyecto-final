import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../services/binance';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './market.html'
})
export class Market implements OnInit {
  prices: any[] = [];
  loading = true;

  constructor(private binance: BinanceService) {}

  ngOnInit() {
    this.binance.getLivePrices(5000).subscribe({
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
}
