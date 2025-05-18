const db = require('../config/db');

const Users = {

    toggleUserRole: async (id) => {
        try {
          // Lấy trạng thái hiện tại
          const [rows] = await db.query('SELECT active FROM user WHERE id = ?', [id]);
    
          if (rows.length === 0) {
            throw new Error("User không tồn tại");
          }

          const newActive = 0;
    
          // Cập nhật vào DB
          await db.query('UPDATE user SET role = ? WHERE id = ?', [newActive, id]);
    
          return { id, active: newActive };
        } catch (err) {
          throw new Error('Lỗi khi thay đổi trạng thái: ' + err.message);
        }
      },

    toggleUserActive: async (id) => {
        try {
          // Lấy trạng thái hiện tại
          const [rows] = await db.query('SELECT active FROM user WHERE id = ?', [id]);
    
          if (rows.length === 0) {
            throw new Error("User không tồn tại");
          }
    
          const currentActive = rows[0].active;
    
          // Đảo trạng thái
          const newActive = currentActive ? 0 : 1;
    
          // Cập nhật vào DB
          await db.query('UPDATE user SET active = ? WHERE id = ?', [newActive, id]);
    
          return { id, active: newActive };
        } catch (err) {
          throw new Error('Lỗi khi thay đổi trạng thái: ' + err.message);
        }
      },
     getAll: async (search = "") => {
              let query = 'SELECT * FROM `user`';
              const params = [];
          
              if (search) {
                query += ' WHERE user_name LIKE ?';
                params.push(`%${search}%`);
              }
          
              query += ' ORDER BY id DESC';
              const [rows] = await db.query(query, params);
              return rows;
            },
    
    findByEmail: async (email) => {
        try {
          const [rows] = await db.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
          return rows[0];
        } catch (err) {
          throw new Error('Database error: ' + err.message);
        }
      },
    
    
    // Kiểm tra email đã tồn tại chưa
    checkEmailExists: async (email) => {
      try {
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  
        if (rows.length > 0) {
          // Nếu email đã tồn tại
          return true;
        } else {
          // Nếu email không tồn tại
          return false;
        }
      } catch (err) {
        throw new Error('Error checking email: ' + err.message);
      }
    },
  create: async (user) => {
    try {
      const {
        email,
        image,
        password,
        user_name,
        dateOfBirthday,
        gender,
        address = '',
        role = 1,
        active = false
      } = user;

      const [result] = await db.query(
        `INSERT INTO user 
        (email, image, password, user_name, dateOfBirthday, gender, address, role, active) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, image, password, user_name, dateOfBirthday, gender, address, role, active]
      );

      return { id: result.insertId, ...user };
    } catch (err) {
      throw new Error('Error inserting user: ' + err.message);
    }
  },
  getUserById: async (id) => {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
  },
  
  // ✅ Update user (không update email và password)
  updateUser: async (email, data) => {
    const {
      image,
      user_name,
      dateOfBirthday,
      address,
    } = data;
  
    const query = `
      UPDATE user SET 
        image = ?, 
        user_name = ?, 
        dateOfBirthday = ?, 
        address = ?
      WHERE email = ?
    `;
  
    const [result] = await db.query(query, [
      image,
      user_name,
      dateOfBirthday,
      address,
      email,
    ]);
  
    return result;
  },
  changePassword: async (email, oldPassword, newPassword) => {
    // Lấy mật khẩu hiện tại từ DB
    const [rows] = await db.query('SELECT password FROM user WHERE email = ?', [email]);

    if (rows.length === 0) {
      throw new Error('Người dùng không tồn tại');
    }

    const currentPassword = rows[0].password;

    // So sánh trực tiếp mật khẩu (plain text)
    if (currentPassword !== oldPassword) {
      return false; // Mật khẩu cũ không đúng
    }

    // Cập nhật mật khẩu mới
    await db.query('UPDATE user SET password = ? WHERE email = ?', [newPassword, email]);
    return true;
  }
};

module.exports = Users;
