import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layout/user/footer/Footer";
import { instance } from "../../../api/axios";
import { formattedAmount } from "../../../utils/fomatMoney";
import { notification } from "antd";
import { formatMoney } from "../../../utils/validateData";

export default function Description({ cartLength, setIsLoad }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState();
  const { id } = useParams();

  useEffect(() => {
    instance
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  }, []);
  // console.log(product);

  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));

  const handleAddtoCart = async () => {
    if (userLocal == null) {
      notification.warning({
        message: "Thất bại",
        description: "Vui lòng hãy đăng nhập",
      });
      navigate("/login");
    } else if (userLocal) {
      const cartUser = carts.cart;
      const Index = cartUser.findIndex((pro) => pro.idProduct === product.id);
      if (Index == -1) {
        cartUser.push({ idProduct: product.id, quantity: 1 });
        // console.log("them moi");
        notification.success({
          message: "Thành công",
          description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
        });
      } else {
        if (+cartUser[Index].quantity >= +product.quantity) {
          // console.log("Qua so luong");
          notification.error({
            message: "Thất bại",
            description: `Số lượng trong kho đã hết`,
          });
          return;
        }
        cartUser[Index].quantity += 1;
        // console.log("+1");
        notification.success({
          message: "Thành công",
          description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
        });
      }
      await instance.put(`/carts/${CartId}`, { ...carts, cart: cartUser });
      localStorage.setItem("carts", JSON.stringify(cartUser));
    }
    setIsLoad((pre) => !pre);
  };

  useEffect(() => {
    instance
      .get(`/carts/${CartId}`)
      .then((response) => setCarts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
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
                {/* <a href="#">Women’s </a> */}
                <span>Description</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Product Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row p-8 bg-gray-100 rounded-lg">
            <div className="col-lg-6">
              <div className="product__details__pic">
                <Link to="#">
                  <img
                    width={300}
                    height={350}
                    style={{ objectFit: "cover" }}
                    src={product.image}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 w-3/5">
              <div className="product__details__text">
                <h3 className="text-2xl font-semibold">
                  {product.product_name}
                </h3>
                <div className="rating">
                  <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                  <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                  <i className="fa fa-star" />
                  <span className="text-gray-500">(138 reviews)</span>
                </div>
                <div className="product__details__price mt-4 text-3xl font-semibold">
                  {formatMoney(product.price)}
                </div>
                <div className="product__details__text mt-6">
                  <h3 className="text-lg font-semibold">Xuất xứ</h3>
                </div>
                <p className="text-gray-600">{product.from}</p>
                <div className="product__details__text mt-6">
                  <h3 className="text-lg font-semibold">Mô tả</h3>
                </div>
                <p className="text-gray-600">{product.description}</p>
                <div className="product__details__button mt-6">
                  <Link
                    onClick={() => handleAddtoCart(product.id)}
                    to="#"
                    className="cart-btn"
                  >
                    <span className="icon_bag_alt mr-2" /> Add to cart
                  </Link>
                </div>
                <div className="product__details__widget mt-6">
                  <ul>
                    <li>
                      <span className="font-semibold">Promotions:</span>
                      <p>Free shipping</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="product__details__tab mt-8">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-toggle="tab"
                      to="#tabs-1"
                      role="tab"
                    >
                      Mô tả
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6 className="text-lg font-semibold mt-4">
                      Mô tả chi tiết
                    </h6>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section End */}
      <Footer />
    </>
  );
}
