import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContentComponent } from './dashboard-content';

describe('DashboardContentComponent', () => {
  let component: DashboardContentComponent;
  let fixture: ComponentFixture<DashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the dashboard title', () => {
    const heading = fixture.nativeElement.querySelector('p');
    expect(heading?.textContent).toContain('Dashboard');
  });
});
