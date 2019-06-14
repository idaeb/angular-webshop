import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {CartService} from '../../../services/cart.service';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockNavigation;

  const mockedCart = {
    calculateQuantity: jasmine.createSpy('calculateQuantity').and.returnValue(1)
  };

  beforeEach(async(() => {
    mockNavigation = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      providers: [
        {provide: CartService, useValue: mockedCart},
        {provide: Router, useValue: mockNavigation}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the quantity', () => {
    expect(mockedCart.calculateQuantity).toHaveBeenCalled();
  });

  it('should display number of items in the cart', () => {
    const cart: HTMLLinkElement = fixture.debugElement.nativeElement.querySelector('#cart');
    expect(cart.textContent).toContain('CART (1)');
  });

  it('should navigate to the search component with the search string', fakeAsync(() => {
    component.searchIsVisible = true;
    fixture.detectChanges();
    const searchInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.search-input');
    const searchString = 'movie';
    searchInput.value = searchString;
    const searchInputDebug = fixture.debugElement.query(By.css('.search-input'));
    searchInputDebug.triggerEventHandler('keyup.enter', {});
    tick();
    expect(mockNavigation.navigate).toHaveBeenCalledWith(['/search'], {queryParams: {searchString}});
  }));
});
