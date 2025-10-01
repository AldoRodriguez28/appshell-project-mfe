import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteEntryComponent } from './remote-entry.component';

describe('RemoteEntryComponent (IAM)', () => {
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

  it('renders the member list', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBeGreaterThan(0);
  });
});
