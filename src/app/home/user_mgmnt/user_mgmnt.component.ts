import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';

//import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './user_mgmnt.component.html'
})

export class UserMngComponent implements OnInit {

    title = 'Nuevo User';
    userList: User;
    user: User;
    form: any;
    public flag: boolean = false;

  	public busquedaUser='';
	  filterInputUser = new FormControl();

    constructor(private router: Router, private userService: UserService,  private route: ActivatedRoute) {
	   	   this.filterInputUser.valueChanges.subscribe(busquedaUser => {
	         this.busquedaUser = busquedaUser;
	       });
	}

    ngOnInit() {
        this.loadUsers();
        this.userService.setEdit(false);
    }

    loadUsers() {
      this.userService.getAllUser().subscribe(data => {
        if (data) {
          console.log('Usuarios: ', data)
          this.userList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the users.', 'error');
      });
    }

  add(){
    this.userService.setEdit(false);
    this.userService.clear();
    this.router.navigate([ '../user' ], { relativeTo: this.route })  
  }

  setClickedRowUser(index, user){
    this.userService.setUser(user);
    this.userService.setEdit(true);
    this.router.navigate([ '../user' ], { relativeTo: this.route })
  }

}

