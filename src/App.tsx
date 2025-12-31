import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Dashboards from "./pages/Dashboards";
import DashboardView from "./pages/DashboardView";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthorizedArea from "./pages/AuthorizedArea";
import DataCatalog from "./pages/DataCatalog";
import SupplierPortal from "./pages/SupplierPortal";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/dashboards/:id" element={<DashboardView />} />
            <Route path="/about" element={<About />} />
            <Route path="/authorized" element={<AuthorizedArea />} />
            <Route path="/catalog" element={<DataCatalog />} />
            <Route path="/supplier" element={<SupplierPortal />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
