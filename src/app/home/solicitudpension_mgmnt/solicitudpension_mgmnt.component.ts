import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { SolicitudpensionService }                                  from '../solicitudpension/solicitudpension.component.service';
import { Solicitudpension }                                         from '../solicitudpension/solicitudpension.component.model';

import { SearchSolicitudpensionPipe }                               from "../pipe/solicitudpension.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './solicitudpension_mgmnt.component.html'
})

export class SolicitudpensionMngComponent implements OnInit {

  title = 'Solicitudpension';
  solicitudpensionList: Solicitudpension;
  solicitudpension: Solicitudpension;
  form: any;
  public flag: boolean = false;

  public busquedaBeneficiario='';
  filterInputBeneficiario = new FormControl();

    constructor(private solicitudpensionService: SolicitudpensionService, 
                private route: ActivatedRoute,
                private router: Router) {
          this.filterInputBeneficiario.valueChanges.subscribe(busquedaBeneficiario => {
          this.busquedaBeneficiario = busquedaBeneficiario;
        });
  }

  ngOnInit() {
      this.loadSolicitudpensions();
      this.solicitudpensionService.setEdit(false);
  }

  loadSolicitudpensions() {
    this.solicitudpensionService.getAllSolicitudpension().subscribe(data => {
      if (data) {
        this.solicitudpensionList = data;
      }
    }, error => {
      swal('Error...', 'An error occurred while calling the solicitudpensions.', 'error');
    });
  }

  add(){
    this.solicitudpensionService.setEdit(false);
    this.solicitudpensionService.clear();
    this.router.navigate([ '../solicitudpension' ], { relativeTo: this.route })  
  }

  setClickedRowSolicitudpension(index, solicitudpension){
    this.solicitudpensionService.setSolicitudpension(solicitudpension);
    this.solicitudpensionService.setEdit(true);
    this.router.navigate([ '../solicitudpension' ], { relativeTo: this.route })
  }
}

