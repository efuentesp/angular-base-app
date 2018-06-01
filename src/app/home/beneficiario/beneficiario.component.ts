import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario.component.html',
    styleUrls: ['./beneficiario.component.css']
})

export class BeneficiarioComponent implements OnInit {

    title = 'Nuevo Beneficiario';
    beneficiario: Beneficiario;
    public flag: boolean = false;
    form: any;

    constructor(  
                private beneficiarioService: BeneficiarioService, 
                private location: Location, 
                private router: Router,
                private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.beneficiario = new Beneficiario;
        this.flag = this.beneficiarioService.getEdit();
        if (this.flag){
          this.beneficiario = this.beneficiarioService.getBeneficiario();
        }
    }

    save(beneficiario){  
      this.beneficiarioService.saveBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Beneficiario save successfully.', 'success');
          this.router.navigate([ '../beneficiario_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
        }
      } );
    }
  
    delete(beneficiario){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this beneficiario!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.beneficiarioService.deleteBeneficiario(this.beneficiario).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Beneficiario item has been deleted successfully.', 'success');
              this.router.navigate([ '../beneficiario_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Beneficiario deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Beneficiario deleted unsuccessfully", "error");
        }
      });
    }
	
	return(beneficiario){
      this.location.back();
  }

	
}

