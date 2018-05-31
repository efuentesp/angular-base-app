import { Component, OnInit } from '@angular/core';

import { HomeService } from '../service/home.service';
import { Home } from '../home';

@Component({
  templateUrl: './home.list.component.html' 
}) 
export class HomeListComponent implements OnInit { 
  countries: Promise<Home[]>;
  constructor(private homeService: HomeService) {}
  ngOnInit() {
    this.countries = this.homeService.getCountries();
  }	
}
    