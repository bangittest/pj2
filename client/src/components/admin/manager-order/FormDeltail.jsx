import { Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

export default function FormDeltail({ handleCloseForm, idDetail }) {
  const dispatch = useDispatch();

  const listOrder = useSelector((state) => state.orders.data);
  const isLoadingChange = useSelector((state) => state.orders.isLoadingChange);
  const [order, setOrder] = useState({
    product_name: "",
    total: 0,
    status: "",
  });

  //lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setOrder({
      ...product,
      [name]: value,
    });
  };
  return (
    <div>
      <div className="product-container">
        <form className="form-container relative">
          <CloseOutlined
            onClick={handleCloseForm}
            className="absolute right-0 top-0 p-6 cursor-pointer"
          />
          <h3 className="text-center font-bold mb-4">Chi tiết sản phẩm</h3>
          <div className="flex gap-5">
            <div className="mb-3 text-start">
              <label className="form-label">Tên sản phẩm:</label>
              <Input
                onChange={handleChange}
                type="text"
                id="product_name"
                name="product_name"
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="price" className="form-label">
                Giá tiền:
              </label>
              <Input
                onChange={handleChange}
                type="number"
                id="price"
                name="total"
                min={0}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-3 text-start">
              <label htmlFor="discount" className="form-label">
                Giảm giá:
              </label>
              <Input
                onChange={handleChange}
                type="number"
                id="status"
                name="status"
                min={0}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="quantity">Số lượng:</label>
              <InputNumber
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

          {/* <div className="mb-3 text-start">
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
          </div> */}
        </form>
      </div>
    </div>
  );
}
