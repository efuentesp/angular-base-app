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
    private flag :boolean = false;

    constructor(private http: Http) {
    }

    getAllUser(){
      return this.http.get(this.env.api + "/user").map(res => res.json()).catch(UserService.handleError);
    }

    getModulosAccionAuthorityByUserName(username){
        return this.http.get(this.env.api + "/user/username/"+username).map(res => res);
    }

    saveUser(user){
       
        console.log('User: ', user.userName);
        user.imagen = user.userName + '.jpg';
        //user.rol    = 'admin';
        console.log('User: ', user.rol);
        console.log('User Service', user);

		if (!user.idUser){
            return this.http.post(this.env.api + "/user", user).map(res => res);
        }else{
            return this.http.put(this.env.api + "/user/"+user.idUser, user).map(res => res);
        }
    }

    deleteUser(user){
        return this.http.delete(this.env.api + "/user/"+user.idUser, user).map(res => res);
    }

    getUserById(idUser){
        return this.http.get(this.env.api + "/user/"+idUser).map(res => res);
    }
    
    resetUser(): User {
        this.clear();
        return this.user;
    }

    getUser(): User {
        var user: User = {
                    
            idUser: this.user.idUser,
            userName: this.user.userName,
                    password: this.user.password,
                    rol: this.user.rol,
                    imagen: this.user.imagen

        };
        return user;
    }

    setUser(user: User) {
       
    this.isUserFormValid = true;
    
    this.user.idUser = user.idUser;
    this.user.userName = user.userName;
    this.user.password = user.password;
    this.user.rol = user.rol;
    this.user.imagen = user.imagen;
          
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
        this.user.rol = '';
        this.user.imagen = '';
    }
    
    setEdit(flag){
        this.flag = flag;
    }

    getEdit(){
        return this.flag;
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
