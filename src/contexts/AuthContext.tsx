import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { account } from '@/lib/appwrite';
import { useToast } from "@/components/ui/use-toast";

interface User {
  $id: string;
  name: string;
  email: string;
  profilePic?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      await checkUser();
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await account.create('unique()', email, password, name);
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      toast({
        title: "Success",
        description: "Successfully signed out!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      account.createOAuth2Session('google', 
        'http://localhost:5173/auth-callback', // Success URL
        'http://localhost:5173/auth-callback', // Failure URL
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
