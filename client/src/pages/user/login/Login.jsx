import React, { useState } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { instance } from "../../../api/axios";
import{LoginSocialFacebook} from "reactjs-social-login";
import {FacebookLoginButton} from "react-social-login-buttons";


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
  // const [profile,setProfile]=useState(null)
  const [profile, setProfile] = useState(null);

  const handleLoginResolve = (response) => {
    console.log(response);
    setProfile(response.data);
  };

  const handleLoginReject = (error) => {
    console.log(error);
  };


  
  return (
    <>
    {/* <>
      {!profile ? (
        <LoginSocialFacebook
          appId="677238851131951"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        <></>
      )}
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture} alt="" />
        </div>
      ) : (
        ""
      )}
    </> */}

<>
      {!profile ? (
        <LoginSocialFacebook
          appId="677238851131951"
          onResolve={handleLoginResolve}
          onReject={handleLoginReject}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        <>
          <div>
            <h1>{profile.name}</h1>
            <img src={profile.picture} alt="" />
          </div>
        </>
      )}
    </>
      <div className="bg-gray-400 font-sans">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 shadow-lg flex flex-col items-center rounded w-2/6">
            <h2 className="text-2xl font-sans text-center mb-4">
            SIGN IN
            </h2>
            <form className="w-full" onSubmit={handleOnSumit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">
                  Email address:
                </label>
                <input
                  type="text"
                  placeholder="Enter email address . . ."
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
                Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password . . ."
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
                SIGN IN
              </button>
              <div className="flex justify-between w-full">
                <div>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                  >
                    Back
                  </Link>
                </div>
                <div>
                  <Link
                    href="/change_password"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Reset Password?
                  </Link>
                </div>
              </div>
              <div className="text-center mt-4">Sign In With</div>
              <div className="flex text-center justify-center gap-5">
              <a
                onClick={signInWithGoogle}
                href="#"
                onclick="loginWithGoogle()"
                className=" w-32 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center mt-2"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Google
              </a>
              <a 
              onClick={signInWithGoogle}
                href="#"
                onclick="loginWithGoogle()"
                className="w-32 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center mt-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Facebook
              </a>
              </div>
              <div className="text-center mt-4">
              Do you already have an account?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  to="/register"
                >
                  Sign Up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
