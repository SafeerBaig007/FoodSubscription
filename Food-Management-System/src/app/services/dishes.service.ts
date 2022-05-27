import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  url: string = 'http://localhost:5000/api/dishes/'
  constructor(private http: HttpClient) { }
  dishes : any = []
  set setDishes(value : any) {
    this.dishes = value
  }
  set setDeleteDish(value: number) {
    this.dishes = this.dishes.filter((item: any) => {
      return item.id != value
    })
  }
  get getDishes(): any {
    return this.dishes
  }
  createDish(body: any) {
    console.log(body)
    return this.http.post(this.url + 'profile-upload-single', body).pipe(
      map((result: any) => {
        console.log("result", result)
        this.getDishes.unshift(result.data)
      })
    )
  }

  fetchDishes() {
    return this.http.get(this.url + 'get').pipe(
      map((response: any) => {
        this.setDishes = response.dishes
      })
    )
  }

  deleteDish(id: number) {
    return this.http.delete(this.url + `delete/${id}`).pipe(
      map(() => {
       this.setDeleteDish = id
      })
    )
  }

  updateDish(data: any, id: any) {
    return this.http.put(this.url +`update/${id}`, data).pipe(
      map((response: any) => {
        let index = this.getDishes.findIndex((item: any) => {
          return item.id == id
        })
        Object.assign(this.getDishes[index], response.data)
      })
    )
  }
}
