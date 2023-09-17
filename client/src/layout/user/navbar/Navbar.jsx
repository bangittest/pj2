import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  KeyOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import confirm from "antd/es/modal/confirm";
import "../navbar/navbar.css";
import Seach from "../seach/Seach";


export default function Navbar() {



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
  console.log(userLogin);
  //
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLocal");
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
    <div>
      <>
        {/* //seach */}
        {isOpen ? (
          <>
            <Seach closeSeach={closeSeach} />
          </>
        ) : (
          <></>
        )}
        {/* Page Preloder */}

        {/* Offcanvas Menu Begin */}
        <div className={`offcanvas-menu-overlay ${isMenuOpen ? 'open' : ''}`} />
        <div className="offcanvas-menu-wrapper active">
          <div className="offcanvas__close">+</div>
          <ul className="offcanvas__widget">
            <li>
              <span className="icon_search search-switch" />
            </li>
            <li>
              <Link to="#">
                <span className="icon_heart_alt" />
                <div className="tip">2</div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span className="icon_bag_alt" />
                <div className="tip">2</div>
              </Link>
            </li>
          </ul>
          <div className="offcanvas__logo">
            <Link to="/">
              <img src="img/logo.png" alt="" />
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
            isNavbarFixed ? "fixed top-0 left-0 w-full bg-white z-50" : ""
          }`}
        >
          <div className="container-fluid fxes">
            <div className="row">
              <div className="col-xl-3 col-lg-2">
                <div className="header__logo">
                  <Link to="/">
                    <img src="./src/assets/img/logo.png" alt="" />
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
                      <Link to="/">Home</Link>
                    </li>
                    <li
                     className={activeItem === "women" ? "active" : ""}
                     onClick={() => handleItemClick("women")}
                    >
                      <Link to="#">Women’s</Link>
                    </li>
                    <li
                     className={activeItem === "shop" ? "active" : ""}
                     onClick={() => handleItemClick("shop")}
                    >
                      <Link to="/list-product">Shop</Link>
                    </li>
                    <li>
                      <Link to="#">Pages</Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="./product-details.html">
                            Product Details
                          </Link>
                        </li>
                        <li>
                          <Link to="/blog">Blog</Link>
                        </li>
                      </ul>
                    </li>
                    <li
                     className={activeItem === "blog" ? "active" : ""}
                     onClick={() => handleItemClick("blog")}
                    >
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li
                     className={activeItem === "about" ? "active" : ""}
                     onClick={() => handleItemClick("about")}
                    >
                      <Link to="/about">About</Link>
                    </li>
                    <li
                     className={activeItem === "contact" ? "active" : ""}
                     onClick={() => handleItemClick("contact")}
                    >
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3">
                <div className="header__right">
                  <div className="header__right__auth">
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
                            style={{ color: "#111111", fontWeight: 400,fontSize:"15px" }}
                            className="border-none shadow-none  hover:text-white"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                className="rounded-full"
                                src={userLogin.image}
                                height={26}
                                width={26}
                                style={{objectFit:"cover"}}
                                // alt="avatar"
                              />
                              {userLogin.user_name}
                            </div>
                          </Button>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                      </>
                    )}
                  </div>
                  <ul className="header__right__widget">
                    <li onClick={toggleSearch}>
                      <span className="icon_search search-switch" />
                    </li>
                    <li>
                      <Link to="#">
                        <span className="icon_heart_alt" />
                        <div className="tip">2</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <span className="icon_bag_alt" />
                        <div className="tip">2</div>
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
