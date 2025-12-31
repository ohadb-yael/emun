import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Database,
  Cloud,
  Shield,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Server,
  FileJson,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataStream {
  id: string;
  name: string;
  source: string;
  rowCount: number;
  status: "validating" | "ingested" | "error" | "processing";
  lastSync: string;
  format: "CSV" | "JSON" | "XML" | "GeoJSON";
}

const MOCK_DATA_STREAMS: DataStream[] = [
  {
    id: "DS-2024-001",
    name: "תפוסת מיטות בבתי חולים",
    source: "משרד הבריאות",
    rowCount: 1200000,
    status: "ingested",
    lastSync: "2025-01-31 14:30",
    format: "JSON",
  },
  {
    id: "DS-2024-002",
    name: "מסלולי תחבורה ציבורית",
    source: "משרד התחבורה",
    rowCount: 850000,
    status: "processing",
    lastSync: "2025-01-31 13:15",
    format: "GeoJSON",
  },
  {
    id: "DS-2024-003",
    name: "נתוני אוכלוסין ליישוב",
    source: "הלשכה המרכזית לסטטיסטיקה",
    rowCount: 450000,
    status: "validating",
    lastSync: "2025-01-31 12:45",
    format: "CSV",
  },
  {
    id: "DS-2024-004",
    name: "רשות עסקים פעילה",
    source: "משרד הכלכלה",
    rowCount: 2100000,
    status: "error",
    lastSync: "2025-01-30 18:20",
    format: "XML",
  },
];

const getStatusColor = (
  status: "validating" | "ingested" | "error" | "processing"
) => {
  switch (status) {
    case "ingested":
      return "bg-green-100 text-green-800 border-green-300";
    case "validating":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "error":
      return "bg-red-100 text-red-800 border-red-300";
    case "processing":
      return "bg-blue-100 text-blue-800 border-blue-300";
  }
};

const getStatusIcon = (
  status: "validating" | "ingested" | "error" | "processing"
) => {
  switch (status) {
    case "ingested":
      return <CheckCircle className="w-4 h-4" />;
    case "error":
      return <AlertCircle className="w-4 h-4" />;
    case "processing":
      return <RefreshCw className="w-4 h-4 animate-spin" />;
    case "validating":
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusLabel = (
  status: "validating" | "ingested" | "error" | "processing"
) => {
  const labels = {
    ingested: "מושלם",
    validating: "בתהליך אימות",
    error: "שגיאת סכמה",
    processing: "בעיבוד",
  };
  return labels[status];
};

const SupplierPortal = () => {
  const [dataStreams, setDataStreams] = useState<DataStream[]>(MOCK_DATA_STREAMS);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <>
      <Helmet>
        <title>פורטל ספקי נתונים - מערכת אמו"ן</title>
      </Helmet>
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white py-12" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400">
                  <Database className="h-6 w-6" />
                </div>
                <h1 className="text-4xl font-bold">
                  פורטל איגוד נתונים ממשלתי
                </h1>
              </div>
              <p className="text-blue-100 text-lg max-w-2xl">
                העלו, אשרו וניהלו במאובטח מערכי נתונים ממשלתיים במרכז איגוד הנתונים
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left: Upload Section */}
              <div className="lg:col-span-1">
                <Card className="border-2 border-dashed border-blue-300 bg-blue-50 p-8 rounded-xl h-full flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-500 transition"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    העלו מערך נתונים
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    גררו וזרקו קובץ או לחצו להעלאה
                  </p>
                  <div className="text-xs text-slate-500 mb-6">
                    <p className="font-semibold mb-2">פורמטים נתמכים:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="bg-white px-2 py-1 rounded border border-slate-300">
                        CSV
                      </span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-300">
                        JSON
                      </span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-300">
                        XML
                      </span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-300">
                        GeoJSON
                      </span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full">
                    בחר קובץ
                  </Button>
                </Card>

                {/* API Connection Status */}
                <Card className="mt-6 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-slate-900">
                      סטטוס חיבור API
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-green-700 font-medium">
                      מחובר ופעיל
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    עדכון אחרון: 2025-01-31 14:45
                  </p>
                </Card>
              </div>

              {/* Right: Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        סה"כ מערכי נתונים
                      </p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">
                        24
                      </p>
                    </div>
                    <Database className="w-8 h-8 text-blue-600 opacity-80" />
                  </div>
                  <p className="text-xs text-slate-500">
                    פעילים ביום ההנוכחי
                  </p>
                </Card>

                <Card className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        תעבורה מאומתת
                      </p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">
                        4.5M
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600 opacity-80" />
                  </div>
                  <p className="text-xs text-slate-500">
                    רשומות מעובדות
                  </p>
                </Card>

                <Card className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">
                        זמן הסנכרון האחרון
                      </p>
                      <p className="text-2xl font-bold text-slate-900 mt-2">
                        12 דק'
                      </p>
                    </div>
                    <Cloud className="w-8 h-8 text-blue-500 opacity-80" />
                  </div>
                  <p className="text-xs text-slate-500">
                    הרגע לפני
                  </p>
                </Card>
              </div>
            </div>

            {/* Data Streams Table */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">
                  זרמי נתונים והיסטוריה
                </h2>
              </div>

              <Card className="rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 border-b border-slate-200">
                    <TableRow>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        שם מערך
                      </TableHead>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        מקור
                      </TableHead>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        מספר רשומות
                      </TableHead>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        פורמט
                      </TableHead>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        סטטוס
                      </TableHead>
                      <TableHead className="p-4 text-right font-semibold text-slate-900">
                        סנכרון אחרון
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataStreams.map((stream) => (
                      <TableRow
                        key={stream.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <TableCell className="p-4">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {stream.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {stream.id}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 text-slate-700">
                          {stream.source}
                        </TableCell>
                        <TableCell className="p-4 text-slate-700">
                          {(stream.rowCount / 1000000).toFixed(2)}M
                        </TableCell>
                        <TableCell className="p-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                            {stream.format === "JSON" && (
                              <FileJson className="w-4 h-4" />
                            )}
                            {stream.format}
                          </span>
                        </TableCell>
                        <TableCell className="p-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                              stream.status
                            )} text-sm font-medium`}
                          >
                            {getStatusIcon(stream.status)}
                            {getStatusLabel(stream.status)}
                          </span>
                        </TableCell>
                        <TableCell className="p-4 text-slate-700 text-sm">
                          {stream.lastSync}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Security Note */}
            <div className="mt-12 p-6 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">
                    אבטחת נתונים מובטחת
                  </h3>
                  <p className="text-sm text-blue-800">
                    כל מערכי הנתונים המועלים מוצפנים בהעברה ובמנוחה. מתבצעת אימות
                    סכמה אוטומטית וגבוהה לפני הינגוש. הגישה מנהלת דורשת
                    אימות מרובה גורמים.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SupplierPortal;
