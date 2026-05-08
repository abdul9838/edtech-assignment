import { CheckCircle } from "lucide-react";
import React from "react";

const AddOrEditTask = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  editingId,
  closeModal,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-[95vw] max-w-md shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        {editingId ? "Edit Task" : "Create New Task"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-slate-400 mb-2 ml-1">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="What needs to be done?"
            className={`w-full p-3 bg-slate-800 border ${errors.title ? "border-red-500" : "border-slate-700"} rounded-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2 ml-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Add more details..."
            rows="4"
            className={`w-full p-3 bg-slate-800 border ${errors.description ? "border-red-500" : "border-slate-700"} rounded-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="flex items-center gap-3 cursor-pointer group w-max">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("status")}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-slate-700 bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 transition-all focus:ring-2 focus:ring-indigo-500/50"
              />
              <CheckCircle className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none transition-opacity" />
            </div>
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              Mark as Completed
            </span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
          >
            {editingId ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditTask;
