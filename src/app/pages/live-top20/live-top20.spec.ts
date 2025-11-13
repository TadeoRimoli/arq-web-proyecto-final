import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTop20 } from './live-top20';

describe('LiveTop20', () => {
  let component: LiveTop20;
  let fixture: ComponentFixture<LiveTop20>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTop20]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTop20);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
