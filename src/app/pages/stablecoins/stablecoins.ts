import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'stablecoins',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stablecoins.html'
})
export class Stablecoins implements OnInit {
  stablecoins: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStablecoins();
  }

  loadStablecoins() {
    this.http
      .get<any[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=50&page=1'
      )
      .subscribe({
        next: (data) => {
          this.stablecoins = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando stablecoins', err);
          this.loading = false;
        }
      });
  }
}
