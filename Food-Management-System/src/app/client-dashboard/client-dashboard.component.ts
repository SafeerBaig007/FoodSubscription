import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DishesService } from '../services/dishes.service';
import * as moment from 'moment';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
})
export class ClientDashboardComponent implements OnInit {
  longText: string =
    'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';

  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public dishService: DishesService,
    public subscribeService: SubscriberService
  ) {
    this.fetchDishes();
    this.userSubscribed()
  }

  ngOnInit(): void {
    console.log(this.service.getLoginUser);
  }
  logout() {
    this.service.logout(this.service?.getLoginUser?.email).subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('loginUser');
      this.router.navigate(['/login']);
    });
  }

  fetchDishes() {
    this.dishService.fetchDishes().subscribe(() => {});
  }

  subscribe(dish: any) {
    var dates = [];
    for (let i = 0; i < 6; i++) {
      let date = moment().add(i, 'days').format('YYYY-MM-DD');
      dates.push({date, meal: `meal ${i+ 1}`, status: 'accepted'});
    }
    this.subscribeService
      .subscriber({
        user_id: this.service.getLoginUser.id,
        dish_id: dish.id,
        dates: dates,
      })
      .subscribe(() => {});
  }
  userSubscribed() {
    this.subscribeService
      .userSubscribed(this.service.getLoginUser.id)
      .subscribe(() => {});
  }
}
