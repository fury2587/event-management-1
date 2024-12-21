import { useState } from "react";
import { EventCard } from "./EventCard";
import { useToast } from "@/components/ui/use-toast";
import { CategoryFilter } from "./CategoryFilter";

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "March 15, 2024",
    location: "San Francisco, CA",
    imageUrl: "/placeholder.svg",
    category: "Technology",
    capacity: 500,
    registered: 450,
  },
  {
    id: 2,
    title: "Summer Music Festival",
    date: "April 20, 2024",
    location: "Austin, TX",
    imageUrl: "/placeholder.svg",
    category: "Music",
    capacity: 1000,
    registered: 750,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "May 5, 2024",
    location: "New York, NY",
    imageUrl: "/placeholder.svg",
    category: "Food",
    capacity: 300,
    registered: 290,
  },
  {
    id: 4,
    title: "Digital Marketing Workshop",
    date: "March 25, 2024",
    location: "Chicago, IL",
    imageUrl: "/placeholder.svg",
    category: "Workshop",
    capacity: 50,
    registered: 45,
  },
  {
    id: 5,
    title: "Startup Networking Event",
    date: "April 10, 2024",
    location: "Boston, MA",
    imageUrl: "/placeholder.svg",
    category: "Business",
    capacity: 200,
    registered: 180,
  }
];

const CATEGORIES = Array.from(new Set(SAMPLE_EVENTS.map(event => event.category)));

export const FeaturedEvents = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = selectedCategory
    ? SAMPLE_EVENTS.filter(event => event.category === selectedCategory)
    : SAMPLE_EVENTS;

  const handleEventClick = (id: number) => {
    const event = SAMPLE_EVENTS.find(e => e.id === id);
    if (event && event.registered >= event.capacity) {
      toast({
        title: "Event is Full",
        description: "This event has reached its capacity. Would you like to join the waitlist?",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Coming Soon!",
        description: "Event registration will be implemented in the next update.",
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
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