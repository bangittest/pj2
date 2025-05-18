import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../layout/user/footer/Footer";
import { instance } from "../../../api/axios";
import { formattedAmount } from "../../../utils/fomatMoney";
import { Image, notification } from "antd";
import { formatMoney } from "../../../utils/validateData";

export default function Description({ cartLength, setIsLoad }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [carts, setCarts] = useState();
  const { id } = useParams(); // lấy id sản phẩm từ URL
  const users = JSON.parse(localStorage.getItem("userLocal"));

  const [newReview, setNewReview] = useState({
    product_id: "",
    username: "" ,
    comment: "",
  });

  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instance.get(`/api/review/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      }
    };
  
    if (id) fetchReviews();
  }, [id]);




  useEffect(() => {
    const fetchReviewss = async () => {
      try {
        const res = await instance.get(`/api/review/count/${id}`);
        console.log("Tổng review:", res.data.total);
        setReviewsCount(res.data.total)
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      }
    };
  
    if (id) fetchReviewss();
  }, [id]);

  
  // useEffect(() => {
  //   instance.get(`/api/review/count/${id}`)
  //     .then(res => {
  //       console.log("Tổng review:", res.data.count);
  //       setReviewsCount(res.data.count)
  //     })
  //     .catch(err => console.log("Lỗi khi lấy số lượng review:", err));
  // }, [id]);

  const userLogin = JSON.parse(localStorage.getItem("userLocal"));

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedComment = newReview.comment.trim();
    const trimmedUsername = userLogin?.email?.trim();
  
    if (!trimmedComment) {
      setNewReview(prev => ({ ...prev, comment: "" }));
      notification.warning({
        message: "Thiếu nội dung",
        description: "Vui lòng nhập đánh giá trước khi gửi.",
      });
      return;
    }
  
    if (!trimmedUsername) {
      setNewReview(prev => ({ ...prev, comment: "" }));
      notification.warning({
        message: "Chưa đăng nhập",
        description: "Vui lòng đăng nhập tài khoản.",
      });
      return;
    }
  
    try {
      await instance.post("/api/review", {
        ...newReview,
        comment: trimmedComment,
        username: trimmedUsername,
        product_id: id
      });
  
      notification.success({
        message: "Thành công",
        description: "Đánh giá của bạn đã được gửi!",
      });
  
      // Cập nhật lại danh sách review mới nhất
      const { data } = await instance.get(`/api/review/${id}`);
      setReviews(data);
  
      // Reset lại comment
      setNewReview(prev => ({ ...prev, comment: "" }));
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
  
      const errMessage = error.response?.data?.message || "Đã xảy ra lỗi khi gửi đánh giá.";
      setNewReview(prev => ({ ...prev, comment: "" }));
      if (error.response?.status === 400) {
        notification.warning({
          message: "Không thể gửi đánh giá",
          description: errMessage,
        });
      } else {
        notification.error({
          message: "Lỗi hệ thống",
          description: errMessage,
        });
      }
    }
  };
  

  const [products, setProducts] = useState([]);
  
    //gọi API lấy tất cả thông tin sản phẩm
  
    const loadDataProduct = () => {
      instance
        .get("api/products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      loadDataProduct();
    }, []);
  
    // Lấy ngẫu nhiên 8 sản phẩm từ mảng
    const randomProductsHottrend = products
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
      
      useEffect(() => {
        if (!id) return;
      
        const fetchProductAndReviews = async () => {
          try {
            const productRes = await instance.get(`/api/products/${id}`);
            const productData = productRes.data;
      
            if (Array.isArray(productData) && productData.length > 0) {
              setProduct(productData[0]);
      
              const reviewRes = await instance.get(`/api/review/${id}`);
              setReviews(reviewRes.data);
            } else {
              console.warn("Không tìm thấy sản phẩm.");
            }
          } catch (error) {
            console.error("Lỗi khi lấy sản phẩm hoặc đánh giá:", error);
          }
        };
      
        fetchProductAndReviews();
      }, [id]);
      
  const CartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));

   const getCarts = async (idUser) => {
      const response = await instance.get(`api/cart/cart`, {
        params: { idUser }
      });    
      return response.data;
    };
    
    const handleAddtoCart = async () => {
      if (!userLocal) {
        notification.warning({
          message: "Thất bại",
          description: "Vui lòng hãy đăng nhập",
        });
        navigate("/login");
      } else {
        try {
          // PHẢI await ở đây
          const cart = await getCarts(userLogin.id); 
    
          const res = await instance.post('/api/cart/add', {
            cart_id: cart.id,
            product_id: product.id,
            quantity: 1
          });
    
          notification.success({
            message: "Thành công",
            description: `Sản phẩm đã được thêm vào giỏ hàng`,
          });
          setIsLoad(prev => !prev);
        } catch (error) {
          notification.error({
            message: "Thất bại",
            description: error.response?.data?.error || "Có lỗi xảy ra.",
          });
        }
      }
    };
    

  useEffect(() => {
    instance
      .get(`/api/carts/${CartId}`)
      .then((response) => setCarts(response.data))
      .catch((error) => console.log(error));
  }, [CartId]);

  return (
    <>
      <Navbar cartLength={cartLength} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Description</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="product-details spad">
        <div className="container">
          <div className="justify-center row p-8 bg-gray-100 rounded-lg gap-20">
            <div className="">
              <div className="product__details__pic">
                <Link to="#">
                  <Image
                    width={300}
                    height={350}
                    style={{ objectFit: "cover" }}
                    src={product.image}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 w-3/5">
              <div className="product__details__text">
                <h3 className="text-2xl font-semibold">
                  {product.product_name}
                </h3>
                <div className="rating">
                  <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                  <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                  <i className="fa fa-star" />
                </div>
                <div className="product__details__price text-3xl font-semibold">
                  {formatMoney(product.price)}
                </div>

                <div className="product__details__text">
                  <h3 className="text-lg font-semibold">Xuất xứ</h3>
                </div>
                <p className="text-gray-600">{product.from}</p>

                <div className="product__details__text">
                  {/* <h3 className="text-lg font-semibold">Mô tả</h3> */}
                  <span>Chương trình khuyến mãi:</span>
                  <p>Free shipping</p>
                </div>

                {/* <p className="text-gray-600"> {product.description}...</p> */}
                {/* <li>
                                    <span>Promotions:</span>
                                    <p>Free shipping</p>
                                </li> */}
                <div className="product__details__button mt-6">
                  <Link
                    onClick={handleAddtoCart}
                    to="#"
                    className="cart-btn"
                  >
                    <span className="icon_bag_alt mr-2" /> Add to cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
  <div className="product__details__tab">
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          data-toggle="tab"
          href="#tabs-1"
          role="tab"
        >
          Description
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
          Specification
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
          Reviews ( {reviewsCount} )
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane active" id="tabs-1" role="tabpanel">
        <h6>Description</h6>
        <p>
        {product.description}
        </p>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p> */}
      </div>
      <div className="tab-pane" id="tabs-2" role="tabpanel">
        <h6>Specification</h6>
        <p>
         {product.specification}
        </p>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem.
        </p> */}
      </div>
      <div className="tab-pane" id="tabs-3" role="tabpanel">
  <h6>Reviews ( {reviewsCount} )</h6>

  <div className="existing-reviews">
  <h6>Nhận xét trước đây</h6>
  {reviews.filter(r => r.username.toLowerCase() !== "freyr").length === 0 ? (
    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
  ) : (
    reviews
      .filter(review => review.username.toLowerCase() !== "freyr")
      .map((review, i) => (
        <div key={i} className="review bg-gray-50 p-4 rounded-md border border-gray-200 mb-4 shadow-sm">
          <strong className="block text-gray-800">{review.username}</strong>
          <p className="text-gray-700 mb-">{review.comment}</p>
          <p className="text-xs text-gray-500 text-right mt-2 italic">
            {new Date(review.created_at).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })}
          </p>
        </div>
      ))
  )}
</div>

            {/* <p>{review.comment}</p>
          </div>
        ))
      )}
    </div> */}
  <div className="review-form">
    <h6>Để lại một bình luận</h6>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="commentText">Nhận xét của bạn:</label>
        <textarea
          id="commentText"
          className="form-control"
          rows="4"
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        ></textarea>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  </div>
</div>


          </div>
          <div className="row">
  <div className="col-lg-12 text-center">
    <div className="related__title">
      <h5>Sản phẩm liên quan</h5>
    </div>
  </div>
  
  {randomProductsHottrend.map((product, index) => (
    <div className="col-lg-3 col-md-4 col-sm-6">
    <div key={index} className="product__item">
      {/* <div
        className="product__item__pic set-bg"
        data-setbg="img/product/related/rp-1.jpg"
      >
        <div className="label new">New</div>
        <ul className="product__hover"> */}
        <Image
                          src={product.image}
                          width={300}
                          height={350}
                          style={{ objectFit: "cover" }}
                          alt=""
                        />


          {/* <li>
            <a href="#">
              <span className="icon_heart_alt" />
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon_bag_alt" />
            </a>
          </li>
        </ul> */}
      </div>
      <div className="product__item__text text-left">
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
        <div className="product__price"> {formatMoney(product.price)}</div>
      </div>
    {/* </div> */}
      </div>
     ))}


</div>

        </div>
      </section>
      
      <Footer />
    </>
  );
}
