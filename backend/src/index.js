const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const userLoginRoute = require('./routes/userLoginRoute');
const sliderRoute = require('./routes/sliderRoute');
const cartRoutes = require('./routes/cartRoute');
const cartItemRoutes = require('./routes/cartItemRoute');
const OrderRoutes = require('./routes/orderRoute');

app.use(cors());
app.use(express.json());

// Route
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/login', userLoginRoute);
app.use('/api/slider', sliderRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/cart-item', cartItemRoutes);
app.use('/api/order', OrderRoutes);

// Chạy server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy ở http://localhost:${PORT}`);
});
