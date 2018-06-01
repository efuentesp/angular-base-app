import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User }                           from '../user/user.component.model';

@Injectable()
export class UserService {

    private isUserFormValid: boolean = false;
    private env: any = environment;
    private user = new User();

    constructor(private http: Http) {
    }

    getAllUser(){
      return this.http.get(this.env.api + "/user").map(res => res.json()).catch(UserService.handleError);
    }

    resetUser(): User {
        this.clear();
        return this.user;
    }

    getUser(): User {
        var user: User = {
                    
                    iduser: this.user.iduser,
                    username: this.user.username,
                    password: this.user.password,
                    rol: this.user.rol,
                    image: this.user.image

        };
        return user;
    }

    setUser(user: User) {
       
    this.isUserFormValid = true;
    
    this.user.iduser = user.iduser;
    this.user.username = user.username;
    this.user.password = user.password;
    this.user.rol = user.rol;
    this.user.image = user.image;
          
    }

    isFormValid() {
        return this.isUserFormValid;
    }

    validateUser() {

    }

    clear() {
        this.user.iduser = null;
        this.user.username = '';
        this.user.password = '';
        this.user.rol = '';
        this.user.image = '';
    }

    saveUser(user){
        console.log('User Service', user);
		if (!user.userId){
            return this.http.post(this.env.api + "/user", user).map(res => res);
        }else{
            return this.http.put(this.env.api + "/user/"+user.accionId, user).map(res => res);
        }
     
    }

	private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        if (error.status === 404) {
            errMsg = 'Resource was not found';
        } else {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = 'Error';
        }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
    }
}
