// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getProduct } from "../../../redux/slice/productSlice";
// import { Button, Image, Modal, Pagination, notification } from "antd";
// import Loading from "../../../components/base/loading/Loading";
// import FormAdd from "../../../components/admin/manager-product/FormAdd";
// import FormEdit from "../../../components/admin/manager-product/FormEdit";
// import Search from "antd/es/input/Search";
// import { formatMoney } from "../../../utils/validateData";

// export default function ListProductManager() {
//   const [showAdd, setShowAdd] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [idEdit, setIdEdit] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [pageSize, setPageSize] = useState(6);
//   const [seachtext, setSeachText] = useState("");
//   useEffect(() => {
//     dispatch(getProduct(seachtext));
//   }, [seachtext]);

//   const dispatch = useDispatch();
//   const product = useSelector((state) => state.products.data);

//   // console.log(idEdit);

//   const isLoadingChange = useSelector(
//     (state) => state.products.isLoadingChange
//   );

//   //show form add
//   const showFormAdd = () => {
//     setShowAdd(true);
//   };
//   const handleCloseForm = () => {
//     setShowAdd(false);
//   };

//   //show edit
//   const handleShowEdit = (id) => {
//     setShowEdit(true);
//     setIdEdit(id);
//   };
//   const handleCloseEdit = () => {
//     setShowEdit(false);
//   };

//   //tính toán chỉ mục sản phẩmbắt đầu vafchir mục san phẩm kết thúc
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = currentPage * pageSize;
//   const displayedProduct = product.slice(startIndex, endIndex);
//   // console.log(displayedProduct);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // xóa

//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
//   const [idDelete, setIdDelete] = useState();
//   const handleShowModalDelete = (id) => {
//     setIdDelete(id);
//     setIsModalOpenDelete(true);
//   };
//   const handleOkDelete = () => {
//     dispatch(deleteProduct(idDelete));
//     setIdDelete();
//     setIsModalOpenDelete(false);
//     notification.success({
//       message: "thành công",
//       description: "Bạn đã xóa thành công",
//     });
//   };
//   const handleCancelDelete = () => {
//     setIdDelete();
//     setIsModalOpenDelete(false);
//   };
//   useEffect(() => {
//     dispatch(getProduct());
//   }, [isLoadingChange]);

//   return (
//     <>
//       <Modal
//         title=""
//         open={isModalOpenDelete}
//         onOk={handleOkDelete}
//         onCancel={handleCancelDelete}
//       >
//         <p>Bạn có chắc chắn muốn xóa không ?</p>
//       </Modal>
//       {isLoadingChange && <Loading />}

//       {/* show form add */}
//       {showAdd && <FormAdd handleCloseForm={handleCloseForm} />}

//       {/* show dorm edit */}

//       {showEdit && (
//         <FormEdit handleCloseEdit={handleCloseEdit} idEdit={idEdit} />
//       )}
//       <div className="container px-6 mx-auto grid">
//         <h4 className="font-sans text-center mb-2 mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
//           QUẢN LÝ SẢN PHẨM
//         </h4>
//         <div className="flex justify-between z-0">
//           <div className="mb-2">
//             <Button
//               onClick={showFormAdd}
//               className="z-0 bg-blue-500 font-bold text-white hover:bg-blue-500 active:bg-blue-500"
//             >
//               +Thêm mới
//             </Button>
//           </div>
//           <div>
//             <Search
//               value={seachtext}
//               onChange={(e) => setSeachText(e.target.value)}
//               className=""
//               style={{ width: 200 }}
//               placeholder="tìm kiếm"
//             />
//           </div>
//         </div>
//         <div className="w-full overflow-hidden rounded-lg shadow-xs">
//           <div className="min-w-full overflow-x-auto">
//             <table className="border w-full whitespace-no-wrap">
//               <thead>
//                 <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
//                   <th className="border p-2 text-center" title="Số thứ tự">
//                     STT
//                   </th>
//                   <th className="border p-2 text-center">Ảnh</th>
//                   <th className="border p-2 text-center">Tên giảm phẩm</th>
//                   <th className="border p-2 text-center">Giá tiền</th>
//                   <th className="border p-2 text-center">Phân loại</th>
//                   <th className="border p-2 text-center">Mô tả</th>
//                   <th className="border p-2 text-center">Xuất xứ</th>

//                   <th className="border p-2 text-center">Số lượng</th>
//                   <th className="border p-2 text-center">Hành động</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
//                 {displayedProduct.map((pro, index) => (
//                   <tr key={index} className="text-gray-700 dark:text-gray-400">
//                     <td className="border p-2 text-center text-sm">{pro.id}</td>
//                     <td className="border p-2 text-center">
//                       <div className="flex items-center text-sm">
//                         <div className=" hidden w-14 h-14 mr-3 rounded-full md:block">
//                           <Image
//                             className="object-cover w-14 h-14"
//                             width={70}
//                             height={58}
//                             src={pro.image}
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {pro.product_name}
//                     </td>

//                     <td className="border p-2 text-center">
//                       {formatMoney(pro.price)}
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {pro.category_id}
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {pro.description.substring(0, 20)}...
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {pro.from}
//                     </td>

//                     <td className="border p-2 text-center text-sm">
//                       {pro.quantity}
//                     </td>
//                     <td className="border p-2 text-center">
//                       <div className="flex justify-center items-center space-x-4 text-sm">
//                         <button
//                           onClick={() => handleShowEdit(pro.id)}
//                           className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white flex items-center justify-between px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
//                           aria-label="Edit"
//                         >
//                           <svg
//                             className="w-5 h-5 text-white "
//                             aria-hidden="true"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={() => handleShowModalDelete(pro.id)}
//                           className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white  flex items-center justify-between px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
//                           aria-label="Delete"
//                         >
//                           <svg
//                             className="w-5 h-5 text-white"
//                             aria-hidden="true"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <Pagination
//               className="absolute right-0 bottom-0"
//               current={currentPage}
//               pageSize={pageSize}
//               total={product.length}
//               onChange={handlePageChange}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Modal, Pagination, notification } from "antd";
import Loading from "../../../components/base/loading/Loading";
import FormAdd from "../../../components/admin/manager-product/FormAdd";
import FormEdit from "../../../components/admin/manager-product/FormEdit";
import Search from "antd/es/input/Search";
import { formatMoney } from "../../../utils/validateData";

export default function ListProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = async (search = "") => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/products", {
        params: { product_name_like: search },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      notification.error({ message: "Lỗi", description: "Không thể lấy sản phẩm!" });
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      notification.success({ message: "Thành công", description: "Đã xóa sản phẩm!" });
      fetchProducts(searchText);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      notification.error({ message: "Lỗi", description: "Xóa sản phẩm thất bại!" });
    }
  };

  // Load data lần đầu và mỗi khi searchText thay đổi
  useEffect(() => {
    fetchProducts(searchText);
  }, [searchText]);

  // Xử lý modal xóa
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = () => {
    handleDelete(idDelete);
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
    setIdDelete(null);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedProduct = products.slice(startIndex, endIndex);

  return (
    <>
      <Modal
        title="Xác nhận"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa không?</p>
      </Modal>

      {isLoading && <Loading />}
      {showAdd && <FormAdd handleCloseForm={() => setShowAdd(false)} fetchProducts={fetchProducts} />}
      {showEdit && (
        <FormEdit
          handleCloseEdit={() => setShowEdit(false)}
          idEdit={idEdit}
          fetchProducts={fetchProducts}
        />
      )}

      <div className="container px-6 mx-auto grid">
        <h4 className="text-center mb-2 mt-4 text-lg font-semibold text-gray-600">
          QUẢN LÝ SẢN PHẨM
        </h4>
        <div className="flex justify-between mb-2">
          <Button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white">
            + Thêm mới
          </Button>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Tìm kiếm"
            style={{ width: 200 }}
          />
        </div>

        <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="border w-full whitespace-no-wrap">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border text-center">STT</th>
                <th className="p-2 border text-center">Ảnh</th>
                <th className="p-2 border text-center">Tên sản phẩm</th>
                <th className="p-2 border text-center">Giá</th>
                <th className="p-2 border text-center">Phân loại</th>
                <th className="p-2 border text-center">Mô tả</th>
                <th className="p-2 border text-center">Đặc điểm kĩ thuật</th>
                <th className="p-2 border text-center">Xuất xứ</th>
                <th className="p-2 border text-center">Số lượng</th>
                <th className="p-2 border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedProduct.map((pro, index) => (
                <tr key={pro.id}>
                  <td className="p-2 border text-center">{pro.id}</td>
                  <td className="p-2 border text-center">
                    <Image src={pro.image} alt="" width={60} height={60} />
                  </td>
                  <td className="p-2 border text-center">{pro.product_name}</td>
                  <td className="p-2 border text-center">{formatMoney(pro.price)}</td>
                  <td className="p-2 border text-center">{pro.category_id}</td>
                  <td className="p-2 border text-center">{pro.description?.length > 20 ? pro.description.slice(0, 20) + "..." : pro.description}</td>
                  <td className="p-2 border text-center">{pro.specification?.length > 20 ? pro.specification.slice(0, 20) + "..." : pro.specification}</td>
                  <td className="p-2 border text-center">{pro.from}</td>
                  <td className="p-2 border text-center">{pro.quantity}</td>
                  <td className="p-2 border text-center flex justify-center gap-2">
                    <Button size="small" type="primary" onClick={() => {
                      setIdEdit(pro.id);
                      setShowEdit(true);
                    }}>
                      Sửa
                    </Button>
                    <Button size="small" danger onClick={() => handleShowModalDelete(pro.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      
          <Pagination
            className="absolute right-0 bottom-0"
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={(page) => setCurrentPage(page)}
          />
  
    </>
  );
}

