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
  modulosList: Modulo;
  accionsList: Accion;
  moduloaccionsList: ModuloAccion [] = [];
  moduloAccion: ModuloAccion;

  filter = false;

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
  }
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

    console.log('saveRole'); 

    this.moduloAccionService.getAllModuloAccion(idModulo,idAccion).subscribe(data =>{
        if (data) {
          console.log('Accions-1:', data);
          this.moduloaccionsList = data;
          this.moduloaccionsList.forEach(element => {
            console.log('Accions-2:', element.id);
          });
        }else{
          this.moduloAccionService.getAllModuloAccionById(idModulo,idAccion).subscribe(data =>{
            if (data) {

              this.moduloaccionsList = data;
              console.log('Accions-1:', data);
              console.log('Debe de guardar');

            }else{

            }
          
          });
        }
        }, error => {
          console.log('Error');
          // Esta duplicada
          this.moduloAccionService.getAllModuloAccionById(idModulo,idAccion).subscribe(data =>{
            if(data){

              if(isChecked.target.checked){
               
                this.moduloAccionAuthority.idModuloAccion = data.id;
                this.moduloAccionAuthority.idAuthority    = idAuthority;
                this.moduloAccionAuthority.estatus  = true;
                this.moduloAccionAuthority.fechaCreacion =  "1528318795000";
                this.moduloAccionAuthority.fechaModificacion = null;
          
                console.log('Valor de authority true: ', this.moduloAccionAuthority);

                this.moduloAccionAuthorityService.save(this.moduloAccionAuthority).subscribe(res => {
                  //if (res.status == 201 || res.status == 200){
                    //swal('Success...', 'User save successfully.', 'success');
                  //}else{
                    //swal('Error...', 'User save unsuccessfully.', 'error');
                  //}
                  console.log('Guarda elemento');
                } );
              }else{
                //this.moduloAccionAuthority.idAccion = idAccion;
                this.moduloAccionAuthority.idModuloAccion = data.id;
                this.moduloAccionAuthority.idAuthority    = idAuthority;
                this.moduloAccionAuthority.estatus  = false;
                this.moduloAccionAuthority.fechaCreacion =  "1528318795000";
                this.moduloAccionAuthority.fechaModificacion = null;
          
                console.log('Valor de authority false: ', this.moduloAccionAuthority);

                this.moduloAccionAuthorityService.save(this.moduloAccionAuthority).subscribe(res => {
                  //if (res.status == 201 || res.status == 200){
                    //swal('Success...', 'User save successfully.', 'success');
                  //}else{
                    //swal('Error...', 'User save unsuccessfully.', 'error');
                  //}
                  console.log('Quita elemento');
                } );
              }




             console.log('Data', data.id);
             
            }else{

            }
          
          });


        }
    );



  }

}
