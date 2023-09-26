import { useEffect, useState } from "react";
import "./App.css";

import ListProduct from "./pages/user/Listproduct/ListProduct";
import About from "./pages/user/about/About";
import Blog from "./pages/user/blog/Blog";
import Cart from "./pages/user/cart/Cart";
import Contact from "./pages/user/contact/Contact";
import Description from "./pages/user/description/Description";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import Adminhome from "./layout/admin/adminhomepage/Adminhome";
import ListCategory from "./pages/admin/category/ListCategory";
import ListProductManager from "./pages/admin/product-manager/ListProductManage";
import ListOrderManager from "./pages/admin/oder-manager/ListOrderManager";
import ListUserManager from "./pages/admin/user_manager/ListUserManager";
import ChangePassword from "./pages/user/information/ChangePassword";
import Profile from "./pages/user/profile/Profile";
import Index from "./pages/user/Index";
import Private from "./layout/admin/private/Private";
import NotFound from "./components/user/notfound/notfound";
import axios from "axios";
import { instance } from "./api/axios";
import History from "./pages/user/history/History";

function App() {
  // khi chuyen trang, thi mac dinh day len tren
  const location = useLocation();

  const cartId = JSON.parse(localStorage.getItem("cartId"));
  // console.log("cartId: ", cartId);
  const [cartLength, setCartLength] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const handleGetCartLength = async () => {
    const res = await instance.get(`/carts/${cartId}`);
    // console.log(res.data.cart.length);
    setCartLength(res.data.cart.length);
  };

  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  // khi chuyen trang, thi mac dinh day len tren

  useEffect(() => {
    handleGetCartLength();
  }, [isLoad]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (userLocal) {
      if (userLocal.role === 0 && !location.pathname.startsWith("/admin")) {
        window.location.href = "/admin";
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Router dc phep truy cap */}
        <Route
          path="/"
          element={<Index cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route
          path="/list-product"
          element={
            <ListProduct cartLength={cartLength} setIsLoad={setIsLoad} />
          }
        />
        <Route
          path="product/:id"
          element={
            <Description cartLength={cartLength} setIsLoad={setIsLoad} />
          }
        />
        <Route
          path="/about"
          element={<About cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route
          path="/contact"
          element={<Contact cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={<Cart cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route
          path="/blog"
          element={<Blog cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route
          path="/changepasswords"
          element={
            <ChangePassword cartLength={cartLength} setIsLoad={setIsLoad} />
          }
        />
        <Route
          path="/profile"
          element={<Profile cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route
          path="/history"
          element={<History cartLength={cartLength} setIsLoad={setIsLoad} />}
        />
        <Route path="*" element={<NotFound />} />

        {/* Router chi admin moi dc truy cap */}
        <Route path="/admin" element={<Private />}>
          <Route index element={<Adminhome />} />
          <Route path="categoris" element={<ListCategory />} />
          <Route path="products" element={<ListProductManager />} />
          <Route path="order" element={<ListOrderManager />} />
          <Route path="users" element={<ListUserManager />} />
        </Route>
        <Route />
      </Routes>
    </>
  );
}

export default App;
