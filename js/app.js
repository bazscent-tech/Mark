// ===== سوق الجمله اليمني - Main App =====

// --- Helpers ---
function formatPrice(price) {
  return price.toLocaleString('ar-YE');
}

function generateStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += i <= Math.floor(rating) ? '★' : '<span class="empty">★</span>';
  }
  return html;
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function updateCartBadge() {
  const badge = document.querySelector('#cart-badge');
  if (badge) badge.textContent = STORE.cart.length;
}

// --- Render Product Card ---
function renderProductCard(product) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return `
    <div class="product-card" onclick="Router.navigate('product/${product.id}')">
      <div class="product-image">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px;background:var(--gray-100)">${product.image}</div>
        ${discount > 0 ? `<div class="discount-tag">-${discount}%</div>` : ''}
        <button class="wishlist-btn" onclick="event.stopPropagation();this.classList.toggle('active')">♡</button>
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)} <span class="currency">${STORE.currency}</span></div>
        <div style="font-size:12px;color:var(--gray-500);text-decoration:line-through">${formatPrice(product.originalPrice)} ${STORE.currency}</div>
        <div class="product-meta">
          <span class="stars" style="font-size:12px">${generateStars(product.rating)}</span>
          <span>${product.rating}</span>
          <span class="orders">${product.orders.toLocaleString()} طلب</span>
        </div>
        <div class="moq-badge">الحد الأدنى: ${product.moq} قطع</div>
        <div class="store-badge">🏪 ${product.store}</div>
      </div>
    </div>
  `;
}

// --- Page: Home ---
function renderHome() {
  const content = document.getElementById('app-content');
  const flashProducts = STORE.products.slice(0, 4);
  const popularProducts = STORE.products.slice(0, 8);
  const newProducts = STORE.products.slice(4, 12);

  content.innerHTML = `
    <!-- Hero -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-banner">
            <div class="hero-content">
              <h1>🏪 سوق الجمله اليمني</h1>
              <p>أكبر منصة تجارية بالجملة في اليمن — آلاف المنتجات بأسعار الجملة مع ضمان الجودة وتوصيل سريع لجميع المحافظات</p>
              <button class="btn btn-lg" style="background:white;color:var(--primary);font-weight:800" onclick="Router.navigate('categories')">
                تصفح المنتجات ←
              </button>
            </div>
          </div>
          <div class="hero-side">
            <div class="hero-side-card">
              <h3>🔥 عروض اليوم</h3>
              <p>خصومات تصل إلى 60% على آلاف المنتجات</p>
            </div>
            <div class="hero-side-card">
              <h3>🚚 شحن مجاني</h3>
              <p>على الطلبات فوق 50,000 ${STORE.currency}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title"><span class="title-icon">📂</span> التصنيفات الرئيسية</h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض الكل ←</a>
        </div>
        <div class="categories-grid">
          ${STORE.categories.map(cat => `
            <div class="category-card" onclick="Router.navigate('category/${cat.id}')">
              <div class="cat-emoji">${cat.icon}</div>
              <div class="cat-name">${cat.name}</div>
              <div class="cat-count">${cat.count.toLocaleString()} منتج</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Flash Deals -->
    <section class="section">
      <div class="container">
        <div class="flash-deals">
          <div class="flash-header">
            <h2>⚡ عروض فلاش</h2>
            <div class="flash-timer">
              <div class="timer-block" id="timer-h">08</div>
              <span class="timer-sep">:</span>
              <div class="timer-block" id="timer-m">45</div>
              <span class="timer-sep">:</span>
              <div class="timer-block" id="timer-s">30</div>
            </div>
          </div>
          <div class="flash-products">
            ${flashProducts.map(p => {
              const discount = Math.round((1 - p.price / p.originalPrice) * 100);
              return `
                <div class="flash-product-card" onclick="Router.navigate('product/${p.id}')">
                  <div class="fp-image">
                    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:48px;background:var(--gray-100)">${p.image}</div>
                    <div class="fp-discount">-${discount}%</div>
                  </div>
                  <div class="fp-info">
                    <div class="fp-price">${formatPrice(p.price)} <span style="font-size:12px">${STORE.currency}</span></div>
                    <div class="fp-original">${formatPrice(p.originalPrice)} ${STORE.currency}</div>
                    <div class="fp-sold"><div class="fp-sold-bar" style="width:${p.soldPercent}%"></div></div>
                    <div class="fp-sold-text">${p.soldPercent}% مباع</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title"><span class="title-icon">🔥</span> الأكثر مبيعاً</h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض الكل ←</a>
        </div>
        <div class="products-grid">
          ${popularProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title"><span class="title-icon">🆕</span> وصل حديثاً</h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض الكل ←</a>
        </div>
        <div class="products-grid">
          ${newProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="section">
      <div class="container">
        <div class="trust-bar">
          <div class="trust-item">
            <div class="trust-icon">🛡️</div>
            <div class="trust-text">
              <h4>حماية المشتري</h4>
              <p>استرداد الأموال في حال عدم الرضا</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">🚚</div>
            <div class="trust-text">
              <h4>شحن سريع</h4>
              <p>توصيل لجميع المحافظات</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">💳</div>
            <div class="trust-text">
              <h4>دفع آمن</h4>
              <p>طرق دفع متعددة وآمنة</p>
            </div>
          </div>
          <div class="trust-item">
            <div class="trust-icon">📞</div>
            <div class="trust-text">
              <h4>دعم 24/7</h4>
              <p>خدمة عملاء على مدار الساعة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  startFlashTimer();
}

// Flash Timer
function startFlashTimer() {
  let total = 8 * 3600 + 45 * 60 + 30;
  setInterval(() => {
    if (total <= 0) return;
    total--;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const elH = document.getElementById('timer-h');
    const elM = document.getElementById('timer-m');
    const elS = document.getElementById('timer-s');
    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// --- Page: Categories ---
function renderCategories() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span>جميع التصنيفات</span>
        </div>
        <h2 class="section-title" style="margin-bottom:24px"><span class="title-icon">📂</span> جميع التصنيفات</h2>
        <div class="categories-grid">
          ${STORE.categories.map(cat => `
            <div class="category-card" onclick="Router.navigate('category/${cat.id}')" style="padding:24px">
              <div class="cat-emoji" style="font-size:48px">${cat.icon}</div>
              <div class="cat-name" style="font-size:15px;margin-top:8px">${cat.name}</div>
              <div class="cat-count">${cat.count.toLocaleString()} منتج</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// --- Page: Category Products ---
function renderCategory(catId) {
  const content = document.getElementById('app-content');
  const cat = STORE.categories.find(c => c.id == catId);
  if (!cat) { content.innerHTML = '<div class="container"><div class="empty-state"><h3>التصنيف غير موجود</h3></div></div>'; return; }

  const products = STORE.products.filter(p => p.category == catId);
  const subCats = cat.subCategories || [];
  let currentSort = 'popular';
  let filteredProducts = [...products];

  function reRender() {
    const grid = document.getElementById('category-products-grid');
    const count = document.getElementById('category-count');
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(renderProductCard).join('')
        : '<div class="empty-state"><div class="empty-icon">📦</div><h3>لا توجد منتجات</h3><p>جرب تصفية أخرى</p></div>';
      count.textContent = filteredProducts.length;
    }
  }

  function sortProducts(sortBy) {
    currentSort = sortBy;
    switch(sortBy) {
      case 'price-low': filteredProducts.sort((a,b) => a.price - b.price); break;
      case 'price-high': filteredProducts.sort((a,b) => b.price - a.price); break;
      case 'rating': filteredProducts.sort((a,b) => b.rating - a.rating); break;
      case 'orders': filteredProducts.sort((a,b) => b.orders - a.orders); break;
      case 'newest': filteredProducts.reverse(); break;
      default: filteredProducts.sort((a,b) => b.orders - a.orders);
    }
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.sort === sortBy);
    });
    reRender();
  }

  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('categories')">التصنيفات</a>
          <span class="sep">←</span>
          <span>${cat.icon} ${cat.name}</span>
        </div>

        <!-- Sub Categories -->
        ${subCats.length > 0 ? `
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
            <span class="tag active" onclick="filterBySubCat(this, 'all')">الكل</span>
            ${subCats.map(sub => `<span class="tag" onclick="filterBySubCat(this, '${sub}')">${sub}</span>`).join('')}
          </div>
        ` : ''}

        <!-- Filter Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;background:var(--white);padding:12px 16px;border-radius:var(--radius-lg);border:1px solid var(--gray-200);flex-wrap:wrap;gap:12px">
          <div style="font-size:14px;color:var(--gray-600)">
            <span id="category-count">${filteredProducts.length}</span> منتج
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-size:13px;color:var(--gray-500);display:flex;align-items:center">ترتيب:</span>
            <button class="tag sort-btn active" data-sort="popular" onclick="sortProducts('popular')">الأكثر طلباً</button>
            <button class="tag sort-btn" data-sort="price-low" onclick="sortProducts('price-low')">السعر: منخفض</button>
            <button class="tag sort-btn" data-sort="price-high" onclick="sortProducts('price-high')">السعر: مرتفع</button>
            <button class="tag sort-btn" data-sort="rating" onclick="sortProducts('rating')">الأعلى تقييماً</button>
            <button class="tag sort-btn" data-sort="newest" onclick="sortProducts('newest')">الأحدث</button>
          </div>
        </div>

        <div id="category-products-grid" class="products-grid">
          ${filteredProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function filterBySubCat(element, subCat) {
  // Update active tag
  element.parentElement.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
  // Filter would go here with actual data
  showToast(`تصفية: ${subCat === 'all' ? 'الكل' : subCat}`);
}

// --- Page: Product Detail ---
function renderProduct(productId) {
  const content = document.getElementById('app-content');
  const product = STORE.products.find(p => p.id == productId);
  if (!product) { content.innerHTML = '<div class="container"><div class="empty-state"><h3>المنتج غير موجود</h3></div></div>'; return; }

  const cat = STORE.categories.find(c => c.id === product.category);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  let quantity = product.moq;
  let selectedVariants = {};

  // Initialize variants
  Object.entries(product.variants).forEach(([key, values]) => {
    selectedVariants[key] = values[0];
  });

  content.innerHTML = `
    <section class="product-page">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('category/${product.category}')">${cat ? cat.icon + ' ' + cat.name : ''}</a>
          <span class="sep">←</span>
          <span>${product.subCategory}</span>
        </div>

        <!-- Product Detail -->
        <div class="product-detail">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="gallery-main">
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:120px;background:var(--gray-100)">${product.image}</div>
            </div>
            <div class="gallery-thumbs">
              ${[1,2,3,4].map((_, i) => `
                <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.gallery-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active')">
                  <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;background:var(--gray-100)">${product.image}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Info -->
          <div class="product-info-section">
            <h1>${product.name}</h1>

            <div class="product-rating-row">
              <span class="stars">${generateStars(product.rating)}</span>
              <span class="rating-score">${product.rating}</span>
              <span class="orders-count">${product.reviews.toLocaleString()} تقييم</span>
              <span class="orders-count">${product.orders.toLocaleString} طلب</span>
            </div>

            <!-- Price -->
            <div class="price-box">
              <span class="price-current">${formatPrice(product.price)} <span class="currency">${STORE.currency}</span></span>
              <span class="price-original">${formatPrice(product.originalPrice)} ${STORE.currency}</span>
              <span class="price-discount">-${discount}%</span>
              <div style="font-size:12px;color:var(--gray-500);margin-top:4px">شامل ضريبة القيمة المضافة</div>
            </div>

            <!-- Variants -->
            ${Object.entries(product.variants).map(([key, values]) => `
              <div class="variant-section">
                <div class="variant-label">${key}:</div>
                <div class="variant-options">
                  ${values.map((v, i) => `
                    <div class="variant-option ${i === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.variant-option').forEach(o=>o.classList.remove('active'));this.classList.add('active')">${v}</div>
                  `).join('')}
                </div>
              </div>
            `).join('')}

            <!-- Quantity -->
            <div class="quantity-section">
              <span style="font-weight:600;font-size:14px">الكمية:</span>
              <div class="quantity-control">
                <button onclick="updateQty(-1)">−</button>
                <input type="number" id="qty-input" value="${quantity}" min="${product.moq}" onchange="validateQty(${product.moq})">
                <button onclick="updateQty(1)">+</button>
              </div>
              <span class="moq-info">الحد الأدنى: ${product.moq} قطع</span>
            </div>

            <!-- Actions -->
            <div class="product-actions">
              <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})">
                🛒 أضف إلى السلة
              </button>
              <button class="btn btn-outline btn-lg" onclick="buyNow(${product.id})">
                ⚡ اطلب الآن
              </button>
            </div>

            <!-- Store Info -->
            <div style="background:var(--gray-50);border-radius:var(--radius-md);padding:16px;display:flex;align-items:center;gap:16px;margin-top:16px">
              <div style="width:48px;height:48px;border-radius:50%;background:var(--primary-bg);display:flex;align-items:center;justify-content:center;font-size:24px">🏪</div>
              <div>
                <div style="font-weight:700;font-size:15px">${product.store}</div>
                <div style="font-size:12px;color:var(--gray-500)">${product.storeBadge}</div>
              </div>
              <button class="btn btn-outline btn-sm" style="margin-inline-start:auto">زيارة المتجر</button>
            </div>

            <!-- Guarantees -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px">
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray-600)">
                <span>🛡️</span> ضمان الجودة
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray-600)">
                <span>🚚</span> شحن سريع
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray-600)">
                <span>🔄</span> إرجاع خلال 7 أيام
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray-600)">
                <span>💳</span> دفع عند الاستلام
              </div>
            </div>
          </div>
        </div>

        <!-- Specs -->
        <div class="product-specs">
          <div class="tabs">
            <div class="tab active" onclick="switchTab(this,'specs-panel')">المواصفات</div>
            <div class="tab" onclick="switchTab(this,'desc-panel')">الوصف</div>
            <div class="tab" onclick="switchTab(this,'reviews-panel')">التقييمات (${product.reviews})</div>
          </div>

          <div id="specs-panel" style="padding-top:20px">
            <div class="specs-table">
              ${Object.entries(product.specs).map(([key, val]) => `
                <div class="spec-row">
                  <div class="spec-label">${key}</div>
                  <div class="spec-value">${val}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div id="desc-panel" class="hidden" style="padding-top:20px">
            <p style="font-size:15px;line-height:1.8;color:var(--gray-700)">${product.description}</p>
          </div>

          <div id="reviews-panel" class="hidden" style="padding-top:20px">
            ${STORE.reviews.map(r => `
              <div class="review-card">
                <div class="review-header">
                  <div class="review-avatar">${r.avatar}</div>
                  <div>
                    <div class="review-name">${r.user}</div>
                    <div class="stars" style="font-size:12px">${generateStars(r.rating)}</div>
                  </div>
                  <div class="review-date">${r.date}</div>
                </div>
                <div class="review-text">${r.text}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Related Products -->
        <div style="margin-top:40px">
          <div class="section-header">
            <h2 class="section-title"><span class="title-icon">🔗</span> منتجات مشابهة</h2>
          </div>
          <div class="products-grid">
            ${STORE.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(renderProductCard).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function switchTab(tab, panelId) {
  tab.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  tab.closest('.product-specs').querySelectorAll('[id$="-panel"]').forEach(p => p.classList.add('hidden'));
  document.getElementById(panelId).classList.remove('hidden');
}

function updateQty(delta) {
  const input = document.getElementById('qty-input');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

function validateQty(min) {
  const input = document.getElementById('qty-input');
  if (!input) return;
  if (parseInt(input.value) < min) input.value = min;
}

// --- Cart Functions ---
function addToCart(productId) {
  const product = STORE.products.find(p => p.id === productId);
  if (!product) return;

  const existing = STORE.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += parseInt(document.getElementById('qty-input')?.value || product.moq);
  } else {
    STORE.cart.push({
      ...product,
      quantity: parseInt(document.getElementById('qty-input')?.value || product.moq)
    });
  }
  updateCartBadge();
  showToast(`تمت إضافة "${product.name.substring(0, 30)}..." إلى السلة`);
}

function buyNow(productId) {
  addToCart(productId);
  Router.navigate('cart');
}

function removeFromCart(productId) {
  STORE.cart = STORE.cart.filter(item => item.id !== productId);
  updateCartBadge();
  renderCart();
  showToast('تم حذف المنتج من السلة', 'warning');
}

function updateCartQuantity(productId, delta) {
  const item = STORE.cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < item.moq) item.quantity = item.moq;
  renderCart();
}

// --- Page: Cart ---
function renderCart() {
  const content = document.getElementById('app-content');

  if (STORE.cart.length === 0) {
    content.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon">🛒</div>
            <h3>سلة المشتريات فارغة</h3>
            <p>ابدأ بتصفح المنتجات وأضف ما يعجبك</p>
            <button class="btn btn-primary btn-lg" onclick="Router.navigate('home')">تصفح المنتجات</button>
          </div>
        </div>
      </section>
    `;
    return;
  }

  const subtotal = STORE.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  content.innerHTML = `
    <section class="cart-page">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span>سلة المشتريات</span>
        </div>
        <h2 class="section-title" style="margin-bottom:24px">🛒 سلة المشتريات (${STORE.cart.length} منتج)</h2>

        <div class="cart-layout">
          <div class="cart-items">
            ${STORE.cart.map(item => `
              <div class="cart-item">
                <div class="cart-item-image">
                  <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;background:var(--gray-100)">${item.image}</div>
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-title">${item.name}</div>
                  <div class="cart-item-variant">🏪 ${item.store}</div>
                  <div class="cart-item-price">${formatPrice(item.price)} ${STORE.currency}</div>
                </div>
                <div class="cart-item-actions">
                  <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
                  <div class="quantity-control" style="margin-top:auto">
                    <button onclick="updateCartQuantity(${item.id}, -1)">−</button>
                    <input type="number" value="${item.quantity}" readonly style="width:50px">
                    <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="cart-summary">
            <h3>ملخص الطلب</h3>
            <div class="summary-row">
              <span>المجموع الفرعي</span>
              <span>${formatPrice(subtotal)} ${STORE.currency}</span>
            </div>
            <div class="summary-row">
              <span>الشحن</span>
              <span style="color:${shipping === 0 ? 'var(--success)' : 'inherit'}">${shipping === 0 ? 'مجاني' : formatPrice(shipping) + ' ' + STORE.currency}</span>
            </div>
            ${shipping === 0 ? '<div style="font-size:12px;color:var(--success);margin-bottom:8px">✓ تم تطبيق الشحن المجاني</div>' : ''}
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span>${formatPrice(total)} ${STORE.currency}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg" onclick="Router.navigate('checkout')">
              إتمام الطلب ←
            </button>
            <button class="btn btn-ghost btn-block" onclick="Router.navigate('home')" style="margin-top:8px">
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// --- Page: Checkout ---
function renderCheckout() {
  const content = document.getElementById('app-content');
  const subtotal = STORE.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('cart')">السلة</a>
          <span class="sep">←</span>
          <span>إتمام الطلب</span>
        </div>
        <h2 class="section-title" style="margin-bottom:24px">📦 إتمام الطلب</h2>

        <div class="checkout-layout">
          <div>
            <!-- Shipping Info -->
            <div class="checkout-section">
              <h3>🚚 معلومات الشحن</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>الاسم الكامل</label>
                  <input type="text" placeholder="أدخل اسمك الكامل">
                </div>
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input type="tel" placeholder="7XX XXX XXXX">
                </div>
                <div class="form-group">
                  <label>المحافظة</label>
                  <select>
                    <option>صنعاء</option>
                    <option>عدن</option>
                    <option>تعز</option>
                    <option>الحديدة</option>
                    <option>إب</option>
                    <option>ذمار</option>
                    <option>حضرموت</option>
                    <option>مأرب</option>
                    <option>حجة</option>
                    <option>لحج</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>المدينة</label>
                  <input type="text" placeholder="أدخل المدينة">
                </div>
                <div class="form-group full">
                  <label>العنوان التفصيلي</label>
                  <textarea rows="3" placeholder="المنطقة، الشارع، رقم المبنى..."></textarea>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="checkout-section">
              <h3>💳 طريقة الدفع</h3>
              <div style="display:flex;flex-direction:column;gap:12px">
                <label style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid var(--primary);border-radius:var(--radius-md);cursor:pointer;background:var(--primary-bg)">
                  <input type="radio" name="payment" checked style="accent-color:var(--primary)">
                  <span style="font-size:24px">💵</span>
                  <div>
                    <div style="font-weight:700">الدفع عند الاستلام</div>
                    <div style="font-size:12px;color:var(--gray-500)">ادفع نقداً عند استلام الطلب</div>
                  </div>
                </label>
                <label style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid var(--gray-200);border-radius:var(--radius-md);cursor:pointer">
                  <input type="radio" name="payment" style="accent-color:var(--primary)">
                  <span style="font-size:24px">📱</span>
                  <div>
                    <div style="font-weight:700">محفظة إلكترونية</div>
                    <div style="font-size:12px;color:var(--gray-500)">جوالي كاش، يمن موبايل كاش</div>
                  </div>
                </label>
                <label style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid var(--gray-200);border-radius:var(--radius-md);cursor:pointer">
                  <input type="radio" name="payment" style="accent-color:var(--primary)">
                  <span style="font-size:24px">🏦</span>
                  <div>
                    <div style="font-weight:700">تحويل بنكي</div>
                    <div style="font-size:12px;color:var(--gray-500)">تحويل إلى حسابنا البنكي</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Notes -->
            <div class="checkout-section">
              <h3>📝 ملاحظات الطلب</h3>
              <textarea rows="3" placeholder="أي ملاحظات أو تعليمات خاصة للطلب..." style="width:100%"></textarea>
            </div>
          </div>

          <!-- Order Summary -->
          <div>
            <div class="cart-summary" style="position:sticky;top:120px">
              <h3>ملخص الطلب</h3>
              ${STORE.cart.map(item => `
                <div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--gray-100)">
                  <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${item.image}</div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</div>
                    <div style="font-size:12px;color:var(--gray-500)">× ${item.quantity}</div>
                  </div>
                  <div style="font-weight:700;font-size:14px;white-space:nowrap">${formatPrice(item.price * item.quantity)} ${STORE.currency}</div>
                </div>
              `).join('')}
              <div class="summary-row" style="margin-top:12px">
                <span>المجموع الفرعي</span>
                <span>${formatPrice(subtotal)} ${STORE.currency}</span>
              </div>
              <div class="summary-row">
                <span>الشحن</span>
                <span style="color:${shipping === 0 ? 'var(--success)' : 'inherit'}">${shipping === 0 ? 'مجاني' : formatPrice(shipping) + ' ' + STORE.currency}</span>
              </div>
              <div class="summary-row total">
                <span>الإجمالي</span>
                <span>${formatPrice(total)} ${STORE.currency}</span>
              </div>
              <button class="btn btn-primary btn-block btn-lg" onclick="placeOrder()">
                تأكيد الطلب ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function placeOrder() {
  showToast('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً', 'success');
  STORE.cart = [];
  updateCartBadge();
  setTimeout(() => Router.navigate('orders'), 1500);
}

// --- Page: Login ---
function renderLogin() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <h2>تسجيل الدخول</h2>
        <p class="auth-sub">مرحباً بك في سوق الجمله اليمني</p>

        <div class="social-login">
          <button class="social-btn">📱 Google</button>
          <button class="social-btn">📘 Facebook</button>
        </div>

        <div class="auth-divider">أو</div>

        <div class="form-group">
          <label>البريد الإلكتروني أو رقم الهاتف</label>
          <input type="text" placeholder="أدخل بريدك الإلكتروني أو رقم هاتفك">
        </div>
        <div class="form-group">
          <label>كلمة المرور</label>
          <input type="password" placeholder="أدخل كلمة المرور">
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;font-size:13px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
            <input type="checkbox" style="accent-color:var(--primary)"> تذكرني
          </label>
          <a style="color:var(--primary);cursor:pointer">نسيت كلمة المرور؟</a>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="doLogin()">تسجيل الدخول</button>

        <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--gray-600)">
          ليس لديك حساب؟ <a style="color:var(--primary);font-weight:600;cursor:pointer" onclick="Router.navigate('register')">إنشاء حساب جديد</a>
        </p>
      </div>
    </div>
  `;
}

function doLogin() {
  STORE.user = { name: 'المستخدم', role: 'buyer' };
  showToast('تم تسجيل الدخول بنجاح');
  Router.navigate('home');
}

// --- Page: Register ---
function renderRegister() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="auth-page">
      <div class="auth-card">
        <h2>إنشاء حساب جديد</h2>
        <p class="auth-sub">انضم إلى سوق الجمله اليمني</p>

        <div style="display:flex;gap:12px;margin-bottom:20px">
          <button class="btn btn-outline" style="flex:1" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-primary'));this.classList.add('btn-primary');this.classList.remove('btn-outline')">
            👤 مشتري
          </button>
          <button class="btn btn-outline" style="flex:1" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('btn-primary'));this.classList.add('btn-primary');this.classList.remove('btn-outline')">
            🏪 تاجر / بائع
          </button>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label>الاسم الكامل</label>
            <input type="text" placeholder="أدخل اسمك">
          </div>
          <div class="form-group">
            <label>رقم الهاتف</label>
            <input type="tel" placeholder="7XX XXX XXXX">
          </div>
          <div class="form-group full">
            <label>البريد الإلكتروني</label>
            <input type="email" placeholder="example@email.com">
          </div>
          <div class="form-group">
            <label>كلمة المرور</label>
            <input type="password" placeholder="8 أحرف على الأقل">
          </div>
          <div class="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" placeholder="أعد إدخال كلمة المرور">
          </div>
        </div>

        <label style="display:flex;align-items:flex-start;gap:8px;margin-bottom:20px;font-size:13px;cursor:pointer">
          <input type="checkbox" style="accent-color:var(--primary);margin-top:3px">
          <span>أوافق على <a style="color:var(--primary)">الشروط والأحكام</a> و<a style="color:var(--primary)">سياسة الخصوصية</a></span>
        </label>

        <button class="btn btn-primary btn-block btn-lg" onclick="doRegister()">إنشاء الحساب</button>

        <p style="text-align:center;margin-top:20px;font-size:14px;color:var(--gray-600)">
          لديك حساب بالفعل؟ <a style="color:var(--primary);font-weight:600;cursor:pointer" onclick="Router.navigate('login')">تسجيل الدخول</a>
        </p>
      </div>
    </div>
  `;
}

function doRegister() {
  STORE.user = { name: 'مستخدم جديد', role: 'buyer' };
  showToast('تم إنشاء الحساب بنجاح');
  Router.navigate('home');
}

// --- Page: Buyer Orders ---
function renderOrders() {
  const content = document.getElementById('app-content');
  const statusMap = {
    pending: { label: 'في الانتظار', class: 'pending', icon: '⏳' },
    processing: { label: 'قيد التجهيز', class: 'processing', icon: '📦' },
    shipped: { label: 'تم الشحن', class: 'shipped', icon: '🚚' },
    delivered: { label: 'تم التوصيل', class: 'delivered', icon: '✅' },
    cancelled: { label: 'ملغي', class: 'cancelled', icon: '❌' },
  };

  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span>طلباتي</span>
        </div>
        <h2 class="section-title" style="margin-bottom:24px">📦 طلباتي</h2>

        <!-- Tabs -->
        <div class="tabs" style="margin-bottom:24px">
          <div class="tab active">الكل</div>
          <div class="tab">قيد التجهيز</div>
          <div class="tab">تم الشحن</div>
          <div class="tab">تم التوصيل</div>
          <div class="tab">ملغي</div>
        </div>

        ${STORE.orders.map(order => {
          const status = statusMap[order.status];
          return `
            <div class="order-card">
              <div class="order-header">
                <div>
                  <span style="font-weight:700">${order.id}</span>
                  <span style="margin-inline-start:16px;color:var(--gray-500)">${order.date}</span>
                </div>
                <span class="status-badge ${status.class}">${status.icon} ${status.label}</span>
              </div>
              <div class="order-body">
                <div class="order-item">
                  <div class="order-item-img">
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;background:var(--gray-100)">📦</div>
                  </div>
                  <div>
                    <div style="font-weight:500;font-size:14px">${order.items} منتجات</div>
                    <div style="font-size:12px;color:var(--gray-500)">طلب من سوق الجمله اليمني</div>
                  </div>
                </div>
              </div>
              <div class="order-footer">
                <div>
                  <span style="font-size:13px;color:var(--gray-500)">الإجمالي: </span>
                  <span class="order-total">${formatPrice(order.total)} ${STORE.currency}</span>
                </div>
                <div style="display:flex;gap:8px">
                  <button class="btn btn-outline btn-sm">تتبع الطلب</button>
                  ${order.status === 'delivered' ? '<button class="btn btn-primary btn-sm">تقييم</button>' : ''}
                  ${order.status === 'pending' ? '<button class="btn btn-danger btn-sm">إلغاء</button>' : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

// --- Page: Merchant Dashboard ---
function renderDashboard() {
  const content = document.getElementById('app-content');
  const stats = STORE.merchantStats;

  content.innerHTML = `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <div class="dashboard-sidebar">
        <div class="sidebar-user">
          <div class="user-avatar">🏪</div>
          <div class="user-name">تاجر الجملة</div>
          <div class="user-role">تاجر ذهبي ⭐</div>
        </div>
        <nav class="sidebar-nav">
          <a class="active"><span class="nav-icon">📊</span> لوحة التحكم</a>
          <a onclick="Router.navigate('dashboard/products')"><span class="nav-icon">📦</span> المنتجات <span class="nav-badge">${stats.totalProducts}</span></a>
          <a onclick="Router.navigate('dashboard/orders')"><span class="nav-icon">🛒</span> الطلبات <span class="nav-badge">${stats.pendingOrders}</span></a>
          <a><span class="nav-icon">💬</span> الرسائل <span class="nav-badge">5</span></a>
          <a><span class="nav-icon">📈</span> التحليلات</a>
          <a><span class="nav-icon">💰</span> الأرباح</a>
          <a><span class="nav-icon">⚙️</span> الإعدادات</a>
          <a><span class="nav-icon">🎨</span> تخصيص المتجر</a>
          <a><span class="nav-icon">🏷️</span> العروض والكوبونات</a>
          <a><span class="nav-icon">⭐</span> التقييمات</a>
          <div class="dropdown-divider" style="margin:8px 0"></div>
          <a onclick="Router.navigate('home')"><span class="nav-icon">🏪</span> عرض المتجر</a>
        </nav>
      </div>

      <!-- Content -->
      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>لوحة التحكم</h2>
            <p style="color:var(--gray-500);font-size:14px">مرحباً بك، تاجر الجملة 👋</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-outline btn-sm">📊 تصدير التقرير</button>
            <button class="btn btn-primary btn-sm" onclick="Router.navigate('dashboard/products')">+ إضافة منتج</button>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-value">${formatPrice(stats.totalSales)}</div>
            <div class="stat-label">إجمالي المبيعات (${STORE.currency})</div>
            <div class="stat-change up">↑ ${stats.monthlyGrowth}% هذا الشهر</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-value">${stats.totalOrders.toLocaleString()}</div>
            <div class="stat-label">إجمالي الطلبات</div>
            <div class="stat-change up">↑ 8.3% هذا الشهر</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🛍️</div>
            <div class="stat-value">${stats.totalProducts}</div>
            <div class="stat-label">المنتجات النشطة</div>
            <div class="stat-change up">+12 منتج جديد</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-value">${stats.totalCustomers.toLocaleString()}</div>
            <div class="stat-label">العملاء</div>
            <div class="stat-change up">↑ 15.2% هذا الشهر</div>
          </div>
        </div>

        <!-- Order Status Cards -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px">
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:20px;border:1px solid var(--gray-200);text-align:center">
            <div style="font-size:32px;margin-bottom:8px">⏳</div>
            <div style="font-size:28px;font-weight:900;color:#F57F17">${stats.pendingOrders}</div>
            <div style="font-size:13px;color:var(--gray-500)">طلبات في الانتظار</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:20px;border:1px solid var(--gray-200);text-align:center">
            <div style="font-size:32px;margin-bottom:8px">📦</div>
            <div style="font-size:28px;font-weight:900;color:var(--info)">${stats.processingOrders}</div>
            <div style="font-size:13px;color:var(--gray-500)">قيد التجهيز</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:20px;border:1px solid var(--gray-200);text-align:center">
            <div style="font-size:32px;margin-bottom:8px">🚚</div>
            <div style="font-size:28px;font-weight:900;color:var(--success)">${stats.shippedOrders}</div>
            <div style="font-size:13px;color:var(--gray-500)">تم الشحن</div>
          </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="dashboard-table">
          <div class="dashboard-table-header">
            <h3>آخر الطلبات</h3>
            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard/orders')">عرض الكل ←</button>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المنتجات</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                ${STORE.orders.map(order => {
                  const statusMap = {
                    pending: { label: 'في الانتظار', class: 'pending' },
                    processing: { label: 'قيد التجهيز', class: 'processing' },
                    shipped: { label: 'تم الشحن', class: 'shipped' },
                    delivered: { label: 'تم التوصيل', class: 'delivered' },
                  };
                  const status = statusMap[order.status];
                  return `
                    <tr>
                      <td style="font-weight:600">${order.id}</td>
                      <td>أحمد محمد</td>
                      <td>${order.items} منتجات</td>
                      <td style="font-weight:700">${formatPrice(order.total)} ${STORE.currency}</td>
                      <td><span class="status-badge ${status.class}">${status.label}</span></td>
                      <td>${order.date}</td>
                      <td>
                        <button class="btn btn-ghost btn-sm">عرض</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px">
          <div class="card" style="cursor:pointer;text-align:center;padding:24px" onclick="Router.navigate('dashboard/products')">
            <div style="font-size:32px;margin-bottom:8px">➕</div>
            <div style="font-weight:600;font-size:14px">إضافة منتج</div>
          </div>
          <div class="card" style="cursor:pointer;text-align:center;padding:24px">
            <div style="font-size:32px;margin-bottom:8px">📊</div>
            <div style="font-weight:600;font-size:14px">تقارير المبيعات</div>
          </div>
          <div class="card" style="cursor:pointer;text-align:center;padding:24px">
            <div style="font-size:32px;margin-bottom:8px">🏷️</div>
            <div style="font-weight:600;font-size:14px">إنشاء عرض</div>
          </div>
          <div class="card" style="cursor:pointer;text-align:center;padding:24px">
            <div style="font-size:32px;margin-bottom:8px">💬</div>
            <div style="font-weight:600;font-size:14px">الرسائل</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Page: Merchant Products ---
function renderDashboardProducts() {
  const content = document.getElementById('app-content');

  content.innerHTML = `
    <div class="dashboard-layout">
      <div class="dashboard-sidebar">
        <div class="sidebar-user">
          <div class="user-avatar">🏪</div>
          <div class="user-name">تاجر الجملة</div>
          <div class="user-role">تاجر ذهبي ⭐</div>
        </div>
        <nav class="sidebar-nav">
          <a onclick="Router.navigate('dashboard')"><span class="nav-icon">📊</span> لوحة التحكم</a>
          <a class="active"><span class="nav-icon">📦</span> المنتجات</a>
          <a onclick="Router.navigate('dashboard/orders')"><span class="nav-icon">🛒</span> الطلبات</a>
          <a><span class="nav-icon">💬</span> الرسائل</a>
          <a><span class="nav-icon">📈</span> التحليلات</a>
          <a><span class="nav-icon">💰</span> الأرباح</a>
          <a><span class="nav-icon">⚙️</span> الإعدادات</a>
        </nav>
      </div>

      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>إدارة المنتجات</h2>
            <p style="color:var(--gray-500);font-size:14px">${STORE.merchantStats.totalProducts} منتج نشط</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-outline btn-sm">📥 استيراد</button>
            <button class="btn btn-primary btn-sm" onclick="showAddProductModal()">+ إضافة منتج جديد</button>
          </div>
        </div>

        <!-- Filters -->
        <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
          <input type="text" placeholder="🔍 بحث في المنتجات..." style="flex:1;min-width:200px">
          <select style="padding:8px 16px">
            <option>جميع التصنيفات</option>
            ${STORE.categories.map(c => `<option>${c.name}</option>`).join('')}
          </select>
          <select style="padding:8px 16px">
            <option>جميع الحالات</option>
            <option>نشط</option>
            <option>غير نشط</option>
            <option>نفذ من المخزون</option>
          </select>
        </div>

        <!-- Products Table -->
        <div class="dashboard-table">
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" style="accent-color:var(--primary)"></th>
                  <th>المنتج</th>
                  <th>التصنيف</th>
                  <th>السعر</th>
                  <th>المخزون</th>
                  <th>المبيعات</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                ${STORE.products.slice(0, 8).map(p => `
                  <tr>
                    <td><input type="checkbox" style="accent-color:var(--primary)"></td>
                    <td>
                      <div style="display:flex;align-items:center;gap:12px">
                        <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:24px">${p.image}</div>
                        <div>
                          <div style="font-weight:600;font-size:13px;max-width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
                          <div style="font-size:11px;color:var(--gray-500)">SKU: ${p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>${p.subCategory}</td>
                    <td style="font-weight:700">${formatPrice(p.price)} ${STORE.currency}</td>
                    <td>
                      <span class="badge ${Math.random() > 0.3 ? 'badge-success' : 'badge-danger'}">${Math.floor(Math.random() * 500) + 50}</span>
                    </td>
                    <td>${p.orders.toLocaleString()}</td>
                    <td><span class="status-badge delivered">نشط</span></td>
                    <td>
                      <div style="display:flex;gap:4px">
                        <button class="btn btn-ghost btn-sm">✏️</button>
                        <button class="btn btn-ghost btn-sm" style="color:var(--danger)">🗑️</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="pagination">
          <button class="page-btn">←</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">...</button>
          <button class="page-btn">20</button>
          <button class="page-btn">→</button>
        </div>
      </div>
    </div>
  `;
}

// --- Page: Merchant Orders ---
function renderDashboardOrders() {
  const content = document.getElementById('app-content');

  content.innerHTML = `
    <div class="dashboard-layout">
      <div class="dashboard-sidebar">
        <div class="sidebar-user">
          <div class="user-avatar">🏪</div>
          <div class="user-name">تاجر الجملة</div>
          <div class="user-role">تاجر ذهبي ⭐</div>
        </div>
        <nav class="sidebar-nav">
          <a onclick="Router.navigate('dashboard')"><span class="nav-icon">📊</span> لوحة التحكم</a>
          <a onclick="Router.navigate('dashboard/products')"><span class="nav-icon">📦</span> المنتجات</a>
          <a class="active"><span class="nav-icon">🛒</span> الطلبات</a>
          <a><span class="nav-icon">💬</span> الرسائل</a>
          <a><span class="nav-icon">📈</span> التحليلات</a>
          <a><span class="nav-icon">💰</span> الأرباح</a>
          <a><span class="nav-icon">⚙️</span> الإعدادات</a>
        </nav>
      </div>

      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>إدارة الطلبات</h2>
            <p style="color:var(--gray-500);font-size:14px">${STORE.merchantStats.totalOrders} إجمالي الطلبات</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-outline btn-sm">📥 تصدير</button>
          </div>
        </div>

        <!-- Order Stats -->
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px">
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:16px;border:1px solid var(--gray-200);text-align:center;cursor:pointer">
            <div style="font-size:14px;color:var(--gray-500)">الكل</div>
            <div style="font-size:24px;font-weight:900">${STORE.merchantStats.totalOrders}</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:16px;border:2px solid #F57F17;text-align:center;cursor:pointer">
            <div style="font-size:14px;color:#F57F17">في الانتظار</div>
            <div style="font-size:24px;font-weight:900;color:#F57F17">${STORE.merchantStats.pendingOrders}</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:16px;border:2px solid var(--info);text-align:center;cursor:pointer">
            <div style="font-size:14px;color:var(--info)">قيد التجهيز</div>
            <div style="font-size:24px;font-weight:900;color:var(--info)">${STORE.merchantStats.processingOrders}</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:16px;border:2px solid var(--success);text-align:center;cursor:pointer">
            <div style="font-size:14px;color:var(--success)">تم الشحن</div>
            <div style="font-size:24px;font-weight:900;color:var(--success)">${STORE.merchantStats.shippedOrders}</div>
          </div>
          <div style="background:var(--white);border-radius:var(--radius-lg);padding:16px;border:1px solid var(--gray-200);text-align:center;cursor:pointer">
            <div style="font-size:14px;color:var(--gray-500)">تم التوصيل</div>
            <div style="font-size:24px;font-weight:900">890</div>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="dashboard-table">
          <div class="dashboard-table-header">
            <div style="display:flex;gap:12px;align-items:center">
              <input type="text" placeholder="🔍 بحث برقم الطلب..." style="width:250px">
              <select style="padding:8px 16px">
                <option>جميع الحالات</option>
                <option>في الانتظار</option>
                <option>قيد التجهيز</option>
                <option>تم الشحن</option>
                <option>تم التوصيل</option>
              </select>
            </div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" style="accent-color:var(--primary)"></th>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المنتجات</th>
                  <th>المبلغ</th>
                  <th>طريقة الدفع</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                ${STORE.orders.map(order => {
                  const statusMap = {
                    pending: { label: 'في الانتظار', class: 'pending' },
                    processing: { label: 'قيد التجهيز', class: 'processing' },
                    shipped: { label: 'تم الشحن', class: 'shipped' },
                    delivered: { label: 'تم التوصيل', class: 'delivered' },
                  };
                  const status = statusMap[order.status];
                  const payments = ['الدفع عند الاستلام', 'محفظة إلكترونية', 'تحويل بنكي'];
                  return `
                    <tr>
                      <td><input type="checkbox" style="accent-color:var(--primary)"></td>
                      <td style="font-weight:600">${order.id}</td>
                      <td>
                        <div>
                          <div style="font-weight:500">أحمد محمد</div>
                          <div style="font-size:11px;color:var(--gray-500)">777 XXX XXXX</div>
                        </div>
                      </td>
                      <td>${order.items} منتجات</td>
                      <td style="font-weight:700">${formatPrice(order.total)} ${STORE.currency}</td>
                      <td style="font-size:13px">${payments[Math.floor(Math.random() * 3)]}</td>
                      <td><span class="status-badge ${status.class}">${status.label}</span></td>
                      <td>${order.date}</td>
                      <td>
                        <div style="display:flex;gap:4px">
                          <button class="btn btn-ghost btn-sm">👁️</button>
                          ${order.status === 'pending' ? '<button class="btn btn-success btn-sm">قبول</button>' : ''}
                          ${order.status === 'processing' ? '<button class="btn btn-primary btn-sm">شحن</button>' : ''}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Page: Search Results ---
function renderSearch(query) {
  const content = document.getElementById('app-content');
  const results = STORE.products.filter(p =>
    p.name.includes(query) || p.subCategory.includes(query) || p.description.includes(query)
  );

  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="product-breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span>نتائج البحث: "${query}"</span>
        </div>
        <h2 class="section-title" style="margin-bottom:24px">🔍 نتائج البحث عن "${query}"</h2>
        <p style="color:var(--gray-500);margin-bottom:20px">${results.length} نتيجة</p>
        <div class="products-grid">
          ${results.length > 0
            ? results.map(renderProductCard).join('')
            : '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>لا توجد نتائج</h3><p>جرب كلمات بحث مختلفة</p></div>'
          }
        </div>
      </div>
    </section>
  `;
}

// --- Init App ---
function initApp() {
  // Register routes
  Router.register('home', renderHome);
  Router.register('categories', renderCategories);
  Router.register('category', renderCategory);
  Router.register('product', renderProduct);
  Router.register('cart', renderCart);
  Router.register('checkout', renderCheckout);
  Router.register('login', renderLogin);
  Router.register('register', renderRegister);
  Router.register('orders', renderOrders);
  Router.register('dashboard', renderDashboard);
  Router.register('dashboard/products', renderDashboardProducts);
  Router.register('dashboard/orders', renderDashboardOrders);
  Router.register('search', renderSearch);

  // Search handler
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) Router.navigate('search/' + q);
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) Router.navigate('search/' + q);
      }
    });
  }

  // Init router
  Router.init();

  // Update cart badge
  updateCartBadge();
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
