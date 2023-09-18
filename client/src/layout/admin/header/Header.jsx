import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <h1 className="text-white text-2xl">Admin Navbar</h1>
    </nav>
  );
};

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64">
      <ul className="py-4">
        <li className="py-2 px-4 hover:bg-gray-800">
          <a href="/">Dashboard</a>
        </li>
        <li className="py-2 px-4 hover:bg-gray-800">
          <a href="/users">Users</a>
        </li>
        <li className="py-2 px-4 hover:bg-gray-800">
          <a href="/products">Products</a>
        </li>
        {/* Thêm các mục menu khác ở đây */}
      </ul>
    </aside>
  );
};