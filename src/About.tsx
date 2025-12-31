import { Helmet } from "react-helmet-async";
import { Shield, Eye, Users, Lock, CheckCircle2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Eye,
    title: "שקיפות",
    description: "הנגשת מידע ציבורי בצורה ברורה ונגישה לכל אזרח",
  },
  {
    icon: Shield,
    title: "אמינות",
    description: "נתונים מבוססים ומאומתים ממקורות רשמיים",
  },
  {
    icon: Users,
    title: "נגישות",
    description: "עיצוב מותאם לכל המשתמשים, כולל תמיכה מלאה בנגישות",
  },
  {
    icon: Lock,
    title: "אבטחה",
    description: "הגנה מקסימלית על המידע ופרטיות המשתמשים",
  },
];

const features = [
  "דשבורדים אינטראקטיביים בזמן אמת",
  "חיפוש וסינון מתקדם",
  "הורדת נתונים בפורמטים שונים",
  "תמיכה במגוון מערכות BI",
  "גישה מאובטחת למורשים",
  "ממשק משתמש בעברית מלאה",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>אודות | אמון - פלטפורמת נתונים</title>
        <meta name="description" content="למדו על פלטפורמת אמון - הפלטפורמה הממשלתית המרכזית לשקיפות מידע ודשבורדים." />
      </Helmet>
      <MainLayout>
        {/* Hero */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                אודות פלטפורמת אמון
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                פלטפורמה ממשלתית מרכזית להנגשת מידע ודשבורדים לציבור הרחב, מקבלי החלטות וגורמים מורשים
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  המשימה שלנו
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  פלטפורמת "אמון" נוצרה במטרה להנגיש מידע ציבורי בצורה ברורה, נגישה ואמינה. אנו מאמינים כי שקיפות מידע היא יסוד לממשל טוב ומשתפת את הציבור בהבנת המציאות.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  באמצעות דשבורדים אינטראקטיביים מתקדמים, אנו מאפשרים לכל אזרח לצפות, להבין ולנתח נתונים ממשלתיים בקלות וללא צורך בידע טכני מוקדם.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <Card key={index} className="gradient-card border-border/50 shadow-soft hover:shadow-card transition-all">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                יכולות הפלטפורמה
              </h2>
              <p className="text-lg text-muted-foreground">
                מגוון כלים ויכולות מתקדמות להנגשת מידע
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-soft"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default About;
