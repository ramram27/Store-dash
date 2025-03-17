"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample customer data
const sampleCustomers = [
  {
    id: "CUST-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    orders: 8,
    totalSpent: "$1,245.67",
    status: "Active",
    lastOrder: "2025-03-12",
  },
  {
    id: "CUST-1002",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    phone: "+1 (555) 987-6543",
    orders: 3,
    totalSpent: "$482.25",
    status: "Active",
    lastOrder: "2025-03-10",
  },
  {
    id: "CUST-1003",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 765-4321",
    orders: 12,
    totalSpent: "$3,756.90",
    status: "Active",
    lastOrder: "2025-03-14",
  },
  {
    id: "CUST-1004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    orders: 1,
    totalSpent: "$125.50",
    status: "New",
    lastOrder: "2025-03-09",
  },
  {
    id: "CUST-1005",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "+1 (555) 876-5432",
    orders: 0,
    totalSpent: "$0.00",
    status: "Inactive",
    lastOrder: "N/A",
  },
  {
    id: "CUST-1006",
    name: "Jennifer Brown",
    email: "jennifer.b@example.com",
    phone: "+1 (555) 345-6789",
    orders: 5,
    totalSpent: "$928.45",
    status: "Active",
    lastOrder: "2025-03-01",
  },
  {
    id: "CUST-1007",
    name: "James Miller",
    email: "james.m@example.com",
    phone: "+1 (555) 654-3210",
    orders: 2,
    totalSpent: "$276.30",
    status: "Active",
    lastOrder: "2025-02-15",
  },
  {
    id: "CUST-1008",
    name: "Emma White",
    email: "emma.w@example.com",
    phone: "+1 (555) 432-1098",
    orders: 0,
    totalSpent: "$0.00",
    status: "Inactive",
    lastOrder: "N/A",
  },
];

// Customer status options
const customerStatuses = ["All", "Active", "New", "Inactive"];

export default function Customers() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredCustomers, setFilteredCustomers] = useState(sampleCustomers);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

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

  // Sort customers
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort customers
  useEffect(() => {
    let results = [...sampleCustomers];

    // Apply status filter
    if (selectedStatus !== "All") {
      results = results.filter(
        (customer) => customer.status === selectedStatus
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredCustomers(results);
  }, [selectedStatus, searchQuery, sortConfig]);

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "New":
        return "text-blue-500";
      case "Inactive":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  // Get status background class for badges
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Active":
        return isDarkMode
          ? "bg-green-900 text-green-300"
          : "bg-green-100 text-green-800";
      case "New":
        return isDarkMode
          ? "bg-blue-900 text-blue-300"
          : "bg-blue-100 text-blue-800";
      case "Inactive":
        return isDarkMode
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-800";
      default:
        return isDarkMode
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-800";
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
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  Customers
                </h1>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Manage your customer accounts and information.
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
                  + Add Customer
                </button>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h3
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-1`}
              >
                Total Customers
              </h3>
              <p className="text-2xl font-semibold">{sampleCustomers.length}</p>
              <div className="text-xs mt-2 text-green-500">
                ↑ 14% from last month
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h3
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-1`}
              >
                Active Customers
              </h3>
              <p className="text-2xl font-semibold">
                {sampleCustomers.filter((c) => c.status === "Active").length}
              </p>
              <div className="text-xs mt-2 text-green-500">
                ↑ 8% from last month
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h3
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-1`}
              >
                Average Spend
              </h3>
              <p className="text-2xl font-semibold">$854.62</p>
              <div className="text-xs mt-2 text-red-500">
                ↓ 3% from last month
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search box */}
              <div className="flex-1">
                <label
                  htmlFor="customer-search"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Search Customers
                </label>
                <input
                  type="text"
                  id="customer-search"
                  placeholder="Search by name, email or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } border focus:outline-none focus:ring-2 ${
                    isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                  }`}
                />
              </div>

              {/* Status filter */}
              <div className="md:w-1/3 lg:w-1/4">
                <label
                  htmlFor="status-filter"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border focus:outline-none focus:ring-2 ${
                    isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                  }`}
                >
                  {customerStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Customers Table */}
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
                    <th
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                      onClick={() => requestSort("name")}
                    >
                      <div className="flex items-center">
                        Customer
                        {sortConfig.key === "name" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Contact
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                      onClick={() => requestSort("orders")}
                    >
                      <div className="flex items-center">
                        Orders
                        {sortConfig.key === "orders" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                      onClick={() => requestSort("totalSpent")}
                    >
                      <div className="flex items-center">
                        Total Spent
                        {sortConfig.key === "totalSpent" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                      onClick={() => requestSort("lastOrder")}
                    >
                      <div className="flex items-center">
                        Last Order
                        {sortConfig.key === "lastOrder" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {customer.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{customer.orders}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {customer.totalSpent}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBgColor(
                            customer.status
                          )}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {customer.lastOrder === "N/A" ? (
                          <span className="text-gray-500 dark:text-gray-400">
                            Never
                          </span>
                        ) : (
                          customer.lastOrder
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            className={`px-2 py-1 text-xs rounded ${
                              isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            View
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded ${
                              isDarkMode
                                ? "bg-blue-900 hover:bg-blue-800 text-blue-200"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                            }`}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Show message when no customers match the filter */}
              {filteredCustomers.length === 0 && (
                <div className="p-8 text-center">
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    No customers found. Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              Showing {filteredCustomers.length} of {sampleCustomers.length}{" "}
              customers
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                1
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                2
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
      <div className="md:pl-64 lg:pl-72 mt-[7vh]">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
