import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardCard } from "@/components/dashboards/DashboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboards, categories } from "@/data/dashboards";
import { cn } from "@/lib/utils";

const Dashboards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDashboards = useMemo(() => {
    return dashboards.filter((dashboard) => {
      const matchesSearch =
        dashboard.title.includes(searchQuery) ||
        dashboard.description.includes(searchQuery) ||
        dashboard.tags.some((tag) => tag.includes(searchQuery));
      
      const matchesCategory =
        selectedCategory === "הכל" || dashboard.category === selectedCategory;

      return matchesSearch && matchesCategory && dashboard.isPublic;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>דשבורדים ציבוריים | אמון</title>
        <meta name="description" content="גלו את כל הדשבורדים הציבוריים הזמינים בפלטפורמת אמון. נתונים ממשלתיים בצורה ויזואלית ונגישה." />
      </Helmet>
      <MainLayout>
        {/* Hero */}
        <section className="py-12 bg-secondary/30 border-b border-border">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              דשבורדים ציבוריים
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              צפו בנתונים פתוחים וניתוחים ויזואליים ממגוון תחומים ממשלתיים
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="חפש דשבורד..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "whitespace-nowrap",
                      selectedCategory === category && "gradient-primary"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="תצוגת רשת"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label="תצוגת רשימה"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-10">
          <div className="container">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                נמצאו <span className="font-semibold text-foreground">{filteredDashboards.length}</span> דשבורדים
              </p>
            </div>

            {/* Dashboard Grid */}
            {filteredDashboards.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}>
                {filteredDashboards.map((dashboard, index) => (
                  <div
                    key={dashboard.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <DashboardCard {...dashboard} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  לא נמצאו דשבורדים
                </h3>
                <p className="text-muted-foreground">
                  נסו לשנות את מונחי החיפוש או לבחור קטגוריה אחרת
                </p>
              </div>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Dashboards;
