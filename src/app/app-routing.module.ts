import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ConfirmationPageComponent} from './components/confirmation-page/confirmation-page.component';
import {OrderManagementComponent} from './components/admin/order-management.component';
import {SearchComponent} from './components/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'confirmation', component: ConfirmationPageComponent},
  {path: 'admin', component: OrderManagementComponent},
  {path: 'search', component: SearchComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  // Scroll to the top of the page on router changes: https://stackoverflow.com/a/48048822
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
