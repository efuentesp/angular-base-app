import { NgModule }   from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { BrowserModule }      from '@angular/platform-browser';
import { HttpModule, Http }   from '@angular/http';
import { NgxPaginationModule}  from 'ngx-pagination';

import { HomeComponent }  from './home.component';
import { AddHomeComponent }  from './add-home/add-home.component';
import { HomeListComponent }  from './home-list/home.list.component';
import { HomeDetailComponent }  from './home-list/detail/home.detail.component';
import { HomeService } from './service/home.service';
import { HomeRoutingModule }  from './home-routing.module';

import { BeneficiarioComponent} from './beneficiario/beneficiario.component';
import { BeneficiarioService } from './beneficiario/beneficiario.component.service';
import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { AfiliadoComponent } from './afiliado/afiliado.component';
import { AfiliadoMngComponent } from './afiliado_mgmnt/afiliado_mgmnt.component';
import { Tipopension } from './tipopension/tipopension.component.model';
import { TipopensionComponent } from './tipopension/tipopension.component';
import { TipopensionMngComponent } from './tipopension_mgmnt/tipopension_mgmnt.component';
import { SolicitudpensionComponent } from './solicitudpension/solicitudpension.component';
import { SolicitudpensionMngComponent } from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { AfiliadoService } from './afiliado/afiliado.component.service';
import { TipopensionService } from './tipopension/tipopension.component.service';
import { SolicitudpensionService } from './solicitudpension/solicitudpension.component.service';

import { AuthGuard }             from '../guards/auth.guard';
import { AuthenticationService } from '../user/authentication.component.service';
import { SearchTipopensionPipe } from './pipe/tipopension.filter.pipe';
import { SearchAfiliadoPipe } from './pipe/afiliado.filter.pipe';
import { SearchBeneficiarioPipe } from './pipe/beneficiario.filter.pipe';
import { SearchSolicitudpensionPipe } from './pipe/solicitudpension.filter.pipe';
import { HomeEditComponent } from './home-list/edit/home.edit.component';
import { AccionComponent } from './accion/accion.component';
import { AccionMngComponent } from './accion_mgmnt/accion_mgmnt.component';
import { AccionService } from './accion/accion.component.service';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloService } from './modulo/modulo.component.service';
import { ModuloMngComponent } from './modulo_mgmnt/modulo_mgmnt.component';
import { AuthorityComponent } from './authority/authority.component';
import { AuthorityMngComponent } from './authority_mgmnt/authority_mgmnt.component';
import { AuthorityService } from './authority/authority.component.service';
import { UserComponent } from './user/user.component';
import { UserMngComponent } from './user_mgmnt/user_mgmnt.component';
import { UserService } from './user/user.component.service';
import { UserAuthorityComponent } from './user_authority/user-authority.component';
import { ModuloAccionComponent } from './modulo_accion/modulo_accion.component';

@NgModule({
  imports: [     
        CommonModule,
		ReactiveFormsModule,
		HomeRoutingModule,
		BrowserModule,
		FormsModule,
		NgxPaginationModule,
		HttpModule
  ], 
  declarations: [
		HomeComponent,
		AddHomeComponent,
		HomeListComponent,
		HomeEditComponent,
		HomeDetailComponent,
		BeneficiarioComponent,
		BeneficiarioMngComponent,
		AfiliadoComponent,
		AfiliadoMngComponent,
		TipopensionComponent,
		TipopensionMngComponent,
		SolicitudpensionComponent,
		SolicitudpensionMngComponent,
		SearchTipopensionPipe,
		SearchAfiliadoPipe,
		SearchBeneficiarioPipe,
		SearchSolicitudpensionPipe,
		UserComponent,
		UserMngComponent,
		AuthorityComponent,
		AuthorityMngComponent,
		AccionComponent,
		AccionMngComponent,
		ModuloComponent,
		ModuloMngComponent, 
		UserAuthorityComponent,
		ModuloAccionComponent
  ],
  providers: [ HomeService, 
			   BeneficiarioService,
			   AfiliadoService,
			   TipopensionService,
			   SolicitudpensionService,
			   AuthGuard,
			   AuthenticationService,
			   ModuloService,
			   AccionService,
			   AuthorityService,
			   UserService
]})
export class HomeModule { }
