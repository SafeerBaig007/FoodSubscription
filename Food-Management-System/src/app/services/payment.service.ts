import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url: string = 'http://localhost:5000/api/'
  allPayments: any = []
  set setAllPayments(value: any) {
    this.allPayments = value
  }
  get getAllPayments() {
    return this.allPayments
  }
  constructor(private http: HttpClient) { }

  fetchAllPayments() {
    return this.http.get(this.url + 'all-payments').pipe(
      map((result: any) => {
        console.log("all payments", result)
        this.setAllPayments = result
      }
    ))
  }

  acceptPayment(status: any, user_id: number) {
    return this.http.post(this.url + 'proof-payment', {status, user_id}).pipe(
      map((result: any) => {
        console.log("all payments", result)
        let index = this.getAllPayments.findIndex((item: any) => {
          return item.id == result.id
        })
        Object.assign(this.getAllPayments[index], result)
      }
    ))
  }

  declinePayment(status: any, user_id: number) {
    return this.http.post(this.url + 'proof-payment', {status, user_id}).pipe(
      map((result: any) => {
        let index = this.getAllPayments.findIndex((item: any) => {
          return item.id == result.id
        })
        Object.assign(this.getAllPayments[index], result)
      }
    ))
  }
}
