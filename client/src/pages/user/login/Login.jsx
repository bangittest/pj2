import React, { useState } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { instance } from "../../../api/axios";
import { validateEmail } from "../../../utils/fomatData";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const getCarts = async () => {
    const response = await instance.get(`/carts`);
    return response.data;
  };

  const isEmailValid = validateEmail;

  //  Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError("Email không được để trống");
          return;
        }
        if (!isEmailValid(valueInput)) {
          setEmailError("Email không hợp lệ");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError("Mật khẩu không được để trống");
        } else {
          setPasswordError("");
        }
      default:
        break;
    }
  };

  //   // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    // Lấy name và value từ input
    const { value, name } = e.target;

    // Khi onChange thì gọi đến hàm validate
    validateData(name, value);

    // Kiểm tra name và gán giá trị
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  //dang nhap voi API
  const handleOnSumit = (e) => {
    e.preventDefault();
    validateData("email", email);
    validateData("password", password);
    // Kiểm tra các trường bắt buộc trong đối tượng user

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      // Gọi API đăng nhập
      instance
        .post("/login", newUser)
        .then((response) => {
          if (response.data.user.banned == true) {
            setAlertBan(true);
            return;
          }
          notification.success({
            message: "Thành công",
            description: "Đăng nhập thành công",
          });
          localStorage.setItem("userLocal", JSON.stringify(response.data.user));
          return response.data.user;
        })
        .then(async (user) => {
          // Kiểm tra nếu người dùng đã có giỏ hàng
          const carts = await getCarts();
          const cartUser = carts.find((cart) => cart.userId == user.id);

          // Xóa dữ liệu giỏ hàng từ localStorage trước khi thêm mới
          localStorage.removeItem("carts");
          localStorage.removeItem("cartId");

          if (!cartUser) {
            // Nếu chưa có, tạo một giỏ hàng mới và thêm sản phẩm vào đó
            const res = await instance.post(`/carts`, {
              userId: user.id,
              cart: [],
            });

            // Lưu cartId mới vào localStorage
            localStorage.setItem("cartId", JSON.stringify(res.data.id));
          } else {
            // Nếu đã có, thêm sản phẩm vào giỏ hàng hiện có

            // Lưu cartId hiện tại vào localStorage
            localStorage.setItem("cartId", JSON.stringify(cartUser.id));
          }

          return user;
        })
        .then((user) => {
          if (user.role == 0) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          if (
            error.response.data === "Incorrect password" ||
            error.response.data === "Cannot find user" ||
            error.response.data === "Password is too short"
          ) {
            notification.error({
              message: "Cảnh báo",
              description: "Mật khẩu hoặc Email không chính xác",
            });
          }
          console.log(error);
        });
    }
  };
  //dang nhap voi google
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then(async (response) => {
  //       const userLocal = {
  //         email: response.user.email,
  //         user_name: response.user.displayName,
  //         image: response.user.photoURL,
  //         userId: response.user.uid,
  //       };

  //       // const existingUser = await instance.get(`/users/${userLocal.userId}`);

  //       // if (!existingUser) {
  //       //   await instance.post("/users", userLocal);
  //       // }

  //       try {
  //         const existingUser = await instance.get(`/users/${userLocal.userId}`);
  //         if (!existingUser) {
  //           await instance.post("/users", userLocal);
  //         }
  //       } catch (error) {
  //         console.error("Lỗi xử lý API:", error);
  //       }

  //       // Lưu thông tin người dùng vào localStorage
  //       localStorage.setItem("userLocal", JSON.stringify(userLocal));
  //       notification.success({
  //         message: "Thành công",
  //         description: "đăng nhập thành công",
  //       });
  //       // Tạo giỏ hàng cho tài khoản
  //       const cartUser = {
  //         userId: userLocal.userId,
  //         cart: [],
  //       };
  //       await instance.post(`/carts`, cartUser);
  //       //chuyen huong ve trang home
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error(error); // In ra lỗi để xác định nguyên nhân
  //       //hiển thị thông báo lỗi
  //       notification.error({
  //         message: "Thất bại",
  //         description: "Đăng nhập thất bại",
  //       });
  //     });
  // };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Đăng Nhập
          </div>
          {/* <button
            onClick={signInWithGoogle}
            className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
          >
            <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
            </span>
            <span>Đăng nhập với Google</span>
          </button> */}
          {/* <div className="relative mt-10 h-px bg-gray-300"> */}
          {/* <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                Hoặc Đăng nhập bằng Email
              </span>
            </div> */}
          {/* </div> */}
          <div className="mt-10">
            <form onSubmit={handleOnSumit}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail"
                  />
                  {emailError && (
                    <div className="text-red-500 mt-1 text-xs">
                      {emailError}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Mật khẩu:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="nhập mật khẩu"
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  {passwordError && (
                    <div className="text-red-500 mt-1 text-xs">
                      {passwordError}
                    </div>
                  )}
                </div>
              </div>
              <Link
                to="/"
                className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
              >
                Quay lại
              </Link>
              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <Link
                    to="/change_password"
                    className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Đăng Nhập</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              to="/register"
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2">Bạn chưa có tài khoản?</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
