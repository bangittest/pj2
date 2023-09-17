import React from "react";
import "../seach/seach.css";
import { CloseOutlined } from "@ant-design/icons";
export default function Seach({closeSeach}) {
    
  return (
    <div>
      <div className="relative">
        <div
          className="flex z-50 absolute top-1 right-0.5 mt-3 p-2 bg-white border border-gray-300 rounded
         shadow-lg"
        >
          <div onClick={closeSeach} className="flex items-center justify-between ">
            <CloseOutlined className="cursor-pointer hover:bg-slate-300 p-2 rounded-full" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className=" border border-gray-300 rounded "
          />
          <button className=" px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Seach
          </button>
        </div>
      </div>
    </div>
  );
}
