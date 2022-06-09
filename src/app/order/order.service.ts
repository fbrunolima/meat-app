import { Injectable } from "@angular/core";
import { CarItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operator/map";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: Http){}

    cartItems(): CarItem[] {
        return this.cartService.items
    }

    increaseQty(item: CarItem){
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CarItem){
        this.cartService.decreaseQty(item);
    }

    remove(item: CarItem){
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string>{
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers})).map(response => response.json());
    }

    clear(){
        this.cartService.clear();
    }
}