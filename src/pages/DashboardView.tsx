import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Calendar, Tag, Share2, Download, ExternalLink } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardEmbed } from "@/components/dashboards/DashboardEmbed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboards } from "@/data/dashboards";

const DashboardView = () => {
  const { id } = useParams<{ id: string }>();
  const dashboard = dashboards.find((d) => d.id === id);

  if (!dashboard) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">דשבורד לא נמצא</h1>
          <p className="text-muted-foreground mb-6">הדשבורד המבוקש אינו קיים או הוסר.</p>
          <Button asChild>
            <Link to="/dashboards">חזרה לרשימת הדשבורדים</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: dashboard.title,
        text: dashboard.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: Add toast notification
    }
  };

  return (
    <>
      <Helmet>
        <title>{dashboard.title} | דשבורדים | אמון</title>
        <meta name="description" content={dashboard.description} />
      </Helmet>
      <MainLayout>
        {/* Header */}
        <section className="py-8 bg-secondary/30 border-b border-border">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">ראשי</Link>
              <span>/</span>
              <Link to="/dashboards" className="hover:text-primary transition-colors">דשבורדים</Link>
              <span>/</span>
              <span className="text-foreground">{dashboard.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div>
                {/* Back Link */}
                <Link
                  to="/dashboards"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה לכל הדשבורדים
                </Link>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {dashboard.title}
                </h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground max-w-2xl mb-4">
                  {dashboard.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    {dashboard.category}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    עודכן: {dashboard.lastUpdated}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {dashboard.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 ml-2" />
                  שתף
                </Button>
                {dashboard.embedUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={dashboard.embedUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 ml-2" />
                      פתח במקור
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Embed */}
        <section className="py-8">
          <div className="container">
            {dashboard.embedUrl && dashboard.embedType ? (
              <DashboardEmbed
                embedUrl={dashboard.embedUrl}
                title={dashboard.title}
                type={dashboard.embedType}
                className="min-h-[600px]"
              />
            ) : (
              <div className="flex items-center justify-center h-[600px] bg-secondary/30 rounded-xl border border-border">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    דשבורד זה אינו מוגדר להטמעה
                  </h3>
                  <p className="text-muted-foreground">
                    אנא צרו קשר עם מנהל המערכת לקבלת גישה
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default DashboardView;
