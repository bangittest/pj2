// import React, { useEffect, useState } from "react";
// import "./product.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addProduct,
//   getProduct,
//   updateProduct,
// } from "./../../../redux/slice/productSlice";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../../../firebase/firebaseConfig";
// import { Button, Image, Input, Upload, message } from "antd";
// import TextArea from "antd/es/input/TextArea";
// import { UploadOutlined } from "@ant-design/icons";
// import { instance } from "../../../api/axios";
// import Loading from "../../base/loading/Loading";

// export default function FormEdit({ handleCloseEdit, idEdit }) {
//   const dispatch = useDispatch();

//   // select
//   const [classify, setClassify] = useState([]);
//   useEffect(() => {
//     instance
//       .get("/categories")
//       .then((response) => setClassify(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const listProduct = useSelector((state) => state.products.data);
//   const isLoadingChange = useSelector((state) => state.users.isLoadingChange);

//   const [product, setProduct] = useState({
//     product_name: "",
//     price: 0,
//     description: "",
//     from: "",
//     image: "",
//     quantity: 0,
//     category_id: 1,
//   });
//   console.log(product);

//   const [imageUpload, setImageUpload] = useState(null);
//   const [linkImage, setLinkImage] = useState("");
//   const [imageURL, setImageURL] = useState(null);

//   const handleChoosePhoto = (e) => {
//     if (!e.target.files) {
//       return;
//     }
//     setImageUpload(e.target.files[0]);
//     setLinkImage(URL.createObjectURL(e.target.files[0]));
//   };

//   // Lấy thông một sản phẩm theo id được truyền từ cha xuống thông qua props
//   const getProductById = () => {
//     const products = listProduct.find((pro) => pro.id === idEdit);
//     setProduct(products);
//     setLinkImage(products.image);
//   };

//   //lấy giá trị từ các ô input
//   const handleChange = (e) => {
//     const { value, name } = e.target;
//     setProduct({
//       ...product,
//       [name]: value,
//     });
//   };

//   //hàm thêm mới product
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //gọi API thêm mới
//     // dispatch(updateProduct(product));

//     if (!imageUpload) {
//       dispatch(updateProduct(product));
//       handleCloseEdit();
//       return;
//     }

//     const imageRef = ref(storage, `image/${imageUpload.name}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref)
//         .then((url) => {
//           return {
//             ...product,
//             image: url,
//             id: idEdit,
//           };
//         })
//         .then((data) => {
//           dispatch(updateProduct(data));
//         })
//         .catch((error) => {
//           message.info(error);
//         });
//     });

//     handleCloseEdit();
//   };

//   useEffect(() => {
//     dispatch(getProduct());
//   }, [isLoadingChange]);

//   useEffect(() => {
//     getProductById();
//   }, []);

//   return (
//     <>
//       {isLoadingChange && <Loading />}
//       <div className="product-container">
//         <form className="form-container" onSubmit={handleSubmit}>
//           <h3 className="text-center font-bold font-sans mb-4">
//             CẬP NHẬT SẢN PHẨM
//           </h3>
//           <div className="">
//             <div className="mb-3 text-start">
//               <label htmlFor="product_name" className="form-label">
//                 Tên sản phẩm
//               </label>
//               <Input
//                 value={product.product_name}
//                 onChange={handleChange}
//                 type="text"
//                 id="product_name"
//                 name="product_name"
//               />
//             </div>
//           </div>
//           <div className="flex gap-5">
//             <div className="mb-3 text-start">
//               <label htmlFor="price" className="form-label">
//                 Giá tiền
//               </label>
//               <Input
//                 value={product.price}
//                 onChange={handleChange}
//                 type="number"
//                 id="price"
//                 name="price"
//                 min={0}
//               />
//             </div>
//             <div className="mb-3 text-start">
//               <label htmlFor="quantity" className="form-label">
//                 Số lượng
//               </label>
//               <Input
//                 onChange={handleChange}
//                 type="number"
//                 id="quantity"
//                 name="quantity"
//                 min={0}
//                 value={product.quantity}
//               />
//             </div>
//           </div>
//           <div className="flex gap-5">
//             <div>
//               <label htmlFor="">Phân loại:</label>
//               <select
//                 className="w-full bg-white border border-red-500 rounded px-3 py-1.5 focus:outline-none focus:border-green-500"
//                 style={{ border: "2" }}
//                 placeholder=""
//                 name="category_id"
//                 id="category_id"
//                 value={product.category_id}
//                 onChange={handleChange}
//               >
//                 {classify.map((e, index) => (
//                   <option key={index} value={e.id}>
//                     {e.category_name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3 text-start">
//               <label htmlFor="from" className="form-label">
//                 Xuất xứ
//               </label>
//               <Input
//                 onChange={handleChange}
//                 type="text"
//                 id="from"
//                 name="from"
//                 value={product.from}
//               />
//             </div>
//           </div>

//           <div className="mb-3 text-start">
//             <label htmlFor="image" className="form-label">
//               Hình ảnh
//             </label>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 margin: "10px 0",
//               }}
//             >
//               <label htmlFor="image">
//                 <img
//                   width={90}
//                   height={90}
//                   style={{ objectFit: "cover" }}
//                   src={linkImage}
//                   alt="img"
//                 />
//               </label>
//             </div>
//             <input
//               hidden
//               onChange={handleChoosePhoto}
//               type="file"
//               id="image"
//               name="image"
//             />
//             {/* <Upload onChange={handleChoosePhoto} {...props}>
//               <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
//             </Upload> */}
//           </div>
//           <div className="mb-3 text-start">
//             <label htmlFor="description" className="form-label">
//               Mô tả
//             </label>
//             <TextArea
//               value={product.description}
//               onChange={handleChange}
//               className="form-control"
//               name="description"
//               id="description"
//               cols="10"
//               rows="2"
//             ></TextArea>
//           </div>

//           <div className="flex gap-3 justify-content-center">
//             <button type="submit" className="btn btn-primary">
//               Cập Nhật
//             </button>
//             <button
//               onClick={handleCloseEdit}
//               type="button"
//               className="btn btn-danger"
//             >
//               Hủy
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../redux/slice/productSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import { Button, Image, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { instance } from "../../../api/axios";
import Loading from "../../base/loading/Loading";

export default function FormEdit({ handleCloseEdit, idEdit, fetchProducts }) {
  const dispatch = useDispatch();

  const [classify, setClassify] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [linkImage, setLinkImage] = useState("");

  const isLoadingChange = useSelector((state) => state.products.isLoadingChange);

  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    description: "",
    specification: "",
    from: "",
    image: "",
    quantity: 0,
    category_id: 1,
  });

  // Fetch category list (chỉ status = 1)
  useEffect(() => {
    instance.get("/api/categories?status=1")
      .then((res) => setClassify(res.data))
      .catch((err) => console.error("Lỗi khi fetch categories:", err));
  }, []);

  // Fetch product by idEdit
  useEffect(() => {
    if (idEdit) {
      instance.get(`/api/products/${idEdit}`)
        .then((res) => {
          console.log('Dữ liệu trả về từ API:', res.data);  // Log toàn bộ res.data

          // Truy xuất từ mảng (res.data[0] vì API trả về mảng)
          if (res.data && res.data[0] && res.data[0].image) {
            console.log('Link ảnh:', res.data[0].image); // Truy cập trường image của đối tượng đầu tiên trong mảng
            setProduct(res.data[0]);
            setLinkImage(res.data[0].image);  // Lưu trữ link ảnh vào state
          } else {
            console.log('Không tìm thấy trường "image" trong dữ liệu.');
            setLinkImage("default_image.jpg"); // Dùng ảnh mặc định nếu không có ảnh
          }
        })
        .catch((err) => {
          console.error("Không lấy được sản phẩm:", err);
          message.error("Không thể tải dữ liệu sản phẩm!");
        });
    }
  }, [idEdit]);
  

  // Cập nhật input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Chọn ảnh
  const handleChoosePhoto = (e) => {
    if (e.target.files) {
      setImageUpload(e.target.files[0]);
      setLinkImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit form
  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();

  // Kiểm tra các trường thông tin sản phẩm bắt buộc
  if (!product.product_name || !product.price || !product.quantity || !product.category_id) {
    return message.error("Vui lòng điền đầy đủ thông tin!");
  }

  // Nếu không chọn ảnh mới → cập nhật bình thường
  if (!imageUpload) {
    // Gọi API PUT để cập nhật sản phẩm
    try {
      await instance.put(`/api/products/${idEdit}`, product);  // Gọi API PUT để cập nhật sản phẩm
      message.success("Sản phẩm đã được cập nhật!");
      fetchProducts(); // Lấy lại danh sách sản phẩm sau khi cập nhật
      handleCloseEdit(); // Đóng form chỉnh sửa
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      message.error("Cập nhật sản phẩm thất bại!");
    }
    return;
  }

  // Nếu có ảnh mới → upload lên Firebase trước
  const imageRef = ref(storage, `images/${imageUpload.name}`);
  uploadBytes(imageRef, imageUpload)
    .then((snapshot) => getDownloadURL(snapshot.ref))
    .then((url) => {
      const updatedProduct = { ...product, image: url };
      
      // Gọi API PUT để cập nhật sản phẩm với ảnh mới
      instance.put(`/api/products/${idEdit}`, updatedProduct)
        .then(() => {
          message.success("Sản phẩm đã được cập nhật!");
          fetchProducts(); // Lấy lại danh sách sản phẩm sau khi cập nhật
          handleCloseEdit(); // Đóng form chỉnh sửa
        })
        .catch((err) => {
          console.error("Lỗi khi cập nhật sản phẩm:", err);
          message.error("Cập nhật sản phẩm thất bại!");
        });
    })
    .catch((err) => {
      console.error("Lỗi khi upload ảnh:", err);
      message.error("Tải ảnh lên thất bại!");
    });
};


  return (
    <>
      {isLoadingChange && <Loading />}
      <div className="product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 className="text-center font-bold mb-4">CẬP NHẬT SẢN PHẨM</h3>

          <div className="mb-2 text-start">
            <label className="form-label">Tên sản phẩm</label>
            <Input
              value={product.product_name}
              onChange={handleChange}
              name="product_name"
              type="text"
            />
          </div>

          <div className="flex gap-5">
            <div className="mb-2 text-start">
              <label className="form-label">Giá tiền</label>
              <Input
                value={product.price}
                onChange={handleChange}
                name="price"
                type="number"
                min={0}
              />
            </div>
            <div className="mb-2 text-start">
              <label className="form-label">Số lượng</label>
              <Input
                value={product.quantity}
                onChange={handleChange}
                name="quantity"
                type="number"
                min={0}
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="mb-2 text-start">
              <label className="form-label">Phân loại</label>
              <select
                className="w-full bg-white border rounded px-3 py-1.5 focus:outline-none"
                name="category_id"
                value={product.category_id}
                onChange={handleChange}
              >
                {classify.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2 text-start">
              <label className="form-label">Xuất xứ</label>
              <Input
                value={product.from}
                onChange={handleChange}
                name="from"
                type="text"
              />
            </div>
          </div>

          <div className="mb-2 text-start">
            <label className="form-label">Hình ảnh</label>
            <div className="image-preview">
              <img
                src={linkImage || "https://via.placeholder.com/100"}
                alt="preview"
                width={60}
                height={60}
                style={{ objectFit: "cover" }}
              />
            </div>
            <input
              hidden
              type="file"
              id="image"
              onChange={handleChoosePhoto}
            />
            <label htmlFor="image" className="btn btn-secondary mt-2">
              Chọn ảnh
            </label>
          </div>

          <div className="mb-2 text-start">
            <label className="form-label">Mô tả</label>
            <TextArea
              value={product.description}
              onChange={handleChange}
              name="description"
              rows={4}
            />
          </div>

          <div className="mb-2 text-start">
            <label className="form-label">Đặc điểm kỹ thuật</label>
            <TextArea
              value={product.specification}
              onChange={handleChange}
              name="specification"
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
            <Button onClick={handleCloseEdit} type="default">
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
