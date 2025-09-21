import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConditionBoxProps {
  title: string;
  icon: ReactNode;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical" | "safe" | "caution" | "danger" | "abundant" | "moderate" | "scarce" | "up" | "stable" | "down";
  description: string;
  trend?: "up" | "down" | "stable";
  benchmark?: number;
  className?: string;
  children?: ReactNode;
}

const statusColors = {
  healthy: "bg-soil-healthy text-white",
  warning: "bg-soil-warning text-foreground",
  critical: "bg-soil-critical text-white",
  safe: "bg-pest-safe text-white",
  caution: "bg-pest-caution text-foreground",
  danger: "bg-pest-danger text-white",
  abundant: "bg-water-abundant text-white",
  moderate: "bg-water-moderate text-white",
  scarce: "bg-water-scarce text-white",
  up: "bg-market-up text-white",
  stable: "bg-market-stable text-white",
  down: "bg-market-down text-white",
};

const ConditionBox = ({ 
  title, 
  icon, 
  value, 
  unit, 
  status, 
  description, 
  trend, 
  benchmark, 
  className,
  children 
}: ConditionBoxProps) => {
  const getProgressColor = () => {
    switch (status) {
      case "healthy":
      case "safe":
      case "abundant":
      case "up":
        return "bg-primary";
      case "warning":
      case "caution":
      case "moderate":
      case "stable":
        return "bg-accent";
      case "critical":
      case "danger":
      case "scarce":
      case "down":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "➡️";
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg hover:scale-105", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <Badge className={statusColors[status]} variant="outline">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-lg text-muted-foreground">{unit}</span>
          {trend && (
            <span className="text-sm">{getTrendIcon()}</span>
          )}
        </div>
        
        {benchmark && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current</span>
              <span>Benchmark: {benchmark}{unit}</span>
            </div>
            <Progress 
              value={Math.min((value / benchmark) * 100, 100)} 
              className="h-2"
            />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {children}
      </CardContent>
    </Card>
  );
};

export default ConditionBox;