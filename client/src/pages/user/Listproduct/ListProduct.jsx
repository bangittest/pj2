import React, { useEffect, useState } from "react";
import Instagram from "../Instagram/Instagram";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../utils/fomatVND";
import { instance } from "../../../api/axios";

export default function ListProduct() {
  const [catagories, setCatagories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    instance
      .get("/categories")
      .then((response) => {
        setCatagories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //lấy ra id của category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  //gọi API lấy tất cả thông tin sản phẩm

  const loadDataProduct = async() => {
    await instance
      .get("/products")
      .then((response) => {
        if (categoryId === 0) {
          setProducts(response.data);
        } else {
          const listProduct = response.data.filter(
            (product) => product.category_id === categoryId
          );

          setProducts(listProduct);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);
  return (
    <div>
      <>
        <Navbar />
        {/* Breadcrumb Begin */}
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Shop Section Begin */}
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="shop__sidebar">
                  <div className="sidebar__categories">
                    <div className="section-title">
                      <h4>Categories</h4>
                    </div>
                    <div className="categories__accordion">
                      <div className="accordion" id="accordionExample">
                        {
                          <div
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => getCategoryId(0)}
                          >
                            <div className="card">
                              <a
                                style={
                                  categoryId === 0
                                    ? { textDecoration: "underline" }
                                    : {}
                                }
                                onClick={() => getCategoryId(0)}
                                data-toggle="collapse"
                                data-target="#collapseOne"
                              >
                                All
                              </a>
                            </div>
                          </div>
                        }

                        {catagories.map((cat, index) => (
                          <div
                            key={index}
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => getCategoryId(cat.category_id)}
                          >
                            <div className="card">
                              <a
                                style={
                                  categoryId === cat.category_id
                                    ? { textDecoration: "underline" }
                                    : {}
                                }
                                data-toggle="collapse"
                                data-target="#collapseOne"
                              >
                                {cat.category_name}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="row">
                  {products.map((product, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg>
                          <img
                            className="product__item__pic set-bg image-container"          
                            src={product.image} 
                            alt=""
                          />
                          <div className="label new">New</div>
                          <ul className="product__hover">
                            <li>
                              <Link to={product.image} className="image-popup">
                                <span className="arrow_expand" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <span className="icon_heart_alt" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <span className="icon_bag_alt" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6>
                            <Link to="#">{product.product_name}</Link>
                          </h6>
                          <div className="rating">
                            <i className="fa fa-star">:</i>
                            <i className="fa fa-star">:</i>
                            <i className="fa fa-star">:</i>
                            <i className="fa fa-star">:</i>
                            <i className="fa fa-star" />
                          </div>
                          <div className="product__price">
                            {formatMoney(product.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shop Section End */}
        <Instagram />
        <Footer />
        <Back_To_Top />
      </>
    </div>
  );
}
