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
    path: "/analytics",
  },
  {
    title: "Behavior Analytics",
    icon: BarChart3,
    path: "/behavior",
  },
  {
    title: "AI Insights",
    icon: BrainCircuit,
    path: "/insights",
  },
  {
    title: "Predictions",
    icon: Sparkles,
    path: "/prediction",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];