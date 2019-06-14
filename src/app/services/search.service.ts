import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/interfaces/iproduct';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public static searchUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/search';

  constructor(private http: HttpClient) {
  }

  getSearchResult(searchString: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(SearchService.searchUrl + '?searchText=' + searchString);
  }
}
