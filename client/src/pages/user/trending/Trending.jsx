import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Trending() {


  const [products, setProducts] = useState([]);



  //gọi API lấy tất cả thông tin sản phẩm

  const loadDataProduct = () => {
    axios
      .get("http://localhost:8888/products")
      .then((response) => {
          setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadDataProduct();
  }, []);


   // Lấy ngẫu nhiên 8 sản phẩm từ mảng
   const randomProductsHottrend = products.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
   const ramdomProducSeller= products.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
   const ramdomProducFature=products.slice().sort(() => 0.5 - Math.random()).slice(0, 3);




  return (
    <div>
      <>
        {/* Trend Section Begin */}
        <section className="trend spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                  <div className="section-title">
                    <h4>Hot Trend</h4>
                  </div>
                  {
                    randomProductsHottrend.map((product,index)=>(
                      <div key={index} className="trend__item">
                    <div className="trend__item__pic">
                      <img src={product.image} width={90} height={140} alt="" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.product_name}</h6>
                      <div className="rating">
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" />
                      </div>
                      <div className="product__price">{product.price}</div>
                    </div>
                  </div>
                    ))
                  }
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                  <div className="section-title">
                    <h4>Best seller</h4>
                  </div>
                  
                  {
                    ramdomProducSeller.map((product,index)=>(
                      <div key={index} className="trend__item">
                    <div className="trend__item__pic" style={{width:"90",height:"90"}}>
                      <img src={product.image} width={90} height={140} alt="" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.product_name}</h6>
                      <div className="rating">
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" />
                      </div>
                      <div className="product__price">{product.price}</div>
                    </div>
                  </div>
                    ))
                  }

                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="trend__content">
                  <div className="section-title">
                    <h4>Feature</h4>
                  </div>
                 
                  {
                    ramdomProducFature.map((product,index)=>(
                      <div key={index} className="trend__item">
                    <div className="trend__item__pic">
                      <img src={product.image} width={90} height={140} alt="" />
                    </div>
                    <div className="trend__item__text">
                      <h6>{product.product_name}</h6>
                      <div className="rating">
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" >:</i>
                        <i className="fa fa-star" />
                      </div>
                      <div className="product__price">{product.price}</div>
                    </div>
                  </div>
                    ))
                  }


                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Trend Section End */}
      </>
    </div>
  );
}
