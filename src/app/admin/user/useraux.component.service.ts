import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Useraux } from './useraux.component.model';

@Injectable()
export class UserServiceAuxiliar {

    private isUserFormValid: boolean = false;
    private env: any = environment;
    private user = new Useraux();
    private flag :boolean = false;
    private flagDelete :boolean = false;
  

    constructor(private http: Http) {
    }

    getAllUser(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/userList",opts).pipe(map(res => res.json()));
    }

    saveUser(user){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        user.imagen = user.username + '.jpg';

		if (!user.idUser){
            return this.http.post(this.env.api + "/user", user, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/user/"+user.idUser, user, opts).pipe(map(res => res));
        }
    }

    deleteUser(user){
        return this.http.delete(this.env.api + "/user/"+user.idUser, user).pipe(map(res => res));
    }

    getUserById(idUser){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/user/"+idUser, opts).pipe(map(res => res));
    }

    resetUser(): Useraux {
        this.clear();
        return this.user;
    }

    getUser(): Useraux {
        var user: Useraux = {

            idUser: this.user.idUser,
            userName: this.user.userName,
            password: this.user.password,
            token: this.user.token,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            authorities: this.user.authorities
        };
        return user;
    }

    setUser(user: Useraux) {

    this.isUserFormValid = true;
    console.log("Usuario auxiliar:", user);
    this.user.idUser = user.idUser;
    this.user.userName = user.userName;
    this.user.password = user.password;
    this.user.token= user.token;
    this.user.firstname= user.firstname;
    this.user.lastname= user.lastname;
    this.user.email = user.email;
    this.user.authorities = user.authorities;
    }

    isFormValid() {
        return this.isUserFormValid;
    }

    validateUser() {

    }

    clear() {
        this.user.idUser = null;
        this.user.userName = '';
        this.user.password = '';
        this.user.token= '';
        this.user.firstname= '';
        this.user.lastname='';
        this.user.email = '';
        this.user.authorities = null;
    }

    setEdit(flag){
        this.flag = flag;
    }

    getEdit(){
        return this.flag;
    }

    setDelete(flagDelete){
        this.flagDelete = flagDelete;
    }

    getDelete(){
        return this.flagDelete;
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
