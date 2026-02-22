import HeroSection from '@/components/HeroSection';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection compact />
      
      <section className="py-16 bg-background">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Book Your Service</h1>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you shortly to confirm your booking.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>
    </div>
  );
}
