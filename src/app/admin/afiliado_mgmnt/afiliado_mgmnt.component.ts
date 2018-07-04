import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AfiliadoService }                                  from '../afiliado/afiliado.component.service';
import { Afiliado }                                         from '../afiliado/afiliado.component.model';

import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
import { BeneficiarioService } from '../beneficiario/beneficiario.component.service';
import { Beneficiario } from '../beneficiario/beneficiario.component.model';
import { User } from '../user/user.component.model';
@Component ({
    selector: 'app-view',
    templateUrl: './afiliado_mgmnt.component.html'
})

export class AfiliadoMngComponent implements OnInit {

    title = 'Afiliado';
    afiliadoList: Afiliado;
    afiliado: Afiliado;
    beneficiario: Beneficiario;
    form: any;

    public user: User;
    public valueName: string;
    public token: string;

  	public busquedaAfiliado='';
    filterInputAfiliado = new FormControl();
    
    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    private afiliadosearch: boolean = false;
    private afiliadoupdate: boolean = false;
    private afiliadocreate: boolean = false;
    private afiliadodelete: boolean = false;

    constructor(private afiliadoService: AfiliadoService,
                private route: ActivatedRoute,
                private router: Router
                //private beneficiarioService: BeneficiarioService) {
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
        if (data) {
          this.afiliadoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      });
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

  setClickedRowAfiliado(index, afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.afiliadoService.setEdit(true);
    this.router.navigate([ '../afiliado' ], { relativeTo: this.route })
  }

  habilita(){

    this.userAdmin.authorities.forEach(element => {

      console.log("VAlidaciones Afiliado: ", element.authority);

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
