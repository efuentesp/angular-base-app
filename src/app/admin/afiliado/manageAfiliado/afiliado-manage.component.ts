import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { User } from '../../user/user.component.model';

import swal from 'sweetalert2';
import { Afiliado } from '../afiliado.component.model';
import { Beneficiario } from '../../beneficiario/beneficiario.component.model';
import { AfiliadoService } from '../afiliado.component.service';
import { BeneficiarioService } from '../../beneficiario/beneficiario.component.service';

@Component ({
    selector: 'app-view',
    templateUrl: './afiliado-manage.component.html'
})

export class AfiliadoManageComponent implements OnInit {

    public title = 'Afiliado';
    public afiliadoList: Afiliado;
    public afiliado: Afiliado;
    public beneficiario: Beneficiario;
    public form: any;
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
                private beneficiarioService: BeneficiarioService) {
            
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
    this.afiliadoService.clear();
    this.router.navigate([ '../createAfiliado' ], { relativeTo: this.route })
  }

  editar(afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.afiliadoService.setEdit(true);
    this.afiliadoService.setDelete(false);
    this.router.navigate([ '../editAfiliado' ], { relativeTo: this.route })
  }

  eliminar(afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.afiliadoService.setEdit(false);
    this.afiliadoService.setDelete(true);
    this.router.navigate([ '../editAfiliado' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowAfiliado(index, afiliado){
    this.afiliadoService.setAfiliado(afiliado);
    this.afiliadoService.setEdit(true);
    this.afiliadoService.setDelete(false);
    this.router.navigate([ '../editAfiliado' ], { relativeTo: this.route })
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
