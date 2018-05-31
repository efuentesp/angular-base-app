import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HomeService } from '../service/home.service';
import { Home } from '../home';
@Component({
    templateUrl: './add-home.component.html'
})
export class AddHomeComponent { 
	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute,
        private router: Router) { }
		
	homeForm = new FormGroup({
	   name: new FormControl(),
	   capital: new FormControl(),
	   currency: new FormControl()
	});	
	onFormSubmit() {
	   let name = this.homeForm.get('name').value;
	   let capital = this.homeForm.get('capital').value;
	   let currency = this.homeForm.get('currency').value;
	   
	   let home = new Home(null, name, capital, currency);
	   this.homeService.addHome(home)
	      .then(data =>
    		  this.router.navigate([ '../list/view', data.homeId ], { relativeTo: this.route })
		   );
	}
}
    