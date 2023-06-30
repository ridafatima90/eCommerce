import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService){}

  SaveUserAddress(){
    this.accountService.updateAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next: () => {
        this.toastr.success("Address Updated!");
          this.checkoutForm?.get('addressForm')?.value.reset(this.checkoutForm?.get('addressForm')?.value);
      }
    })
  }
}
