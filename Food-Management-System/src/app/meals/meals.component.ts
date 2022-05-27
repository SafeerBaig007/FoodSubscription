import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DishesService } from '../services/dishes.service';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css'],
})
export class MealsComponent implements OnInit {
  data: any = '';
  displayedColumns: string[] = ['meal', 'date', 'status', 'action'];
  dataSource: any = [];
  constructor(
    public subscriedService: SubscriberService,
    private authService: AuthService,
    public dishService : DishesService
  ) {}

  ngOnInit(): void {
    this.userSubscribed();
    this.dataSource = this.subscriedService.getSubscribedUser?.dates;
  }

  userSubscribed() {
    this.subscriedService
      .userSubscribed(this.authService.getLoginUser.id)
      .subscribe(() => {});
  }

  optMeal(row: any) {
    this.subscriedService
      .optMeal({
        date: row.date,
        meal: row.meal,
        status: row.status == 'accepted' ? 'declined' : 'accepted',
      }, this.authService.getLoginUser.id)
      .subscribe(() => {});
  }
}
