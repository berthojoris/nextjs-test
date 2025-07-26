import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 p-8 md:p-12 transition-all duration-300 hover:-translate-y-1">
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
  );
}