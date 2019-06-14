import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CheckoutComponent} from './checkout.component';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {OrderService} from '../../services/order.service';
import {RouterTestingModule} from '@angular/router/testing';
import {CartService} from '../../services/cart.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockOrderService;
  let mockCartService;

  beforeEach(async(() => {
    mockOrderService = {
      createOrder: jasmine.createSpy('createOrder').and.returnValue(new Observable())
    };
    mockCartService = {
      getCart: jasmine.createSpy('getCart').and.returnValue([]),
      emptyCart: jasmine.createSpy('emptyCart'),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      getTotalPrice: jasmine.createSpy('getTotalPrice')
    };

    TestBed.configureTestingModule({
      declarations: [
        CheckoutComponent,
        MockComponent(SidebarComponent)
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: OrderService, useValue: mockOrderService},
        {provide: CartService, useValue: mockCartService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockCartService.getCart).toHaveBeenCalled();
    expect(mockCartService.getTotalPrice).toHaveBeenCalled();
  });

  it('should create the order', () => {
    component.onSubmit();
    expect(mockOrderService.createOrder).toHaveBeenCalled();
    // could not make emptyCart work
  });

  it('should remove the item from the cart', () => {
    component.removeFromCart(1);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(1);
    expect(mockCartService.getCart).toHaveBeenCalled();
  });
});
