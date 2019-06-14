import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {MockComponent} from 'ng-mocks';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ProductDetailsComponent,
        MockComponent(SidebarComponent)
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the list of products', () => {
    component.products = [
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

    fixture.detectChanges();

    const document: HTMLElement = fixture.debugElement.nativeElement;
    const productList = document.querySelector('.product-list');

    expect(productList.children.length).toEqual(2);
  });
});
