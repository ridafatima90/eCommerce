import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BasketService} from "../../basket/basket.service";
import {CheckoutService} from "../checkout.service";
import {ToastrService} from "ngx-toastr";
import {Basket} from "../../shared/models/basket";
import {Address} from "../../shared/models/user";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent {
  @Input() checkOutForm?: FormGroup;

  constructor(private basketService: BasketService, private checkOutService: CheckoutService, private toastr: ToastrService, private router: Router) {}

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) return;
    const orderToCreate = this.getOrderToCreate(basket);
    if(!orderToCreate) return;
    this.checkOutService.createOrder(orderToCreate).subscribe({
      next: order => {
        this.toastr.success("Order successfully created");
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navigationExtras);
      }
    })
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethodId = this.checkOutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;

    const shipToAddress = this.checkOutForm?.get('addressForm')?.value as Address;

    if(!deliveryMethodId || !shipToAddress) return;

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }

  }
}
