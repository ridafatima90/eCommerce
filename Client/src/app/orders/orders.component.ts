import {Component, OnInit} from '@angular/core';
import {Order} from "../shared/models/order";
import {OrdersService} from "./orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrdersService){}

  getOrders(){
    this.orderService.getOrdersForUser().subscribe({
      next: response => {
        this.orders = response;
        console.log(this.orders);
      }
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }

}
