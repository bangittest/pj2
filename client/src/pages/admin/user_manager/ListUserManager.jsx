import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUser, getUser } from "../../../redux/slice/userSlice";
import Loading from "../../../components/base/loading/Loading";
import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";

export default function ListUserManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [seachtext, setSeachText] = useState("");
  useEffect(() => {
    dispatch(getUser(seachtext));
  }, [seachtext]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data);
  const isLoadingChange = useSelector((state) => state.users.isLoadingChange);

  // console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [isLoadingChange]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedUser = user.slice(startIndex, endIndex);
  // console.log(displayedProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {isLoadingChange && <Loading />}
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
            <table className="border w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="border p-2 text-center">Id</th>
                  <th className="border p-2 text-center">email</th>
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
                    <td className="border p-2 text-center text-sm">{e.id}</td>
                    <td className="border p-2 text-center text-sm">
                      {e.email}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {e.gender == 0 ? "Nam" : e.gender == 1 ? "Nữ" : "Khác"}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {e.dateOfBirthday}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {e.user_name}
                    </td>
                    <td className="border p-2 text-center text-sm">
                      {e.role == 0 ? "admin" : "user"}
                    </td>
                    {/* <td className="border p-2 text-center text-sm">{e.role}</td> */}
                    <td className="border p-2 text-center">
                      <div className="flex justify-center items-center space-x-4 text-sm">
                        {e.role == 1 ? (
                          <button
                            onClick={() => dispatch(changeActiveUser(e))}
                            className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white flex items-center justify-between px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            {!e.active ? "Lock" : "Unlock"}
                          </button>
                        ) : (
                          ""
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
