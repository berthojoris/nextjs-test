import { Code2, Palette, Shield, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

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

export function FeaturesGrid() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Powerful Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build modern web applications with confidence and speed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            badge={feature.badge}
          />
        ))}
      </div>
    </div>
  )
}