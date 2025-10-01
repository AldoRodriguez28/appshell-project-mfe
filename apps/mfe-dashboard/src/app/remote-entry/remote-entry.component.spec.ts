import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteEntryComponent } from './remote-entry.component';

describe('RemoteEntryComponent (Dashboard)', () => {
  let component: RemoteEntryComponent;
  let fixture: ComponentFixture<RemoteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteEntryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the dashboard title', () => {
    const textContent = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(textContent).toContain('Dashboard');
  });
});
