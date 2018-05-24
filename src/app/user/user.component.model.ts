import { Authority } from "./authorities.component.model";

export class User {
    idUser : Number;
    userName: string;
    password: string;
    rol: string;
    token: string;
    authorities: Authority;
}