import {Injectable} from '@angular/core';
import {CartItem} from '../models/cart-item';
import {IProduct} from '../models/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  addToCart(product: IProduct): void {
    let itemToAdd: CartItem;

    const itemsInCart = this.getCart();

    // Find the product by its index in the list
    const index = itemsInCart.findIndex(
      item => {
        // Return the id that matches the item
        return product.id === item.product.id;
      });
    // If the product already exists in the cart, increase the quantity
    if (index >= 0) {
      console.log('Increase the quantity');
      itemToAdd = itemsInCart[index];
      itemToAdd.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      return;
    }
    console.log('Add to cart');

    itemToAdd = new CartItem(product, 1);
    itemsInCart.push(itemToAdd);
    localStorage.setItem('cart', JSON.stringify(itemsInCart));
  }

  removeFromCart(id: number) {
    const itemsInCart = this.getCart();
    const index = itemsInCart.findIndex(
      item => {
        return id === item.product.id;
      }
    );
    console.log('Product removed');
    const itemToRemove = itemsInCart[index];
    if (itemToRemove.quantity <= 1) {
      itemsInCart.splice(index, 1);
    } else {
      itemToRemove.quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(itemsInCart));
  }

  getCart(): CartItem[] {
    const cartRaw = localStorage.getItem('cart');
    if (cartRaw === null) {
      return [];
    } else {
      return JSON.parse(cartRaw);
    }
  }

  calculateQuantity(): number {
    const itemsInCart = this.getCart();
    let quantity = 0;
    itemsInCart.forEach((itemInCart) => {
      quantity += itemInCart.quantity;
    });
    return quantity;
  }

  getTotalPrice(): number {
    const itemsInCart = this.getCart();
    let totalPrice = 0;
    itemsInCart.forEach((itemInCart) => {
      totalPrice += itemInCart.product.price * itemInCart.quantity;
    });
    return totalPrice;
  }

  emptyCart() {
    localStorage.removeItem('cart');
  }
}
