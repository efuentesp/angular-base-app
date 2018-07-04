import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';


import { Solicitudpension }                           from '../solicitudpension/solicitudpension.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class SolicitudpensionService {

    private isSolicitudpensionFormValid: boolean = false;
    private env: any = environment;
    private solicitudpension = new Solicitudpension();
    private flag :boolean = false;
    private flagDelete :boolean = false;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {}

    getAllSolicitudpension(){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

      return this.http.get(this.env.api + "/solicitudpension", opts).pipe(map(res => res.json()));
    }

    saveSolicitudpension(solicitudpension){
        
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!solicitudpension.solicitudpensionId){
            return this.http.post(this.env.api + "/solicitudpension", solicitudpension, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/solicitudpension/"+solicitudpension.solicitudpensionId, solicitudpension).pipe(map(res => res));
        }
    }

    deleteSolicitudpension(solicitudpension){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/solicitudpension/"+solicitudpension.solicitudpensionId, solicitudpension).pipe(map(res => res));
    }

    getSolicitudpensionById(solicitudpensionId){
        
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        return this.http.get(this.env.api + "/solicitudpension/"+solicitudpensionId, opts).pipe(map(res => res));
    }

    resetSolicitudpension(): Solicitudpension {
        this.clear();
        return this.solicitudpension;
    }

    getSolicitudpension(): Solicitudpension {
        var solicitudpension: Solicitudpension = {
					numero: this.solicitudpension.numero,
					observaciones: this.solicitudpension.observaciones,
					fecha_solicitud: this.solicitudpension.fecha_solicitud,

					afiliadoId: this.solicitudpension.afiliadoId,
					tipopensionId: this.solicitudpension.tipopensionId,
					solicitudpensionId: this.solicitudpension.solicitudpensionId

        };
        return solicitudpension;
    }

    setSolicitudpension(solicitudpension: Solicitudpension) {

	this.isSolicitudpensionFormValid = true;
			this.solicitudpension.numero = solicitudpension.numero;
			this.solicitudpension.observaciones = solicitudpension.observaciones;
			this.solicitudpension.fecha_solicitud = solicitudpension.fecha_solicitud;
			this.solicitudpension.afiliadoId = solicitudpension.afiliadoId;
			this.solicitudpension.tipopensionId = solicitudpension.tipopensionId;
			this.solicitudpension.solicitudpensionId        = solicitudpension.solicitudpensionId;

    }

    isFormValid() {
        return this.isSolicitudpensionFormValid;
    }

    clear() {

			this.solicitudpension.numero = '';
			this.solicitudpension.observaciones = '';
			this.solicitudpension.fecha_solicitud = '';
			this.solicitudpension.afiliadoId = null;
			this.solicitudpension.tipopensionId = null;
			this.solicitudpension.solicitudpensionId = null;
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

}
