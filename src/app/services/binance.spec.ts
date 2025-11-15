import { TestBed } from '@angular/core/testing';

import { BinanceService } from './binance';

describe('Binance', () => {
  let service: BinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
