import React, { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/slice/orderSlice";
import { instance } from "../../../api/axios";
import { formatMoney } from "./../../../utils/validateData";
import FormDeltail from "../../../components/admin/manager-order/FormDeltail";

export default function ListOrderManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState([]);
  const [userProductsMap, setUserProductsMap] = useState({});

  const [seachtext, setSeachText] = useState("");
  useEffect(() => {
    dispatch(getOrder(seachtext));
  }, [seachtext]);
  // const [showForm, setShowForm] = useState(false);
  // const [idDetail, setIdDetail] = useState();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  // console.log(orders);
  const isLoadingChange = useSelector((state) => state.users.isLoadingChange);

  // const handleShowForm = (id) => {
  //   setIdDetail(id);
  //   setShowForm(true);
  // };
  // const handleCloseForm = () => {
  //   setShowForm(false);
  // };

  const handleAccept = async (id) => {
    try {
      const response = await instance.patch(`/orders/${id}`, {
        status: 1,
      });
      dispatch(getOrder());
    } catch (error) {
      console.log("errrrr");
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await instance.patch(`/orders/${id}`, {
        status: 2,
      });
      dispatch(getOrder());
    } catch (error) {
      console.log("errrrr");
    }
  };

  // Lấy danh sách đơn hàng khi isLoadingChange thay đổi
  useEffect(() => {
    dispatch(getOrder());
  }, [isLoadingChange]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedOrder = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* {showForm && (
        <FormDeltail idDetail={idDetail} handleCloseForm={handleCloseForm} />
      )} */}
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
        <div></div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="border p-2 text-center" title="Số thứ tự">
                    STT
                  </th>

                  <th className="border p-2 text-center">Họ và tên</th>
                  <th className="border p-2 text-center">Địa chỉ</th>
                  <th className="border p-2 text-center">Người đặt hàng</th>

                  <th className="border p-2 text-center">Số lượng sản phẩm</th>
                  <th className="border p-2 text-center">Tổng giá</th>
                  <th className="border p-2 text-center">Trạng thái</th>
                  <th className="border p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {displayedOrder.map((order, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="border p-2 text-center">{index + 1}</td>

                    <td className="border p-2 text-center">{order.username}</td>
                    <td className="border p-2 text-center">{order.address}</td>
                    <td className="border p-2 text-center">{order.date}</td>

                    <td className="border p-2 text-center">
                      {order.products.map(
                        (pr) => `${pr.product_name}: ${pr.quantity}; `
                      )}
                    </td>
                    <td className="border p-2 text-center">
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
                      <div className="flex justify-center  space-x-4 text-sm">
                        {order.status == 0 && (
                          <>
                            <Button
                              onClick={() => handleAccept(order.id)}
                              className="bg-green-500 hover:bg-green-600 text-white font-semibold  rounded focus:outline-none focus:shadow-outline-green active:bg-green-700"
                            >
                              Xác nhận
                            </Button>
                            <Button
                              onClick={() => handleCancel(order.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold  rounded focus:outline-none focus:shadow-outline-red active:bg-red-700"
                            >
                              Hủy
                            </Button>
                          </>
                        )}
                        {/* <Button onClick={() => handleShowForm(order.id)}>
                          chi tiết
                        </Button> */}
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
