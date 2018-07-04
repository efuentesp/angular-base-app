import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Authority }                           from '../authority/authority.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class AuthorityService {

    private isAuthorityFormValid: boolean = false;
    private env: any = environment;
    private authority = new Authority();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    public user: User = JSON.parse(localStorage.getItem('currentUser'));
User
    constructor(private http: Http) {}

    getAllAuthority(){
        let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/authority", opts).pipe(map(res => res.json()));
    }

    saveAuthority(authority){
        let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });

        console.log("Valor:", authority.idAuthority)

		if (!authority.idAuthority){
            return this.http.post(this.env.api + "/authority", authority, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/authority/"+authority.idAuthority, authority, opts).pipe(map(res => res));
        }
    }

    deleteAuthority(authority){
        return this.http.delete(this.env.api + "/authority/"+authority.idAuthority, authority).pipe(map(res => res));
    }

    getAuthorityById(idRol){
        return this.http.get(this.env.api + "/authority/"+idRol).pipe(map(res => res));
    }

    resetAuthority(): Authority {
        this.clear();
        return this.authority;
    }

    getAuthority(): Authority {
        var authority: Authority = {
                    
            enabled: this.authority.enabled,
            idAuthority: this.authority.idAuthority,
            name: this.authority.name
					// fechaCreacion: this.authority.fechaCreacion, 
					// fechaModificacion: this.authority.fechaModificacion, 
					// idRol: this.authority.idRol, 
                    // rol: this.authority.rol,
                    // isSelected: this.authority.isSelected
        };
        return authority;
    }

    setAuthority(authority: Authority) {
       
            this.isAuthorityFormValid = true;
            this.authority.idAuthority = authority.idAuthority;
            this.authority.enabled = authority.enabled;
            this.authority.name =authority.name;
			// this.authority.estatus = authority.estatus;    
			// this.authority.fechaCreacion = authority.fechaCreacion;    
			// this.authority.fechaModificacion = authority.fechaModificacion;    
			// this.authority.idRol = authority.idRol;    
            // this.authority.rol = authority.rol;  
            // this.authority.isSelected = authority.isSelected;
    }

    isFormValid() {
        return this.isAuthorityFormValid;
    }

    clear() {

        
            this.authority.idAuthority = null;
            this.authority.enabled = false;
            this.authority.name ='';
			// this.authority.estatus = null;    
			// this.authority.fechaModificacion = '';    
			// this.authority.fechaCreacion = '';   
			// this.authority.idRol = null;    
            // this.authority.rol = null;
            // this.authority.isSelected = false;
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

    setDelete(flagDelete){
        this.flagDelete = flagDelete;
      }
}
