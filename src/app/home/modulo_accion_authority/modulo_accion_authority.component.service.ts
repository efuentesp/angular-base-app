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
      return this.http.get(this.env.api + "/moduloaccionauthority").map(res => res.json()).catch(ModuloAccionAuthorityService.handleError);
    }


    getAllModuloAccionAuthorityById(idModuloAccion,idAuthority){
        console.log('ById');
        return this.http.get(this.env.api + "/moduloaccionauthorityid/"+idModuloAccion+"/"+idAuthority).map(res => res.json()).catch(ModuloAccionAuthorityService.handleError);     
    }

    getIsSelected(idModulo, idAccion, idAuthority){
        console.log('selected');
        return this.http.get(this.env.api + "//moduloaccionauthority/"+idModulo+"/"+idAccion+"/"+idAuthority).map(res => res.json()).catch(ModuloAccionAuthorityService.handleError);     
    }

    save(authority){
        console.log('ModuloAccionAuthorityService: --> ',authority);
		if (!authority.idmoduloaccionauthority){
            console.log('post');
            return this.http.post(this.env.api + "/moduloaccionauthority", authority).map(res => res);
        }else{
            console.log('put');
            return this.http.put(this.env.api + "/moduloaccionauthority/"+authority.idmoduloaccionauthority, authority).map(res => res);
        }
    }

    saveMaa(idModulo, idAccion, idAuthority, res){
        return this.http.get(this.env.api + "/moduloaccionauthority/"+idModulo+"/"+idAccion+"/"+idAuthority+"/"+res).map(res => res);
    }

    deleteModuloAccionAuthority(authority){
        return this.http.delete(this.env.api + "/moduloaccionauthority/"+authority.idmoduloaccionauthority, authority).map(res => res);
    }

    getModuloAccionAuthorityById(idmoduloaccionauthority){
        return this.http.get(this.env.api + "/moduloaccionauthority/"+idmoduloaccionauthority).map(res => res);
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
