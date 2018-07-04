import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';

import { SearchTipopensionPipe }                               from "../pipe/tipopension.filter.pipe";
import { User } from '../user/user.component.model';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-view',
    templateUrl: './tipopension_mgmnt.component.html'
})

export class TipopensionMngComponent implements OnInit {

    title = 'Nuevo Tipopension';
    tipopensionList: Tipopension;
    tipopension: Tipopension;
    form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    private afiliadosearch: boolean = false;
    private afiliadoupdate: boolean = false;
    private afiliadocreate: boolean = false;
    private afiliadodelete: boolean = false;

  	public busquedaTipopension='';
	  filterInputTipopension = new FormControl();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private tipopensionService: TipopensionService,
                private location: Location) {
	   	     this.filterInputTipopension.valueChanges.subscribe(busquedaTipopension => {
	         this.busquedaTipopension = busquedaTipopension;
	       });
	}

    ngOnInit() {
        this.loadTipopensions();
        this.tipopensionService.setEdit(false);
        this.tipopensionService.setDelete(false);
        this.habilita();
    }

    loadTipopensions() {
      this.tipopensionService.getAllTipopension().subscribe(data => {
        if (data) {
          this.tipopensionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      });
    }

    add(){
      this.tipopensionService.setEdit(false);
      this.tipopensionService.setDelete(false);
      this.tipopensionService.clear();
      this.router.navigate([ '../tipopension' ], { relativeTo: this.route })
    }

    editar(){
      this.tipopensionService.setEdit(true);
      this.tipopensionService.setDelete(false);
    }

    eliminar(){
      this.tipopensionService.setEdit(false);
      this.tipopensionService.setDelete(true);
    }

    setClickedRowTipopension(index, tipopension){
      this.tipopensionService.setTipopension(tipopension);
      this.tipopensionService.setEdit(true);
      this.router.navigate([ '../tipopension' ], { relativeTo: this.route })
    }

    habilita(){

      this.userAdmin.authorities.forEach(element => {
        if (element.authority == 'ROLE_SOLICITUDPENSIONDELETE'){
          this.afiliadodelete = true;
        }
        if (element.authority == 'ROLE_SOLICITUDPENSIONCREATE'){
          this.afiliadocreate = true;
        }
        if (element.authority == 'ROLE_SOLICITUDPENSIONUPDATE'){
          this.afiliadoupdate = true;
        }
        if (element.authority == 'ROLE_SOLICITUDPENSIONSEARCH'){
          this.afiliadosearch = true;
        }
      });
    }

}
