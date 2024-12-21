import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  capacity: number;
  registered: number;
  isRegistered: boolean;
  onClick: () => void;
}

export const EventCard = ({ 
  title, 
  date, 
  location, 
  imageUrl, 
  category, 
  capacity,
  registered,
  isRegistered,
  onClick 
}: EventCardProps) => {
  const isFull = registered >= capacity;
  const registrationPercentage = (registered / capacity) * 100;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-white text-sm">
          {category}
        </span>
      </div>
      <CardHeader>
        <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{registered} / {capacity} registered</span>
            </div>
            {isFull && (
              <span className="text-destructive font-medium">Full</span>
            )}
          </div>
          <Progress value={registrationPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        {isRegistered ? (
          <Button variant="secondary" className="w-full" disabled>
            <Check className="w-4 h-4 mr-2" />
            Registered
          </Button>
        ) : (
          <Button 
            onClick={onClick} 
            className="w-full" 
            variant={isFull ? "outline" : "default"}
          >
            {isFull ? "Join Waitlist" : "Register Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};