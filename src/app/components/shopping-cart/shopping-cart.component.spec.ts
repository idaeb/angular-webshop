import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShoppingCartComponent} from './shopping-cart.component';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {CartService} from '../../services/cart.service';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let mockCartService;

  beforeEach(async(() => {
    mockCartService = {
      getCart: jasmine.createSpy('getCart').and.returnValue([]),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      getTotalPrice: jasmine.createSpy('getTotalPrice')
    };
    TestBed.configureTestingModule({
      declarations: [
        ShoppingCartComponent,
        MockComponent(SidebarComponent)
      ],
      providers: [{provide: CartService, useValue: mockCartService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should remove an item from the cart', () => {
    component.removeFromCart(42);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(42);
    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should return the total price', () => {
    component.getTotalPrice();
    expect(mockCartService.getTotalPrice).toHaveBeenCalled();
  });

  it('should display a message when the cart is empty', () => {
    const emptyCartDiv: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('.empty-cart');
    expect(emptyCartDiv).toBeTruthy();
  });

  it('should hide the empty cart message when the cart has products', () => {
    component.cart = [
      {
        quantity: 5, product: {
          id: 2,
          productCategory: [],
          price: 20,
          name: 'prod-2',
          added: 'before',
          description: 'description',
          imageUrl: 'funny.png',
          year: 2020
        }
      }
    ];
    fixture.detectChanges();
    const emptyCartDiv: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('.empty-cart');
    expect(emptyCartDiv).toBeFalsy();
  });
});
