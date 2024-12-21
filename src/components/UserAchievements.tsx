import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Share2, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

interface UserPoints {
  total: number;
  level: number;
  nextLevelPoints: number;
}

export const UserAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userPoints, setUserPoints] = useState<UserPoints>({
    total: 0,
    level: 1,
    nextLevelPoints: 100
  });

  useEffect(() => {
    if (user) {
      fetchUserAchievements();
      fetchUserPoints();
    }
  }, [user]);

  const fetchUserAchievements = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ACHIEVEMENTS,
        [/* Add your queries here */]
      );
      setAchievements(response.documents as Achievement[]);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USER_POINTS,
        user?.$id || ''
      );
      setUserPoints(response as UserPoints);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const getProgressToNextLevel = () => {
    return (userPoints.total / userPoints.nextLevelPoints) * 100;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Points & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{userPoints.total} Points</p>
                <p className="text-sm text-muted-foreground">Level {userPoints.level}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Rank: {userPoints.level}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {userPoints.level + 1}</span>
                <span>{userPoints.total}/{userPoints.nextLevelPoints}</span>
              </div>
              <Progress value={getProgressToNextLevel()} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="group hover:shadow-lg transition-all">
            <CardContent className="p-4 flex items-center gap-4">
              {achievement.icon === 'star' && <Star className="h-8 w-8 text-yellow-500" />}
              {achievement.icon === 'share' && <Share2 className="h-8 w-8 text-blue-500" />}
              {achievement.icon === 'book' && <BookOpen className="h-8 w-8 text-green-500" />}
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {achievement.name}
                </h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-sm font-medium text-primary mt-1">+{achievement.points} points</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};