import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';




@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario.component.html'
})

export class BeneficiarioComponent implements OnInit {

    title = 'Nuevo Beneficiario';
    beneficiarioList: Beneficiario;
    beneficiario: Beneficiario;
    form: any;









    constructor(private router: Router, 
				private beneficiarioService: BeneficiarioService, private location: Location, private route: ActivatedRoute

) {
		


	}

    ngOnInit() {
        this.beneficiario = this.beneficiarioService.getBeneficiario();
        this.loadBeneficiarios();


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



    save(beneficiario){
      console.log('Beneficiario: ', this.beneficiario.parentescoId );
      console.log('Beneficiario: ', this.beneficiario.nombre );
      
      this.beneficiarioService.saveBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Beneficiario save successfully.', 'success');
          this.router.navigate([ '../beneficiario_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(beneficiario){
      this.location.back();
      this.router.navigate([ '../beneficiario_mgmnt' ], { relativeTo: this.route })
      //this.router.navigate(['/beneficiario_mgmnt']);
    }

	
}

