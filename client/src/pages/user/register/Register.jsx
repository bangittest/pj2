import React, { useState } from "react";
import { Button, Radio, Upload, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../api/axios";
import { validateEmail } from "../../../utils/fomatData"; // Lỗi định dạng tên hàm, sửa thành "validateEmail"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import { UploadOutlined } from "@ant-design/icons";

export default function Register() {
  const [gender, setGender] = useState(0);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisable, setIsDisalble] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
    address: "",
    dateOfBirthday: "",
    role: 1,
    cart: [],
    active: false,
  });

  // Tạo một tham chiếu đến thư mục chứa hình ảnh trên Firebase
  const imageListRef = ref(storage, "images/");

  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;

        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển thị thông báo thành công
        message.success("Tải lên hình ảnh thành công.");
      } else if (info.file.status === "error") {
        // Hiển thị thông báo lỗi
        message.error("Tải lên hình ảnh thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const imageRef = ref(storage, `images/${file.name}`);
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageURL(url);
            onSuccess({ url: url });
          });
        });
      } catch (error) {
        onError(error);
      }
    },
  };

  const handleCheck = (e) => {
    setGender(e.target.value);
  };

  const isEmailValid = validateEmail;

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setNameError("Tên không được để trống");
          return;
        } else {
          setNameError("");
        }
        break;
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
          return;
        }
        if (valueInput.length < 8) {
          setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
          return;
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Hãy nhập lại mật khẩu");
          return;
        }
        if (user.password !== valueInput) {
          setConfirmPasswordError("Mật khẩu không khớp");
          return;
        } else {
          setConfirmPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  // Xử lí sự kiện checked trong ô checkbox
  const handleChecked = (e) => {
    setIsDisalble(e.target.checked);
  };

  // Lấy giá trị ô input
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    validateData(name, value);

    // Dùng destructuring để cập nhật state user
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
      console.error("Lỗi khi kiểm tra email:", error);
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

    // Kiểm tra các trường bắt buộc trong đối tượng user
    if (!user.email) {
      setEmailError("Email không được để trống");
      return;
    }

    if (!user.password) {
      setPasswordError("Mật khẩu không được để trống");
      return;
    }
    if (!user.user_name) {
      setNameError("Tên người dùng không được để trống");
    }

    // Kiểm tra mật khẩu
    if (user.password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (user.password !== user.confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return;
    }

    // Kiểm tra email trước khi tạo người dùng
    const emailExists = await checkEmailExists(user.email);

    if (emailExists) {
      setEmailError("Email đã tồn tại, hãy chọn một email khác.");
      return;
    }

    const newUser = {
      email: user.email,
      image: imageURL,
      password: user.password,
      user_name: user.user_name,
      dateOfBirthday: user.dateOfBirthday,
      gender: gender,
      address: "",
      role: 1,
      cart: [],
      active: false,
    };

    // Tiến hành tạo người dùng mới
    instance
      .post("/users", newUser)
      .then((response) => {
        if (response.status === 201) {
          // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
          notification.success({
            message: "Thành công",
            description: "Đăng ký thêm người dùng mới thành công",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        // Hiển thị thông báo lỗi
        notification.error({
          message: "Thất bại",
          description: "Thêm người dùng mới thất bại",
        });
      });
  };

  return (
    <>
      <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            ĐĂNG KÝ
          </div>
          <div className="mt-10">
            <form onSubmit={handleOnSubmit}>
              <div className="flex gap-8">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor=""
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Họ và tên:
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleInputChange}
                      onBlur={handleInputChange}
                      id="user_name"
                      type="text"
                      name="user_name"
                      className="{`form-control ${nameError &&  focus:border-red-500}`} text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder=" Họ và tên"
                    />
                    {nameError && (
                      <div className="text-red-500 mt-1 text-xs">
                        {nameError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <label
                    htmlFor="dateOfBirthday"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Ngày sinh:
                  </label>
                  <div className="relative">
                    <input
                      name="dateOfBirthday"
                      onChange={handleInputChange}
                      onBlur={handleInputChange}
                      id="dateOfBirthday"
                      type="date"
                      className="text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="flex gap-8"> */}
              <div className="flex flex-col mb-2">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail:
                </label>
                <div className="relative">
                  <input
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                    id="email"
                    type="text"
                    name="email"
                    className="{`form-control ${emailError &&  focus:border-red-500}`} text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Địa chỉ email"
                  />
                  {emailError && (
                    <div className="text-red-500 mt-1 text-xs">
                      {emailError}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Gender:
                </label>
                <div className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  <Radio.Group
                    onChange={handleCheck}
                    className="flex"
                    value={gender}
                  >
                    <div>
                      <Radio value={0}>Nam</Radio>
                      <Radio value={1}>Nữ</Radio>
                    </div>
                    <div>
                      <Radio value={2}>Khác</Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img width={100} src={imageURL} alt="img" />
              </div>

              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
              {/* </div> */}
              <div className="flex gap-8">
                <div className="flex flex-col ">
                  <label
                    htmlFor="password"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Mật khẩu:
                  </label>
                  <div className="relative">
                    <input
                      //  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${passwordError &&  focus:border-red-500}`}"
                      onChange={handleInputChange}
                      onBlur={handleInputChange}
                      id="password"
                      type="password"
                      name="password"
                      className="{`form-control ${passwordError &&  focus:border-red-500}`} text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Mật khẩu "
                    />
                    {passwordError && (
                      <div className="text-red-500 mt-1 text-xs">
                        {passwordError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    Nhập lại mật khẩu:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleInputChange}
                      onBlur={handleInputChange}
                      //  className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${confirmPasswordError &&  focus:border-red-500}`}"
                      className="text-sm sm:text-base placeholder-gray-500 pl-7 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400  {`form-control ${confirmPasswordError &&  focus:border-red-500}`}"
                      placeholder="Nhập lại mật khẩu"
                    />
                    {confirmPasswordError && (
                      <div className="text-red-500 mt-1 text-xs">
                        {confirmPasswordError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex ml-auto">
                <div className="">
                  <label className="block text-gray-600">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      required=""
                      className=""
                      onChange={handleChecked}
                    />
                  </label>
                </div>
                <div className="">
                  Đồng ý với các điều khoản của chúng tôi
                  <Link
                    to="#"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  ></Link>
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  disabled={!isDisable}
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Đăng ký</span>
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
          <div className="mt-3">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 transition duration-200"
            >
              Quay lại
            </Link>
          </div>
          <div className="flex justify-center mt-3">
            <div>
              <Link
                to="/login"
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
                <span className="ml-2">Nếu bạn đã có tài khoản!</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
