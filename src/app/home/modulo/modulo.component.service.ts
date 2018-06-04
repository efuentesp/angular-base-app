import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Modulo }                           from '../modulo/modulo.component.model';

@Injectable()
export class ModuloService {

    private isModuloFormValid: boolean = false;
    private env: any = environment;
    private modulo = new Modulo();
    private flag :boolean = false;

    constructor(private http: Http) {}

    getAllModulo(){
      return this.http.get(this.env.api + "/modulo").map(res => res.json()).catch(ModuloService.handleError);
    }

    saveModulo(modulo){
        console.log('Modulo', modulo);
		if (!modulo.moduloId){
            return this.http.post(this.env.api + "/modulo", modulo).map(res => res);
        }else{
            return this.http.put(this.env.api + "/modulo/"+modulo.moduloId, modulo).map(res => res);
        }
    }

    deleteModulo(modulo){
        return this.http.delete(this.env.api + "/modulo/"+modulo.moduloId, modulo).map(res => res);
    }

    getModuloById(moduloId){
        return this.http.get(this.env.api + "/modulo/"+moduloId).map(res => res);
    }

    resetModulo(): Modulo {
        this.clear();
        return this.modulo;
    }

    getModulo(): Modulo {
        var modulo: Modulo = {
					estatus: this.modulo.estatus, 
					fechaCreacion: this.modulo.fechaCreacion, 
					fechaModificacion: this.modulo.fechaModificacion, 
					modulo: this.modulo.modulo, 
					idModulo: this.modulo.idModulo
        };
        return modulo;
    }

    setModulo(modulo: Modulo) {
       
	        this.isModuloFormValid = true;
			this.modulo.estatus = modulo.estatus;    
			this.modulo.fechaCreacion = modulo.fechaCreacion;    
			this.modulo.fechaModificacion = modulo.fechaModificacion;    
			this.modulo.modulo = modulo.modulo;    
			this.modulo.idModulo = modulo.idModulo;    
        	
    }

    isFormValid() {
        return this.isModuloFormValid;
    }

    clear() {

        this.modulo.estatus = null;    
        this.modulo.fechaCreacion = '';    
        this.modulo.fechaModificacion = '';    
        this.modulo.modulo = '';    
        this.modulo.idModulo = null;  
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
