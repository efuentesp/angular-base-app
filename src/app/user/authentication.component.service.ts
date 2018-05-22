import { Injectable } from '@angular/core';
import { environment }                             from "../../environments/environment";

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from "../user/user.component.model";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    private env: any = environment;
    private user: any = User;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        
    }

    //return this.http.get(this.env.api + "/beneficiario").map(res => res.json()).catch(BeneficiarioService.handleError);

    login(username: string, password: string) {

        this.user.username = username;
        this.user.password = password;
        console.log('Autorizacion');
        //return this.http.post(this.env.api + "/beneficiario", beneficiario).map(res => res);
        return this.http.post(this.env.api +'/api/authenticate', JSON.stringify({ username: username, password: password }))
        //return this.http.post(this.env.api +'/api/authenticate', this.user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}