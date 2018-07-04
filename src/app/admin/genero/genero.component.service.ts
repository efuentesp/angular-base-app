import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Genero }                           from '../genero/genero.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class GeneroService {

    private isGeneroFormValid: boolean = false;
    private env: any = environment;
    private genero = new Genero();
    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllGenero(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/genero").pipe(map(res => res.json()));
    }

    resetGenero(): Genero {
        this.clear();
        return this.genero;
    }

    getGenero(): Genero {
        var genero: Genero = {
					female: this.genero.female, 
					male: this.genero.male, 
					
					generoId: this.genero.generoId	

        };
        return genero;
    }

    setGenero(genero: Genero) {
       
	this.isGeneroFormValid = true;
			this.genero.female = genero.female;    
			this.genero.male = genero.male;    
			this.genero.generoId        = genero.generoId;
        	this.validateGenero();
    }

    isFormValid() {
        return this.isGeneroFormValid;
    }

    validateGenero() {

    }

    clear() {

			this.genero.female = '';    
			this.genero.male = '';    
			this.genero.generoId = null;
    }

    saveGenero(genero){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!genero.generoId){
            return this.http.post(this.env.api + "/genero", genero, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/genero/"+genero.generoId, genero, opts).pipe(map(res => res));
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
