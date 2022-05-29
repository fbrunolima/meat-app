import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute) { }

  restaurant: Restaurant

  testando: boolean = true;

  teste(){
    return this.testando;
  }

  ngOnInit() {
    this.restaurantService.restaurantById(this.route.snapshot.params['id']).subscribe(restaurant => this.restaurant = restaurant)
    
  }



}
