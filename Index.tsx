import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Trophy, Zap, ArrowUp, ArrowDown, Check, Bell, Search, Plus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [notifications] = useState(3);
  const { toast } = useToast();

  const handleAskQuestion = () => {
    toast({
      title: "Ask Question",
      description: "Question form would open here. Feature coming soon!",
    });
  };

  const handleSignUp = () => {
    toast({
      title: "Sign Up",
      description: "Registration form would open here. Feature coming soon!",
    });
  };

  const handleSignIn = () => {
    toast({
      title: "Sign In",
      description: "Login form would open here. Feature coming soon!",
    });
  };

  const handleLearnMore = () => {
    toast({
      title: "Learn More",
      description: "Additional information would be displayed here.",
    });
  };

  // Mock data for demonstration
  const featuredQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      description: "I'm trying to implement JWT authentication in my React application but I'm running into some issues with token storage and validation...",
      author: "john_doe",
      authorAvatar: "JD",
      votes: 24,
      answers: 5,
      tags: ["React", "JWT", "Authentication"],
      timeAgo: "2 hours ago",
      isAccepted: true
    },
    {
      id: 2,
      title: "Best practices for React component optimization",
      description: "What are the most effective ways to optimize React components for better performance? I'm particularly interested in memo, useMemo, and useCallback...",
      author: "sarah_dev",
      authorAvatar: "SD",
      votes: 18,
      answers: 3,
      tags: ["React", "Performance", "Optimization"],
      timeAgo: "4 hours ago",
      isAccepted: false
    },
    {
      id: 3,
      title: "TypeScript generic constraints explained",
      description: "Can someone explain how generic constraints work in TypeScript with practical examples?",
      author: "mike_ts",
      authorAvatar: "MT",
      votes: 12,
      answers: 7,
      tags: ["TypeScript", "Generics", "Types"],
      timeAgo: "1 day ago",
      isAccepted: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        notificationCount={notifications} 
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection 
          onExploreQuestions={() => toast({ title: "Explore Questions", description: "Questions page would load here." })}
          onAskQuestion={handleAskQuestion}
        />
        <StatsSection />
        
        {/* Featured Questions Section */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Questions</h2>
              <p className="text-gray-600">Discover the most engaging discussions in our community</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAskQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </div>
          
          <div className="space-y-4">
            {featuredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Start asking questions, sharing knowledge, and building your reputation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-blue-600 font-semibold" onClick={handleSignUp}>
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" onClick={handleLearnMore}>
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StackIt</h3>
              <p className="text-gray-400">A minimal Q&A platform for collaborative learning and knowledge sharing.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Questions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tags</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Users</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Ask</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StackIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
