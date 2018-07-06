import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Afiliado }                           from '../afiliado/afiliado.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';


@Injectable()
export class AfiliadoService {

    private isAfiliadoFormValid: boolean = false;
    private env: any = environment;
    private afiliado = new Afiliado();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;
    
    public user: User = JSON.parse(localStorage.getItem('currentUser'));
    
    constructor(private http: Http) {}

    getAllAfiliado(){
         let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/afiliado", opts).pipe(map(res => res.json()));
    }

    saveAfiliado(afiliado){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!afiliado.afiliadoId){
            return this.http.post(this.env.api + "/afiliado", afiliado, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/afiliado/"+ afiliado.afiliadoId, afiliado, opts).pipe(map(res => res));
        }
    }

    deleteAfiliado(afiliado){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/afiliado/"+afiliado.afiliadoId, opts).pipe(map(res => res));
    }

    resetAfiliado(): Afiliado {
        this.clear();
        return this.afiliado;
    }

    getAfiliado(): Afiliado {
        var afiliado: Afiliado = {
					fecha_afiliacion: this.afiliado.fecha_afiliacion,
					foto: this.afiliado.foto,
					correo: this.afiliado.correo,
					apellido_materno: this.afiliado.apellido_materno,
					acta_nacimiento: this.afiliado.acta_nacimiento,
					monto_pension: this.afiliado.monto_pension,
					apellido_paterno: this.afiliado.apellido_paterno,
					observaciones: this.afiliado.observaciones,
					nombre: this.afiliado.nombre,
					semanas_cotizadas: this.afiliado.semanas_cotizadas,
					nss: this.afiliado.nss,

					generoId: this.afiliado.generoId,
                    beneficiarioId: this.afiliado.beneficiarioId,
                    afiliadoId: this.afiliado.afiliadoId
        };
        return afiliado;
    }

    setAfiliado(afiliado: Afiliado) {

	        this.isAfiliadoFormValid = true;
			this.afiliado.fecha_afiliacion = afiliado.fecha_afiliacion;
			this.afiliado.foto = afiliado.foto;
			this.afiliado.correo = afiliado.correo;
			this.afiliado.apellido_materno = afiliado.apellido_materno;
			this.afiliado.acta_nacimiento = afiliado.acta_nacimiento;
			this.afiliado.monto_pension = afiliado.monto_pension;
			this.afiliado.apellido_paterno = afiliado.apellido_paterno;
			this.afiliado.observaciones = afiliado.observaciones;
			this.afiliado.nombre = afiliado.nombre;
			this.afiliado.semanas_cotizadas = afiliado.semanas_cotizadas;
			this.afiliado.nss = afiliado.nss;
			this.afiliado.generoId = afiliado.generoId;
			this.afiliado.beneficiarioId = afiliado.beneficiarioId;
			this.afiliado.afiliadoId        = afiliado.afiliadoId;
    }

    isFormValid() {
        return this.isAfiliadoFormValid;
    }

    clear() {

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
