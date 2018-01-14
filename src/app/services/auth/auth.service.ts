import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
// import jwt = require('jsonwebtoken');
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthService {
  isLoggedIn = false;
  // URL where we redirect after logging in
  redirectUrl: string;
  // back_endpoint = 'http://127.0.0.1:8080';
  user: User = new User();
  back_endpoint = 'http://ec2-18-220-145-34.us-east-2.compute.amazonaws.com:8000';
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLoggedIn = true;
      this.decodeJWT();
    }
  }

  decodeJWT() {
    // const decoded = jwt.verify(this.token, environment.auth_secret);
    const jwtHelper = new JwtHelper();
    const decoded = jwtHelper.decodeToken(this.token);
    console.log(decoded);
    this.user = decoded;

    return decoded;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.back_endpoint}/auth/sign_in`, { username: user.username, password: user.password })
      .map(data => {
        // login successful if there's a jwt token in the response
        console.log(data.token);
        if (user && data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('USER just logged in', user.username);
          localStorage.setItem('token', data.token);
          this.isLoggedIn = true;
          user.token = data.token;
          return this.decodeJWT();
        }
        this.isLoggedIn = false;
        return this.decodeJWT();
      }).catch(e => {
        console.log(e);
        if (e.status === 401) {
          return Observable.throw(e);
        }
        // do any other checking for statuses here
      });

    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.back_endpoint}/auth/register`, { user })
      .map(data => {
        if (data) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('USER just register in', user.username);
          return user;
        }
      }).catch(e => {
        console.log(e);
        if (e.status === 401) {
          return Observable.throw(e);
        }
        // do any other checking for statuses here
      });
  }
  logout(user: User): void {

    console.log('USER just logged out', user.username);
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
  }
}
