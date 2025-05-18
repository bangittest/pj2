const Review = require('../models/review');

exports.getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.getByProductId(productId);
    res.json(reviews);
  } catch (error) {
    console.error('Lỗi lấy reviews:', error);
    res.status(500).json({ error: 'Lỗi server khi lấy reviews' });
  }
};

exports.createReview = async (req, res) => {
    try {
      const { product_id, username, comment } = req.body;
      const result = await Review.create({ product_id, username, comment });
      res.status(201).json({ id: result });
    } catch (error) {
      console.error("Lỗi tạo review:", error);
      res.status(error.status || 500).json({
        message: error.message || "Lỗi server khi tạo đánh giá",
      });
    }
  };
  


exports.getReviewCount = async (req, res) => {
    try {
        const productId = req.params.productId;
      const count = await Review.getReviewCountByProductId(productId);
      res.json({ total: count });
    } catch (error) {
      console.error('Lỗi khi lấy tổng review:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };
  
