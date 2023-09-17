import React from 'react'
import Navbar from '../../../layout/user/navbar/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../../../layout/user/footer/Footer'

export default function Cart() {
  return (
    <div>
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
                <span>Shopping cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Shop Cart Section Begin */}
      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                   {/* {
                    listCart.length === 0 ? ( */}
                        <tr>
                          <td colSpan="4" className="text-center">
                            Giỏ hàng trống
                          </td>
                        </tr>
                    {/* //   ) : (
                    // listCart.map((e,index)=>( */}
                        <tr>
                        <td className="cart__product__item">
                          <img src="" width={200} height={200} alt="" />
                          <div className="cart__product__item__title">
                            <h6></h6>
                            <div className="rating">
                              <i className="fa fa-star ">::</i>
                              <i className="fa fa-star ">::</i>
                              <i className="fa fa-star ">::</i>
                              <i className="fa fa-star ">::</i>
                              <i className="fa fa-star "/>
                            </div>
                          </div>
                        </td>
                        {/* {formatMoney(e.price)} */}
                        <td className="cart__price">3333</td>
                        <td className="cart__quantity">
                          <div className="pro-qty" style={{marginLeft:"13px"}}>
                          {/* onClick={()=>handleDecrease(e.product_id)} */}
                            <span  className="dec qtybtn">-</span>
                            {/* {e.quantyti} */}
                            <span className="dec qtybtn ml-3">11</span>
                        
                            {/* onClick={()=>handleIncrease(e.product_id)} */}
                            <span  className="inc qtybtn ml-3">+</span>
                          </div>
                        </td>
                        {/* onClick={()=>handleDelete(e.product_id)} */}
                        <td  className="cart__close">
                          <span className="icon_close" />
                        </td>
                      </tr>
                    {/* // )))
                    // } */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn">
                <Link to="/list-product">Continue Shopping</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn update__btn">
                {/* <a href="#">
              <span className="icon_loading" /> Update cart
            </a> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="discount__content">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" className="site-btn">
                    Apply
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-2">
              <div className="cart__total__procced">
                <h6>TỔNG GIỎ HÀNG</h6>
                <ul>
                  <li>
                    Total <span>33333</span>
                    {/* {formatMoney(totalPrice)} */}
                  </li>
                </ul>
                <Link to="#" className="primary-btn">
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Cart Section End */}
      <Footer />
    </>
    </div>
  )
}
