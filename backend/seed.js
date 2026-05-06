const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  { name: "T-Shirt", price: 500, image: "/images/tshirt.jpeg", category: "clothing" },
  { name: "Shoes", price: 2000, image: "/images/shoes.jpeg", category: "footwear" },
  { name: "Watch", price: 1500, image: "/images/watch.jpeg", category: "accessories" },

  { name: "TV", price: 30000, image: "/images/tv.jpeg", category: "electronics" },
  { name: "Mobile", price: 20000, image: "/images/mobile.jpeg", category: "electronics" },
  { name: "Fridge", price: 25000, image: "/images/fridge.jpeg", category: "electronics" },
  { name: "AC", price: 40000, image: "/images/ac.jpeg", category: "electronics" },

  { name: "Saree", price: 1800, image: "/images/saree.jpeg", category: "clothing" },
  { name: "Bedsheet", price: 900, image: "/images/bedsheet.jpeg", category: "home" },
  { name: "Curtains", price: 1200, image: "/images/curtains.jpeg", category: "home" },

  { name: "Ring", price: 3000, image: "/images/ring.jpeg", category: "jewelry" },
  { name: "Earrings", price: 1500, image: "/images/earrings.jpeg", category: "jewelry" },
  { name: "Bracelet", price: 2000, image: "/images/bracelet.jpeg", category: "jewelry" },

  { name: "Perfume", price: 2500, image: "/images/perfume.jpeg", category: "beauty" },
  { name: "Bed" , price: 21999, image: "/images/bed.jpeg" , category : "furniture"  }
];

async function seed() {
  await Product.deleteMany();   // clear old data
  await Product.insertMany(products);
  console.log("Products inserted ✅");
  process.exit();
}

seed();