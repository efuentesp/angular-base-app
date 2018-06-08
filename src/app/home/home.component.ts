import { Component } from '@angular/core';
import {User} from  '../user/user.component.model';
import { Authority } from '../user/authorities.component.model';
import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioService } from './beneficiario/beneficiario.component.service';
import { Beneficiario } from './beneficiario/beneficiario.component.model';
import { ActivatedRoute, Router }                                          from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 

  public user: User;
  public valueName: string;
  public array: Authority;
  public image: boolean;
  public admin: boolean;
  public default: boolean;
  public usertype: boolean;
  public system: boolean;
  public authorities: string[] = []; 
  public authority : Authority [] = [];
  public beneficiario: Beneficiario;


  constructor(
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute

) {
}


  ngOnInit() {

    this.image = true;

    console.log('Usuario Home:', localStorage.getItem('currentUser'));

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log ('User: ', this.user);
    console.log ('UserAuth: ', this.user.authorities);
    console.log ('UserAuth: ', this.user.token);
    console.log ('UserAuth: ', this.user.userName);
    console.log ('UserAuth: ', this.user.idUser);
    
    //console.log ('Username: ', this.user.);

    this.array = this.user.authorities
    this.valueName = this.user.userName;

    console.log(this.array.authority);

 
    /*
    for (let entry of this.user.authorities) {
      console.log('Hola:',entry.authority); // 1, "string", false
      if  (entry.authority == 'administrador'){
        this.admin = true;
      }

      if  (entry.authority == 'system'){
        this.system = true;
      }

      if  (entry.authority == 'default'){
        this.default = true;
      }

      if  (entry.authority == 'user'){
        this.usertype = true;
      }

    }
*/  
    
    //this.hasAnyAuthority(this.user.authorities.authority);
}

  //isAdmin(): boolean {
  //  return true;
  //}

  isName():string{
    return this.valueName;
  }

  resetBeneficiario(){

    console.log('Inicio');
    this.beneficiarioService.setEdit(false);
    
    this.beneficiario.apellido_materno = "";
    this.beneficiario.apellido_paterno = "";
    this.beneficiarioService.setBeneficiario(this.beneficiario);

    console.log('Fin');
  }

}
    