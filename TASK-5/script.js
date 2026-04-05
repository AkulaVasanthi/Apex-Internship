/**
 * ShopNova — E-Commerce JavaScript
 * Handles: Products, Cart, Auth, Search, Filter, Sort, Profile, Upload
 */

/* ============================================================
   SAMPLE PRODUCT DATA
   ============================================================ */
const PRODUCTS_DATA = [
  // Electronics
  { id: 1, name: "Wireless Noise-Cancelling Headphones", category: "electronics", price: 249.99, originalPrice: 349.99, rating: 4.8, reviews: 2341, emoji: "🎧", badge: "Best Seller", description: "Immersive 40-hour battery, adaptive noise cancellation, and studio-quality sound. Foldable for travel.", features: ["40hr battery", "Active noise cancellation", "Bluetooth 5.3", "Foldable design", "USB-C charging"], brand: "SoundCore", stock: 45 },
  { id: 2, name: "4K Ultra HD Smart TV 55\"", category: "electronics", price: 499.99, originalPrice: 699.99, rating: 4.6, reviews: 1892, emoji: "📺", badge: "Sale", description: "Stunning 4K OLED display with Dolby Vision and HDR10+. Built-in streaming apps and voice control.", features: ["4K OLED", "Dolby Vision & Atmos", "Smart TV OS", "4 HDMI 2.1 ports", "120Hz refresh rate"], brand: "VisionTech", stock: 12 },
  { id: 3, name: "Pro Gaming Mechanical Keyboard", category: "electronics", price: 129.99, originalPrice: null, rating: 4.7, reviews: 867, emoji: "⌨️", badge: null, description: "RGB per-key illumination with Cherry MX switches. Compact TKL design for maximum mouse room.", features: ["Cherry MX Red switches", "Per-key RGB", "Aluminum frame", "N-key rollover", "Detachable USB-C"], brand: "TactKey", stock: 78 },
  { id: 4, name: "Smartphone Pro Max 15", category: "electronics", price: 1099.00, originalPrice: 1199.00, rating: 4.9, reviews: 5621, emoji: "📱", badge: "New", description: "The most powerful smartphone ever made. A17 chip, 48MP camera system, titanium build.", features: ["A17 Pro chip", "48MP triple camera", "Titanium frame", "USB-C 3.0", "All-day battery"], brand: "PhoneCo", stock: 200 },
  { id: 5, name: "Ultrabook Laptop 14\" OLED", category: "electronics", price: 1299.99, originalPrice: 1599.99, rating: 4.7, reviews: 443, emoji: "💻", badge: "Sale", description: "Featherlight at 1.1kg. Intel i7 + 32GB RAM + 1TB NVMe. 14\" OLED 2.8K 120Hz display.", features: ["Intel Core i7-13th Gen", "32GB LPDDR5 RAM", "1TB PCIe NVMe SSD", "14\" OLED 2.8K", "Intel Iris Xe GPU"], brand: "SlimBook", stock: 30 },
  { id: 6, name: "True Wireless Earbuds Pro", category: "electronics", price: 89.99, originalPrice: 129.99, rating: 4.5, reviews: 3012, emoji: "🎵", badge: "Sale", description: "Crystal clear calls with AI noise-cancellation. 8hr playback + 32hr case. IPX5 water resistant.", features: ["ANC + Transparency mode", "8hr + 32hr battery", "IPX5 waterproof", "Wireless charging case", "Multipoint connection"], brand: "SoundCore", stock: 150 },

  // Fashion
  { id: 7, name: "Classic White Leather Sneakers", category: "fashion", price: 79.99, originalPrice: 120.00, rating: 4.6, reviews: 1204, emoji: "👟", badge: "Trending", description: "Premium full-grain leather uppers. Cushioned memory foam insole. Versatile for any outfit.", features: ["Full-grain leather", "Memory foam insole", "Rubber outsole", "Available in 7 colors", "True to size"], brand: "StreetStep", stock: 90 },
  { id: 8, name: "Merino Wool Turtleneck Sweater", category: "fashion", price: 65.00, originalPrice: null, rating: 4.8, reviews: 389, emoji: "🧥", badge: null, description: "Ultra-soft 100% merino wool. Temperature-regulating, odor-resistant, machine washable.", features: ["100% Merino wool", "Anti-itch fabric", "Machine washable", "Ribbed cuffs & hem", "Slim fit"], brand: "WoolCraft", stock: 55 },
  { id: 9, name: "Slim Fit Chino Pants", category: "fashion", price: 45.00, originalPrice: 60.00, rating: 4.4, reviews: 712, emoji: "👖", badge: "Sale", description: "Wrinkle-resistant stretch chinos. Professional enough for work, casual enough for weekends.", features: ["Stretch cotton", "Wrinkle resistant", "Slim tapered fit", "5-pocket design", "Machine washable"], brand: "CityWear", stock: 120 },
  { id: 10, name: "Minimalist Leather Watch", category: "fashion", price: 149.99, originalPrice: 220.00, rating: 4.9, reviews: 891, emoji: "⌚", badge: "Top Rated", description: "Swiss movement. Sapphire crystal. Italian leather strap. 5ATM water resistance.", features: ["Swiss Quartz movement", "Sapphire crystal glass", "Italian leather strap", "5ATM water resistant", "3yr battery life"], brand: "TimeCraft", stock: 25 },
  { id: 11, name: "Puffer Winter Jacket", category: "fashion", price: 159.00, originalPrice: 230.00, rating: 4.7, reviews: 567, emoji: "🧤", badge: "Winter Pick", description: "800-fill recycled down. Packable into its own pocket. Windproof & water-repellent shell.", features: ["800-fill recycled down", "Packable design", "DWR treated", "Windproof shell", "Multiple pockets"], brand: "ArcticWear", stock: 40 },

  // Home
  { id: 12, name: "Robot Vacuum Cleaner Pro", category: "home", price: 399.99, originalPrice: 549.99, rating: 4.6, reviews: 2234, emoji: "🤖", badge: "Smart Home", description: "LiDAR mapping. Auto-empty base. Mop combo. Works with Alexa and Google Home.", features: ["LiDAR mapping", "Auto-empty base", "Mop + vacuum combo", "Voice control", "Zone cleaning"], brand: "CleanBot", stock: 35 },
  { id: 13, name: "Ceramic Pour-Over Coffee Set", category: "home", price: 48.00, originalPrice: null, rating: 4.8, reviews: 456, emoji: "☕", badge: "Staff Pick", description: "Handcrafted ceramic dripper, carafe, and two mugs. Perfect for your morning ritual.", features: ["Food-safe ceramic", "400ml carafe", "2 matching mugs", "Bamboo coaster set", "Gift box included"], brand: "CeramicCo", stock: 80 },
  { id: 14, name: "Smart LED Floor Lamp", category: "home", price: 85.00, originalPrice: 110.00, rating: 4.5, reviews: 324, emoji: "💡", badge: "Sale", description: "16M color smart bulb. Control via app or voice. Energy-efficient 12W LED.", features: ["16M colors + whites", "App & voice control", "12W LED (100W equiv)", "Alexa/Google compatible", "Memory function"], brand: "LumiHome", stock: 60 },
  { id: 15, name: "Bamboo Cutting Board Set (3pc)", category: "home", price: 32.99, originalPrice: 45.00, rating: 4.7, reviews: 893, emoji: "🪵", badge: "Eco", description: "Three-size eco-bamboo cutting boards. Juice grooves, non-slip feet, dishwasher safe.", features: ["Organic bamboo", "3 sizes included", "Juice grooves", "Non-slip rubber feet", "Easy grip handles"], brand: "GreenKitchen", stock: 200 },
  { id: 16, name: "Air Purifier HEPA H13", category: "home", price: 199.99, originalPrice: 280.00, rating: 4.8, reviews: 1102, emoji: "🌬️", badge: "Health", description: "True HEPA H13 filter removes 99.97% of particles. Quiet sleep mode. 360° air intake.", features: ["True HEPA H13", "360° air intake", "Ultra-quiet 24dB", "Smart air quality sensor", "Auto mode"], brand: "PureAir", stock: 45 },

  // Sports
  { id: 17, name: "Adjustable Dumbbell Set (5–52 lb)", category: "sports", price: 349.99, originalPrice: 450.00, rating: 4.9, reviews: 1678, emoji: "🏋️", badge: "Home Gym", description: "Replaces 15 sets of weights. Quick 2-second adjustment. Solid steel construction.", features: ["5–52 lb range", "15 weight settings", "2-second adjustment", "Space-saving design", "Non-slip grip"], brand: "IronFit", stock: 22 },
  { id: 18, name: "Running Shoes UltraBoost", category: "sports", price: 119.99, originalPrice: 160.00, rating: 4.7, reviews: 2890, emoji: "🏃", badge: "Trending", description: "Responsive BOOST midsole. Adaptive fit upper. Continental rubber outsole for grip.", features: ["BOOST midsole", "Primeknit+ upper", "Continental rubber", "Torsion system", "Reflective details"], brand: "RunMax", stock: 100 },
  { id: 19, name: "Yoga Mat Premium 6mm", category: "sports", price: 39.99, originalPrice: 55.00, rating: 4.6, reviews: 1342, emoji: "🧘", badge: null, description: "Extra thick 6mm TPE foam. Non-slip texture on both sides. With carry strap.", features: ["6mm TPE foam", "Double-sided non-slip", "Eco-friendly material", "183×61cm size", "Carry strap included"], brand: "ZenFit", stock: 180 },
  { id: 20, name: "Waterproof Hiking Backpack 40L", category: "sports", price: 89.99, originalPrice: 130.00, rating: 4.8, reviews: 678, emoji: "🎒", badge: "Adventure", description: "40L capacity. Built-in rain cover. Ergonomic airflow back system. Multiple organizer pockets.", features: ["40L capacity", "Built-in rain cover", "Airflow back system", "Hydration sleeve", "Hip belt with pockets"], brand: "TrailPro", stock: 50 },

  // Books
  { id: 21, name: "Atomic Habits — James Clear", category: "books", price: 14.99, originalPrice: 22.00, rating: 4.9, reviews: 8901, emoji: "📚", badge: "Bestseller", description: "The proven framework for getting 1% better every day. Over 5 million copies sold worldwide.", features: ["320 pages", "Hardcover available", "Audiobook available", "Companion workbook", "International bestseller"], brand: "Penguin", stock: 500 },
  { id: 22, name: "Deep Work — Cal Newport", category: "books", price: 12.99, originalPrice: 18.00, rating: 4.7, reviews: 4512, emoji: "📖", badge: null, description: "Rules for focused success in a distracted world. Essential reading for knowledge workers.", features: ["296 pages", "Paperback & Kindle", "Business category", "Action framework", "Case studies"], brand: "Grand Central", stock: 300 },
  { id: 23, name: "The Design of Everyday Things", category: "books", price: 16.99, originalPrice: 24.00, rating: 4.8, reviews: 3244, emoji: "🎨", badge: "Design Classic", description: "Don Norman's seminal guide to user-centered design. Revised and expanded edition.", features: ["368 pages", "Illustrated", "Revised edition", "UX/Design staple", "MIT recommended"], brand: "Basic Books", stock: 200 },
];


/* ============================================================
   STATE MANAGEMENT
   ============================================================ */
let currentPage = 'home';           // Active page
let currentProducts = [...PRODUCTS_DATA]; // Filtered/sorted product list
let activeCategoryFilter = 'all';    // Current category filter
let currentDetailProduct = null;     // Product shown in detail view
let detailQuantity = 1;              // Qty on detail page
let wishlist = JSON.parse(localStorage.getItem('nova_wishlist') || '[]');


/* ============================================================
   PAGE NAVIGATION
   ============================================================ */
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + pageName);
  if (target) {
    target.classList.add('active');
    currentPage = pageName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Close auth dropdown
  closeAuthMenu();
  // Run page-specific init
  if (pageName === 'home') renderProducts(currentProducts);
  if (pageName === 'cart') renderCart();
  if (pageName === 'profile') initProfile();
}


/* ============================================================
   RENDER PRODUCTS
   ============================================================ */
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  resultsCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

  if (products.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.04}s" onclick="openProduct(${p.id})">
      <div class="card-img-wrap">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" />`
          : `<div class="emoji-placeholder">${p.emoji}</div>`
        }
        ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
        <button class="card-wishlist ${wishlist.includes(p.id) ? 'active' : ''}"
          onclick="toggleWishlist(event, ${p.id})" title="Wishlist">
          <i class="fa${wishlist.includes(p.id) ? 's' : 'r'} fa-heart"></i>
        </button>
      </div>
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span class="rating-count">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            $${p.price.toFixed(2)}
            ${p.originalPrice ? `<span class="original">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="addToCart(event, ${p.id})" title="Add to cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}


/* ============================================================
   STAR RENDERING
   ============================================================ */
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars += '★';
    else if (rating >= i - 0.5) stars += '⭑';
    else stars += '☆';
  }
  return stars;
}


/* ============================================================
   OPEN PRODUCT DETAIL
   ============================================================ */
function openProduct(id) {
  const product = getAllProducts().find(p => p.id === id);
  if (!product) return;

  currentDetailProduct = product;
  detailQuantity = 1;

  // Set breadcrumb
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailName').textContent = product.name;

  // Set badge
  const badgeEl = document.getElementById('detailBadge');
  badgeEl.textContent = product.badge || '';
  badgeEl.style.display = product.badge ? 'inline-block' : 'none';

  // Set title
  document.getElementById('detailTitle').textContent = product.name;

  // Set rating
  document.getElementById('detailRating').innerHTML = `
    <span class="stars">${renderStars(product.rating)}</span>
    <span class="score">${product.rating}</span>
    <span style="color:var(--text3)">(${product.reviews.toLocaleString()} reviews)</span>
  `;

  // Set price
  const priceEl = document.getElementById('detailPrice');
  priceEl.innerHTML = `$${product.price.toFixed(2)}`;
  if (product.originalPrice) {
    priceEl.innerHTML += ` <span class="detail-original">$${product.originalPrice.toFixed(2)}</span>`;
  }

  // Set image
  const imgEl = document.getElementById('detailImage');
  if (product.image) {
    imgEl.src = product.image;
    imgEl.style.fontSize = '';
    imgEl.classList.remove('emoji-mode');
  } else {
    imgEl.src = '';
    imgEl.alt = product.emoji;
    imgEl.classList.add('emoji-mode');
    imgEl.style.fontSize = '120px';
    imgEl.textContent = product.emoji; // fallback
    // Use a canvas trick or just show the emoji as alt text
    imgEl.outerHTML; // no-op
    // Rebuild as div for emoji display
    const gallery = document.querySelector('.detail-gallery');
    const mainImgParent = document.getElementById('detailImage').parentElement;
    // Just update display using style hack
    document.getElementById('detailImage').src = '';
    document.getElementById('detailImage').alt = product.emoji;
    document.getElementById('detailImage').style.cssText = `
      display:flex; align-items:center; justify-content:center;
      font-size:120px; line-height:1;
    `;
    // Use textContent-capable approach
    const wrapper = document.createElement('div');
    wrapper.className = 'detail-main-img emoji-mode';
    wrapper.textContent = product.emoji;
    wrapper.id = 'detailImage';
    document.getElementById('detailImage').replaceWith(wrapper);
  }

  // Set description
  document.getElementById('detailDesc').textContent = product.description;

  // Set features
  document.getElementById('detailFeatures').innerHTML = (product.features || []).map(f => `
    <div class="detail-feature"><i class="fas fa-check-circle"></i> ${f}</div>
  `).join('');

  // Reset qty
  document.getElementById('detailQty').textContent = '1';

  // Set meta info
  document.getElementById('detailMeta').innerHTML = `
    <div class="meta-item"><div class="label">Brand</div><div class="value">${product.brand || 'N/A'}</div></div>
    <div class="meta-item"><div class="label">Category</div><div class="value">${product.category}</div></div>
    <div class="meta-item"><div class="label">In Stock</div><div class="value">${product.stock} units</div></div>
    <div class="meta-item"><div class="label">SKU</div><div class="value">SNV-${String(product.id).padStart(4,'0')}</div></div>
  `;

  showPage('product');
}


/* ============================================================
   DETAIL PAGE QTY + ADD TO CART
   ============================================================ */
function changeQty(delta) {
  detailQuantity = Math.max(1, detailQuantity + delta);
  document.getElementById('detailQty').textContent = detailQuantity;
}

function addDetailToCart() {
  if (!currentDetailProduct) return;
  for (let i = 0; i < detailQuantity; i++) {
    addToCart(null, currentDetailProduct.id, false);
  }
  showToast(`Added ${detailQuantity}× to cart`, 'success', 'fa-cart-plus');
  updateCartBadge();
}

function buyNow() {
  addDetailToCart();
  showPage('cart');
}


/* ============================================================
   SEARCH
   ============================================================ */
function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const category = document.getElementById('searchCategory').value;

  let filtered = PRODUCTS_DATA;

  // Category filter from search bar
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Text search across name, description, features
  if (query) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.features || []).some(f => f.toLowerCase().includes(query))
    );
  }

  currentProducts = filtered;

  // Update category pills to 'all' if using search bar
  if (query) {
    document.querySelectorAll('.cat-pill').forEach(pill => pill.classList.remove('active'));
    document.querySelector('.cat-pill[data-cat="all"]').classList.add('active');
    activeCategoryFilter = 'all';
  }

  applyFilters();
  if (currentPage !== 'home') showPage('home');
}


/* ============================================================
   CATEGORY FILTER
   ============================================================ */
function filterByCategory(cat, el) {
  activeCategoryFilter = cat;

  // Update pill UI
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');

  // Clear search
  document.getElementById('searchInput').value = '';
  document.getElementById('searchCategory').value = 'all';

  if (cat === 'all') {
    currentProducts = [...PRODUCTS_DATA];
  } else {
    currentProducts = PRODUCTS_DATA.filter(p => p.category === cat);
  }

  applyFilters();
}


/* ============================================================
   PRICE FILTER + SORT
   ============================================================ */
function applyFilters() {
  let products = [...currentProducts];

  // Price filter
  const priceRange = document.getElementById('priceFilter').value;
  if (priceRange !== 'all') {
    if (priceRange === '500+') {
      products = products.filter(p => p.price >= 500);
    } else {
      const [min, max] = priceRange.split('-').map(Number);
      products = products.filter(p => p.price >= min && p.price <= max);
    }
  }

  // Sort
  const sort = document.getElementById('sortFilter').value;
  if (sort === 'low-high')  products.sort((a, b) => a.price - b.price);
  if (sort === 'high-low')  products.sort((a, b) => b.price - a.price);
  if (sort === 'rating')    products.sort((a, b) => b.rating - a.rating);

  renderProducts(products);
}


/* ============================================================
   CART — LOCAL STORAGE
   ============================================================ */
function getCart() {
  return JSON.parse(localStorage.getItem('nova_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('nova_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(event, productId, showNotification = true) {
  if (event) event.stopPropagation(); // Prevent card click

  const product = getAllProducts().find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      image: product.image || null,
      category: product.category,
      quantity: 1
    });
  }

  saveCart(cart);

  if (showNotification) {
    showToast(`"${product.name.slice(0, 30)}..." added to cart`, 'success', 'fa-cart-plus');
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateCartQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity = Math.max(1, item.quantity + delta);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  saveCart([]);
  renderCart();
}

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  if (total > 0) badge.classList.add('visible');
  else badge.classList.remove('visible');
}

/* ============================================================
   RENDER CART PAGE
   ============================================================ */
function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  const countEl = document.getElementById('cartItemCount');

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  countEl.textContent = totalItems > 0 ? `(${totalItems} item${totalItems !== 1 ? 's' : ''})` : '';

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add products to your cart to see them here</p>
        <button class="btn-primary" onclick="showPage('home')">Continue Shopping</button>
      </div>
    `;
    summaryEl.innerHTML = '';
    return;
  }

  // Render items
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" />`
          : item.emoji
        }
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cat-tag">${item.category}</div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button onclick="updateCartQty(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
          <button class="btn-danger" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </div>
      </div>
      <div class="cart-item-price">
        $${(item.price * item.quantity).toFixed(2)}
        <div style="font-size:12px;color:var(--text3);font-weight:400;margin-top:4px">
          $${item.price.toFixed(2)} each
        </div>
      </div>
    </div>
  `).join('');

  // Calculate totals
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Render summary
  summaryEl.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row">
      <span>Subtotal (${totalItems} items)</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : '$' + shipping.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Tax (8%)</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <div class="promo-input" style="margin-top:20px">
      <input type="text" placeholder="Promo code" id="promoCode" />
      <button onclick="applyPromo()">Apply</button>
    </div>
    <button class="btn-primary full" onclick="checkout()">
      <i class="fas fa-lock"></i> Proceed to Checkout
    </button>
    <button class="btn-secondary full" style="margin-top:10px" onclick="clearCart()">
      <i class="fas fa-trash"></i> Clear Cart
    </button>
    ${subtotal < 50 ? `<p style="font-size:12px;color:var(--text3);text-align:center;margin-top:12px">
      Add $${(50 - subtotal).toFixed(2)} more for free shipping!
    </p>` : '<p style="font-size:12px;color:var(--success);text-align:center;margin-top:12px">🎉 You qualify for free shipping!</p>'}
  `;
}

function applyPromo() {
  const code = document.getElementById('promoCode')?.value.trim().toUpperCase();
  if (code === 'NOVA10') showToast('10% discount applied!', 'success', 'fa-tag');
  else showToast('Invalid promo code', 'error', 'fa-times');
}

function checkout() {
  const user = getUser();
  if (!user) {
    showToast('Please sign in to checkout', 'error', 'fa-user');
    setTimeout(() => showPage('login'), 1200);
    return;
  }
  // Simulate checkout
  showToast('Order placed! Thank you 🎉', 'success', 'fa-check');
  // Save order to user history
  const cart = getCart();
  const orders = JSON.parse(localStorage.getItem(`nova_orders_${user.email}`) || '[]');
  orders.unshift({
    id: 'ORD-' + Date.now(),
    date: new Date().toLocaleDateString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    status: 'Processing'
  });
  localStorage.setItem(`nova_orders_${user.email}`, JSON.stringify(orders));
  saveCart([]);
  renderCart();
}


/* ============================================================
   AUTH — USER SESSION
   ============================================================ */
function getUser() {
  return JSON.parse(localStorage.getItem('nova_user') || 'null');
}

function setUser(user) {
  localStorage.setItem('nova_user', JSON.stringify(user));
}

function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');

  // Basic validation
  if (!email || !password) {
    showFormError(errorEl, 'Please fill in all fields.');
    return;
  }
  if (!isValidEmail(email)) {
    showFormError(errorEl, 'Please enter a valid email address.');
    return;
  }

  // Look up registered users
  const users = JSON.parse(localStorage.getItem('nova_users') || '[]');
  const found = users.find(u => u.email === email && u.password === btoa(password));

  if (!found) {
    showFormError(errorEl, 'Invalid email or password. Try creating an account.');
    return;
  }

  errorEl.style.display = 'none';
  setUser({ name: found.firstName + ' ' + found.lastName, email: found.email, firstName: found.firstName });
  updateNavAuth();
  showToast(`Welcome back, ${found.firstName}! 👋`, 'success', 'fa-user');
  showPage('home');
}

function signupUser() {
  const firstName = document.getElementById('signupFirstName').value.trim();
  const lastName  = document.getElementById('signupLastName').value.trim();
  const email     = document.getElementById('signupEmail').value.trim();
  const password  = document.getElementById('signupPassword').value;
  const confirm   = document.getElementById('signupConfirm').value;
  const agreed    = document.getElementById('agreeTerms').checked;
  const errorEl   = document.getElementById('signupError');
  const successEl = document.getElementById('signupSuccess');

  // Validation
  errorEl.style.display = 'none';
  successEl.style.display = 'none';

  if (!firstName || !lastName || !email || !password || !confirm) {
    showFormError(errorEl, 'Please fill in all fields.'); return;
  }
  if (!isValidEmail(email)) {
    showFormError(errorEl, 'Please enter a valid email address.'); return;
  }
  if (password.length < 8) {
    showFormError(errorEl, 'Password must be at least 8 characters.'); return;
  }
  if (password !== confirm) {
    showFormError(errorEl, 'Passwords do not match.'); return;
  }
  if (!agreed) {
    showFormError(errorEl, 'Please agree to the Terms of Service.'); return;
  }

  // Check if email already registered
  const users = JSON.parse(localStorage.getItem('nova_users') || '[]');
  if (users.find(u => u.email === email)) {
    showFormError(errorEl, 'An account with this email already exists.'); return;
  }

  // Save new user
  users.push({ firstName, lastName, email, password: btoa(password) });
  localStorage.setItem('nova_users', JSON.stringify(users));

  // Auto-login
  setUser({ name: firstName + ' ' + lastName, email, firstName });
  updateNavAuth();

  successEl.textContent = '🎉 Account created! Redirecting...';
  successEl.style.display = 'block';

  setTimeout(() => {
    showPage('home');
    showToast(`Welcome, ${firstName}! Your account is ready.`, 'success', 'fa-user');
  }, 1000);
}

function logoutUser() {
  localStorage.removeItem('nova_user');
  updateNavAuth();
  showToast('You have been signed out.', 'success', 'fa-sign-out-alt');
  showPage('home');
}

function updateNavAuth() {
  const user = getUser();
  const authLabel = document.getElementById('authLabel');
  const authBtn   = document.getElementById('authBtn');
  const content   = document.getElementById('authDropdownContent');

  if (user) {
    authLabel.textContent = user.firstName || user.name.split(' ')[0];
    content.innerHTML = `
      <a onclick="showPage('profile'); closeAuthMenu()"><i class="fas fa-user"></i> My Profile</a>
      <a onclick="showPage('cart'); closeAuthMenu()"><i class="fas fa-shopping-bag"></i> My Orders</a>
      <div class="divider"></div>
      <button onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Sign Out</button>
    `;
  } else {
    authLabel.textContent = 'Sign In';
    content.innerHTML = `
      <a onclick="showPage('login'); closeAuthMenu()"><i class="fas fa-sign-in-alt"></i> Sign In</a>
      <a onclick="showPage('signup'); closeAuthMenu()"><i class="fas fa-user-plus"></i> Create Account</a>
    `;
  }
}

function toggleAuthMenu() {
  document.getElementById('authDropdown').classList.toggle('open');
}

function closeAuthMenu() {
  document.getElementById('authDropdown').classList.remove('open');
}

// Close auth dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('authDropdown');
  const btn = document.getElementById('authBtn');
  if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// Toggle password visibility
function togglePass(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Password strength meter
function checkPasswordStrength(value) {
  const bar = document.getElementById('passwordStrength');
  if (!bar) return;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const widths = ['0%', '25%', '50%', '75%', '100%'];
  const colors = ['transparent', '#ff4d6d', '#f5a623', '#3b82f6', '#2dd4a0'];
  bar.style.setProperty('--strength', widths[score]);
  bar.style.setProperty('--strength-color', colors[score]);
}


/* ============================================================
   PROFILE PAGE
   ============================================================ */
function initProfile() {
  const user = getUser();
  if (!user) { showPage('login'); return; }

  // Avatar
  const avatar = document.getElementById('profileAvatar');
  const savedAvatar = localStorage.getItem(`nova_avatar_${user.email}`);
  if (savedAvatar) {
    avatar.innerHTML = `<img src="${savedAvatar}" alt="Avatar" />`;
  } else {
    avatar.textContent = (user.firstName || user.name[0]).charAt(0).toUpperCase();
  }

  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;

  // Pre-fill settings
  const parts = user.name.split(' ');
  document.getElementById('settingsFirstName').value = parts[0] || '';
  document.getElementById('settingsLastName').value = parts[1] || '';
  document.getElementById('settingsEmail').value = user.email;

  const settings = JSON.parse(localStorage.getItem(`nova_settings_${user.email}`) || '{}');
  document.getElementById('settingsPhone').value = settings.phone || '';
  document.getElementById('settingsAddress').value = settings.address || '';

  // Load orders
  renderOrders(user);

  // Load wishlist
  renderWishlistGrid();

  // Reset to orders section
  switchProfileSection('orders', document.querySelector('.pnav[data-section="orders"]'));
}

function renderOrders(user) {
  const orders = JSON.parse(localStorage.getItem(`nova_orders_${user.email}`) || '[]');
  const list = document.getElementById('ordersList');

  if (orders.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text3)">
        <i class="fas fa-box-open" style="font-size:40px;opacity:.3;margin-bottom:12px;display:block"></i>
        <p>No orders yet. <a onclick="showPage('home')">Start shopping!</a></p>
      </div>
    `;
    return;
  }

  const statuses = ['Delivered', 'Shipping', 'Processing'];
  list.innerHTML = orders.map(order => {
    const statusClass = `status-${order.status.toLowerCase()}`;
    return `
      <div class="order-card">
        <div class="order-header">
          <span>Order #${order.id}</span>
          <span>${order.date}</span>
          <span class="order-status ${statusClass}">${order.status}</span>
        </div>
        <div class="order-items">
          ${order.items.map(i => `${i.name} × ${i.quantity}`).join(' &nbsp;·&nbsp; ')}
        </div>
        <div class="order-total">$${order.total.toFixed(2)}</div>
      </div>
    `;
  }).join('');
}

function renderWishlistGrid() {
  const grid = document.getElementById('wishlistGrid');
  const wishlisted = getAllProducts().filter(p => wishlist.includes(p.id));

  if (wishlisted.length === 0) {
    grid.innerHTML = `<p style="color:var(--text3);padding:20px 0">No items in your wishlist yet.</p>`;
    return;
  }

  grid.innerHTML = wishlisted.map(p => `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="card-img-wrap">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : `<div class="emoji-placeholder">${p.emoji}</div>`}
      </div>
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="card-footer">
          <div class="card-price">$${p.price.toFixed(2)}</div>
          <button class="btn-add-cart" onclick="addToCart(event, ${p.id})"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

function switchProfileSection(section, el) {
  document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.pnav').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');
  if (el) el.classList.add('active');
}

function saveSettings() {
  const user = getUser();
  if (!user) return;

  const firstName = document.getElementById('settingsFirstName').value.trim();
  const lastName  = document.getElementById('settingsLastName').value.trim();
  const phone     = document.getElementById('settingsPhone').value.trim();
  const address   = document.getElementById('settingsAddress').value.trim();

  // Update user
  user.name = firstName + ' ' + lastName;
  user.firstName = firstName;
  setUser(user);

  // Save extra settings
  localStorage.setItem(`nova_settings_${user.email}`, JSON.stringify({ phone, address }));

  updateNavAuth();
  document.getElementById('profileName').textContent = user.name;

  const msgEl = document.getElementById('settingsMsg');
  msgEl.innerHTML = '<span style="color:var(--success)"><i class="fas fa-check"></i> Settings saved!</span>';
  msgEl.style.display = 'block';
  setTimeout(() => { msgEl.style.display = 'none'; }, 2500);
}

// Upload user avatar
function uploadAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const src = e.target.result;
    const user = getUser();
    if (user) localStorage.setItem(`nova_avatar_${user.email}`, src);
    document.getElementById('profileAvatar').innerHTML = `<img src="${src}" alt="Avatar" />`;
    showToast('Profile photo updated!', 'success', 'fa-camera');
  };
  reader.readAsDataURL(file);
}


/* ============================================================
   WISHLIST
   ============================================================ */
function toggleWishlist(event, productId) {
  event.stopPropagation();
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    showToast('Added to wishlist', 'success', 'fa-heart');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'success', 'fa-heart-broken');
  }
  localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
  applyFilters(); // Re-render to update heart icon
}


/* ============================================================
   PRODUCT IMAGE UPLOAD (FAB Button)
   ============================================================ */
function previewUploadedProduct(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('uploadPreviewImg').src = e.target.result;
    document.getElementById('uploadModal').style.display = 'flex';
    // Reset fields
    document.getElementById('uploadProductName').value = '';
    document.getElementById('uploadProductPrice').value = '';
  };
  reader.readAsDataURL(file);
}

function closeUploadModal() {
  document.getElementById('uploadModal').style.display = 'none';
  document.getElementById('productImageUpload').value = '';
}

function addUploadedProduct() {
  const name  = document.getElementById('uploadProductName').value.trim();
  const price = parseFloat(document.getElementById('uploadProductPrice').value);
  const cat   = document.getElementById('uploadProductCat').value;
  const imgSrc= document.getElementById('uploadPreviewImg').src;

  if (!name || !price || isNaN(price)) {
    showToast('Please fill in product name and price', 'error', 'fa-exclamation');
    return;
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: cat,
    price,
    originalPrice: null,
    rating: 5.0,
    reviews: 0,
    emoji: '📦',
    image: imgSrc,
    badge: 'New',
    description: 'A custom product added by you.',
    features: [],
    brand: 'Custom',
    stock: 99
  };

  PRODUCTS_DATA.unshift(newProduct);
  currentProducts = [...PRODUCTS_DATA];
  closeUploadModal();
  applyFilters();
  showPage('home');
  showToast(`"${name}" added to the shop!`, 'success', 'fa-plus');
}


/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function getAllProducts() {
  return PRODUCTS_DATA;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
}

// Toast notification system
let toastTimeout;
function showToast(message, type = 'success', icon = 'fa-check') {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimeout);

  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


/* ============================================================
   INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render products
  renderProducts(PRODUCTS_DATA);
  // Update cart badge
  updateCartBadge();
  // Update nav auth state
  updateNavAuth();
  // Show home page
  showPage('home');
  // Keyboard: press Enter to search
  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
});