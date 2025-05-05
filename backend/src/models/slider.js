const db = require('../config/db');

const Slider = {
  getAll: async () => {
    const query = 'SELECT * FROM slider';
    const [rows] = await db.query(query);  // Không cần params
    return rows;
  }
};

module.exports = Slider;
