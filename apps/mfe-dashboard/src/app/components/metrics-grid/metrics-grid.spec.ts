import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsGrid } from './metrics-grid';

describe('MetricsGrid', () => {
  let component: MetricsGrid;
  let fixture: ComponentFixture<MetricsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsGrid);
    component = fixture.componentInstance;
    component.metrics = [{ title: 'Test', value: '1', trend: '+1%', trendColor: 'positive' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
