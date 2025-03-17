"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample product data
const sampleProducts = [
  {
    id: "PRD-1001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: "$149.99",
    stock: 42,
    status: "In Stock",
  },
  {
    id: "PRD-1002",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: "$24.99",
    stock: 78,
    status: "In Stock",
  },
  {
    id: "PRD-1003",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: "$18.95",
    stock: 115,
    status: "In Stock",
  },
  {
    id: "PRD-1004",
    name: "Smart Fitness Tracker",
    category: "Electronics",
    price: "$89.99",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-1005",
    name: "Bamboo Cutting Board",
    category: "Home",
    price: "$32.50",
    stock: 23,
    status: "In Stock",
  },
  {
    id: "PRD-1006",
    name: "Leather Wallet",
    category: "Accessories",
    price: "$45.00",
    stock: 7,
    status: "Low Stock",
  },
  {
    id: "PRD-1007",
    name: "Ceramic Coffee Mug",
    category: "Home",
    price: "$12.99",
    stock: 89,
    status: "In Stock",
  },
];

// Product categories for filtering
const productCategories = [
  "All",
  "Electronics",
  "Clothing",
  "Accessories",
  "Home",
];

export default function Products() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

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

  // Filter products when category or search query changes
  useEffect(() => {
    let results = sampleProducts;

    // Apply category filter
    if (selectedCategory !== "All") {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(results);
  }, [selectedCategory, searchQuery]);

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "text-green-500";
      case "Low Stock":
        return "text-yellow-500";
      case "Out of Stock":
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
                <h1 className="text-xl md:text-2xl font-bold mb-2">Products</h1>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Manage your products inventory and catalog here.
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
                  + Add Product
                </button>
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
                  htmlFor="product-search"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Search Products
                </label>
                <input
                  type="text"
                  id="product-search"
                  placeholder="Search by name or ID..."
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

              {/* Category filter */}
              <div className="md:w-1/3 lg:w-1/4">
                <label
                  htmlFor="category-filter"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Filter by Category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } border focus:outline-none focus:ring-2 ${
                    isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                  }`}
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
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
                      Product ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Stock
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
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {product.id}
                      </td>
                      <td className="px-4 py-3 text-sm">{product.name}</td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {product.price}
                      </td>
                      <td className="px-4 py-3 text-sm">{product.stock}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            className={`px-2 py-1 text-xs rounded ${
                              isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            className={`px-2 py-1 text-xs rounded ${
                              isDarkMode
                                ? "bg-red-900 hover:bg-red-800 text-red-200"
                                : "bg-red-100 hover:bg-red-200 text-red-700"
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Show message when no products match the filter */}
              {filteredProducts.length === 0 && (
                <div className="p-8 text-center">
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    No products found. Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="md:pl-64 lg:pl-72 mt-[8vh]">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
