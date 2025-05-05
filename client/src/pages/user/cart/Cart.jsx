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
  const handleDelete = async (cartItemId) => {
    setLoad(true);
  
    try {
      // Gửi yêu cầu DELETE để xóa sản phẩm khỏi giỏ hàng
      const response = await instance.delete(`api/cart-item/${cartItemId}`);
      
      // Cập nhật lại giỏ hàng từ backend
      await fetchCartAgain(); // Đảm bảo giỏ hàng được cập nhật lại sau khi xóa
      
      // Hiển thị thông báo thành công
      notification.success({
        message: "Xóa thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      });
  
  
    } catch (error) {
      console.error("❌ Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      notification.error({
        message: "Lỗi xóa sản phẩm khỏi giỏ hàng",
        description: "Có lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.",
      });
    } finally {
      setLoad(false);
    }
  };
  

  const handleDecrease = async (cartItemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?");
      if (!confirmDelete) return;
      return handleDelete(cartItemId);
    }
  
    try {
      const response = await instance.put(`api/cart-item/${cartItemId}/decrease`);
      console.log("✅ Giảm số lượng:", response.data);
  
      notification.success({
        message: "Thành công",
        description: "Đã giảm số lượng sản phẩm",
      });
  
      await fetchCartAgain(); // ← Load lại cart sau khi update
    } catch (error) {
      console.error("❌ Lỗi giảm số lượng:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể giảm số lượng sản phẩm",
      });
    }
  };
  

const fetchCartAgain = async () => {
  const user = JSON.parse(localStorage.getItem("userLocal"));
  if (user?.id) {
    try {
      const res = await instance.get(`api/cart/${user.id}`);
      setCartUser(res.data);
    } catch (err) {
      console.error("❌ Lỗi load lại giỏ hàng:", err);
    }
  }
};


  // Hàm xử lý tăng
  const handleIncrease = (cartItemId) => {
    setLoad(true);
    instance
      .put(`api/cart-item/${cartItemId}/increase`)  // Đảm bảo đường dẫn chính xác
      .then((response) => {
        fetchCartAgain(); // ← Load lại cart sau khi update
        notification.success({
          message: "Thành công",
          description: "Số lượng đã được thay đổi",
        });
      })
      .catch((error) => {
        console.error("❌ Lỗi tăng số lượng:", error);
  
        if (error.response) {
          // Kiểm tra mã lỗi từ server
          if (error.response.status === 400) {
            notification.error({
              message: "Lỗi",
              description: "Số lượng không thể tăng. Kiểm tra lại số lượng hoặc tồn kho!",
            });
          } else if (error.response.status === 404) {
            notification.error({
              message: "Không tìm thấy giỏ hàng",
              description: "Không tìm thấy sản phẩm trong giỏ hàng của bạn.",
            });
          } else {
            notification.error({
              message: "Lỗi hệ thống",
              description: "Đã xảy ra lỗi khi cập nhật giỏ hàng. Vui lòng thử lại sau.",
            });
          }
        } else {
          // Nếu không có response từ server
          notification.error({
            message: "Lỗi kết nối",
            description: "Không thể kết nối với server, vui lòng thử lại.",
          });
        }
      })
      .finally(() => setLoad(false));
    
    setIsLoad((prev) => !prev); // Để trigger lại render nếu cần
  };
  
  
  useEffect(() => {
    // 1. Gọi sản phẩm luôn
    instance
      .get("api/products")
      .then((response) => {
        setProducts(response.data);
        console.log("✅ Products:", response.data);
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
          console.log("✅ Cart:", response.data);
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            console.warn("⚠️ Giỏ hàng không tồn tại.");
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
        productCart.push({ ...matchedProduct, quantity: pr.quantity, cartItemId: pr.id});
        console.log("test", productCart);
        
      }
    });
  }

  

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
          <p>Bạn có chắc là bạn muốn xóa sản phẩm?</p>
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
                            <th className=" p-2 text-center">Tổng tiền</th>
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
                                      {formatMoney(e.price)}
                                    </td>
                                    <td className="cart__quantity  p-2 text-center">
                                      <div>
                                        <Button
                                          className="-none bg-slate-300 hover:bg-blue-500 text-white"
                                          onClick={() => handleDecrease(e.cartItemId)}
                                        >
                                          -
                                        </Button>
                                        <span className="ml-2 mr-2">
                                          {e.quantity}
                                        </span>

                                        <Button
                                          className="-none bg-slate-300 hover:bg-blue-500 text-white"
                                          onClick={() => handleIncrease(e.cartItemId)}
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </td>

                                    <td className="cart__price  p-2 text-center">
                                    {formatMoney(e.price * e.quantity)}
                                    </td>

                                    <td
                                      onClick={() => showModal(e.cartItemId)}
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
                        </table>
                      <div className="flex justify-between w-full mt-2">
                      <div className="cart__btn ml-2">
                      <Link to="/list-product">Tiếp tục mua sắm</Link>
                      </div>

                      <div className="cart__btn mr-2">
                      <Link 
                      to="/checkout" 
                        className={` ${productCart.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`} 
                      style={productCart.length === 0 ? { pointerEvents: 'none' } : {}}
                      >
                    Thanh toán
    </Link>
  </div>
</div>

                    
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg">
                <div>
                  <div className="cart__total__procced bg-white rounded-lg p-4">
                    {/* <h6>TỔNG GIỎ HÀNG</h6>
                    
                       <span>{formatMoney(sum)}</span> */}
                    
                    {/* <button
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
                    </div> */}
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
