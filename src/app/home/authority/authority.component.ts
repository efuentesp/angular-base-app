import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';



@Component ({
    selector: 'app-view',
    templateUrl: './authority.component.html'
})

export class AuthorityComponent implements OnInit {

    title = 'Nuevo Authority';
    authorityList: Authority;
    authority: Authority;
    form: any;

	beneficiarioList: Beneficiario;







		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(private router: Router, 
				private accionService: AuthorityService
		,private beneficiarioService: BeneficiarioService, private location: Location

) {
		

		  	 this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
	         this.busquedaBeneficiario = busquedaBeneficiario;
	       });

	}

    ngOnInit() {
        /*this.authority = this.accionService.getAuthority();
        this.loadAuthoritys();

		this.loadBeneficiarios();*/

    }

	loadAuthoritys(){
      this.accionService.getAllAuthority().subscribe(data => {
        if (data) {
          this.authorityList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the authority.', 'error');
      });
    }

		loadBeneficiarios(){
      		this.beneficiarioService.getAllBeneficiario().subscribe(data => {
        	if (data) {
          	this.beneficiarioList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      	});
    }


    save(authority){
      this.accionService.saveAuthority(this.authority).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Authority save successfully.', 'success');
		  //this.router.navigate(['/accion_mgmnt']);
        }else{
          swal('Error...', 'Authority save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(authority){
      this.location.back();
      //this.router.navigate(['/afiliado_mgmnt']);

    }

	  	//	setClickedRowbeneficiario(index, beneficiario){
			//this.afiliado.beneficiarioId = beneficiario.beneficiarioId;
		//}
	
}

