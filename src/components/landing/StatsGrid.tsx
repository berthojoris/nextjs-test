import { Users, Activity, Globe, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";

const stats = [
  { icon: Users, label: "Active Users", value: "2.4K", change: "+12%" },
  { icon: Activity, label: "Performance", value: "99.9%", change: "+0.1%" },
  { icon: Globe, label: "Global Reach", value: "45+", change: "+5" },
  { icon: TrendingUp, label: "Growth Rate", value: "23%", change: "+8%" }
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          change={stat.change}
        />
      ))}
    </div>
  )
}