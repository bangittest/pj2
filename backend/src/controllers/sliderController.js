const Slider = require('../models/slider');

exports.getAll = async (req, res) => {
  try {
    const all = await Slider.getAll();
    res.json(all);
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu slider:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
