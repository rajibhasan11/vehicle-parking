import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../../../commons/base.page';
import { SelectOption } from '../../../models/selection';
import { ToastService } from '../../../services/toast/toast.service';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-save-vehicle',
  templateUrl: './save-vehicle.component.html',
  styleUrl: './save-vehicle.component.scss',
  providers: [VehicleService],
  standalone: false
})
export class SaveVehicleComponent extends BasePage implements OnInit {

  form!: FormGroup;

  get vehicleTypeOptions(): SelectOption[] {
    return this.service.vehicleTypeOptions;
  }

  get vehicleStatusOptions(): SelectOption[] {
    return this.service.vehicleStatusOptions;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get dirty(): boolean {
    return this.form.dirty;
  }

  get canSave(): boolean {
    return this.dirty && this.valid;
  }

  get currentPath(): string {
    return location.pathname;
  }

  get baseHref(): string {
    return this.locationStrategy.getBaseHref();
  }

  get isCreationFlow(): boolean {
    return this.currentPath.startsWith(`${this.baseHref}add-vehicle`);
  }

  get isEditFlow(): boolean {
    return this.currentPath.startsWith(`${this.baseHref}edit-vehicle`);
  }

  get isExitTimeRequired(): boolean {
    return this.isEditFlow;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private formBuilder: FormBuilder,
    private service: VehicleService,
    private toast: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();

    if (this.isEditFlow) {
      this.addSubscription(
        this.route.params.subscribe(params => {
          const id: string = params['id'];
          if (!id) {
            this.toast.showMessage('Vehicle id not found in URL', 'warn');
            return;
          }
          const vehicle = this.service.getVehicle(id);
          if (!vehicle) {
            this.form.disable();
            this.toast.showMessage('Vehicle not found', 'warn');
            return;
          }
          delete vehicle.id;
          this.form.setValue(vehicle);
        })
      );
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      licenseNo: ['', [Validators.required]],
      type: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerPhone: ['', [Validators.required]],
      status: ['', [Validators.required]],
      ownerAddress: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      }),
      entryTime: this.formBuilder.group({
        date: ['', [Validators.required]],
        time: ['', [Validators.required]]
      }),
      exitTime: this.formBuilder.group({
        date: ['', this.isExitTimeRequired ? [Validators.required] : []],
        time: ['', this.isExitTimeRequired ? [Validators.required] : []]
      }),
      parkingCharge: ['', [Validators.required]]
    });
    this.service.setForm(this.form);
  }

  saveVehicle(): void {
    const id = this.route.snapshot.params['id'];
    const result = this.service.saveVehicle(id);
    if (!result) {
      this.toast.showMessage('Saved failed');
      return;
    }
    this.toast.showMessage('Saved successfully');
    this.router.navigateByUrl('/vehicles');
  }

  getControl(key: string, group?: string): AbstractControl {
    return this.service.getControl(key, group);
  }

  get(key: string, group?: string): any {
    return this.service.get(key, group);
  }

}
