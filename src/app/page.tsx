import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Rocket, 
  Code2, 
  Palette, 
  Globe,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

/**
 * Modern dashboard homepage with enhanced UI design
 * Features: Hero section, feature cards, stats, and call-to-action
 */
export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Next.js 15 and optimized for performance",
      badge: "Fast"
    },
    {
      icon: Shield,
      title: "Type Safe",
      description: "Full TypeScript support with strict type checking",
      badge: "Secure"
    },
    {
      icon: Palette,
      title: "Modern UI",
      description: "Beautiful components with Shadcn UI and Tailwind CSS",
      badge: "Design"
    },
    {
      icon: Code2,
      title: "Developer Ready",
      description: "Pre-configured with best practices and tools",
      badge: "DX"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "2.4K", change: "+12%" },
    { icon: Activity, label: "Performance", value: "99.9%", change: "+0.1%" },
    { icon: Globe, label: "Global Reach", value: "45+", change: "+5" },
    { icon: TrendingUp, label: "Growth Rate", value: "23%", change: "+8%" }
  ];

  return (
    <div className="container max-w-screen-2xl space-y-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="px-3 py-1">
              <Rocket className="w-3 h-3 mr-1" />
              Next.js v15
            </Badge>
            <Badge variant="outline">TypeScript</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
            Welcome to NextForge
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A modern Next.js template with beautiful UI components, type safety, and developer experience in mind. 
            Start building amazing applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern web applications with confidence and speed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">
            Explore the different rendering patterns and see how Next.js v15 can power your applications.
          </p>
          <Button size="lg" className="group">
            Explore Patterns
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
