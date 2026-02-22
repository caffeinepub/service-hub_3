import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    status: BookingStatus;
    serviceType: ServiceType;
    date: Time;
    address: string;
    customerId: Principal;
}
export type Time = bigint;
export interface BookingInput {
    serviceType: ServiceType;
    date: Time;
    address: string;
}
export enum BookingStatus {
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum ServiceType {
    lawnMowing = "lawnMowing",
    carWash = "carWash"
}
export interface backendInterface {
    createBooking(input: BookingInput): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(id: bigint): Promise<Booking>;
    getBookingsByServiceType(serviceType: ServiceType): Promise<Array<Booking>>;
    getBookingsByStatus(status: BookingStatus): Promise<Array<Booking>>;
    updateBookingStatus(id: bigint, newStatus: BookingStatus): Promise<void>;
}
