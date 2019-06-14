import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../models/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: CartItem[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
