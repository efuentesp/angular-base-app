import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  template: `
  
  <div class="container body">
  <div class="main_container">
    <!-- page content -->
    <div class="col-md-12">
      <div class="col-middle">
        <div class="text-center text-center">
          <h1 class="error-number">404</h1>
          <h2>Sorry but we couldn't find this page</h2>
          <p>This page you are looking for does not exist <a href="#" (click)="goBack()">Report this?</a>
          </p>
        </div>
      </div>
    </div>
    <!-- /page content -->
  </div>
</div>
            `
})
export class PageNotFoundComponent {
	constructor(private location: Location) { }
	goBack(): void {
        this.location.back();
    }
}