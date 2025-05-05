import React, { useEffect, useState } from "react";
import { Button, Pagination, Modal } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/slice/orderSlice";
import { instance } from "../../../api/axios";
import { formatMoney } from "./../../../utils/validateData";

export default function ListOrderManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [orders, setOrders] = useState([]);
  const [seachtext, setSeachText] = useState("");
  const dispatch = useDispatch();
  const isLoadingChange = useSelector((state) => state.users.isLoadingChange);

  // Gọi API lấy đơn hàng ban đầu
  useEffect(() => {
    const apiUrl = `api/order`;
    instance
      .get(apiUrl)
      .then((response) => {
        console.log("✅ Dữ liệu đơn hàng trả về:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("❌ Lỗi lấy đơn hàng:", error);
      });
  }, []); // Lần đầu khi render

  // Gọi lại API khi `isLoadingChange` thay đổi
  useEffect(() => {
    dispatch(getOrder(seachtext));
  }, [seachtext, isLoadingChange]);  // Đảm bảo gọi lại API khi tìm kiếm thay đổi

  // Cập nhật trạng thái "Xác nhận"
  const handleAccept = async (id) => {
    try {
      const response = await instance.put(`api/order/${id}/status`, {
        status: 1,
      });
      const apiUrl = `api/order`;
      instance
        .get(apiUrl)
        .then((response) => {
          console.log("✅ Dữ liệu đơn hàng trả về:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("❌ Lỗi lấy đơn hàng:", error);
        });
    } catch (error) {
      console.log("❌ Lỗi khi xác nhận đơn hàng:", error);
    }
  };

  // Cập nhật trạng thái "Hủy"
  const handleCancel = async (id) => {
    try {
      const response = await instance.patch(`/order/${id}/status`, {
        status: 2,
      });
      const apiUrl = `api/order`;
      instance
        .get(apiUrl)
        .then((response) => {
          console.log("✅ Dữ liệu đơn hàng trả về:", response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("❌ Lỗi lấy đơn hàng:", error);
        });
    } catch (error) {
      console.log("❌ Lỗi khi hủy đơn hàng:", error);
    }
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedOrder = orders.slice(startIndex, endIndex);

  return (
    <>
      <div className="container px-6 mx-auto grid">
        <h4 className="font-sans text-center mb-2 mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          QUẢN LÝ ĐƠN HÀNG
        </h4>
        <div className="flex justify-between z-0">
          <div className="mb-2">
            <Button className="z-0 bg-white font-bold text-gray-500">
              Đơn hàng
            </Button>
          </div>
          <div>
            <Search
              value={seachtext}
              onChange={(e) => setSeachText(e.target.value)}
              className=""
              style={{ width: 200 }}
              placeholder="tìm kiếm"
            />
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="border p-2 text-center">STT</th>
                  <th className="border p-2 text-center">Họ và tên</th>
                  <th className="border p-2 text-center">Địa chỉ</th>
                  <th className="border p-2 text-center">Ngày đặt hàng</th>
                  <th className="border p-2 text-center">Số lượng sản phẩm</th>
                  <th className="border p-2 text-center">Tổng giá</th>
                  <th className="border p-2 text-center">Trạng thái</th>
                  <th className="border p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {displayedOrder.map((order, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2 text-center">{order.order_name}</td>
                    <td className="border p-2 text-center">{order.address}</td>
                    
                    <td className="border p-2 text-center"> {new Date(order.created_at).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}</td>
                    <td className="border p-2 text-center">
                      {order.order_details}
                    </td>
                    <td className="border p-2 text-center">
                      {formatMoney(order.total_amount)}
                    </td>
                    <td className="border p-2 text-center">
                      {order.status == 0
                        ? "Đang chờ"
                        : order.status == 1
                        ? "Đã xác nhận"
                        : "Đã hủy"}
                    </td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center space-x-4">
                        {order.status == 0 && (
                          <>
                            <Button
                              onClick={() => handleAccept(order.order_id)}
                              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
                            >
                              Xác nhận
                            </Button>
                            <Button
                              onClick={() => handleCancel(order.order_id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
                            >
                              Hủy
                            </Button>
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
      <Pagination
        className="absolute right-0 bottom-0"
        current={currentPage}
        pageSize={pageSize}
        total={orders.length}
        onChange={handlePageChange}
      />
    </>
  );
}
