import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AccionService }                                  from '../accion/accion.component.service';
import { Accion }                                         from '../accion/accion.component.model';

//import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './accion_mgmnt.component.html'
})

export class AccionMngComponent implements OnInit {

    title = 'Nuevo Accion';
    accionList: Accion;
    accion: Accion;
    form: any;

  	public busquedaAccion='';
	filterInputAccion = new FormControl();

    constructor(private router: Router, private accionService: AccionService, private route: ActivatedRoute) {
	   	   this.filterInputAccion.valueChanges.subscribe(busquedaAccion => {
	         this.busquedaAccion = busquedaAccion;
	       });
	}

    ngOnInit() {
        this.loadAccions();
    }

    loadAccions() {
      this.accionService.getAllAccion().subscribe(data => {
        if (data) {
          this.accionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      });
    }
    save(accion){
      this.accionService.saveAccion(this.accion).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Accion save successfully.', 'success');
        }else{
          swal('Error...', 'Accion save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate([ '../accion' ], { relativeTo: this.route })
  }

  setClickedRowAccion(index, accion){
	  this.accionService.setAccion(accion);
    this.router.navigate([ '../accion' ], { relativeTo: this.route })
  }

}

