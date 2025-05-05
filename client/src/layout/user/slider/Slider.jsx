import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import { instance } from "../../../api/axios";

export default function Slider() {
  const [sliderHeight, setSliderHeight] = useState("32rem");
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    function handleResize() {
      // Tính toán chiều cao mới dựa trên chiều rộng của màn hình
      const screenWidth = window.innerWidth;
      let newHeight = "32rem"; // Chiều cao mặc định

      if (screenWidth < 768) {
        // Điều chỉnh chiều cao cho các màn hình nhỏ hơn 768px (thiết bị di động)
        newHeight = "20rem"; // Đặt chiều cao cho màn hình nhỏ hơn
      }

      setSliderHeight(newHeight);
    }

    // Gắn sự kiện lắng nghe thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Gọi hàm handleResize lần đầu khi trang được load
    handleResize();

    // Loại bỏ sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contentStyle = {
    height: sliderHeight, // Sử dụng chiều cao được tính toán
    textAlign: "center",
    background: "#364d79",
    position: "relative",
    color: "#FFFFFF",
  };

  const whiteTextStyles = {
    color: "#fff", // Đảm bảo màu sắc chữ là trắng
  };

  const textStyles = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#FFFFFF",
    fontSize: "40px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  // const buttonStyle = {
  //   position: "absolute",
  //   bottom: "10rem", // Điều chỉnh vị trí của nút bấm
  //   // left: "50%",
  //   transform: "translateX(-50%)",
  //   textAlign:"center",
  //   padding: "1rem 3rem 1rem 3rem",

  // };

  useEffect(() => {
    instance
      .get("api/slider")
      .then((response) => setSlider(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Carousel autoplay>
      {slider.map((sli) => (
        <div key={sli.id}>
          <div style={contentStyle}>
            <img src={sli.image} alt="" className="block w-full" />
            <div style={{ ...textStyles, ...whiteTextStyles }}>
              <h3 style={{ color: "white" }}>{sli.title}</h3>
              <p
                style={{ color: "white", fontSize: "25px", marginTop: "10px" }}
              >
                {sli.description}
              </p>
            </div>
            {/* <Link to="/list-product">
          <button className="bg-blue-500 rounded-md hover:bg-blue-50" style={buttonStyle} type="primary">
          SHOP NOW
          </button>
          </Link> */}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
