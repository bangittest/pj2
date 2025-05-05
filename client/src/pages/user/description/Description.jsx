import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layout/user/footer/Footer";
import { instance } from "../../../api/axios";
import { formattedAmount } from "../../../utils/fomatMoney";
import { Image, notification } from "antd";
import { formatMoney } from "../../../utils/validateData";

export default function Description({ cartLength, setIsLoad }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState();
  const { id } = useParams();

  useEffect(() => {
    instance
      .get(`/api/products/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          console.error("Không tìm thấy sản phẩm.");
        }
      })
      .catch((error) => console.log("Lỗi khi lấy sản phẩm:", error));  // In lỗi nếu có
  }, [id]);  // Thêm id vào dependency array để gọi lại khi id thay đổi

  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));

  const handleAddtoCart = async () => {
    if (!userLocal) {
      notification.warning({
        message: "Thất bại",
        description: "Vui lòng hãy đăng nhập",
      });
      navigate("/login");
    } else {
      try {
        const cartId = JSON.parse(localStorage.getItem("cartId"));
        const res = await instance.post('/api/cart/add', {
          cart_id: cartId,
          product_id: product.id,
          quantity: 1
        });
  
        notification.success({
          message: "Thành công",
          description: `Sản phẩm đã được thêm vào giỏ hàng`,
        });
        setIsLoad(prev => !prev); // Cập nhật lại giỏ hàng nếu cần
      } catch (error) {
        notification.error({
          message: "Thất bại",
          description: error.response?.data?.error || "Có lỗi xảy ra.",
        });
      }
    }
  };
  

  useEffect(() => {
    instance
      .get(`/api/carts/${CartId}`)
      .then((response) => setCarts(response.data))
      .catch((error) => console.log(error));
  }, [CartId]);

  return (
    <>
      <Navbar cartLength={cartLength} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Description</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="product-details spad">
        <div className="container">
          <div className="justify-center row p-8 bg-gray-100 rounded-lg gap-20">
            <div className="">
              <div className="product__details__pic">
                <Link to="#">
                  <Image
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
                </div>
                <div className="product__details__price text-3xl font-semibold">
                  {formatMoney(product.price)}
                </div>

                <div className="product__details__text">
                  <h3 className="text-lg font-semibold">Xuất xứ</h3>
                </div>
                <p className="text-gray-600">{product.from}</p>

                <div className="product__details__text">
                  <h3 className="text-lg font-semibold">Mô tả</h3>
                </div>

                <p className="text-gray-600"> {product.description}...</p>
                <div className="product__details__button mt-6">
                  <Link
                    onClick={handleAddtoCart}
                    to="#"
                    className="cart-btn"
                  >
                    <span className="icon_bag_alt mr-2" /> Add to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
