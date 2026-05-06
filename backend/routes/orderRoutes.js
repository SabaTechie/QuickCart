const express = require("express");
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

router.post("/place", auth, placeOrder);

module.exports = router;