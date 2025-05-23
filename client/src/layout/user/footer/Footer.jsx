import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div>
        <>
          {/* Footer Section Begin */}
          <footer className="footer10">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-7">
                  <div className="footer10__about">
                    <div className="footer10__logo">
                      <Link to="./index.html">
                        <img src="./src/assets/img/LOGOWORD_LYRA_BLACK.png" alt="" />
                      </Link>
                    </div>
                    <p>
                      ASHION.COM mang tất cả những gì được các nhà tạo mẫu của
                      chúng tôi lựa chọn cẩn thận.
                    </p>
                    <div className="footer10__payment">
                      <Link to="#">
                        <img
                          src="./src/assets/img/payment/payment-1.png"
                          alt=""
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src="./src/assets/img/payment/payment-2.png"
                          alt=""
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src="./src/assets/img/payment/payment-3.png"
                          alt=""
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src="./src/assets/img/payment/payment-4.png"
                          alt=""
                        />
                      </Link>
                      <Link to="#">
                        <img
                          src="./src/assets/img/payment/payment-5.png"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-5">
                  <div className="footer10__widget text-center">
                    <h6>Đường dẫn nhanh</h6>
                    <ul>
                      <li>
                        <Link to="/about">Giới thiệu</Link>
                      </li>
                      <li>
                        <Link to="/blog">Tin tức</Link>
                      </li>
                      <li>
                        <Link to="/contact">Liên hệ</Link>
                      </li>
                      <li>
                        <Link to="#">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4">
                  <div className="footer10__widget text-center">
                    <h6>LIÊN KẾT NHANH</h6>
                    <ul className="">
                      <li>
                        <Link to="/profile">Tài khoản của tôi</Link>
                      </li>
                      <li>
                        <Link to="/history">Theo dõi đơn hàng</Link>
                      </li>
                      <li>
                        <Link to="/cart">Thủ tục thanh toán</Link>
                      </li>
                      <li>
                        <Link to="#">Danh sách yêu thích</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8 col-sm-8">
                  <div className="footer10__newslatter">
                    <h6>BẢN TIN</h6>
                    <form action="#">
                      <input type="text" placeholder="Email" />
                      <button type="button" className="site-btn">
                        Subscribe
                      </button>
                    </form>
                    <div className="footer10__social">
                      <Link to="#">
                        <i className="fa fa-facebook" />
                      </Link>
                      <Link to="#">
                        <i className="fa fa-twitter" />
                      </Link>
                      <Link to="#">
                        <i className="fa fa-youtube-play" />
                      </Link>
                      <Link to="#">
                        <i className="fa fa-instagram" />
                      </Link>
                      <Link to="#">
                        <i className="fa fa-pinterest" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer10__copyright__text">
                    <p>
                      Copyright © All rights{" "}
                      <i className="fa fa-heart" aria-hidden="true" />{" "}
                      <Link to="#" target="_blank"></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* Footer Section End */}
        </>
      </div>
    </>
  );
}
