const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
    try {
      const { category_name_like } = req.query;
      const categories = await Category.getAll(category_name_like || "");
      res.json(categories);
    } catch (err) {
      console.error('Lỗi khi lấy danh mục:', err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Tên danh mục không được để trống' });
    const category = await Category.create(name);
    res.status(201).json(category);
  } catch (err) {
    console.error('Lỗi tạo category:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) return res.status(400).json({ error: 'Tên danh mục không được để trống' });
    const category = await Category.update(id, name);
    res.json(category);
    
  } catch (err) {
    
    res.status(500).json({ error: 'Lỗi server' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.delete(id);
    res.json({ message: 'Xóa danh mục thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};