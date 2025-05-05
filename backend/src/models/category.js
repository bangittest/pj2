const db = require('../config/db');

const Category = {
        getAll: async (search = "") => {
          let query = 'SELECT * FROM categories';
          const params = [];
      
          if (search) {
            query += ' WHERE category_name LIKE ?';
            params.push(`%${search}%`);
          }
      
          query += ' ORDER BY id DESC';
          const [rows] = await db.query(query, params);
          return rows;
        },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (category_name) => {
    const [result] = await db.query('INSERT INTO categories (category_name, status) VALUES (?,?)', [category_name, 1]);
    return { id: result.insertId, category_name };
  },

  update: async (id, category_name) => {
    await db.query('UPDATE categories SET category_name = ? WHERE id = ?', [category_name, id]);
    return { id, category_name };
  },

  delete: async (id) => {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return { id };
  },
};

module.exports = Category;