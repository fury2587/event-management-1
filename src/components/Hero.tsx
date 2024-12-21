import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-4">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 text-center space-y-6 animate-fade-down">
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover Amazing Events
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Join thousands of people attending the most exciting events in your area
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="default" className="bg-success hover:bg-success/90">
            Browse Events
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};