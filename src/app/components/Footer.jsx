"use client";

export default function Footer({ isDarkMode }) {
  return (
    <footer
      className={`border-t w-full fixed bottom-0 left-0 right-0 z-20 ${
        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      }`}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6 px-4">
        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
        </div>
        <nav
          className={`flex flex-wrap gap-4 justify-center md:justify-end text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <a
            href="#"
            className={`hover:${
              isDarkMode ? "text-white" : "text-gray-900"
            } transition-colors`}
          >
            Privacy
          </a>
          <a
            href="#"
            className={`hover:${
              isDarkMode ? "text-white" : "text-gray-900"
            } transition-colors`}
          >
            Terms
          </a>
          <a
            href="#"
            className={`hover:${
              isDarkMode ? "text-white" : "text-gray-900"
            } transition-colors`}
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
