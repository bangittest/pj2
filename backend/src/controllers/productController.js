const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
      const { product_name_like } = req.query;
      const products = await Product.getAll(product_name_like || '');
      res.json(products);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };



  exports.getById = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy `id` từ params của request
      if (!id) {
        return res.status(400).json({ error: 'ID sản phẩm không hợp lệ' });
      }
  
      // Gọi phương thức để lấy sản phẩm theo id từ DB
      const product = await Product.getById(id);
  
      // Kiểm tra xem sản phẩm có tồn tại không
      if (!product || product.length === 0) {
        return res.status(404).json({ error: 'Sản phẩm không tìm thấy' });
      }
  
      // Trả về dữ liệu sản phẩm
      res.json(product);
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm:', err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };
  

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.update(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};
