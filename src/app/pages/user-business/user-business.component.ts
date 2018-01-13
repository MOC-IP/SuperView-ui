import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business/business.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  styleUrls: ['./user-business.component.css']
})
export class UserBusinessComponent implements OnInit {
  isDataLoaded: boolean;
  businesses: any[];
  constructor(private route: ActivatedRoute,
    private businessService: BusinessService,
    private userService: UserService,
    private authService: AuthService) {
    this.businesses = new Array();

  }

  ngOnInit() {
    console.log(this.authService.user);
    console.log('user have',
      this.authService.user.ownedBusinesses);
    this.fetch_data((err, data) => {
      console.log('end fetch data', this.businesses);
      this.isDataLoaded = true;
    });
  }

  fetch_data(next): any {
    let processed_ids = 0;
    this.authService.user.ownedBusinesses.forEach(bussines_id => {
      this.businessService.getBusiness(bussines_id).subscribe((data) => {
        console.log(' my bussines data feched', data);
        this.getGoogleDetails(data, (err, place_info) => {
          data['google_details'] = place_info;
          this.businesses.push(data);
          processed_ids++;
          if (processed_ids = this.authService.user.ownedBusinesses.length) {
            return next(null, data);
          }
        });
      });

    });
  }
  getGoogleDetails(data, next) {
    this.businessService.getPlaceInfo(data).subscribe((place_info) => {
      console.log('place info', place_info);
      next(null, place_info);
    });
  }

}
