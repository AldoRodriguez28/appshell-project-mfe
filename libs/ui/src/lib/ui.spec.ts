import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon/icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.name = 'menu';
    fixture.detectChanges();
  });

  it('renders the requested name', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span?.textContent?.trim()).toBe('menu');
  });
});
