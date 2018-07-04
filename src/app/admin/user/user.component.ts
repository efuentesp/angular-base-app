import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';
                              
import { Location } from '@angular/common';
import { Useraux } from './useraux.component.model';
import { Authority } from '../../user/authorities.component.model';
import { UserServiceAuxiliar } from './useraux.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    title = 'Nuevo User';
    userList: Useraux;
    user: User;
    form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;
    public selectedValue: string = '';
    private authority = Authority;
    useraux: Useraux;

    userArray: User[];
    selectedIndex = 4;
    timeVar = " hours";
    checkboxValue:boolean;

	//authorityList: Authority [] = [];

		public busquedaBeneficiario='';
    filterInputBeneficiario = new FormControl();
    public isChecked: boolean;

    constructor(private router: Router,
    private userService: UserService,
    //private authorityService: AuthorityService,
    private location: Location,
    // private moduloService: ModuloService,
    // private accionService: AccionService,
    private route:ActivatedRoute,
    private userServiceaux: UserServiceAuxiliar
   
) {

	}

    ngOnInit() {

        this.loadUsers();
       
         this.user = new User();
         this.useraux = new Useraux();
         this.flag = this.userService.getEdit();
         if (this.flag){
           this.user = this.userService.getUser();
         }

         this.flagDelete = this.userService.getDelete();
    }

    save(user){
       
       this.userService.saveUser(this.user, this.selectedValue).subscribe(res => {
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


    setRole(item){
      this.selectedValue = item;
      console.log('Valor del item', item);
    }

	  setClickedRowAuthority(index, authority){
      this.user.password = '';
      
			    //this.user.rol = authority.rol;
    }

	return(beneficiario){
      this.location.back();
  }



}
