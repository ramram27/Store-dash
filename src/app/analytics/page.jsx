"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Analytics() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedChart, setSelectedChart] = useState("revenue");

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

  // Sample analytics metrics
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,289.73",
      change: "+12.5%",
      isPositive: true,
    },
    {
      title: "Average Order Value",
      value: "$127.45",
      change: "+3.2%",
      isPositive: true,
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: "-0.8%",
      isPositive: false,
    },
    {
      title: "New Customers",
      value: "132",
      change: "+18.4%",
      isPositive: true,
    },
  ];

  // Sample top products data
  const topProducts = [
    {
      name: "Wireless Earbuds",
      sales: 243,
      revenue: "$8,505.00",
      growth: "+15%",
    },
    { name: "Smart Watch", sales: 187, revenue: "$7,480.00", growth: "+8%" },
    {
      name: "Portable Charger",
      sales: 156,
      revenue: "$3,900.00",
      growth: "+23%",
    },
    {
      name: "Bluetooth Speaker",
      sales: 142,
      revenue: "$5,680.00",
      growth: "-5%",
    },
    { name: "Phone Case", sales: 138, revenue: "$2,070.00", growth: "+3%" },
  ];

  // Customer segments data
  const customerSegments = [
    { name: "New Customers", percentage: 28 },
    { name: "Returning Customers", percentage: 45 },
    { name: "Loyal Customers", percentage: 27 },
  ];

  // Traffic sources data
  const trafficSources = [
    { name: "Direct", percentage: 35 },
    { name: "Organic Search", percentage: 24 },
    { name: "Social Media", percentage: 16 },
    { name: "Referral", percentage: 14 },
    { name: "Email", percentage: 11 },
  ];

  // Mock color function for segments
  const getSegmentColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
    ];
    return colors[index % colors.length];
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
          {/* Header Section */}
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
                  Analytics
                </h1>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Track your business performance and key metrics.
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                >
                  Time Period:
                </span>
                <div
                  className={`flex rounded-md overflow-hidden border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setTimeRange("7days")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "7days"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setTimeRange("30days")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "30days"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    30 Days
                  </button>
                  <button
                    onClick={() => setTimeRange("90days")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "90days"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    90 Days
                  </button>
                  <button
                    onClick={() => setTimeRange("year")}
                    className={`px-3 py-1 text-sm ${
                      timeRange === "year"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, i) => (
              <div
                key={`metric-${i}`}
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
                  {metric.title}
                </h3>
                <p className="text-2xl font-semibold">{metric.value}</p>
                <div
                  className={`text-xs mt-2 ${
                    metric.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.isPositive ? "↑" : "↓"} {metric.change} vs. previous
                  period
                </div>
              </div>
            ))}
          </div>

          {/* Chart Selection and Visualization */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg font-semibold">Performance Trend</h2>

              {/* Chart Type Selector */}
              <div className="mt-3 md:mt-0 flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  View:
                </span>
                <div
                  className={`flex rounded-md overflow-hidden border ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setSelectedChart("revenue")}
                    className={`px-3 py-1 text-sm ${
                      selectedChart === "revenue"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setSelectedChart("orders")}
                    className={`px-3 py-1 text-sm ${
                      selectedChart === "orders"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setSelectedChart("customers")}
                    className={`px-3 py-1 text-sm ${
                      selectedChart === "customers"
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Customers
                  </button>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-64 flex items-end space-x-2">
              <div className="flex-1 flex items-end justify-around h-full pt-5">
                {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map(
                  (week, index) => {
                    // Different height data for each chart type
                    let heightData;
                    if (selectedChart === "revenue") {
                      heightData = [60, 82, 73, 90, 85];
                    } else if (selectedChart === "orders") {
                      heightData = [75, 60, 80, 65, 85];
                    } else {
                      heightData = [50, 65, 80, 75, 90];
                    }

                    const height = heightData[index];
                    return (
                      <div key={week} className="flex flex-col items-center">
                        <div
                          style={{ height: `${height}%` }}
                          className={`w-12 sm:w-16 md:w-24 ${
                            selectedChart === "revenue"
                              ? isDarkMode
                                ? "bg-blue-600"
                                : "bg-blue-500"
                              : selectedChart === "orders"
                              ? isDarkMode
                                ? "bg-green-600"
                                : "bg-green-500"
                              : isDarkMode
                              ? "bg-purple-600"
                              : "bg-purple-500"
                          } rounded-t-sm`}
                        ></div>
                        <div
                          className={`text-xs mt-2 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {week}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Two-column section for additional analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Products */}
            <div
              className={`rounded-lg p-4 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-4">Top Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={
                        isDarkMode
                          ? "border-b border-gray-700"
                          : "border-b border-gray-200"
                      }
                    >
                      <th className="pb-2 text-left text-sm font-medium">
                        Product Name
                      </th>
                      <th className="pb-2 text-left text-sm font-medium">
                        Sales
                      </th>
                      <th className="pb-2 text-left text-sm font-medium">
                        Revenue
                      </th>
                      <th className="pb-2 text-left text-sm font-medium">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr
                        key={index}
                        className={`${
                          isDarkMode
                            ? "border-b border-gray-700"
                            : "border-b border-gray-200"
                        } ${
                          index === topProducts.length - 1 ? "border-0" : ""
                        }`}
                      >
                        <td className="py-3 text-sm">{product.name}</td>
                        <td className="py-3 text-sm">{product.sales}</td>
                        <td className="py-3 text-sm">{product.revenue}</td>
                        <td
                          className={`py-3 text-sm ${
                            product.growth.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.growth}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button
                  className={`text-sm px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  } transition-colors`}
                >
                  View All Products
                </button>
              </div>
            </div>

            {/* Customer Segments */}
            <div
              className={`rounded-lg p-4 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
              <div className="space-y-6">
                {/* Customer Segments */}
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{segment.name}</span>
                        <span>{segment.percentage}%</span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700`}
                      >
                        <div
                          className={`h-2 rounded-full ${getSegmentColor(
                            index
                          )}`}
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Traffic Sources */}
                <div>
                  <h3
                    className={`text-md font-medium mb-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Traffic Sources
                  </h3>
                  <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{source.name}</span>
                          <span>{source.percentage}%</span>
                        </div>
                        <div
                          className={`w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700`}
                        >
                          <div
                            className={`h-2 rounded-full ${getSegmentColor(
                              index
                            )}`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold mb-2 sm:mb-0">
                Analytics Reports
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-2 rounded-md text-sm flex items-center ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  } transition-colors`}
                >
                  <span className="mr-2">📄</span>
                  PDF Report
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm flex items-center ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  } transition-colors`}
                >
                  <span className="mr-2">📊</span>
                  Excel Export
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm flex items-center ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } transition-colors`}
                >
                  <span className="mr-2">📅</span>
                  Schedule Reports
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="md:pl-64 lg:pl-72 mt-[6vh]">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
