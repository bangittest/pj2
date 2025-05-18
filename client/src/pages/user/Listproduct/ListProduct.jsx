import React, { useEffect, useState } from "react";
import "./listproduct.css";
import axios from "axios";
import Instagram from "../Instagram/Instagram";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../api/axios";
import { Image, Pagination, notification } from "antd";
import Loading from "../../../components/base/loading/Loading";
import { formatMoney } from "../../../utils/validateData";
import Search from "antd/es/input/Search";

export default function ListProduct({ cartLength, setIsLoad }) {
  const navigate = useNavigate();
  const [catagories, setCatagories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [load, setLoading] = useState(false);
  const [carts, setCarts] = useState({ cart: [] }); // Sử dụng object cart để thêm một layer
  const [search, setSearch] = useState("");

    // Khi người dùng nhập tìm kiếm
    const onSearch = (e) => {
      const value = e.target.value;
      setSearch(value);
      loadDataProduct(value, categoryId);
    };

  useEffect(() => {
    const fetchCategories = async (search = "") => {
      try {
        const response = await axios.get("http://localhost:4000/api/categories", {
          params: { category_name_like: search },
        });
        setCatagories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        message.error("Không thể lấy danh mục.");
      }
    };
  
    fetchCategories(); // gọi hàm ở đây
  }, []);

  
  
  // Lấy ra id của category
  const getCategoryId = (id) => {
    setCategoryId(id);
    loadDataProduct(search, id);
  };

  // Gọi API lấy tất cả thông tin sản phẩm

  // const loadDataProduct = async () => {
  //   setLoading(true);

  //   await instance
  //     .get(`/products`)
  //     .then((response) => {
  //       if (categoryId === 0) {
  //         setProducts(response.data);
  //       } else {
  //         const listProduct = response.data.filter(
  //           (product) => Number(product.category_id) === categoryId
  //         );

  //         setProducts(listProduct);
  //       }
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // };

  const loadDataProduct = async () => {
  
    try {
      const res = await axios.get("http://localhost:4000/api/products", {
        params: { product_name_like: search },
      });

      let data = res.data;

      // Nếu có chọn danh mục cụ thể
      if (categoryId !== 0) {
        data = data.filter(product => Number(product.category_id) === categoryId);
      }

      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy sản phẩm!",
      });
    } finally {
     
    }
  };


  // useEffect(() => {
  //   fetchCategories();
  //   loadDataProduct();
  // }, []);

  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const handleAddtoCart = async (id) => {
    if (!userLocal) {
      notification.warning({
        message: "Thất bại",
        description: "Vui lòng đăng nhập trước khi mua hàng",
      });
      navigate("/login");
    } else if (userLocal) {
      const cartUser = [...carts.cart]; // Clone mảng cart để tránh thay đổi trực tiếp
      const Index = cartUser.findIndex((pro) => pro.idProduct === id);
      if (Index === -1) {
        // Tìm sản phẩm trong danh sách sản phẩm
        const productToAdd = products.find((pro) => pro.id === id);

        // Kiểm tra nếu quantity của sản phẩm > 0 thì thêm vào giỏ hàng
        if (productToAdd.quantity > 0) {
          cartUser.push({ idProduct: id, quantity: 1 });

          // Cập nhật giỏ hàng trên server và trong localStorage
          await instance.put(`/carts/${CartId}`, { ...carts, cart: cartUser });
          setCarts({ cart: cartUser }); // Cập nhật state với giỏ hàng mới
          localStorage.setItem("carts", JSON.stringify(cartUser));

          // Thông báo thành công khi thêm sản phẩm
          notification.success({
            message: "Thành công",
            description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
          });
        } else {
          // Hiển thị thông báo lỗi nếu quantity = 0
          notification.error({
            message: "Thất bại",
            description: `Sản phẩm này đã hết hàng`,
          });
        }
      } else {
        // Kiểm tra số lượng sản phẩm trong kho
        const proCheck = products.find((pro) => pro.id === id);
        if (+proCheck.quantity <= 0) {
          // Thông báo lỗi nếu số lượng trong kho đã hết
          notification.error({
            message: "Thất bại",
            description: `Số lượng trong kho đã hết`,
          });
          return;
        }

        // Kiểm tra nếu số lượng sản phẩm trong giỏ hàng đã đạt tối đa
        if (+cartUser[Index].quantity >= +proCheck.quantity) {
          // Thông báo lỗi nếu số lượng trong kho đã hết
          notification.error({
            message: "Thất bại",
            description: `Số lượng sản phẩm đã đạt tối đa`,
          });
          return;
        }

        // Tăng số lượng sản phẩm trong giỏ hàng
        cartUser[Index].quantity += 1;

        // Cập nhật giỏ hàng trên server và trong localStorage
        await instance.put(`/carts/${CartId}`, { ...carts, cart: cartUser });
        setCarts({ cart: cartUser }); // Cập nhật state với giỏ hàng mới
        localStorage.setItem("carts", JSON.stringify(cartUser));

        // Thông báo thành công khi thêm sản phẩm
        notification.success({
          message: "Thành công",
          description: `Bạn đã thêm sản phẩm vào giỏ hàng thành công`,
        });
      }
    }

    setIsLoad((pre) => !pre);
  };

  useEffect(() => {
    instance
      .get(`/carts/${CartId}`)
      .then((response) => setCarts({ cart: response.data.cart }))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

  // Tính toán chỉ mục sản phẩm bắt đầu và kết thúc
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedProduct = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <>
        {load && <Loading />}
        <Navbar cartLength={cartLength} />
        {/* Breadcrumb Begin */}
        <div className="breadcrumb-option">
          <div className="container">
            <Search
              className="absolute right-32 z-50 "
              placeholder=" tìm kiếm"
              onChange={onSearch}
              style={{
                width: 200,
              }}
            />
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shop Section Begin */}
        <section className="shop spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <div className="shop__sidebar">
                  <div className="sidebar__categories">
                    <div className="section-title">
                      <h4>Danh mục</h4>
                    </div>
                    <div className="categories__accordion">
                      <div className="accordion" id="accordionExample">
                        {
                          <div
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => getCategoryId(0)}
                          >
                            <div className="card">
                              <a
                                style={
                                  categoryId === 0
                                    ? { textDecoration: "underline" }
                                    : {}
                                }
                                onClick={() => getCategoryId(0)}
                                data-toggle="collapse"
                                data-target="#collapseOne"
                              >
                                Tất cả sản phẩm
                              </a>
                            </div>
                          </div>
                        }

                        {catagories.map((cat, index) => (
                          <div
                            key={index}
                            className="card"
                            style={{ cursor: "pointer" }}
                            onClick={() => getCategoryId(cat.id)}
                          >
                            <div className="card">
                              <a
                                style={
                                  categoryId === cat.id
                                    ? { textDecoration: "underline" }
                                    : {}
                                }
                                data-toggle="collapse"
                                data-target="#collapseOne"
                              >
                                {cat.category_name}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="col-lg-9 col-md-9">
                <div className="section-title">
                  <h4>CÁC LOẠI SẢN PHẨM</h4>
                </div>
                <div className="row">
                  {displayedProduct.map((product, index) => (
                    <div key={index} className="col-lg-4 col-md-4">
                      <div className="product__item">
                        <div className="product__item__pic set-bg" data-setbg>
                          <Image
                            className="w-[280px] h-[360px] object-cover mx-auto product__item__pic set-bg image-container"
                            src={product.image}
                            alt=""
                          />
                          <div className="label new">Sale</div>
                          <ul className="product__hover">
                            {/* <li>
                              <Link to="#" className="image-popup">
                                <span className="arrow_expand" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <span className="icon_heart_alt" />
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => handleAddtoCart(product.id)}
                                to="#"
                              >
                                <span className="icon_bag_alt" />
                              </Link>
                            </li> */}
                          </ul>
                        </div>
                        <div className="product__item__text text-left">
                          <h6 className="text-base font-medium my-2">
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
                          <div className="product__price text-red-500 font-semibold text-sm">
                            {formatMoney(product.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4 ">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shop Section End */}
        <Instagram />
        <Footer />
        <Back_To_Top />
      </>
    </div>
  );
}
