import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

export function FeatureCard({ icon: Icon, title, description, badge }: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}