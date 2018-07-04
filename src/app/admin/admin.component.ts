import { Component } from '@angular/core';
import { User } from './user/user.component.model';
import { AuthenticationService } from '../authentication.component.service';
import { Router,
  NavigationExtras } from '@angular/router';
import { Authority } from '../user/authorities.component.model';

@Component({
  templateUrl: 'admin.components.html'
})
export class AdminComponent {

  public userAdmin: User;
  public valueName: string;
  public token: string;
  public authorityList: Authority [];
  public username: string;

  // Menu activation
  // Afiliado
  private afiliado_mgmnt: boolean = false;
  private afiliado: boolean = false;
  // Pension
  private pension_mgmnt: boolean = false;
  private pension: boolean = false;
  // beneficiario
  private beneficiario_mgmnt: boolean = false;
  private beneficiario: boolean = false;
  // solicitudpension
  private solicitudpension_mgmnt: boolean = false;
  private solicitudpension: boolean = false;
  // tipopension
  private tipopension: boolean = false;
  private tipopension_mgmnt: boolean = false;


  // Admin
  private manage: boolean = false;
  // Authority
  private authority: boolean = false;
  private authority_mgmnt: boolean = false;
  // Genero
  private genero: boolean = false;
  private genero_mgmnt: boolean = false;
  // Parentesco
  private parentesco: boolean = false;
  private parentesco_mgmnt: boolean = false;
  // User
  private user: boolean = false;
  private user_mgmnt: boolean = false;


  constructor(public authService: AuthenticationService, public router: Router) {
  }

  ngOnInit() {

    
    // Get token from user object
    this.userAdmin = JSON.parse(localStorage.getItem('currentUser'));
    

    this.authService.getMenu(this.userAdmin.token).subscribe(result => {
    // Fill the user object
    this.userAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this.valueName = this.userAdmin.firstname + " " + this.userAdmin.lastname ;
    this.enabledLinks(this.userAdmin);

    this.buildMenu(this.userAdmin.authorities);

    });

  }

  enabledLinks(user){
  }

  buildMenu(authorities){

    authorities.forEach(element => {
      console.log("Elementos home: ", element.authority);
      // Afiliado  --> (1)
      if (element.authority == 'ROLE_AFILIADOSEARCH'){
        this.afiliado_mgmnt = true;
      }
      if (element.authority == 'ROLE_AFILIADOCREATE'){
        this.afiliado = true;
      }

      // Pension  --> (2)
      if (element.authority == 'ROLE_PENSIONSEARCH'){
        this.pension_mgmnt = true;
      }
      if (element.authority == 'ROLE_PENSIONCREATE'){
        this.pension = true;
      }

      // Beneficiario  --> (3)
      if (element.authority == 'ROLE_BENEFICIARIOSEARCH'){
        this.beneficiario_mgmnt = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOCREATE'){
        this.beneficiario = true;
      }

      // solicitudpension  --> (4)
      if (element.authority == 'ROLE_SOLICITUDPENSIONSEARCH'){
        this.solicitudpension_mgmnt = true;
      }
      if (element.authority == 'ROLE_SOLICITUDPENSIONCREATE'){
        this.solicitudpension = true;
      }

      // tipopension  --> (5)
      if (element.authority == 'ROLE_TIPOPENSIONSEARCH'){
        this.tipopension_mgmnt = true;
      }
      if (element.authority == 'ROLE_TIPOPENSIONCREATE'){
        this.tipopension = true;
      }
 
      // Manage  --> (6)
      if (element.authority == 'ROLE_MANAGESEARCH'){
      this.manage = true;
      }

      // authority  --> (6)
      if (element.authority == 'ROLE_AUTHORITYSEARCH'){
        this.authority_mgmnt = true;
      }
      if (element.authority == 'ROLE_AUTHORITYCREATE'){
        this.authority = true;
      }

      // genero  --> (5)
      if (element.authority == 'ROLE_GENEROSEARCH'){
        this.genero_mgmnt = true;
      }
      if (element.authority == 'ROLE_GENEROCREATE'){
        this.genero = true;
      }

      // parentesco  --> (5)
      if (element.authority == 'ROLE_PARENTESCOSEARCH'){
        this.parentesco_mgmnt = true;
      }
      if (element.authority == 'ROLE_PARENTESCOCREATE'){
        this.parentesco = true;
      }

      // user  --> (5)
      if (element.authority == 'ROLE_USERSEARCH'){
        this.user_mgmnt = true;
      }
      if (element.authority == 'ROLE_USERCREATE'){
        this.user = true;
      }

    });

  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']); 
}


}