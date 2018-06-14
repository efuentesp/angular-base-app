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
    /*
    console.log ('User: ', this.user);
    console.log ('UserAuth: ', this.user.authorities);
    console.log ('UserAuth: ', this.user.token);
    console.log ('UserAuth: ', this.user.userName);
    console.log ('UserAuth: ', this.user.idUser);
    
    console.log ('Username: ', this.user.userName);*/
    

    this.rol = this.user.authorities[0].authority;
    this.authorityService.getAuthorityByName(this.rol).subscribe(data => {
      this.authority = data;
      this.moduloAccionAuthorityService.searchModuloAccionAuthorityById(this.authority.idRol).subscribe(data =>{
        // Obtiene todos los modulos accions
        this.moduloAccionAuthorityList = data;
        
        
        this.moduloAccionAuthorityList.forEach(element => {
          // De cada modulo accion, obtendremos el modulo
          this.moduloAccionService.getModuloAccion(element.idModuloAccion).subscribe(data => {
           
            this.moduloAccionList.push(data);
            this.moduloAccion = data;



            this.moduloService.getModuloById(this.moduloAccion.idModulo).subscribe(data =>{
            
            this.modulo = data;
                   
            this.moduloList.push(this.modulo);
                   
                

/*
                  this.moduloList.forEach(element => {
                    console.log('ElementoA:', element.modulo);
                  
                    this.moduloAuxList.forEach(element2 => {
                      console.log('ElementoB:', element2.modulo);
                      if (element2.modulo != element.modulo){
                        this.moduloAuxList.push(element2);
                      }
                    });
                  });
*/

            });
          });
        });
      });
    });

    console.log("Modulos Action Authority: ", this.moduloAccionAuthorityList);
    console.log("Modulos activos: ", this.moduloAccionList);
    console.log("Modulo: ", this.moduloList);



    console.log("ModuloAux: ", this.moduloAuxList);

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


}
    