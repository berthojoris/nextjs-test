import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
}

export function StatCard({ icon: Icon, label, value, change }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/10 rounded-lg w-fit">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {change}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}