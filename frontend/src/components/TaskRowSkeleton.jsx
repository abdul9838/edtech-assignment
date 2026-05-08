{
  /* Skeleton Row Component */
}
const TaskRowSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-slate-800">
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-slate-700/70" />
          <div className="h-3 w-64 rounded bg-slate-800/70" />
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex justify-center">
          <div className="h-7 w-28 rounded-full bg-slate-700/70" />
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <div className="h-9 w-9 rounded-lg bg-slate-700/70" />
          <div className="h-9 w-9 rounded-lg bg-slate-700/70" />
        </div>
      </td>
    </tr>
  );
};

export default TaskRowSkeleton;
