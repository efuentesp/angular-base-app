import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Authority }                           from '../authority/authority.component.model';

@Injectable()
export class AuthorityService {

    private isAuthorityFormValid: boolean = false;
    private env: any = environment;
    private authority = new Authority();

    constructor(private http: Http) {
    }

    getAllAuthority(){
      return this.http.get(this.env.api + "/authority").map(res => res.json()).catch(AuthorityService.handleError);
    }

    resetAuthority(): Authority {
        this.clear();
        return this.authority;
    }

    getAuthority(): Authority {
        var authority: Authority = {

            idrol: this.authority.idrol,
            rol: this.authority.rol,
            estatus: this.authority.estatus,
            fechaCreacion: this.authority.fechaCreacion,
            fechaModificacion: this.authority.fechaModificacion
                   
        };
        return authority;
    }

    setAuthority(authority: Authority) {
       
	this.isAuthorityFormValid = true;
            
    this.authority.idrol = authority.idrol;
    this.authority.rol = authority.rol;
    this.authority.estatus = authority.estatus;
    this.authority.fechaCreacion = authority.fechaCreacion;
    this.authority.fechaModificacion = authority.fechaModificacion

    }

    isFormValid() {
        return this.isAuthorityFormValid;
    }

    validateAuthority() {

    }

    clear() {
        this.authority.idrol = null;
        this.authority.rol = '';
        this.authority.estatus = null;
        this.authority.fechaCreacion = '';
        this.authority.fechaModificacion = '';
    }

    saveAuthority(authority){

		if (!authority.authorityId){
            return this.http.post(this.env.api + "/authority", authority).map(res => res);
        }else{
            return this.http.put(this.env.api + "/authority/"+authority.authorityId, authority).map(res => res);
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
