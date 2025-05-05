const db = require('../config/db');

const Cart = {
  createCart: async (userId) => {
    const [result] = await db.query('INSERT INTO cart (user_id) VALUES (?)', [userId]);
    return result.insertId;
  },
  getCartByUser: async (userId) => {
    const [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
    return rows[0]; // 👈 trả về giỏ đầu tiên (nếu có)
  },

  getCartByUsers: async (userId) => {
    try {
      const query = `SELECT * FROM cart WHERE user_id = ?`;
      const [results] = await db.execute(query, [userId]);  // Dùng db.execute thay vì db.query (cải tiến từ MySQL2)
      
      if (results.length === 0) {
        console.log("Không tìm thấy giỏ hàng cho userId:", userId);
        return null;  // Trả về null nếu không tìm thấy giỏ hàng
      }
      return results[0];  // Giả sử mỗi user chỉ có một giỏ hàng
    } catch (err) {
      console.error("SQL Error (getCartByUsers):", err);
      throw err;  // Throw lỗi để controller có thể xử lý
    }
  },

  // Hàm xóa tất cả sản phẩm trong giỏ hàng theo cartId (đã sửa lại)
  deleteCartItemsByCartId: async (cartId) => {
    try {
      const query = `DELETE FROM cart_item WHERE cart_id = ?`;
      const [result] = await db.execute(query, [cartId]);  // Dùng db.execute thay vì db.query
  
      console.log("Số bản ghi bị xóa:", result.affectedRows);
      return result;  // Trả về kết quả của việc xóa
    } catch (err) {
      console.error("SQL Error (deleteCartItemsByCartId):", err);
      throw err;  // Throw lỗi để controller có thể xử lý
    }
  }
  
  
};

module.exports = Cart;
