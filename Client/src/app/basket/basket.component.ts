import { Component } from '@angular/core';
import {BasketService} from "./basket.service";
import {BasketItem} from "../shared/models/basket";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService) {
  }

  removeItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity);
  }

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }
}
