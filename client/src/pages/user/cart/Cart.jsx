import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../../../layout/user/footer/Footer";
import { instance } from "../../../api/axios";
import { Button, Input, Modal, notification } from "antd";
import { formatMoney } from "../../../utils/validateData";

export default function Cart({ cartLength, setIsLoad }) {
  const [cartUser, setCartUser] = useState();
  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const carts = JSON.parse(localStorage.getItem("carts"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [cartsLength, setCartsLength] = useState(0);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");

  const [load, setLoad] = useState(false);
  const productCart = [];
  const navigate = useNavigate();
  let sum = 0;

  //check dang nhap moi dc vao gio hang
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (userLocal === null) {
    notification.error({
      message: "Thất bại",
      description: "Vui lòng hãy đăng nhập",
    });
    navigate("/login");
  }

  //modal xóa
  const showModal = (productId) => {
    setDeleteProductId(productId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (deleteProductId !== null) {
      handleDelete(deleteProductId);
      setIsModalOpen(false);
      setDeleteProductId(null);
      carts.filter((item) => item.idProduct !== deleteProductId);
      localStorage.setItem("carts", JSON.stringify(carts));
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Hàm cập nhật cartsLength từ localStorage
  const updateCartsLength = () => {
    const cartsLocalStorage = JSON.parse(localStorage.getItem("carts"));
    const length = cartsLocalStorage ? cartsLocalStorage.length : 0;
    setCartsLength(length);
  };

  // Cart.leng
  useEffect(() => {
    // Đảm bảo rằng state được cập nhật ban đầu
    updateCartsLength();
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = async (id) => {
    // Lọc ra danh sách sản phẩm sau khi xóa sản phẩm cụ thể
    const newCart = cartUser.cart.filter((pro) => pro.idProduct !== id);

    // Gửi yêu cầu cập nhật giỏ hàng lên API và lưu trữ trên localStorage
    setLoad(true);
    try {
      const response = await instance.put(`/carts/${CartId}`, {
        ...cartUser,
        cart: newCart,
      });
      setCartUser(response.data);

      // Xóa sản phẩm khỏi danh sách sản phẩm trong giỏ hàng của bạn trên localStorage
      const updatedCarts = carts.filter((item) => item.idProduct !== id);
      localStorage.setItem("carts", JSON.stringify(updatedCarts));

      // Gọi hàm cập nhật cartsLength để đồng bộ hóa với dữ liệu mới
      updateCartsLength();

      // Hiển thị thông báo thành công
      notification.success({
        message: "Xóa thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      });
      setIsLoad((pre) => !pre);
    } catch (error) {
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      notification.error({
        message: "Lỗi xóa sản phẩm khỏi giỏ hàng",
        description: "Lỗi khi xóa sản phẩm khỏi giỏ hàng.",
      });
    } finally {
      setLoad(false);
    }
  };

  // Hàm xử lý giảm
  const handleDecrease = (proId) => {
    const index = cartUser.cart.findIndex((pro) => pro.idProduct == proId);
    const proPre = products.find((p) => p.id == proId);
    if (cartUser.cart[index].quantity > 1) {
      cartUser.cart[index].quantity -= 1;
      setLoad(true);
      instance
        .put(`/carts/${CartId}`, cartUser)
        .then((response) =>
          notification.success({
            message: "Thành công",
            description: "Số lượng đã được thay đổi",
          })
        )
        .finally(() => setLoad(false));
    } else {
      handleDelete(proId);
    }
    setIsLoad((pre) => !pre);
  };
  // Hàm xử lý tăng
  const handleIncrease = (proId) => {
    const index = cartUser.cart.findIndex((pr) => pr.idProduct == proId);
    const proPre = products.find((p) => p.id == proId);
    if (cartUser.cart[index].quantity >= proPre.quantity) {
      notification.warning({
        message: "Cảnh báo",
        description: "Số lượng trong giỏ hàng đã đạt mức tối đa",
      });
      return;
    }
    cartUser.cart[index].quantity += 1;

    setLoad(true);
    instance
      .put(`/carts/${CartId}`, cartUser)
      .then((response) =>
        notification.success({
          message: "Thành công",
          description: "Số lượng đã được thay đổi",
        })
      )
      .finally(() => setLoad(false));
    setIsLoad((pre) => !pre);
  };

  useEffect(() => {
    instance
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
    instance
      .get(`/carts/${CartId}`)
      .then((response) => setCartUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  if (products.length > 0 && cartUser) {
    cartUser.cart.map((pr) => {
      products.map((pro) => {
        if (pro.id === pr.idProduct) {
          productCart.push({ ...pro, quantity: pr.quantity });
        }
      });
    });
  }

  // Cách bạn đã định nghĩa hook useUpdateProductQuantity
  const useUpdateProductQuantity = (productId, quantity) => {
    useEffect(() => {
      // Cập nhật số lượng sản phẩm khi thành phần được tạo ra
      instance
        .patch(`/products/${productId}`, {
          quantity: quantity,
        })
        .then((response) => console.log("Cập nhật số lượng sản phẩm"))
        .catch((error) => console.log(error));
    }, [productId, quantity]); // Chạy hiệu ứng này mỗi khi productId hoặc quantity thay đổi
  };

  // Hàm xử lý thanh toán
  const handleCheckout = async () => {
    try {
      if (!userName.trim() || !address.trim()) {
        // Nếu có ô input trống, hiển thị thông báo lỗi và ngăn người dùng tiếp tục
        notification.error({
          message: "Lỗi",
          description: "Vui lòng điền đầy đủ thông tin Họ và tên và Địa chỉ.",
        });
        return; // Ngừng thực hiện thanh toán
      }
      // Lấy danh sách sản phẩm từ giỏ hàng với tên sản phẩm
      const productsToCheckout = productCart.map((item) => ({
        idProduct: item.id,
        quantity: item.quantity,
      }));

      // lấy ngày tháng năm đặt hàng
      const currentDate = new Date();
      const orderDate = currentDate.toLocaleString();

      // console.log("=>", productsToCheckout);
      const userLogin = JSON.parse(localStorage.getItem("userLocal"));

      // Kiểm tra nếu giỏ hàng không rỗng
      if (productsToCheckout.length > 0) {
        // Tạo một đơn hàng mới trên API
        const response = await instance.post("/orders", {
          products: productCart,
          userId: userLogin.id,
          date: new Date().toLocaleString(),
          total: sum,
          status: 0,
          username: userName,
          address: address,
        });
        // console.log(response);

        // Kiểm tra và xử lý kết quả từ API
        if (response.status === 201) {
          // Đơn hàng đã được đặt thành công
          // Xóa giỏ hàng
          instance
            .patch(`/carts/${CartId}`, {
              cart: [],
            })
            .then((response) => console.log("ok"))
            .catch((error) => console.log(error));

          // Hiển thị thông báo thành công
          notification.success({
            message: "Thành công",
            description: "Đơn hàng đã được đặt thành công!",
          });

          // Cập nhật độ dài của giỏ hàng (0 sau khi đã checkout)
          setCartsLength(0);

          // Chuyển người dùng đến trang "Home"
          navigate("/history");
        } else {
          // Xử lý lỗi từ API
          console.error("Checkout failed:", response.data);
        }
      } else {
        // Nếu giỏ hàng rỗng, bạn có thể thông báo cho người dùng rằng giỏ hàng trống
        notification.warning({
          message: "Giỏ hàng trống",
          description: "Giỏ hàng của bạn đang trống!",
        });
      }
      setUserName("");
      setAddress("");
      setIsLoad((pre) => !pre);
    } catch (error) {
      // Xử lý lỗi từ API
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <>
        <Modal
          title="Confirm deletion"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <p>Are you sure you want to delete the product?</p>
        </Modal>
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
                  <span>Giỏ hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Shop Cart Section Begin */}
        <section className="shop-cart spad font-sans bg-slate-100 ">
          <div className="container">
            <div className="flex gap-10 justify-center">
              <div className="">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="shop__cart__table">
                      <table className="w-full whitespace-no-wrap bg-white rounded-lg p-20">
                        <thead>
                          <tr className=" tracking-wide">
                            <th className=" p-2 text-center">Tên Sản Phẩm</th>
                            <th className=" p-2 text-center">Giá tiền</th>
                            <th className=" p-2 text-center">Số lượng</th>
                            <th className=" p-2 text-center">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productCart.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center">
                                Giỏ hàng trống
                              </td>
                            </tr>
                          ) : (
                            <>
                              {productCart.map((e, index) => {
                                sum += e.price * e.quantity;
                                return (
                                  <tr key={index}>
                                    <td className="cart__product__item  p-2 text-center">
                                      <img
                                        src={e.image}
                                        width={140}
                                        height={140}
                                        alt=""
                                      />
                                      <div className="cart__product__item__title">
                                        <h6>{e.product_name}</h6>
                                        <div className="rating">
                                          <i className="fa fa-star ">::</i>
                                          <i className="fa fa-star ">::</i>
                                          <i className="fa fa-star ">::</i>
                                          <i className="fa fa-star ">::</i>
                                          <i className="fa fa-star " />
                                        </div>
                                      </div>
                                      <div>{e.from}</div>
                                    </td>

                                    <td className="cart__price  p-2 text-center">
                                      {formatMoney(e.price * e.quantity)}
                                    </td>
                                    <td className="cart__quantity  p-2 text-center">
                                      <div>
                                        <Button
                                          className="-none bg-slate-300 hover:bg-blue-500 text-white"
                                          onClick={() => handleDecrease(e.id)}
                                        >
                                          -
                                        </Button>
                                        <span className="ml-2 mr-2">
                                          {e.quantity}
                                        </span>

                                        <Button
                                          className="-none bg-slate-300 hover:bg-blue-500 text-white"
                                          onClick={() => handleIncrease(e.id)}
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </td>

                                    <td
                                      onClick={() => showModal(e.id)}
                                      className="p-2 text-center"
                                    >
                                      <button
                                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                        aria-label="Delete"
                                      >
                                        <svg
                                          className="w-5 h-5 text-white"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          )}
                        </tbody>
                        <div className="cart__btn mt-2 ml-2">
                          <Link to="/list-product">Tiếp tục mua sắm</Link>
                        </div>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg">
                <div>
                  <div className="cart__total__procced bg-white rounded-lg p-10">
                    <h6>TỔNG GIỎ HÀNG</h6>
                    <ul>
                      <li>
                        Tổng cộng <span>{formatMoney(sum)}</span>
                      </li>
                    </ul>
                    <button
                      onClick={handleCheckout}
                      className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    >
                      Thanh toán
                    </button>

                    <label
                      htmlFor=""
                      className="mb-1 mt-3 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      Họ và tên:
                    </label>
                    <div className="relative">
                      <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        id="user_name"
                        type="text"
                        name="user_name"
                        className="{`form-control ${nameError &&  focus:border-red-500}`} text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        placeholder=" Họ và tên"
                      />
                    </div>
                    <label
                      htmlFor=""
                      className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                    >
                      Địa chỉ:
                    </label>
                    <div>
                      <div className="relative">
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          id="user_name"
                          type="text"
                          name="user_name"
                          className="{`form-control ${nameError &&  focus:border-red-500}`} text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          placeholder=" nhập địa chỉ"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
        <Footer />
      </>
    </div>
  );
}
