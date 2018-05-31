import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';

//import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './authority_mgmnt.component.html'
})

export class AuthorityMngComponent implements OnInit {

    title = 'Nuevo Authority';
    authorityList: Authority;
    authority: Authority;
    form: any;

  	public busquedaAccion='';
	filterInputAccion = new FormControl();

    constructor(private router: Router, private authorityService: AuthorityService) {
	   	   this.filterInputAccion.valueChanges.subscribe(busquedaAccion => {
	         this.busquedaAccion = busquedaAccion;
	       });
	}

    ngOnInit() {

        this.loadAuthoritys();

    }

    loadAuthoritys() {
      this.authorityService.getAllAuthority().subscribe(data => {
        if (data) {
          this.authorityList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the authority.', 'error');
      });
    }
    save(authority){
      this.authorityService.saveAuthority(this.authority).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Accion save successfully.', 'success');
        }else{
          swal('Error...', 'Accion save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/authority']);
  }

  setClickedRowauthority(index, authority){
	this.authorityService.setAuthority(authority);
    this.router.navigate(['/authority']);
  }

}

