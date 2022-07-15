import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component'
import { OrderComponent } from './order/order.component'
import { MenuComponent } from './restaurant-detail/menu/menu.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component'
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { OrderSumaryComponent } from './order-sumary/order-sumary.component'

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
        },
    {path: 'order',  component: OrderComponent},
    {path: 'order-sumary',  component: OrderSumaryComponent},
    {path: 'restaurant', component: RestaurantComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
]