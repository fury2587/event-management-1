import { useQuery } from "@tanstack/react-query";
import { databases, DATABASE_ID, COLLECTIONS, Achievement, UserPoints } from "@/lib/appwrite";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award } from "lucide-react";

export const UserAchievements = () => {
  const { user } = useAuth();

  const { data: achievements } = useQuery({
    queryKey: ['achievements', user?.$id],
    queryFn: async () => {
      if (!user) return [];
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ACHIEVEMENTS,
        []
      );
      return response.documents.map(doc => ({
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        icon: doc.icon,
        points: doc.points
      })) as Achievement[];
    },
    enabled: !!user
  });

  const { data: userPoints } = useQuery({
    queryKey: ['userPoints', user?.$id],
    queryFn: async () => {
      if (!user) return null;
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USER_POINTS,
        [`userId=${user.$id}`]
      );
      const doc = response.documents[0];
      return {
        total: doc.total,
        level: doc.level,
        nextLevelPoints: doc.nextLevelPoints
      } as UserPoints;
    },
    enabled: !!user
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Level {userPoints?.level || 1}
          </CardTitle>
          <CardDescription>
            {userPoints?.total || 0} total points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next level</span>
              <span>{userPoints?.nextLevelPoints || 100} points needed</span>
            </div>
            <Progress value={((userPoints?.total || 0) / (userPoints?.nextLevelPoints || 100)) * 100} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements?.map((achievement) => (
          <Card key={achievement.id} className="relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                {achievement.name}
              </CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                +{achievement.points} points
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};