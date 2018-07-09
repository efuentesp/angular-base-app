import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';
import { Location } from '@angular/common';
import { User } from '../user/user.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './authority.component.html'
})

export class AuthorityComponent implements OnInit {

    public title = 'Nuevo Authority';
    public authority: Authority;
    public flag: boolean = false;
    public form: any;
    public flagDelete: boolean;
    public isChecked: boolean;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    private selectedLink: boolean= true; 

    constructor(  
                private authorityService: AuthorityService, 
                private location: Location, 
                private router: Router,
                private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.authority = new Authority;

        

        this.flag = this.authorityService.getEdit();
        if (this.flag){

          this.authority = this.authorityService.getAuthority();
          console.log("Valor del check:", this.authority.enabled);
          this.isChecked = this.authority.enabled;
        
        }

        
        this.flagDelete = this.authorityService.getDelete();
        console.log("Delete",this.flagDelete );
        this.habilita();
    }

    save(){  


      // Change to uppercase
      this.authority.name = this.authority.name.toUpperCase();

      console.log ("Seleccionado es: ", this.authority.enabled);

      this.authorityService.saveAuthority(this.authority).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Authority save successfully.', 'success');
          this.router.navigate([ '../authority_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Authority save unsuccessfully.', 'error');
        }
      } );
    }
  
    delete(){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this authority!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.authorityService.deleteAuthority(this.authority).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Authority item has been deleted successfully.', 'success');
              this.router.navigate([ '../authority_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Authority deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Authority deleted unsuccessfully", "error");
        }
      });
    }
	
	return(authority){
      this.location.back();
  }

  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_AUTHORITYDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYSEARCH'){
        this.searchActive = true;
      }
    });
  }

  isSelected(val: boolean): boolean   {  

    console.log('isSelected:', val);

        if (!this.selectedLink) {  
            return false;  
        }    
    return (this.selectedLink === val); // if current radio button is selected, return true, else return false  
  }  

  setradio(e: boolean): void   {  
    console.log('Valor:', e);
    this.selectedLink = e;       
  } 
  
}

