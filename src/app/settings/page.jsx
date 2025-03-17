"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "My Store",
    storeEmail: "contact@mystore.com",
    supportPhone: "+1 (555) 123-4567",
    currency: "USD",
    language: "English",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderConfirmations: true,
    shippingUpdates: true,
    marketingEmails: false,
    stockAlerts: true,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90days",
    ipRestriction: false,
    activityLogs: true,
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

  // Handle general settings changes
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle notification toggles
  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handle security settings changes
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle security toggle settings
  const handleSecurityToggle = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Save settings (demo function)
  const saveSettings = () => {
    alert("Settings saved successfully!");
    // In a real application, you would save to backend here
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
            <h1 className="text-xl md:text-2xl font-bold mb-2">Settings</h1>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Manage your application preferences and account settings.
            </p>
          </div>

          {/* Settings Tabs */}
          <div className="flex mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "general"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "notifications"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "users"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Users & Permissions
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "security"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "billing"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setActiveTab("integrations")}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "integrations"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "border-b-2 border-blue-500 text-blue-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Integrations
            </button>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <div
              className={`rounded-lg p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-6">General Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="storeName"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="storeEmail"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Support Email
                  </label>
                  <input
                    type="email"
                    id="storeEmail"
                    name="storeEmail"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralChange}
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="supportPhone"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Support Phone
                  </label>
                  <input
                    type="tel"
                    id="supportPhone"
                    name="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={handleGeneralChange}
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="currency"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={generalSettings.currency}
                    onChange={handleGeneralChange}
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="timeZone"
                    className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Time Zone
                  </label>
                  <select
                    id="timeZone"
                    name="timeZone"
                    className={`w-full px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                    <option value="UTC+8">China Standard Time (UTC+8)</option>
                    <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={saveSettings}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div
              className={`rounded-lg p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-6">
                Notification Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive general notifications via email
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("emailNotifications")
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.emailNotifications
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.emailNotifications
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Order Confirmations</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive notifications for new orders
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("orderConfirmations")
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.orderConfirmations
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.orderConfirmations
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Shipping Updates</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive notifications about shipping status changes
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("shippingUpdates")
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.shippingUpdates
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.shippingUpdates
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive promotional emails and offers
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleNotificationToggle("marketingEmails")
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.marketingEmails
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.marketingEmails
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Stock Alerts</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive alerts for low inventory
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleNotificationToggle("stockAlerts")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        notificationSettings.stockAlerts
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.stockAlerts
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={saveSettings}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div
              className={`rounded-lg p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-6">Security Settings</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSecurityToggle("twoFactorAuth")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        securitySettings.twoFactorAuth
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorAuth
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Password Expiry</h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Choose how often users are required to change their
                    passwords
                  </p>
                  <select
                    id="passwordExpiry"
                    name="passwordExpiry"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                    className={`w-full sm:w-64 px-3 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } border focus:outline-none focus:ring-2 ${
                      isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
                    }`}
                  >
                    <option value="never">Never</option>
                    <option value="30days">30 Days</option>
                    <option value="60days">60 Days</option>
                    <option value="90days">90 Days</option>
                    <option value="180days">180 Days</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">IP Restriction</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSecurityToggle("ipRestriction")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        securitySettings.ipRestriction
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.ipRestriction
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Activity Logs</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Keep detailed logs of user activity
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSecurityToggle("activityLogs")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        securitySettings.activityLogs
                          ? isDarkMode
                            ? "bg-blue-600"
                            : "bg-blue-500"
                          : isDarkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.activityLogs
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={saveSettings}
                  className={`px-4 py-2 rounded-md ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === "users" ||
            activeTab === "billing" ||
            activeTab === "integrations") && (
            <div
              className={`rounded-lg p-6 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-6">
                {activeTab === "users"
                  ? "Users & Permissions"
                  : activeTab === "billing"
                  ? "Billing Settings"
                  : "Integrations"}
              </h2>
              <div className="py-12 text-center">
                <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                  {activeTab === "users"
                    ? "User management and role-based permissions settings would appear here."
                    : activeTab === "billing"
                    ? "Billing information, subscription details, and payment methods would appear here."
                    : "Third-party service integration settings would appear here."}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="md:pl-64 lg:pl-72 mt-[8vh]">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
