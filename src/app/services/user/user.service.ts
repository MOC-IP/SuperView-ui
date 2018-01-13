import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
declare var M: any;
@Injectable()
export class UserService {
  currentUser: User;
  constructor(private authService: AuthService, public router: Router) {
    this.currentUser = new User;
  }

  create(user: User) {
    console.log('start register');
    console.log(user);
    this.authService.register(user).subscribe(created_user => {
      console.log('here');
      if (created_user) {
        M.toast({ html: `User successfuly cerated`, classes: 'rounded' });
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = '/login';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    },
      (err) => {
        console.log(err);
        M.toast({ html: `${err.error.message}`, classes: 'rounded red' });
      });
  }
  authenticate(user: User) {
    console.log('start login');
    this.authService.login(user).subscribe(logged_user => {
      console.log('here');
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        this.currentUser = logged_user;
        // Redirect the user
        this.router.navigate([redirect]);
      }
    },
      (err) => {
        console.log(err);
        M.toast({ html: `${err.error.message}`, classes: 'rounded' });
      });
  }

  invalidate() {
    this.authService.logout(this.currentUser);
    this.router.navigate(['login']);
    this.currentUser = null;
  }

}
