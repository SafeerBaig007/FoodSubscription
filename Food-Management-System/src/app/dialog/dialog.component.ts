import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DishesService } from '../services/dishes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dishes: DishesService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('created');
  }

  ngOnInit(): void {
    this.flag = this.data.dialog;
    this.flag == 'edit'
      ? ((this.name2 = this.data.dish.name),
        (this.description2 = this.data.dish.description),
        (this.price2 = this.data.dish.price))
      : '';
    this.uploadForm = this.formBuilder.group({
      profile: [''],
    });
  }
  uploadForm = new FormGroup({});
  flag: string = '';
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  name2: string = '';
  description2: string = '';
  price2: string = '';

  onUpload(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const abc = this.uploadForm.get('profile')?.setValue(file);
    console.log('abc', abc);
  }

  createDish() {
    const formData = new FormData();
    formData.append('profile-file', this.uploadForm.get('profile')?.value);
    console.log('get profile', formData.get('get-profile'));
    formData.append('name', this.name.value);
    formData.append('description', this.description.value);
    formData.append('price', this.price.value);
    // formData.get('file')
    this.dishes.createDish(formData).subscribe(() => {

    })
  }

  updateDish() {
    // console.log(this.name2)
    const formData = new FormData();
    formData.append('profile-file', this.uploadForm.get('profile')?.value);
    console.log('get profile', formData.get('get-profile'));
    formData.append('name', this.name2);
    formData.append('description', this.description2);
    formData.append('price', this.price2);
    // formData.get('file')
    this.dishes.updateDish(formData, this.data.dish.id).subscribe(() => {});
  }
}
