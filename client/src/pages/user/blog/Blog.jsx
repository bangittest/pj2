import React from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import Instagram from "../Instagram/Instagram";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import Footer from "../../../layout/user/footer/Footer";
import { Link } from "react-router-dom";

export default function Blog({ cartLength, setIsLoad }) {
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
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Blog Details Section Begin */}
      <section className="blog-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="blog__details__content">
                <div className="blog__details__item">
                  <img
                    src="./src/assets/img/blog/details/blog-details.jpg"
                    alt=""
                  />
                  <div className="blog__details__item__title">
                    <span className="tip">Phong cách đường phố</span>
                    <h4>
                      Được nhìn thấy: làm thế nào sự đa dạng về tuổi tác ảnh
                      hưởng đến thay đổi trong thời trang và làm đẹp?
                    </h4>
                    <ul>
                      <li>
                        bởi <span>Ema Timahe</span>
                      </li>
                      <li>17 thg 9, 2019</li>
                      <li>39 Bình luận</li>
                    </ul>
                  </div>
                </div>
                <div className="blog__details__desc">
                  <p>
                    Mùa thời trang có thể được xác định không chỉ bằng những
                    người trên sàn catwalk mà còn bằng những bộ trang phục họ
                    đang mặc. Lần này, một thời điểm quan trọng đã đến tại cuối
                    show thời trang ở New York của Marc Jacobs, khi người mẫu
                    Christy Turlington, nay đã 50 tuổi và hầu như không trang
                    điểm, đã trở lại sàn catwalk (cô cũng là ngôi sao, cùng với
                    chính nhà thiết kế, trong chiến dịch quảng cáo mùa thu của
                    hãng), trong khi người mẫu trung bình trên sàn catwalk
                    thường là khoảng 18 tuổi.
                  </p>
                  <p>
                    Vài ngày sau đó, Simone Rocha có thể coi là đã nâng tầm cao
                    hơn. Show của cô, 32 tuổi, - một phần được truyền cảm hứng
                    từ Louise Bourgeois, người đã sống đến khi 98 tuổi - có sự
                    tham gia của các người mẫu trong độ tuổi 30 và 40, bao gồm
                    cả người mẫu cult Jeny Howorth và diễn viên Chloë Sevigny.
                  </p>
                </div>
                <div className="blog__details__quote">
                  <div className="icon">
                    <i className="fa fa-quote-left" />
                  </div>
                  <p>
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="blog__details__desc">
                  <p>
                    Occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate.
                  </p>
                </div>
                <div className="blog__details__tags">
                  <Link to="#">Thời trang</Link>
                  <Link to="#">Phong cách đường phố</Link>
                  <Link to="#">Sự đa dạng</Link>
                  <Link to="#">Làm đẹp</Link>
                </div>
                <div className="blog__details__btns">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__btn__item">
                        <h6>
                          <Link to="#">
                            <i className="fa fa-angle-left" /> Bài viết trước
                          </Link>
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__btn__item blog__details__btn__item--next">
                        <h6>
                          <Link to="#">
                            Bài viết tiếp theo{" "}
                            <i className="fa fa-angle-right" />
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog__details__comment">
                  <h5>3 Bình luận</h5>
                  <Link to="#" className="leave-btn">
                    Để lại bình luận
                  </Link>
                  <div className="blog__comment__item">
                    <div className="blog__comment__item__pic">
                      <img
                        src="./src/assets/img/blog/details/comment-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__comment__item__text">
                      <h6>Brandon Kelley</h6>
                      <p>
                        Duis voluptatum. Id vis consequat consetetur dissentiet,
                        ceteros commune perpetua mei et. Simul viderer facilisis
                        egimus tractatos splendi.
                      </p>
                      <ul>
                        <li>
                          <i className="fa fa-clock-o" /> 17 thg 9, 2019
                        </li>
                        <li>
                          <i className="fa fa-heart-o" /> 12
                        </li>
                        <li>
                          <i className="fa fa-share" /> 1
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog__comment__item blog__comment__item--reply">
                    <div className="blog__comment__item__pic">
                      <img
                        src="./src/assets/img/blog/details/comment-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__comment__item__text">
                      <h6>Brandon Kelley</h6>
                      <p>
                        Consequat consetetur dissentiet, ceteros commune
                        perpetua mei et. Simul viderer facilisis egimus ulla
                        mcorper.
                      </p>
                      <ul>
                        <li>
                          <i className="fa fa-clock-o" /> 17 thg 9, 2019
                        </li>
                        <li>
                          <i className="fa fa-heart-o" /> 12
                        </li>
                        <li>
                          <i className="fa fa-share" /> 1
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog__comment__item">
                    <div className="blog__comment__item__pic">
                      <img
                        src="./src/assets/img/blog/details/comment-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__comment__item__text">
                      <h6>Brandon Kelley</h6>
                      <p>
                        Duis voluptatum. Id vis consequat consetetur dissentiet,
                        ceteros commune perpetua mei et. Simul viderer facilisis
                        egimus tractatos splendi.
                      </p>
                      <ul>
                        <li>
                          <i className="fa fa-clock-o" /> 17 thg 9, 2019
                        </li>
                        <li>
                          <i className="fa fa-heart-o" /> 12
                        </li>
                        <li>
                          <i className="fa fa-share" /> 1
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="blog__sidebar">
                <div className="blog__sidebar__item">
                  <div className="section-title">
                    <h4>Danh mục</h4>
                  </div>
                  <ul>
                    <li>
                      <Link to="#">
                        Tất cả <span>(250)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Tuần thời trang <span>(80)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Phong cách đường phố <span>(75)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Cuộc sống hàng ngày <span>(35)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Làm đẹp <span>(60)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="blog__sidebar__item">
                  <div className="section-title">
                    <h4>Bài viết nổi bật</h4>
                  </div>
                  <Link to="#" className="blog__feature__item">
                    <div className="blog__feature__item__pic">
                      <img
                        src="./src/assets/img/blog/sidebar/fp-1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__feature__item__text">
                      <h6>
                        Thảm đỏ Cannes - Các ngôi sao và xu hướng thời trang
                      </h6>
                      <span>17 thg 9, 2019</span>
                    </div>
                  </Link>
                  <Link to="#" className="blog__feature__item">
                    <div className="blog__feature__item__pic">
                      <img
                        src="./src/assets/img/blog/sidebar/fp-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__feature__item__text">
                      <h6>
                        Thảm đỏ Cannes - Các ngôi sao và xu hướng thời trang
                      </h6>
                      <span>17 thg 9, 2019</span>
                    </div>
                  </Link>
                  <Link to="#" className="blog__feature__item">
                    <div className="blog__feature__item__pic">
                      <img
                        src="./src/assets/img/blog/sidebar/fp-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="blog__feature__item__text">
                      <h6>
                        Thảm đỏ Cannes - Các ngôi sao và xu hướng thời trang
                      </h6>
                      <span>17 thg 9, 2019</span>
                    </div>
                  </Link>
                </div>
                <div className="blog__sidebar__item">
                  <div className="section-title">
                    <h4>Tags phổ biến</h4>
                  </div>
                  <div className="blog__sidebar__tags">
                    <Link to="#">Thời trang</Link>
                    <Link to="#">Phong cách đường phố</Link>
                    <Link to="#">Sự đa dạng</Link>
                    <Link to="#">Làm đẹp</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Instagram />
      <Back_To_Top />
      <Footer />
      {/* Blog Details Section End */}
    </>
  );
}
