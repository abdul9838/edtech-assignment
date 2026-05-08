import React, { useEffect, useState } from "react";
import { ClipboardList, CheckCircle2, Clock3 } from "lucide-react";
import { getDashboardData } from "../../services/taskService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();

        setStats({
          totalTasks: data.totalTasks,
          completedTasks: data.completedTasks,
          pendingTasks: data.pendingTasks,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ClipboardList,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock3,
      color: "from-amber-500 to-amber-700",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Welcome back, {sessionStorage.getItem("user_name")}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
            >
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-700" />
                  <div className="h-4 w-24 rounded bg-slate-700" />
                  <div className="h-8 w-16 rounded bg-slate-700" />
                </div>
              ) : (
                <>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <p className="text-slate-400 text-sm">{card.title}</p>

                  <h2 className="text-3xl font-bold text-white mt-1">
                    {card.value}
                  </h2>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
