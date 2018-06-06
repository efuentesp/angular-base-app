import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Authority }                           from '../authority/authority.component.model';

@Injectable()
export class ModuloAccionAuthorityService {

    private isAuthorityFormValid: boolean = false;
    private env: any = environment;
    private authority = new Authority();
    private flag :boolean = false;

    constructor(private http: Http) {}

    getAllModuloAccionAuthority(){
      return this.http.get(this.env.api + "/moduloAccionAuthority").map(res => res.json()).catch(ModuloAccionAuthorityService.handleError);
    }
    save(authority){
		if (!authority.idModuloAccionAuthority){
            return this.http.post(this.env.api + "/moduloAccionAuthority", authority).map(res => res);
        }else{
            return this.http.put(this.env.api + "/moduloAccionAuthority/"+authority.idModuloAccionAuthority, authority).map(res => res);
        }
    }

    deleteModuloAccionAuthority(authority){
        return this.http.delete(this.env.api + "/moduloAccionAuthority/"+authority.idModuloAccionAuthority, authority).map(res => res);
    }

    getModuloAccionAuthorityById(idModuloAccionAuthority){
        return this.http.get(this.env.api + "/moduloAccionAuthority/"+idModuloAccionAuthority).map(res => res);
    }

    resetModuloAccionAuthority(): Authority {
        this.clear();
        return this.authority;
    }

    getModuloAccionAuthority(): Authority {
        var authority: Authority = {
					estatus: this.authority.estatus, 
					fechaCreacion: this.authority.fechaCreacion, 
					fechaModificacion: this.authority.fechaModificacion, 
					idRol: this.authority.idRol, 
					rol: this.authority.rol
        };
        return authority;
    }

    setModuloAccionAuthority(authority: Authority) {
       
	        this.isAuthorityFormValid = true;
			this.authority.estatus = authority.estatus;    
			this.authority.fechaCreacion = authority.fechaCreacion;    
			this.authority.fechaModificacion = authority.fechaModificacion;    
			this.authority.idRol = authority.idRol;    
			this.authority.rol = authority.rol;  
    }

    isFormValid() {
        return this.isAuthorityFormValid;
    }

    clear() {

			this.authority.estatus = null;    
			this.authority.fechaModificacion = '';    
			this.authority.fechaCreacion = '';   
			this.authority.idRol = null;    
			this.authority.rol = null;
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
