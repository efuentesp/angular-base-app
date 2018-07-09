import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';
                              
import { Location } from '@angular/common';
import { AuthorityService } from '../authority/authority.component.service';
import { Authority } from '../authority/authority.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    public title = 'Nuevo User';
    public userList: User;
    public user: User;
    public form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;
    public selectedValue: number = null;
    private authority = Authority;
    public userArray: User[];
    public selectElem: string;
    public selectedVal: number;

	  public authorityList: Authority [];

		public busquedaBeneficiario='';
    public filterInputBeneficiario = new FormControl();
    public isChecked: boolean;
    public passwordChange: boolean = false;
    public changeCombo: boolean = false;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,
                private userService: UserService,
                private authorityService: AuthorityService,
                private location: Location,
                private route:ActivatedRoute
               
    ) {	}

    ngOnInit() {

         this.user = new User();
         this.flag = this.userService.getEdit();
         console.log("La flag es: ", this.flag);
         
         if (this.flag){

          this.user = this.userService.getUser();  
          this.isChecked = this.user.enabled;
          
          console.log("User:", this.user);
          this.user.authorities.forEach(element => {
            //console.log('Authority: ', element.idAuthority);
            //this.selectedVal = element.idAuthority;
          });
     
         }

         this.loadAuthority();
         this.flagDelete = this.userService.getDelete();
         //this.habilita();

    }

    save(){

      if (!this.changeCombo){
        console.log("this.selectedVal", this.selectedVal);
        console.log("selectedValue", this.selectedValue);
        this.selectedValue = this.selectedVal; 
      }

       this.userService.saveUser(this.user, this.selectedValue, this.passwordChange).subscribe(res => {
         if (res.status == 201 || res.status == 200){
           swal('Success...', 'User save successfully.', 'success');
           this.router.navigate([ '../user_mgmnt' ], { relativeTo: this.route })
         }else{
           swal('Error...', 'User save unsuccessfully.', 'error');
         }
       } );
    }

    delete(){
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
          this.userList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the users.', 'error');
      });
    }

    loadAuthority(){
      this.authorityService.getAllAuthority().subscribe( data => {
        if (data) {
          this.authorityList = data;
        }}, error => {
          swal('Error...', 'An error occurred while calling the authorities.', 'error');
        });
    }

    setRole(item){
      console.log ("El cambio es: ", item);
      this.selectedValue = item;
      this.changeCombo = true;
    }

    setClange(){
      this.passwordChange = true;
    }


	  setClickedRowAuthority(index, authority){
      //this.user.password = '';
      
			    //this.user.rol = authority.rol;
    }

	return(beneficiario){
      this.location.back();
  }

  // habilita(){

  //   this.userAdmin.authorities.forEach(element => {

  //     console.log("Permisos: User", element.authority);

  //     if (element.authority == 'ROLE_USERDELETE'){
  //       this.deleteActive = true;
  //     }
  //     if (element.authority == 'ROLE_USERCREATE'){
  //       this.createActive = true;
  //     }
  //     if (element.authority == 'ROLE_USERUPDATE'){
  //       this.updateActive = true;
  //     }
  //     if (element.authority == 'ROLE_USERSEARCH'){
  //       this.searchActive = true;
  //     }
  //   });
  // }

}