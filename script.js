// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Store products globally
let productsData = [];


// LOAD PRODUCTS (only on homepage)
if (document.getElementById("products")) {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      productsData = data;
      displayProducts(data);
    });
}


// DISPLAY PRODUCTS
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const exists = cart.find(item => item.id === p.id);

    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" class="product-img"/>
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>

        ${
          exists
            ? `<button   class="go-cart-btn" onclick="viewCart()">✔ Go to Cart</button>`
            : `<button onclick="addToCart(${p.id})">Add to Cart</button>`
        }

      </div>
    `;
  });
}


// ADD TO CART
function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  displayProducts(productsData); 
}


// UPDATE CART COUNT
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const el =
    document.getElementById("cart-count") ||
    document.querySelector(".cart-badge");

  if (el) el.innerText = count;
}

updateCartCount();


// RENDER CART
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!container) return;

  container.innerHTML = "";

  // 🛒 EMPTY CART
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;">
        <h3>Your cart is empty 🛒</h3>
        <button onclick="window.location.href='index.html'">
          Continue Shopping
        </button>
      </div>
    `;

    totalEl.innerText = "";

    if (checkoutBtn) checkoutBtn.style.display = "none";

    return;
  }

  // ✔ SHOW checkout button
  if (checkoutBtn) checkoutBtn.style.display = "block";

  let total = 0;

  cart.forEach(item => {
    const product = productsData.find(p => p.id === item.id);

    // 🔥 CRITICAL FIX (prevents empty cart bug)
    if (!product) return;

    const itemTotal = product.price * item.qty;
    total += itemTotal;

    container.innerHTML += `
      <div class="cart-card">

        <img src="${product.image}" class="cart-img" />

        <div class="cart-info">

          <h3>${product.name}</h3>

          <p class="price">₹${product.price}</p>

          <div class="qty-controls">
            <button onclick="changeQty(${product.id}, -1)">➖</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${product.id}, 1)">➕</button>
          </div>

          <p class="item-total">Total: ₹${itemTotal}</p>

          <button class="remove-btn" onclick="removeItem(${product.id})">
            Remove
          </button>

        </div>

      </div>
    `;
  });

  totalEl.innerText = "Total: ₹" + total;
}
// LOAD CART PAGE
if (document.getElementById("cart-items")) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      productsData = data;
      renderCart();
    })
    .catch(err => console.error(err));
}

// REMOVE ITEM
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  renderCart();
}


// CHANGE QUANTITY
function changeQty(id, change) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += change;

    if (item.qty <= 0) {
      cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
}


// SEARCH
function searchProduct() {
  const value = document.getElementById("search").value.toLowerCase();

  if (!document.getElementById("products")) {
    window.location.href = "index.html";
    return;
  }

  const filtered = productsData.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}
// VIEW CART
function viewCart() {
  window.location.href = "cart.html";
}


// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    localStorage.setItem("user", email);
    alert("Login Successful");
    window.location.href = "index.html";
  } else {
    alert("Enter details");
  }
}

function signup() {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !fullname || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { username, fullname, email, password };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// CHECKOUT
function goToCheckout() {
  window.location.href = "checkout.html";
}


// PLACE ORDER
function placeOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;

  if (!name || !address || !city) {
    alert("Please fill all details");
    return;
  }

  alert("Order Placed Successfully!");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
}