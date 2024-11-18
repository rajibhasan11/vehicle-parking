import { DateTime } from './time';

export enum VehicleType {
    Micro_Bus = 'micro-bus',
    Car = 'car',
    Truck = 'truck',
    Bike = 'bike',
}

export enum ParkingStatus {
    In = 'in',
    Out = 'out',
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: number | string;
}

export interface Vehicle {
    id?: string; // for new entry id doesn't exist
    licenseNo: string;
    type: string;
    ownerName: string;
    ownerPhone: string;
    ownerAddress: Address;
    status: string;
    entryTime: DateTime | string;
    exitTime: DateTime | string;
    parkingCharge: number;
}
