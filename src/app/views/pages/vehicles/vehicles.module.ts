import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';

@NgModule({
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ]
})
export class MaterialModule { }

@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RoutingModule
  ]
})
export class VehiclesModule { }
