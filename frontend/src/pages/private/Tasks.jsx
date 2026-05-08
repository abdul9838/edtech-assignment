import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Edit2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../../services/taskService";
import { toast } from "react-hot-toast";
import DeleteModal from "../../components/DeleteModal";
import TaskRowSkeleton from "../../components/TaskRowSkeleton";
import AddOrEditTask from "../../components/addOrEditTask";

const LIMIT_OPTIONS = [5, 10, 20, 50];
const STATUS_OPTIONS = ["All", "Pending", "Completed"];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from URL query params
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "All";

  const [searchInput, setSearchInput] = useState(search);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "", status: false },
    mode: "onBlur",
  });

  // Helper to update a single query param while preserving others
  const setParam = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === null || value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
        // Reset to page 1 on filter/search change (but not on page change itself)
        if (key !== "page") next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTasks(
        page,
        limit,
        search,
        status === "All" ? "" : statusFilter,
      );
      // Expects API to return { tasks: [...], total: number }
      setTasks(data.tasks ?? data);
      setTotalTasks(data.total ?? data.length);
    } catch (err) {
      toast.error(err?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Debounced search: update URL param after 400ms idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setParam("search", searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.ceil(totalTasks / limit);

  const handleEditClick = (task) => {
    setEditingId(task._id);
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status === "Completed");
    document.getElementById("task-modal").showPopover();
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        status: data.status ? "Completed" : "Pending",
      };
      if (editingId) {
        await updateTask(editingId, payload);
        toast.success("Task updated");
      } else {
        await createTask(payload);
        toast.success("Task created");
      }
      closeModal();
      loadTasks();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const closeModal = () => {
    setEditingId(null);
    reset();
    document.getElementById("task-modal").hidePopover?.();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      loadTasks();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-slate-950 text-slate-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Tasks</h1>
          <p className="text-slate-400 text-sm">
            Manage and track your progress
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            reset();
            document.getElementById("task-modal").showPopover();
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-all"
        >
          <Plus size={20} /> Add Task
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-50">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setParam("status", e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm cursor-pointer"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>

        {/* Limit */}
        <select
          value={limit}
          onChange={(e) => setParam("limit", e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm cursor-pointer"
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l} / page
            </option>
          ))}
        </select>
      </div>

      <DeleteModal id={deletingId} handleDelete={handleDelete} />

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm bg-slate-800/50 uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Task Details</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TaskRowSkeleton key={i} />
              ))
            ) : tasks.length === 0 ? (
              <tr>
                <td className="p-10 text-center text-slate-500" colSpan="3">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-slate-800/30 transition-all group"
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
                        className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium ${
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
                    <div className="flex justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="p-2 hover:bg-slate-700 rounded-lg text-indigo-300 hover:text-indigo-400 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(task._id);
                          document.getElementById("delete-modal").showPopover();
                        }}
                        className="p-2 hover:bg-slate-700 rounded-lg text-red-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between mt-5 px-1">
          <p className="text-slate-500 text-sm">
            Showing {Math.min((page - 1) * limit + 1, totalTasks)}–
            {Math.min(page * limit, totalTasks)} of {totalTasks} tasks
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setParam("page", page - 1)}
              disabled={page <= 1}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-slate-600 text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setParam("page", item)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all border ${
                      item === page
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

            <button
              onClick={() => setParam("page", page + 1)}
              disabled={page >= totalPages}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Modal — unchanged from your original */}
      <div
        id="task-modal"
        popover="manual"
        className="fixed inset-0 m-auto bg-transparent backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
      >
        <AddOrEditTask
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          editingId={editingId}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default Tasks;
