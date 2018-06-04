import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AccionService }                                  from '../accion/accion.component.service';
import { Accion }                                         from '../accion/accion.component.model';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-view',
    templateUrl: './accion.component.html'
})

export class AccionComponent implements OnInit {

    title = 'Nuevo Accion';
    accion: Accion;
    public flag: boolean = false;
    form: any;

    constructor(  
                private accionService: AccionService, 
                private location: Location, 
                private router: Router,
                private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.accion = new Accion;
        this.flag = this.accionService.getEdit();
        console.log('Flag:', this.flag)
        if (this.flag){
          
          this.accion = this.accionService.getAccion();

          console.log('Accion Get:', this.accion);
        }
    }

    save(accion){  
      this.accionService.saveAccion(this.accion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Accion save successfully.', 'success');
          this.router.navigate([ '../accion_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Accion save unsuccessfully.', 'error');
        }
      } );
    }
  
    delete(accion){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this accion!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.accionService.deleteAccion(this.accion).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Accion item has been deleted successfully.', 'success');
              this.router.navigate([ '../accion_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Accion deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Accion deleted unsuccessfully", "error");
        }
      });
    }
	
	return(accion){
      this.location.back();
  }

	
}

