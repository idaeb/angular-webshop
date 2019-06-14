import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public static ordersUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/orders';
  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(OrderService.ordersUrl, order, OrderService.httpOptions);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(OrderService.ordersUrl + '?companyId=24');
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(OrderService.ordersUrl + '/' + id);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(OrderService.ordersUrl + '/' + order.id, order, OrderService.httpOptions);
  }
}
