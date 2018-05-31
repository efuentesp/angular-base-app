import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { Modulo }                                         from '../modulo/modulo.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';



@Component ({
    selector: 'app-view',
    templateUrl: './modulo_accion.component.html'
})

export class ModuloAccionComponent implements OnInit {

    title = 'Nuevo Modulo Accion';
    moduloList: Modulo;
    modulo: Modulo;
    form: any;

	beneficiarioList: Beneficiario;







		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(private router: Router, 
				private moduloService: ModuloService
		,private beneficiarioService: BeneficiarioService, private location: Location

) {
		

		  	 this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
	         this.busquedaBeneficiario = busquedaBeneficiario;
	       });

	}

    ngOnInit() {
        this.modulo = this.moduloService.getModulo();
        this.loadModulos();

		this.loadBeneficiarios();

    }

	loadModulos(){
      this.moduloService.getAllModulo().subscribe(data => {
        if (data) {
          this.moduloList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the modulos.', 'error');
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


    save(modulo){
      this.moduloService.saveModulo(this.modulo).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Modulo save successfully.', 'success');
		  //this.router.navigate(['/accion_mgmnt']);
        }else{
          swal('Error...', 'Modulo save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(modulo){
      this.location.back();
      //this.router.navigate(['/afiliado_mgmnt']);

    }

	  		//setClickedRowbeneficiario(index, beneficiario){
			//this.modulo.beneficiarioId = beneficiario.beneficiarioId;
		//}
	
}

