import React, { useEffect, useState } from "react";
import Footer from "../../../layout/user/footer/Footer";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link } from "react-router-dom";
import { instance } from "./../../../api/axios";
import { Button, Image, Upload, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import Loading from "../../../components/base/loading/Loading";

export default function Profile() {
  const [imageURL, setImageURL] = useState(null);
  const [load, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    user_name: "",
    dateOfBirthday: "",
    image: imageURL,
    address: "",

    // Các trường thông tin khác
  });
  // const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  // console.log(userLocal);
  
  // const role = userLocal?.role; 

  // const redirectPath = role == 0 ? "/admin" : "/";

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

  // Hàm này sẽ được gọi khi người dùng thay đổi thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData, // Giữ lại tất cả các trường thông tin hiện có
      [name]: value,
      image: imageURL, // Cập nhật trường thông tin cụ thể dựa trên tên
    });
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: userData.email,
      image: imageURL,
      user_name: userData.user_name,
      dateOfBirthday: userData.dateOfBirthday,
      address: userData.address,
      role:userData.role

    };


    localStorage.setItem("userLocal", JSON.stringify(newUser));
    setLoading(true);
 
  
    
    await instance

      .put(`/api/users/update/${userData.email}`, newUser) // Thêm userData vào yêu cầu PUT
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    notification.success({
      message: "Thành công",
      description: "thay đổi thông tin cá nhân thành công",
    });
  };

  useEffect(() => {
    // Lấy thông tin người dùng từ local storage khi component được tạo
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem("userLocal")
    );
    if (userDataFromLocalStorage) {
      setUserData(userDataFromLocalStorage);
    }
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {load && <Loading />}
      <div className="container mt-16">
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="rounded-full card-profile-image mt-4">
                      <Link className="rounded-full" to="#">
                        <Image className="rounded-full" src={userData.image} />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {userData.user_name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {userData.address}
                      <span className="font-weight-light">
                        , {userData.dateOfBirthday}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card shadow">
                <div className="card-body">
                  <form onSubmit={handleOnsubmit}>
                    <h6 className="text-center heading-small text-muted mb-4">
                      Thông tin cá nhân
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="user_name"
                            >
                              Họ và tên
                            </label>
                            <input
                              value={userData.user_name}
                              onChange={handleInputChange}
                              type="text"
                              name="user_name"
                              id="user_name"
                              className="form-control form-control-alternative"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="image"
                            >
                              Ảnh đại diện
                            </label>
                            <div>
                              <Upload {...props}>
                                <Button
                                  value={userData.image}
                                  onChange={handleInputChange}
                                  icon={<UploadOutlined />}
                                >
                                  Tải ảnh lên
                                </Button>
                              </Upload>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="dateOfBirthday"
                            >
                              Ngày sinh
                            </label>
                            <input
                              value={userData.dateOfBirthday}
                              onChange={handleInputChange}
                              type="date"
                              id="dateOfBirthday"
                              name="dateOfBirthday"
                              className="form-control form-control-alternative"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Địa chỉ
                            </label>
                            <input
                              value={userData.address}
                              onChange={handleInputChange}
                              type="text"
                              id="address"
                              name="address"
                              className="form-control form-control-alternative"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-right">
                    <div className="px-5 py-2 underline">
  <Link to="/">Quay lại</Link>
</div>



                      <div>
                        <button
                          type="submit"
                          className="px-5 py-3 btn btn-sm btn-primary"
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-14" />
      {/* <Footer /> */}
    </>
  );
}
