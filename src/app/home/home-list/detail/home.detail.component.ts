import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { HomeService } from '../../service/home.service';
import { Home } from '../../home';

@Component({
  templateUrl: './home.detail.component.html' 
}) 
export class HomeDetailComponent implements OnInit { 
    home: Home;
	constructor(
	        private homeService: HomeService,
			private route: ActivatedRoute) { }
    ngOnInit() {
       //this.route.params
       // .switchMap((params: Params) => this.countryService.getCountry(+params['country-id']))
       // .subscribe(country => this.country = country);
    }					
}
    