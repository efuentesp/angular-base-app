import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { Modulo }                                         from '../modulo/modulo.component.model';

//import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './Modulo_mgmnt.component.html'
})

export class ModuloMngComponent implements OnInit {

    title = 'Nuevo Modulo';
    moduloList: Modulo;
    modulo: Modulo;
    form: any;

  	public busquedaModulo='';
	filterInputModulo = new FormControl();

    constructor(private router: Router, private moduloService: ModuloService) {
	   	   this.filterInputModulo.valueChanges.subscribe(busquedaModulo => {
	         this.busquedaModulo = busquedaModulo;
	       });
	}

    ngOnInit() {

        this.loadModulos();

    }

    loadModulos() {
      this.moduloService.getAllModulo().subscribe(data => {
        if (data) {
          this.moduloList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the modulo.', 'error');
      });
    }
    save(modulo){

      // Eliminar
      this.modulo.estatus = 1;

      this.moduloService.saveModulo(this.modulo).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Modulo save successfully.', 'success');
        }else{
          swal('Error...', 'Modulo save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/modulo']);
  }

  setClickedRowModulo(index, modulo){
	this.moduloService.setModulo(modulo);
    this.router.navigate(['/modulo']);
  }

}

