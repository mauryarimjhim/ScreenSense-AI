import {
  House,
  LayoutDashboard,
  Smartphone,
  BarChart3,
  BrainCircuit,
  Sparkles,
  FileText,
  Target,
  Settings,
} from "lucide-react";

export const menuItems = [
  {
    title: "Home",
    icon: House,
    path: "/",
  },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "App Analytics",
    icon: Smartphone,
    path: "/dashboard/app-analytics",
  },
  {
    title: "Behavior Analytics",
    icon: BarChart3,
    path: "/dashboard/behaviour",
  },
  {
    title: "AI Insights",
    icon: BrainCircuit,
    path: "/dashboard/ai-insights",
  },
  {
    title: "Predictions",
    icon: Sparkles,
    path: "/dashboard/predictions",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/dashboard/reports",
  },
  {
    title: "Goals",
    icon: Target,
    path: "/dashboard/goals",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];
