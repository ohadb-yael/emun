import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import { Database, Download, ChevronDown, ChevronUp, FileSpreadsheet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface DataItem {
  id: number;
  name: string;
  type: string;
  classification: string;
  owner: string;
  department: string;
  tags: string[];
  size: string;
  qualityScore: number;
  lastUpdate: string;
  rowCount: string;
  description: string;
}

const MOCK_DATA_CATALOG: DataItem[] = [
  {
    id: 1,
    name: "נתוני מכירות Q3",
    type: "Excel",
    classification: "סודי ביותר",
    owner: "מחלקת כספים",
    department: "finance",
    tags: ["כספים", "2024"],
    size: "4.2 MB",
    qualityScore: 98,
    lastUpdate: "10/05/2024",
    rowCount: "14,500",
    description: "פירוט עסקאות רבעוני כולל מע״מ וזיכויים.",
  },
  {
    id: 2,
    name: "רשימת עובדים פעילים",
    type: "SQL View",
    classification: "פנימי",
    owner: "משאבי אנוש",
    department: "hr",
    tags: ["HR", "עובדים"],
    size: "Query",
    qualityScore: 100,
    lastUpdate: "היום",
    rowCount: "1,240",
    description: "מבט על עובדים פעילים.",
  },
  {
    id: 3,
    name: "קטלוג מוצרים ציבורי",
    type: "JSON API",
    classification: "ציבורי",
    owner: "שיווק",
    department: "marketing",
    tags: ["API", "מוצרים"],
    size: "Live",
    qualityScore: 92,
    lastUpdate: "אוטומטי",
    rowCount: "N/A",
    description: "ממשק פתוח לשימוש באתר האיקומרס.",
  },
  {
    id: 4,
    name: "לוגים של שרתים",
    type: "Elastic",
    classification: "סודי",
    owner: "IT",
    department: "it",
    tags: ["Logs", "Security"],
    size: "250 GB",
    qualityScore: 85,
    lastUpdate: "בזמן אמת",
    rowCount: "~50M",
    description: "לוגי תעבורה ושגיאות.",
  },
];

const DataCatalog = () => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = MOCK_DATA_CATALOG.filter((i) =>
    i.name.includes(search)
  );

  return (
    <>
      <Helmet>
        <title>קטלוג דאטה - מערכת אמו"ן</title>
      </Helmet>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database className="text-blue-600" /> קטלוג דאטה
          </h2>
          <Input
            className="w-full p-3 border rounded-xl mb-6 shadow-sm"
            placeholder="חיפוש במאגר..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Card className="rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
                <tr>
                  <th className="p-4 w-10"></th>
                  <th className="p-4">שם המאגר</th>
                  <th className="p-4">סיווג</th>
                  <th className="p-4">מחלקה</th>
                  <th className="p-4">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tbody key={item.id}>
                    <tr
                      onClick={() =>
                        setExpanded(expanded === item.id ? null : item.id)
                      }
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                    >
                      <td className="p-4 text-slate-400">
                        {expanded === item.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </td>
                      <td className="p-4 font-bold text-slate-700 flex items-center gap-2">
                        <FileSpreadsheet
                          size={16}
                          className="text-green-600"
                        />
                        {item.name}
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {item.classification}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{item.department}</td>
                      <td className="p-4">
                        <button className="text-blue-600 text-sm hover:underline flex gap-1 items-center">
                          <Download size={14} /> הורד
                        </button>
                      </td>
                    </tr>
                    {expanded === item.id && (
                      <tr className="bg-slate-50">
                        <td colSpan={5} className="p-4 text-sm text-slate-600">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <strong>תיאור:</strong> {item.description}
                            </div>
                            <div>
                              <strong>גודל:</strong> {item.size} •{" "}
                              <strong>עודכן:</strong> {item.lastUpdate}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

export default DataCatalog;
