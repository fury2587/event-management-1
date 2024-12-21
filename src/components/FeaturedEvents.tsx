import { useState } from "react";
import { EventCard } from "./EventCard";
import { useToast } from "@/components/ui/use-toast";
import { CategoryFilter } from "./CategoryFilter";
import { useAuth } from "@/contexts/AuthContext";

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
    waitlist: [],
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
    waitlist: [],
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
    waitlist: [],
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
    waitlist: [],
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
    waitlist: [],
  }
];

const CATEGORIES = Array.from(new Set(SAMPLE_EVENTS.map(event => event.category)));

export const FeaturedEvents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [events, setEvents] = useState(SAMPLE_EVENTS.map(event => ({
    ...event,
    registeredUsers: [],
    waitlistUsers: []
  })));

  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  const handleEventClick = (id: number) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to register for events.",
        variant: "destructive",
      });
      return;
    }

    const event = events.find(e => e.id === id);
    if (!event) return;

    // Check if user is already registered
    if (event.registeredUsers.includes(user.$id)) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this event.",
        variant: "default",
      });
      return;
    }

    if (event.registered >= event.capacity) {
      // Add to waitlist
      const updatedEvents = events.map(e => {
        if (e.id === id) {
          return {
            ...e,
            waitlistUsers: [...e.waitlistUsers, user.$id]
          };
        }
        return e;
      });
      setEvents(updatedEvents);
      
      toast({
        title: "Added to Waitlist",
        description: "You'll be notified if a spot becomes available.",
        variant: "default",
      });
    } else {
      // Register for event
      const updatedEvents = events.map(e => {
        if (e.id === id) {
          return {
            ...e,
            registered: e.registered + 1,
            registeredUsers: [...e.registeredUsers, user.$id]
          };
        }
        return e;
      });
      setEvents(updatedEvents);
      
      toast({
        title: "Registration Successful!",
        description: "You have been registered for the event.",
        variant: "default",
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
              capacity={event.capacity}
              registered={event.registered}
              isRegistered={user ? event.registeredUsers.includes(user.$id) : false}
              onClick={() => handleEventClick(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};