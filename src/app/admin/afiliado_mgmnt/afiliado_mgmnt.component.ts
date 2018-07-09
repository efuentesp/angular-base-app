import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';
import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
import { BeneficiarioService } from '../beneficiario/beneficiario.component.service';
import { Beneficiario } from '../beneficiario/beneficiario.component.model';
import { User } from '../user/user.component.model';

import swal from 'sweetalert2';
import { ValidationService } from '../validators/validation.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './afiliado_mgmnt.component.html'
})

export class AfiliadoMngComponent implements OnInit {

    public title = 'Afiliado';
    public afiliadoList: Afiliado;
    public afiliado: Afiliado;
    public beneficiario: Beneficiario;
    public afiliadoForm: any;
    public user: User;
    public valueName: string;
    public token: string;
  	public busquedaAfiliado='';
    public filterInputAfiliado = new FormControl();
    
    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private afiliadoService: AfiliadoService,
                private route: ActivatedRoute,
                private router: Router,
                private beneficiarioService: BeneficiarioService,
                private formBuilder: FormBuilder
              ) {
                
            this.filterInputAfiliado.valueChanges.subscribe(busquedaAfiliado => {
	          this.busquedaAfiliado = busquedaAfiliado;
            });
	  }

    ngOnInit() {
        
      // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.afiliadoService.setEdit(false);
      this.afiliadoService.setDelete(false);

      this.loadAfiliados();
      this.habilita();
    }

    loadAfiliados() {
      this.afiliadoService.getAllAfiliado().subscribe(data => {
        if (data){
          this.afiliadoList = data;
       }else if (data.status == 403 || data.status == 401){
          swal('Error...', 'Usuario no tiene permiso para guardar Afiliado.', 'error');
       }else{
         swal('Error...', 'Afiliado save unsuccessfully.', 'error');
       }
     } );
  }

  add(){
    this.afiliadoService.setEdit(false);
    this.afiliadoService.setDelete(false);
    this.afiliadoService.clear();
    this.router.navigate([ '../afiliado' ], { relativeTo: this.route })
  }

  editar(){
    this.afiliadoService.setEdit(true);
    this.afiliadoService.setDelete(false);
  }

  eliminar(){
    this.afiliadoService.setEdit(false);
    this.afiliadoService.setDelete(true);
  }

  // Select row
  setClickedRowAfiliado(index, afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.afiliadoService.setEdit(true);
    this.router.navigate([ '../afiliado' ], { relativeTo: this.route })
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
