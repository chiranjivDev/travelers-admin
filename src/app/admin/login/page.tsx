"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiAlertCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_LOGIN } from "./redux/adminLoginAction";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, error: loginError } = useSelector((state) => state.admin);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const payload = {
      username: email,
      password: password,
    };
    dispatch({ type: ADMIN_LOGIN, payload });
  };

  useEffect(() => {
    if (user && user.access_token) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
      setIsLoading(false);
    } else if (
      email === "admin@deliveryconnect.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
      setIsLoading(false);
    } else if (loginError) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  }, [user, loginError, router]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          >
            DeliveryConnect Admin
          </motion.h2>
          <p className="mt-2 text-gray-400">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-gray-700"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                    text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg"
              >
                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              onClick={handleLogin}
              className={`w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                rounded-lg transition-all duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                For demo purposes, use:
                <br />
                Email: admin@deliveryconnect.com
                <br />
                Password: admin123
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
