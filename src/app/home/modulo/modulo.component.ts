import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { Modulo }                                         from '../modulo/modulo.component.model';

import { Location } from '@angular/common';



@Component ({
    selector: 'app-view',
    templateUrl: './modulo.component.html'
})

export class ModuloComponent implements OnInit {

    title = 'Nuevo Modulo';
    moduloList: Modulo;
    modulo: Modulo;
    form: any;


    constructor(private router: Router, 
				private moduloService: ModuloService, private location: Location, private route: ActivatedRoute

) {

	}

    ngOnInit() {
        this.modulo = this.moduloService.getModulo();
        this.loadModulos();

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
      //this.location.back();
      this.router.navigate([ '../modulo_mgmnt' ], { relativeTo: this.route })

    }

	
}

