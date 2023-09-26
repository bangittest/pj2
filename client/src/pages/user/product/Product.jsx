import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api/axios";
import { formattedAmount } from "../../../utils/fomatMoney";
import Loading from "../../../components/base/loading/Loading";
import { Image, Pagination, notification } from "antd";
import { formatMoney } from "./../../../utils/validateData";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd/es/radio";

export default function Product({ setIsLoad }) {
  const [catagories, setCatagories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [load, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    instance
      .get("/categories")
      .then((response) => {
        // console.log(response.data);
        setCatagories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //lấy ra id của category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  //gọi API lấy tất cả thông tin sản phẩm

  const loadDataProduct = async () => {
    setLoading(true);
    await instance
      .get("/products")
      .then((response) => {
        if (categoryId === 0) {
          setProducts(response.data);
        } else {
          const listProduct = response.data.filter(
            (product) => Number(product.category_id) === categoryId
          );

          setProducts(listProduct);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  // console.log(CartId);

  const handleAddtoCart = async (id) => {
    if (!userLocal) {
      notification.warning({
        message: "Thất bại",
        description: "Vui lòng hãy đăng nhập trước khi mua hàng",
      });
      navigate("/login");
    } else if (userLocal) {
      const cartUser = carts.cart;
      const Index = cartUser.findIndex((pro) => pro.idProduct === id);
      if (Index == -1) {
        cartUser.push({ idProduct: id, quantity: 1 });
        // console.log("them moi");
        notification.success({
          message: "Thành công",
          description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
        });
      } else {
        //check so lượng trong kho
        const proCheck = products.find((pro) => pro.id == id);

        if (+cartUser[Index].quantity >= +proCheck.quantity) {
          // console.log("Qua so luong");
          notification.error({
            message: "Thất bại",
            description: `Số lượng trong kho đã hết`,
          });
          return;
        }
        //nếu tồn tại trong giỏ hàng tăng thêm 1 số lượng
        cartUser[Index].quantity += 1;
        // console.log("+1");
        notification.success({
          message: "Thành công",
          description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
        });
      }
      await instance.put(`/carts/${CartId}`, { ...carts, cart: cartUser });
      localStorage.setItem("carts", JSON.stringify(cartUser));
    }

    setIsLoad((pre) => !pre);
  };

  useEffect(() => {
    instance
      .get(`/carts/${CartId}`)
      .then((response) => setCarts(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

  // Tính toán chỉ mục sản phẩm bắt đầu và kết thúc
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = currentPage * pageSize;
  // const displayedProduct = products.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      <>
        {load && <Loading />}
        {/* Product Section Begin */}
        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="section-title">
                  <h4>Sản phẩm mới nhất</h4>
                </div>
              </div>
              <div className="col-lg-8 col-md-8">
                <ul className="filter__controls">
                  <li
                    onClick={() => setCategoryId(0)}
                    className={categoryId === 0 ? "active" : {}}
                  >
                    Tất cả sản phẩm
                  </li>
                  {catagories.map((cat, index) => (
                    <li
                      onClick={() => getCategoryId(cat.id)}
                      key={index}
                      className={categoryId === cat.id ? "active" : {}}
                    >
                      {cat.category_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row property__gallery">
              {products.splice(0, 8).map((product, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-6 mix women"
                >
                  <div className="product__item">
                    <div className="product__item__pic set-bg" data-setbg>
                      <Image
                        className="product__item__pic set-bg image-container"
                        src={product.image}
                        alt=""
                      />
                      <div className="label new">New</div>
                      <ul className="product__hover">
                        <li>
                          <Link to="#" className="image-popup">
                            <span className="arrow_expand" />
                          </Link>
                        </li>
                        <li>
                          <a>
                            <span className="icon_heart_alt" />
                          </a>
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAddtoCart(product.id)}
                        >
                          <a>
                            <span className="icon_bag_alt" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <Link to={`/product/${product.id}`}>
                          {product.product_name}
                        </Link>
                      </h6>
                      <div className="rating">
                        <i className="fa fa-star">:</i>
                        <i className="fa fa-star">:</i>
                        <i className="fa fa-star">:</i>
                        <i className="fa fa-star">:</i>
                        <i className="fa fa-star" />
                      </div>
                      <div className="product__price">
                        {formatMoney(product.price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            {/* <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={handlePageChange}
            /> */}
            <Link to="/list-product">
              <Button className="bg-slate-200">
                {" "}
                Xem tất cả <ArrowRightOutlined />
              </Button>
            </Link>
          </div>
        </section>
      </>
    </div>
  );
}
