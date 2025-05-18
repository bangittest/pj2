const db = require('../config/db');

const Review = {
    getByProductId: async (productId) => {
      const [rows] = await db.query(
        'SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC',
        [productId]
      );
      return rows;
    },
  
    create: async ({ product_id, username, comment }) => {
        // Kiểm tra xem user đã review sản phẩm này chưa
        const [existing] = await db.query(
          'SELECT id FROM reviews WHERE product_id = ? AND username = ?',
          [product_id, username]
        );
      
        if (existing.length > 0) {
          // Nếu đã tồn tại, không cho phép thêm mới
          const error = new Error("Bạn đã đánh giá sản phẩm này rồi.");
          error.status = 400; // Bad Request
          throw error;
        }
      
        // Nếu chưa tồn tại, cho phép thêm mới
        const [result] = await db.query(
          'INSERT INTO reviews (product_id, username, comment) VALUES (?, ?, ?)',
          [product_id, username, comment]
        );
        return result.insertId;
      },
      

    getReviewCountByProductId: async (productId) => {
        const [rows] = await db.query(
          'SELECT COUNT(*) AS total FROM reviews WHERE product_id = ?',
          [productId]
        );
        return rows[0].total;
      }
  };
  
  module.exports = Review;