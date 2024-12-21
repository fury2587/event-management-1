import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  onClick: () => void;
}

export const EventCard = ({ title, date, location, imageUrl, category, onClick }: EventCardProps) => {
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
      <CardContent className="space-y-2">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full bg-primary hover:bg-primary/90">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};