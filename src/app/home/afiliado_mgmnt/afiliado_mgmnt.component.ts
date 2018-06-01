import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';

import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
import { BeneficiarioService } from '../beneficiario/beneficiario.component.service';
@Component ({
    selector: 'app-view',
    templateUrl: './afiliado_mgmnt.component.html'
})

export class AfiliadoMngComponent implements OnInit {

    title = 'Afiliado';
    afiliadoList: Afiliado;
    afiliado: Afiliado;
    form: any;

  	public busquedaAfiliado='';
	  filterInputAfiliado = new FormControl();

    constructor(private afiliadoService: AfiliadoService, 
                private route: ActivatedRoute,
                private router: Router,
                private beneficiarioService: BeneficiarioService) {
	   	      this.filterInputAfiliado.valueChanges.subscribe(busquedaAfiliado => {
	          this.busquedaAfiliado = busquedaAfiliado;
	       });
	}

    ngOnInit() {
        this.loadAfiliados();
        this.afiliadoService.setEdit(false);
    }

    loadAfiliados() {
      this.afiliadoService.getAllAfiliado().subscribe(data => {
        if (data) {
          this.afiliadoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      });
    }
  
  add(){
    this.afiliadoService.setEdit(false);
    this.afiliadoService.clear();
    this.router.navigate([ '../afiliado' ], { relativeTo: this.route })  
  }

  setClickedRowAfiliado(index, afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.beneficiarioService.getBeneficiarioById(afiliado.getBeneficiarioById);
    this.afiliadoService.setEdit(true);
    this.router.navigate([ '../afiliado' ], { relativeTo: this.route })
  }

}

