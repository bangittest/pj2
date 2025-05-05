// import React, { useEffect, useState } from "react";
// import Navbar from "../../../layout/user/navbar/Navbar";
// import Footer from "../../../layout/user/footer/Footer";
// import { Button } from "antd";

// import { instance } from "../../../api/axios";
// import { formatMoney } from "../../../utils/validateData";

// export default function History({ cartLength, setIsLoad }) {
//   const [orders, setOrders] = useState([]);
//   const userLogin = JSON.parse(localStorage.getItem("userLocal"));

//   const handleDelete = (id) => {
//     instance
//       .delete(`/orders/${id}`)
//       .then((response) => {})
//       .catch((error) => console.log(error));
//   };

//   instance
//     .get("/orders")
//     .then((response) => {
//       const cartOrder = [];
//       response.data.map((cr) => {
//         if (cr.userId == userLogin.id) {
//           cartOrder.push(cr);
//         }
//       });
//       setOrders(cartOrder);
//     })
//     .catch((error) => console.log(error));
//   //   console.log(orders);

//   return (
//     <>
//       <Navbar cartLength={cartLength} />
//       <div className="container px-6 mx-auto grid">
//         <h4 className="text-center mb-4 mt-5 text-lg font-semibold text-gray-600 dark:text-gray-300">
//           LỊCH SỬ MUA HÀNG
//         </h4>
//         <div className="flex justify-between z-0"></div>
//         <div></div>
//         <div className="w-full overflow-hidden rounded-lg shadow-xs">
//           <div className="w-full overflow-x-auto">
//             <table className="w-full whitespace-no-wrap">
//               <thead>
//                 <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
//                   <th className="border p-2 text-center">ID</th>
//                   <th className="border p-2 text-center">Người đặt hàng</th>
//                   <th className="border p-2 text-center">Trạng thái</th>
//                   <th className="border p-2 text-center">Số lượng sản phẩm</th>
//                   <th className="border p-2 text-center">
//                     Tổng giá trị đơn hàng
//                   </th>
//                   <th className="border p-2 text-center">Thao tác</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
//                 {orders.map((order, index) => (
//                   <tr key={index} className="text-gray-700 dark:text-gray-400">
//                     <td className="border p-2 text-center">{index + 1}</td>
//                     <td className="border p-2 text-center">{order.date}</td>

//                     <td className="border p-2 text-center text-sm">
//                       {order.status == 0
//                         ? "Đang chờ"
//                         : order.status == 1
//                         ? "Đã xác nhận"
//                         : "Đã bị hủy"}
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {order.products.map(
//                         (pr) => ` ${pr.product_name} : ${pr.quantity} `
//                       )}
//                     </td>
//                     <td className="border p-2 text-center text-sm">
//                       {formatMoney(order.total)}
//                     </td>

//                     <td className="border p-2 text-center">
//                       <div className="flex justify-center space-x-4 text-sm">
//                         {order.status == 0 && (
//                           <>
//                             <Button onClick={() => handleDelete(order.id)}>
//                               Hủy đơn
//                             </Button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import { Button, Modal } from "antd";
import { instance } from "../../../api/axios";
import { formatMoney } from "../../../utils/validateData";
import { Link } from "react-router-dom";

export default function History({ cartLength, setIsLoad }) {
  const [orders, setOrders] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái của modal
  const [orderIdToDelete, setOrderIdToDelete] = useState(null); // Lưu ID đơn hàng cần xóa
  
  // Hiển thị modal khi click vào nút "Hủy đơn"
  const showModal = (orderId) => {
    setOrderIdToDelete(orderId); // Lưu ID của đơn hàng cần xóa
    setIsModalVisible(true); // Hiển thị modal
  };
  
  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setOrderIdToDelete(null); // Reset lại orderIdToDelete sau khi đóng modal
  };
  

  // const useRestoreProductQuantity = (productId, quantity) => {
  //   useEffect(() => {
  //     // Khôi phục số lượng sản phẩm khi thành phần được tạo ra
  //     instance
  //       .patch(`/products/${productId}`, {
  //         quantity: quantity,
  //       })
  //       .then((response) => console.log("Khôi phục số lượng sản phẩm"))
  //       .catch((error) => console.log(error));
  //   }, [productId, quantity]); // Chạy hiệu ứng này mỗi khi productId hoặc quantity thay đổi
  // };

  //   const handleDelete = (id) => {
  //     instance
  //       .delete(`/orders/${id}`)
  //       .then((response) => {
  //         handleCancel();
  //         const updatedOrders = orders.filter((order) => order.id !== id);
  //         setOrders(updatedOrders);
  //         const canceledOrder = orders.find((order) => order.id === id);
  //         // if (canceledOrder) {
  //         //   for (const product of canceledOrder.products) {
  //         //     useRestoreProductQuantity(product.id, product.quantity);
  //         //   }
  //         // }
  //       })
  //       .catch((error) => console.log(error));
  //   };

  // Cách bạn đã định nghĩa hook useRestoreProductQuantity
  const useRestoreProductQuantity = (productId, quantity) => {
    useEffect(() => {
      // Khôi phục số lượng sản phẩm khi thành phần được tạo ra
      instance
        .patch(`/products/${productId}`, {
          quantity: quantity,
        })
        .then((response) => console.log("Khôi phục số lượng sản phẩm"))
        .catch((error) => console.log(error));
    }, [productId, quantity]); // Chạy hiệu ứng này mỗi khi productId hoặc quantity thay đổi
  };

  const handleUpdateStatus = (id) => {
    // Gọi API để cập nhật trạng thái đơn hàng khi nhấn xác nhận
    instance
      .put(`/api/order/${id}/status`, {  // Đảm bảo đường dẫn API đúng
        status: 2,  // Cập nhật trạng thái đơn hàng thành "2" (Ví dụ: trạng thái đã giao)
      })
      .then((response) => {
        console.log("Cập nhật trạng thái đơn hàng thành công:", response.data);
        handleCancel();  // Đóng modal sau khi cập nhật thành công
  
        // Gọi lại API để lấy danh sách đơn hàng mới
        const userLocal = JSON.parse(localStorage.getItem("userLocal"));
    // console.log("🔍 userLocal từ localStorage:", userLocal);
  
    if (userLocal?.id) {
      const apiUrl = `api/order/${userLocal.id}`;
      // console.log("🌐 Gọi API GET:", apiUrl);
  
      instance
        .get(apiUrl)
        .then((response) => {
          // console.log("✅ Dữ liệu đơn hàng trả về:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("❌ Lỗi lấy đơn hàng:", error);
        });
    }
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        // Xử lý thông báo lỗi ở đây nếu cần
      });
  };
  
  
  
  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userLocal"));
    // console.log("🔍 userLocal từ localStorage:", userLocal);
  
    if (userLocal?.id) {
      const apiUrl = `api/order/${userLocal.id}`;
      // console.log("🌐 Gọi API GET:", apiUrl);
  
      instance
        .get(apiUrl)
        .then((response) => {
          // console.log("✅ Dữ liệu đơn hàng trả về:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("❌ Lỗi lấy đơn hàng:", error);
        });
    } else {
      console.warn("⚠️ Không tìm thấy userLocal hoặc userLocal.id");
    }
  }, []);
  
  

  return (
    <>
      <Navbar cartLength={cartLength} />
      <div className="container px-6 mx-auto grid">
        <h4 className="text-center mb-4 mt-5 text-lg font-semibold text-gray-600 dark:text-gray-300">
          LỊCH SỬ MUA HÀNG
        </h4>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-sm font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="border p-2 text-center">ID</th>
                  <th className="border p-2 text-center">Người đặt hàng</th>

                  <th className="border p-2 text-center">Số lượng sản phẩm</th>
                  <th className="border p-2 text-center">
                    Tổng giá trị đơn hàng
                  </th>
                  <th className="border p-2 text-center">
                    Thời gian
                  </th>
                  <th className="border p-2 text-center">Trạng thái</th>
                  <th className="border p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {orders.map((order, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="border p-2 text-center">{order.order_id}</td>
                    <td className="border p-2 text-center">{order.order_name}</td>

                    <td className="border p-2 text-center text-sm">
                     {order.order_details}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {formatMoney(order.total_amount)}
                    </td>
                    
                    <td className="border p-2 text-center text-sm">
  {new Date(order.created_at).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</td>

                    <td className="border p-2 text-center">
                      {order.status == 0
                        ? "Đang chờ"
                        : order.status == 1
                        ? "Đã xác nhận"
                        : "Đã bị hủy"}
                    </td>
                    <td className="border p-2 text-center">
  <div className="flex justify-center space-x-4">
    {order.status === 0 && (
      <>
        <Button
          onClick={() => showModal(order.order_id)} // Hiển thị modal khi click
          danger
          size="small"
        >
          Hủy đơn
        </Button>
        <Modal
          title="Xác nhận hủy đơn hàng"
          visible={isModalVisible && orderIdToDelete === order.order_id} // Kiểm tra xem modal có hiện lên với đúng ID hay không
          onCancel={handleCancel}
          onOk={() => {
            handleUpdateStatus(orderIdToDelete); // Gọi hàm hủy đơn khi nhấn xác nhận
          }}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
        </Modal>
      </>
    )}
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
