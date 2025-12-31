import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboards/DashboardCard";

// Mock data - will be replaced with real data later
const featuredDashboards = [
  {
    id: "economy-overview",
    title: "סקירה כלכלית",
    description: "מדדים כלכליים מרכזיים, נתוני תוצר, אינפלציה ושוק העבודה בזמן אמת.",
    category: "כלכלה",
    icon: "trend" as const,
    tags: ["תוצר", "תעסוקה", "אינפלציה"],
    lastUpdated: "היום",
  },
  {
    id: "population-stats",
    title: "נתוני אוכלוסייה",
    description: "סטטיסטיקות דמוגרפיות, פילוח גילאים ותנועות אוכלוסין.",
    category: "דמוגרפיה",
    icon: "users" as const,
    tags: ["אוכלוסייה", "גילאים", "ערים"],
    lastUpdated: "אתמול",
  },
  {
    id: "budget-transparency",
    title: "שקיפות תקציבית",
    description: "תקציב המדינה, הוצאות ממשלתיות והקצאות לפי משרדים.",
    category: "תקציב",
    icon: "pie" as const,
    tags: ["תקציב", "הוצאות", "משרדים"],
    lastUpdated: "השבוע",
  },
  {
    id: "infrastructure",
    title: "פרויקטי תשתית",
    description: "מעקב אחר פרויקטי תשתית לאומיים, סטטוס ביצוע ותקציבים.",
    category: "תשתיות",
    icon: "bar" as const,
    tags: ["תשתיות", "פרויקטים", "התקדמות"],
    lastUpdated: "היום",
  },
];

export const FeaturedDashboards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              דשבורדים מובילים
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              גלו את הדשבורדים הפופולריים ביותר המציגים נתונים חיוניים לציבור
            </p>
          </div>
          <Button variant="outline" asChild className="group">
            <Link to="/dashboards">
              כל הדשבורדים
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDashboards.map((dashboard, index) => (
            <div
              key={dashboard.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DashboardCard {...dashboard} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
