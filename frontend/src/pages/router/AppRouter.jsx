import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvestorDashboard from "../pages/Investor/Dashboard";
import OwnerDashboard from "../pages/Owner/Dashboard";
import AdminDashboard from "../pages/Admin/Dashboard";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Dashboards */}
                <Route path="/investor/dashboard" element={<InvestorDashboard />} />
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                {/* Default or 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
