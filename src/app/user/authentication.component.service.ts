import { Injectable } from '@angular/core';
import { environment }                             from "../../environments/environment";

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from "../user/user.component.model";
import 'rxjs/add/operator/map'
import { reject } from 'q';
import { Authority } from './authorities.component.model';

@Injectable()
export class AuthenticationService {
    public token: string;
    private env: any = environment;
    private user: any = User;
    public authorities: string[] = []; 
    public userName: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.authorities = currentUser && currentUser.authorities;
        this.userName = currentUser && currentUser.username;
        
    }

    login(user) {

        return this.http.post(this.env.api + "/api/authenticate", user).map(response => 
                {

               
                let token = response.json() && response.json().token;
                let authorities = response.json() && response.json().authorities;
                let userName = response.json() && response.json().username;
                

                if (token) {
                    
                    this.token = token;
                    this.authorities = authorities;
                    this.userName = userName;
                   
                    localStorage.setItem('currentUser', JSON.stringify({ userName: userName, token: token, authorities: authorities}));
                    return true;
                }
                return false;
            } 
        );
         
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    errorHandler(error: any): void {
        console.log(error)
      } 
}