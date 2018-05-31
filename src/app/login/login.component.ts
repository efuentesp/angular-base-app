import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { AuthenticationService } from '../user/authentication.component.service';
import { User } from '../user/user.component.model';
//import {AuthenticationService} from '../_services/authentication.service';


@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
    
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    private user = new User();
    

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.user)
            .subscribe(result => {
            if (result){
                this.router.navigate(['/home']);
                window.location.reload();
                //this.location.pathname = '/home';
                
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
