import { useState } from 'react';
import BookingsList from '@/components/BookingsList';
import BookingFilters from '@/components/BookingFilters';
import { ServiceType, BookingStatus } from '@/backend';

export default function BookingsManagementPage() {
  const [serviceFilter, setServiceFilter] = useState<ServiceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-background">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Manage Bookings</h1>
            <p className="text-muted-foreground">
              View and manage all service bookings. Filter by service type or status.
            </p>
          </div>

          <BookingFilters
            serviceFilter={serviceFilter}
            statusFilter={statusFilter}
            onServiceFilterChange={setServiceFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <BookingsList serviceFilter={serviceFilter} statusFilter={statusFilter} />
        </div>
      </section>
    </div>
  );
}
