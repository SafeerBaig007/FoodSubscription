import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DishesService } from '../services/dishes.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  longText: string =
    'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';
  durationInSeconds = 10;
  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public dishService: DishesService,
    private snackBar: MatSnackBar,
    // private horizontalPos: MatSnackBarHorizontalPosition,
    // private verticalPos: MatSnackBarVerticalPosition
  ) {
    this.fetchDishes();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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

  createFood() {
    this.router.navigate(['/create-food']);
  }
  openDialog(): void {
    // const dialogRef =
    const dialog = this.dialog.open(DialogComponent, {
      // width: '250px',
      data: { dialog: 'create' },
    });
    dialog.afterClosed().subscribe(() => {
      this.snackBar.open('Dish create successfully!', 'dismiss', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    });
  }

  editDialog(dish: any) {
    const dialog = this.dialog.open(DialogComponent, {
      // width: '250px',
      data: { dish, dialog: 'edit' },
    });
    dialog.afterClosed().subscribe(() => {
      this.snackBar.open('Dish updated successfully!', 'dismiss', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    });
  }

  fetchDishes() {
    this.dishService.fetchDishes().subscribe(() => {});
  }

  deleteDish(id: number) {
    console.log(id);
    this.dishService.deleteDish(id).subscribe(() => {});
  }

  openSnackBar() {
    
   
  }
}
