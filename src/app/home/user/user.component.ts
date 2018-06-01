import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { AccionService }                                  from '../accion/accion.component.service';
import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';
import { Location } from '@angular/common';
import { Modulo } from '../modulo/modulo.component.model';
import { Accion } from '../accion/accion.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

    title = 'Nuevo User';
    userList: User;
    user: User;
    form: any;
 
	authorityList: Authority [] = [];
  modulosList: Modulo;
  accionsList: Accion;

		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(private router: Router, 
    private userService: UserService,
    private authorityService: AuthorityService, 
    private location: Location,
    private moduloService: ModuloService,
    private accionService: AccionService,
    private route:ActivatedRoute

) {
		
	}

    ngOnInit() {
        this.user = this.userService.getUser();
        this.loadUsers();
        this.loadAuthoritys();
        this.loadModules();
        this.loadAccions();

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

            console.log('Data: ', data);
          	this.authorityList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the authorities.', 'error');
      	});
    }

    loadModules(){
        this.moduloService.getAllModulo().subscribe(data => {
        if (data) {
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


    save(user){
      console.log('User Save', this.user);
      // Cambiar a dinamico
      this.user.rol = 'admistrador';
      this.userService.saveUser(this.user).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'User save successfully.', 'success');
		      this.router.navigate([ '../user' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'User save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(user){
      this.location.back();
      //this.router.navigate(['/afiliado_mgmnt']);

    }

	  setClickedRowAuthority(index, authority){
			    this.user.rol = authority.rol;
		}
	
}

