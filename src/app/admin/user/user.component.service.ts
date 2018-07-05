import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User }                           from '../user/user.component.model';
import { Useraux } from './useraux.component.model';

@Injectable()
export class UserService {

    private isUserFormValid: boolean = false;
    private env: any = environment;
    //private user = new User();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    public user: User = JSON.parse(localStorage.getItem('currentUser'));
    private useraux = Useraux;

    constructor(private http: Http) {
    }

    getAllUser(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/userList",opts).pipe(map(res => res.json()));
    }

    saveUser(user, privileges){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        //user.imagen = user.username + '.jpg';

        console.log('User Service', user);

		if (!user.idUser){
            console.log("UserId:", this.user.idUser);
            return this.http.post(this.env.api + "/user/"+ user.username + "/" + privileges, user , opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/user/"+this.user, this.useraux, opts).pipe(map(res => res));
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

    resetUser(): User {
        this.clear();
        return this.user;
    }

    getUser(): User {
        var user: User = {

            idUser: this.user.idUser,
            username: this.user.username,
            password: '',
            token: this.user.token,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            authorities: this.user.authorities,
            email: this.user.email
        };
        return user;
    }

    setUser(user: User) {

    this.isUserFormValid = true;

    this.user.idUser = user.idUser;
    this.user.username = user.username;
    this.user.password = user.password;
    this.user.token= this.user.token,
    this.user.firstname= this.user.firstname,
    this.user.lastname= this.user.lastname,
    this.user.authorities =this.user.authorities,
    this.user.email = this.user.email
    }

    isFormValid() {
        return this.isUserFormValid;
    }

    validateUser() {

    }

    clear() {
        this.user.idUser = null;
        this.user.username = '';
        this.user.password = '';
        this.user.token= '';
        this.user.firstname= '';
        this.user.lastname= '';
        this.user.authorities =null;
        this.user.email = '';
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