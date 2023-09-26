import React from "react";

export default function Services() {
  return (
    <div>
      <>
        {/* Services Section Begin */}
        <section className="services spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                  <i className="fa fa-car" />
                  <h6>Free Shipping</h6>
                  <p>Cho tất cả các đơn hàng trên 99k</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                  <i className="fa fa-money" />
                  <h6>Nếu Có Vấn Đề</h6>
                  <p>Đảm bảo hoàn lại tiền</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                  <i className="fa fa-support" />
                  <h6>Hỗ trợ trực tuyến 24/7</h6>
                  <p>Hỗ trợ chuyên dụng</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="services__item">
                  <i className="fa fa-headphones" />
                  <h6>Thanh toán an toàn</h6>
                  <p>Thanh toán an toàn 100%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section End */}
      </>
    </div>
  );
}
