import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsGrid } from "@/components/landing/StatsGrid";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";

/**
 * Modern dashboard homepage with enhanced UI design
 * Features: Hero section, feature cards, stats, and call-to-action
 */
export default function Home() {
  return (
    <div className="container max-w-screen-2xl space-y-8 py-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Grid */}
      <StatsGrid />

      {/* Features Grid */}
      <FeaturesGrid />

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
