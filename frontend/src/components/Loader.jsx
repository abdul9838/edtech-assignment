const Loader = ({
  fullScreen = false,
  size = "md",
  message = "Loading...",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-200 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200";

  return (
    <div className={containerClasses} aria-busy="true" aria-live="polite">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-gray-200 border-t-blue-600`}
      />
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
