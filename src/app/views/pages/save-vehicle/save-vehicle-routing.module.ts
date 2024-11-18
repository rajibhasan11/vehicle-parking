import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveVehicleComponent } from './save-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: SaveVehicleComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
