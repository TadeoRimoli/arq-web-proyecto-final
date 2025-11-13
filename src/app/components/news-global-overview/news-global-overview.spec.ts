import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsGlobalOverview } from './news-global-overview';

describe('NewsGlobalOverview', () => {
  let component: NewsGlobalOverview;
  let fixture: ComponentFixture<NewsGlobalOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsGlobalOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsGlobalOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
