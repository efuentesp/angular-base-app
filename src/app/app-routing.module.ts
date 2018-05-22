import { NgModule, CUSTOM_ELEMENTS_SCHEMA  }                     	 from '@angular/core';
import { Routes, RouterModule }         	 from '@angular/router';

import { BaseComponent}                  	 from './base/base.component';
import { TipopensionMngComponent}       	 from './tipopension_mgmnt/tipopension_mgmnt.component';
import { TipopensionComponent}       		 from './tipopension/tipopension.component';
import { SolicitudpensionMngComponent}       from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { SolicitudpensionComponent}   		 from './solicitudpension/solicitudpension.component';
import { AfiliadoMngComponent}        		 from './afiliado_mgmnt/afiliado_mgmnt.component';
import { AfiliadoComponent}           		 from './afiliado/afiliado.component';
import { BeneficiarioMngComponent}    		 from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioComponent}       		 from './beneficiario/beneficiario.component';
import { LoginComponent}              		 from './login/login.component';	
import { AuthGuard }                  		 from './guards/auth.guard';	
import { HomeComponent }              		 from './home/home.component';

export const appRoutes: Routes = [

   //{ path: '**',                     component: BaseComponent }
   { path: 'tipopension_mgmnt',      component: TipopensionMngComponent , canActivate: [AuthGuard]},  
   { path: 'tipopension',            component: TipopensionComponent , canActivate: [AuthGuard]},  
   { path: 'solicitudpension_mgmnt', component: SolicitudpensionMngComponent, canActivate: [AuthGuard]},  
   { path: 'solicitudpension',       component: SolicitudpensionComponent, canActivate: [AuthGuard]},  
   { path: 'afiliado_mgmnt',         component: AfiliadoMngComponent, canActivate: [AuthGuard]},  
   { path: 'afiliado',               component: AfiliadoComponent, canActivate: [AuthGuard]},  
   { path: 'beneficiario_mgmnt',     component: BeneficiarioMngComponent, canActivate: [AuthGuard]},  
   { path: 'beneficiario', component: BeneficiarioComponent, canActivate: [AuthGuard]}, 
   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'login', component: LoginComponent },
   { path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})


export class AppRoutingModule { }



