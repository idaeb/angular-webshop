import {TestBed} from '@angular/core/testing';
import {CartService} from './cart.service';
import {IProduct} from '../models/interfaces/iproduct';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.get(CartService);
    localStorage.setItem('cart', '[]');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should manage cart items', () => {
    expect(service.getCart()).toEqual([]);
    expect(service.calculateQuantity()).toEqual(0);
    expect(service.getTotalPrice()).toEqual(0);

    service.addToCart(ProductHelper.product1);
    expect(service.calculateQuantity()).toEqual(1);
    expect(service.getTotalPrice()).toEqual(10);

    service.addToCart(ProductHelper.product2);
    expect(service.calculateQuantity()).toEqual(2);
    expect(service.getTotalPrice()).toEqual(30);

    service.addToCart(ProductHelper.product2);
    expect(service.calculateQuantity()).toEqual(3);
    expect(service.getTotalPrice()).toEqual(50);

    service.removeFromCart(ProductHelper.product2.id);
    expect(service.calculateQuantity()).toEqual(2);
    expect(service.getTotalPrice()).toEqual(30);

    service.addToCart(ProductHelper.product1);
    expect(service.calculateQuantity()).toEqual(3);
    expect(service.getTotalPrice()).toEqual(40);

    service.removeFromCart(ProductHelper.product1.id);
    expect(service.calculateQuantity()).toEqual(2);
    expect(service.getTotalPrice()).toEqual(30);

    service.removeFromCart(ProductHelper.product2.id);
    expect(service.calculateQuantity()).toEqual(1);
    expect(service.getTotalPrice()).toEqual(10);

    service.removeFromCart(ProductHelper.product1.id);
    expect(service.calculateQuantity()).toEqual(0);
    expect(service.getTotalPrice()).toEqual(0);
  });

  it('should empty the cart', () => {
    expect(localStorage.getItem('cart')).toBeTruthy();

    service.emptyCart();

    expect(localStorage.getItem('cart')).toBeFalsy();
  });
});

// Create a product helper to use as a mock product in the tests
class ProductHelper {
  public static product1: IProduct = {
    id: 1,
    productCategory: [],
    price: 10,
    name: 'prod-1',
    added: 'before',
    description: 'description',
    imageUrl: 'funny.png',
    year: 2019
  };

  public static product2: IProduct = {
    id: 2,
    productCategory: [],
    price: 20,
    name: 'prod-2',
    added: 'before',
    description: 'description',
    imageUrl: 'funny.png',
    year: 2018
  };
}
