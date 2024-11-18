import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveVehicleComponent } from './save-vehicle.component';

describe('SaveVehicleComponent', () => {
  let component: SaveVehicleComponent;
  let fixture: ComponentFixture<SaveVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveVehicleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SaveVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
