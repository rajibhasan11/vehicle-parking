import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoutingModule } from './dashbaord-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  providers: [
    TitleCasePipe,
    provideNativeDateAdapter()
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class MaterialModule { }

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RoutingModule
  ]
})
export class DashboardModule { }
