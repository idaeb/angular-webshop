import {TestBed} from '@angular/core/testing';
import {ProductService} from './product.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {IProduct} from '../models/interfaces/iproduct';

describe('ProductService', () => {
  let httpController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list', () => {
    service.getDataArray().subscribe(
      result => expect(result).toEqual([])
    );

    const testRequest: TestRequest = httpController.expectOne(ProductService.productsUrl);
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush([]);
  });

  it('should return a list of products', () => {
    const expectedProducts: IProduct[] = [
      {
        id: 1,
        productCategory: [],
        price: 10,
        name: 'prod-1',
        added: 'before',
        description: 'description',
        imageUrl: 'funny.png',
        year: 2019
      },
      {
        id: 2,
        productCategory: [],
        price: 11,
        name: 'prod-2',
        added: 'after',
        description: 'another description',
        imageUrl: 'veryfunny.png',
        year: 2018
      }
    ];

    service.getDataArray().subscribe(
      result => expect(result).toBe(expectedProducts)
    );

    const testRequest: TestRequest = httpController.expectOne(ProductService.productsUrl);
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(expectedProducts);
  });
});
