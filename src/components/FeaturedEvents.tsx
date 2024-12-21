import { EventCard } from "./EventCard";
import { useToast } from "@/components/ui/use-toast";

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "March 15, 2024",
    location: "San Francisco, CA",
    imageUrl: "/placeholder.svg",
    category: "Technology"
  },
  {
    id: 2,
    title: "Music Festival",
    date: "April 20, 2024",
    location: "Austin, TX",
    imageUrl: "/placeholder.svg",
    category: "Music"
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "May 5, 2024",
    location: "New York, NY",
    imageUrl: "/placeholder.svg",
    category: "Food"
  }
];

export const FeaturedEvents = () => {
  const { toast } = useToast();

  const handleEventClick = (id: number) => {
    toast({
      title: "Coming Soon!",
      description: "Event details page will be implemented in the next update.",
    });
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              imageUrl={event.imageUrl}
              category={event.category}
              onClick={() => handleEventClick(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};