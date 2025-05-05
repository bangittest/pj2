const db = require("../config/db");

const Order = {
  create: async (orderData) => {
    const {
      userId,
      fullName,
      country,
      address,
      city,
      zipCode,
      phone,
      email,
      note,
      totalAmount,
      cartItems,
    } = orderData;

    // Log dữ liệu nhận được từ client
    console.log("Dữ liệu đơn hàng nhận được: ", orderData);

    try {
      // Truy vấn để thêm đơn hàng vào bảng orders
      const orderQuery = `
        INSERT INTO orders (user_id, full_name, country, address, city, zip_code, phone, email, note, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const orderValues = [
        userId,
        fullName,
        country,
        address,
        city,
        zipCode,
        phone,
        email,
        note,
        totalAmount,
      ];

      const [orderResult] = await db.query(orderQuery, orderValues);
      const orderId = orderResult.insertId;
      console.log("ID đơn hàng vừa tạo: ", orderId);

      // Kiểm tra dữ liệu cartItems trước khi thực hiện query
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Giỏ hàng trống");
      }

      // Truy vấn để thêm chi tiết đơn hàng vào bảng order_details
      const detailQuery = `
        INSERT INTO order_details (order_id, product_id, product_name, quantity, price)
        VALUES ?`;

      const detailValues = cartItems.map((item) => [
        orderId,
        item.product_id,
        item.product_name,
        item.quantity,
        item.price,
      ]);

      // Log kiểm tra giá trị của detailValues
      console.log("Giá trị chi tiết đơn hàng: ", detailValues);

      await db.query(detailQuery, [detailValues]);

      return {
        message: "Đặt hàng thành công!",
        orderId: orderId,
      };
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng: ", error);
      throw error;
    }
  },

  getOrdersByUserId: async (userId) => {
    const query = `
      SELECT 
        od.id AS order_id,
        od.full_name AS order_name,
        od.created_at,
        od.total_amount,
        od.status,
        GROUP_CONCAT(CONCAT(ods.product_name, ' x', ods.quantity) SEPARATOR ', ') AS order_details
      FROM orders od
      LEFT JOIN order_details ods ON od.id = ods.order_id
      WHERE od.user_id = ?
      GROUP BY od.id
    `;
  
    const [rows] = await db.query(query, [userId]);
    return rows;
  },


  getAllOrders: async () => {
    const query = `
      SELECT 
        od.id AS order_id,
        od.full_name AS order_name,
        od.address,
        od.created_at,
        od.total_amount,
        od.status,
        GROUP_CONCAT(CONCAT(ods.product_name, ' x', ods.quantity) SEPARATOR ', ') AS order_details
      FROM orders od
      LEFT JOIN order_details ods ON od.id = ods.order_id
      GROUP BY od.id
    `;
  
    try {
      const [rows] = await db.query(query);  // Sử dụng `await` để chờ kết quả từ query
      return rows;  // Trả về kết quả query (danh sách các đơn hàng)
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;  // Ném lỗi nếu có vấn đề xảy ra
    }
  }
,

  updateStatus: async (orderId, status) => {
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    const [result] = await db.query(query, [status, orderId]);

    return result.affectedRows > 0;
  }
  
};

module.exports = Order;
