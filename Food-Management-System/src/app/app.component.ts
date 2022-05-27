import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { map, filter, find } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Food-Management-System';
  showHead: boolean = false;
  boolean_var: any = '';
  eventUrl: string = '';
  role: boolean = true;
  constructor(private router: Router, private service: AuthService) {
    this.boolean_var = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (response: any) =>
          this.router.config.find((conf) => conf.path == response.url.slice(1))
            ?.data?.['open'] || false
      )
    );
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          // console.log("if me")
          this.showHead = false;
        } else {
          // console.log("else me aya")
          this.role = this.service.getLoginUser.role == 'admin' ? true : false;
          this.showHead = true;
        }
        console.log('role', this.role);
        this.eventUrl = event['url'];
        // console.log("showHead", this.showHead)
      }
    });
  }
  ngOnInit(): void {
    // this.router.config.find((conf: any) => {
    //   conf.path == response.url
    // })
    this.boolean_var = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (response: any) =>
          this.router.config.find((conf) => conf.path == response.url.slice(1))
            ?.data?.['open'] || false
      )
    );
    console.log('boolean var', this.boolean_var);
  }
  logout() {
    this.service.logout(this.service?.getLoginUser?.email).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
