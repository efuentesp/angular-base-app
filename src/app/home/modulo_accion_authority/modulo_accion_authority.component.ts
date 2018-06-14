import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { Modulo }                                         from '../modulo/modulo.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';
import { AccionService } from '../accion/accion.component.service';
import { Accion } from '../accion/accion.component.model';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';
import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';
import { ModuloAccionAuthority } from './modulo_accion_authority.component.model';
import { ModuloAccionAuthorityService } from './modulo_accion_authority.component.service';
import { ModuloAccionService } from '../modulo_accion/modulo_accion.component.service';
import { ModuloAccion } from '../modulo_accion/modulo_accion.component.model';
import { element } from 'protractor';
import { ModuloAccionAuthorityAux } from './modulo_authority_accion.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './modulo_accion_authority.component.html',
    styleUrls: ['./modulo_accion_authority.component.css']
})

export class ModuloAccionAuthorityComponent implements OnInit {
  title = 'Nuevo User';
  userList: User;
  user: User;
  form: any;
  moduloAccionAuthority = new ModuloAccionAuthority;
  public flag: boolean = false;

  userArray: User[];
  selectedIndex = 4;
  timeVar = " hours";
  checkboxValue:boolean;
  idModuloAccion : number = null;

  authorityList: Authority [] = [];
  modulosList: Modulo [] = [];
  accionsList: Accion [] = [];
  moduloaccionsList: ModuloAccion [] = [];
  moduloAccion: ModuloAccion;
  moduloAccionAuthorityList : ModuloAccionAuthority [] = [];
  moduloAccionAuthorityAuxList : ModuloAccionAuthorityAux [] = [];

  isActive:boolean = true;
  filter = false;
  count: Number = 0;

  public busquedaBeneficiario='';
  filterInputBeneficiario = new FormControl();
  public isChecked: boolean;

  constructor(private router: Router, 
  private userService: UserService,
  private authorityService: AuthorityService, 
  private location: Location,
  private moduloService: ModuloService,
  private accionService: AccionService,
  private route:ActivatedRoute,
  private moduloAccionAuthorityService: ModuloAccionAuthorityService,
  private moduloAccionService: ModuloAccionService
) {
  
}

  ngOnInit() {
      this.loadModuloAccionAuthority();
      this.loadUsers();
      this.loadAuthoritys();
      this.loadModules();
      this.loadAccions();
      
      this.user = new User;
      this.flag = this.userService.getEdit();
      if (this.flag){
        this.user = this.userService.getUser();
      }

      
  }

  save(user){  
    this.userService.saveUser(this.user).subscribe(res => {
      if (res.status == 201 || res.status == 200){
        swal('Success...', 'User save successfully.', 'success');
        this.router.navigate([ '../user_mgmnt' ], { relativeTo: this.route })
      }else{
        swal('Error...', 'User save unsuccessfully.', 'error');
      }
    } );
  }



  delete(user){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((isConfirm) => {
      if (isConfirm.value) {
        this.userService.deleteUser(this.user).subscribe(res => {
          if (res.status == 201 || res.status == 200){
            swal('Success...', 'User item has been deleted successfully.', 'success');
            this.router.navigate([ '../user_mgmnt' ], { relativeTo: this.route })
          }else{
            swal('Error...', 'User deleted unsuccessfully.', 'error');
          }
        });
      } else {
        //swal("Cancelled", "User deleted unsuccessfully", "error");
      }
    });
  }

  loadUsers(){
    this.userService.getAllUser().subscribe(data => {
      if (data) {

        console.log('Usuarios: ', data);
        this.userList = data;
      }
    }, error => {
      swal('Error...', 'An error occurred while calling the users.', 'error');
    });
  }

  loadAuthoritys(){
        this.authorityService.getAllAuthority().subscribe(data => {
        if (data) {

          //console.log('authority: ', data);
          this.authorityList = data;
        }
        }, error => {
        swal('Error...', 'An error occurred while calling the authorities.', 'error');
      });
  }

  loadModules(){
      this.moduloService.getAllModulo().subscribe(data => {
      if (data) {
        console.log('Modulos: ', data);
        this.modulosList = data;
      }
      }, error => {
      swal('Error...', 'An error occurred while calling the modules.', 'error');
    });
}

loadAccions(){
  this.accionService.getAllAccion().subscribe(data => {
  if (data) {
    console.log('Accions:', data);
    this.accionsList = data;
    console.log('AccionList: ', this.accionsList.length);
  }

  return this.accionsList;
  
  }, error => {
  swal('Error...', 'An error occurred while calling the accions.', 'error');
});
}

loadModuloAccionAuthority(){

  this.moduloService.getAllModulo().subscribe(data => {
    if (data) {
      this.modulosList = data;

        this.accionService.getAllAccion().subscribe(data => {
          if (data) {
            this.accionsList = data;
      
                this.authorityService.getAllAuthority().subscribe(data => {
                  if (data) {
                    this.authorityList = data;
    
                    let count = 0;

                    for (let i = 0; i < this.modulosList.length; i++) {
                      for (let j = 0; j < this.accionsList.length; j++) {
                        for (let k = 0; k < this.authorityList.length; k++) { 
                          
                        count++;      
                          console.log('Contador:',count);
                          this.moduloAccionAuthorityService.getIsSelected(this.modulosList[i].idModulo, this.accionsList[j].idAccion, this.authorityList[k].idRol).subscribe(data => {
                            
                            let moduloAccionAuthorityAux = new ModuloAccionAuthorityAux;
                            moduloAccionAuthorityAux.estatus = data.estatus;
                            moduloAccionAuthorityAux.idAuthority = this.authorityList[k].idRol;
                            moduloAccionAuthorityAux.idAccion = this.accionsList[j].idAccion;
                            moduloAccionAuthorityAux.idModulo = this.modulosList[i].idModulo;

                            this.moduloAccionAuthorityAuxList.push(moduloAccionAuthorityAux);

                          });
                        } 
                      } 
                    }
                  }
                  }, error => {
                  swal('Error...', 'An error occurred while calling the authorities.', 'error');
                });
    
              }
              }, error => {
              swal('Error...', 'An error occurred while calling the modules.', 'error');
            });
          }
        
          console.log('Numero de elementos:', this.moduloAccionAuthorityList.length);
          //return this.accionsList;
          
          }, error => {
          swal('Error...', 'An error occurred while calling the accions.', 'error');
        });

}

  setClickedRowAuthority(index, authority){
      this.user.rol = authority.rol;
  }

  return(beneficiario){
    this.location.back();
  }

  saveRole(idModulo, idAuthority, idAccion, isChecked){

    console.log('saveRole-- Inicio'); 
    console.log('Valores Iniciales Modulo: ', idModulo); 
    console.log('Valores Iniciales Accion: ', idAccion); 
    console.log('Valores Iniciales Authority: ', idAuthority); 
    
    if(isChecked.target.checked){
      this.moduloAccionAuthorityService.saveMaa(idModulo, idAccion, idAuthority, true).subscribe(data =>{
        console.log(data.json());
      });
    }else{
      this.moduloAccionAuthorityService.saveMaa(idModulo, idAccion, idAuthority, false).subscribe(data =>{
        console.log(data.json());
      });
    }  
  }

}
