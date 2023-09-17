import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";

export default function Slider() {


  const [sliderHeight, setSliderHeight] = useState("32rem");

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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "10rem", // Điều chỉnh vị trí của nút bấm
    // left: "50%",
    transform: "translateX(-50%)",
    textAlign:"center"
  };

  return (
    <Carousel autoplay>
      <div>
        <div style={contentStyle}>
          <img src="./src/assets/img/banner/slider-1.jpg" alt="" />
          <div style={{...textStyles,...whiteTextStyles}}>
            <h3 style={{color:"white"}}>Welcome to ASHION.COM</h3>
            <p style={{color:"white"}}>Shop online for the latest accessories</p>
          </div>
          <Button style={buttonStyle} type="primary">
            <Link to="/list-product">Shopping</Link>
          </Button>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="./src/assets/img/banner/slider-2.jpg" alt="" />
          <div style={textStyles}>
            <h1  style={{color:"white"}}>50% Discount on all products</h1>
            <p style={{color:"white"}}>
            It is very important to have a customer to explain to
               everyone's efforts, in fact, that is the style motto
               our rich.
            </p>
          </div>
          <Button style={buttonStyle} type="primary">
          <Link href="/block">Find out more</Link>
          </Button>
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img src="./src/assets/img/banner/slider-3.jpg" alt="" />
          <div style={textStyles}>
            <h1 style={{color:"white"}}>24-hour customer support</h1>
            <p style={{color:"white"}}>It is very important to have a customer to account for everyone's efforts, in fact, it is our rich motto.</p>
          </div>
          <Button style={buttonStyle} type="primary">
          <Link href="/block">Find out more</Link>
          </Button>
        </div>
      </div>
    </Carousel>
  );
}
