import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';
import { Location } from '@angular/common';
import { User } from '../user/user.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './afiliado.component.html',
    styleUrls: ['./afiliado.component.css']
})

export class AfiliadoComponent implements OnInit {

    title = 'Nuevo Afiliado';
    afiliadoList: Afiliado;
    afiliado: Afiliado;
    beneficiario: Beneficiario;
    public flag: boolean;
    public flagDelete: boolean;
    public beneficiarioNombre: string = '';
    form: any;

    public user: User;
    public valueName: string;
    public token: string;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    private afiliadosearch: boolean = false;
    private afiliadoupdate: boolean = false;
    private afiliadocreate: boolean = false;
    private afiliadodelete: boolean = false;

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
        if (this.flag){
          this.afiliado = this.afiliadoService.getAfiliado();
          
          this.beneficiarioService.getBeneficiarioById(this.afiliado.beneficiarioId).subscribe(data => {
            if (data) {
              this.beneficiario = data;
              console.log('Beneficiario Init',this.beneficiario);
              this.beneficiarioNombre   = this.beneficiario.nombre + " " + this.beneficiario.apellido_paterno;
            }
          }, error => {
            swal('Error...', 'An error occurred while calling the afiliados.', 'error');
          });
        }
		    this.loadBeneficiarios();
        this.flagDelete = this.afiliadoService.getDelete();
        this.habilita();
    }

    save(afiliado){
       this.afiliadoService.saveAfiliado(this.afiliado).subscribe(res => {
         if (res.status == 201 || res.status == 200){
           swal('Success...', 'Afiliado save successfully.', 'success');
       //this.router.navigate(['/afiliado_mgmnt']);
       this.router.navigate([ '../afiliado_mgmnt' ], { relativeTo: this.route })
         }else{
           swal('Error...', 'Afiliado save unsuccessfully.', 'error');
         }
       } );
    }


    delete(afiliado){
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
              this.router.navigate([ '../afiliado_mgmnt' ], { relativeTo: this.route })
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

  setClickedRowBeneficiario(index, beneficiario){
    this.afiliado.beneficiarioId                   = beneficiario.beneficiarioId;
    this.beneficiarioNombre                        = beneficiario.nombre + " " + beneficiario.apellido_paterno;
  }

  habilita(){

    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_AFILIADODELETE'){
        this.afiliadodelete = true;
      }
      if (element.authority == 'ROLE_AFILIADOCREATE'){
        this.afiliadocreate = true;
      }
      if (element.authority == 'ROLE_AFILIADOUPDATE'){
        this.afiliadoupdate = true;
      }
      if (element.authority == 'ROLE_AFILIADOSEARCH'){
        this.afiliadosearch = true;
      }
    });

  }

}
