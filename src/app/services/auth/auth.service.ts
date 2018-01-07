import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
  isLoggedIn = false;
  // URL where we redirect after logging in
  redirectUrl: string;
  back_endpoint = 'http://127.0.0.1:8080';
  // back_endpoint = 'http://ec2-18-220-145-34.us-east-2.compute.amazonaws.com:8000';
  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.back_endpoint}/auth/sign_in`, { email: user.username, password: user.password })
    .map(token => {
        // login successful if there's a jwt token in the response
        console.log(token);
        if (user && token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('USER just logged in', user.username);
            this.isLoggedIn = true;
            user.token = token;
            return user;
          }
          this.isLoggedIn = false;
          return user;
    }).catch(e => {
      console.log(e);
      if (e.status === 401) {
          return Observable.throw(e);
      }
      // do any other checking for statuses here
  });

    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }
  logout(user: User): void {

    console.log('USER just logged out', user.username);
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
  }
}
