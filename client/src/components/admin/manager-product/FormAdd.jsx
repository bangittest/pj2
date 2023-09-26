import React, { useEffect, useState } from "react";
import "./product.css";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProduct } from "./../../../redux/slice/productSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import {
  Button,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { instance } from "../../../api/axios";
import TextArea from "antd/es/input/TextArea";
import Loading from "../../base/loading/Loading";

export default function FormAdd({ handleCloseForm }) {
  const [imageURL, setImageURL] = useState(null);

  // select
  const [classify, setClassify] = useState([]);
  useEffect(() => {
    instance
      .get("/categories")
      .then((response) => setClassify(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
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
        // Hiển
        message.success("Tải lên hình ảnh thành công.");
      } else if (info.file.status === "error") {
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

  const dispatch = useDispatch();
  const isLoadingChange = useSelector((state) => state.users.isLoadingChange);
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    description: "",
    from: imageURL,
    image: "",
    quantity: 0,
    category_id: 1,
  });
  useEffect(() => {
    dispatch(getProduct());
  }, [isLoadingChange]);

  //lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  //hàm thêm mới product
  const handleSubmit = (e) => {
    e.preventDefault();
    //gọi API thêm mới

    dispatch(
      addProduct({
        ...product,
        image: imageURL,
        category_id: Number(product.category_id),
        quantity: Number(product.quantity),
      })
    );
    notification.success({
      message: "Thành công",
      description: "Thêm sản phẩm thành công",
    });
    handleCloseForm();
  };

  return (
    <>
      {isLoadingChange && <Loading />}
      <div className="product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 className="text-center font-bold mb-4">THÊM MỚI SẢN PHẨM</h3>
          <div className="">
            <div className="mb-3 text-start">
              <label className="form-label">Tên sản phẩm:</label>
              <Input
                onChange={handleChange}
                type="text"
                id="product_name"
                name="product_name"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-3 text-start">
              <label htmlFor="price" className="form-label">
                Giá tiền:
              </label>
              <Input
                onChange={handleChange}
                type="number"
                id="price"
                name="price"
                min={0}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="quantity">Số lượng:</label>
              <Input
                onChange={handleChange}
                type="number"
                id="quantity"
                name="quantity"
                min={0}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="mb-3 text-start">
              <label className="form-label" htmlFor="">
                Phân loại:
              </label>
              <select
                className="w-full bg-white border border-red-500 rounded px-3 py-1.5 focus:outline-none focus:border-green-500"
                style={{ border: "2" }}
                placeholder="phân loại"
                name="category_id"
                value={1}
                id="category_id"
                onChange={handleChange}
              >
                {classify.map((e, index) => (
                  <option key={index} value={e.id}>
                    {e.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="from" className="form-label">
                Xuất xứ:
              </label>
              <Input
                onChange={handleChange}
                type="text"
                id="from"
                name="from"
              />
            </div>
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="image" className="form-label">
              Ảnh
            </label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img width={100} src={imageURL} alt="img" />
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="description" className="form-label">
              Mô tả:
            </label>
            <TextArea
              onChange={handleChange}
              className=""
              name="description"
              id="description"
              cols="10"
              rows="2"
            ></TextArea>
          </div>

          <div className="flex gap-3 justify-content-center">
            <button type="submit" className="btn btn-primary">
              Thêm mới
            </button>
            <button
              onClick={handleCloseForm}
              type="button"
              className="btn btn-danger"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
