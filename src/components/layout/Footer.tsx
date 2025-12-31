import { Link } from "react-router-dom";
import { BarChart3, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">אמון</span>
                <span className="text-xs text-muted-foreground -mt-1">פלטפורמת נתונים</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              פלטפורמה מרכזית לצפייה בדשבורדים וניתוח נתונים עבור הציבור הרחב וגורמים מורשים.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">קישורים מהירים</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/dashboards" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                דשבורדים ציבוריים
              </Link>
              <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                קטלוג דאטה
              </Link>
              <Link to="/authorized" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                אזור אישי
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                אודות
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">תכונות</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/supplier" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                פורטל ספקים
              </Link>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ניהול מערכת
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                API Documentation
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">יצירת קשר</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@emun.gov.il" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                contact@emun.gov.il
              </a>
              <a href="tel:+972-2-123-4567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                02-123-4567
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                ירושלים, ישראל
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} אמון - פלטפורמת נתונים. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};
