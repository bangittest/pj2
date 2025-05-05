const db = require('../config/db');

const Product = {
    getAll: async (search = '') => {
        let query = 'SELECT * FROM products';
        const params = [];
      
        if (search) {
          query += ' WHERE product_name LIKE ?';
          params.push(`%${search}%`);
        }
      
        query += ' ORDER BY id DESC';
      
        const [rows] = await db.query(query, params);
        return rows;
      },
      

      getById: async (id) => {
        // Chỉ cần một câu lệnh query
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows; // Trả về kết quả từ query
      },
      

  create: async (data) => {
    const {
      product_name,
      price,
      description,
      from,
      image,
      quantity,
      category_id
    } = data;

    const [result] = await db.query(
      'INSERT INTO products (product_name, price, description, `from`, image, quantity, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [product_name, price, description, from, image, quantity, category_id]
    );

    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const {
      product_name,
      price,
      description,
      from,
      image,
      quantity,
      category_id
    } = data;

    await db.query(
      'UPDATE products SET product_name = ?, price = ?, description = ?, `from` = ?, image = ?, quantity = ?, category_id = ? WHERE id = ?',
      [product_name, price, description, from, image, quantity, category_id, id]
    );

    return { id, ...data };
  },

  delete: async (id) => {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Product;
