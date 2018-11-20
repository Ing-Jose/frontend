import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard, AdminGuard } from '../services/service.index'; //guards

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
// data:{} permite pasar un objeto a las rutas 

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo:'ProgressBars' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo:'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo:'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo:'RxJs' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo:'Ajuste Temas' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo:'Perfil de Usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo:'Buscador' } },
            // Mantenimientos
            { 
                path: 'usuarios', 
                component: UsuariosComponent, 
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Usuarios' } 
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
            //para actualizar los medicos recibe el id
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médicos' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
