import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DishesService } from '../services/dishes.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPaymentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dish', 'meals', 'amount', 'status', 'proof', 'action'];
  constructor(public paymentService: PaymentService, public authService: AuthService, public dishService : DishesService, private http: HttpClient) { 
    this.fetchAllPayments()
  }

  ngOnInit(): void {
  }

  fetchAllPayments() {
    this.paymentService.fetchAllPayments().subscribe(() => {})
  }
  userName(user_id: number) {
    return this.authService.getAllUsers.find((item: any) => {
      return item.id == user_id
    }).name
  }
  dishName(dish_id: number) {
    return this.dishService.getDishes.find((item: any) => {
      return item.id == dish_id
    }).name
  }
  downloadImage(img: any) {
    const imgUrl = img.src;
    const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
    this.http.get(imgUrl, {responseType: 'blob' as 'json'})
      .subscribe((res: any) => {
        const file = new Blob([res], {type: res.type});

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      });
  }

  rowDetails(row: any) {
    console.log('row', row)
  }

  acceptPayment(event: any, element: any) {
    event.stopPropagation();
    console.log('right', element)
    this.paymentService.acceptPayment('accepted', element.user_id).subscribe(() =>{})

  }

  declinePayment(event: any, element: any) {
    event.stopPropagation();
    console.log('right', element)
    this.paymentService.declinePayment('declined', element.user_id).subscribe(() =>{})
  }

}
