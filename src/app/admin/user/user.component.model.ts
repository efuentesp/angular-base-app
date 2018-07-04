import { Authority } from "../../user/authorities.component.model";



export class User {

	idUser: number = null;   // <--- On Session
	username:  string = '';
	password:  string = '';
	//rol: string = '';
	//imagen: string = '';
	token: string = '';
	firstname: string;
	lastname:string;
	authorities: Authority[];
	email: string = '';

}
