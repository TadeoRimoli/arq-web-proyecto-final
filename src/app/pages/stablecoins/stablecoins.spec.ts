import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stablecoins } from './stablecoins';

describe('Stablecoins', () => {
  let component: Stablecoins;
  let fixture: ComponentFixture<Stablecoins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stablecoins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stablecoins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
