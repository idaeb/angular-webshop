import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OrderManagementComponent} from './order-management.component';
import {Observable, of} from 'rxjs';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

describe('OrderManagementComponent', () => {
  let component: OrderManagementComponent;
  let fixture: ComponentFixture<OrderManagementComponent>;

  const mockOrderService = {
    getOrders: jasmine.createSpy('getOrders').and.returnValue(of([])),
    deleteOrder: jasmine.createSpy('deleteOrder').and.returnValue(new Observable()),
    updateOrder: jasmine.createSpy('updateOrder').and.returnValue(new Observable())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderManagementComponent],
      providers: [{provide: OrderService, useValue: mockOrderService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockOrderService.getOrders).toHaveBeenCalled();
  });

  it('should not delete the user if the user cancels the confirm dialogue', () => {
    // Mock the user not confirming the action
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteOrder(1);

    expect(mockOrderService.deleteOrder).toHaveBeenCalledTimes(0);
  });

  it('should delete the order', () => {
    // Mock the user confirming the action
    spyOn(window, 'confirm').and.returnValue(true);

    component.deleteOrder(1);

    expect(mockOrderService.deleteOrder).toHaveBeenCalledWith(1);
  });

  it('should ship the order', () => {
    const order: Order = {
      id: 2,
      totalPrice: 200,
      orderRows: [],
      status: 0,
      paymentMethod: 'KORT',
      createdBy: 'testbot',
      created: '2019-06-02 17:26:00',
      companyId: 24
    };

    component.shipOrder(order);
    expect(order.status).toEqual(1);
    expect(mockOrderService.updateOrder).toHaveBeenCalledWith(order);
  });

  it('should get the order status', () => {
    expect(component.getOrderStatus(0)).toEqual('Packaged');
    expect(component.getOrderStatus(1)).toEqual('Shipped');
    expect(component.getOrderStatus(3)).toEqual('3');
  });
});
