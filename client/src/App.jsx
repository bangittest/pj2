import { useEffect } from 'react';
import './App.css'

import ListProduct from './pages/user/Listproduct/ListProduct';
import About from './pages/user/about/About';
import Blog from './pages/user/blog/Blog';
import Cart from './pages/user/cart/Cart';
import Contact from './pages/user/contact/Contact';
import Description from './pages/user/description/Description';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/user/login/Login';
import Home from './pages/user/home/Home';
import Register from './pages/user/register/Register';

function App() {
  useEffect(()=>{
    window.scroll({top:0, behavior:"smooth"});
  },[location.pathname])

  return (
    <>
        <Routes>
        {/* Router dc phep truy cap */}
        <Route path='/'element={<Home/>}/>
        <Route path='/list-product' element={<ListProduct/>}/>
        <Route path='product/:id' element={<Description/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/blog' element={<Blog/>}/>


        {/* Router chi admin moi dc truy cap */}
        
      </Routes>
    </>
  )
}

export default App
