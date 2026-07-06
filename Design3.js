class TechNestDesign3 {
  constructor() {
    this.route = "home"; // home | shop | product | cart
    this.checkoutStep = "cart"; // cart | shipping | payment | confirmed

    // Smooth typing: keep immediate input + debounced search query
    this.searchInput = "";
    this.search = "";
    this.searchDebounce = null;

    this.sortBy = "featured";

    this.filters = {
      categories: new Set(),
      brands: new Set(),
      maxPrice: 2500,
      minRating: 0,
      dealsOnly: false
    };

    this.shippingInfo = {
      fullName: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postalCode: ""
    };

    this.freeShippingThreshold = 100;
    this.selectedProductId = null;
    this.detailQty = 1;

    this.products = this.seedProducts();

    // starts empty
    this.cart = [];

    this.mount();
  }

  seedProducts() {
    return [
      {
        id: "asus-rog-g16",
        name: "ASUS ROG Zephyrus G16",
        brand: "ASUS",
        category: "Laptops",
        price: 2199.99,
        oldPrice: 2499.99,
        rating: 5,
        reviews: 124,
        tag: "Deal",
        discount: 12,
        icon: "💻",
        bg: "linear-gradient(135deg,#1a3858,#1f3f62)",
        stock: 7,
        desc: "The ultimate gaming laptop. RTX 4090 GPU, 240Hz OLED display, and all-day battery — built for players who demand the best.",
        specs: {
          CPU: "Intel Core i9-14900HX",
          GPU: "NVIDIA RTX 4090 16GB",
          RAM: "32GB DDR5",
          Storage: "2TB NVMe SSD",
          Display: '16" OLED 240Hz',
          Battery: "90Wh"
        }
      },
      {
        id: "dell-xps-15",
        name: "Dell XPS 15 (2024)",
        brand: "Dell",
        category: "Laptops",
        price: 1899.99,
        oldPrice: null,
        rating: 5,
        reviews: 89,
        tag: "Popular",
        discount: 0,
        icon: "💻",
        bg: "linear-gradient(135deg,#272d50,#2d345b)",
        stock: 6,
        desc: "Premium ultrabook with stunning display and excellent battery life.",
        specs: {
          CPU: "Intel Core Ultra 7",
          GPU: "NVIDIA RTX 4060",
          RAM: "16GB DDR5",
          Storage: "1TB NVMe SSD",
          Display: '15.6" OLED 120Hz',
          Battery: "86Wh"
        }
      },
      {
        id: "lenovo-x1-carbon",
        name: "Lenovo ThinkPad X1 Carbon",
        brand: "Lenovo",
        category: "Laptops",
        price: 1699.99,
        oldPrice: null,
        rating: 5,
        reviews: 203,
        tag: null,
        discount: 0,
        icon: "💻",
        bg: "linear-gradient(135deg,#111c37,#1e2a49)",
        stock: 8,
        desc: "Business-class ultralight laptop with legendary keyboard and reliability.",
        specs: {
          CPU: "Intel Core Ultra 7",
          GPU: "Intel Arc iGPU",
          RAM: "16GB LPDDR5X",
          Storage: "1TB NVMe SSD",
          Display: '14" 2.8K OLED',
          Battery: "57Wh"
        }
      },
      {
        id: "asus-pg279qm",
        name: "ASUS ROG Swift PG279QM",
        brand: "ASUS",
        category: "Monitors",
        price: 849.99,
        oldPrice: 1099.99,
        rating: 5,
        reviews: 67,
        tag: "Deal",
        discount: 23,
        icon: "🖥️",
        bg: "linear-gradient(135deg,#143253,#16375a)",
        stock: 10,
        desc: "High-refresh QHD gaming monitor with ultra-low latency.",
        specs: {
          Panel: '27" IPS',
          Resolution: "2560×1440",
          Refresh: "240Hz",
          Response: "1ms",
          HDR: "DisplayHDR 400",
          Ports: "HDMI, DisplayPort"
        }
      },
      {
        id: "lg-34wp65c",
        name: "LG UltraWide 34WP65C",
        brand: "LG",
        category: "Monitors",
        price: 599.99,
        oldPrice: null,
        rating: 5,
        reviews: 145,
        tag: null,
        discount: 0,
        icon: "🖥️",
        bg: "linear-gradient(135deg,#252f4a,#303a58)",
        stock: 5,
        desc: "Immersive ultrawide monitor for productivity and gaming.",
        specs: {
          Panel: '34" VA',
          Resolution: "3440×1440",
          Refresh: "160Hz",
          Response: "1ms MBR",
          HDR: "HDR10",
          Ports: "HDMI, DP, USB-C"
        }
      },
      {
        id: "nvidia-4070ti",
        name: "NVIDIA GeForce RTX 4070 Ti",
        brand: "NVIDIA",
        category: "Computer Parts",
        price: 799.99,
        oldPrice: 849.99,
        rating: 5,
        reviews: 312,
        tag: "Popular",
        discount: 6,
        icon: "🎮",
        bg: "linear-gradient(135deg,#022e1f,#01331f)",
        stock: 4,
        desc: "Powerful GPU for high-FPS gaming and creator workflows.",
        specs: {
          VRAM: "12GB GDDR6X",
          Boost: "2.61GHz",
          TDP: "285W",
          RayTracing: "3rd Gen",
          DLSS: "DLSS 3",
          PCIe: "Gen 4"
        }
      },
      {
        id: "samsung-990-pro",
        name: "Samsung 990 Pro 2TB SSD",
        brand: "Samsung",
        category: "Computer Parts",
        price: 189.99,
        oldPrice: 249.99,
        rating: 5,
        reviews: 421,
        tag: "Deal",
        discount: 24,
        icon: "💾",
        bg: "linear-gradient(135deg,#132b49,#242d4a)",
        stock: 12,
        desc: "Top-tier NVMe SSD for blazing fast performance.",
        specs: {
          Interface: "PCIe 4.0",
          Read: "7450MB/s",
          Write: "6900MB/s",
          Capacity: "2TB",
          NAND: "V-NAND",
          Warranty: "5 years"
        }
      },
      {
        id: "razer-blackwidow-v4",
        name: "Razer BlackWidow V4 Pro",
        brand: "Razer",
        category: "Keyboards",
        price: 229.99,
        oldPrice: 279.99,
        rating: 5,
        reviews: 98,
        tag: "Popular",
        discount: 18,
        icon: "⌨️",
        bg: "linear-gradient(135deg,#032c1a,#012516)",
        stock: 14,
        desc: "Flagship mechanical keyboard for performance and customization.",
        specs: {
          Switch: "Razer Green/Yellow",
          Layout: "Full-size",
          Lighting: "RGB",
          Connection: "USB-C",
          Macro: "Dedicated keys",
          WristRest: "Magnetic"
        }
      },
      {
        id: "logitech-g502x",
        name: "Logitech G502 X Plus",
        brand: "Logitech",
        category: "Mice",
        price: 159.99,
        oldPrice: 189.99,
        rating: 5,
        reviews: 178,
        tag: "Deal",
        discount: 16,
        icon: "🖱️",
        bg: "linear-gradient(135deg,#292d52,#20274b)",
        stock: 9,
        desc: "High-precision wireless gaming mouse with customizable controls.",
        specs: {
          Sensor: "HERO 25K",
          Weight: "106g",
          Wireless: "LIGHTSPEED",
          Battery: "120h",
          Buttons: "13",
          Switches: "Hybrid Optical"
        }
      },
      {
        id: "razer-deathadder-v3",
        name: "Razer DeathAdder V3 HyperSpeed",
        brand: "Razer",
        category: "Mice",
        price: 89.99,
        oldPrice: null,
        rating: 5,
        reviews: 234,
        tag: "Popular",
        discount: 0,
        icon: "🖱️",
        bg: "linear-gradient(135deg,#022e1f,#01331f)",
        stock: 11,
        desc: "Ergonomic esports mouse built for speed and precision.",
        specs: {
          Sensor: "Focus Pro 30K",
          Weight: "55g",
          Wireless: "2.4GHz",
          Battery: "100h",
          Polling: "1000Hz",
          Switches: "Optical Gen-3"
        }
      },
      {
        id: "sony-wh1000xm5",
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Headphones",
        price: 349.99,
        oldPrice: 399.99,
        rating: 5,
        reviews: 256,
        tag: null,
        discount: 13,
        icon: "🎧",
        bg: "linear-gradient(135deg,#16243e,#202d47)",
        stock: 13,
        desc: "Industry-leading noise cancellation headphones.",
        specs: {
          Type: "Over-ear",
          ANC: "Yes",
          Battery: "30h",
          Codec: "LDAC",
          Mic: "Beamforming",
          Weight: "250g"
        }
      },
      {
        id: "corsair-rm850x",
        name: "Corsair RM850x PSU",
        brand: "Corsair",
        category: "Computer Parts",
        price: 149.99,
        oldPrice: null,
        rating: 4,
        reviews: 74,
        tag: null,
        discount: 0,
        icon: "🔧",
        bg: "linear-gradient(135deg,#101b35,#162444)",
        stock: 0,
        desc: "Reliable 850W fully modular power supply.",
        specs: {
          Wattage: "850W",
          Efficiency: "80+ Gold",
          Modular: "Fully",
          Fan: "135mm",
          ATX: "3.0 ready",
          Warranty: "10 years"
        }
      }
    ];
  }

  mount() {
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = this.render();
    this.bindEvents();
  }

  render() {
    return `
      <div class="tn-shell">
        ${this.renderNav()}
        ${this.renderPage()}
        ${this.renderFooter()}
      </div>
    `;
  }

  renderNav() {
    const cartCount = this.cart.reduce((a, b) => a + b.qty, 0);
    const homeActive = this.route === "home" ? "active" : "";
    const shopActive = this.route === "shop" && !this.filters.dealsOnly ? "active" : "";
    const dealsActive = this.route === "shop" && this.filters.dealsOnly ? "active" : "";

    return `
      <header class="tn-nav">
        <div class="tn-nav-inner">
          <button class="logo-btn" data-nav="home">⚡ <span>TechNest</span></button>
          <div class="search-wrap">
            <input id="globalSearch" value="${this.escape(this.searchInput)}" placeholder="Search products, brands..." />
          </div>
          <nav class="menu">
            <button class="nav-link ${homeActive}" data-nav="home">Home</button>
            <button class="nav-link ${shopActive}" data-nav-shop-all="1">Shop All</button>
            <button class="nav-link ${dealsActive}" data-nav-deals="1">🔥 Deals</button>
            <button class="cart-btn" data-nav="cart">🛒 Cart ${cartCount ? `<span class="badge">${cartCount}</span>` : ""}</button>
          </nav>
        </div>
      </header>
    `;
  }

  renderPage() {
    if (this.route === "home") return this.renderHome();
    if (this.route === "shop") return this.renderShop();
    if (this.route === "product") return this.renderProduct();
    return this.renderCart();
  }

  renderHome() {
    const deals = this.products.filter((p) => (p.discount ?? 0) > 0 || p.tag === "Deal").slice(0, 4);
    const popular = this.products.filter((p) => p.tag === "Popular").slice(0, 4);
    const categories = ["Laptops", "Monitors", "Computer Parts", "Keyboards", "Mice", "Headphones", "Gaming Accessories"];

    return `
      <main class="page page-home">
        <section class="hero">
          <div>
            <p class="deal-pill">🔥 Limited Time Deals — Save Up to 30% This Week!</p>
            <h1>Top Tech.<br/><span>Best Prices.</span></h1>
            <p class="hero-sub">Your one-stop shop for laptops, GPUs, monitors, keyboards, and more. Free shipping on orders over $100.</p>
            <div class="hero-actions">
              <button class="primary-btn" data-go-shop="1">Shop Now →</button>
              <button class="secondary-btn" data-go-deals="1">View Deals 🔥</button>
            </div>
          </div>
          <div class="hero-icons">
            <div>💻</div><div>🖥️</div><div>⌨️</div><div>🎧</div>
          </div>
        </section>

        <div class="shipping-strip">🚚 Free Shipping on Orders Over $100 | 📦 30-Day Returns | ⭐ 2-Year Warranty</div>

        <section class="section">
          <h2>Browse by Category</h2>
          <div class="category-row">
            ${categories.map((c) => `<button class="cat-card" data-cat="${c}">${this.catEmoji(c)}<span>${c}</span></button>`).join("")}
          </div>
        </section>

        <section class="section">
          <div class="section-head"><h2>🔥 Today's Deals</h2><button class="link-btn" data-go-deals="1">See all deals</button></div>
          <div class="product-grid four">${deals.map((p) => this.card(p)).join("")}</div>
        </section>

        <section class="section">
          <div class="section-head"><h2>Most Popular</h2><button class="link-btn" data-go-shop="1">View all</button></div>
          <div class="product-grid four">${popular.map((p) => this.card(p)).join("")}</div>
        </section>
      </main>
    `;
  }

  renderShop() {
    const filtered = this.filteredProducts();
    const categories = ["Laptops", "Monitors", "Computer Parts", "Keyboards", "Mice", "Headphones", "Gaming Accessories"];
    const brands = [...new Set(this.products.map((p) => p.brand))].sort();

    const activeCount =
      this.filters.categories.size +
      this.filters.brands.size +
      (this.filters.minRating ? 1 : 0) +
      (this.filters.dealsOnly ? 1 : 0);

    return `
      <main class="page page-shop">
        <section class="shop-layout">
          <aside class="sidebar">
            <h2>All Products</h2>
            <p>${filtered.length} products found</p>
            ${activeCount ? `<button class="clear-filters" id="clearFilters">↺ Clear all filters</button>` : ""}

            <div class="filter-group">
              <h4>CATEGORY</h4>
              ${categories.map((c) => `
                <label><input type="checkbox" data-filter-cat="${c}" ${this.filters.categories.has(c) ? "checked" : ""}/> ${c}</label>
              `).join("")}
            </div>

            <div class="filter-group">
              <h4>BRAND</h4>
              ${brands.map((b) => `
                <label><input type="checkbox" data-filter-brand="${b}" ${this.filters.brands.has(b) ? "checked" : ""}/> ${b}</label>
              `).join("")}
            </div>

            <div class="filter-group">
              <h4>MAX PRICE</h4>
              <input id="priceRange" type="range" min="0" max="2500" step="50" value="${this.filters.maxPrice}" />
              <div class="range-labels"><span>$0</span><span>$${this.filters.maxPrice.toFixed(2)}</span></div>
            </div>

            <div class="filter-group">
              <h4>MIN RATING</h4>
              <label><input type="radio" name="minRating" value="4" ${this.filters.minRating === 4 ? "checked" : ""}/> ⭐⭐⭐⭐ & up</label>
              <label><input type="radio" name="minRating" value="3" ${this.filters.minRating === 3 ? "checked" : ""}/> ⭐⭐⭐ & up</label>
              <label><input type="radio" name="minRating" value="0" ${this.filters.minRating === 0 ? "checked" : ""}/> All ratings</label>
            </div>
          </aside>

          <section class="shop-main">
            <div class="shop-top">
              <button class="filter-pill">⚙ Filters ${activeCount ? `<span>${activeCount}</span>` : ""}</button>
              <select id="sortSelect">
                <option value="featured" ${this.sortBy === "featured" ? "selected" : ""}>Featured</option>
                <option value="price-low" ${this.sortBy === "price-low" ? "selected" : ""}>Price: Low to High</option>
                <option value="price-high" ${this.sortBy === "price-high" ? "selected" : ""}>Price: High to Low</option>
                <option value="rating" ${this.sortBy === "rating" ? "selected" : ""}>Top Rated</option>
                <option value="reviews" ${this.sortBy === "reviews" ? "selected" : ""}>Most Reviewed</option>
              </select>
            </div>
            <div class="product-grid three">${filtered.map((p) => this.card(p)).join("")}</div>
          </section>
        </section>
      </main>
    `;
  }

  renderProduct() {
    const p = this.products.find((x) => x.id === this.selectedProductId) || this.products[0];

    return `
      <main class="page page-product">
        <section class="product-layout">
          <div>
            <button class="link-btn" data-nav="shop">← Back to products</button>
            <div class="product-image" style="background:${p.bg}">${p.icon}</div>
          </div>
          <div>
            <div class="breadcrumbs">${p.brand} · ${p.category} ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}</div>
            <h1>${p.name}</h1>
            <div class="rating-line">${"⭐".repeat(p.rating)} <span>(${p.reviews})</span></div>
            <div class="price-line">
              <strong>$${p.price.toFixed(2)}</strong>
              ${p.oldPrice ? `<s>$${p.oldPrice.toFixed(2)}</s>` : ""}
              ${p.discount ? `<span class="save-badge">Save ${p.discount}%</span>` : ""}
            </div>
            <p class="stock-ok">✓ In Stock — Ships within 2 business days</p>
            <p class="desc">${p.desc}</p>

            <div class="buy-row">
              <div class="qty-box">
                <button data-detail-qty="-1">−</button><strong>${this.detailQty}</strong><button data-detail-qty="1">+</button>
              </div>
              <button class="primary-btn wide" data-add-detail="${p.id}">🛒 Add to Cart</button>
            </div>

            <div class="specs">
              <h3>SPECIFICATIONS</h3>
              <div class="spec-grid">
                ${Object.entries(p.specs).map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join("")}
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  renderCart() {
    const items = this.cartItems();
    const subtotal = this.subtotal();
    const shipping = subtotal >= this.freeShippingThreshold || subtotal === 0 ? 0 : 12.99;
    const total = subtotal + shipping;

    const stepCls = (s) => (this.checkoutStep === s ? "active" : "");

    return `
      <main class="page page-cart">
        <h1 class="center-title">Checkout</h1>
        <div class="steps">
          <span class="${stepCls("cart")}">🛒 Cart</span>
          <span class="${stepCls("shipping")}">🚚 Shipping</span>
          <span class="${stepCls("payment")}">💳 Payment</span>
          <span class="${stepCls("confirmed")}">✔ Confirmed</span>
        </div>

        ${
          this.checkoutStep === "cart"
            ? `
          <div class="cart-layout">
            <section>
              ${
                items.length === 0
                  ? `<p class="empty">Your cart is empty.</p>`
                  : items
                      .map(
                        ({ product, qty }) => `
                <article class="cart-item">
                  <div class="cart-thumb" style="background:${product.bg}">${product.icon}</div>
                  <div class="cart-info"><h3>${product.name}</h3><small>${product.brand}</small><p>$${product.price.toFixed(2)}</p></div>
                  <div class="cart-actions">
                    <div class="qty-box"><button data-cart-qty="${product.id}|-1">−</button><strong>${qty}</strong><button data-cart-qty="${product.id}|1">+</button></div>
                    <button class="trash-btn" data-remove="${product.id}">🗑️</button>
                  </div>
                </article>
              `
                      )
                      .join("")
              }
            </section>

            <aside class="summary">
              <h3>Order Summary</h3>
              ${items.map(({ product, qty }) => `<div class="summary-row"><span>${product.name}</span><span>$${(product.price * qty).toFixed(2)}</span></div>`).join("")}
              <hr />
              <div class="summary-row"><span>Subtotal</span><strong>$${subtotal.toFixed(2)}</strong></div>
              <div class="summary-row"><span>Shipping</span><strong>${shipping ? `$${shipping.toFixed(2)}` : "FREE"}</strong></div>
              <div class="summary-row total"><span>Total</span><strong>$${total.toFixed(2)}</strong></div>
              ${subtotal >= this.freeShippingThreshold ? `<p class="green">✓ You qualify for free shipping!</p>` : ""}
              <button class="primary-btn wide" id="goShipping" ${items.length ? "" : "disabled"}>Proceed to Shipping →</button>
            </aside>
          </div>
        `
            : `
          <div class="cart-layout">
            <section>
              <h2>Shipping Information</h2>
              <div class="filter-group shipping-form" style="border-top:none;padding-top:0">
                <label>Full Name *</label>
                <input id="shipFullName" type="text" value="${this.escape(this.shippingInfo.fullName)}" placeholder="Jane Smith" />

                <label>Email Address *</label>
                <input id="shipEmail" type="email" value="${this.escape(this.shippingInfo.email)}" placeholder="jane@example.com" />

                <label>Street Address *</label>
                <input id="shipAddress" type="text" value="${this.escape(this.shippingInfo.address)}" placeholder="123 Main Street" />

                <div class="ship-grid">
                  <div>
                    <label>City *</label>
                    <input id="shipCity" type="text" value="${this.escape(this.shippingInfo.city)}" placeholder="Ottawa" />
                  </div>
                  <div>
                    <label>Province *</label>
                    <input id="shipProvince" type="text" value="${this.escape(this.shippingInfo.province)}" placeholder="Ontario" />
                  </div>
                </div>

                <label>Postal Code *</label>
                <input id="shipPostal" type="text" value="${this.escape(this.shippingInfo.postalCode)}" placeholder="K1A 0A1" />
              </div>
              <div class="buy-row">
                <button class="secondary-btn" id="backToCart">← Back</button>
                <button class="primary-btn wide" id="toPayment">Continue to Payment →</button>
              </div>
            </section>

            <aside class="summary">
              <h3>Order Summary</h3>
              ${items.map(({ product, qty }) => `<div class="summary-row"><span>${product.name}</span><span>$${(product.price * qty).toFixed(2)}</span></div>`).join("")}
              <hr />
              <div class="summary-row"><span>Subtotal</span><strong>$${subtotal.toFixed(2)}</strong></div>
              <div class="summary-row"><span>Shipping</span><strong>${shipping ? `$${shipping.toFixed(2)}` : "FREE"}</strong></div>
              <div class="summary-row total"><span>Total</span><strong>$${total.toFixed(2)}</strong></div>
              ${subtotal >= this.freeShippingThreshold ? `<p class="green">✓ You qualify for free shipping!</p>` : ""}
            </aside>
          </div>
        `
        }
      </main>
    `;
  }

  renderFooter() {
    return `
      <footer class="tn-footer">
        <div class="foot-grid">
          <div><h4>⚡ TechNest</h4><p>Your one-stop shop for the latest electronics and tech accessories.</p></div>
          <div><h5>Shop</h5><p>Laptops</p><p>Monitors</p><p>Computer Parts</p><p>Keyboards</p></div>
          <div><h5>Support</h5><p>Help Centre</p><p>Returns & Refunds</p><p>Order Tracking</p><p>Contact Us</p></div>
          <div><h5>Policies</h5><p>Privacy Policy</p><p>Terms of Service</p><p>Warranty Info</p><p>Accessibility</p></div>
        </div>
        <div class="copy">© 2025 TechNest Electronics. All rights reserved. | Made with ♥ in Canada</div>
      </footer>
    `;
  }

  card(p) {
    const out = p.stock <= 0;
    return `
      <article class="product-card" data-open-product="${p.id}">
        <div class="thumb" style="background:${p.bg}">
          ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
          <span class="icon">${p.icon}</span>
          ${out ? `<span class="stock-badge">Out of Stock</span>` : ""}
        </div>
        <div class="card-body">
          <small>${p.brand}</small>
          <h3>${p.name}</h3>
          <div class="rating">${"⭐".repeat(p.rating)} <span>(${p.reviews})</span></div>
          <div class="price">
            <strong>$${p.price.toFixed(2)}</strong>
            ${p.oldPrice ? `<s>$${p.oldPrice.toFixed(2)}</s>` : ""}
            ${p.discount ? `<em>-${p.discount}%</em>` : ""}
          </div>
          <button class="add-btn" data-add="${p.id}" ${out ? "disabled" : ""}>🛒 Add to Cart</button>
        </div>
      </article>
    `;
  }

  goDeals() {
    this.filters.dealsOnly = true;
    this.route = "shop";
    this.mount();
  }

  bindEvents() {
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.route = btn.dataset.nav;
        if (this.route !== "cart") this.checkoutStep = "cart";
        this.mount();
      });
    });

    document.querySelectorAll("[data-nav-shop-all]").forEach((btn) =>
      btn.addEventListener("click", () => {
        this.filters.dealsOnly = false;
        this.route = "shop";
        this.mount();
      })
    );

    document.querySelectorAll("[data-nav-deals], [data-go-deals]").forEach((btn) =>
      btn.addEventListener("click", () => this.goDeals())
    );

    document.getElementById("globalSearch")?.addEventListener("input", (e) => {
      this.searchInput = e.target.value || "";
      this.route = "shop";

      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(() => {
        this.search = this.searchInput;
        this.mount();
      }, 180);

      // do not remount immediately -> prevents typing lag/focus jumps
    });

    document.querySelectorAll("[data-go-shop]").forEach((btn) =>
      btn.addEventListener("click", () => {
        this.filters.dealsOnly = false;
        this.route = "shop";
        this.mount();
      })
    );

    document.querySelectorAll("[data-cat]").forEach((btn) =>
      btn.addEventListener("click", () => {
        this.route = "shop";
        this.filters.categories = new Set([btn.dataset.cat]);
        this.mount();
      })
    );

    document.querySelectorAll("[data-open-product]").forEach((card) =>
      card.addEventListener("click", (e) => {
        if (e.target.closest("[data-add]")) return;
        this.selectedProductId = card.dataset.openProduct;
        this.detailQty = 1;
        this.route = "product";
        this.mount();
      })
    );

    document.querySelectorAll("[data-add]").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.addToCart(btn.dataset.add, 1);
      })
    );

    document.querySelectorAll("[data-add-detail]").forEach((btn) =>
      btn.addEventListener("click", () => this.addToCart(btn.dataset.addDetail, this.detailQty))
    );

    document.querySelectorAll("[data-detail-qty]").forEach((btn) =>
      btn.addEventListener("click", () => {
        this.detailQty = Math.max(1, this.detailQty + Number(btn.dataset.detailQty));
        this.mount();
      })
    );

    document.querySelectorAll("[data-filter-cat]").forEach((input) =>
      input.addEventListener("change", () => {
        const c = input.dataset.filterCat;
        input.checked ? this.filters.categories.add(c) : this.filters.categories.delete(c);
        this.mount();
      })
    );

    document.querySelectorAll("[data-filter-brand]").forEach((input) =>
      input.addEventListener("change", () => {
        const b = input.dataset.filterBrand;
        input.checked ? this.filters.brands.add(b) : this.filters.brands.delete(b);
        this.mount();
      })
    );

    document.getElementById("priceRange")?.addEventListener("input", (e) => {
      this.filters.maxPrice = Number(e.target.value);
      this.mount();
    });

    document.querySelectorAll("input[name='minRating']").forEach((r) =>
      r.addEventListener("change", () => {
        this.filters.minRating = Number(r.value);
        this.mount();
      })
    );

    document.getElementById("sortSelect")?.addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.mount();
    });

    document.getElementById("clearFilters")?.addEventListener("click", () => {
      this.filters = { categories: new Set(), brands: new Set(), maxPrice: 2500, minRating: 0, dealsOnly: false };
      this.mount();
    });

    document.querySelectorAll("[data-cart-qty]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const [id, d] = btn.dataset.cartQty.split("|");
        this.changeQty(id, Number(d));
      })
    );

    document.querySelectorAll("[data-remove]").forEach((btn) =>
      btn.addEventListener("click", () => this.removeFromCart(btn.dataset.remove))
    );

    document.getElementById("goShipping")?.addEventListener("click", () => {
      if (!this.cart.length) return;
      this.checkoutStep = "shipping";
      this.mount();
    });

    document.getElementById("backToCart")?.addEventListener("click", () => {
      this.checkoutStep = "cart";
      this.mount();
    });

    document.getElementById("toPayment")?.addEventListener("click", () => {
      this.checkoutStep = "payment";
      this.mount();
    });

    const bindShipInput = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", (e) => {
        this.shippingInfo[key] = e.target.value;
      });
    };
    bindShipInput("shipFullName", "fullName");
    bindShipInput("shipEmail", "email");
    bindShipInput("shipAddress", "address");
    bindShipInput("shipCity", "city");
    bindShipInput("shipProvince", "province");
    bindShipInput("shipPostal", "postalCode");
  }

  filteredProducts() {
    let list = [...this.products];
    const q = this.search.trim().toLowerCase();

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (this.filters.categories.size) list = list.filter((p) => this.filters.categories.has(p.category));
    if (this.filters.brands.size) list = list.filter((p) => this.filters.brands.has(p.brand));
    list = list.filter((p) => p.price <= this.filters.maxPrice);
    list = list.filter((p) => p.rating >= this.filters.minRating);

    if (this.filters.dealsOnly) {
      list = list.filter((p) => (p.discount ?? 0) > 0 || p.tag === "Deal");
    }

    if (this.sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    if (this.sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    if (this.sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (this.sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    if (this.sortBy === "featured") list.sort((a, b) => (b.tag === "Deal") - (a.tag === "Deal"));

    return list;
  }

  addToCart(id, qty) {
    const found = this.cart.find((x) => x.productId === id);
    if (found) found.qty += qty;
    else this.cart.push({ productId: id, qty });
    this.checkoutStep = "cart";
    this.route = "cart";
    this.mount();
  }

  changeQty(id, delta) {
    const item = this.cart.find((x) => x.productId === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.cart = this.cart.filter((x) => x.productId !== id);
    this.mount();
  }

  removeFromCart(id) {
    this.cart = this.cart.filter((x) => x.productId !== id);
    this.mount();
  }

  cartItems() {
    return this.cart
      .map((c) => ({ product: this.products.find((p) => p.id === c.productId), qty: c.qty }))
      .filter((x) => x.product);
  }

  subtotal() {
    return this.cartItems().reduce((sum, x) => sum + x.product.price * x.qty, 0);
  }

  catEmoji(c) {
    const m = {
      Laptops: "💻",
      Monitors: "🖥️",
      "Computer Parts": "⚙️",
      Keyboards: "⌨️",
      Mice: "🖱️",
      Headphones: "🎧",
      "Gaming Accessories": "🎮"
    };
    return m[c] || "🧩";
  }

  escape(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new TechNestDesign3();
});
