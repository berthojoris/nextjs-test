import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  BarChart3
} from "lucide-react";

/**
 * Modern dashboard page showcasing advanced UI components and layouts
 * Features: Metrics cards, activity feed, progress indicators, and user avatars
 */
export default function Dashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
      description: "from last month"
    },
    {
      title: "Performance",
      value: "98.5%",
      change: "+2.5%",
      trend: "up",
      icon: Activity,
      description: "uptime this month"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.4%",
      trend: "down",
      icon: TrendingUp,
      description: "from last week"
    }
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "Created new project",
      time: "2 minutes ago",
      status: "success",
      avatar: "JD"
    },
    {
      user: "Sarah Wilson",
      action: "Updated dashboard settings",
      time: "5 minutes ago",
      status: "info",
      avatar: "SW"
    },
    {
      user: "Mike Johnson",
      action: "Deployed to production",
      time: "10 minutes ago",
      status: "success",
      avatar: "MJ"
    },
    {
      user: "Emma Davis",
      action: "Reported an issue",
      time: "15 minutes ago",
      status: "warning",
      avatar: "ED"
    }
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      progress: 85,
      status: "In Progress",
      dueDate: "Dec 15, 2024",
      team: 4
    },
    {
      name: "Mobile App Redesign",
      progress: 60,
      status: "In Progress",
      dueDate: "Jan 20, 2025",
      team: 3
    },
    {
      name: "API Documentation",
      progress: 100,
      status: "Completed",
      dueDate: "Nov 30, 2024",
      team: 2
    }
  ];

  return (
    <div className="container max-w-screen-2xl space-y-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendIcon className={`h-3 w-3 ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`} />
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {metric.change}
                  </span>
                  <span>{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your team and projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const StatusIcon = activity.status === "success" ? CheckCircle : 
                               activity.status === "warning" ? AlertCircle : Activity;
              
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <Avatar className="h-10 w-10">
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-medium text-sm">
                      {activity.avatar}
                    </div>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <StatusIcon className={`h-3 w-3 ${
                        activity.status === "success" ? "text-green-500" :
                        activity.status === "warning" ? "text-yellow-500" :
                        "text-blue-500"
                      }`} />
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Projects
            </CardTitle>
            <CardDescription>
              Current project status and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {project.team} members
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progress}%</p>
                    <p className="text-xs text-muted-foreground">{project.dueDate}</p>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to create something amazing?</h3>
              <p className="text-sm text-muted-foreground">
                Start a new project or explore our advanced features to boost your productivity.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Browse Templates
              </Button>
              <Button>
                New Project
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}