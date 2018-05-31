import { Injectable } from '@angular/core';

import { Home } from '../home';

const COUNTRIES = [
  new Home(1, 'India', 'New Delhi', 'INR'),
  new Home(2, 'China', 'Beijing', 'RMB')
];
let countriesPromise = Promise.resolve(COUNTRIES);

@Injectable()
export class HomeService { 
	getCountries(): Promise<Home[]> {
	    return countriesPromise;
	}
	getHome(id: number): Promise<Home> {
        return this.getCountries()
            .then(countries => countries.find(home => home.homeId === id));
    }	
    updateHome(home: Home): Promise<Home> {
		return this.getCountries()
		  .then(countries => {
		        let homeObj = countries.find(ob => ob.homeId === home.homeId);
                homeObj = home;
				return homeObj;
			}
		  );
    }	
    addHome(home: Home): Promise<Home> {
		return this.getCountries()
		  .then(countries => {
		     let maxIndex = countries.length - 1;
		     let homeWithMaxIndex = countries[maxIndex];
		     home.homeId = homeWithMaxIndex.homeId + 1;
		     countries.push(home);
			 return home;
		  }
		);
    }	
}