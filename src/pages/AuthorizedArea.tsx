import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Lock,
  Fingerprint,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SecureDashboard {
  id: number;
  title: string;
  sensitivity: "HIGH" | "MEDIUM";
  requiredGroup: string;
  system: string;
  lastAccess: string;
}

interface AccessRequest {
  id: number;
  userId: number;
  userName: string;
  resource: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  log: string[];
}

const MOCK_SECURE_DASHBOARDS: SecureDashboard[] = [
  {
    id: 101,
    title: "ניהול תקציב ומשכורות",
    sensitivity: "HIGH",
    requiredGroup: "finance",
    system: "SAP",
    lastAccess: "לפני יומיים",
  },
  {
    id: 102,
    title: "תיקים אישיים (HR Sensitive)",
    sensitivity: "HIGH",
    requiredGroup: "hr",
    system: "Workday",
    lastAccess: "מעולם לא",
  },
  {
    id: 103,
    title: "מלאי מחסנים ראשי",
    sensitivity: "MEDIUM",
    requiredGroup: "logistics",
    system: "PowerBI",
    lastAccess: "-",
  },
  {
    id: 104,
    title: "ביצועי שרתים (Admin)",
    sensitivity: "MEDIUM",
    requiredGroup: "it",
    system: "Grafana",
    lastAccess: "היום, 08:00",
  },
];

const MOCK_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 1,
    userId: 1,
    userName: "ישראל ישראלי",
    resource: "מלאי מחסנים",
    reason: "ספירה רבעונית",
    status: "pending",
    date: "2024-05-18",
    log: [],
  },
  {
    id: 2,
    userId: 1,
    userName: "ישראל ישראלי",
    resource: "שכר בכירים",
    reason: "ביקורת",
    status: "rejected",
    date: "2024-05-15",
    log: ["נדחה: אין הרשאה"],
  },
];

const AuthorizedArea = () => {
  const [isGovIdAuthenticated, setIsGovIdAuthenticated] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requests, setRequests] = useState<AccessRequest[]>(MOCK_ACCESS_REQUESTS);
  const [reqData, setReqData] = useState({ res: "", reason: "" });

  const currentUser = {
    name: "ישראל ישראלי",
    id: 1,
    department: "finance",
    role: "employee",
  };

  const handleAccess = (dash: SecureDashboard) => {
    if (
      currentUser.department !== dash.requiredGroup &&
      currentUser.role !== "admin"
    ) {
      if (confirm("אין הרשאה. להגיש בקשה?")) {
        setReqData({ ...reqData, res: dash.title });
        setShowRequestModal(true);
      }
      return;
    }
    if (dash.sensitivity === "HIGH" && !isGovIdAuthenticated) {
      if (confirm("נדרשת הזדהות GovID. לבצע?"))
        setIsGovIdAuthenticated(true);
      return;
    }
    alert("פותח דשבורד מאובטח...");
  };

  const handleRequestSubmit = () => {
    const newRequest: AccessRequest = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      resource: reqData.res,
      reason: reqData.reason,
      status: "pending",
      date: new Date().toLocaleDateString("he-IL"),
      log: [],
    };
    setRequests([newRequest, ...requests]);
    alert("בקשה נשלחה בהצלחה");
    setShowRequestModal(false);
    setReqData({ res: "", reason: "" });
  };

  return (
    <>
      <Helmet>
        <title>אזור אישי - מערכת אמו"ן</title>
      </Helmet>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">אזור אישי</h2>
              <p className="text-slate-600">ברוך הבא, {currentUser.name}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                TLS Encrypted
              </span>
            </div>
          </header>

          <Card className="p-6 mb-8 flex items-center justify-between border border-slate-200">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  isGovIdAuthenticated
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <Fingerprint size={24} />
              </div>
              <div>
                <h4 className="font-bold">סטטוס הזדהות חזקה</h4>
                <p className="text-sm text-slate-500">
                  {isGovIdAuthenticated ? "מאומת GovID" : "לא מאומת"}
                </p>
              </div>
            </div>
            {!isGovIdAuthenticated && (
              <Button
                onClick={() => setIsGovIdAuthenticated(true)}
                className="bg-slate-900 text-white"
              >
                בצע הזדהות
              </Button>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4 flex gap-2 text-lg">
                <Lock size={18} className="text-slate-800" /> דשבורדים
                למורשים
              </h3>
              <div className="space-y-3">
                {MOCK_SECURE_DASHBOARDS.map((d) => (
                  <Card
                    key={d.id}
                    className="p-4 border border-slate-200 flex justify-between items-center hover:bg-slate-50 transition"
                  >
                    <div>
                      <div className="font-bold text-slate-800">
                        {d.title}
                      </div>
                      <div className="text-xs flex gap-2 mt-1">
                        <span
                          className={`font-bold ${
                            d.sensitivity === "HIGH"
                              ? "text-red-500"
                              : "text-blue-500"
                          }`}
                        >
                          {d.sensitivity}
                        </span>
                        <span className="text-slate-400">{d.system}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAccess(d)}
                      variant="outline"
                      className="text-blue-600 text-sm"
                    >
                      פתח
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 flex gap-2 text-lg">
                <MessageSquare size={18} /> בקשות הגישה שלי
              </h3>
              <div className="space-y-3">
                {requests
                  .filter((r) => r.userId === currentUser.id)
                  .map((r) => (
                    <Card
                      key={r.id}
                      className="p-3 border border-slate-200 text-sm flex justify-between"
                    >
                      <div>
                        <div className="font-bold">{r.resource}</div>
                        <div className="text-slate-500 text-xs">{r.reason}</div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs h-fit font-medium ${
                          r.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : r.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </Card>
                  ))}
                <Button
                  onClick={() => setShowRequestModal(true)}
                  variant="outline"
                  className="w-full border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
                >
                  + בקשה חדשה
                </Button>
              </div>
            </div>
          </div>

          {showRequestModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="p-6 w-full max-w-md bg-white border border-slate-200">
                <h3 className="font-bold text-lg mb-4">בקשת גישה</h3>
                <input
                  className="w-full border border-slate-200 p-2 rounded mb-2 text-right"
                  placeholder="שם המשאב"
                  value={reqData.res}
                  onChange={(e) =>
                    setReqData({ ...reqData, res: e.target.value })
                  }
                />
                <textarea
                  className="w-full border border-slate-200 p-2 rounded mb-4 text-right"
                  placeholder="סיבה"
                  value={reqData.reason}
                  onChange={(e) =>
                    setReqData({ ...reqData, reason: e.target.value })
                  }
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setShowRequestModal(false)}
                    variant="outline"
                  >
                    ביטול
                  </Button>
                  <Button
                    onClick={handleRequestSubmit}
                    className="bg-blue-600 text-white"
                  >
                    שלח
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default AuthorizedArea;
