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
    modulo: Modulo;
    public flag: boolean = false;
    form: any;

    constructor(  
                private moduloService: ModuloService, 
                private location: Location, 
                private router: Router,
                private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.modulo = new Modulo;
        this.flag = this.moduloService.getEdit();
        if (this.flag){
          this.modulo = this.moduloService.getModulo();
        }
    }

    save(modulo){  
      this.moduloService.saveModulo(this.modulo).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Modulo save successfully.', 'success');
          this.router.navigate([ '../modulo_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Modulo save unsuccessfully.', 'error');
        }
      } );
    }
  
    delete(modulo){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this modulo!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.moduloService.deleteModulo(this.modulo).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Modulo item has been deleted successfully.', 'success');
              this.router.navigate([ '../modulo_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Modulo deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Modulo deleted unsuccessfully", "error");
        }
      });
    }
	
	return(modulo){
      this.location.back();
  }

	
}

