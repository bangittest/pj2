import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Pagination, message } from "antd";
import axios from "axios";
import Loading from "../../../components/base/loading/Loading";
import Search from "antd/es/input/Search";

export default function ListCategory() {
  const [seachtext, setSeachText] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  
  // Modal state
  const [formRef] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryUpdate, setCatagoryUpdate] = useState({});
  
  // Modal Delete state
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();


  
  // Fetch categories from backend
  const fetchCategories = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/categories", {
        params: { category_name_like: search },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      message.error("Không thể lấy danh mục.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories(seachtext);
  }, [seachtext]);

  const handleShowModal = (cate) => {
    setCatagoryUpdate(cate);
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setCatagoryUpdate({});
    setIsModalOpen(false);
    formRef.resetFields();
  };

  const onFinish = async (values) => {
    setIsLoadingChange(true);
    try {
        if (categoryUpdate && categoryUpdate.id) {
            // Cập nhật danh mục
            const response = await axios.put(`http://localhost:4000/api/categories/${categoryUpdate.id}`, { name: values.category_name });
            console.log("Cập nhật thành công:", response.data);
            fetchCategories(seachtext);  // Fetch lại danh mục sau khi cập nhật
        } else {
            // Thêm mới danh mục
            const response = await axios.post("http://localhost:4000/api/categories", { name: values.category_name });
            console.log("Thêm danh mục mới thành công:", response.data);
            fetchCategories(seachtext);  // Fetch lại danh mục sau khi thêm mới
        }
        formRef.resetFields();
        handleCancel();
    } catch (error) {
        console.error("Lỗi khi thêm hoặc cập nhật danh mục:", error);
        // Nếu error.response có dữ liệu, nghĩa là backend trả lỗi
        if (error.response && error.response.data) {
            message.error(`Lỗi: ${error.response.data.message || 'Có lỗi xảy ra!'}`);
        } else {
            message.error("Không thể kết nối tới server.");
        }
    }
    setIsLoadingChange(false);
};

  

  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };

  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

  const handleOkDelete = async () => {
    setIsLoadingChange(true);
    try {
      await axios.delete(`http://localhost:4000/api/categories/${idDelete}`);
      fetchCategories(seachtext);
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      message.error("Không thể xóa danh mục.");
    }
    setIsLoadingChange(false);
    setIsModalOpenDelete(false);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / pageSize);

  // Tạo mảng users cho trang hiện tại
  const currentCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      <Modal
        title="Danh mục"
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên danh mục"
            name="category_name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xóa danh mục"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa?</p>
      </Modal>

      {isLoading || isLoadingChange ? <Loading /> : null}

      <div className="container px-6 mx-auto grid">
        <h4 className="font-sans text-center mb-2 mt-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          QUẢN LÝ DANH MỤC
        </h4>

        <div className="flex justify-between z-0">
          <div className="mb-2">
            <Button
              onClick={() => handleShowModal()}
              className="z-0 bg-blue-500 font-bold text-white hover:bg-blue-500 active:bg-blue-500"
            >
              +Thêm mới
            </Button>
          </div>
          <div>
            <Search
              value={seachtext}
              onChange={(e) => setSeachText(e.target.value)}
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
                  <th className="border p-2 text-center">STT</th>
                  <th className="border p-2 text-center">Tên danh mục</th>
                  <th className="border p-2 text-center">Status</th>
                  <th className="border p-2 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((e, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">{e.id}</td>
                    <td className="border p-2 text-center">{e.category_name}</td>
                    <td className="border p-2 text-center">
                        {e.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                    </td>
                    <td className="border p-2 text-center">
                
                    <div className="flex justify-center items-center space-x-4 text-sm">
                    <button
                          onClick={() => handleShowModal(e)}
                          className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white flex items-center justify-between px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                          aria-label="Edit"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      <button
                          onClick={() => handleShowModalDelete(e.id)}
                          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white  flex items-center justify-between px-2 py-2 text-sm font-medium leading-5  rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                          aria-label="Delete"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
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
        total={totalCategories}
        onChange={handlePageChange}
      />
    </>
  );
}



