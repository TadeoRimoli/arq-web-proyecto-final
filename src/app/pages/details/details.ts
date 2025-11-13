import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BinanceService } from '../../services/binance';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html'
})
export class Details implements OnInit {
  symbol!: string;
  priceData: any = null;

  constructor(
    private route: ActivatedRoute,
    private binance: BinanceService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol')!;
    this.binance.getPrice(this.symbol).subscribe(data => {
      this.priceData = data;
    });
  }
}
