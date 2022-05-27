import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DishesService } from '../services/dishes.service';
import { SubscriberService } from '../services/subscriber.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  data: any = '';
  displayedColumns: string[] = ['meal', 'status'];
  dataSource: any = [];
  dishName: string = '';
  durationInSeconds = 10;
  constructor(
    public subscriedService: SubscriberService,
    private authService: AuthService,
    public dishService: DishesService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
    });
    this.userSubscribed();
    this.fetchPaymentStatus()
    this.dataSource = this.subscriedService.getSubscribedUser?.dates;
  }
  uploadForm = new FormGroup({});
  userSubscribed() {
    this.subscriedService
      .userSubscribed(this.authService.getLoginUser.id)
      .subscribe(() => {});
  }

  optMeal(row: any) {
    this.subscriedService
      .optMeal(
        {
          date: row.date,
          meal: row.meal,
          status: row.status == 'accepted' ? 'declined' : 'accepted',
        },
        this.authService.getLoginUser.id
      )
      .subscribe(() => {});
  }
  onUpload(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const abc = this.uploadForm.get('profile')?.setValue(file);
    console.log('abc', abc);
  }

  uploadProof() {
    const formData = new FormData();
    formData.append('profile-file', this.uploadForm.get('profile')?.value);
    formData.append('user_id', this.authService.getLoginUser.id);
    formData.append('dish_id', this.subscriedService.getSubscribedUser.dish_id);
    formData.append('total_meals', this.subscriedService.getTotalMeals);
    formData.append('total_amount', this.subscriedService.getTotalAmount);
    formData.append('status', 'pending');
    this.http
      .post('http://localhost:5000/api/upload-proof', formData)
      .subscribe(() => {
        this.snackBar.open('Payment proof uploaded successfully!', 'dismiss', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  fetchPaymentStatus() {
    this.subscriedService
      .fetchPaymentStatus(this.authService.getLoginUser.id).subscribe(() =>{})
  }
}
