import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  type ServiceType = {
    #lawnMowing;
    #carWash;
  };

  module ServiceType {
    public func toText(service : ServiceType) : Text {
      switch (service) {
        case (#lawnMowing) { "Lawn Mowing" };
        case (#carWash) { "Car Wash" };
      };
    };

    public func compare(service1 : ServiceType, service2 : ServiceType) : Order.Order {
      switch (service1, service2) {
        case (#lawnMowing, #carWash) { #less };
        case (#carWash, #lawnMowing) { #greater };
        case (_) { #equal };
      };
    };
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
  };

  module BookingStatus {
    public func toText(status : BookingStatus) : Text {
      switch (status) {
        case (#pending) { "Pending" };
        case (#confirmed) { "Confirmed" };
        case (#completed) { "Completed" };
      };
    };

    public func compare(status1 : BookingStatus, status2 : BookingStatus) : Order.Order {
      switch (status1, status2) {
        case (#pending, #confirmed) { #less };
        case (#confirmed, #pending) { #greater };
        case (#pending, #completed) { #less };
        case (#completed, #pending) { #greater };
        case (#confirmed, #completed) { #less };
        case (#completed, #confirmed) { #greater };
        case (_) { #equal };
      };
    };
  };

  type Booking = {
    id : Nat;
    customerId : Principal;
    serviceType : ServiceType;
    date : Time.Time;
    address : Text;
    status : BookingStatus;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };
  };

  type BookingInput = {
    serviceType : ServiceType;
    date : Time.Time;
    address : Text;
  };

  let bookings = Map.empty<Nat, Booking>();
  var nextId = 0;

  public shared ({ caller }) func createBooking(input : BookingInput) : async Nat {
    nextId += 1;
    let booking : Booking = {
      id = nextId;
      customerId = caller;
      serviceType = input.serviceType;
      date = input.date;
      address = input.address;
      status = #pending;
    };

    bookings.add(nextId, booking);
    nextId;
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, newStatus : BookingStatus) : async () {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          booking with status = newStatus;
        };
        bookings.add(id, updatedBooking);
      };
    };
  };

  public query ({ caller }) func getBooking(id : Nat) : async Booking {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) { booking };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    let iter = bookings.values();
    iter.toArray();
  };

  public query ({ caller }) func getBookingsByServiceType(serviceType : ServiceType) : async [Booking] {
    let iter = bookings.values();
    let filtered = iter.filter(
      func(booking) {
        booking.serviceType == serviceType;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getBookingsByStatus(status : BookingStatus) : async [Booking] {
    let iter = bookings.values();
    let filtered = iter.filter(
      func(booking) {
        booking.status == status;
      }
    );
    filtered.toArray();
  };
};
