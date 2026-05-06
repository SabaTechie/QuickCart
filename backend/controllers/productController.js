const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    console.log("Products from DB:", products); // debug

    // VERY IMPORTANT
    res.json(products); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};