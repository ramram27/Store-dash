/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Line, BarChart, Bar, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 9800, profit: 2000 },
  { name: 'Apr', sales: 3908, profit: 2780 },
  { name: 'May', sales: 4800, profit: 1890 },
  { name: 'Jun', sales: 3800, profit: 2390 },
  { name: 'Jul', sales: 4300, profit: 3490 },
];

const productData = [
  { name: 'Electronics', value: 38 },
  { name: 'Clothing', value: 27 },
  { name: 'Accessories', value: 18 },
  { name: 'Home', value: 17 },
];

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Initialize from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);
  
  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Recent activity data
  const recentActivity = [
    { id: 1, type: 'order', user: 'John Doe', action: 'placed a new order', time: '2 minutes ago', amount: '$129.99' },
    { id: 2, type: 'user', user: 'Sarah Smith', action: 'created an account', time: '1 hour ago', amount: null },
    { id: 3, type: 'product', user: 'Admin', action: 'updated product inventory', time: '3 hours ago', amount: null },
    { id: 4, type: 'order', user: 'Michael Johnson', action: 'placed a new order', time: '5 hours ago', amount: '$85.50' },
    { id: 5, type: 'support', user: 'Emily Davis', action: 'opened a support ticket', time: 'Yesterday', amount: null },
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content - Use padding to account for the sidebar */}
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <main className="flex-1 p-4 md:p-6 md:pl-64 lg:pl-72 transition-all duration-200 pb-24">
          {/* Welcome Header */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border mb-6 shadow-sm`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold mb-2">Dashboard</h1>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Welcome back! Here's what's happening with your store today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>View:</span>
                <div className={`flex rounded-md overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <button 
                    onClick={() => setTimeRange('weekly')}
                    className={`px-3 py-1 text-sm ${
                      timeRange === 'weekly' 
                        ? isDarkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-500 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Weekly
                  </button>
                  <button 
                    onClick={() => setTimeRange('monthly')}
                    className={`px-3 py-1 text-sm ${
                      timeRange === 'monthly' 
                        ? isDarkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-500 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setTimeRange('yearly')}
                    className={`px-3 py-1 text-sm ${
                      timeRange === 'yearly' 
                        ? isDarkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-500 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards - Responsive grid with better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Total Users", value: "1,245", change: "+12%", isPositive: true, icon: "👥" },
              { title: "Revenue", value: "$12,345", change: "-8%", isPositive: false, icon: "💰" },
              { title: "Orders", value: "354", change: "+5%", isPositive: true, icon: "📦" },
              { title: "Products", value: "48", change: "-2%", isPositive: false, icon: "🏷️" }
            ].map((item, i) => (
              <div
                key={`summary-${i}`}
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      } mb-1`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-2xl font-semibold">
                      {item.value}
                    </p>
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div
                  className={`text-xs mt-2 ${
                    item.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.isPositive ? "↑" : "↓"} {item.change} from last month
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Chart */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm h-80`}
            >
              <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                  <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      color: isDarkMode ? "#f9fafb" : "#111827"
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product Categories Chart */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm h-80`}
            >
              <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  data={productData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                  <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      color: isDarkMode ? "#f9fafb" : "#111827"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border shadow-sm mb-6`}
          >
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start p-3 rounded-md ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                  } transition-colors`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      activity.type === 'order' 
                        ? 'bg-blue-100 text-blue-600' 
                        : activity.type === 'user' 
                        ? 'bg-green-100 text-green-600'
                        : activity.type === 'product'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {activity.type === 'order' ? '🛒' : activity.type === 'user' ? '👤' : activity.type === 'product' ? '📦' : '🎫'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{activity.user}</p>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{activity.action}</p>
                    {activity.amount && (
                      <p className="text-sm font-medium text-green-500 mt-1">{activity.amount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button 
                className={`text-sm px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? "bg-gray-700 hover:bg-gray-600 text-blue-400 hover:text-blue-300" 
                    : "bg-gray-100 hover:bg-gray-200 text-blue-600 hover:text-blue-700"
                } transition-colors`}
              >
                View All Activity
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Inventory Management", icon: "📦", desc: "Check and update your product inventory levels" },
              { title: "Order Processing", icon: "🚚", desc: "Review and process pending customer orders" },
              { title: "User Management", icon: "👥", desc: "Manage user accounts and permissions" },
              { title: "Analytics", icon: "📊", desc: "View detailed reports and analytics" },
              { title: "Settings", icon: "⚙️", desc: "Configure your store and application settings" },
              { title: "Support", icon: "🎫", desc: "Manage customer support tickets and inquiries" }
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-start mb-2">
                  <span className="text-2xl mr-2">{item.icon}</span>
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.desc}
                </p>
                <div className="mt-4 pt-2 border-t border-dashed flex justify-end">
                  <button
                    className={`text-xs px-3 py-1 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    } transition-colors`}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        
        <div className="md:pl-64 lg:pl-72 mt-[9vh]">
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}





