import React from 'react'
import Navbar from '../../../layout/user/navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../../../layout/user/footer/Footer'

export default function Description() {
  return (
    <>
      <Navbar />
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home" /> Home
                </Link>
                {/* <a href="#">Women’s </a> */}
                <span>Description</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Product Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__pic">
                <Link className="pt" to="#">
                  <img
                    width={400}
                    height={400}
                    style={{ objectFit: "cover" }}
                    // src={product.image}
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>
                  {/* {product.product_name} */}
                </h3>
                <div className="rating">
                  <i className="fa fa-star">::</i>
                  <i className="fa fa-star">::</i>
                  <i className="fa fa-star">::</i>
                  <i className="fa fa-star">::</i>
                  <i className="fa fa-star" />
                  <span>( 138 reviews )</span>
                </div>
                <div className="product__details__price">
                  {/* {formatMoney(product.price)} <span>{formatMoney(product.price * (0.2 + 1))}</span> */}
                </div>
                <p>
                  Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
                  fugit, sed quia consequuntur magni lores eos qui ratione
                  voluptatem sequi nesciunt.
                </p>
                <div className="product__details__button">
                  <Link  
                //   onClick={()=>handleAddToCart(product)} 
                to="/cart" className="cart-btn">
                    <span className="icon_bag_alt" /> Add to cart
                  </Link>
                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Promotions:</span>
                      <p>Free shipping</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-toggle="tab"
                      to="#tabs-1"
                      role="tab"
                    >
                      Description
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>
                      {/* {product.description} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section End */}
      <Footer />
    </>
  )
}
