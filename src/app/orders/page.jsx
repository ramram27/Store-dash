"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample order data
const sampleOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    date: "2025-03-14",
    total: "$245.99",
    status: "Delivered",
    type: "Standard",
  },
  {
    id: "ORD-1002",
    customer: "Alice Smith",
    date: "2025-03-14",
    total: "$129.50",
    status: "Pending",
    type: "Express",
  },
  {
    id: "ORD-1003",
    customer: "Robert Johnson",
    date: "2025-03-13",
    total: "$89.99",
    status: "Processing",
    type: "Standard",
  },
  {
    id: "ORD-1004",
    customer: "Emily Davis",
    date: "2025-03-12",
    total: "$352.75",
    status: "Delivered",
    type: "Overnight",
  },
  {
    id: "ORD-1005",
    customer: "Michael Wilson",
    date: "2025-03-12",
    total: "$65.25",
    status: "Cancelled",
    type: "Standard",
  },
];

// Order types for filtering
const orderTypes = ["All", "Standard", "Express", "Overnight"];

export default function Orders() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);

  // Initialize from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // Filter orders when type changes
  useEffect(() => {
    if (selectedType === "All") {
      setFilteredOrders(sampleOrders);
    } else {
      setFilteredOrders(
        sampleOrders.filter((order) => order.type === selectedType)
      );
    }
  }, [selectedType]);

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-500";
      case "Processing":
        return "text-blue-500";
      case "Pending":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {/* Main Content */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Main content area - content will flow after the sidebar due to flex layout */}
        <main className="flex-1 p-4 md:p-6 md:pl-64 lg:pl-72 transition-all duration-200 pb-24">
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold mb-2">Orders</h1>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Manage and track all customer orders here.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  + New Order
                </button>
              </div>
            </div>
          </div>

          {/* Order Type Filter */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <h2 className="text-lg font-semibold mb-3">Filter by Order Type</h2>
            <div className="flex flex-wrap gap-2">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedType === type
                      ? isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div
            className={`rounded-lg ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border shadow-sm overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.customer}</td>
                      <td className="px-4 py-3 text-sm">{order.date}</td>
                      <td className="px-4 py-3 text-sm">{order.type}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {order.total}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          className={`px-2 py-1 text-xs rounded ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Show message when no orders match the filter */}
              {filteredOrders.length === 0 && (
                <div className="p-4 text-center">
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    No orders found for the selected type.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="md:pl-64 lg:pl-72">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
