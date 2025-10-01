import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteEntryComponent } from './remote-entry.component';

describe('RemoteEntryComponent (Tasks)', () => {
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

  it('lists task rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
