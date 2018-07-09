import { Authority } from "../authority/authority.component.model";






export class UserAux {

	idUser: number = null;   // <--- On Session
	username:  string = '';
	password:  string = '';
	token: string = '';
	firstname: string;
	lastname:string;
	authorities: Authority[];
	email: string = '';
	enabled: boolean = false;

}
