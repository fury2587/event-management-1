import { Hero } from "@/components/Hero";
import { FeaturedEvents } from "@/components/FeaturedEvents";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Hero />
      {!user ? (
        <div className="py-16 px-4">
          <AuthForm />
        </div>
      ) : (
        <FeaturedEvents />
      )}
    </div>
  );
};

export default Index;