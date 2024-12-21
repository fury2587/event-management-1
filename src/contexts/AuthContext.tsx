import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { account, createOAuthSession, databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { useToast } from "@/components/ui/use-toast";
import { ID, Models } from 'appwrite';

interface AuthContextType {
  user: (Models.User<Models.Preferences> & { profile?: UserProfile }) | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<(Models.User<Models.Preferences> & { profile?: UserProfile }) | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USER_PROFILES,
        [
          `userId=${userId}`
        ]
      );
      const document = response.documents[0];
      if (!document) return null;
      
      return {
        id: document.$id,
        userId: document.userId,
        name: document.name,
        email: document.email,
        points: document.points,
        achievements: document.achievements,
        avatar: document.avatar,
        bio: document.bio
      } as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const createUserProfile = async (userId: string, name: string, email: string) => {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USER_PROFILES,
        ID.unique(),
        {
          userId,
          name,
          email,
          points: 0,
          achievements: []
        }
      );
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.get();
      if (session) {
        const profile = await fetchUserProfile(session.$id);
        setUser({ ...session, profile });
      }
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
      const newUser = await account.create(ID.unique(), email, password, name);
      await createUserProfile(newUser.$id, name, email);
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
      await createOAuthSession();
      await checkUser();
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