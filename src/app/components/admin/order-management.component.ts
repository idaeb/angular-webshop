import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order';

@Component({
  selector: 'app-admin',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (data = []) => {
        this.orders = data;
      }
    );
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to remove this order?')) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          console.log('The order has been deleted');
          this.getOrders();
        }
      );
    }
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order).subscribe(
      () => {
        console.log('The order has been updated');
        this.getOrders();
      }
    );
  }

  shipOrder(order: Order): void {
    order.status = 1;
    this.updateOrder(order);
  }

  getOrderStatus(status: number): string {
    switch (status) {
      case 0: {
        return 'Packaged';
      }
      case 1: {
        return 'Shipped';
      }
      default: {
        return status.toString();
      }
    }
  }

}
