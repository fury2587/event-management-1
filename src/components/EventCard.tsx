import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const isFull = registered >= capacity;
  const registrationPercentage = (registered / capacity) * 100;

  return (
    <Card 
      className={`
        group relative overflow-hidden transition-all duration-300 
        hover:shadow-lg animate-fade-up transform hover:-translate-y-1
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={`
            w-full h-full object-cover transition-transform duration-500
            group-hover:scale-110
          `}
        />
        <span className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
          {category}
        </span>
      </div>
      <CardHeader className="relative z-10">
        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
              <Users className="w-4 h-4 mr-2" />
              <span>{registered} / {capacity} registered</span>
            </div>
            {isFull && (
              <span className="text-destructive font-medium animate-pulse">
                Full
              </span>
            )}
          </div>
          <Progress 
            value={registrationPercentage} 
            className="h-2 transition-all duration-500"
          />
        </div>
      </CardContent>
      <CardFooter>
        {isRegistered ? (
          <Button 
            variant="secondary" 
            className="w-full group-hover:bg-secondary/90 transition-colors"
            disabled
          >
            <Check className="w-4 h-4 mr-2 animate-fade-down" />
            Registered
          </Button>
        ) : (
          <Button 
            onClick={onClick} 
            className={`
              w-full transition-all duration-300
              ${isFull ? 'hover:bg-destructive/90' : 'hover:bg-primary/90'}
            `}
            variant={isFull ? "outline" : "default"}
          >
            {isFull ? "Join Waitlist" : "Register Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};