import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {CategoryService} from '../../../services/category.service';
import {Observable, of} from 'rxjs';
import {ICategory} from '../../../models/interfaces/icategory';

class MockCategoryService {
  getDataArray(): Observable<ICategory[]> {
    return of([
      {
        id: 1,
        name: 'Action'
      },
      {
        id: 2,
        name: 'Drama'
      },
      {
        id: 3,
        name: 'Scifi'
      }
    ]);
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent
      ],
      providers: [
        {provide: CategoryService, useClass: MockCategoryService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SidebarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all categories', () => {
    const documentHtml: HTMLElement = fixture.debugElement.nativeElement;
    const productList = documentHtml.querySelector('.list-group');

    expect(productList.children.length).toEqual(4);
  });

  xit('[IGNORED] click function breaks jasmine', () => {
    component.eventEmitter.subscribe((event) => {
      expect(event).toEqual(1);
    });

    const link: HTMLElement = fixture.debugElement.nativeElement.querySelector('#category-1');
    link.click();

    fixture.detectChanges();
  });

  it('should emit event on category click', () => {
    component.eventEmitter.subscribe((event) => {
      expect(event).toEqual(1);
    });

    component.filterProducts(1);
  });
});
