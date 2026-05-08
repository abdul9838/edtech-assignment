import React from "react";
import { Trash2, X } from "lucide-react";

const DeleteModal = ({ id, handleDelete }) => {
  const closeModal = () => {
    document.getElementById("delete-modal").hidePopover?.();
  };

  const onConfirm = () => {
    handleDelete(id);
    closeModal();
  };

  return (
    <div
      id="delete-modal"
      popover="manual"
      className="fixed inset-0 m-auto bg-transparent backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
    >
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-[95vw] max-w-sm shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-4 bg-red-500/10 rounded-2xl">
            <Trash2 size={28} className="text-red-400" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-white text-center mb-2">
          Delete Task
        </h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-xl font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white p-3 rounded-xl font-semibold shadow-lg shadow-red-500/20 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
