import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ModuloService }                                  from '../modulo/modulo.component.service';
import { Modulo }                                         from '../modulo/modulo.component.model';

//import { SearchModuloPipe }                               from "../pipe/modulo.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './modulo_mgmnt.component.html'
})

export class ModuloMngComponent implements OnInit {

    title = 'Modulo';
    moduloList: Modulo;
    modulo: Modulo;
    form: any;
    public flag: boolean = false;

  	public busquedaModulo='';
    filterInputModulo = new FormControl();

      constructor(private moduloService: ModuloService, 
                  private route: ActivatedRoute,
                  private router: Router) {
          this.filterInputModulo.valueChanges.subscribe(busquedaModulo => {
            this.busquedaModulo = busquedaModulo;
          });
    }

    ngOnInit() {
        this.loadModulos();
        this.moduloService.setEdit(false);
    }

    loadModulos() {
      this.moduloService.getAllModulo().subscribe(data => {
        if (data) {
          this.moduloList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the modulos.', 'error');
      });
    }
	
  add(){
    this.moduloService.setEdit(false);
    this.moduloService.clear();
    this.router.navigate([ '../modulo' ], { relativeTo: this.route })  
  }

  setClickedRowModulo(index, modulo){
    this.moduloService.setModulo(modulo);
    this.moduloService.setEdit(true);
    this.router.navigate([ '../modulo' ], { relativeTo: this.route })
  }

}

