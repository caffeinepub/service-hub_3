import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, Car, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateBooking } from '@/hooks/useQueries';
import { ServiceType } from '@/backend';
import { toast } from 'sonner';

export default function BookingForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType | ''>('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');

  const createBooking = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !serviceType || !date || !address) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const dateTimestamp = BigInt(new Date(date).getTime() * 1_000_000);
      
      await createBooking.mutateAsync({
        serviceType: serviceType as ServiceType,
        date: dateTimestamp,
        address,
      });

      toast.success('Booking created successfully!', {
        description: 'We will confirm your appointment shortly.',
      });

      setName('');
      setEmail('');
      setPhone('');
      setServiceType('');
      setDate('');
      setAddress('');

      setTimeout(() => {
        navigate({ to: '/manage' });
      }, 1500);
    } catch (error) {
      toast.error('Failed to create booking', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Booking Form</CardTitle>
        <CardDescription>Please provide your details and service preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Service Type *</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setServiceType(ServiceType.lawnMowing)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  serviceType === ServiceType.lawnMowing
                    ? 'border-lawn bg-lawn/10'
                    : 'border-border hover:border-lawn/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-lawn/20 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-lawn" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Lawn Mowing</div>
                    <div className="text-sm text-muted-foreground">Professional lawn care</div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setServiceType(ServiceType.carWash)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  serviceType === ServiceType.carWash
                    ? 'border-wash bg-wash/10'
                    : 'border-border hover:border-wash/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-wash/20 flex items-center justify-center">
                    <Car className="h-6 w-6 text-wash" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Car Washing</div>
                    <div className="text-sm text-muted-foreground">Complete car detailing</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="address"
                placeholder="123 Main Street, City, State, ZIP"
                className="pl-10 min-h-[100px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={createBooking.isPending}>
            {createBooking.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Booking...
              </>
            ) : (
              'Submit Booking Request'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
