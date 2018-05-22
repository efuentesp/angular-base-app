/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent{
}

*/


import { Component, OnInit, Input }   from '@angular/core';

@Component ({
    /*
    selector: 'app-root'
    ,templateUrl: './app.component.html'
    */
   selector: 'app-root',
   template: `
     <router-outlet></router-outlet>
     <app-footer></app-footer>
    `,
})

export class AppComponent
{
    title = 'Angular';
}

