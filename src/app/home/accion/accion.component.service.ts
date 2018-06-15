import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Accion }                           from '../accion/accion.component.model';

@Injectable()
export class AccionService {

    private isAccionFormValid: boolean = false;
    private env: any = environment;
    private accion = new Accion();
    private flag :boolean = false;

    constructor(private http: Http) {}

    getAllAccion(){
      return this.http.get(this.env.api + "/accion").map(res => res.json()).catch(AccionService.handleError);
    }

    saveAccion(accion){
		if (!accion.idAccion){
            console.log('Accion:', accion);
            return this.http.post(this.env.api + "/accion", accion).map(res => res);
        }else{
            console.log('Accion:', accion);
            return this.http.put(this.env.api + "/accion/"+accion.idAccion, accion).map(res => res);
        }
    }

    deleteAccion(accion){
        console.log('delete:', accion.idAccion );
        return this.http.delete(this.env.api + "/accion/"+accion.idAccion, accion).map(res => res);
    }

    getAccionById(idAccion){
        console.log('delete:', idAccion );
        return this.http.get(this.env.api + "/accion/"+idAccion).map(res => res);
    }

    resetAccion(): Accion {
        this.clear();
        return this.accion;
    }

    getAccion(): Accion {
        var accion: Accion = {
					accion: this.accion.accion, 
					idAccion: this.accion.idAccion, 
					estatus: this.accion.estatus, 
					fechaCreacion: this.accion.fechaCreacion, 
                    fechaModificacion: this.accion.fechaModificacion,
                    isSelected: this.accion.isSelected
        };
        return accion;
    }

    setAccion(accion: Accion) {
       
	        //this.isAccionFormValid = true;
			this.accion.accion = accion.accion;    
			this.accion.idAccion = accion.idAccion;    
			this.accion.estatus = accion.estatus;    
			this.accion.fechaModificacion = accion.fechaModificacion;    
			this.accion.fechaCreacion = accion.fechaCreacion;    
            this.accion.isSelected = accion.isSelected;  
        	
    }

    isFormValid() {
        return this.isAccionFormValid;
    }

    clear() {

        this.accion.accion = '';    
        this.accion.idAccion = null;    
        this.accion.estatus = null;    
        this.accion.fechaModificacion = '';    
        this.accion.fechaCreacion = ''; 
        this.accion.isSelected = false; 
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
