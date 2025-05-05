import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  UserAddOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { instance } from "../../../api/axios";
import confirm from "antd/es/modal/confirm";
import "../navbar/navbar.css";
import Seach from "../seach/Seach";

export default function Navbar({ setIsLoad, cartLength }) {

  const [count, setCount] = useState(0);
  const [isLoad, setIsLoad1] = useState(false);


  // console.log("===> cartUser: ", cartUser);
  const [activeItem, setActiveItem] = useState(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  //seach
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };
  const closeSeach = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();
  // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));
  //



  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userLocal"));
    // console.log("🧾 [LOG] userLocal:", userLocal); // Kiểm tra userLocal

    if (userLocal && userLocal.id) {
      instance
        .get(`api/cart/count/${userLocal.id}`)
        .then((res) => {
          // console.log("✅ [LOG] API response:", res.data); // Kiểm tra dữ liệu trả về từ API

          setCount(res.data.totalItems || 0); // Cập nhật count giỏ hàng
          setIsLoad1((prev) => !prev); // Cập nhật trạng thái load lại component nếu cần thiết
        })
        .catch((err) => {
          console.error("❌ [LOG] Lỗi gọi API đếm giỏ hàng:", err); // In lỗi nếu gọi API lỗi
        });
    } else {
      console.warn("⚠️ [LOG] userLocal không tồn tại hoặc thiếu id.");
    }
  }, [isLoad]);
  
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLocal");
    localStorage.removeItem("carts");
    // chuyen huong ve trang chu
    navigate("/");
  };

  // ham xu li dang xuat
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
        <Link to={"/changepasswords"}>
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

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra vị trí cuộn trang
      if (window.scrollY > 100) {
        // Khi cuộn xuống hơn 100px, đặt thanh navbar thành fixed
        setIsNavbarFixed(true);
      } else {
        // Khi cuộn lên trên 100px, loại bỏ thuộc tính fixed
        setIsNavbarFixed(false);
      }
    };

    // setIsLoadCartLength((pre) => !pre);

    // Lắng nghe sự kiện cuộn trang khi component được mount
    window.addEventListener("scroll", handleScroll);

    // Hủy lắng nghe sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //active thanh navbar
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hàm để mở hoặc đóng menu khi ấn nút menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="shadow">
      <>
        {/* //seach */}
        {/* {isOpen ? (
          <>
            <Seach closeSeach={closeSeach} />
          </>
        ) : (
          <></>
        )} */}
        {/* Page Preloder */}

        {/* Offcanvas Menu Begin */}
        <div className={`offcanvas-menu-overlay ${isMenuOpen ? "open" : ""}`} />
        <div className="offcanvas-menu-wrapper active">
          <div className="offcanvas__close">+</div>
          <ul className="offcanvas__widget">
            <li>
              <span className="icon_search search-switch" />
            </li>
            <li>
              <Link to="#">
                <span className="icon_heart_alt" />
                <div className="tip"></div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span className="icon_bag_alt" />
                <div className="tip"></div>
              </Link>
            </li>
          </ul>
          <div className="offcanvas__logo">
            <Link to="/">
              <img className="z-50" src="./src/assets/img/logo.png" alt="" />
            </Link>
          </div>
          <div id="mobile-menu-wrap " />
          <div className="offcanvas__auth">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        {/* Offcanvas Menu End */}
        {/* Header Section Begin */}
        <header
          className={`"header" ${
            isNavbarFixed
              ? "fixed shadow top-0 left-0 w-full bg-white z-50"
              : ""
          }`}
        >
          <div className="container-fluid fxes">
            <div className="row">
              <div className="col-xl-3 col-lg-7">
                <div className="header__logo">
                  <Link to="/">
                  <img
                className="w-[90px] h-[23px] z-50"
                src="./src/assets/img/logo.png"
                alt=""
                  />

                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7">
                <nav className="header__menu ">
                  <ul>
                    <li
                      className={activeItem === "home" ? "active" : ""}
                      onClick={() => handleItemClick("home")}
                    >
                      <Link to="/">Trang chủ</Link>
                    </li>
                    {/* <li
                     className={activeItem === "women" ? "active" : ""}
                     onClick={() => handleItemClick("women")}
                    >
                      <Link to="#">Women’s</Link>
                    </li> */}
                    <li
                      className={activeItem === "shop" ? "active" : ""}
                      onClick={() => handleItemClick("shop")}
                    >
                      <Link to="/list-product">Sản phẩm</Link>
                    </li>
                    {/* <li>
                      <Link to="#">Pages</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="#">
                            Product Details
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                      </ul>
                    </li> */}
                    <li
                      className={activeItem === "blog" ? "active" : ""}
                      onClick={() => handleItemClick("blog")}
                    >
                      <Link to="/blog">Tin Tức</Link>
                    </li>
                    <li
                      className={activeItem === "about" ? "active" : ""}
                      onClick={() => handleItemClick("about")}
                    >
                      <Link to="/about">Giới Thiệu</Link>
                    </li>
                    <li
                      className={activeItem === "contact" ? "active" : ""}
                      onClick={() => handleItemClick("contact")}
                    >
                      <Link to="/contact">Liên Hệ</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3">
                <div className="header__right">
                  <div className="header__right__auth1">
                    {userLogin !== null ? (
                      <>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          placement="bottom"
                          arrow
                        >
                          <Button
                            style={{
                              color: "#111111",
                              fontWeight: 400,
                              fontSize: "15px",
                            }}
                            className="border-none shadow-none  hover:text-white"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                className="rounded-full"
                                src={userLogin.image}
                                height={20}
                                width={20}
                                style={{ objectFit: "cover" }}
                                // alt="avatar"
                              />
                              {userLogin.user_name}
                            </div>
                          </Button>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <div className="flex">
                            <div>
                              <svg
                                fontSize={24}
                                xmlns="http://www.w3.org/2000/svg"
                                height="0.875em"
                                viewBox="0 0 448 512"
                              >
                                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                              </svg>
                            </div>
                            <div className="">+Đăng nhập</div>
                          </div>
                        </Link>
                        {/* <Link to="/register">Register</Link> */}
                      </>
                    )}
                  </div>
                  <ul className="header__right__widget pr-4">
                    {/* <li onClick={toggleSearch}>
                      <span className="icon_search search-switch" />
                    </li> */}
                    <li>
                      <Link to="/history">
                        {/* <span className="icon_heart_alt" /> */}
                        <span style={{ fontSize: "26px" }}>
                          <BellOutlined />
                        </span>
                        {/* <div className="tip"></div> */}
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <span
                          style={{ fontSize: "25px" }}
                          className="icon_bag_alt"
                        />

                        <div className="tip">{count}</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div onClick={toggleMenu} className="canvas__open">
              <i className="fa fa-bars" />
            </div>
          </div>
        </header>

        {/* Header Section End */}
      </>
    </div>
  );
}
