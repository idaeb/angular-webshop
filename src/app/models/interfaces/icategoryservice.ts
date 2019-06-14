import {Observable} from 'rxjs';
import {ICategory} from './icategory';

export interface ICategoryService {
  getDataArray(): Observable<ICategory[]>;

  getData(id: number): Observable<ICategory>;
}


