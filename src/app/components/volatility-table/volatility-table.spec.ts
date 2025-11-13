import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolatilityTable } from './volatility-table';

describe('VolatilityTable', () => {
  let component: VolatilityTable;
  let fixture: ComponentFixture<VolatilityTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolatilityTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolatilityTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
