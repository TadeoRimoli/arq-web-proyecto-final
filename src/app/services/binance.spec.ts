import { TestBed } from '@angular/core/testing';

import { Binance } from './binance';

describe('Binance', () => {
  let service: Binance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Binance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
