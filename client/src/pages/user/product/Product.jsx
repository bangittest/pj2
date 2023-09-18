
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api/axios";

export default function Product() {
  const [catagories, setCatagories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    instance
      .get("/categories")
      .then((response) => {
        // console.log(response.data);
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

  const loadDataProduct = async () => {
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


  // Lấy ngẫu nhiên 8 sản phẩm từ mảng
  const randomProducts = products.slice().sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div>
      <>
        {/* Product Section Begin */}
        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="section-title">
                  <h4>New product</h4>
                </div>
              </div>
              <div className="col-lg-8 col-md-8">
                <ul className="filter__controls">
                  <li onClick={() => setCategoryId(0)} className={
                    categoryId === 0
                      ? "active"
                      : {}
                  }>
                    All
                  </li>
                  {catagories.map((cat, index) => (
                    <li onClick={() => getCategoryId(cat.category_id)} key={index} className={
                      categoryId === cat.category_id
                        ? "active"
                        : {}
                    }>{cat.category_name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row property__gallery">
              {randomProducts.map((product, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 mix women"
                >
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
                      <div className="product__price">{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
          </div>
        </section>
        {/* Product Section End */}
      </>
    </div>
  );
}
