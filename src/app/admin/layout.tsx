"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiPieChart,
  FiSettings,
  FiMessageSquare,
  FiShield,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Sidebar from "@/components/admin/Sidebar";
import { Provider } from "react-redux";
import store from "@/store/store";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: FiPieChart },
  { name: "Users", href: "/admin/users", icon: FiUsers },
  { name: "Packages", href: "/admin/packages", icon: FiPackage },
  { name: "Transactions", href: "/admin/transactions", icon: FiDollarSign },
  { name: "Support", href: "/admin/support", icon: FiMessageSquare },
  { name: "Security", href: "/admin/security", icon: FiShield },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // Check if user is authenticated
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [pathname, router]);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
