import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationPageComponent} from './components/confirmation-page/confirmation-page.component';
import {OrderManagementComponent} from './components/admin/order-management.component';
import {SearchComponent} from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ConfirmationPageComponent,
    OrderManagementComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
