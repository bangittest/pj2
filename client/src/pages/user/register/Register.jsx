import React, { useState } from "react";
// import "./register.css";
import { Radio, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../api/axios";
import { storge } from "../../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function Register() {
  const [gender, setGender] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisable, setIsDisalble] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
    address: "",
    dateOfBirthday: "",
    role: 1,
  });

  // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
  const imageListRef = ref(storge, "images/");

  const handleCheck = (e) => {
    // console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };

  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;
        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển
        message.success("Upload image successfully.");
      } else if (info.file.status === "error") {
        message.error("Image upload failed.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến kho ảnh trên firebase
        const imageRef = ref(imageListRef, file.name);

        // Tải ảnh lên firebase
        await uploadBytes(imageRef, file);

        // Lấy url từ firebase về sau khi upload thành công
        const downloadURL = await getDownloadURL(imageRef);

        // Gọi hàm onSuccess để thông báo là upload ảnh thành công
        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  const isEmailValid = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setNameError("Name cannot be left blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setNameError("");
        }
        break;
      case "email":
        if (!valueInput) {
          setEmailError("Email cannot be blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else if (!isEmailValid(valueInput)) {
          setEmailError("Email invalidate");
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError("Password can not be blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else if (valueInput.length < 8) {
          setPasswordError("Password must have at least 8 characters");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setPasswordError("");
        }
        break;
      // case "confirmPassword":
      //   if (!valueInput) {
      //     setConfirmPasswordError("Mật khẩu không được để trống");
      //     return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
      //   } else if (user.password !== valueInput) {
      //     setConfirmPasswordError("Mật khẩu không trùng khớp");
      //     return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
      //   } else {
      //     setConfirmPasswordError("");
      //   }
      //   break;
      default:
        break;
    }
  };

  //xử lí sự kiện checked trong ô checkbox
  const handleChecked = (e) => {
    setIsDisalble(e.target.checked);
  };

  //lấy giá trị ô input
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    // console.log(value,name);
    validateData(value, name);

    //distructoring
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Hàm kiểm tra email
  const checkEmailExists = async (email) => {
    try {
      const response = await instance.get(`/users?email=${email}`);
      return response.data.length > 0; // Trả về true nếu email đã tồn tại
    } catch (error) {
      console.error("Error while checking email:", error);
      return false; // Trả về false nếu có lỗi
    }
  };

  // Xử lí hàm submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);

    // Kiểm tra email trước khi tạo người dùng
    const emailExists = await checkEmailExists(user.email);

    if (emailExists) {
      setEmailError("Email already exists, please select another email.");
      return;
    }

    const newUser = {
      email: user.email,
      image: imageURL,
      password: user.password,
      user_name: user.user_name,
      dateOfBirthday: user.dateOfBirthday,
      gender: gender,
      role: 1,
    };

    // Tiến hành tạo người dùng mới
    instance
      .post("/users", newUser)
      .then((response) => {
        if (response.status === 201) {
          // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
          notification.success({
            message: "Success",
            description: "New user added successfully",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        // Hiển thị thông báo lỗi
        notification.error({
          message: "Failure",
          description: "Adding new user failed",
        });
      });
  };

  return (
    <>
      <div className="bg-gray-400 font-sans" style={{ width: "200" }}>
        <div className="min-h-screen flex items-center justify-center top-5 left-0 right-0 bottom-0">
          <div
            className="bg-white p-8 shadow-lg flex flex-col items-center rounded w-2/6"
            style={{ width: "200" }}
          >
            <h2 className="text-2xl font-sans text-center ">SIGN UP</h2>
            <form className="w-full " onSubmit={handleOnSubmit}>
              <div className="">
                <label htmlFor="user_name" className="block text-gray-600">
                  First and last name:
                </label>
                <input
                  type="text"
                  id="user_name"
                  placeholder="Enter first and last name . . ."
                  name="user_name"
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${nameError &&  focus:border-red-500}`}"
                  onChange={handleInputChange}
                />
                {nameError && (
                  <div className="text-red-500 mt-1">{nameError}</div>
                )}
                {/* <div className="text-red-500 mt-1">Tài khoản không được để trống</div> */}
              </div>
              <div className="">
                <label htmlFor="email" className="block text-gray-600">
                  Email address:
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter email address . . ."
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${emailError &&  focus:border-red-500}`}"
                  onChange={handleInputChange}
                />
                {emailError && (
                  <div className="text-red-500 mt-1">{emailError}</div>
                )}
                {/* <div className="text-red-500 mt-1">Email không hợp lệ</div> */}
              </div>
              <div className="">
                <label htmlFor="dob" className="block text-gray-600">
                  Date of birth:
                </label>
                <input
                  type="date"
                  id="dateOfBirthday"
                  name="dateOfBirthday"
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label htmlFor="name">Gender</label>
                <div className="">
                  <Radio.Group onChange={handleCheck} value={gender}>
                    <Radio value={0}>Male</Radio>
                    <Radio value={1}>Female</Radio>
                    <Radio value={2}>Other</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="">
                <label htmlFor="name">Image:</label>
                <div className="text-center">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload images</Button>
                  </Upload>
                </div>
              </div>
              <div className="">
                <label htmlFor="password" className="block text-gray-600">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password . . ."
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${passwordError &&  focus:border-red-500}`}"
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <div className="text-red-500 mt-1">{passwordError}</div>
                )}
                {/* <div className="text-red-500 mt-1">Mật khẩu không được để trống</div> */}
              </div>
              {/* <div className="">
                <label htmlFor="password" className="block text-gray-600">
                  Nhập lại mật khẩu:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required=""
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${confirmPasswordError &&  focus:border-red-500}`}"
                />
                {confirmPasswordError && (
                  <div className="text-red-500 mt-1">
                    {confirmPasswordError}
                  </div>
                )}
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-600">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    required=""
                    className="mr-2"
                    onChange={handleChecked}
                  />{" "}
                  I agree with terms & conditions{" "}
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={!isDisable}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-1"
              >
                SIGN UP
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
              </div>
              <div className="text-center mt-4">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Sign In here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
