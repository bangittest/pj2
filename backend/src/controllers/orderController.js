const Order = require("../models/order");

exports.createOrder = async (req, res) => {
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
  } = req.body;

  // ✅ Validate bắt buộc
  if (!userId || !fullName || !address || !phone || !email || !cartItems || cartItems.length === 0) {
    return res.status(400).json({
      errorCode: "INVALID_INPUT",
      message: "Thiếu thông tin bắt buộc hoặc giỏ hàng trống.",
    });
  }

  // ✅ Validate dữ liệu email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      errorCode: "INVALID_EMAIL",
      message: "Email không hợp lệ.",
    });
  }

  // ✅ Validate số điện thoại cơ bản
  const phoneRegex = /^[0-9]{9,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(422).json({
      errorCode: "INVALID_PHONE",
      message: "Số điện thoại không hợp lệ.",
    });
  }

  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Lỗi tạo order:", err);
    res.status(500).json({
      errorCode: "SERVER_ERROR",
      message: "Lỗi server khi tạo đơn hàng.",
    });
  }
};

exports.getOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Lỗi khi lấy đơn hàng:", err);
    res.status(500).json({
      errorCode: "SERVER_ERROR",
      message: "Không thể lấy danh sách đơn hàng.",
    });
  }
};

exports.getAllOrders = async (req, res) => {
 

  try {
    const orders = await Order.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Lỗi khi lấy đơn hàng:", err);
    res.status(500).json({
      errorCode: "SERVER_ERROR",
      message: "Không thể lấy danh sách đơn hàng.",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (typeof status === "undefined") {
    return res.status(400).json({ message: "Thiếu giá trị status" });
  }

  try {
    const success = await Order.updateStatus(orderId, status);

    if (!success) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật trạng thái thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

