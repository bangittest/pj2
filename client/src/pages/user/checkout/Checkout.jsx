import React, { useEffect, useState } from "react";
import { notification } from 'antd';
import Instagram from "../Instagram/Instagram";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layout/user/footer/Footer";
import Navbar from "../../../layout/user/navbar/Navbar";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import { instance } from "../../../api/axios";
import { formatMoney } from "../../../utils/validateData";

export default function Contact({ cartLength, setIsLoad }) {
  const [cartUser, setCartUser] = useState();
  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const carts = JSON.parse(localStorage.getItem("carts"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [cartsLength, setCartsLength] = useState(0);
  const [products, setProducts] = useState([]);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [load, setLoad] = useState(false);
  const productCart = [];
  const navigate = useNavigate();
  let sum = 0;


  
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (userLocal === null) {
    navigate("/login");
  }

  useEffect(() => {
    // 1. Gọi sản phẩm luôn
    instance
      .get("api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log("❌ Error fetching products:", error));

    // 2. Lấy user từ localStorage
    const user = JSON.parse(localStorage.getItem("userLocal"));

    if (user?.id) {
      // 3. Gọi giỏ hàng
      instance
        .get(`api/cart/${user.id}`)
        .then((response) => {
          setCartUser(response.data);
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setCartUser({ items: [] }); // fallback nếu không có cart
          } else {
            console.log("❌ Error fetching cart:", error);
          }
        });
    } else {
      console.warn("⚠️ Không tìm thấy user trong localStorage");
    }
  }, []);

  if (products.length > 0 && cartUser && Array.isArray(cartUser.items)) {
    cartUser.items.forEach((pr) => {
      const matchedProduct = products.find((pro) => pro.id === pr.product_id);
      if (matchedProduct) {
        productCart.push({ ...matchedProduct, quantity: pr.quantity, cartItemId: pr.id });
      }
    });
  }



const handleCheckout = (e) => {
  e.preventDefault();

  // Kiểm tra thông tin nhập vào
  if (!fullName || !address || !city || !zipCode || !phone || !email) {
    notification.error({
      message: "Vui lòng điền đầy đủ thông tin.",
      description: "Tất cả các trường có dấu * là bắt buộc.",
    });
    return;
  }

  // Chuẩn bị dữ liệu đơn hàng
  const orderData = {
    userId: userLocal.id,
    fullName,
    country: "Việt Nam",
    address,
    city,
    zipCode,
    phone,
    email,
    note,
    totalAmount: sum,
    cartItems: productCart.map(item => ({
      product_id: item.id,
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  // Gửi yêu cầu POST để tạo đơn hàng
  instance
    .post("/api/order", orderData)
    .then((response) => {
      // Khi tạo đơn hàng thành công
      notification.success({
        message: "Đặt hàng thành công!",
        description: "Đơn hàng của bạn đã được gửi đi thành công. Chúng tôi sẽ xử lý và thông báo sớm.",
      });
      instance
  .delete(`/api/cart/user/${userLocal.id}`)
  .then((response) => {

  })
  .catch((error) => {
    // Log lỗi chi tiết ra console để kiểm tra
    console.error('Error details:', error);

    notification.error({
      message: "Lỗi khi lấy giỏ hàng",
      description: error?.response?.data?.error || "Có lỗi xảy ra, vui lòng thử lại.",
    });
  });

      navigate(`/history`);
    })
    .catch((error) => {
      const message = error?.response?.data?.error;

      if (message) {
        // Nếu có thông báo lỗi cụ thể từ backend
        notification.error({
          message: "Lỗi khi đặt hàng",
          description: message,
        });
      } else {
        // Lỗi không xác định
        notification.error({
          message: "Lỗi không xác định",
          description: "Có lỗi xảy ra trong quá trình đăng ký đơn hàng. Vui lòng thử lại.",
        });
      }

      console.error("❌ Lỗi khi đặt hàng:", error);
    });
};


  return (
    <div>
      <Navbar />
      {/* Checkout Section */}
      <section className="checkout spad">
        <div className="container">
          <form action="#" className="checkout__form">
            <div className="row">
              <div className="col-lg-8">
                <h5>Chi tiết thanh toán</h5>
                <div className="checkout__form__input">
                  <p>Họ Tên <span>*</span></p>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Địa chỉ <span>*</span></p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Thành phố/Thị trấn <span>*</span></p>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Mã bưu điện/Zip <span>*</span></p>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Số điện thoại <span>*</span></p>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Email <span>*</span></p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="checkout__form__input">
                  <p>Ghi chú</p>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="checkout__order">
                  <h5>Đơn hàng của bạn</h5>
                  <div className="checkout__order__product">
                    <ul>
                      <li>
                        <span className="top__text">Sản phẩm</span>
                        <span className="top__text__right">Tổng</span>
                      </li>
                      {productCart.map((e, index) => {
                        sum += e.price * e.quantity;
                        return (
                          <li key={index}>
                            {e.product_name} x {e.quantity} <span>{formatMoney(e.price * e.quantity)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="checkout__order__total">
                    <ul>
                      <li>
                        Tổng cộng <span>{formatMoney(sum)}</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="submit"
                    onClick={handleCheckout}
                    className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Instagram />
      <Back_To_Top />
      <Footer />
    </div>
  );
}
