import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'vehicles',
    title: 'Vehicles',
    loadChildren: () => import('./views/pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
  },
  {
    path: 'edit-vehicle/:id',
    title: 'Edit Vehicle',
    loadChildren: () => import('./views/pages/save-vehicle/save-vehicle.module').then(m => m.SaveVehicleModule)
  },
  {
    path: 'add-vehicle',
    title: 'Add Vehicle',
    loadChildren: () => import('./views/pages/save-vehicle/save-vehicle.module').then(m => m.SaveVehicleModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
