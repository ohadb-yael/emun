import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import { Lock, UserCheck, UserX, AlertTriangle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
  department: string;
  lastLogin: string;
}

interface SystemLog {
  id: number;
  event: string;
  user: string;
  ip: string;
  time: string;
  status: "success" | "error" | "warning";
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "ישראל ישראלי",
    role: "employee",
    status: "active",
    department: "finance",
    lastLogin: "היום, 09:41",
  },
  {
    id: 2,
    name: "חברת אספקה בע״מ",
    role: "supplier",
    status: "active",
    department: "external",
    lastLogin: "אתמול, 14:20",
  },
  {
    id: 3,
    name: "מנהל מערכת",
    role: "admin",
    status: "active",
    department: "it",
    lastLogin: "עכשיו",
  },
];

const MOCK_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 1,
    event: "Login Success",
    user: "ישראל ישראלי",
    ip: "10.0.0.5",
    time: "10:42",
    status: "success",
  },
  {
    id: 2,
    event: "Failed Login",
    user: "Unknown",
    ip: "192.168.1.1",
    time: "10:40",
    status: "error",
  },
  {
    id: 3,
    event: "Data Export",
    user: "Admin",
    ip: "10.0.0.1",
    time: "10:15",
    status: "warning",
  },
];

const AdminPanel = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([
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
  ]);

  const handleRequestUpdate = (id: number, status: "approved" | "rejected") => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <>
      <Helmet>
        <title>ניהול - מערכת אמו"ן</title>
      </Helmet>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lock className="text-slate-800" /> ניהול הרשאות (Admin)
          </h2>

          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="requests">בקשות גישה</TabsTrigger>
              <TabsTrigger value="users">משתמשים</TabsTrigger>
              <TabsTrigger value="logs">לוגים</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <div className="space-y-4">
                {requests.map((r) => (
                  <Card
                    key={r.id}
                    className="p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold">
                        {r.userName}{" "}
                        <span className="font-normal text-slate-500">
                          מבקש גישה ל-
                        </span>
                        {r.resource}
                      </div>
                      <div className="text-sm text-slate-600">
                        סיבה: {r.reason}
                      </div>
                    </div>
                    {r.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleRequestUpdate(r.id, "approved")}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          <UserCheck size={14} className="mr-1" /> אשר
                        </Button>
                        <Button
                          onClick={() => handleRequestUpdate(r.id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          <UserX size={14} className="mr-1" /> דחה
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-500 uppercase">
                        {r.status}
                      </span>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <Card className="rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 border-b">
                    <TableRow>
                      <TableHead className="p-3 text-right">שם</TableHead>
                      <TableHead className="p-3 text-right">תפקיד</TableHead>
                      <TableHead className="p-3 text-right">סטטוס</TableHead>
                      <TableHead className="p-3 text-right">
                        התחברות אחרונה
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_USERS.map((u) => (
                      <TableRow key={u.id} className="border-b">
                        <TableCell className="p-3">{u.name}</TableCell>
                        <TableCell className="p-3">
                          <span className="bg-slate-100 px-2 rounded text-sm">
                            {u.role}
                          </span>
                        </TableCell>
                        <TableCell className="p-3 text-green-600 font-medium">
                          {u.status}
                        </TableCell>
                        <TableCell className="p-3 text-sm text-slate-600">
                          {u.lastLogin}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="logs">
              <Card className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-sm h-96 overflow-auto border border-slate-800">
                {MOCK_SYSTEM_LOGS.map((l) => (
                  <div
                    key={l.id}
                    className="mb-1 border-b border-slate-800 pb-1 flex items-start gap-2"
                  >
                    <span className="text-slate-500">[{l.time}]</span>
                    <span
                      className={`${
                        l.status === "success"
                          ? "text-green-400"
                          : l.status === "error"
                            ? "text-red-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {l.event}
                    </span>
                    <span className="text-slate-500">
                      - {l.user} ({l.ip})
                    </span>
                  </div>
                ))}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};

export default AdminPanel;
