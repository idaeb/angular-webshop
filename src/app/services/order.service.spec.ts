import {TestBed} from '@angular/core/testing';
import {OrderService} from './order.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {Order} from '../models/order';

describe('OrderService', () => {
  let httpController: HttpTestingController;
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list for company ID 24', () => {
    service.getOrders().subscribe(
      result => expect(result.length).toBe(0)
    );

    const testRequest: TestRequest = httpController.expectOne(OrderService.ordersUrl + '?companyId=24');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([]);
  });

  it('should return a list of products', () => {
    const expectedOrders: Order[] = [
      {
        id: 1,
        totalPrice: 100,
        orderRows: [],
        status: 0,
        paymentMethod: 'KORT',
        createdBy: 'testbot',
        created: '2019-06-02 17:25:00',
        companyId: 24
      },
      {
        id: 2,
        totalPrice: 200,
        orderRows: [],
        status: 1,
        paymentMethod: 'KORT',
        createdBy: 'testbot',
        created: '2019-06-02 17:26:00',
        companyId: 24
      }
    ];

    service.getOrders().subscribe(
      result => expect(result).toBe(expectedOrders)
    );

    const testRequest: TestRequest = httpController.expectOne(OrderService.ordersUrl + '?companyId=24');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(expectedOrders);
  });

  it('should send an order to the server to be created', () => {
    const expectedOrder = {
      id: 1,
      totalPrice: 100,
      orderRows: [],
      status: 0,
      paymentMethod: 'KORT',
      createdBy: 'testbot',
      created: '2019-06-02 17:25:00',
      companyId: 24
    };

    service.createOrder(expectedOrder).subscribe(
      result => expect(result).toBe(expectedOrder)
    );

    const testRequest: TestRequest = httpController.expectOne(OrderService.ordersUrl);
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toBe(expectedOrder);
    expect(testRequest.request.headers).toBe(OrderService.httpOptions.headers);
    testRequest.flush(expectedOrder);
  });

  it('should send an order to the server to be updated', () => {
    const expectedOrder = {
      id: 1,
      totalPrice: 100,
      orderRows: [],
      status: 0,
      paymentMethod: 'KORT',
      createdBy: 'testbot',
      created: '2019-06-02 17:25:00',
      companyId: 24
    };

    service.updateOrder(expectedOrder).subscribe(
      result => expect(result).toBe(expectedOrder)
    );

    const testRequest: TestRequest = httpController.expectOne(OrderService.ordersUrl + '/1');
    expect(testRequest.request.method).toBe('PUT');
    expect(testRequest.request.body).toBe(expectedOrder);
    expect(testRequest.request.headers).toBe(OrderService.httpOptions.headers);
    testRequest.flush(expectedOrder);
  });

  it('should delete an order', () => {
    const expectedOrder = {
      id: 1,
      totalPrice: 100,
      orderRows: [],
      status: 0,
      paymentMethod: 'KORT',
      createdBy: 'testbot',
      created: '2019-06-02 17:25:00',
      companyId: 24
    };

    service.deleteOrder(1).subscribe(
      result => expect(result).toBe(expectedOrder)
    );

    const testRequest: TestRequest = httpController.expectOne(OrderService.ordersUrl + '/1');
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(expectedOrder);
  });
});
