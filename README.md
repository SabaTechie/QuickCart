# QuickCart - E-Commerce Website

## Project Description

QuickCart is a full-stack e-commerce website developed using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

The website allows users to browse products, search items, add products to cart, manage quantities, authenticate securely using JWT, and place orders through a simulated online payment system.

This project was developed as a major project to demonstrate full-stack web development concepts including frontend development, backend APIs, authentication, database integration, and order processing.

---

# Live Demo

Frontend: https://my-storeee.netlify.app

Backend: https://quickcart-ykr7.onrender.com

---

# Features

- User Signup & Login
- JWT Authentication
- Secure Protected Routes
- Product Listing
- Product Search
- Add to Cart
- Quantity Management
- User-Specific Cart
- Checkout System
- Simulated Online Payment
- Order Placement
- Responsive UI Design

---

# Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas

## Authentication
- JWT (JSON Web Token)

---

# Project Structure

```txt
QuickCart/
│
├── frontend/
│   ├── index.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── signup.html
│   ├── style.css
│   ├── script.js
│   └── images/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── seed.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/SabaTechie/QuickCart.git
```

---

# Backend Setup

## Step 1

Open backend folder

```bash
cd backend
```

## Step 2

Install dependencies

```bash
npm install
```

## Step 3

Create `.env` file

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

## Step 4

Run backend server

```bash
node server.js
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

Open frontend using Live Server in Visual Studio Code.

Frontend runs on:

```txt
http://127.0.0.1:5500
```

---

# API Features

- User Authentication APIs
- Product APIs
- Order APIs
- JWT Protected Routes

---

# Payment System

The project includes a simulated online payment workflow for demonstrating e-commerce transaction processing.

---

# Deployment

- Frontend deployed using Netlify
- Backend deployed using Render
- Database hosted on MongoDB Atlas

---

# Future Improvements

- Real Payment Gateway Integration
- Order History
- User Profile
- Wishlist
- Admin Dashboard
- Product Filters

---

# Author

Saba Parveen

---

# GitHub Repository

https://github.com/SabaTechie/QuickCart