import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Beneficiario }                           from '../beneficiario/beneficiario.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class BeneficiarioService {

    private isBeneficiarioFormValid: boolean = false;
    private env: any = environment;
    private beneficiario = new Beneficiario();
    private flag :boolean = false;
    private flagDelete :boolean = false;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {}

    getAllBeneficiario(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/beneficiario", opts).pipe(map(res => res.json()));
    }

    saveBeneficiario(beneficiario){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!beneficiario.beneficiarioId){
            return this.http.post(this.env.api + "/beneficiario", beneficiario, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/beneficiario/"+beneficiario.beneficiarioId, beneficiario, opts).pipe(map(res => res));
        }
    }

    deleteBeneficiario(beneficiario){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/beneficiario/"+beneficiario.beneficiarioId, opts).pipe(map(res => res));
    }

    getBeneficiarioById(beneficiarioId){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/beneficiario/"+beneficiarioId, opts).pipe(map(res => res.json()));
    }

    resetBeneficiario(): Beneficiario {
        this.clear();
        return this.beneficiario;
    }

    getBeneficiario(): Beneficiario {
        var beneficiario: Beneficiario = {
					apellido_materno: this.beneficiario.apellido_materno,
					curp: this.beneficiario.curp,
					fecha_nacimiento: this.beneficiario.fecha_nacimiento,
					nombre: this.beneficiario.nombre,
					apellido_paterno: this.beneficiario.apellido_paterno,

					parentescoId: this.beneficiario.parentescoId,
					beneficiarioId: this.beneficiario.beneficiarioId

        };
        return beneficiario;
    }

    setBeneficiario(beneficiario: Beneficiario) {

	        this.isBeneficiarioFormValid = true;
			this.beneficiario.apellido_materno = beneficiario.apellido_materno;
			this.beneficiario.curp = beneficiario.curp;
			this.beneficiario.fecha_nacimiento = beneficiario.fecha_nacimiento;
			this.beneficiario.nombre = beneficiario.nombre;
			this.beneficiario.apellido_paterno = beneficiario.apellido_paterno;
			this.beneficiario.parentescoId = beneficiario.parentescoId;
			this.beneficiario.beneficiarioId        = beneficiario.beneficiarioId;

    }

    isFormValid() {
        return this.isBeneficiarioFormValid;
    }

    clear() {

			this.beneficiario.apellido_materno = '';
			this.beneficiario.curp = '';
			this.beneficiario.fecha_nacimiento = '';
			this.beneficiario.nombre = '';
			this.beneficiario.apellido_paterno = '';
			this.beneficiario.parentescoId = null;
			this.beneficiario.beneficiarioId = null;
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
