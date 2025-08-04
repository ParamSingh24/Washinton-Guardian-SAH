import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  TrendingUp,
  Clock,
  User,
  ArrowRight,
  Stethoscope,
  Brain,
  Shield,
  Zap,
  Microscope,
  Activity
} from 'lucide-react';

const healthNews = [
  {
    id: 1,
    title: "Revolutionary AI Breakthrough in Cancer Detection",
    excerpt: "New AI system achieves 95% accuracy in early-stage cancer detection through advanced imaging analysis.",
    category: "Research",
    readTime: "5 min read",
    author: "Dr. Sarah Chen",
    publishedAt: "2 hours ago",
    image: "🔬",
    trending: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Telemedicine Usage Surges by 300% This Year",
    excerpt: "Digital healthcare adoption accelerates as patients embrace remote consultations and AI-powered diagnostics.",
    category: "Technology",
    readTime: "3 min read",
    author: "Dr. Michael Rodriguez",
    publishedAt: "4 hours ago",
    image: "💻",
    trending: true,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Mental Health AI: New Therapy Breakthrough",
    excerpt: "AI-powered mental health platforms show 80% improvement in patient outcomes with personalized treatment plans.",
    category: "Mental Health",
    readTime: "4 min read",
    author: "Dr. Emily Watson",
    publishedAt: "6 hours ago",
    image: "🧠",
    trending: false,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Smart Wearables Predict Heart Disease Risk",
    excerpt: "Advanced wearable technology now capable of predicting cardiovascular events up to 6 months in advance.",
    category: "Cardiology",
    readTime: "6 min read",
    author: "Dr. James Kumar",
    publishedAt: "8 hours ago",
    image: "❤️",
    trending: false,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 5,
    title: "Gene Therapy Shows Promise for Rare Diseases",
    excerpt: "Clinical trials demonstrate remarkable success rates in treating previously incurable genetic conditions.",
    category: "Genetics",
    readTime: "7 min read",
    author: "Dr. Lisa Zhang",
    publishedAt: "1 day ago",
    image: "🧬",
    trending: false,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "Precision Medicine: Tailored Treatments Revolution",
    excerpt: "Personalized medicine approaches show unprecedented success in cancer treatment and chronic disease management.",
    category: "Precision Medicine",
    readTime: "5 min read",
    author: "Dr. Robert Kim",
    publishedAt: "1 day ago",
    image: "🎯",
    trending: false,
    color: "from-teal-500 to-blue-500"
  }
];

const HealthNewsSection = () => {
  const featuredArticle = healthNews[0];
  const otherArticles = healthNews.slice(1);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Health News & Research
            </h2>
            <p className="text-gray-600 mt-1">Latest breakthroughs in healthcare and medical technology</p>
          </div>
        </div>
        <Button variant="outline" className="hidden sm:flex items-center gap-2 hover:bg-blue-50 border-blue-200">
          View all articles
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Featured Article */}
      <Card className="group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-white to-blue-50/50">
        <div className={`absolute inset-0 bg-gradient-to-br ${featuredArticle.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <CardContent className="relative p-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{featuredArticle.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`bg-gradient-to-r ${featuredArticle.color} text-white border-0 px-3 py-1`}>
                  Featured
                </Badge>
                {featuredArticle.trending && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
                <Badge variant="outline" className="text-gray-600">
                  {featuredArticle.category}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredArticle.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredArticle.publishedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {featuredArticle.readTime}
                  </div>
                </div>
                <Button className={`bg-gradient-to-r ${featuredArticle.color} hover:shadow-lg transition-all duration-300`}>
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherArticles.map((article) => (
          <Card
            key={article.id}
            className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <CardHeader className="relative pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{article.image}</div>
                {article.trending && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                {article.category}
              </Badge>
            </CardHeader>
            <CardContent className="relative">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {article.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.publishedAt}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {article.readTime}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="sm:hidden flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          View all articles
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HealthNewsSection;
