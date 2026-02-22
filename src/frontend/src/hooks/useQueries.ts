import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ServiceType, BookingStatus, type BookingInput, type Booking } from '@/backend';

export function useBookings(serviceFilter: ServiceType | 'all', statusFilter: BookingStatus | 'all') {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['bookings', serviceFilter, statusFilter],
    queryFn: async () => {
      if (!actor) return [];

      if (serviceFilter !== 'all' && statusFilter !== 'all') {
        const allBookings = await actor.getAllBookings();
        return allBookings.filter(
          (booking) => booking.serviceType === serviceFilter && booking.status === statusFilter
        );
      } else if (serviceFilter !== 'all') {
        return actor.getBookingsByServiceType(serviceFilter);
      } else if (statusFilter !== 'all') {
        return actor.getBookingsByStatus(statusFilter);
      } else {
        return actor.getAllBookings();
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createBooking(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newStatus }: { id: bigint; newStatus: BookingStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateBookingStatus(id, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
