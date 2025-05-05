const db = require('../config/db');

const CartItem = {
  addItem: async (cartId, productId, quantity) => {
    try {
      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const [existingItem] = await db.query(
        'SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ?',
        [cartId, productId]
      );

      // Nếu sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      if (existingItem.length > 0) {
        const newQuantity = existingItem[0].quantity + quantity;

        // Kiểm tra số lượng sản phẩm trong kho
        const [product] = await db.query('SELECT quantity FROM products WHERE id = ?', [productId]);

        if (newQuantity > product[0].quantity) {
          throw new Error('Số lượng trong kho đã hết');
        }

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        await db.query(
          'UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND product_id = ?',
          [newQuantity, cartId, productId]
        );
        return existingItem[0].id;  // Trả về ID của sản phẩm đã được cập nhật
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ
        const [product] = await db.query('SELECT quantity FROM products WHERE id = ?', [productId]);

        // Kiểm tra số lượng không vượt quá kho
        if (quantity > product[0].quantity) {
          throw new Error('Số lượng trong kho đã hết');
        }

        const [result] = await db.query(
          'INSERT INTO cart_item (cart_id, product_id, quantity) VALUES (?, ?, ?)',
          [cartId, productId, quantity]
        );
        return result.insertId;  // Trả về ID của sản phẩm vừa thêm mới
      }
    } catch (err) {
      throw new Error(err.message || 'Lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  },

  getItemsByCartId: async (userId) => {
    try {
      const [rows] = await db.query('SELECT ci.* FROM cart c join cart_item ci ON c.id = ci.cart_id  WHERE c.user_id = ?', [userId]);
      return rows;
    } catch (err) {
      throw new Error('Lỗi khi lấy danh sách sản phẩm trong giỏ hàng');
    }
  },

  countItemsByUserId: async (userId) => {
    try {
      const [rows] = await db.query(`
        SELECT COUNT(*) AS total_items
        FROM cart_item ci
        JOIN cart c ON ci.cart_id = c.id
        WHERE c.user_id = ?
      `, [userId]);

      return rows[0].total_items;
    } catch (err) {
      throw new Error('Lỗi khi đếm số lượng sản phẩm trong giỏ hàng');
    }
  },


  incrementQuantity: async (itemId) => {
    return db.query(`UPDATE cart_item SET quantity = quantity + 1 WHERE id = ?`, [itemId]);
  },
  decrementQuantity: async (itemId) => {
    return db.query(`UPDATE cart_item SET quantity = quantity - 1 WHERE id = ?`, [itemId]);
  },
  getItemById: async (itemId) => {
    const [rows] = await db.query(`SELECT * FROM cart_item WHERE id = ?`, [itemId]);
    return rows[0];
  },
  deleteItem: async (itemId) => {
    return db.query(`DELETE FROM cart_item WHERE id = ?`, [itemId]);
  },

   getById: async (id) => {
          // Chỉ cần một câu lệnh query
          const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
          return rows; // Trả về kết quả từ query
        },
        deleteCartItem: async (itemId) => {
            return db.query(`DELETE FROM cart_item WHERE cart_id = ?`, [itemId]);
          },
};

module.exports = CartItem;
