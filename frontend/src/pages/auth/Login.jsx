import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, LogIn } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "user@example.com",
      password: "password123",
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    loginUser(data).then((response) => {
      if (response.token) {
        sessionStorage.setItem("user_token", response.token);

        sessionStorage.setItem("user_name", response.user.name);
        navigate("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2">Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full bg-slate-800/50 border ${errors.email ? "border-red-500" : "border-slate-700"} text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                placeholder="name@company.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={`w-full bg-slate-800/50 border ${errors.password ? "border-red-500" : "border-slate-700"} text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <p className="text-slate-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 transition-all"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
