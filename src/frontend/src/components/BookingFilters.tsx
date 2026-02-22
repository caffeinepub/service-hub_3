import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceType, BookingStatus } from '@/backend';

interface BookingFiltersProps {
  serviceFilter: ServiceType | 'all';
  statusFilter: BookingStatus | 'all';
  onServiceFilterChange: (value: ServiceType | 'all') => void;
  onStatusFilterChange: (value: BookingStatus | 'all') => void;
}

export default function BookingFilters({
  serviceFilter,
  statusFilter,
  onServiceFilterChange,
  onStatusFilterChange,
}: BookingFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Filter by Service Type</Label>
            <Select value={serviceFilter} onValueChange={(value) => onServiceFilterChange(value as ServiceType | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value={ServiceType.lawnMowing}>Lawn Mowing</SelectItem>
                <SelectItem value={ServiceType.carWash}>Car Washing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Filter by Status</Label>
            <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange(value as BookingStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={BookingStatus.pending}>Pending</SelectItem>
                <SelectItem value={BookingStatus.confirmed}>Confirmed</SelectItem>
                <SelectItem value={BookingStatus.completed}>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
