import React from "react";
import "./change_password.css";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-xs m-auto ">
        <form className="bg-white shadow-md mt-10 rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-center">
            <h1>new password</h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="underline inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/"
            >
              Back
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <Back_To_Top />
    </>
  );
}
