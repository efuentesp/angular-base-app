import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { HttpModule, Http }   from '@angular/http';  
import { NgxPaginationModule} from 'ngx-pagination'; 

import { AppComponent }  from './app.component';
import { PageNotFoundComponent }  from './page-not-found.component';

import { LoginComponent }      from './login/login.component';
import { HomeModule }          from './home/home.module';
import { AppRoutingModule }    from './app-routing.module';

import { AuthGuard }             from './guards/auth.guard';
import { AuthenticationService } from './user/authentication.component.service';
import { UserService }           from './user/user.component.service';

@NgModule({
  imports: [     
		BrowserModule,
		FormsModule,
		HomeModule,
		AppRoutingModule,
		NgxPaginationModule,
		HttpModule
  ],
  declarations: [
	  	LoginComponent,
        AppComponent,
		PageNotFoundComponent
  ],
  providers: [
	AuthGuard,
	AuthenticationService,
	UserService,
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

