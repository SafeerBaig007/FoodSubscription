import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DishesService } from '../services/dishes.service';
import { SubscriberService } from '../services/subscriber.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  constructor(public subscribedService : SubscriberService, public authService: AuthService, private dishService: DishesService) {
    this.fetchAllUsers()
    this.fetchSubscribedUsers()
   }
  displayedColumns: string[] = ['client','email', 'dish', 'create'];
  ngOnInit(): void {
  }

  fetchSubscribedUsers() {
    this.subscribedService.fetchSubscribedUsers().subscribe(() => {})
    
  }

  fetchAllUsers() {
    this.authService.fetchAllUsers().subscribe(() =>{})
  }
  userName(id: any) {
   return this.authService.getAllUsers.find((item: any) => {
     return item.id == id
   }).name
  }
  userEmail(id: any) {
    return this.authService.getAllUsers.find((item: any) => {
      return item.id == id
    }).email
  }
  dishName(id: any) {
    return this.dishService.getDishes.find((item: any) => {
      return item.id == id
    }).name
   }

}
