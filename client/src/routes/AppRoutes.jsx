import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Overview from "../pages/Dashboard/Overview";
import AppAnalytics from "../pages/Dashboard/AppAnalytics";
import BehaviourAnalytics from "../pages/Dashboard/BehaviourAnalytics";
import AIInsights from "../pages/Dashboard/AIInsights";
import Predictions from "../pages/Dashboard/Predictions";
import Reports from "../pages/Dashboard/Reports";
import Goals from "../pages/Dashboard/Goals";
import Settings from "../pages/Dashboard/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="app-analytics" element={<AppAnalytics />} />
          <Route path="behaviour" element={<BehaviourAnalytics />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<Goals />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;