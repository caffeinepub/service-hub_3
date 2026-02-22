import { Leaf, Car } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  type: 'lawnMowing' | 'carWash';
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ type, title, description, icon }: ServiceCardProps) {
  const isLawn = type === 'lawnMowing';

  return (
    <Card className={`border-2 hover:border-${isLawn ? 'lawn' : 'wash'}/50 transition-all hover:shadow-lg group`}>
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className={`w-24 h-24 rounded-2xl bg-${isLawn ? 'lawn' : 'wash'}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <img src={icon} alt={title} className="w-16 h-16" />
          </div>
        </div>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className={`flex items-center space-x-2 text-sm font-medium text-${isLawn ? 'lawn' : 'wash'}`}>
          {isLawn ? <Leaf className="h-4 w-4" /> : <Car className="h-4 w-4" />}
          <span>Professional Service</span>
        </div>
      </CardContent>
    </Card>
  );
}
