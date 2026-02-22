import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateBookingStatus } from '@/hooks/useQueries';
import { BookingStatus } from '@/backend';
import { toast } from 'sonner';

interface BookingStatusUpdateProps {
  bookingId: bigint;
  currentStatus: BookingStatus;
}

export default function BookingStatusUpdate({ bookingId, currentStatus }: BookingStatusUpdateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const updateStatus = useUpdateBookingStatus();

  const handleStatusChange = async (newStatus: BookingStatus) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    try {
      await updateStatus.mutateAsync({ id: bookingId, newStatus });
      toast.success('Status updated successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const statuses = [
    { value: BookingStatus.pending, label: 'Pending' },
    { value: BookingStatus.confirmed, label: 'Confirmed' },
    { value: BookingStatus.completed, label: 'Completed' },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={updateStatus.isPending}>
          {updateStatus.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Update Status'
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span>{status.label}</span>
              {currentStatus === status.value && <Check className="h-4 w-4 ml-2" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
