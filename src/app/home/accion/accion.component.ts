import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AccionService }                                  from '../accion/accion.component.service';
import { Accion }                                         from '../accion/accion.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';



@Component ({
    selector: 'app-view',
    templateUrl: './accion.component.html'
})

export class AccionComponent implements OnInit {

    title = 'Nuevo Accion';
    accionList: Accion;
    accion: Accion;
    form: any;

	beneficiarioList: Beneficiario;







		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(private router: Router, 
				private accionService: AccionService
		,private beneficiarioService: BeneficiarioService, private location: Location

) {
		

		  	 this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
	         this.busquedaBeneficiario = busquedaBeneficiario;
	       });

	}

    ngOnInit() {
        this.accion = this.accionService.getAccion();
        this.loadAccions();

		this.loadBeneficiarios();

    }

	loadAccions(){
      this.accionService.getAllAccion().subscribe(data => {
        if (data) {
          this.accionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the accions.', 'error');
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


    save(accion){
      this.accionService.saveAccion(this.accion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Accion save successfully.', 'success');
		  //this.router.navigate(['/accion_mgmnt']);
        }else{
          swal('Error...', 'Accion save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(accion){
      this.location.back();
      //this.router.navigate(['/afiliado_mgmnt']);

    }

	  		//setClickedRowbeneficiario(index, beneficiario){
			//this.accion.beneficiarioId = beneficiario.beneficiarioId;
		//}
	
}

