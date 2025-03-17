"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  User,
  X,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Settings,
  Boxes,
} from "lucide-react";

// Routes for sidebar with icons
const routes = [
  { label: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
  { label: "Products", href: "/products", icon: <Boxes size={18} /> },
  { label: "Orders", href: "/orders", icon: <ShoppingCart size={18} /> },
  { label: "Customers", href: "/customers", icon: <Users size={18} /> },
  { label: "Analytics", href: "/analytics", icon: <BarChart size={18} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={18} /> },
];

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize
  useEffect(() => {
    // Set initial window width after component mounts (client-side only)
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 z-30 w-full border-b ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        } shadow-sm`}
      >
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } transition-colors`}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div className="md:block md:w-48 lg:w-56">
            {/* Logo */}
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-md mr-2 ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <Package className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold">StoreDash</h2>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-2 md:gap-4 px-2">
            <div className="relative flex-1 md:max-w-sm lg:max-w-md">
              <Search
                className={`absolute left-2.5 top-2.5 h-4 w-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="search"
                placeholder="Search..."
                className={`w-full pl-8 h-9 rounded-md px-3 py-2 text-sm ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 placeholder-gray-500"
                } border focus:outline-none focus:ring-2 ${
                  isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              className={`p-2 rounded-md relative ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } transition-colors`}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span
                className={`absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-xs ${
                  isDarkMode
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                3
              </span>
            </button>

            <button
              className="rounded-full overflow-hidden"
              aria-label="User profile"
            >
              <div className="h-8 w-8 bg-gray-300 flex items-center justify-center rounded-full">
                <User className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar (Overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            className={`relative flex-1 flex flex-col w-64 max-w-xs ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`py-4 px-3 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } flex justify-between items-center`}
            >
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-md mr-2 ${
                    isDarkMode ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <Package className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold">StoreDash</h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-1 rounded-md ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 py-4 overflow-y-auto">
              <nav className="flex flex-col gap-1 px-2">
                {routes.map((route, index) => (
                  <Link
                    key={index}
                    href={route.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                      pathname === route.href
                        ? isDarkMode
                          ? "bg-gray-700 text-white font-medium"
                          : "bg-gray-100 text-gray-900 font-medium"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className={`${
                        pathname === route.href
                          ? isDarkMode
                            ? "text-white"
                            : "text-blue-600"
                          : ""
                      }`}
                    >
                      {route.icon}
                    </span>
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - Only render on md screens and up */}
      <aside
        className={`hidden md:block w-48 lg:w-56 fixed left-0 top-16 h-[calc(100vh-4rem)] border-r overflow-y-auto ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="py-4">
          <nav className="flex flex-col gap-1 px-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname === route.href
                    ? isDarkMode
                      ? "bg-gray-700 text-white font-medium"
                      : "bg-gray-100 text-gray-900 font-medium"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span
                  className={`${
                    pathname === route.href
                      ? isDarkMode
                        ? "text-white"
                        : "text-blue-600"
                      : ""
                  }`}
                >
                  {route.icon}
                </span>
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Placeholder for the fixed header and sidebar to prevent content overlap */}
      <div className="md:pl-48 lg:pl-56 pt-16"></div>
    </>
  );
}
