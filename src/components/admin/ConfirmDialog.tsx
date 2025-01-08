"use client";

import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}: ConfirmDialogProps) {
  const colors = {
    danger: "bg-red-600 hover:bg-red-500",
    warning: "bg-yellow-600 hover:bg-yellow-500",
    info: "bg-blue-600 hover:bg-blue-500",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div
            className={`p-2 rounded-full bg-${type === "danger" ? "red" : type === "warning" ? "yellow" : "blue"}-600/20`}
          >
            <FiAlertTriangle
              className={`w-6 h-6 text-${type === "danger" ? "red" : type === "warning" ? "yellow" : "blue"}-400`}
            />
          </div>
          <p className="text-gray-300">{message}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            {cancelText}
          </motion.button>
          <motion.button
            onClick={onConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg text-white ${colors[type]}`}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
