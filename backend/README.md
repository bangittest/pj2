# Todo List Node.js Backend

## Cài đặt

1. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Khởi động server:
   ```bash
   npm run dev
   ```

## Cấu trúc dự án

- src/
  - index.js
  - config/
    - db.js
  - models/
    - todo.js
  - routes/
    - todoRoutes.js
  - controllers/
    - todoController.js

## API Endpoints
- `GET /api/todos` - Lấy danh sách todo
- `POST /api/todos` - Tạo mới todo
- `PUT /api/todos/:id` - Cập nhật todo
- `DELETE /api/todos/:id` - Xóa todo
