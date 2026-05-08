import React from "react";
import {
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30">
          <h2 className="font-semibold text-lg">My Tasks</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
