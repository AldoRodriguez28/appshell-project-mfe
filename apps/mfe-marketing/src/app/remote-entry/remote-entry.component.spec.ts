import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteEntryComponent } from './remote-entry.component';

describe('RemoteEntryComponent (Marketing)', () => {
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

  it('renders campaign cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('ui-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});
