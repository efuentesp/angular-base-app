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

    constructor(private http: Http) {
    }

    getAllAccion(){
      return this.http.get(this.env.api + "/accion").map(res => res.json()).catch(AccionService.handleError);
    }

    resetAccion(): Accion {
        this.clear();
        return this.accion;
    }

    getAccion(): Accion {
        var accion: Accion = {
                
					fechaCreacion: this.accion.fechaCreacion, 
					fechaModificacion: this.accion.fechaModificacion, 
					estatus: this.accion.estatus, 
                    accion: this.accion.accion,
                    accionId: this.accion.accionId
        };
        return accion;
    }

    setAccion(accion: Accion) {
       
	this.isAccionFormValid = true;
            
            this.accion.accion = accion.accion;
            this.accion.fechaCreacion = accion.fechaCreacion;
            this.accion.fechaModificacion = accion.fechaModificacion;
            this.accion.estatus = accion.estatus;
            this.accion.accionId = accion.accionId;
    }

    isFormValid() {
        return this.isAccionFormValid;
    }

    validateAccion() {

    }

    clear() {
            /*
			this.afiliado.fecha_afiliacion = '';    
			this.afiliado.foto = '';    
			this.afiliado.correo = '';    
			this.afiliado.apellido_materno = '';    
			this.afiliado.acta_nacimiento = '';    
			this.afiliado.monto_pension = '';    
			this.afiliado.apellido_paterno = '';    
			this.afiliado.observaciones = '';    
			this.afiliado.nombre = '';    
			this.afiliado.semanas_cotizadas = '';    
			this.afiliado.nss = '';    
			this.afiliado.generoId = null;
			this.afiliado.beneficiarioId = null;
            this.afiliado.afiliadoId = null;
            */
    }

    saveAccion(accion){

		if (!accion.accionId){
            return this.http.post(this.env.api + "/accion", accion).map(res => res);
        }else{
            return this.http.put(this.env.api + "/accion/"+accion.accionId, accion).map(res => res);
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
