import { Authority } from "../authority/authority.component.model";

export class Useraux {

	idUser: number = null;   // <--- On Session
	
	password:  string = '';
	//rol: string = '';
	//imagen: string = '';
	token: string = '';
	lastname: string = '';
	firstname: string = '';
	email: string = '';
	userName:  string = '';
	authorities: Authority[];
}