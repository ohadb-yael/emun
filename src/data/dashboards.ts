export interface Dashboard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: "bar" | "pie" | "trend" | "users";
  tags: string[];
  lastUpdated: string;
  embedUrl?: string;
  embedType?: "looker" | "tableau" | "powerbi" | "custom";
  isPublic: boolean;
}

export const dashboards: Dashboard[] = [
  {
    id: "economy-overview",
    title: "סקירה כלכלית",
    description: "מדדים כלכליים מרכזיים, נתוני תוצר, אינפלציה ושוק העבודה בזמן אמת. הדשבורד מציג תמונת מצב עדכנית של המשק הישראלי.",
    category: "כלכלה",
    icon: "trend",
    tags: ["תוצר", "תעסוקה", "אינפלציה", "מדדים"],
    lastUpdated: "היום",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-economy",
    embedType: "looker",
    isPublic: true,
  },
  {
    id: "population-stats",
    title: "נתוני אוכלוסייה",
    description: "סטטיסטיקות דמוגרפיות מקיפות הכוללות פילוח גילאים, תנועות אוכלוסין, ופריסה גיאוגרפית של תושבי המדינה.",
    category: "דמוגרפיה",
    icon: "users",
    tags: ["אוכלוסייה", "גילאים", "ערים", "דמוגרפיה"],
    lastUpdated: "אתמול",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-population",
    embedType: "looker",
    isPublic: true,
  },
  {
    id: "budget-transparency",
    title: "שקיפות תקציבית",
    description: "תקציב המדינה, הוצאות ממשלתיות והקצאות לפי משרדים. מעקב אחר ניצול תקציבים והשוואה בין שנים.",
    category: "תקציב",
    icon: "pie",
    tags: ["תקציב", "הוצאות", "משרדים", "כספים"],
    lastUpdated: "השבוע",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-budget",
    embedType: "looker",
    isPublic: true,
  },
  {
    id: "infrastructure",
    title: "פרויקטי תשתית",
    description: "מעקב מקיף אחר פרויקטי תשתית לאומיים, כולל סטטוס ביצוע, אבני דרך ותקציבים מול ביצוע בפועל.",
    category: "תשתיות",
    icon: "bar",
    tags: ["תשתיות", "פרויקטים", "התקדמות", "בנייה"],
    lastUpdated: "היום",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-infra",
    embedType: "looker",
    isPublic: true,
  },
  {
    id: "education-metrics",
    title: "מדדי חינוך",
    description: "נתוני מערכת החינוך, הישגים לימודיים, שיעורי הזכאות לבגרות ופערים בין אזורים שונים.",
    category: "חינוך",
    icon: "bar",
    tags: ["חינוך", "בגרויות", "תלמידים", "בתי ספר"],
    lastUpdated: "החודש",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-education",
    embedType: "looker",
    isPublic: true,
  },
  {
    id: "health-indicators",
    title: "מדדי בריאות",
    description: "נתוני בריאות הציבור, שירותי רפואה, זמני המתנה ופריסה גיאוגרפית של שירותי הבריאות.",
    category: "בריאות",
    icon: "trend",
    tags: ["בריאות", "רפואה", "בתי חולים", "שירותים"],
    lastUpdated: "היום",
    embedUrl: "https://lookerstudio.google.com/embed/reporting/example-health",
    embedType: "looker",
    isPublic: true,
  },
];

export const categories = [
  "הכל",
  "כלכלה",
  "דמוגרפיה",
  "תקציב",
  "תשתיות",
  "חינוך",
  "בריאות",
];
