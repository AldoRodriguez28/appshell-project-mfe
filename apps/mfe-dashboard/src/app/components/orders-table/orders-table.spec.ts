import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTable } from './orders-table';

describe('OrdersTable', () => {
  let component: OrdersTable;
  let fixture: ComponentFixture<OrdersTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTable);
    component = fixture.componentInstance;
    component.orders = [{ customer: 'Cliente', status: 'Iniciada', statusVariant: 'gradient', folio: '#1', date: '01-01-2025' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
