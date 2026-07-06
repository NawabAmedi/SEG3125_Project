import React, { useMemo, useState } from "react";
import "./Design3.css";

const PRODUCTS = [
  { id:"asus-rog-g16", name:"ASUS ROG Zephyrus G16", brand:"ASUS", category:"Laptops", price:2199.99, oldPrice:2499.99, rating:5, reviews:124, tag:"Deal", discount:12, icon:"💻", bg:"linear-gradient(135deg,#1a3858,#1f3f62)", stock:7, desc:"The ultimate gaming laptop. RTX 4090 GPU, 240Hz OLED display, and all-day battery — built for players who demand the best.", specs:{ CPU:"Intel Core i9-14900HX", GPU:"NVIDIA RTX 4090 16GB", RAM:"32GB DDR5", Storage:"2TB NVMe SSD", Display:'16" OLED 240Hz', Battery:"90Wh" } },
  { id:"dell-xps-15", name:"Dell XPS 15 (2024)", brand:"Dell", category:"Laptops", price:1899.99, oldPrice:null, rating:5, reviews:89, tag:"Popular", discount:0, icon:"💻", bg:"linear-gradient(135deg,#272d50,#2d345b)", stock:6, desc:"Premium ultrabook with stunning display and excellent battery life.", specs:{ CPU:"Intel Core Ultra 7", GPU:"NVIDIA RTX 4060", RAM:"16GB DDR5", Storage:"1TB NVMe SSD", Display:'15.6" OLED 120Hz', Battery:"86Wh" } },
  { id:"lenovo-x1-carbon", name:"Lenovo ThinkPad X1 Carbon", brand:"Lenovo", category:"Laptops", price:1699.99, oldPrice:null, rating:5, reviews:203, tag:null, discount:0, icon:"💻", bg:"linear-gradient(135deg,#111c37,#1e2a49)", stock:8, desc:"Business-class ultralight laptop with legendary keyboard and reliability.", specs:{ CPU:"Intel Core Ultra 7", GPU:"Intel Arc iGPU", RAM:"16GB LPDDR5X", Storage:"1TB NVMe SSD", Display:'14" 2.8K OLED', Battery:"57Wh" } },
  { id:"asus-pg279qm", name:"ASUS ROG Swift PG279QM", brand:"ASUS", category:"Monitors", price:849.99, oldPrice:1099.99, rating:5, reviews:67, tag:"Deal", discount:23, icon:"🖥️", bg:"linear-gradient(135deg,#143253,#16375a)", stock:10, desc:"High-refresh QHD gaming monitor with ultra-low latency.", specs:{ Panel:'27" IPS', Resolution:"2560×1440", Refresh:"240Hz", Response:"1ms", HDR:"DisplayHDR 400", Ports:"HDMI, DisplayPort" } },
  { id:"lg-34wp65c", name:"LG UltraWide 34WP65C", brand:"LG", category:"Monitors", price:599.99, oldPrice:null, rating:5, reviews:145, tag:null, discount:0, icon:"🖥️", bg:"linear-gradient(135deg,#252f4a,#303a58)", stock:5, desc:"Immersive ultrawide monitor for productivity and gaming.", specs:{ Panel:'34" VA', Resolution:"3440×1440", Refresh:"160Hz", Response:"1ms MBR", HDR:"HDR10", Ports:"HDMI, DP, USB-C" } },
  { id:"nvidia-4070ti", name:"NVIDIA GeForce RTX 4070 Ti", brand:"NVIDIA", category:"Computer Parts", price:799.99, oldPrice:849.99, rating:5, reviews:312, tag:"Popular", discount:6, icon:"🎮", bg:"linear-gradient(135deg,#022e1f,#01331f)", stock:4, desc:"Powerful GPU for high-FPS gaming and creator workflows.", specs:{ VRAM:"12GB GDDR6X", Boost:"2.61GHz", TDP:"285W", RayTracing:"3rd Gen", DLSS:"DLSS 3", PCIe:"Gen 4" } },
  { id:"samsung-990-pro", name:"Samsung 990 Pro 2TB SSD", brand:"Samsung", category:"Computer Parts", price:189.99, oldPrice:249.99, rating:5, reviews:421, tag:"Deal", discount:24, icon:"💾", bg:"linear-gradient(135deg,#132b49,#242d4a)", stock:12, desc:"Top-tier NVMe SSD for blazing fast performance.", specs:{ Interface:"PCIe 4.0", Read:"7450MB/s", Write:"6900MB/s", Capacity:"2TB", NAND:"V-NAND", Warranty:"5 years" } },
  { id:"razer-blackwidow-v4", name:"Razer BlackWidow V4 Pro", brand:"Razer", category:"Keyboards", price:229.99, oldPrice:279.99, rating:5, reviews:98, tag:"Popular", discount:18, icon:"⌨️", bg:"linear-gradient(135deg,#032c1a,#012516)", stock:14, desc:"Flagship mechanical keyboard for performance and customization.", specs:{ Switch:"Razer Green/Yellow", Layout:"Full-size", Lighting:"RGB", Connection:"USB-C", Macro:"Dedicated keys", WristRest:"Magnetic" } },
  { id:"logitech-g502x", name:"Logitech G502 X Plus", brand:"Logitech", category:"Mice", price:159.99, oldPrice:189.99, rating:5, reviews:178, tag:"Deal", discount:16, icon:"🖱️", bg:"linear-gradient(135deg,#292d52,#20274b)", stock:9, desc:"High-precision wireless gaming mouse with customizable controls.", specs:{ Sensor:"HERO 25K", Weight:"106g", Wireless:"LIGHTSPEED", Battery:"120h", Buttons:"13", Switches:"Hybrid Optical" } },
  { id:"razer-deathadder-v3", name:"Razer DeathAdder V3 HyperSpeed", brand:"Razer", category:"Mice", price:89.99, oldPrice:null, rating:5, reviews:234, tag:"Popular", discount:0, icon:"🖱️", bg:"linear-gradient(135deg,#022e1f,#01331f)", stock:11, desc:"Ergonomic esports mouse built for speed and precision.", specs:{ Sensor:"Focus Pro 30K", Weight:"55g", Wireless:"2.4GHz", Battery:"100h", Polling:"1000Hz", Switches:"Optical Gen-3" } },
  { id:"sony-wh1000xm5", name:"Sony WH-1000XM5", brand:"Sony", category:"Headphones", price:349.99, oldPrice:399.99, rating:5, reviews:256, tag:null, discount:13, icon:"🎧", bg:"linear-gradient(135deg,#16243e,#202d47)", stock:13, desc:"Industry-leading noise cancellation headphones.", specs:{ Type:"Over-ear", ANC:"Yes", Battery:"30h", Codec:"LDAC", Mic:"Beamforming", Weight:"250g" } },
  { id:"corsair-rm850x", name:"Corsair RM850x PSU", brand:"Corsair", category:"Computer Parts", price:149.99, oldPrice:null, rating:4, reviews:74, tag:null, discount:0, icon:"🔧", bg:"linear-gradient(135deg,#101b35,#162444)", stock:0, desc:"Reliable 850W fully modular power supply.", specs:{ Wattage:"850W", Efficiency:"80+ Gold", Modular:"Fully", Fan:"135mm", ATX:"3.0 ready", Warranty:"10 years" } },
];

const CATEGORIES = ["Laptops", "Monitors", "Computer Parts", "Keyboards", "Mice", "Headphones", "Gaming Accessories"];

const catEmoji = (c) => ({
  Laptops:"💻", Monitors:"🖥️", "Computer Parts":"⚙️", Keyboards:"⌨️", Mice:"🖱️", Headphones:"🎧", "Gaming Accessories":"🎮"
}[c] || "🧩");

export default function Design3() {
  const [route, setRoute] = useState("home");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [cart, setCart] = useState([{ productId: "asus-pg279qm", qty: 3 }]);
  const [filters, setFilters] = useState({ categories: new Set(), brands: new Set(), maxPrice: 2500, minRating: 0 });

  const [shippingForm, setShippingForm] = useState({ fullName: "", email: "", address: "", city: "", province: "", postalCode: "" });
  const [shippingErrors, setShippingErrors] = useState({});
  const [paymentForm, setPaymentForm] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  const brands = useMemo(() => [...new Set(PRODUCTS.map(p => p.brand))].sort(), []);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    const q = search.trim().toLowerCase();
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    if (filters.categories.size) list = list.filter(p => filters.categories.has(p.category));
    if (filters.brands.size) list = list.filter(p => filters.brands.has(p.brand));
    list = list.filter(p => p.price <= filters.maxPrice && p.rating >= filters.minRating);

    if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [search, filters, sortBy]);

  const cartItems = useMemo(
    () => cart.map(c => ({ product: PRODUCTS.find(p => p.id === c.productId), qty: c.qty })).filter(x => x.product),
    [cart]
  );

  const subtotal = cartItems.reduce((sum, x) => sum + x.product.price * x.qty, 0);
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 12.99;
  const total = subtotal + shipping;

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  function addToCart(productId, qty = 1) {
    setCart(prev => {
      const hit = prev.find(x => x.productId === productId);
      if (hit) return prev.map(x => (x.productId === productId ? { ...x, qty: x.qty + qty } : x));
      return [...prev, { productId, qty }];
    });
    setRoute("cart");
  }

  function changeQty(productId, delta) {
    setCart(prev =>
      prev
        .map(x => (x.productId === productId ? { ...x, qty: x.qty + delta } : x))
        .filter(x => x.qty > 0)
    );
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(x => x.productId !== productId));
  }

  function goToShipping() {
    if (!cartItems.length) return;
    setRoute("shipping");
  }

  function validateShipping() {
    const e = {};
    if (!shippingForm.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(shippingForm.email.trim())) e.email = "Valid email is required";
    if (!shippingForm.address.trim()) e.address = "Address is required";
    if (!shippingForm.city.trim()) e.city = "City is required";
    if (!shippingForm.province.trim()) e.province = "Province is required";
    if (!shippingForm.postalCode.trim()) e.postalCode = "Postal code is required";
    setShippingErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment() {
    const e = {};
    const card = paymentForm.cardNumber.replace(/\s/g, "");
    if (!paymentForm.cardName.trim()) e.cardName = "Cardholder name is required";
    if (!/^\d{16}$/.test(card)) e.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.expiry.trim())) e.expiry = "Use MM/YY format";
    if (!/^\d{3,4}$/.test(paymentForm.cvv.trim())) e.cvv = "CVV must be 3 or 4 digits";
    setPaymentErrors(e);
    return Object.keys(e).length === 0;
  }

  const card = (p) => (
    <article key={p.id} className="product-card" onClick={() => { setSelectedProductId(p.id); setDetailQty(1); setRoute("product"); }}>
      <div className="thumb" style={{ background: p.bg }}>
        {p.tag ? <span className="tag">{p.tag}</span> : null}
        <span className="icon">{p.icon}</span>
        {p.stock <= 0 ? <span className="stock-badge">Out of Stock</span> : null}
      </div>
      <div className="card-body">
        <small>{p.brand}</small>
        <h3>{p.name}</h3>
        <div className="rating">{"⭐".repeat(p.rating)} <span>({p.reviews})</span></div>
        <div className="price">
          <strong>${p.price.toFixed(2)}</strong>
          {p.oldPrice ? <s>${p.oldPrice.toFixed(2)}</s> : null}
          {p.discount ? <em>-{p.discount}%</em> : null}
        </div>
        <button className="add-btn" disabled={p.stock <= 0} onClick={(e) => { e.stopPropagation(); addToCart(p.id, 1); }}>
          🛒 Add to Cart
        </button>
      </div>
    </article>
  );

  return (
    <div className="tn-shell">
      <header className="tn-nav">
        <div className="tn-nav-inner">
          <button className="logo-btn" onClick={() => setRoute("home")}>⚡ <span>TechNest</span></button>
          <div className="search-wrap">
            <input value={search} onChange={(e) => { setSearch(e.target.value); setRoute("shop"); }} placeholder="Search products, brands..." />
          </div>
          <nav className="menu">
            <button className={`nav-link ${route === "home" ? "active" : ""}`} onClick={() => setRoute("home")}>Home</button>
            <button className={`nav-link ${route === "shop" ? "active" : ""}`} onClick={() => setRoute("shop")}>Shop All</button>
            <button className={`nav-link ${route === "shop" ? "active" : ""}`} onClick={() => setRoute("shop")}>🔥 Deals</button>
            <button className="cart-btn" onClick={() => setRoute("cart")}>🛒 Cart {cartCount ? <span className="badge">{cartCount}</span> : null}</button>
          </nav>
        </div>
      </header>

      {route === "home" && (
        <main className="page page-home">
          <section className="hero">
            <div>
              <p className="deal-pill">🔥 Limited Time Deals — Save Up to 30% This Week!</p>
              <h1>Top Tech.<br /><span>Best Prices.</span></h1>
              <p className="hero-sub">Your one-stop shop for laptops, GPUs, monitors, keyboards, and more. Free shipping on orders over $100.</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setRoute("shop")}>Shop Now →</button>
                <button className="secondary-btn" onClick={() => setRoute("shop")}>View Deals 🔥</button>
              </div>
            </div>
            <div className="hero-icons"><div>💻</div><div>🖥️</div><div>⌨️</div><div>🎧</div></div>
          </section>

          <div className="shipping-strip">🚚 Free Shipping on Orders Over $100 | 📦 30-Day Returns | ⭐ 2-Year Warranty</div>

          <section className="section">
            <h2>Browse by Category</h2>
            <div className="category-row">
              {CATEGORIES.map(c => (
                <button key={c} className="cat-card" onClick={() => { setFilters(f => ({ ...f, categories: new Set([c]) })); setRoute("shop"); }}>
                  {catEmoji(c)}<span>{c}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-head"><h2>🔥 Today's Deals</h2><button className="link-btn" onClick={() => setRoute("shop")}>See all deals</button></div>
            <div className="product-grid four">{PRODUCTS.filter(p => p.tag === "Deal").slice(0, 4).map(card)}</div>
          </section>

          <section className="section">
            <div className="section-head"><h2>Most Popular</h2><button className="link-btn" onClick={() => setRoute("shop")}>View all</button></div>
            <div className="product-grid four">{PRODUCTS.filter(p => p.tag === "Popular").slice(0, 4).map(card)}</div>
          </section>
        </main>
      )}

      {route === "shop" && (
        <main className="page page-shop">
          <section className="shop-layout">
            <aside className="sidebar">
              <h2>All Products</h2>
              <p>{filtered.length} products found</p>

              <div className="filter-group">
                <h4>CATEGORY</h4>
                {CATEGORIES.map(c => (
                  <label key={c}>
                    <input
                      type="checkbox"
                      checked={filters.categories.has(c)}
                      onChange={(e) =>
                        setFilters(f => {
                          const next = new Set(f.categories);
                          e.target.checked ? next.add(c) : next.delete(c);
                          return { ...f, categories: next };
                        })
                      }
                    /> {c}
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <h4>BRAND</h4>
                {brands.map(b => (
                  <label key={b}>
                    <input
                      type="checkbox"
                      checked={filters.brands.has(b)}
                      onChange={(e) =>
                        setFilters(f => {
                          const next = new Set(f.brands);
                          e.target.checked ? next.add(b) : next.delete(b);
                          return { ...f, brands: next };
                        })
                      }
                    /> {b}
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <h4>MAX PRICE</h4>
                <input type="range" min="0" max="2500" step="50" value={filters.maxPrice} onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))} />
                <div className="range-labels"><span>$0</span><span>${filters.maxPrice.toFixed(2)}</span></div>
              </div>

              <div className="filter-group">
                <h4>MIN RATING</h4>
                <label><input type="radio" name="rating" checked={filters.minRating === 4} onChange={() => setFilters(f => ({ ...f, minRating: 4 }))} /> ⭐⭐⭐⭐ & up</label>
                <label><input type="radio" name="rating" checked={filters.minRating === 3} onChange={() => setFilters(f => ({ ...f, minRating: 3 }))} /> ⭐⭐⭐ & up</label>
                <label><input type="radio" name="rating" checked={filters.minRating === 0} onChange={() => setFilters(f => ({ ...f, minRating: 0 }))} /> All ratings</label>
              </div>
            </aside>

            <section className="shop-main">
              <div className="shop-top">
                <button className="filter-pill">⚙ Filters</button>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
              <div className="product-grid three">{filtered.map(card)}</div>
            </section>
          </section>
        </main>
      )}

      {route === "product" && (
        <main className="page page-product">
          <section className="product-layout">
            <div>
              <button className="link-btn" onClick={() => setRoute("shop")}>← Back to products</button>
              <div className="product-image" style={{ background: product.bg }}>{product.icon}</div>
            </div>
            <div>
              <div className="breadcrumbs">{product.brand} · {product.category} {product.tag ? <span className="tag">{product.tag}</span> : null}</div>
              <h1>{product.name}</h1>
              <div className="rating-line">{"⭐".repeat(product.rating)} <span>({product.reviews})</span></div>
              <div className="price-line">
                <strong>${product.price.toFixed(2)}</strong>
                {product.oldPrice ? <s>${product.oldPrice.toFixed(2)}</s> : null}
                {product.discount ? <span className="save-badge">Save {product.discount}%</span> : null}
              </div>
              <p className="stock-ok">✓ In Stock — Ships within 2 business days</p>
              <p className="desc">{product.desc}</p>

              <div className="buy-row">
                <div className="qty-box">
                  <button onClick={() => setDetailQty(q => Math.max(1, q - 1))}>−</button>
                  <strong>{detailQty}</strong>
                  <button onClick={() => setDetailQty(q => q + 1)}>+</button>
                </div>
                <button className="primary-btn wide" onClick={() => addToCart(product.id, detailQty)}>🛒 Add to Cart</button>
              </div>

              <div className="specs">
                <h3>SPECIFICATIONS</h3>
                <div className="spec-grid">
                  {Object.entries(product.specs).map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {route === "cart" && (
        <main className="page page-cart">
          <h1 className="center-title">Checkout</h1>
          <div className="steps">
            <span className="active">🛒 Cart</span><span>🚚 Shipping</span><span>💳 Payment</span><span>✔ Confirmed</span>
          </div>

          <div className="cart-layout">
            <section>
              {cartItems.length === 0 ? <p className="empty">Your cart is empty.</p> : cartItems.map(({ product, qty }) => (
                <article className="cart-item" key={product.id}>
                  <div className="cart-thumb" style={{ background: product.bg }}>{product.icon}</div>
                  <div className="cart-info"><h3>{product.name}</h3><small>{product.brand}</small><p>${product.price.toFixed(2)}</p></div>
                  <div className="cart-actions">
                    <div className="qty-box">
                      <button onClick={() => changeQty(product.id, -1)}>−</button>
                      <strong>{qty}</strong>
                      <button onClick={() => changeQty(product.id, 1)}>+</button>
                    </div>
                    <button className="trash-btn" onClick={() => removeFromCart(product.id)}>🗑️</button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="summary">
              <h3>Order Summary</h3>
              {cartItems.map(({ product, qty }) => <div key={product.id} className="summary-row"><span>{product.name}</span><span>${(product.price * qty).toFixed(2)}</span></div>)}
              <hr />
              <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="summary-row"><span>Shipping</span><strong>{shipping ? `$${shipping.toFixed(2)}` : "FREE"}</strong></div>
              <div className="summary-row total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
              {subtotal >= 100 ? <p className="green">✓ You qualify for free shipping!</p> : null}
              <button className="primary-btn wide" onClick={goToShipping} disabled={!cartItems.length}>Proceed to Shipping →</button>
            </aside>
          </div>
        </main>
      )}

      {route === "shipping" && (
        <main className="page page-checkout">
          <h1 className="center-title">Checkout</h1>
          <div className="steps">
            <span className="done">🛒 Cart</span><span className="active">🚚 Shipping</span><span>💳 Payment</span><span>✔ Confirmed</span>
          </div>

          <div className="checkout-layout">
            <section className="checkout-form">
              <h2>Shipping Information</h2>

              <div className={`field ${shippingErrors.fullName ? "has-error" : ""}`}>
                <label>Full Name *</label>
                <input value={shippingForm.fullName} onChange={(e) => setShippingForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Jane Smith" />
                {shippingErrors.fullName ? <small className="error-text">{shippingErrors.fullName}</small> : null}
              </div>

              <div className={`field ${shippingErrors.email ? "has-error" : ""}`}>
                <label>Email Address *</label>
                <input value={shippingForm.email} onChange={(e) => setShippingForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@example.com" />
                {shippingErrors.email ? <small className="error-text">{shippingErrors.email}</small> : null}
              </div>

              <div className={`field ${shippingErrors.address ? "has-error" : ""}`}>
                <label>Street Address *</label>
                <input value={shippingForm.address} onChange={(e) => setShippingForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Main Street" />
                {shippingErrors.address ? <small className="error-text">{shippingErrors.address}</small> : null}
              </div>

              <div className="form-row">
                <div className={`field ${shippingErrors.city ? "has-error" : ""}`}>
                  <label>City *</label>
                  <input value={shippingForm.city} onChange={(e) => setShippingForm(f => ({ ...f, city: e.target.value }))} placeholder="Ottawa" />
                  {shippingErrors.city ? <small className="error-text">{shippingErrors.city}</small> : null}
                </div>

                <div className={`field ${shippingErrors.province ? "has-error" : ""}`}>
                  <label>Province *</label>
                  <input value={shippingForm.province} onChange={(e) => setShippingForm(f => ({ ...f, province: e.target.value }))} placeholder="Ontario" />
                  {shippingErrors.province ? <small className="error-text">{shippingErrors.province}</small> : null}
                </div>
              </div>

              <div className={`field ${shippingErrors.postalCode ? "has-error" : ""}`}>
                <label>Postal Code *</label>
                <input value={shippingForm.postalCode} onChange={(e) => setShippingForm(f => ({ ...f, postalCode: e.target.value }))} placeholder="K1A 0A1" />
                {shippingErrors.postalCode ? <small className="error-text">{shippingErrors.postalCode}</small> : null}
              </div>

              <div className="checkout-actions">
                <button className="secondary-btn" onClick={() => setRoute("cart")}>← Back</button>
                <button className="primary-btn" onClick={() => {
                  if (validateShipping()) setRoute("payment");
                }}>Continue to Payment →</button>
              </div>
            </section>

            <aside className="summary">
              <h3>Order Summary</h3>
              {cartItems.map(({ product, qty }) => <div key={product.id} className="summary-row"><span>{product.name} × {qty}</span><span>${(product.price * qty).toFixed(2)}</span></div>)}
              <hr />
              <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="summary-row"><span>Shipping</span><strong>{shipping ? `$${shipping.toFixed(2)}` : "FREE"}</strong></div>
              <div className="summary-row total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
              {subtotal >= 100 ? <p className="green">✓ You qualify for free shipping!</p> : null}
            </aside>
          </div>
        </main>
      )}

      {route === "payment" && (
        <main className="page page-checkout">
          <h1 className="center-title">Checkout</h1>
          <div className="steps">
            <span className="done">🛒 Cart</span><span className="done">🚚 Shipping</span><span className="active">💳 Payment</span><span>✔ Confirmed</span>
          </div>

          <div className="checkout-layout">
            <section className="checkout-form">
              <h2>Payment Information</h2>

              <div className={`field ${paymentErrors.cardName ? "has-error" : ""}`}>
                <label>Cardholder Name *</label>
                <input value={paymentForm.cardName} onChange={(e) => setPaymentForm(f => ({ ...f, cardName: e.target.value }))} placeholder="Jane Smith" />
                {paymentErrors.cardName ? <small className="error-text">{paymentErrors.cardName}</small> : null}
              </div>

              <div className={`field ${paymentErrors.cardNumber ? "has-error" : ""}`}>
                <label>Card Number *</label>
                <input value={paymentForm.cardNumber} onChange={(e) => setPaymentForm(f => ({ ...f, cardNumber: e.target.value }))} placeholder="4242 4242 4242 4242" />
                {paymentErrors.cardNumber ? <small className="error-text">{paymentErrors.cardNumber}</small> : null}
              </div>

              <div className="form-row">
                <div className={`field ${paymentErrors.expiry ? "has-error" : ""}`}>
                  <label>Expiry (MM/YY) *</label>
                  <input value={paymentForm.expiry} onChange={(e) => setPaymentForm(f => ({ ...f, expiry: e.target.value }))} placeholder="12/29" />
                  {paymentErrors.expiry ? <small className="error-text">{paymentErrors.expiry}</small> : null}
                </div>

                <div className={`field ${paymentErrors.cvv ? "has-error" : ""}`}>
                  <label>CVV *</label>
                  <input value={paymentForm.cvv} onChange={(e) => setPaymentForm(f => ({ ...f, cvv: e.target.value }))} placeholder="123" />
                  {paymentErrors.cvv ? <small className="error-text">{paymentErrors.cvv}</small> : null}
                </div>
              </div>

              <div className="checkout-actions">
                <button className="secondary-btn" onClick={() => setRoute("shipping")}>← Back</button>
                <button className="primary-btn" onClick={() => {
                  if (validatePayment()) {
                    setOrderNumber(`TN-${Date.now().toString().slice(-8)}`);
                    setCart([]);
                    setRoute("confirmed");
                  }
                }}>Place Order ✔</button>
              </div>
            </section>

            <aside className="summary">
              <h3>Order Summary</h3>
              {cartItems.map(({ product, qty }) => <div key={product.id} className="summary-row"><span>{product.name} × {qty}</span><span>${(product.price * qty).toFixed(2)}</span></div>)}
              <hr />
              <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="summary-row"><span>Shipping</span><strong>{shipping ? `$${shipping.toFixed(2)}` : "FREE"}</strong></div>
              <div className="summary-row total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
              {subtotal >= 100 ? <p className="green">✓ You qualify for free shipping!</p> : null}
            </aside>
          </div>
        </main>
      )}

      {route === "confirmed" && (
        <main className="page page-checkout">
          <h1 className="center-title">Checkout</h1>
          <div className="steps">
            <span className="done">🛒 Cart</span><span className="done">🚚 Shipping</span><span className="done">💳 Payment</span><span className="active">✔ Confirmed</span>
          </div>

          <section className="confirm-card">
            <h2>✅ Order Confirmed</h2>
            <p>Thank you, {shippingForm.fullName || "Customer"}! Your order has been placed successfully.</p>
            <p><strong>Order #:</strong> {orderNumber || "TN-00000000"}</p>
            <p>A confirmation email was sent to <strong>{shippingForm.email || "your email"}</strong>.</p>
            <div className="checkout-actions">
              <button className="secondary-btn" onClick={() => setRoute("shop")}>Continue Shopping</button>
              <button className="primary-btn" onClick={() => setRoute("home")}>Go Home</button>
            </div>
          </section>
        </main>
      )}

      <footer className="tn-footer">
        <div className="foot-grid">
          <div><h4>⚡ TechNest</h4><p>Your one-stop shop for the latest electronics and tech accessories.</p></div>
          <div><h5>Shop</h5><p>Laptops</p><p>Monitors</p><p>Computer Parts</p><p>Keyboards</p></div>
          <div><h5>Support</h5><p>Help Centre</p><p>Returns & Refunds</p><p>Order Tracking</p><p>Contact Us</p></div>
          <div><h5>Policies</h5><p>Privacy Policy</p><p>Terms of Service</p><p>Warranty Info</p><p>Accessibility</p></div>
        </div>
        <div className="copy">© 2025 TechNest Electronics. All rights reserved. | Made with ♥ in Canada</div>
      </footer>
    </div>
  );
}
