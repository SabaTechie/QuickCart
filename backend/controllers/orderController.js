const Order = require("../models/Order");

// PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;

    const order = new Order({
      userId: req.userId,
      items,
      total,
      address,
      paymentMethod
    });

    await order.save();

    res.json({ message: "Order placed successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
};