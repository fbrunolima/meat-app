import { Component, OnInit } from '@angular/core';
import { CarItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  
  numberPattern = /^[0-9]*$/

  orderForm : FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]), //Validators.required faz com que aquele form seja obrigatório / minglength é no mínimo 5 caracteres.
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]), // Validators.pattern(propriedade) podemos aplicar uma validação nossa e passar ela como parâmetro.
      emailConfirmation: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation) {
      return undefined;
    }

    if(email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }

    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CarItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CarItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CarItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CarItem){
    this.orderService.remove(item);
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CarItem)=> new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(['/order-sumary'])
      this.orderService.clear()
    })
    console.log(order);
  }

}
