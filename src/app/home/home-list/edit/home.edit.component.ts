import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
//import 'rxjs/add/operator/switchMap';

import { HomeService } from '../../service/home.service';
import { Home } from '../../home';

@Component({
  templateUrl: './home.edit.component.html' 
}) 
export class HomeEditComponent implements OnInit { 
    home: Home;
	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute,
        private router: Router) { }
		
    ngOnInit() {
       //this.route.params
       // .switchMap((params: Params) => this.countryService.getCountry(+params['country-id']))
       // .subscribe(country => {
		//            this.country = country;
		//			this.setFormValues();
		//		}
		// );
    }	
	homeForm = new FormGroup({
	   name: new FormControl(),
	   capital: new FormControl(),
	   currency: new FormControl()
	});	
	setFormValues() {
	   this.homeForm.setValue({name: this.home.homeName, 
	      capital: this.home.capital, currency: this.home.currency});
	}	
	onFormSubmit() {
	   this.home.homeName = this.homeForm.get('name').value;
	   this.home.capital = this.homeForm.get('capital').value;
	   this.home.currency = this.homeForm.get('currency').value;
	   
	   this.homeService.updateHome(this.home)
	     .then(() =>
    		  this.router.navigate([ '../../' ], { relativeTo: this.route })
		 );
	}
}