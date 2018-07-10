import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule, Http }   from '@angular/http'; 
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { NgxPaginationModule}  from 'ngx-pagination';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
//import { ManageHeroesComponent }    from './manage-heroes.component';


import { BeneficiarioComponent} from './beneficiario/beneficiario.component';
import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { Tipopension } from './tipopension/tipopension.component.model';
import { TipopensionComponent } from './tipopension/tipopension.component';
import { TipopensionMngComponent } from './tipopension_mgmnt/tipopension_mgmnt.component';
import { SolicitudpensionComponent } from './solicitudpension/solicitudpension.component';
import { SolicitudpensionMngComponent } from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { TipopensionService } from './tipopension/tipopension.component.service';
import { SolicitudpensionService } from './solicitudpension/solicitudpension.component.service';
import { AdminRoutingModule }       from './admin-routing.module';
import { BeneficiarioService } from './beneficiario/beneficiario.component.service';
import { SearchTipopensionPipe } from './pipe/tipopension.filter.pipe';
import { SearchAfiliadoPipe } from './pipe/afiliado.filter.pipe';
import { SearchBeneficiarioPipe } from './pipe/beneficiario.filter.pipe';
import { SearchSolicitudpensionPipe } from './pipe/solicitudpension.filter.pipe';
import { AfiliadoService } from './afiliado/afiliado.component.service';
import {HttpClientModule} from '@angular/common/http';
import { ManagePrivilegeComponent } from './manage/manage-privilege.component';
import { ManagePrivilegeService } from './manage/manage-privilege.component.service';
import { UserService } from './user/user.component.service';

import { SearchUserPipe } from './pipe/user.filter.pipe';
import { AuthorityService } from './authority/authority.component.service';
import { SearchAuthorityPipe } from './pipe/authority.filter.pipe';
import { AfiliadoManageComponent } from './afiliado/manageAfiliado/afiliado-manage.component';
import { AfiliadoCreateComponent } from './afiliado/createAfiliado/afiliado-create.component';
import { AfiliadoEditComponent } from './afiliado/editAfiliado/afiliado-edit.component';
import { UserManageComponent } from './user/manageUser/user-managecomponent';
import { UserEditComponent } from './user/editUser/user-edit.component';
import { UserCreateComponent } from './user/createUser/user-create.component';
import { AuthorityCreateComponent } from './authority/createAuthority/authority-create.component';
import { AuthorityManageComponent } from './authority/manageAuthority/manage-authority.component';
import { AuthorityEditComponent } from './authority/editAuthority/authority-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpModule,
    CommonModule,
		ReactiveFormsModule,
		FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AfiliadoCreateComponent,
    AfiliadoManageComponent,
    AfiliadoEditComponent,
    SearchTipopensionPipe,
		SearchAfiliadoPipe,
		SearchBeneficiarioPipe,
    SearchSolicitudpensionPipe,
    BeneficiarioComponent,
		BeneficiarioMngComponent,
		TipopensionComponent,
		TipopensionMngComponent,
		SolicitudpensionComponent,
    SolicitudpensionMngComponent,
    ManagePrivilegeComponent,
    UserManageComponent,
    AuthorityCreateComponent, 
    AuthorityManageComponent,
    AuthorityEditComponent,
    SearchAuthorityPipe,
    SearchUserPipe,
    UserEditComponent,
    UserCreateComponent
  ],
  providers: [ 
    AfiliadoService,
    BeneficiarioService,
    TipopensionService,
    SolicitudpensionService,
    ManagePrivilegeService,
    UserService,
    AuthorityService
]
})
export class AdminModule {}
