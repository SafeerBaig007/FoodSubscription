import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SubscriberService } from '../services/subscriber.service';
import { AuthService } from '../services/auth.service';
import { DishesService } from '../services/dishes.service';


@Component({
  selector: 'app-admin-meals',
  templateUrl: './admin-meals.component.html',
  styleUrls: ['./admin-meals.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminMealsComponent implements OnInit {
  title = 'angular-mat-table-example';

  // dataSource = ELEMENT_DATA;
  columnsToDisplay = ['user_id', 'dish_id', 'createdAt'];

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  manageAllRows() {
    this.flag = !this.flag
    this.subscribedService.getAllSubscribedUsers.forEach((row : any) => {
      row.expanded = this.flag;
    })
  }
  constructor(public subscribedService : SubscriberService, public authService: AuthService, public dishService: DishesService) { }

  ngOnInit(): void {
  }
  flag: boolean = false
  converting(column: any, argument: any) {
    if(column == 'user_id') {
      return this.authService.getAllUsers.find((item: any) => {
        return item.id == argument.user_id
      }).name
    }
    else if(column == 'dish_id') {
      return this.dishService.getDishes.find((item: any) => {
        return item.id == argument.dish_id
      }).name
    }
    else if(column == 'createdAt') {
      return argument.createdAt
    }
  }
}
export interface User {
  name: string;
  dish: string;
  create: string;
  expanded: boolean;
}

