import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {MockComponent} from 'ng-mocks';
import {HomeComponent} from './components/home/home.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        MockComponent(HomeComponent),
        FooterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const navbar = fixture.debugElement.query(By.directive(NavbarComponent));
    expect(navbar).toBeTruthy();
  });

  it('should render the footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const footer = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footer).toBeTruthy();
  });
});
