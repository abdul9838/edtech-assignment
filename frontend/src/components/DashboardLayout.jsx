import React from "react";
import {
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const asideItem = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { name: "Tasks", icon: <ListTodo size={20} />, path: "/tasks" },
  ];
  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <Sidebar asideItem={asideItem} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        {/* footer  with aside item like bottom tab  */}
        <div className="md:p-6 p-3 flex items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/50 md:hidden">
          {asideItem.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-indigo-600/10 hover:text-indigo-400 rounded-sm transition-colors `
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
