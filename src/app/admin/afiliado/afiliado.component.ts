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
import { ValidationService } from '../validators/validation.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './afiliado.component.html',
    styleUrls: ['./afiliado.component.css']
})

export class AfiliadoComponent implements OnInit {

    public title = 'Nuevo Afiliado';
    public afiliadoList: Afiliado;
    public afiliado: Afiliado;
    public beneficiario: Beneficiario;
    public flag: boolean;
    public flagDelete: boolean;
    public beneficiarioNombre: string = '';
    public afiliadoForm: any;
    public user: User;
    public valueName: string;
    public token: string;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	  beneficiarioList: Beneficiario;

		public busquedaBeneficiario='';
		filterInputBeneficiario = new FormControl();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private afiliadoService: AfiliadoService,
        private beneficiarioService: BeneficiarioService,
        private location: Location,
        private formBuilder: FormBuilder
    ) {

    let fecha_afiliacion = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
    let foto = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    let correo = new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100), ValidationService.emailValidator]));
    let apellido_materno = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
    let acta_nacimiento = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    let monto_pension = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    let apellido_paterno = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
    let observaciones = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]);
    let nombre = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]);
    let semanas_cotizadas = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    let nss = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
    let genero = new FormControl();
    let beneficiarioId = new FormControl();
    
    this.afiliadoForm = this.formBuilder.group({  
      fecha_afiliacion: fecha_afiliacion,
      foto: foto,
      correo: correo,
      apellido_materno: apellido_materno,
      acta_nacimiento: acta_nacimiento,
      monto_pension: monto_pension,
      apellido_paterno: apellido_paterno,
      observaciones: observaciones,
      nombre: nombre,
      semanas_cotizadas: semanas_cotizadas,
      nss:nss,
      genero: genero,
      beneficiarioId:beneficiarioId
    });

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
          this.afiliadoForm.value = this.afiliado;
          this.loadNameBeneficiario(this.afiliado);
        }
		    this.loadBeneficiarios();
        this.flagDelete = this.afiliadoService.getDelete();
        this.habilita();
    }

    save(){

      let beneficiario = this.afiliado.beneficiarioId;

      // Fill
      this.afiliado = this.afiliadoForm.value;
      this.afiliado.generoId = this.afiliadoForm.controls['genero'].value;
      this.afiliado.beneficiarioId = beneficiario;

       this.afiliadoService.saveAfiliado(this.afiliado).subscribe(res => {
         if (res.status == 201 || res.status == 200){
            swal('Success...', 'Afiliado save successfully.', 'success');
            this.router.navigate([ '../afiliado_mgmnt' ], { relativeTo: this.route })
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
              this.router.navigate([ '../afiliado_mgmnt' ], { relativeTo: this.route })
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
      swal('Error...', 'An error occurred while calling the afiliados.', 'error');
    });
  }

  setClickedRowBeneficiario(index, beneficiario){
    this.afiliado.beneficiarioId                   = beneficiario.beneficiarioId;
    this.beneficiarioNombre                        = beneficiario.nombre + " " + beneficiario.apellido_paterno;
  }

  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_AFILIADODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_AFILIADOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_AFILIADOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_AFILIADOSEARCH'){
        this.searchActive = true;
      }
    });
  }

}
