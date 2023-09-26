import React from "react";
import Instagram from "../Instagram/Instagram";
import Footer from "../../../layout/user/footer/Footer";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link } from "react-router-dom";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";

export default function Contact({ cartLength, setIsLoad }) {
  return (
    <div>
      <Navbar cartLength={cartLength} />
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Contact Section Begin */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__content">
                <div className="contact__address">
                  <h5>Contact info</h5>
                  <ul>
                    <li>
                      <h6>
                        <i className="fa fa-map-marker" /> Address
                      </h6>
                      <p>Toà Nhà Sông Đà, Phạm Hùng, Mễ Trì, Từ Liêm, Hà Nội</p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-phone" /> Phone
                      </h6>
                      <p>
                        <span>0968-783-032</span>
                        <span>0962-333-999</span>
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-headphones" /> Support
                      </h6>
                      <p>Support.rikkei@gmail.com</p>
                    </li>
                  </ul>
                </div>
                <div className="contact__form">
                  <h5>SEND MESSAGE</h5>
                  <form action="#">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Website" />
                    <textarea placeholder="Message" defaultValue={""} />
                    <button type="primary" className="site-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3696135340274!2d105.7788341749933!3d21.01789188062873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c862f3aee1%3A0x53602e8d02ec1d24!2zVG_DoCBOaMOgIFPDtG5nIMSQw6A!5e0!3m2!1svi!2s!4v1694331890158!5m2!1svi!2s"
                  width={600}
                  height={780}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}
      <Instagram />
      <Back_To_Top />
      <Footer />
    </div>
  );
}
