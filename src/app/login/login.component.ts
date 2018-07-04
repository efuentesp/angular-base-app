import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { User } from '../user/user.component.model';
import { AuthenticationService } from '../authentication.component.service';



@Component({
  templateUrl:'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  message: string;
  loading = false;
  private user = new User();
  error = '';

  constructor(public authenticationService: AuthenticationService, public router: Router) {
    //this.setMessage();
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  // setMessage() {
  //   //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }

  login() {

    this.message = 'Trying to log in ...';
   
    this.authenticationService.login(this.user).subscribe(result => {

        if (result){

          //this.router.navigate(['/home']);
          //window.location.reload();
          //this.location.pathname = '/admin';
          this.router.navigate(['admin']); 
          //let redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/admin';
          this.loading = true;

        }else{
          this.error = 'Username or password is incorrect';
          this.loading = false;
          //swal('Error...', this.error , 'error');
      }
  }, error => {
      this.error = 'Username or password is incorrect';
      this.loading = false;
      //swal('Error...', this.error , 'error');
  });
      
}


}



  //         // If result is true
  //         this.loading = true;

  //         //let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          
  //         //this.authService.isLoggedIn = true;
          
  //         let navigationExtras: NavigationExtras = {
  //           queryParamsHandling: 'preserve',
  //           preserveFragment: true
  //         };

  //         // Redirect the user
  //         this.router.navigate([redirect], navigationExtras);

  //         this.loading = true;
            
  //       }else{
  //         // If result is false
  //         this.loading = false;

  //           this.error = 'Username or password is incorrect';
            
  //           this.authService.isLoggedIn = false;
  //       }
        
  //   }, error => {
  //       this.error = 'Username or password is incorrect';
  //       this.loading = false;
  //   });


  //     /*
  //     this.setMessage();
  //     if (this.authService.isLoggedIn) {
  //       // Get the redirect URL from our auth service
  //       // If no redirect has been set, use the default
  //       let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

  //       // Set our navigation extras object
  //       // that passes on our global query params and fragment
  //       let navigationExtras: NavigationExtras = {
  //         queryParamsHandling: 'preserve',
  //         preserveFragment: true
  //       };

  //       // Redirect the user
  //       this.router.navigate([redirect], navigationExtras);
  //     }

  //   });*/
  // }

  // logout() {
  //   this.authService.logout();
  //   this.setMessage();
  // }

