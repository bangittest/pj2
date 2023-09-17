import React, { useState } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { instance } from "../../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //  Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;

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

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      // Gọi API đăng nhập
      instance
        .post("/login", newUser)
        .then((response) => {
          if (response.status === 200) {
            // Lưu dữ liệu lên local
            localStorage.setItem(
              "userLocal",
              JSON.stringify(response.data.user)
            );
            // Chuyển trang
            if (response.data.user.role === 0) {
              console.log("Chuyển vào trang admin");
            } else {
              notification.success({
                massage:"Thành công",
                description:"Đăng nhập thành công"
              })
              navigate("/")
            }
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
              description: "Mật khẩu hoặc Email không đúng.",
            });
          }
          console.log(error);
        });
    }
  };

  //dang nhap voi google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const useLocal = {
          email: response.email,
          user_name: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid,
        };
        //luu thong tin len local
        localStorage.setItem("userLocal", JSON.stringify(useLocal));
        notification.success({
          massage:"Thành công",
          description:"đăng nhập thành công"
        })
        //chuyen huong ve trang home
        navigate("/");
      })
      .catch((error) => {
        //hiển thị thông báo lỗi
        notification.error({
          message: "Thất bại",
          description: "Đăng nhập thất bại",
        });
      });
  };
  return (
    <>
      <div className="bg-gray-400 font-sans">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 shadow-lg flex flex-col items-center rounded w-2/6">
            <h2 className="text-2xl font-sans text-center mb-4">
              Đăng Nhập
            </h2>
            <form className="w-full" onSubmit={handleOnSumit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">
                  Tên đăng nhập:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
                {/* <div className="text-red-500 mt-1">
                  Tài khoản không được để trống
                </div> */}
                {emailError && (
              <div className="text-red-500 mt-1">email không được để trống.</div>
            )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600">
                  Mật khẩu:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
                {passwordError && (
              <div className="text-red-500 mt-1">Mật khẩu không được để trống.</div>
            )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-2"
              >
                Đăng Nhập
              </button>
              <div className="flex justify-between w-full">
                <div>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                  >
                    Quay lại
                  </Link>
                </div>
                <div>
                  <Link
                    href="/change_password"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              <div className="text-center mt-4">Hoặc</div>
              <a
                onClick={signInWithGoogle}
                href="#"
                onclick="loginWithGoogle()"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center mt-2"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Đăng Nhập với Google
              </a>
              <div className="text-center mt-4">
                Bạn đã có tài khoản?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  to="/register"
                >
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
