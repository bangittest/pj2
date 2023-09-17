import React from 'react'
import Navbar from '../../../layout/user/navbar/Navbar'
import Product from '../product/Product'
import Trending from '../trending/Trending'
import Discount from '../discount/Discount'
import Services from '../services/Services'
import Instagram from '../Instagram/Instagram'
import Footer from '../../../layout/user/footer/Footer'
import Back_To_Top from '../../../components/base/backtop/Back_to_top'
import Slider from '../../../layout/user/slider/Slider'

export default function Home() {
  return (
    <>
    <Navbar/>
    <Slider/>
    <Product/>
    <Trending/>
    <Discount/>
    <Services/>
    <Instagram/>
    <Footer/>
    <Back_To_Top/>
    </>
  )
}
