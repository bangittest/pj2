import React, { useState } from "react";
import "./change_password.css";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import { Link } from "react-router-dom";
import axios from "axios";
import {notification } from "antd";
export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const email = userLocal?.email; // Lấy id từ localStorage

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const validateField = (field, value) => {
    const newErrors = {};
    if (!value) {
      newErrors[field] = "Trường này không được để trống";
    }
    if (
      field === "confirmPassword" &&
      value !== formData.newPassword
    ) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allErrors = {
      ...validateField("oldPassword", formData.oldPassword),
      ...validateField("newPassword", formData.newPassword),
      ...validateField("confirmPassword", formData.confirmPassword),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/users/change-password/${email}`,
        formData
      );
      // setMessage(response.data.message);
      notification.success({
        message: "Thành công",
        description: response.data.message,
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi đổi mật khẩu";
      setMessage(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-xs m-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md mt-10 rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-center mb-4">
            <h1>Đổi mật khẩu</h1>
          </div>

          {["oldPassword", "newPassword", "confirmPassword"].map((field, index) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field === "oldPassword"
                  ? "Mật khẩu cũ"
                  : field === "newPassword"
                  ? "Mật khẩu mới"
                  : "Xác nhận mật khẩu mới"}
              </label>
              <input
                type="password"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {message && (
            <div className="text-center text-sm text-blue-600 font-medium mb-4">
              {message}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link className="text-blue-500 hover:text-blue-800 text-sm" to="/">
              Quay lại
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <Back_To_Top />
    </>
  );
}
