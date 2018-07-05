import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule, Http }   from '@angular/http'; 
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { NgxPaginationModule}  from 'ngx-pagination';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
//import { ManageHeroesComponent }    from './manage-heroes.component';

import { AfiliadoComponent } from './afiliado/afiliado.component';
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
import { AfiliadoMngComponent } from './afiliado_mgmnt/afiliado_mgmnt.component';
import { SearchTipopensionPipe } from './pipe/tipopension.filter.pipe';
import { SearchAfiliadoPipe } from './pipe/afiliado.filter.pipe';
import { SearchBeneficiarioPipe } from './pipe/beneficiario.filter.pipe';
import { SearchSolicitudpensionPipe } from './pipe/solicitudpension.filter.pipe';
import { AfiliadoService } from './afiliado/afiliado.component.service';
import {HttpClientModule} from '@angular/common/http';
import { ManagePrivilegeComponent } from './manage/manage-privilege.component';
import { ManagePrivilegeService } from './manage/manage-privilege.component.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.component.service';
import { UserMngComponent } from './user_mgmnt/user_mgmnt.component';
import { SearchUserPipe } from './pipe/user.filter.pipe';
import { AuthorityComponent } from './authority/authority.component';
import { AuthorityMngComponent } from './authority_mgmnt/authority_mgmnt.component';
import { AuthorityService } from './authority/authority.component.service';
import { UserServiceAuxiliar } from './user/useraux.component.service';

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
    //ManageHeroesComponent,
    AfiliadoComponent,
    AfiliadoMngComponent,
    SearchTipopensionPipe,
		SearchAfiliadoPipe,
		SearchBeneficiarioPipe,
    SearchSolicitudpensionPipe,
    SearchUserPipe,
    BeneficiarioComponent,
		BeneficiarioMngComponent,
		TipopensionComponent,
		TipopensionMngComponent,
		SolicitudpensionComponent,
    SolicitudpensionMngComponent,
    ManagePrivilegeComponent,
    UserComponent,
    UserMngComponent,
    AuthorityComponent, 
    AuthorityMngComponent  
  ],
  providers: [ 
    AfiliadoService,
    BeneficiarioService,
    TipopensionService,
    SolicitudpensionService,
    ManagePrivilegeService,
    UserService,
    AuthorityService ,
    UserServiceAuxiliar
]
})
export class AdminModule {}
