const Cart = require('../models/cart');

exports.createCart = async (req, res) => {
    try {
      const userId = req.body.user_id;
  
      if (!userId) {
        return res.status(400).end();
      }
  
      // ⚠️ KIỂM TRA NẾU ĐÃ CÓ GIỎ HÀNG → KHÔNG TẠO MỚI
      const existingCart = await Cart.getCartByUser(userId);
      if (existingCart) {
        return res.status(204).end(); // 👈 204: Không cần trả gì, dừng ở đây luôn
      }
  
      // ✅ Nếu chưa có, tạo mới
      const cartId = await Cart.createCart(userId);
      return res.status(201).json({ id: cartId });
  
    } catch (err) {
      console.error("Lỗi tạo cart:", err);
      return res.status(500).end();
    }
  };
  


  exports.getCartByUser = async (req, res) => {
    try {
      const { idUser } = req.query;
      const cart = await Cart.getCartByUsers(idUser);
  
    //   if (!cart) {
    //     return res.status(404).json({ message: 'Không tìm thấy giỏ hàng cho người dùng này' });
    //   }
  
      res.json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };

  exports.clearCartByUserId = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      console.log("Bước 1: Lấy giỏ hàng của userId:", userId);
  
      // Lấy giỏ hàng của người dùng theo userId
      const cart = await Cart.getCartByUsers(userId);
      
      // Nếu không tìm thấy giỏ hàng, trả về lỗi
      if (!cart) {
        return res.status(404).json({ error: 'Không tìm thấy giỏ hàng cho người dùng này.' });
      }
      console.log("Giỏ hàng của userId:", cart);
  
      // Bước 2: Xóa tất cả sản phẩm trong giỏ hàng theo cartId
      console.log("Bước 2: Đang xóa cart_item theo cartId:", cart.id);
      const result = await Cart.deleteCartItemsByCartId(cart.id);
  
      // Nếu không có sản phẩm nào được xóa, trả về thông báo
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Giỏ hàng đã trống hoặc không có sản phẩm để xóa.' });
      }
  
      // Bước 3: Trả về kết quả thành công
      return res.status(200).json({
        message: 'Đã xóa toàn bộ sản phẩm trong giỏ hàng.',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      console.error('❌ Lỗi khi xóa giỏ hàng:', error);
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa giỏ hàng. Vui lòng thử lại.' });
    }
  };
  

  
  