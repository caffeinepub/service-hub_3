import { Leaf, Car, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import BookingStatusUpdate from '@/components/BookingStatusUpdate';
import { useBookings } from '@/hooks/useQueries';
import { ServiceType, BookingStatus } from '@/backend';

interface BookingsListProps {
  serviceFilter: ServiceType | 'all';
  statusFilter: BookingStatus | 'all';
}

export default function BookingsList({ serviceFilter, statusFilter }: BookingsListProps) {
  const { data: bookings, isLoading, error } = useBookings(serviceFilter, statusFilter);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getServiceIcon = (serviceType: ServiceType) => {
    return serviceType === ServiceType.lawnMowing ? (
      <Leaf className="h-4 w-4 text-lawn" />
    ) : (
      <Car className="h-4 w-4 text-wash" />
    );
  };

  const getServiceLabel = (serviceType: ServiceType) => {
    return serviceType === ServiceType.lawnMowing ? 'Lawn Mowing' : 'Car Washing';
  };

  const getStatusVariant = (status: BookingStatus): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case BookingStatus.pending:
        return 'secondary';
      case BookingStatus.confirmed:
        return 'default';
      case BookingStatus.completed:
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>Failed to load bookings. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>No bookings found matching your filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bookings ({bookings.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id.toString()}>
                  <TableCell className="font-mono text-sm">#{booking.id.toString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getServiceIcon(booking.serviceType)}
                      <span>{getServiceLabel(booking.serviceType)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 max-w-xs">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate text-sm">{booking.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(booking.status)}>{getStatusLabel(booking.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <BookingStatusUpdate bookingId={booking.id} currentStatus={booking.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
