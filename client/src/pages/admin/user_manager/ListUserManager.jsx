import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeActiveUser } from "../../../redux/slice/userSlice";
import Loading from "../../../components/base/loading/Loading";
import { Button, Pagination, notification } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";

export default function ListUserManager() {
  const [user, setUser] = useState([]);  // Khởi tạo với mảng rỗng
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  // Fetch users with validation
  const fetchUsers = async (search = "") => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/users/all", {
        params: { user_name_like: search },
      });

      setUser(res.data); // Set user only if it's a valid array
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy user!",
      });
      setUser([]); // Fallback to an empty array to avoid issues
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers(searchText);
  }, [searchText]);

  const handleToggleActive = async (user) => {
    setIsChangingStatus(true);
    
    if (!user.id) {
      console.error("ID người dùng không hợp lệ:", user);
      notification.error({
        message: "Lỗi",
        description: "Không tìm thấy ID người dùng!",
      });
      setIsChangingStatus(false);
      return;
    }
  
    try {
      await axios.put(`http://localhost:4000/api/users/${user.id}`);
      await fetchUsers(searchText); // reload the list of users
      notification.success({ message: "Thành công", description: "Đã cập nhật trạng thái" });
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái user:", err);
      notification.error({
        message: "Lỗi",
        description: "Không thể thay đổi trạng thái người dùng!",
      });
    }
    setIsChangingStatus(false);
  };


  const handleRole = async (user) => {
    setIsChangingStatus(true);
    
    if (!user.id) {
      console.error("ID người dùng không hợp lệ:", user);
      notification.error({
        message: "Lỗi",
        description: "Không tìm thấy ID người dùng!",
      });
      setIsChangingStatus(false);
      return;
    }
  
    try {
      await axios.put(`http://localhost:4000/api/users/role/${user.id}`);
      await fetchUsers(searchText); // reload the list of users
      notification.success({ message: "Thành công", description: "Đã phân quyền thành công" });
    } catch (err) {
      console.error("Lỗi khi phân quyền:", err);
      notification.error({
        message: "Lỗi",
        description: "Không thể thay đổi trạng thái người dùng!",
      });
    }
    setIsChangingStatus(false);
  };
  
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedUser = user.slice(startIndex, endIndex); // Should now be safe to use slice

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {(isLoading || isChangingStatus) && <Loading />}
      <div className="container px-6 mx-auto grid">
        <h4 className="font-sans text-center mb-2 mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          QUẢN LÝ KHÁCH HÀNG
        </h4>
        <div className="flex justify-between z-0">
          <div className="mb-2">
            <Button className="z-0 bg-white font-bold text-gray-500">+</Button>
          </div>
          <div>
            <Search
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
              placeholder="Tìm kiếm"
            />
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="border w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="border p-2 text-center" title="Số thứ tự">
                    STT
                  </th>
                  <th className="border p-2 text-center">Email</th>
                  <th className="border p-2 text-center">Giới tính</th>
                  <th className="border p-2 text-center">Ngày sinh</th>
                  <th className="border p-2 text-center">Họ và tên</th>
                  <th className="border p-2 text-center">Phân quyền</th>
                  <th className="border p-2 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {displayedUser.map((e, index) => (
                  <tr key={index} className="text-gray-700 dark:text-gray-400">
                    <td className="border p-2 text-center text-sm">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="border p-2 text-center text-sm">{e.email}</td>
                    <td className="border p-2 text-center text-sm">
                      {e.gender === 0 ? "Nam" : e.gender === 1 ? "Nữ" : "Khác"}
                    </td>
                    <td className="border p-2 text-center text-sm">
  {e.dateOfBirthday ? new Date(e.dateOfBirthday).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) : "N/A"}
</td>

                    <td className="border p-2 text-center text-sm">{e.user_name}</td>
                    <td className="border p-2 text-center text-sm">
                      {e.role === 0 ? "admin" : "user"}
                    </td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center items-center space-x-4 text-sm">
                        {e.role === 1 && (
                          <button
                            onClick={() => handleToggleActive(e)}
                            className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            {e.active ? "Lock" : "Unlock"}
                          </button>

                          
                        )}

{e.role === 1 && (
                          <button
                            onClick={() => handleRole(e)}
                            className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            {e.role ? "ADMIN" : "USER"}
                          </button>

                          
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
        total={user.length}
        onChange={handlePageChange}
      />
    </>
  );
}
