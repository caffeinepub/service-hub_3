import { Link } from '@tanstack/react-router';
import { Leaf, Car, Calendar, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our professional lawn mowing and car washing services. Quality work, reliable service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard
              type="lawnMowing"
              title="Lawn Mowing"
              description="Keep your lawn pristine with our professional mowing service. We handle everything from small yards to large properties."
              icon="/assets/generated/lawn-mower-icon.dim_128x128.png"
            />
            <ServiceCard
              type="carWash"
              title="Car Washing"
              description="Give your vehicle the shine it deserves. Our thorough car wash service leaves your car spotless inside and out."
              icon="/assets/generated/car-wash-icon.dim_128x128.png"
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/book">
              <Button size="lg" className="group">
                Book a Service Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple, fast, and reliable service booking</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-lawn/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-lawn" />
                </div>
                <CardTitle>1. Book Online</CardTitle>
                <CardDescription>
                  Select your service, choose a date, and provide your address. It takes less than 2 minutes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-wash/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-wash" />
                </div>
                <CardTitle>2. Get Confirmed</CardTitle>
                <CardDescription>
                  We'll review your booking and confirm the appointment. You can track the status anytime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Service Done</CardTitle>
                <CardDescription>
                  Our professionals arrive on time and complete the job to your satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
