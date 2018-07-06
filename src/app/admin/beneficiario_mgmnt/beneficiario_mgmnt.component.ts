import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { BeneficiarioService }                                  from '../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../beneficiario/beneficiario.component.model';

import { SearchBeneficiarioPipe }                               from "../pipe/beneficiario.filter.pipe";
import { User } from '../user/user.component.model';
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
    public flagDelete: boolean = false;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;
    
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
        this.beneficiarioService.setDelete(false);
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
    this.beneficiarioService.setDelete(false);
    this.beneficiarioService.clear();
    this.router.navigate([ '../beneficiario' ], { relativeTo: this.route })
  }

  editar(){
    this.beneficiarioService.setEdit(true);
    this.beneficiarioService.setDelete(false);
  }

  eliminar(){
    this.beneficiarioService.setEdit(false);
    this.beneficiarioService.setDelete(true);
  }

  setClickedRowBeneficiario(index, beneficiario){
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.beneficiarioService.setEdit(true);
    this.router.navigate([ '../beneficiario' ], { relativeTo: this.route })
  }

  habilita(){

    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_BENEFICIARIODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOSEARCH'){
        this.searchActive = true;
      }
    });

  }

}
