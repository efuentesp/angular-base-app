import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Tipopension }                           from '../tipopension/tipopension.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class TipopensionService {

    private isTipopensionFormValid: boolean = false;
    private env: any = environment;
    private tipopension = new Tipopension();
    private flag :boolean = false;
    private flagDelete :boolean = false;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllTipopension(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/tipopension", opts).pipe(map(res => res.json()));
    }


    saveTipopension(tipopension){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!tipopension.tipopensionId){
            return this.http.post(this.env.api + "/tipopension", tipopension, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/tipopension/"+tipopension.tipopensionId, tipopension, opts).pipe(map(res => res));
        }
    }

    deleteTipopension(tipopension){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/tipopension/"+tipopension.tipopensionId, tipopension).pipe(map(res => res));
    }

    geteTipopensionById(tipopensionId){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/tipopension/"+tipopensionId, opts).pipe(map(res => res));
    }

    resetTipopension(): Tipopension {
        this.clear();
        return this.tipopension;
    }

    getTipopension(): Tipopension {
        var tipopension: Tipopension = {
					nombre: this.tipopension.nombre,
					clave: this.tipopension.clave,

					tipopensionId: this.tipopension.tipopensionId

        };
        return tipopension;
    }

    setTipopension(tipopension: Tipopension) {

	this.isTipopensionFormValid = true;
			this.tipopension.nombre = tipopension.nombre;
			this.tipopension.clave = tipopension.clave;
			this.tipopension.tipopensionId        = tipopension.tipopensionId;
    }

    isFormValid() {
        return this.isTipopensionFormValid;
    }

    clear() {

			this.tipopension.nombre = '';
			this.tipopension.clave = '';
			this.tipopension.tipopensionId = null;
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
