import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { SolicitudpensionService }                                  from '../solicitudpension/solicitudpension.component.service';
import { Solicitudpension }                                         from '../solicitudpension/solicitudpension.component.model';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';
import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';
import { Location } from '@angular/common';



@Component ({
    selector: 'app-view',
    templateUrl: './solicitudpension.component.html'
})

export class SolicitudpensionComponent implements OnInit {

    title = 'Nuevo Solicitudpension';
    solicitudpensionList: Solicitudpension;
    solicitudpension: Solicitudpension;
    form: any;

		afiliadoList: Afiliado;
		tipopensionList: Tipopension;
		public flag = false;
		public busquedaAfiliado='';
		filterInputAfiliado = new FormControl();
		public busquedaTipopension='';
		filterInputTipopension = new FormControl();

    constructor(private router: Router, 
								private solicitudpensionService: SolicitudpensionService,
								private afiliadoService: AfiliadoService,
								private tipopensionService: TipopensionService, 
								private location: Location,
								private route: ActivatedRoute
) {
		  	 this.filterInputAfiliado.valueChanges.subscribe(busquedaAfiliado => {
	         this.busquedaAfiliado = busquedaAfiliado;
	       });
		  	 this.filterInputTipopension.valueChanges.subscribe(busquedaTipopension => {
	         this.busquedaTipopension = busquedaTipopension;
	       });
	}

    ngOnInit() {
        
				this.loadAfiliados();
				this.loadTipopensions();
				this.flag = this.solicitudpensionService.getEdit();
        if (this.flag){
          this.solicitudpension = this.solicitudpensionService.getSolicitudpension();
        }
		}
		


		loadAfiliados(){
      		this.afiliadoService.getAllAfiliado().subscribe(data => {
        	if (data) {
          	this.afiliadoList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      	});
		}
		
		loadTipopensions(){
      		this.tipopensionService.getAllTipopension().subscribe(data => {
        	if (data) {
          	this.tipopensionList = data;
        	}
      		}, error => {
        	swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      	});
    }


    save(solicitudpension){
      this.solicitudpensionService.saveSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Solicitudpension save successfully.', 'success');
					this.router.navigate([ '../solicitudpension_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
        }
      } );
    }
	
		delete(solicitudpension){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this solicitudpension!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.solicitudpensionService.deleteSolicitudpension(this.solicitudpension).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Solicitudpension item has been deleted successfully.', 'success');
              this.router.navigate([ '../solicitudpension_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Solicitudpension deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Solicitudpension deleted unsuccessfully", "error");
        }
      });
		}
		
	return(solicitudpension){
			this.location.back();
    }

	  		setClickedRowafiliado(index, afiliado){
			this.solicitudpension.afiliadoId = afiliado.afiliadoId;
		}
	  		setClickedRowtipopension(index, tipopension){
			this.solicitudpension.tipopensionId = tipopension.tipopensionId;
		}
	
}

