const CartItem = require('../models/cartItem');
const Products = require('../models/product');

exports.addItemToCart = async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;

    // Kiểm tra nếu sản phẩm tồn tại và có đủ số lượng
    const itemId = await CartItem.addItem(cart_id, product_id, quantity);

    // Nếu thành công, trả về id của item vừa thêm vào giỏ
    res.status(200).json({ itemId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Lỗi thêm sản phẩm vào giỏ hàng' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;
    const items = await CartItem.getItemsByCartId(user_id);
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi lấy giỏ hàng' });
  }
};

exports.countItems = async (req, res) => {
    try {
      const { userId } = req.params;
      const totalItems = await CartItem.countItemsByUserId(userId);
      res.status(200).json({ totalItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Lỗi khi đếm sản phẩm trong giỏ hàng' });
    }
  };




  exports.increaseQuantity = async (req, res) => {
    const { id } = req.params;
  
    try {
      const item = await CartItem.getItemById(id);
    //   console.log("🧺 Giỏ hàng item:", item); // ✅ Log item
  
      if (!item) return res.status(404).json({ error: 'Không tìm thấy item trong giỏ hàng' });
  
      const productResult = await Products.getById(item.product_id);
      const product = Array.isArray(productResult) ? productResult[0] : productResult;
      
    //   console.log("📦 Sản phẩm:", product); // ✅ Log product
  
      if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  
      // Kiểm tra tồn kho
    //   console.log(`👉 So sánh: item.quantity (${item.quantity}) vs product.quantity (${product.quantity})`);
  
      if (Number(item.quantity) >= Number(product.quantity)) {
        // console.log("⚠️ Vượt quá tồn kho");
        return res.status(400).json({ error: 'Số lượng vượt quá hàng tồn kho' });
      }
  
      await CartItem.incrementQuantity(id);
    //   console.log("✅ Đã tăng số lượng thành công");
  
      res.json({ message: 'Tăng số lượng thành công' });
  
    } catch (err) {
      console.error("❌ Lỗi tăng số lượng:", err);
      res.status(500).json({ error: 'Lỗi tăng số lượng' });
    }
  };
  

exports.decreaseQuantity = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await CartItem.getItemById(id);
    if (item.quantity <= 1) {
      // Tùy chọn: xóa khỏi giỏ nếu còn 1
      await CartItem.deleteItem(id);
    } else {
      await CartItem.decrementQuantity(id);
    }
    res.json({ message: 'Giảm số lượng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Giảm số lượng thất bại' });
  }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      const item = await CartItem.getItemById(id);
      if (!item) {
        return res.status(404).json({ error: 'Item không tồn tại trong giỏ hàng' });
      }
  
      await CartItem.deleteItem(id);
      res.json({ message: 'Xóa item khỏi giỏ hàng thành công' });
    } catch (err) {
      console.error("❌ Lỗi xóa item:", err);
      res.status(500).json({ error: 'Lỗi server khi xóa item' });
    }
  };


  exports.deleteCartItem = async (req, res) => {
    const { id } = req.params;
  
    try {
    //   const item = await CartItem.getItemById(id);
    //   if (!item) {
    //     return res.status(404).json({ error: 'Item không tồn tại trong giỏ hàng' });
    //   }
  
      await CartItem.deleteCartItem(id);
      res.json({ message: 'Xóa item khỏi giỏ hàng thành công' });
    } catch (err) {
      console.error("❌ Lỗi xóa item:", err);
      res.status(500).json({ error: 'Lỗi server khi xóa item' });
    }
  };
  

