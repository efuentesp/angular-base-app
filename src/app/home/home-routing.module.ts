import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './home.component';
import { HomeListComponent }  from './home-list/home.list.component';
import { AddHomeComponent }  from './add-home/add-home.component';
import { HomeDetailComponent }  from './home-list/detail/home.detail.component';
import { HomeEditComponent }  from './home-list/edit/home.edit.component';
import { AuthGuard }                  		 from '../guards/auth.guard';	
import { patch } from 'webdriver-js-extender';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { TipopensionComponent } from './tipopension/tipopension.component';
import { TipopensionMngComponent } from './tipopension_mgmnt/tipopension_mgmnt.component';
import { SolicitudpensionMngComponent } from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { SolicitudpensionComponent } from './solicitudpension/solicitudpension.component';
import { AfiliadoMngComponent } from './afiliado_mgmnt/afiliado_mgmnt.component';
import { AfiliadoComponent } from './afiliado/afiliado.component';
import { UserComponent } from './user/user.component';
import { UserMngComponent } from './user_mgmnt/user_mgmnt.component';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloMngComponent } from './modulo_mgmnt/modulo_mgmnt.component';
import { AccionComponent } from './accion/accion.component';
import { AccionMngComponent } from './accion_mgmnt/accion_mgmnt.component';
import { AuthorityComponent } from './authority/authority.component';
import { AuthorityMngComponent } from './authority_mgmnt/authority_mgmnt.component';
import { UserAuthorityComponent } from './user_authority/user-authority.component';
import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { ModuloAccionComponent} from './modulo_accion/modulo_accion.component';
import { ModuloAccionAuthorityComponent } from './modulo_accion_authority/modulo_accion_authority.component';

const homeRoutes: Routes = [
	{ 
	  path: 'home',
      component: HomeComponent, canActivate: [AuthGuard],
      children: [ 
	    {
		   path: 'add',
		   component: AddHomeComponent, canActivate: [AuthGuard]
		},
	    {
	       path: 'list',
		   component: HomeListComponent, canActivate: [AuthGuard],
		   children: [
		       {
			       path: 'view/:home-id',
		           component: HomeDetailComponent,canActivate: [AuthGuard]
			   },
		   	   {
			       path: 'edit/:home-id',
		           component: HomeEditComponent, canActivate: [AuthGuard]
			   },			   
		   ]
		},
		{ path: 'beneficiario', component : BeneficiarioComponent, canActivate: [AuthGuard] },
		{ path: 'beneficiario_mgmnt', component : BeneficiarioMngComponent, canActivate: [AuthGuard] },
		{ path: 'afiliado', component : AfiliadoComponent, canActivate: [AuthGuard] },
		{ path: 'afiliado_mgmnt', component : AfiliadoMngComponent, canActivate: [AuthGuard] },
		{ path: 'solicitudpension', component : SolicitudpensionComponent, canActivate: [AuthGuard] },
		{ path: 'solicitudpension_mgmnt', component : SolicitudpensionMngComponent, canActivate: [AuthGuard] },
		{ path: 'tipopension', component : TipopensionComponent, canActivate: [AuthGuard] },
		{ path: 'tipopension_mgmnt', component : TipopensionMngComponent, canActivate: [AuthGuard] },
		
		{ path: 'user', component : UserComponent , canActivate: [AuthGuard] },
		{ path: 'user_mgmnt', component : UserMngComponent, canActivate: [AuthGuard]  },
		{ path: 'modulo', component : ModuloComponent, canActivate: [AuthGuard] },
		{ path: 'modulo_mgmnt', component : ModuloMngComponent , canActivate: [AuthGuard] },
		{ path: 'accion', component : AccionComponent, canActivate: [AuthGuard] },
		{ path: 'accion_mgmnt', component : AccionMngComponent, canActivate: [AuthGuard] },
		{ path: 'authority', component : AuthorityComponent, canActivate: [AuthGuard] },
		{ path: 'authority_mgmnt', component : AuthorityMngComponent, canActivate: [AuthGuard] },
		{ path: 'userAuthority', component : UserAuthorityComponent, canActivate: [AuthGuard] },
		{ path: 'modulo_accion_authority', component : ModuloAccionAuthorityComponent, canActivate: [AuthGuard] },
		{ path: 'modulo_accion', component : ModuloAccionComponent, canActivate: [AuthGuard] }
	  ]
	}  
];

@NgModule({
  imports: [ RouterModule.forChild(homeRoutes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule{ }
