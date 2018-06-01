import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';

import { SearchBeneficiarioPipe }                               from "../pipe/beneficiario.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario_mgmnt.component.html'
})

export class BeneficiarioMngComponent implements OnInit {

    title = 'Beneficiario';
    beneficiarioList: Beneficiario;
    beneficiario: Beneficiario;
    form: any;
    public flag: boolean = false;

  	public busquedaBeneficiario='';
    filterInputBeneficiario = new FormControl();

      constructor(private beneficiarioService: BeneficiarioService, 
                  private route: ActivatedRoute,
                  private router: Router) {
          this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
            this.busquedaBeneficiario = busquedaBeneficiario;
          });
    }

    ngOnInit() {
        this.loadBeneficiarios();
        this.beneficiarioService.setEdit(false);
    }

    loadBeneficiarios() {
      this.beneficiarioService.getAllBeneficiario().subscribe(data => {
        if (data) {
          this.beneficiarioList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      });
    }
	
  add(){
    this.beneficiarioService.setEdit(false);
    this.beneficiarioService.clear();
    this.router.navigate([ '../beneficiario' ], { relativeTo: this.route })  
  }

  setClickedRowBeneficiario(index, beneficiario){
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.beneficiarioService.setEdit(true);
    this.router.navigate([ '../beneficiario' ], { relativeTo: this.route })
  }

}

