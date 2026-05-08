import { LayoutDashboard, ListTodo, LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user_token");
    navigate("/login");
  };
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
          <ListTodo /> TaskManager
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl">
          <LayoutDashboard size={20} /> Dashboard
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
