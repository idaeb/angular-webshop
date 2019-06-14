import {TestBed} from '@angular/core/testing';
import {CategoryService} from './category.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {ICategory} from '../models/interfaces/icategory';

describe('CategoryService', () => {
  let httpController: HttpTestingController;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpController = TestBed.get(HttpTestingController);
    service = TestBed.get(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty list', () => {
    service.getDataArray().subscribe(
      result => expect(result.length).toBe(0)
    );

    const testRequest: TestRequest = httpController.expectOne(CategoryService.categoriesUrl);
    expect(testRequest.request.method).toBe('GET');

    testRequest.flush([]);
  });

  it('should return a list of categories', () => {
    const expectedCategories: ICategory[] = [
      {
        id: 1,
        name: 'For kids'
      },
      {
        id: 2,
        name: 'Mystery'
      }
    ];

    service.getDataArray().subscribe(
      result => expect(result).toBe(expectedCategories)
    );

    const testRequest: TestRequest = httpController.expectOne(CategoryService.categoriesUrl);
    expect(testRequest.request.method).toBe('GET');

    testRequest.flush(expectedCategories);
  });

  it('should return a single category', () => {
    const expectedCategory: ICategory = {id: 2, name: 'Thriller'};

    service.getData(2).subscribe(
      result => expect(result).toBe(expectedCategory)
    );

    const testRequest: TestRequest = httpController.expectOne(CategoryService.categoriesUrl + '/' + 2);
    expect(testRequest.request.method).toBe('GET');

    testRequest.flush(expectedCategory);
  });
});
