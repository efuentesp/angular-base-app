import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../../afiliado/afiliado.component.model';

import { BeneficiarioService }                                  from '../../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './afiliado-edit.component.html',
    styleUrls: ['./afiliado-edit.component.css']
})

export class AfiliadoEditComponent implements OnInit {

    public title = 'Edit Afiliado';
    public afiliadoList: Afiliado;
    public afiliado: Afiliado;
    public beneficiario: Beneficiario;
    public flag: boolean;
    public flagDelete: boolean;
    public beneficiarioNombre: string = '';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	  beneficiarioList: Beneficiario;

		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private afiliadoService: AfiliadoService,
        private beneficiarioService: BeneficiarioService,
        private location: Location
    ) {
      this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
        this.busquedaBeneficiario = busquedaBeneficiario;
      });
	  }

    ngOnInit() {

        this.afiliado = new Afiliado;
        this.beneficiario = new Beneficiario;

        this.flag = this.afiliadoService.getEdit();
      
        this.afiliado = this.afiliadoService.getAfiliado();
        this.loadNameBeneficiario(this.afiliado);
        
        this.loadBeneficiarios();
        this.flagDelete = this.afiliadoService.getDelete();
    }

    save(){
       this.afiliadoService.saveAfiliado(this.afiliado).subscribe(res => {
         if (res.status == 201 || res.status == 200){
            swal('Success...', 'Afiliado save successfully.', 'success');
            this.router.navigate([ '../manageAfiliado' ], { relativeTo: this.route })
         }else if (res.status == 403){
            swal('Error...', 'Usuario no tiene permiso para guardar Afiliado.', 'error');
         }else{
           swal('Error...', 'Afiliado save unsuccessfully.', 'error');
         }
       } );
    }

    delete(){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this afiliado!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.afiliadoService.deleteAfiliado(this.afiliado).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Afiliado item has been deleted successfully.', 'success');
              this.router.navigate([ '../manageAfiliado' ], { relativeTo: this.route })
            }else if (res.status == 403){
              swal('Error...', 'Usuario no tiene permiso para guardar Afiliado.', 'error');
            }else{
              swal('Error...', 'Afiliado deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Afiliado deleted unsuccessfully", "error");
        }
      });
    }

	return(afiliado){
      this.location.back();
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

  loadNameBeneficiario(afiliado){
    this.beneficiarioService.getBeneficiarioById(afiliado.beneficiarioId).subscribe(data => {
      if (data) {
        this.beneficiario = data;
        this.beneficiarioNombre   = this.beneficiario.nombre + " " + this.beneficiario.apellido_paterno;
      }
    }, error => {
      swal('Warning...', 'Can´t found Beneficiario, change Beneficiario.', 'warning');
    });
  }

  setClickedRowBeneficiario(index, beneficiario){
    this.afiliado.beneficiarioId                   = beneficiario.beneficiarioId;
    this.beneficiarioNombre                        = beneficiario.nombre + " " + beneficiario.apellido_paterno;
  }

}
