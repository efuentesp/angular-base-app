import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.component.model';
import { FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { AdminPermiso } from './manage-privilege.component.model';
import { ManagePrivilegeService } from './manage-privilege.component.service';

@Component({
  templateUrl: 'manage-privileges.component.html'
})

export class ManagePrivilegeComponent implements OnInit {

  title = 'Nuevo ManagePrivile';
  public flag: boolean;
  public flagDelete: boolean;
  public beneficiarioNombre: string = '';
  public adminPermisoList: AdminPermiso;
  form: any;
  public adminPermiso: AdminPermiso;

  public user: User;
  public valueName: string;
  public token: string;

  constructor( private managePrivilegeService:ManagePrivilegeService) {}

  ngOnInit() {
      
      this.loadAdminPermiso();

      
  }

loadAdminPermiso(){
      this.managePrivilegeService.getAllPrivilege().subscribe(data => {
      if (data) {
        console.log('Los permisos: ', data);
        this.adminPermisoList = data;
      }
      }, error => {
      swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
    });
}

saveData(event, type, c){




  // Id Authority
  if (type == 1){
    console.log("Tipo Admin");
    console.log("Evento: ", event);
    console.log("Checked", c.target.checked);

    this.adminPermiso = event;
    this.adminPermiso.admin = c.target.checked;
    this.adminPermiso.activeUser = type;
    
  }else
    if (type == 2){
      console.log("Tipo User");
      console.log("Evento: ", event);
      console.log("Checked", c.target.checked);
      this.adminPermiso = event;
      this.adminPermiso.user = c.target.checked;
      this.adminPermiso.activeUser = type;
    }else
      if(type == 3){
        console.log("Tipo Annon");
        console.log("Evento: ", event);
        console.log("Checked", c.target.checked);
        this.adminPermiso = event;
        this.adminPermiso.anonymous = c.target.checked;
        this.adminPermiso.activeUser = type;
      }

      console.log ("Se va el permiso: ", this.adminPermiso);
      
      this.managePrivilegeService.updatePrivilege(this.adminPermiso).subscribe(data => {
        console.log("OK");

      });
}

// setClickedRowBeneficiario(index, beneficiario){
//   this.afiliado.beneficiarioId                   = beneficiario.beneficiarioId;
//   this.beneficiarioNombre                        = beneficiario.nombre + " " + beneficiario.apellido_paterno;
// }

}

