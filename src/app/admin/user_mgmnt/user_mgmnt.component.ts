import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';
import { SearchUserPipe }                               from "../pipe/user.filter.pipe";
import { AuthorityService } from '../authority/authority.component.service';
import { Authority } from '../authority/authority.component.model';
import { UserServiceAuxiliar } from '../user/useraux.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './user_mgmnt.component.html'
})

export class UserMngComponent implements OnInit {

    public title = 'Nuevo User';
    public userList: User;
    public user: User;
    public form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;
    public valueName: string;
    public token: string;
    public authorityList: Authority;
  	public busquedaUser='';
    public filterInputUser = new FormControl();
    
    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router, 
                private userService: UserService, 
                private userServiceAux: UserServiceAuxiliar, 
                private route: ActivatedRoute,
                private authorityService: AuthorityService) {
          
           this.filterInputUser.valueChanges.subscribe(busquedaUser => {
	         this.busquedaUser = busquedaUser;
	       });
	  }

    ngOnInit() {

        // Get data user
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.valueName = this.user.username;
        this.token = this.user.token;

        this.userService.setEdit(false);
        this.userService.setDelete(false);

        this.loadAuthority();
        this.loadUsers();
        this.habilita();
        
    }

    loadUsers() {
      this.userService.getAllUser().subscribe(data => {
        if (data) {
          this.userList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the users.', 'error');
      });
    }

  add(){
    this.userService.setEdit(false);
    this.userService.setDelete(false);
    this.userService.clear();
    this.router.navigate([ '../user' ], { relativeTo: this.route })
  }

  editar(){
    this.userService.setEdit(true);
    this.userService.setDelete(false);
  }

  eliminar(){
    this.userService.setEdit(false);
    this.userService.setDelete(true);
  }

  setClickedRowUser(index, user){
    console.log("Usuario Seleccionado:", user);
    this.userServiceAux.setUser(user);
    //this.userService.setUser(user);
    this.userServiceAux.setEdit(true);
    this.router.navigate([ '../user' ], { relativeTo: this.route })
  }

  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_USERDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_USERCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_USERUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_USERSEARCH'){
        this.searchActive = true;
      }
    });
  }

  loadAuthority(){
    this.authorityService.getAllAuthority().subscribe( data => {
      if (data) {
        this.authorityList = data;
      }}, error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      });
  }
}
