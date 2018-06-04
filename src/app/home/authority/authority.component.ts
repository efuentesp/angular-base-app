import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-view',
    templateUrl: './authority.component.html'
})

export class AuthorityComponent implements OnInit {

    title = 'Nuevo Authority';
    authority: Authority;
    public flag: boolean = false;
    form: any;

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
        }
    }

    save(authority){  
      this.authorityService.saveAuthority(this.authority).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Authority save successfully.', 'success');
          this.router.navigate([ '../authority_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Authority save unsuccessfully.', 'error');
        }
      } );
    }
  
    delete(authority){
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

	
}

