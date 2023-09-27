import React from "react";
import "./header.css";
import {
  BellOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Button, Dropdown, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import confirm from "antd/es/modal/confirm";

export default function Header() {
  const navigate = useNavigate();
  // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));
  // console.log(userLogin);
  //
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLocal");
    // chuyen huong ve trang chu
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      onOk() {
        handleLogout();
      },
      cancelText: "Hủy",
      okText: "Đồng ý",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <UserAddOutlined className=" mr-2" />
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/change-password"}>
          <KeyOutlined className=" mr-2" />
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className=" mr-2" />
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <>
      <header className=" border bg-gray-200 py-4 drop-shadow-sm w-full">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
          <div className="flex justify-center flex-1 lg:mr-32">
            {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2"> */}
            {/* <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg> */}
            {/* </div> */}
            {/* <input className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" type="text" placeholder="Search ..." aria-label="Search" /> */}
            {/* </div> */}
          </div>
          <ul className="flex items-center flex-shrink-0 space-x-6">
            {/* <li className="relative">
              <button
                className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>

                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                />
              </button>
              <template x-if="isNotificationsMenuOpen" />
            </li> */}
            {/* Profile menu */}
            <li className="relative">
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow
              >
                <Button className="border-none shadow-none text-white hover:text-white">
                  <div className="flex items-center gap-2">
                    <img
                      className="rounded-full"
                      src={userLogin.image}
                      height={26}
                      width={26}
                      style={{ objectFit: "cover" }}
                    />
                    <div className="nameColor" style={{ color: "black" }}>
                      {userLogin.user_name}
                    </div>
                  </div>
                </Button>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
