import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent implements OnInit {
  uploadForm = new FormGroup({
    
  }); 

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  onUpload(event: any) {
    console.log(event)
    console.log(event.target.files[0])
    const file = event.target.files[0];
    const abc = this.uploadForm.get('profile')?.setValue(file)
    console.log("abc", abc)
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('profile-file', this.uploadForm.get('profile')?.value);
    // formData.get('file')
    console.log("yha se chala ha",formData.get('file'))
    this.http.post('http://localhost:5000/profile-upload-single', formData).subscribe(() => {
      
    })

  }
}
