import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {SearchService} from '../../services/search.service';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {IProduct} from '../../models/interfaces/iproduct';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

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

  const mockSearchService = {
    getSearchResult: jasmine.createSpy('getSearchResult').and.returnValue(of(expectedProducts))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockComponent(SidebarComponent)
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: SearchService, useValue: mockSearchService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the search result', () => {
    expect(mockSearchService.getSearchResult).toHaveBeenCalled();

    fixture.whenStable();

    const searchResult = fixture.debugElement.nativeElement.querySelector('.search-result');
    expect(searchResult.innerText).toContain('prod-1');
    expect(searchResult.innerText).toContain('prod-2');
  });

  it('should return an empty list', () => {
    component.products = [];
    component.searchString = 'blipblop';

    fixture.detectChanges();
    fixture.whenStable();

    const noMatches = fixture.debugElement.nativeElement.querySelector('.no-matches');
    expect(noMatches.innerText).toContain('Nothing matches \'blipblop\'. Check the spelling or try less specific search terms.');
  });
});
