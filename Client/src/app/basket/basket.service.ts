import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {Basket, BasketItem, BasketTotals} from "../shared/models/basket";
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket){
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1){
    if(this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.CreateBasket();
    basket.items = this.addOrUpdate(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(Id: number, quantity = 1){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === Id);
    if(item){
      item.quantity -= quantity;
      if(item.quantity === 0){
        basket.items = basket.items.filter(x => x.id !== Id);
      }

      if(basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }

  }

  private mapProductItemToBasketItem(item: Product): BasketItem{
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private CreateBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdate(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items?.find(x => x.id === itemToAdd.id);
    if(item) item.quantity += quantity
    else {
      itemToAdd.quantity = quantity;
      items?.push(itemToAdd);
    }
    return items;
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity)+ a, 0);
    const total = subtotal+shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private isProduct(item: Product | BasketItem): item is Product{
    return (item as Product).productBrand !== undefined;
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id')
      }
    })
  }
}
