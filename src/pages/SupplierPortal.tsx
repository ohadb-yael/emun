import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainLayout } from "@/components/layout/MainLayout";
import { Truck, Upload, CheckCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SupplierOrder {
  id: string;
  date: string;
  status: string;
  amount: string;
}

interface UploadedFile {
  name: string;
  status: string;
  date: string;
}

const MOCK_SUPPLIER_ORDERS: SupplierOrder[] = [
  { id: "ORD-2024-001", date: "2024-05-01", status: "אושר", amount: "₪45,000" },
  { id: "ORD-2024-002", date: "2024-05-03", status: "בטיפול", amount: "₪12,500" },
  { id: "ORD-2024-005", date: "2024-05-10", status: "נשלח", amount: "₪3,200" },
];

const SupplierPortal = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const currentUser = {
    name: "חברת אספקה בע״מ",
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setFiles([
        ...files,
        { name: "inv_2024.csv", status: "success", date: "היום" },
      ]);
      alert("קובץ הועלה ועבר בדיקת אבטחה בהצלחה");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>פורטל ספקים - מערכת אמו"ן</title>
      </Helmet>
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
          <Card className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 flex gap-4 items-center">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Truck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">
                פורטל ספקים - {currentUser.name}
              </h2>
              <p className="text-blue-700">העלאת חשבוניות וקבצים בצורה מאובטחת.</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">הזמנות רכש פתוחות</h3>
              <Card className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {MOCK_SUPPLIER_ORDERS.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 border-b last:border-0 hover:bg-slate-50 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-mono font-bold">{o.id}</div>
                      <div className="text-xs text-slate-500">{o.date}</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold">{o.amount}</div>
                      <span className="text-xs bg-slate-100 px-2 rounded">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            <div>
              <h3 className="font-bold mb-4">העלאת קבצים</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-white hover:bg-slate-50 transition mb-6">
                {uploading ? (
                  <Loader2 className="animate-spin mx-auto text-blue-600" />
                ) : (
                  <div onClick={handleUpload} className="cursor-pointer">
                    <Upload
                      className="mx-auto text-slate-400 mb-2"
                      size={32}
                    />
                    <p className="font-bold text-slate-700">
                      לחץ להעלאת חשבונית/דוח
                    </p>
                    <p className="text-xs text-slate-400">
                      CSV, JSON, XML (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
              {files.length > 0 && (
                <Card className="bg-green-50 p-4 rounded border border-green-100">
                  <h4 className="font-bold text-green-800 text-sm mb-2">
                    קבצים שהועלו לאחרונה:
                  </h4>
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-green-700"
                    >
                      <CheckCircle size={14} /> {f.name} ({f.date})
                    </div>
                  ))}
                </Card>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default SupplierPortal;
