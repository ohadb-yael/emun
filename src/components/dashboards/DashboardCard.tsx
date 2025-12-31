import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: "bar" | "pie" | "trend" | "users";
  tags?: string[];
  lastUpdated?: string;
}

const iconMap = {
  bar: BarChart3,
  pie: PieChart,
  trend: TrendingUp,
  users: Users,
};

export const DashboardCard = ({
  id,
  title,
  description,
  category,
  icon = "bar",
  tags = [],
  lastUpdated,
}: DashboardCardProps) => {
  const Icon = iconMap[icon];

  return (
    <Link to={`/dashboards/${id}`} className="group block">
      <Card className="h-full gradient-card border-border/50 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Decorative top bar */}
        <div className="h-1 gradient-primary" />
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Icon className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {category}
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold text-foreground mt-4 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-border">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                עודכן: {lastUpdated}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              צפה בדשבורד
              <ArrowLeft className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
