import React from 'react'
import Navbar from '../../../layout/user/navbar/Navbar'
import Instagram from '../Instagram/Instagram'
import Back_To_Top from '../../../components/base/backtop/Back_to_top'
import Footer from '../../../layout/user/footer/Footer'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
   
    <>
    <Navbar/>
  <div className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__links">
            <Link to="/">
              <i className="fa fa-home" /> Home
            </Link>
            <span>
              Blog
            </span>
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
              <img src="./src/assets/img/blog/details/blog-details.jpg" alt="" />
              <div className="blog__details__item__title">
                <span className="tip">Street style</span>
                <h4>
                  Being seen: how is age diversity effecting change in fashion
                  and beauty?
                </h4>
                <ul>
                  <li>
                    by <span>Ema Timahe</span>
                  </li>
                  <li>Seb 17, 2019</li>
                  <li>39 Comments</li>
                </ul>
              </div>
            </div>
            <div className="blog__details__desc">
              <p>
                Afashion season can be defined as much by the people on the
                catwalk as it can by the clothes they are wearing. This time
                around, a key moment came at the end of Marc Jacobs’ New York
                show, when an almost makeup-free Christy Turlington made a rare
                return to the catwalk, aged 50 (she also stars, with the
                designer himself, in the label’s AW ad campaign), where the
                average catwalk model is around 18.
              </p>
              <p>
                A few days later, Simone Rocha arguably upped the ante. The
                32-year-old’s show – in part inspired by Louise Bourgeois, who
                lived until she was 98 – featured models in their 30s and 40s,
                including cult favourite Jeny Howorth and actor Chloë Sevigny.
              </p>
            </div>
            <div className="blog__details__quote">
              <div className="icon">
                <i className="fa fa-quote-left" />
              </div>
              <p>
                Consectetur adipisicing elit, sed do eiusmod tempor incididunt
                ut labore dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
            <div className="blog__details__desc">
              <p>
                Occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate.
              </p>
            </div>
            <div className="blog__details__tags">
              <Link to="#">Fashion</Link>
              <Link to="#">Street style</Link>
              <Link to="#">Diversity</Link>
              <Link to="#">Beauty</Link>
            </div>
            <div className="blog__details__btns">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__details__btn__item">
                    <h6>
                      <Link to="#">
                        <i className="fa fa-angle-left" /> Previous posts
                      </Link>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="blog__details__btn__item blog__details__btn__item--next">
                    <h6>
                      <Link to="#">
                        Next posts <i className="fa fa-angle-right" />
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog__details__comment">
              <h5>3 Comment</h5>
              <Link to="#" className="leave-btn">
                Leave a comment
              </Link>
              <div className="blog__comment__item">
                <div className="blog__comment__item__pic">
                  <img src="./src/assets/img/blog/details/comment-1.jpg" alt="" />
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
                      <i className="fa fa-clock-o" /> Seb 17, 2019
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
                  <img src="./src/assets/img/blog/details/comment-2.jpg" alt="" />
                </div>
                <div className="blog__comment__item__text">
                  <h6>Brandon Kelley</h6>
                  <p>
                    Consequat consetetur dissentiet, ceteros commune perpetua
                    mei et. Simul viderer facilisis egimus ulla mcorper.
                  </p>
                  <ul>
                    <li>
                      <i className="fa fa-clock-o" /> Seb 17, 2019
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
                  <img src="./src/assets/img/blog/details/comment-3.jpg" alt="" />
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
                      <i className="fa fa-clock-o" /> Seb 17, 2019
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
                <h4>Categories</h4>
              </div>
              <ul>
                <li>
                  <Link to="#">
                    All <span>(250)</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                  Fashion week <span>(80)</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                  Street style <span>(75)</span>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                  Lifestyle <span>(35)</span>
                  </Link>
                </li> <li>
                  <Link to="#">
                  Beauty <span>(60)</span>
                  </Link>
                </li>
                
              </ul>
            </div>
            <div className="blog__sidebar__item">
              <div className="section-title">
                <h4>Feature posts</h4>
              </div>
              <Link to="#" className="blog__feature__item">
                <div className="blog__feature__item__pic">
                  <img src="./src/assets/img/blog/sidebar/fp-1.jpg" alt="" />
                </div>
                <div className="blog__feature__item__text">
                  <h6>Amf Cannes Red Carpet Celebrities Kend...</h6>
                  <span>Seb 17, 2019</span>
                </div>
              </Link>
              <Link to="#" className="blog__feature__item">
                <div className="blog__feature__item__pic">
                  <img src="./src/assets/img/blog/sidebar/fp-2.jpg" alt="" />
                </div>
                <div className="blog__feature__item__text">
                  <h6>Amf Cannes Red Carpet Celebrities Kend...</h6>
                  <span>Seb 17, 2019</span>
                </div>
              </Link>
              <Link to="#" className="blog__feature__item">
                <div className="blog__feature__item__pic">
                  <img src="./src/assets/img/blog/sidebar/fp-3.jpg" alt="" />
                </div>
                <div className="blog__feature__item__text">
                  <h6>Amf Cannes Red Carpet Celebrities Kend...</h6>
                  <span>Seb 17, 2019</span>
                </div>
              </Link>
            </div>
            <div className="blog__sidebar__item">
              <div className="section-title">
                <h4>Tags cloud</h4>
              </div>
              <div className="blog__sidebar__tags">
                <Link to="#">Fashion</Link>
                <Link to="#">Street style</Link>
                <Link to="#">Diversity</Link>
                <Link to="#">Beauty</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Instagram/>
  <Back_To_Top/>
  <Footer/>
  {/* Blog Details Section End */}
</>

  )
}