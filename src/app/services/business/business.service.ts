import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Business } from '../../models/business';
@Injectable()
export class BusinessService {

  constructor(private http: HttpClient) { }
  // back_endpoint = 'http://localhost:8080';
  // place_info = 'http://ec2-18-220-145-34.us-east-2.compute.amazonaws.com:8001'; 
  back_endpoint = 'http://ec2-18-220-145-34.us-east-2.compute.amazonaws.com:8000';
  place_info = 'http://ec2-18-220-145-34.us-east-2.compute.amazonaws.com:8001';
  getBusiness(id: string): Observable<Business> {
    const url = `${this.back_endpoint}/business/${id}`;
    return this.http.get<Business>(url);
  }
  getPlaceInfo(place: Object): Observable<any> {
    const url = `${this.place_info}/google/places?name=${place['name']}&city=Las Vegas`;
    return this.http.get<Business>(url);
  }
  getSWOT(place: Object, version: string): Observable<any> {
    const url = `${this.back_endpoint}/${version}/profile/${place['_id']}`;
    return this.http.get<Business>(url);
  }
}
