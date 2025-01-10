"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave, FiX } from "react-icons/fi";

interface UserFormProps {
  user?: {
    id?: number;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  onSubmit: (userData: any) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    id: user?.id,
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "sender",
    status: user?.status || "active",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!user?.id) {
      // Only validate password for new users
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-200">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
            text-white px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-200">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
            text-white px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-200">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
            text-white px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="sender">Sender</option>
          <option value="traveler">Traveler</option>
          <option value="both">Both</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-200">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
            text-white px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="active">Active</option>
          {/* <option value="pending">Pending</option> */}
          {/* <option value="suspended">Suspended</option> */}
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Password fields (only for new users) */}
      {!user?.id && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
                text-white px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="mt-1 block w-full rounded-lg bg-gray-700 border border-gray-600 
                text-white px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </>
      )}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 
            flex items-center space-x-2"
        >
          <FiX className="w-5 h-5" />
          <span>Cancel</span>
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 
            flex items-center space-x-2"
        >
          <FiSave className="w-5 h-5" />
          <span>{user?.id ? "Update" : "Create"} User</span>
        </motion.button>
      </div>
    </form>
  );
}
