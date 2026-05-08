import React from "react";
import {
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="p-6 min-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
