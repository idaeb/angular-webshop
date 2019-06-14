import {Injectable} from '@angular/core';
import {IProductService} from '../models/interfaces/iproductservice';
import {Observable} from 'rxjs';
import {IProduct} from '../models/interfaces/iproduct';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements IProductService {

  public static productsUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/products';

  constructor(private http: HttpClient) {
  }

  getDataArray(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(ProductService.productsUrl);
  }

  getData(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(ProductService.productsUrl + '/' + id);
  }
}
