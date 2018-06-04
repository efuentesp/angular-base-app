import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AccionService }                                  from '../accion/accion.component.service';
import { Accion }                                         from '../accion/accion.component.model';

//import { SearchAccionPipe }                               from "../pipe/accion.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './accion_mgmnt.component.html'
})

export class AccionMngComponent implements OnInit {

    title = 'Accion';
    accionList: Accion;
    accion: Accion;
    form: any;
    public flag: boolean = false;

  	public busquedaAccion='';
    filterInputAccion = new FormControl();

      constructor(private accionService: AccionService, 
                  private route: ActivatedRoute,
                  private router: Router) {
          this.filterInputAccion.valueChanges.subscribe(busquedaAccion => {
            this.busquedaAccion = busquedaAccion;
          });
    }

    ngOnInit() {
        this.loadAccions();
        this.accionService.setEdit(false);
    }

    loadAccions() {
      this.accionService.getAllAccion().subscribe(data => {
        if (data) {
          this.accionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the accions.', 'error');
      });
    }
	
  add(){
    this.accionService.setEdit(false);
    this.accionService.clear();
    this.router.navigate([ '../accion' ], { relativeTo: this.route })  
  }

  setClickedRowAccion(index, accion){
    console.log('AccionRow:', accion);
    this.accionService.setAccion(accion);
    this.accionService.setEdit(true);
    this.router.navigate([ '../accion' ], { relativeTo: this.route })
  }

}

