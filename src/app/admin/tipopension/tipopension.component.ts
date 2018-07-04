import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';
import { Location } from '@angular/common';

@Component ({
    selector: 'app-view',
    templateUrl: './tipopension.component.html',
    styleUrls: ['./tipopension.component.css']
})

export class TipopensionComponent implements OnInit {

    title = 'Nuevo Tipopension';
    tipopensionList: Tipopension;
    tipopension: Tipopension;
    public flag: boolean = false;
    public flagDelete: boolean = false;

    form: any;

    constructor(
                private router: Router,
                private route: ActivatedRoute,
                private tipopensionService: TipopensionService,
                private location: Location
    ) {}

    ngOnInit() {
        this.tipopension = new Tipopension;
        this.flag = this.tipopensionService.getEdit();
        if (this.flag){
          this.tipopension = this.tipopensionService.getTipopension();
        }

        this.flagDelete = this.tipopensionService.getDelete();
    }

    save(tipopension){
      this.tipopensionService.saveTipopension(this.tipopension).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Tipopension save successfully.', 'success');
          this.router.navigate([ '../tipopension_mgmnt' ], { relativeTo: this.route })
        }else{
          swal('Error...', 'Tipopension save unsuccessfully.', 'error');
        }
      } );
    }

    delete(tipopension){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this tipopension!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      }).then((isConfirm) => {
        if (isConfirm.value) {
          this.tipopensionService.deleteTipopension(this.tipopension).subscribe(res => {
            if (res.status == 201 || res.status == 200){
              swal('Success...', 'Tipopension item has been deleted successfully.', 'success');
              this.router.navigate([ '../tipopension_mgmnt' ], { relativeTo: this.route })
            }else{
              swal('Error...', 'Tipopension deleted unsuccessfully.', 'error');
            }
          });
        } else {
          //swal("Cancelled", "Tipopension deleted unsuccessfully", "error");
        }
      });
    }

	return(beneficiario){
      this.location.back();
  }
}
