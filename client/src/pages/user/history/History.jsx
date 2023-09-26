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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  const showModal = (orderId) => {
    setOrderIdToDelete(orderId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const handleDelete = (id) => {
    instance
      .delete(`/orders/${id}`)
      .then((response) => {
        handleCancel();
        const updatedOrders = orders.filter((order) => order.id !== id);
        setOrders(updatedOrders);

        // Sau khi xóa đơn hàng, khôi phục số lượng sản phẩm
        const canceledOrder = orders.find((order) => order.id === id);
        if (canceledOrder) {
          for (const product of canceledOrder.products) {
            useRestoreProductQuantity(product.id, product.quantity);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    instance
      .get("/orders")
      .then((response) => {
        const cartOrder = [];
        response.data.map((cr) => {
          if (cr.userId == userLogin.id) {
            cartOrder.push(cr);
          }
        });
        setOrders(cartOrder);
      })
      .catch((error) => console.log(error));
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
                  <th className="border p-2 text-center">Trạng thái</th>
                  <th className="border p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {orders.map((order, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="border p-2 text-center">{order.id}</td>
                    <td className="border p-2 text-center">{order.date}</td>

                    <td className="border p-2 text-center text-sm">
                      {order.products.map(
                        (pr) => ` ${pr.product_name} : ${pr.quantity} `
                      )}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {formatMoney(order.total)}
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
                        {order.status == 0 && (
                          <>
                            <Button
                              onClick={() => showModal(order.id)}
                              danger
                              size="small"
                            >
                              Hủy đơn
                            </Button>
                            <Modal
                              title="Xác nhận hủy đơn hàng"
                              visible={
                                isModalVisible && orderIdToDelete === order.id
                              }
                              onCancel={handleCancel}
                              onOk={() => {
                                handleDelete(order.id);
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
