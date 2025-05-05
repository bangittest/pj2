const User = require('../models/user');

exports.toggleUserActive = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.toggleUserActive(id);
      res.json({ message: 'Cập nhật trạng thái thành công', result });
    } catch (err) {
      console.error('Lỗi toggle active:', err.message);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };


  exports.toggleUserRole = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.toggleUserRole(id);
      res.json({ message: 'Phân quyền thành công', result });
    } catch (err) {
      console.error('Lỗi phân quyền:', err.message);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };


exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // Lấy dữ liệu từ body (express sẽ tự parse cho bạn)
  
    try {
      // Kiểm tra nếu email và password không có
      if (!email || !password) {
        return res.status(400).json({ error: 'Email và password là bắt buộc' });
      }
  
      // Tìm người dùng trong database bằng email
      const user = await User.findByEmail(email); // Chú ý await ở đây vì nó trả về Promise
      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
  
      // Kiểm tra mật khẩu
      if (user.password !== password) {
        return res.status(401).json({ error: 'Mật khẩu không chính xác' });
      }
  
      // Kiểm tra độ dài mật khẩu
      if (password.length < 6) {
        return res.status(400).json({ error: 'Mật khẩu quá ngắn' });
      }

      if (user.active === 0) {
        return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa' });
      }
  
  
      // Trả về user nếu đăng nhập thành công
      return res.status(200).json({ user });
    } catch (err) {
      console.error('Login error:', err.message);
      return res.status(500).json({ error: 'Lỗi server' });
    }
  };
  


  exports.getAllUser = async (req, res) => {
    try {
      const { user_name_like } = req.query;
      const username = await User.getAll(user_name_like || "");
      res.json(username);
    } catch (err) {
      console.error('Lỗi khi user:', err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };
exports.checkEmail = async (req, res) => {
    try {
      const { email } = req.query;
  
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
      const emailExists = await User.checkEmailExists(email);
  
      if (emailExists) {
        return res.status(200).json({ exists: true });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  };

exports.createUser = async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Lỗi server' });
    }
  };


  