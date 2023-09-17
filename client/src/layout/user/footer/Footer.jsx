import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div>
        <>
          {/* Footer Section Begin */}
          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-7">
                  <div className="footer__about">
                    <div className="footer__logo">
                      <Link to="./index.html">
                        <img src="./src/assets/img/logo.png" alt="" />
                      </Link>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt cilisis.
                    </p>
                    <div className="footer__payment">
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
                  <div className="footer__widget">
                    <h6>Quick links</h6>
                    <ul>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="#">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4">
                  <div className="footer__widget">
                    <h6>Account</h6>
                    <ul>
                      <li>
                        <Link to="#">My Account</Link>
                      </li>
                      <li>
                        <Link to="#">Orders Tracking</Link>
                      </li>
                      <li>
                        <Link to="#">Checkout</Link>
                      </li>
                      <li>
                        <Link to="#">Wishlist</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8 col-sm-8">
                  <div className="footer__newslatter">
                    <h6>NEWSLETTER</h6>
                    <form action="#">
                      <input type="text" placeholder="Email" />
                      <button type="button" className="site-btn">
                        Subscribe
                      </button>
                    </form>
                    <div className="footer__social">
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
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  <div className="footer__copyright__text">
                    <p>
                      Copyright © All rights reserved | This template is made
                      with <i className="fa fa-heart" aria-hidden="true" /> by{" "}
                      <Link to="#" target="_blank">
                        Colorlib
                      </Link>
                    </p>
                  </div>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
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
