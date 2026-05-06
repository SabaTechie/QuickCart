const hideSearchPages =
  window.location.pathname.includes("cart.html") ||
  window.location.pathname.includes("checkout.html") ||
  window.location.pathname.includes("login.html") ||
  window.location.pathname.includes("signup.html");


  //User Specific Cart Logic
const userId = localStorage.getItem("userId");
let cart = JSON.parse(localStorage.getItem("cart_" + userId)) || [];



let productsData = [];

const isAuthPage =
  window.location.pathname.includes("login.html") ||
  window.location.pathname.includes("signup.html");


document.addEventListener("DOMContentLoaded", () => {

 
  if (
    window.location.pathname.includes("cart.html") ||
    window.location.pathname.includes("checkout.html")
  ) {
    if (!localStorage.getItem("token")) {
      alert("Please login first");
      window.location.href = "login.html";
      return;
    }
  }
//LOADING PRODUCTS FROM BACKEND API
  fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(data => {
      productsData = data;
      console.log("Products loaded from API:", productsData);

     
      if (document.getElementById("products")) {
        displayProducts(productsData);
      }

      
      if (document.getElementById("cart-items")) {
        renderCart();
      }
    })
    .catch(err => console.error("Error loading products:", err));

  updateCartCount();
  updateAuthUI();
});


// DISPLAY PRODUCTS
function displayProducts(products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  const token = localStorage.getItem("token");

  products.forEach(p => {
    
    const exists = cart.find(item => item.id === p._id);

    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" class="product-img"/>
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>

        ${
          !token
            ? `<button onclick="window.location.href='login.html'">Login to Buy</button>`
            : exists
              ? `<button class="go-cart-btn" onclick="viewCart()">✔ Go to Cart</button>`
              : `<button class="add-btn" onclick="addToCart('${p._id}')">Add to Cart</button>`
        }

      </div>
    `;
  });
}


// ADD TO CART 
function addToCart(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }



  // Cart
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }



  localStorage.setItem("cart_" + userId, JSON.stringify(cart));
  updateCartCount();
  displayProducts(productsData);
}

//UPDATE CART COUNT 
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const el =
    document.getElementById("cart-count") ||
    document.querySelector(".cart-badge");

  if (el) el.innerText = count;
}


// RENDER CART
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!container) return;

  container.innerHTML = "";

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

  if (checkoutBtn) checkoutBtn.style.display = "block";

  let total = 0;

  cart.forEach(item => {
    const product = productsData.find(p => p._id === item.id || p._id === item.id);
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
            <button onclick="changeQty('${product._id}', -1)">➖</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${product._id}', 1)">➕</button>
          </div>

          <p class="item-total">Total: ₹${itemTotal}</p>

          <button class="remove-btn" onclick="removeItem('${product._id}')">
            Remove
          </button>
        </div>
      </div>
    `;
  });

  totalEl.innerText = "Total: ₹" + total;
}


//REMOVE ITEM 
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart_" + userId, JSON.stringify(cart));

  updateCartCount();
  renderCart();
}


//CHANGE QTY 
function changeQty(id, change) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += change;

    if (item.qty <= 0) {
      cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart_" + userId, JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
}


//SEARCH 
function searchProduct() {
  if (isAuthPage) {
    alert("Search is available on home page only");
    return;
  }

  const value = document.getElementById("search").value.toLowerCase();

  const filtered = productsData.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
}


//NAVIGATION 
function viewCart() {
  if (!localStorage.getItem("token")) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  window.location.href = "cart.html";
}

function goToCheckout() {
  window.location.href = "checkout.html";
}


// AUTH
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        alert("Login Successful ✅");
        window.location.href = "index.html";
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.error(err));
}






//PLACE ORDER 
function placeOrder() {
  if (!productsData.length) {
    alert("Products not loaded yet");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    return;
  }

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const payment = document.getElementById("payment").value;

  if (!name || !address || !city) {
    alert("Please fill all details");
    return;
  }

  const fullAddress = `${name}, ${address}, ${city}`;

  const total = cart.reduce((sum, item) => {
    const product = productsData.find(p => p._id === item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  
  if (payment === "ONLINE") {
    alert("Redirecting to secure payment gateway...");

    setTimeout(() => {
      alert("Payment Successful ✅");
      completeOrder(token, fullAddress, total, payment);
    }, 2000);
  } 
  

  else {
    alert("Order placed with Cash on Delivery 🛒");
    completeOrder(token, fullAddress, total, payment);
  }
}




//Function for order API
function completeOrder(token, fullAddress, total, payment) {

  fetch("http://localhost:5000/api/order/place", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },

    body: JSON.stringify({
      items: cart,
      total,
      address: fullAddress,
      paymentMethod: payment
    })
  })

  .then(res => res.json())

  .then(data => {

    alert(data.message);

    cart = [];

    localStorage.removeItem("cart_" + userId);

    updateCartCount();

    window.location.href = "index.html";
  })

  .catch(err => console.error(err));
}
//AUTH UI 
function updateAuthUI() {
  const userLink = document.querySelector(".nav-links a[href='login.html']");
  if (!userLink) return;

  const username = localStorage.getItem("username");

  if (localStorage.getItem("token") && username) {
    userLink.innerText = "Hi, " + username;

    userLink.onclick = function () {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      alert("Logged out");
      window.location.href = "login.html";
    };
  }
}

//SIGNUP 
function signup() {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!username || !fullname || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      fullname,
      email,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      if (data.message.includes("successful")) {
        window.location.href = "login.html";
      }
    })
    .catch(err => console.error(err));
}
