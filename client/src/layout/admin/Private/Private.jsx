import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  const isLogin = JSON.parse(localStorage.getItem("userLocal"));
  // console.log(isLogin.role);
  return (
    <div>
      {isLogin && isLogin.role === 0 ? (
        <>
          <div className="flex">
            <Sidebar />
            <div className="w-full">
              <div className="flex flex-col">
                <Header />
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="404" />
      )}
    </div>
  );
}
