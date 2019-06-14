import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsComponent} from './product-details.component';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {Observable, of} from 'rxjs';
import {IProduct} from '../../models/interfaces/iproduct';
import {ICategory} from '../../models/interfaces/icategory';
import {CategoryService} from '../../services/category.service';

class MockProductService {
  getData(id: number): Observable<IProduct> {
    return of({
      id: 1,
      productCategory: [{categoryId: 2}],
      price: 10,
      name: 'prod-1',
      added: 'before',
      description: 'description',
      imageUrl: 'funny.png',
      year: 2019
    });
  }

  getDataArray(): Observable<IProduct[]> {
    return of([{
      id: 2,
      productCategory: [{categoryId: 2}],
      price: 20,
      name: 'prod-2',
      added: 'before',
      description: 'description',
      imageUrl: 'funny.png',
      year: 2020
    }]);
  }
}

class MockCategoryService {
  getDataArray(): Observable<ICategory[]> {
    return of([{
      id: 2,
      name: 'Mystery'
    }]);
  }

  getData(id: number): Observable<ICategory> {
    return of({
      id: 2,
      name: 'Mystery'
    });
  }
}

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  const mockedCart = {
    addToCart: jasmine.createSpy('addToCart')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailsComponent,
        MockComponent(SidebarComponent)
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: CartService, useValue: mockedCart},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct product', () => {
    // Wait for the component to finish loading
    fixture.whenStable().then(() => {
        expect(component.product.id).toEqual(1);
        expect(component.relatedMovies.length).toEqual(1);
        expect(component.relatedMovies[0].id).toEqual(2);
      }
    );
  });
});
