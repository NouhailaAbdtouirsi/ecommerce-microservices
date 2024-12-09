import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CustomersComponent} from './customers/customers.component';
import {AddProductComponent} from './add-product/add-product.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {BillsComponent} from './bills/bills.component';

const routes: Routes = [
  //the base route `/` will redirect to `/products`
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'customers',component: CustomersComponent },
  { path: 'add-product',component: AddProductComponent },
  { path: 'add-customer',component: AddCustomerComponent },
  // bills route `/customers/${customerId}/bills`
  { path: 'customers/:customerId/bills', component: BillsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
