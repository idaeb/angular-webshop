import {Observable} from 'rxjs';
import {IProduct} from './iproduct';

export interface IProductService {
  getDataArray(): Observable<IProduct[]>;

  getData(id: number): Observable<IProduct>;
}
