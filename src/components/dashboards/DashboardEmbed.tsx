import { useState } from "react";
import { Loader2, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardEmbedProps {
  embedUrl: string;
  title: string;
  type: "looker" | "tableau" | "powerbi" | "custom";
  className?: string;
}

export const DashboardEmbed = ({
  embedUrl,
  title,
  type,
  className,
}: DashboardEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (hasError) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-12 bg-secondary/50 rounded-xl border border-border", className)}>
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">שגיאה בטעינת הדשבורד</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          לא ניתן לטעון את הדשבורד כרגע. אנא נסה שוב מאוחר יותר או פנה לתמיכה.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setHasError(false);
            setIsLoading(true);
          }}
        >
          נסה שוב
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-border bg-card shadow-card",
        isFullscreen && "fixed inset-4 z-50",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-2 w-2 rounded-full",
            isLoading ? "bg-amber-400 animate-pulse" : "bg-green-500"
          )} />
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary">
            {type.toUpperCase()}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="text-muted-foreground hover:text-foreground"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 top-12 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">טוען דשבורד...</p>
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <div className={cn("w-full", isFullscreen ? "h-[calc(100%-48px)]" : "h-[600px]")}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen"
          loading="lazy"
        />
      </div>

      {/* Fullscreen Overlay Background */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
          onClick={toggleFullscreen}
        />
      )}
    </div>
  );
};
