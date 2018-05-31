import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }                  		 from './guards/auth.guard';
import { PageNotFoundComponent }           from './page-not-found.component';
import { LoginComponent}              		 from './login/login.component';	
import { HomeComponent }                   from './home/home.component';

const routes: Routes = [	
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent 
  }	
];
@NgModule({
  imports: [ 
          RouterModule.forRoot(routes) 
  ],
  exports: [ 
          RouterModule 
  ]
})
export class AppRoutingModule{ } 