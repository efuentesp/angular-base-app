import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
//import { ManageHeroesComponent }    from './manage-heroes.component';

import { BeneficiarioMngComponent } from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { TipopensionComponent } from './tipopension/tipopension.component';
import { TipopensionMngComponent } from './tipopension_mgmnt/tipopension_mgmnt.component';
import { SolicitudpensionMngComponent } from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { SolicitudpensionComponent } from './solicitudpension/solicitudpension.component';
import { AfiliadoMngComponent } from './afiliado_mgmnt/afiliado_mgmnt.component';
import { AfiliadoComponent } from './afiliado/afiliado.component';

import { AuthGuard }                from '../auth-guard.service';
import { ManagePrivilegeComponent } from './manage/manage-privilege.component';
import { UserComponent } from './user/user.component';
import { UserMngComponent } from './user_mgmnt/user_mgmnt.component';
import { AuthorityComponent } from './authority/authority.component';
import { AuthorityMngComponent } from './authority_mgmnt/authority_mgmnt.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'beneficiario', component : BeneficiarioComponent},
          { path: 'beneficiario_mgmnt', component : BeneficiarioMngComponent},
          { path: 'afiliado', component : AfiliadoComponent},
          { path: 'afiliado_mgmnt', component : AfiliadoMngComponent},
          { path: 'solicitudpension', component : SolicitudpensionComponent},
          { path: 'solicitudpension_mgmnt', component : SolicitudpensionMngComponent},
          { path: 'tipopension', component : TipopensionComponent},
          { path: 'tipopension_mgmnt', component : TipopensionMngComponent},

          { path: 'manage', component: ManagePrivilegeComponent },
          { path: 'user', component: UserComponent },
          { path: 'user_mgmnt', component: UserMngComponent },
          { path: 'authority', component: AuthorityComponent },
          { path: 'authority_mgmnt', component: AuthorityMngComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
