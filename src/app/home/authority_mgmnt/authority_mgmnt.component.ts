import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../authority/authority.component.service';
import { Authority }                                         from '../authority/authority.component.model';

//import { SearchAuthorityPipe }                               from "../pipe/authority.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './authority_mgmnt.component.html'
})

export class AuthorityMngComponent implements OnInit {

    title = 'Authority';
    authorityList: Authority;
    authority: Authority;
    form: any;
    public flag: boolean = false;

  	public busquedaAuthority='';
    filterInputAuthority = new FormControl();

      constructor(private authorityService: AuthorityService, 
                  private route: ActivatedRoute,
                  private router: Router) {
          this.filterInputAuthority.valueChanges.subscribe(busquedaAuthority => {
            this.busquedaAuthority = busquedaAuthority;
          });
    }

    ngOnInit() {
        this.loadAuthoritys();
        this.authorityService.setEdit(false);
    }

    loadAuthoritys() {
      this.authorityService.getAllAuthority().subscribe(data => {
        if (data) {
          this.authorityList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the authoritys.', 'error');
      });
    }
	
  add(){
    this.authorityService.setEdit(false);
    this.authorityService.clear();
    this.router.navigate([ '../authority' ], { relativeTo: this.route })  
  }

  setClickedRowAuthority(index, authority){
    this.authorityService.setAuthority(authority);
    this.authorityService.setEdit(true);
    this.router.navigate([ '../authority' ], { relativeTo: this.route })
  }

}

