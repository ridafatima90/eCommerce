import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {SharedModule} from "../shared/shared.module";
import { ProductDetailsComponent } from './product-details.component';
import {RouterLink} from "@angular/router";
import {ShopRoutingModule} from "./shop-routing.module";



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
    ShopRoutingModule
  ],

})
export class ShopModule { }
