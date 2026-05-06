require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes"); // ✅ ADD THIS

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "images")));

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/products", productRoutes); // ✅ ADD THIS

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});