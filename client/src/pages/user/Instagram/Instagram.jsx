import React from "react";
import { Link } from "react-router-dom";

export default function Instagram() {
  return (
    <div>
      <>
        {/* Instagram Begin */}
        <div className="instagram">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-1.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-2.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-3.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-4.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-5.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="product__item">
                  <div
                    className=" product__item__pic set-bg image-container "
                    data-setbg
                  >
                    <img
                      className="product__item__pic set-bg image-container"
                      style={{ objectFit: "cover", borderRadius: "2px" }}
                      src="./src/assets/img/instagram/insta-6.jpg"
                      alt=""
                    />
                    <ul className="product__hover">
                      <li>
                        <Link to="#">
                          <span className="fa fa-instagram" />
                          <span>@as</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Instagram End */}
      </>
    </div>
  );
}
