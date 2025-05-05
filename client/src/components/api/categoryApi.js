// import axios from "axios";

// // Lấy danh sách danh mục
// const fetchCategories = async (search) => {
//   try {
//     const response = await axios.get("http://localhost:4000/api/categories", {
//       params: { category_name_like: search },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy danh mục:", error);
//     return [];
//   }
// };

// // Thêm danh mục mới
// const addCategory = async (category) => {
//   try {
//     const response = await axios.post("http://localhost:4000/api/categories", category);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi thêm danh mục:", error);
//     return null;
//   }
// };

// // Cập nhật danh mục
// const updateCategory = async (id, category) => {
//   try {
//     const response = await axios.put(`http://localhost:4000/api/categories/${id}`, category);
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi cập nhật danh mục:", error);
//     return null;
//   }
// };

// // Xóa danh mục
// const deleteCategory = async (id) => {
//   try {
//     await axios.delete(`http://localhost:4000/api/categories/${id}`);
//   } catch (error) {
//     console.error("Lỗi khi xóa danh mục:", error);
//   }
// };