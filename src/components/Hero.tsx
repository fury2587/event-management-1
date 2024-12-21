import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"
        style={{
          backgroundImage: "linear-gradient(135deg, #6D28D9 0%, #60A5FA 100%)",
        }}
      />
      <div 
        className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"
        style={{
          transform: "scale(1.1)",
          transition: "transform 0.5s ease-out",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center space-y-6 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-down">
          Discover Amazing Events
        </h1>
        <p className="text-xl md:text-2xl text-white/90 animate-fade-up delay-100">
          Join thousands of people attending the most exciting events in your area
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-200">
          <Button 
            size="lg" 
            variant="default" 
            className="bg-success hover:bg-success/90 transform hover:scale-105 transition-all duration-300"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            Browse Events
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 transform hover:scale-105 transition-all duration-300"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};