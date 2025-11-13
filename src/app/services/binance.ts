import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  private baseUrl = 'https://api.binance.com/api/v3';

  constructor(private http: HttpClient) {}

  /** Precio actual de un símbolo (ej: BTCUSDT) */
  getPrice(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ticker/price?symbol=${symbol}`);
  }

  /** Lista de precios de todos los símbolos */
  getAllPrices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ticker/price`);
  }

  /** Precios actualizados cada X segundos */
  getLivePrices(intervalMs: number = 5000): Observable<any[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getAllPrices())
    );
  }
}
