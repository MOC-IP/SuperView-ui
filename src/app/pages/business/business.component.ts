import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router/';

import { Business } from '../../models/business';
import { BusinessService } from '../../services/business/business.service';
import { QueryList } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit, AfterViewInit {
  swot: any;
  isDataLoaded = false;
  place: Business;
  place_info: any;
  business_id: string;
  lat = 51.678418;
  lng = 7.809007;
  constructor(private route: ActivatedRoute,
    private businessService: BusinessService) { }

  @ViewChildren('allTheseThings') things: QueryList<any>;

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.business_id = params.id;
      this.fetch_data((err, data) => {
        this.getGoogleDetails(data, (result) => {
          this.businessService.getSWOT(this.place).subscribe((swot) => {
            this.swot = swot;
            console.log(swot);
            this.isDataLoaded = true;
          });
        });
      });
    });
  }
  fetch_data(next): any {
    this.businessService.getBusiness(this.business_id).subscribe((data) => {
      console.log(data);
      this.place = data;
      next(null, data);
    });
  }
  getGoogleDetails(data, next) {
    this.businessService.getPlaceInfo(data).subscribe((place_info) => {
      this.place_info = place_info;
      console.log('place info', place_info);
      next(null);
    });
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred() {
    $(document).ready(function () {
      $('.slider').slider({
        full_width: true,
        height: 512
      });
    });
  }
  onRadiusChange($event) {
    console.log('center change event', event);
  }

  onCenterChange(event) {
    console.log('center change event', event);
  }




}
