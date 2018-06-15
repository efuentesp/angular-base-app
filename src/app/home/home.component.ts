import { Component } from '@angular/core';
import {User} from  '../user/user.component.model';

import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioService } from './beneficiario/beneficiario.component.service';
import { Beneficiario } from './beneficiario/beneficiario.component.model';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { UserService } from './user/user.component.service';
import { AuthorityService } from './authority/authority.component.service';
import { ModuloAccionAuthorityService } from './modulo_accion_authority/modulo_accion_authority.component.service';
import { Authority } from './authority/authority.component.model';
import { ModuloAccionAuthority } from './modulo_accion_authority/modulo_accion_authority.component.model';
import { ModuloAccionService } from './modulo_accion/modulo_accion.component.service';
import { ModuloAccion } from './modulo_accion/modulo_accion.component.model';
import { ModuloService } from './modulo/modulo.component.service';
import { Modulo } from './modulo/modulo.component.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 

  public user: User;
  public valueName: string;
  public authority: Authority;
  public image: boolean;
  public admin: boolean;
  public default: boolean;
  public usertype: boolean;
  public system: boolean;
  public authorities: string[] = []; 
  public authorityList : Authority [] = [];
  public beneficiario: Beneficiario;
  public moduloAccionAuthorityList: ModuloAccionAuthority [] = [];
  public moduloAccionList: ModuloAccion [] = [];
  public moduloAccion: ModuloAccion;
  public moduloList: Modulo [] = [];
  public moduloAuxList: Modulo [] = [];
  public modulo: Modulo;

  // Modulos
  public afiliadoLink : boolean = false;
  public beneficiarioLink: boolean = false;

  //public authorityAux: Authority;
  public rol: string;
  public count : Number;

  constructor(
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService, 
    private authorityService: AuthorityService,
    private moduloAccionAuthorityService:ModuloAccionAuthorityService,
    private moduloAccionService:ModuloAccionService,
    private moduloService:ModuloService
) {
}

  ngOnInit() {

    this.image = true;

    //console.log('Usuario Home:', localStorage.getItem('currentUser'));

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.valueName = this.user.userName;

    this.rol = this.user.authorities[0].authority;
    console.log ("Rol: ", this.rol);

    this.loadModulos();

  }

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

  loadModulos(){
   
    this.moduloService.getModuloByRole(this.rol).subscribe(res => {
      
      console.log("Resultado: ", res);
      this.moduloList = res;
  
      console.log('Resultado*****');
  
      this.moduloList.forEach(element => {
        
        console.log ('Elemento:', element.modulo);
  
        if (element.modulo=="afiliado"){
          console.log("Es true");
  
          this.afiliadoLink = true;
        }

        if (element.modulo=="beneficiario"){
          console.log("Es true");
  
          this.beneficiarioLink = true;
        }
  
      });
  
    });
  }
  

}
    