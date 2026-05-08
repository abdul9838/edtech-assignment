import React from "react";
import { Plus, Edit2, Trash2, CheckCircle, Clock } from "lucide-react";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Fix Header Bug",
      description: "Nav bar is overlapping content",
      status: "Pending",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Connect login to backend",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Tasks</h1>

          <p className="text-slate-400 text-sm">
            Manage and track your team's progress
          </p>
        </div>

        {/* Open Modal Button */}
        <button
          popovertarget="task-modal"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Title & Description</th>

              <th className="px-6 py-4 font-semibold text-center">Status</th>

              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-white font-medium">{task.title}</p>

                  <p className="text-slate-500 text-sm truncate max-w-xs">
                    {task.description}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                        task.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {task.status === "Completed" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}

                      {task.status}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                      <Edit2 size={18} />
                    </button>

                    <button className="p-2 hover:bg-slate-700 rounded-lg text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popover Modal */}
      <div
        id="task-modal"
        popover="manual"
        className="backdrop:bg-black/70 m-auto inset-0 fixed bg-transparent p-0 border-none rounded-3xl"
      >
        <div className="bg-slate-900 border border-slate-800 w-[95vw] max-w-md p-8 rounded-3xl shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Task Title
              </label>

              <input
                type="text"
                placeholder="e.g. Design Landing Page"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Describe the task details..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3 pt-2">
              {/* Close Button */}
              <button
                type="button"
                popovertarget="task-modal"
                popovertargetaction="hide"
                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
