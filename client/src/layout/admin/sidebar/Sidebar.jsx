import React, { useState } from "react";
import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("");

  // Function to set the active link
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  return (
    <>
      {/* <aside className="hidden h-auto w-64 overflow-y-auto dark:bg-gray-800 md:block flex-shrink-0 border-x-2">
        <div className="text-white bg-black py-4  dark:text-gray-400 h-screen">
          <NavLink
            className="ml-6  text-lg font-bold text-gray-800 dark:text-gray-200"
            to="#"
          >
            Admin
          </NavLink>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                to="/admin"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="users"
              >
                <svg
                  className="h5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <style
                    dangerouslySetInnerHTML={{ __html: "svg{fill:#96a3bb}" }}
                  />
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>

                <span className="ml-4">Quản lý khách hàng</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="products"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className="ml-4">Quản lý sản phẩm</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="order"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span className="ml-4">Quản lý đơn hàng</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="categoris"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
                <span className="ml-4">Quản lý danh mục</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside> */}
      <aside className="hidden h-auto w-64 overflow-y-auto dark:bg-gray-800 md:block flex-shrink-0 border-x-2">
        <div className="bg-blue-500  py-4  dark:text-gray-400 h-screen">
          <NavLink
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="#"
          >
            Admin
          </NavLink>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <NavLink
                style={{ color: "white" }}
                className={` inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                  activeLink === "dashboard"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-100"
                }`}
                to="/admin"
                onClick={() => handleSetActiveLink("dashboard")}
              >
                <svg
                  style={{ color: "white" }}
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <NavLink
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                  activeLink === "users"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-100"
                }`}
                to="users"
                onClick={() => handleSetActiveLink("users")}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <style
                    dangerouslySetInnerHTML={{ __html: "svg{fill:#dde1e9}" }}
                  />
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>

                <span className="ml-4">Quản lý khách hàng</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                  activeLink === "products"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-100"
                }`}
                to="products"
                onClick={() => handleSetActiveLink("products")}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className="ml-4">Quản lý sản phẩm</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                  activeLink === "order"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-100"
                }`}
                to="order"
                onClick={() => handleSetActiveLink("order")}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <span className="ml-4">Quản lý đơn hàng</span>
              </NavLink>
            </li>
            <li className="relative px-6 py-3">
              <NavLink
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                  activeLink === "categories"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-100"
                }`}
                to="categoris"
                onClick={() => handleSetActiveLink("categories")}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
                <span className="ml-4">Quản lý danh mục</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
