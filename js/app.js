// ===== MARK Store — Premium App =====

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
  setTimeout(() => toast.remove(), 3500);
}

function updateCartBadge() {
  const badge = document.querySelector('#cart-badge');
  if (badge) badge.textContent = STORE.cart.length;
}

// --- Build Categories Mega Menu ---
function buildCategoriesMegaMenu() {
  const menu = document.getElementById('cat-menu');
  if (!menu) return;
  menu.innerHTML = STORE.categories.slice(0, 38).map(cat => `
    <div class="mega-cat-item" onclick="Router.navigate('category/${cat.id}')">
      <span class="cat-icon">${cat.icon}</span>
      <span>${cat.name}</span>
      <span class="arrow">←</span>
    </div>
  `).join('') + `
    <div class="mega-cat-item" onclick="Router.navigate('categories')" style="color:var(--clr-brand-dark);font-weight:700;justify-content:center">
      عرض جميع التصنيفات ←
    </div>
  `;
}

// --- Render Product Card ---
function renderProductCard(product) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return `
    <div class="product-card" onclick="Router.navigate('product/${product.id}')">
      <div class="product-image">
        <div class="img-inner" style="background:var(--clr-bg-sunken)">${product.image}</div>
        ${discount > 0 ? `<div class="discount-tag">-${discount}%</div>` : ''}
        <button class="wishlist-btn" onclick="event.stopPropagation();this.classList.toggle('active')">
          ${this.classList?.contains('active') ? '♥' : '♡'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-price">
          ${formatPrice(product.price)}
          <span class="currency">${STORE.currency}</span>
        </div>
        <div class="price-original">${formatPrice(product.originalPrice)} ${STORE.currency}</div>
        <div class="product-meta">
          <span class="stars">${generateStars(product.rating)}</span>
          <span>${product.rating}</span>
          <span>·</span>
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
  const topCategories = STORE.categories.slice(0, 12);

  content.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-banner">
            <div class="hero-content">
              <div class="hero-badge">🇾🇪 سوق الجمله اليمني</div>
              <h1>
                أكبر منصة تجارية
                <span class="accent">بالجملة في اليمن</span>
              </h1>
              <p>آلاف المنتجات بأسعار الجملة مع ضمان الجودة وتوصيل سريع لجميع المحافظات اليمنية</p>
              <div class="hero-buttons">
                <button class="btn btn-brand btn-lg" onclick="Router.navigate('categories')">
                  تصفح المنتجات ←
                </button>
                <button class="btn btn-outline btn-lg" style="border-color:rgba(255,255,255,0.3);color:var(--clr-text-inverse)" onclick="Router.navigate('register')">
                  سجّل كبائع
                </button>
              </div>
              <div class="hero-stats">
                <div class="hero-stat">
                  <div class="num">+10,000</div>
                  <div class="label">منتج متاح</div>
                </div>
                <div class="hero-stat">
                  <div class="num">+500</div>
                  <div class="label">تاجر موثق</div>
                </div>
                <div class="hero-stat">
                  <div class="num">+50,000</div>
                  <div class="label">طلب مكتمل</div>
                </div>
                <div class="hero-stat">
                  <div class="num">24</div>
                  <div class="label">محافظة</div>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-side">
            <div class="hero-card hero-card-1" onclick="Router.navigate('categories')">
              <div class="hero-card-content">
                <div class="card-icon">🔥</div>
                <h3>عروض اليوم</h3>
                <p>خصومات تصل إلى 60%</p>
              </div>
            </div>
            <div class="hero-card hero-card-2" onclick="Router.navigate('category/2')">
              <div class="hero-card-content">
                <div class="card-icon">📱</div>
                <h3>إلكترونيات</h3>
                <p>أحدث الأجهزة بأسعار الجملة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">📂</span>
            <span class="label">تصفح حسب التصنيف</span>
          </h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض جميع التصنيفات ←</a>
        </div>
        <div class="categories-grid stagger-in">
          ${topCategories.map(cat => `
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
        <div class="flash-section">
          <div class="flash-header">
            <div>
              <h2><span class="flash-icon">⚡</span> عروض فلاش</h2>
              <div class="flash-sub">خصومات حصرية لفترة محدودة</div>
            </div>
            <div style="display:flex;align-items:center;gap:var(--sp-5)">
              <div class="flash-timer">
                <div class="timer-block" id="timer-h">08</div>
                <span class="timer-sep">:</span>
                <div class="timer-block" id="timer-m">45</div>
                <span class="timer-sep">:</span>
                <div class="timer-block" id="timer-s">30</div>
              </div>
              <button class="btn btn-brand btn-sm" onclick="Router.navigate('categories')">عرض الكل ←</button>
            </div>
          </div>
          <div class="flash-products stagger-in">
            ${flashProducts.map(p => {
              const discount = Math.round((1 - p.price / p.originalPrice) * 100);
              return `
                <div class="flash-product-card" onclick="Router.navigate('product/${p.id}')">
                  <div class="fp-image">
                    <div class="fp-emoji">${p.image}</div>
                    <div class="fp-discount">-${discount}%</div>
                  </div>
                  <div class="fp-info">
                    <div class="fp-price">${formatPrice(p.price)} <span style="font-size:var(--text-xs)">${STORE.currency}</span></div>
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
          <h2 class="section-title">
            <span class="icon">🔥</span>
            <span class="label">الأكثر مبيعاً</span>
          </h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض الكل ←</a>
        </div>
        <div class="products-grid stagger-in">
          ${popularProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2>🏪 ابدأ بيع منتجاتك الآن</h2>
            <p>انضم إلى أكثر من 500 تاجر في سوق الجمله اليمني وابدأ البيع لجميع المحافظات</p>
            <div style="display:flex;gap:var(--sp-3);flex-wrap:wrap">
              <button class="btn btn-brand btn-lg" onclick="Router.navigate('register')">سجّل كبائع</button>
              <button class="btn btn-outline btn-lg" style="border-color:rgba(255,255,255,0.2);color:var(--clr-text-inverse)">تعرف على المزيد</button>
            </div>
          </div>
          <div class="cta-emoji">🏪</div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🆕</span>
            <span class="label">وصل حديثاً</span>
          </h2>
          <a class="section-more" onclick="Router.navigate('categories')">عرض الكل ←</a>
        </div>
        <div class="products-grid stagger-in">
          ${newProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="section-sm">
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

    <!-- Newsletter -->
    <section class="section">
      <div class="container">
        <div class="newsletter">
          <h2>📧 اشترك في النشرة البريدية</h2>
          <p>احصل على أحدث العروض والمنتجات مباشرة في بريدك</p>
          <div class="newsletter-form">
            <input type="email" placeholder="أدخل بريدك الإلكتروني...">
            <button class="btn btn-primary">اشتراك</button>
          </div>
        </div>
      </div>
    </section>
  `;

  startFlashTimer();
  startPromoTimer();
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

function startPromoTimer() {
  let total = 23 * 3600 + 59 * 60 + 48;
  setInterval(() => {
    if (total <= 0) return;
    total--;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const el = document.getElementById('promo-timer');
    if (el) el.textContent = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }, 1000);
}

// --- Page: Categories ---
function renderCategories() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span class="current">جميع التصنيفات</span>
        </div>
        <h2 class="section-title" style="margin-bottom:var(--sp-8)">
          <span class="icon">📂</span>
          <span class="label">جميع التصنيفات</span>
        </h2>
        <div class="categories-grid stagger-in">
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
  `;
}

// --- Page: Category Products ---
function renderCategory(catId) {
  const content = document.getElementById('app-content');
  const cat = STORE.categories.find(c => c.id == catId);
  if (!cat) { content.innerHTML = '<div class="container"><div class="empty-state"><h3>التصنيف غير موجود</h3></div></div>'; return; }

  const products = STORE.products.filter(p => p.category == catId);
  const subCats = cat.subCategories || [];
  let filteredProducts = [...products];

  function reRender() {
    const grid = document.getElementById('category-products-grid');
    const count = document.getElementById('category-count');
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(renderProductCard).join('')
        : '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📦</div><h3>لا توجد منتجات</h3><p>جرب تصفية أخرى</p></div>';
      count.textContent = filteredProducts.length;
    }
  }

  function sortProducts(sortBy) {
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
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('categories')">التصنيفات</a>
          <span class="sep">←</span>
          <span class="current">${cat.icon} ${cat.name}</span>
        </div>

        ${subCats.length > 0 ? `
          <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;margin-bottom:var(--sp-6)">
            <span class="tag active" onclick="filterBySubCat(this, 'all')">الكل</span>
            ${subCats.slice(0, 15).map(sub => `<span class="tag" onclick="filterBySubCat(this, '${sub}')">${sub}</span>`).join('')}
          </div>
        ` : ''}

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-6);background:var(--clr-bg-elevated);padding:var(--sp-4) var(--sp-5);border-radius:var(--r-xl);border:1px solid var(--clr-border-light);flex-wrap:wrap;gap:var(--sp-3)">
          <div style="font-size:var(--text-sm);color:var(--clr-text-secondary)">
            <span id="category-count">${filteredProducts.length}</span> منتج
          </div>
          <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap">
            <span style="font-size:var(--text-xs);color:var(--clr-text-tertiary);display:flex;align-items:center">ترتيب:</span>
            <button class="tag sort-btn active" data-sort="popular" onclick="sortProducts('popular')">الأكثر طلباً</button>
            <button class="tag sort-btn" data-sort="price-low" onclick="sortProducts('price-low')">السعر: منخفض</button>
            <button class="tag sort-btn" data-sort="price-high" onclick="sortProducts('price-high')">السعر: مرتفع</button>
            <button class="tag sort-btn" data-sort="rating" onclick="sortProducts('rating')">الأعلى تقييماً</button>
            <button class="tag sort-btn" data-sort="newest" onclick="sortProducts('newest')">الأحدث</button>
          </div>
        </div>

        <div id="category-products-grid" class="products-grid stagger-in">
          ${filteredProducts.map(renderProductCard).join('')}
        </div>
      </div>
    </section>
  `;
}

function filterBySubCat(element, subCat) {
  element.parentElement.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
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
  const colors = ['#f0f0f0', '#e8e8e8', '#f5f5f5', '#ececec'];

  content.innerHTML = `
    <section class="product-page">
      <div class="container">
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('category/${product.category}')">${cat ? cat.icon + ' ' + cat.name : ''}</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('category/${product.category}')">${product.subCategory}</a>
          <span class="sep">←</span>
          <span class="current">${product.name.substring(0, 40)}...</span>
        </div>

        <div class="product-detail">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="gallery-main" id="main-image">
              <div class="gallery-emoji">${product.image}</div>
              ${discount > 0 ? `<div style="position:absolute;top:var(--sp-3);right:var(--sp-3);background:var(--clr-accent);color:white;padding:4px 14px;border-radius:var(--r-md);font-weight:800;font-size:var(--text-sm);z-index:2">-${discount}%</div>` : ''}
              <button style="position:absolute;top:var(--sp-3);left:var(--sp-3);width:40px;height:40px;border-radius:var(--r-full);background:var(--clr-bg-elevated);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:var(--shadow-md);z-index:2;cursor:pointer;border:1px solid var(--clr-border-light)" onclick="this.style.color=this.style.color==='red'?'':'red'">♡</button>
            </div>
            <div class="gallery-thumbs">
              ${colors.map((c, i) => `
                <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.gallery-thumb').forEach(t=>t.classList.remove('active'));this.classList.add('active')">
                  ${product.image}
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
              <span style="color:var(--clr-text-tertiary)">${product.reviews.toLocaleString()} تقييم</span>
              <span style="color:var(--clr-brand-dark);font-weight:600">${product.orders.toLocaleString()} طلب</span>
              <span style="color:var(--clr-text-tertiary)">❤️ ${Math.floor(product.orders * 0.3).toLocaleString()} إعجاب</span>
            </div>

            <!-- Price -->
            <div class="price-box">
              <div style="display:flex;align-items:baseline;gap:var(--sp-3);margin-bottom:var(--sp-2)">
                <span class="price-current">${formatPrice(product.price)} <span class="currency">${STORE.currency}</span></span>
                <span class="price-original">${formatPrice(product.originalPrice)} ${STORE.currency}</span>
                <span class="price-discount">-${discount}%</span>
              </div>
              <div class="price-extras">
                <span>💰 وفر ${formatPrice(product.originalPrice - product.price)} ${STORE.currency}</span>
                <span>📦 ${product.price > 50000 ? 'شحن مجاني' : 'شحن: 3,000 ' + STORE.currency}</span>
                <span>⏰ ينتهي خلال 2 يوم</span>
              </div>
            </div>

            <!-- Shipping -->
            <div class="shipping-info">
              <div><span class="label">الشحن:</span> <span class="value free">مجاني</span></div>
              <div><span class="label">التوصيل:</span> <span class="value">7-15 يوم عمل</span></div>
              <div><span class="label">المنشأ:</span> <span class="value">الصين</span></div>
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
              <span style="font-weight:600;font-size:var(--text-sm)">الكمية:</span>
              <div class="quantity-control">
                <button onclick="updateQty(-1)">−</button>
                <input type="number" id="qty-input" value="${quantity}" min="${product.moq}" onchange="validateQty(${product.moq})">
                <button onclick="updateQty(1)">+</button>
              </div>
              <span class="moq-info">الحد الأدنى: ${product.moq} قطع</span>
              <span style="font-size:var(--text-xs);color:var(--clr-text-tertiary);margin-inline-start:auto">${Math.floor(Math.random() * 500) + 100} قطعة متاحة</span>
            </div>

            <!-- Actions -->
            <div class="product-actions">
              <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})" style="flex:2">
                🛒 أضف إلى السلة
              </button>
              <button class="btn btn-brand btn-lg" onclick="buyNow(${product.id})" style="flex:1">
                ⚡ اطلب الآن
              </button>
            </div>

            <!-- Wishlist & Share -->
            <div style="display:flex;gap:var(--sp-5);margin-bottom:var(--sp-5);font-size:var(--text-sm)">
              <a style="color:var(--clr-text-tertiary);cursor:pointer;display:flex;align-items:center;gap:var(--sp-1)">♡ أضف للمفضلة</a>
              <a style="color:var(--clr-text-tertiary);cursor:pointer;display:flex;align-items:center;gap:var(--sp-1)">↗ مشاركة</a>
              <a style="color:var(--clr-text-tertiary);cursor:pointer;display:flex;align-items:center;gap:var(--sp-1)">📊 مقارنة</a>
            </div>

            <!-- Store Info -->
            <div class="store-card">
              <div class="store-avatar">🏪</div>
              <div style="flex:1">
                <div class="store-name">${product.store}</div>
                <div class="store-meta">
                  <span>⭐ ${product.storeBadge}</span>
                  <span>📦 ${Math.floor(Math.random() * 200) + 50} منتج</span>
                  <span>💬 ${Math.floor(Math.random() * 95) + 90}% ردود</span>
                </div>
              </div>
              <button class="btn btn-outline btn-sm">زيارة المتجر</button>
              <button class="btn btn-primary btn-sm">متابعة</button>
            </div>

            <!-- Guarantees -->
            <div class="guarantees">
              <div class="guarantee-item">
                <div class="g-icon">🛡️</div>
                <div class="g-label">ضمان الجودة</div>
              </div>
              <div class="guarantee-item">
                <div class="g-icon">🚚</div>
                <div class="g-label">شحن سريع</div>
              </div>
              <div class="guarantee-item">
                <div class="g-icon">🔄</div>
                <div class="g-label">إرجاع 7 أيام</div>
              </div>
              <div class="guarantee-item">
                <div class="g-icon">💳</div>
                <div class="g-label">دفع آمن</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Specs & Reviews -->
        <div class="product-specs">
          <div class="tabs">
            <div class="tab active" onclick="switchTab(this,'specs-panel')">المواصفات</div>
            <div class="tab" onclick="switchTab(this,'desc-panel')">الوصف</div>
            <div class="tab" onclick="switchTab(this,'reviews-panel')">التقييمات (${product.reviews})</div>
            <div class="tab" onclick="switchTab(this,'shipping-panel')">الشحن والإرجاع</div>
          </div>

          <div id="specs-panel" style="padding-top:var(--sp-6)">
            <div class="specs-table">
              ${Object.entries(product.specs).map(([key, val]) => `
                <div class="spec-row">
                  <div class="spec-label">${key}</div>
                  <div class="spec-value">${val}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div id="desc-panel" class="hidden" style="padding-top:var(--sp-6)">
            <div style="max-width:800px">
              <h3 style="font-size:var(--text-lg);font-weight:700;margin-bottom:var(--sp-4)">${product.name}</h3>
              <p style="font-size:var(--text-base);line-height:2;color:var(--clr-text-secondary);margin-bottom:var(--sp-4)">${product.description}</p>
              <div style="background:var(--clr-brand-glow);border-radius:var(--r-xl);padding:var(--sp-5);margin-top:var(--sp-5)">
                <h4 style="font-weight:700;margin-bottom:var(--sp-3)">✨ مميزات المنتج:</h4>
                <ul style="padding-right:var(--sp-5);color:var(--clr-text-secondary);line-height:2">
                  <li>جودة عالية ومتانة تدوم طويلاً</li>
                  <li>تصميم عصري يناسب جميع الأذواق</li>
                  <li>سهولة الاستخدام والصيانة</li>
                  <li>ضمان شامل على جميع القطع</li>
                  <li>تغليف احترافي وآمن للشحن</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="reviews-panel" class="hidden" style="padding-top:var(--sp-6)">
            <div style="display:flex;gap:var(--sp-10);margin-bottom:var(--sp-6);padding:var(--sp-6);background:var(--clr-bg-sunken);border-radius:var(--r-xl)">
              <div style="text-align:center">
                <div style="font-size:var(--text-4xl);font-weight:900;color:var(--clr-brand-dark)">${product.rating}</div>
                <div class="stars" style="font-size:var(--text-lg)">${generateStars(product.rating)}</div>
                <div style="font-size:var(--text-sm);color:var(--clr-text-tertiary);margin-top:var(--sp-1)">${product.reviews.toLocaleString()} تقييم</div>
              </div>
              <div style="flex:1">
                ${[5,4,3,2,1].map(star => {
                  const pct = star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return `
                    <div style="display:flex;align-items:center;gap:var(--sp-2);margin-bottom:var(--sp-1)">
                      <span style="font-size:var(--text-sm);width:20px">${star}★</span>
                      <div style="flex:1;height:8px;background:var(--clr-border);border-radius:var(--r-full);overflow:hidden">
                        <div style="width:${pct}%;height:100%;background:var(--clr-warning);border-radius:var(--r-full)"></div>
                      </div>
                      <span style="font-size:var(--text-xs);color:var(--clr-text-tertiary);width:30px">${pct}%</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            ${STORE.reviews.map(r => `
              <div class="review-card">
                <div class="review-header">
                  <div class="review-avatar">${r.avatar}</div>
                  <div>
                    <div class="review-name">${r.user}</div>
                    <div class="stars" style="font-size:var(--text-xs)">${generateStars(r.rating)}</div>
                  </div>
                  <div class="review-date">${r.date}</div>
                </div>
                <div class="review-text">${r.text}</div>
                <div style="display:flex;gap:var(--sp-4);margin-top:var(--sp-2);font-size:var(--text-xs);color:var(--clr-text-tertiary)">
                  <a style="cursor:pointer">👍 مفيد (${Math.floor(Math.random() * 20)})</a>
                  <a style="cursor:pointer">💬 رد</a>
                </div>
              </div>
            `).join('')}
          </div>

          <div id="shipping-panel" class="hidden" style="padding-top:var(--sp-6)">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-8)">
              <div>
                <h4 style="font-weight:700;margin-bottom:var(--sp-4)">🚚 معلومات الشحن</h4>
                <div style="font-size:var(--text-sm);color:var(--clr-text-secondary);line-height:2.2">
                  <p>• الشحن المجاني للطلبات فوق 50,000 ${STORE.currency}</p>
                  <p>• وقت التجهيز: 3-5 أيام عمل</p>
                  <p>• وقت التوصيل: 7-15 يوم عمل</p>
                  <p>• الشحن إلى جميع المحافظات اليمنية</p>
                  <p>• تتبع الشحنة عبر رقم التتبع</p>
                </div>
              </div>
              <div>
                <h4 style="font-weight:700;margin-bottom:var(--sp-4)">🔄 سياسة الإرجاع</h4>
                <div style="font-size:var(--text-sm);color:var(--clr-text-secondary);line-height:2.2">
                  <p>• إرجاع مجاني خلال 7 أيام</p>
                  <p>• المنتج يجب أن يكون في حالته الأصلية</p>
                  <p>• استرداد كامل للمبلغ</p>
                  <p>• ضمان استبدال في حال وجود عيب</p>
                  <p>• خدمة عملاء على مدار الساعة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div style="margin-top:var(--sp-10)">
          <div class="section-header">
            <h2 class="section-title"><span class="icon">🔗</span> <span class="label">منتجات مشابهة</span></h2>
            <a class="section-more" onclick="Router.navigate('category/${product.category}')">عرض الكل ←</a>
          </div>
          <div class="products-grid stagger-in">
            ${STORE.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(renderProductCard).join('')}
          </div>
        </div>

        <!-- Recently Viewed -->
        <div style="margin-top:var(--sp-10)">
          <div class="section-header">
            <h2 class="section-title"><span class="icon">👀</span> <span class="label">شاهدت مؤخراً</span></h2>
          </div>
          <div class="products-grid">
            ${STORE.products.slice(0, 4).map(renderProductCard).join('')}
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
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span class="current">سلة المشتريات</span>
        </div>
        <h2 class="section-title" style="margin-bottom:var(--sp-6)">🛒 سلة المشتريات (${STORE.cart.length} منتج)</h2>

        <div class="cart-layout">
          <div class="cart-items">
            ${STORE.cart.map(item => `
              <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
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
              <span style="color:${shipping === 0 ? 'var(--clr-success)' : 'inherit'}">${shipping === 0 ? 'مجاني' : formatPrice(shipping) + ' ' + STORE.currency}</span>
            </div>
            ${shipping === 0 ? '<div style="font-size:var(--text-xs);color:var(--clr-success);margin-bottom:var(--sp-2)">✓ تم تطبيق الشحن المجاني</div>' : ''}
            <div class="summary-row total">
              <span>الإجمالي</span>
              <span>${formatPrice(total)} ${STORE.currency}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg" onclick="Router.navigate('checkout')">
              إتمام الطلب ←
            </button>
            <button class="btn btn-ghost btn-block" onclick="Router.navigate('home')" style="margin-top:var(--sp-2)">
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
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <a onclick="Router.navigate('cart')">السلة</a>
          <span class="sep">←</span>
          <span class="current">إتمام الطلب</span>
        </div>
        <h2 class="section-title" style="margin-bottom:var(--sp-6)">📦 إتمام الطلب</h2>

        <div class="checkout-layout">
          <div>
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
                    <option>صنعاء</option><option>عدن</option><option>تعز</option><option>الحديدة</option>
                    <option>إب</option><option>ذمار</option><option>حضرموت</option><option>مأرب</option>
                    <option>حجة</option><option>لحج</option>
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

            <div class="checkout-section">
              <h3>💳 طريقة الدفع</h3>
              <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
                <label style="display:flex;align-items:center;gap:var(--sp-4);padding:var(--sp-4);border:2px solid var(--clr-brand);border-radius:var(--r-xl);cursor:pointer;background:var(--clr-brand-glow)">
                  <input type="radio" name="payment" checked style="accent-color:var(--clr-brand)">
                  <span style="font-size:24px">💵</span>
                  <div>
                    <div style="font-weight:700">الدفع عند الاستلام</div>
                    <div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">ادفع نقداً عند استلام الطلب</div>
                  </div>
                </label>
                <label style="display:flex;align-items:center;gap:var(--sp-4);padding:var(--sp-4);border:2px solid var(--clr-border);border-radius:var(--r-xl);cursor:pointer">
                  <input type="radio" name="payment" style="accent-color:var(--clr-brand)">
                  <span style="font-size:24px">📱</span>
                  <div>
                    <div style="font-weight:700">محفظة إلكترونية</div>
                    <div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">جوالي كاش، يمن موبايل كاش</div>
                  </div>
                </label>
                <label style="display:flex;align-items:center;gap:var(--sp-4);padding:var(--sp-4);border:2px solid var(--clr-border);border-radius:var(--r-xl);cursor:pointer">
                  <input type="radio" name="payment" style="accent-color:var(--clr-brand)">
                  <span style="font-size:24px">🏦</span>
                  <div>
                    <div style="font-weight:700">تحويل بنكي</div>
                    <div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">تحويل إلى حسابنا البنكي</div>
                  </div>
                </label>
              </div>
            </div>

            <div class="checkout-section">
              <h3>📝 ملاحظات الطلب</h3>
              <textarea rows="3" placeholder="أي ملاحظات أو تعليمات خاصة للطلب..." style="width:100%"></textarea>
            </div>
          </div>

          <div>
            <div class="cart-summary" style="position:sticky;top:120px">
              <h3>ملخص الطلب</h3>
              ${STORE.cart.map(item => `
                <div style="display:flex;gap:var(--sp-3);padding:var(--sp-2) 0;border-bottom:1px solid var(--clr-border-light)">
                  <div style="width:48px;height:48px;border-radius:var(--r-lg);background:var(--clr-bg-sunken);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${item.image}</div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:var(--text-sm);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</div>
                    <div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">× ${item.quantity}</div>
                  </div>
                  <div style="font-weight:700;font-size:var(--text-sm);white-space:nowrap">${formatPrice(item.price * item.quantity)} ${STORE.currency}</div>
                </div>
              `).join('')}
              <div class="summary-row" style="margin-top:var(--sp-3)">
                <span>المجموع الفرعي</span>
                <span>${formatPrice(subtotal)} ${STORE.currency}</span>
              </div>
              <div class="summary-row">
                <span>الشحن</span>
                <span style="color:${shipping === 0 ? 'var(--clr-success)' : 'inherit'}">${shipping === 0 ? 'مجاني' : formatPrice(shipping) + ' ' + STORE.currency}</span>
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
        <p class="auth-sub">مرحباً بك في MARK — سوق الجمله اليمني</p>

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

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-6);font-size:var(--text-sm)">
          <label style="display:flex;align-items:center;gap:var(--sp-2);cursor:pointer">
            <input type="checkbox" style="accent-color:var(--clr-brand)"> تذكرني
          </label>
          <a style="color:var(--clr-brand);cursor:pointer">نسيت كلمة المرور؟</a>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="doLogin()">تسجيل الدخول</button>

        <p style="text-align:center;margin-top:var(--sp-6);font-size:var(--text-sm);color:var(--clr-text-secondary)">
          ليس لديك حساب؟ <a style="color:var(--clr-brand);font-weight:600;cursor:pointer" onclick="Router.navigate('register')">إنشاء حساب جديد</a>
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
        <p class="auth-sub">انضم إلى MARK — سوق الجمله اليمني</p>

        <div style="display:flex;gap:var(--sp-3);margin-bottom:var(--sp-6)">
          <button class="btn btn-outline" style="flex:1" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>{b.classList.remove('btn-primary');b.classList.add('btn-outline')});this.classList.add('btn-primary');this.classList.remove('btn-outline')">
            👤 مشتري
          </button>
          <button class="btn btn-outline" style="flex:1" onclick="this.parentElement.querySelectorAll('.btn').forEach(b=>{b.classList.remove('btn-primary');b.classList.add('btn-outline')});this.classList.add('btn-primary');this.classList.remove('btn-outline')">
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

        <label style="display:flex;align-items:flex-start;gap:var(--sp-2);margin-bottom:var(--sp-6);font-size:var(--text-sm);cursor:pointer">
          <input type="checkbox" style="accent-color:var(--clr-brand);margin-top:3px">
          <span>أوافق على <a style="color:var(--clr-brand)">الشروط والأحكام</a> و<a style="color:var(--clr-brand)">سياسة الخصوصية</a></span>
        </label>

        <button class="btn btn-primary btn-block btn-lg" onclick="doRegister()">إنشاء الحساب</button>

        <p style="text-align:center;margin-top:var(--sp-6);font-size:var(--text-sm);color:var(--clr-text-secondary)">
          لديك حساب بالفعل؟ <a style="color:var(--clr-brand);font-weight:600;cursor:pointer" onclick="Router.navigate('login')">تسجيل الدخول</a>
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
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span class="current">طلباتي</span>
        </div>
        <h2 class="section-title" style="margin-bottom:var(--sp-6)">📦 طلباتي</h2>

        <div class="tabs" style="margin-bottom:var(--sp-6)">
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
                  <span style="margin-inline-start:var(--sp-4);color:var(--clr-text-tertiary)">${order.date}</span>
                </div>
                <span class="status-badge ${status.class}">${status.icon} ${status.label}</span>
              </div>
              <div class="order-body">
                <div class="order-item">
                  <div class="order-item-img">📦</div>
                  <div>
                    <div style="font-weight:500;font-size:var(--text-sm)">${order.items} منتجات</div>
                    <div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">طلب من MARK — سوق الجمله اليمني</div>
                  </div>
                </div>
              </div>
              <div class="order-footer">
                <div>
                  <span style="font-size:var(--text-sm);color:var(--clr-text-tertiary)">الإجمالي: </span>
                  <span class="order-total">${formatPrice(order.total)} ${STORE.currency}</span>
                </div>
                <div style="display:flex;gap:var(--sp-2)">
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

// --- Dashboard Sidebar ---
function renderDashboardSidebar(activeItem) {
  const stats = STORE.merchantStats;
  return `
    <div class="dashboard-sidebar">
      <div class="sidebar-user">
        <div class="user-avatar">🏪</div>
        <div class="user-name">تاجر الجملة</div>
        <div class="user-role">تاجر ذهبي ⭐</div>
        <div style="display:flex;gap:var(--sp-2);margin-top:var(--sp-2);justify-content:center">
          <span class="badge badge-success">متصل</span>
          <span class="badge badge-info">موثق</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <a class="${activeItem === 'dashboard' ? 'active' : ''}" onclick="Router.navigate('dashboard')"><span class="nav-icon">📊</span> لوحة التحكم</a>
        <a class="${activeItem === 'products' ? 'active' : ''}" onclick="Router.navigate('dashboard/products')"><span class="nav-icon">📦</span> المنتجات <span class="nav-badge">${stats.totalProducts}</span></a>
        <a class="${activeItem === 'orders' ? 'active' : ''}" onclick="Router.navigate('dashboard/orders')"><span class="nav-icon">🛒</span> الطلبات <span class="nav-badge">${stats.pendingOrders}</span></a>
        <a class="${activeItem === 'messages' ? 'active' : ''}"><span class="nav-icon">💬</span> الرسائل <span class="nav-badge">5</span></a>
        <a class="${activeItem === 'analytics' ? 'active' : ''}"><span class="nav-icon">📈</span> التحليلات</a>
        <a class="${activeItem === 'earnings' ? 'active' : ''}"><span class="nav-icon">💰</span> الأرباح</a>
        <div style="height:1px;background:var(--clr-border-light);margin:var(--sp-2) 0"></div>
        <a class="${activeItem === 'settings' ? 'active' : ''}"><span class="nav-icon">⚙️</span> الإعدادات</a>
        <a class="${activeItem === 'customize' ? 'active' : ''}"><span class="nav-icon">🎨</span> تخصيص المتجر</a>
        <a class="${activeItem === 'coupons' ? 'active' : ''}"><span class="nav-icon">🏷️</span> العروض والكوبونات</a>
        <a class="${activeItem === 'reviews' ? 'active' : ''}"><span class="nav-icon">⭐</span> التقييمات</a>
        <div style="height:1px;background:var(--clr-border-light);margin:var(--sp-2) 0"></div>
        <a onclick="Router.navigate('home')"><span class="nav-icon">🏪</span> عرض المتجر</a>
      </nav>
    </div>
  `;
}

// --- Page: Dashboard ---
function renderDashboard() {
  const content = document.getElementById('app-content');
  const stats = STORE.merchantStats;
  const salesData = [65, 78, 52, 88, 95, 72, 110, 85, 92, 105, 88, 120];
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const maxSale = Math.max(...salesData);

  content.innerHTML = `
    <div class="dashboard-layout">
      ${renderDashboardSidebar('dashboard')}
      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>لوحة التحكم</h2>
            <p style="color:var(--clr-text-tertiary);font-size:var(--text-sm)">مرحباً بك، تاجر الجملة 👋 آخر تحديث: اليوم 10:45 ص</p>
          </div>
          <div style="display:flex;gap:var(--sp-2)">
            <select style="padding:var(--sp-2) var(--sp-4);border-radius:var(--r-md);border:1px solid var(--clr-border);font-size:var(--text-sm)">
              <option>آخر 7 أيام</option>
              <option selected>آخر 30 يوم</option>
              <option>آخر 3 أشهر</option>
              <option>هذا العام</option>
            </select>
            <button class="btn btn-outline btn-sm">📊 تصدير</button>
            <button class="btn btn-primary btn-sm" onclick="Router.navigate('dashboard/products')">+ إضافة منتج</button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card" style="border-top:3px solid var(--clr-brand)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="stat-label">إجمالي المبيعات</div>
                <div class="stat-value">${formatPrice(stats.totalSales)}</div>
                <div class="stat-change up">↑ ${stats.monthlyGrowth}% هذا الشهر</div>
              </div>
              <div style="background:var(--clr-brand-glow);padding:var(--sp-3);border-radius:var(--r-xl);font-size:24px">💰</div>
            </div>
          </div>
          <div class="stat-card" style="border-top:3px solid var(--clr-info)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="stat-label">إجمالي الطلبات</div>
                <div class="stat-value">${stats.totalOrders.toLocaleString()}</div>
                <div class="stat-change up">↑ 8.3% هذا الشهر</div>
              </div>
              <div style="background:var(--clr-info-soft);padding:var(--sp-3);border-radius:var(--r-xl);font-size:24px">📦</div>
            </div>
          </div>
          <div class="stat-card" style="border-top:3px solid var(--clr-success)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="stat-label">المنتجات النشطة</div>
                <div class="stat-value">${stats.totalProducts}</div>
                <div class="stat-change up">+12 منتج جديد</div>
              </div>
              <div style="background:var(--clr-success-soft);padding:var(--sp-3);border-radius:var(--r-xl);font-size:24px">🛍️</div>
            </div>
          </div>
          <div class="stat-card" style="border-top:3px solid var(--clr-warning)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="stat-label">العملاء</div>
                <div class="stat-value">${stats.totalCustomers.toLocaleString()}</div>
                <div class="stat-change up">↑ 15.2% هذا الشهر</div>
              </div>
              <div style="background:var(--clr-warning-soft);padding:var(--sp-3);border-radius:var(--r-xl);font-size:24px">👥</div>
            </div>
          </div>
        </div>

        <!-- Sales Chart & Order Status -->
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--sp-5);margin-bottom:var(--sp-6)">
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-6);border:1px solid var(--clr-border-light)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-5)">
              <h3 style="font-weight:700">📊 المبيعات الشهرية</h3>
              <div style="display:flex;gap:var(--sp-2)">
                <button class="tag active">شهري</button>
                <button class="tag">أسبوعي</button>
                <button class="tag">يومي</button>
              </div>
            </div>
            <div style="display:flex;align-items:flex-end;gap:var(--sp-2);height:200px;padding-top:var(--sp-5)">
              ${salesData.map((val, i) => `
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:var(--sp-1)">
                  <div style="font-size:10px;color:var(--clr-text-tertiary)">${(val * 1000).toLocaleString()}</div>
                  <div style="width:100%;height:${(val / maxSale) * 150}px;background:${i === salesData.length - 1 ? 'var(--clr-brand)' : 'var(--clr-brand-glow)'};border-radius:var(--r-xs) var(--r-xs) 0 0;transition:all 0.3s;cursor:pointer" onmouseover="this.style.background='var(--clr-brand)'" onmouseout="this.style.background='${i === salesData.length - 1 ? 'var(--clr-brand)' : 'var(--clr-brand-glow)'}'"></div>
                  <div style="font-size:10px;color:var(--clr-text-tertiary)">${months[i].substring(0, 3)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-6);border:1px solid var(--clr-border-light)">
            <h3 style="font-weight:700;margin-bottom:var(--sp-5)">📋 حالة الطلبات</h3>
            <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
              <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3);background:var(--clr-warning-soft);border-radius:var(--r-lg);cursor:pointer" onclick="Router.navigate('dashboard/orders')">
                <div style="font-size:24px">⏳</div>
                <div style="flex:1"><div style="font-weight:600;font-size:var(--text-sm)">في الانتظار</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">يحتاج مراجعة</div></div>
                <div style="font-size:24px;font-weight:900;color:var(--clr-warning)">${stats.pendingOrders}</div>
              </div>
              <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3);background:var(--clr-info-soft);border-radius:var(--r-lg);cursor:pointer" onclick="Router.navigate('dashboard/orders')">
                <div style="font-size:24px">📦</div>
                <div style="flex:1"><div style="font-weight:600;font-size:var(--text-sm)">قيد التجهيز</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">جاري التحضير</div></div>
                <div style="font-size:24px;font-weight:900;color:var(--clr-info)">${stats.processingOrders}</div>
              </div>
              <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3);background:var(--clr-success-soft);border-radius:var(--r-lg);cursor:pointer" onclick="Router.navigate('dashboard/orders')">
                <div style="font-size:24px">🚚</div>
                <div style="flex:1"><div style="font-weight:600;font-size:var(--text-sm)">تم الشحن</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">في الطريق</div></div>
                <div style="font-size:24px;font-weight:900;color:var(--clr-success)">${stats.shippedOrders}</div>
              </div>
              <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3);background:var(--clr-bg-sunken);border-radius:var(--r-lg);cursor:pointer" onclick="Router.navigate('dashboard/orders')">
                <div style="font-size:24px">✅</div>
                <div style="flex:1"><div style="font-weight:600;font-size:var(--text-sm)">تم التوصيل</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">مكتملة</div></div>
                <div style="font-size:24px;font-weight:900;color:var(--clr-text-secondary)">890</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders & Top Products -->
        <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:var(--sp-5)">
          <div class="dashboard-table">
            <div class="dashboard-table-header">
              <h3>🛒 آخر الطلبات</h3>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard/orders')">عرض الكل ←</button>
            </div>
            <div class="table-wrapper">
              <table>
                <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المبلغ</th><th>الحالة</th><th>إجراءات</th></tr></thead>
                <tbody>
                  ${STORE.orders.slice(0, 5).map(order => {
                    const sm = { pending: { label: 'في الانتظار', class: 'pending', icon: '⏳' }, processing: { label: 'قيد التجهيز', class: 'processing', icon: '📦' }, shipped: { label: 'تم الشحن', class: 'shipped', icon: '🚚' }, delivered: { label: 'تم التوصيل', class: 'delivered', icon: '✅' } };
                    const status = sm[order.status];
                    const customers = ['أحمد محمد', 'سارة علي', 'خالد حسن', 'فاطمة أحمد', 'محمد اليمن'];
                    const i = STORE.orders.indexOf(order);
                    return `<tr>
                      <td style="font-weight:600;font-size:var(--text-sm)">${order.id}</td>
                      <td><div style="display:flex;align-items:center;gap:var(--sp-2)"><div style="width:32px;height:32px;border-radius:var(--r-full);background:var(--clr-brand-glow);display:flex;align-items:center;justify-content:center;font-size:var(--text-xs);font-weight:700;color:var(--clr-brand-dark)">${customers[i].charAt(0)}</div><span style="font-size:var(--text-sm)">${customers[i]}</span></div></td>
                      <td style="font-weight:700;font-size:var(--text-sm)">${formatPrice(order.total)} ${STORE.currency}</td>
                      <td><span class="status-badge ${status.class}">${status.icon} ${status.label}</span></td>
                      <td><button class="btn btn-ghost btn-sm" onclick="showOrderDetail('${order.id}')">👁️</button></td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);border:1px solid var(--clr-border-light);overflow:hidden">
            <div style="padding:var(--sp-4) var(--sp-5);border-bottom:1px solid var(--clr-border-light);display:flex;justify-content:space-between;align-items:center">
              <h3 style="font-weight:700;font-size:var(--text-base)">🔥 الأكثر مبيعاً</h3>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('dashboard/products')">عرض الكل</button>
            </div>
            ${STORE.products.slice(0, 5).map((p, i) => `
              <div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3) var(--sp-5);border-bottom:1px solid var(--clr-border-light);cursor:pointer;transition:background var(--t-fast)" onmouseover="this.style.background='var(--clr-surface-hover)'" onmouseout="this.style.background=''" onclick="Router.navigate('product/${p.id}')">
                <div style="width:24px;height:24px;border-radius:var(--r-full);background:${i < 3 ? 'var(--clr-brand)' : 'var(--clr-border-strong)'};color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${i + 1}</div>
                <div style="width:40px;height:40px;border-radius:var(--r-lg);background:var(--clr-bg-sunken);display:flex;align-items:center;justify-content:center;font-size:20px">${p.image}</div>
                <div style="flex:1;min-width:0"><div style="font-size:var(--text-sm);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div><div style="font-size:11px;color:var(--clr-text-tertiary)">${p.orders.toLocaleString()} طلب</div></div>
                <div style="font-weight:700;font-size:var(--text-sm);color:var(--clr-brand-dark)">${formatPrice(p.price)} ${STORE.currency}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- Page: Dashboard Products ---
function renderDashboardProducts() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div class="dashboard-layout">
      ${renderDashboardSidebar('products')}
      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>إدارة المنتجات</h2>
            <p style="color:var(--clr-text-tertiary);font-size:var(--text-sm)">${STORE.merchantStats.totalProducts} منتج نشط</p>
          </div>
          <div style="display:flex;gap:var(--sp-2)">
            <button class="btn btn-outline btn-sm">📥 استيراد</button>
            <button class="btn btn-primary btn-sm" onclick="showAddProductModal()">+ إضافة منتج جديد</button>
          </div>
        </div>

        <div style="display:flex;gap:var(--sp-3);margin-bottom:var(--sp-5);flex-wrap:wrap">
          <input type="text" placeholder="🔍 بحث في المنتجات..." style="flex:1;min-width:200px;padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)">
          <select style="padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)">
            <option>جميع التصنيفات</option>
            ${STORE.categories.slice(0, 10).map(c => `<option>${c.name}</option>`).join('')}
          </select>
          <select style="padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)">
            <option>جميع الحالات</option><option>نشط</option><option>غير نشط</option><option>نفذ من المخزون</option>
          </select>
        </div>

        <div class="dashboard-table">
          <div class="dashboard-table-header">
            <div style="display:flex;gap:var(--sp-3);align-items:center">
              <label style="display:flex;align-items:center;gap:var(--sp-2);font-size:var(--text-sm);cursor:pointer"><input type="checkbox" style="accent-color:var(--clr-brand)"> تحديد الكل</label>
              <span style="color:var(--clr-text-tertiary)">|</span>
              <button class="btn btn-ghost btn-sm" style="color:var(--clr-danger)">🗑️ حذف المحدد</button>
            </div>
            <div style="font-size:var(--text-sm);color:var(--clr-text-tertiary)">عرض 1-8 من ${STORE.merchantStats.totalProducts}</div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead><tr><th style="width:40px"><input type="checkbox" style="accent-color:var(--clr-brand)"></th><th>المنتج</th><th>التصنيف</th><th>السعر</th><th>المخزون</th><th>المبيعات</th><th>التقييم</th><th>الحالة</th><th>إجراءات</th></tr></thead>
              <tbody>
                ${STORE.products.slice(0, 8).map(p => {
                  const stock = Math.floor(Math.random() * 500) + 50;
                  return `<tr>
                    <td><input type="checkbox" style="accent-color:var(--clr-brand)"></td>
                    <td><div style="display:flex;align-items:center;gap:var(--sp-3)"><div style="width:48px;height:48px;border-radius:var(--r-lg);background:var(--clr-bg-sunken);display:flex;align-items:center;justify-content:center;font-size:24px">${p.image}</div><div><div style="font-weight:600;font-size:var(--text-sm);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div><div style="font-size:11px;color:var(--clr-text-tertiary)">SKU: ${p.id} • ${p.store}</div></div></div></td>
                    <td><span class="badge badge-info">${p.subCategory}</span></td>
                    <td><div style="font-weight:700">${formatPrice(p.price)} ${STORE.currency}</div><div style="font-size:11px;color:var(--clr-text-tertiary);text-decoration:line-through">${formatPrice(p.originalPrice)}</div></td>
                    <td><span class="badge ${stock > 100 ? 'badge-success' : stock > 20 ? 'badge-warning' : 'badge-danger'}">${stock}</span></td>
                    <td style="font-weight:600">${p.orders.toLocaleString()}</td>
                    <td><div style="display:flex;align-items:center;gap:var(--sp-1)"><span style="color:var(--clr-warning)">★</span><span style="font-weight:600">${p.rating}</span></div></td>
                    <td><span class="status-badge delivered">نشط</span></td>
                    <td><div style="display:flex;gap:var(--sp-1)"><button class="btn btn-ghost btn-sm" title="تعديل">✏️</button><button class="btn btn-ghost btn-sm" title="عرض" onclick="Router.navigate('product/${p.id}')">👁️</button><button class="btn btn-ghost btn-sm" style="color:var(--clr-danger)" title="حذف">🗑️</button></div></td>
                  </tr>`;
                }).join('')}
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

function showAddProductModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal" style="max-width:600px">
      <div class="modal-header">
        <h3>➕ إضافة منتج جديد</h3>
        <button style="background:none;border:none;font-size:24px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group"><label>اسم المنتج</label><input type="text" placeholder="أدخل اسم المنتج" style="width:100%"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4)">
          <div class="form-group"><label>التصنيف</label><select style="width:100%">${STORE.categories.slice(0, 10).map(c => `<option>${c.name}</option>`).join('')}</select></div>
          <div class="form-group"><label>القسم الفرعي</label><input type="text" placeholder="أدخل القسم الفرعي" style="width:100%"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4)">
          <div class="form-group"><label>السعر</label><input type="number" placeholder="0" style="width:100%"></div>
          <div class="form-group"><label>السعر الأصلي</label><input type="number" placeholder="0" style="width:100%"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4)">
          <div class="form-group"><label>الحد الأدنى للطلب</label><input type="number" placeholder="1" style="width:100%"></div>
          <div class="form-group"><label>المخزون</label><input type="number" placeholder="0" style="width:100%"></div>
        </div>
        <div class="form-group"><label>الوصف</label><textarea rows="3" placeholder="وصف المنتج..." style="width:100%"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove();showToast('تم إضافة المنتج بنجاح')">حفظ المنتج</button>
        <button class="btn btn-ghost" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// --- Page: Dashboard Orders ---
function renderDashboardOrders() {
  const content = document.getElementById('app-content');
  const stats = STORE.merchantStats;

  content.innerHTML = `
    <div class="dashboard-layout">
      ${renderDashboardSidebar('orders')}
      <div class="dashboard-content">
        <div class="dashboard-header">
          <div>
            <h2>إدارة الطلبات</h2>
            <p style="color:var(--clr-text-tertiary);font-size:var(--text-sm)">${stats.totalOrders} إجمالي الطلبات</p>
          </div>
          <div style="display:flex;gap:var(--sp-2)">
            <button class="btn btn-outline btn-sm">📥 تصدير Excel</button>
            <button class="btn btn-outline btn-sm">🖨️ طباعة</button>
          </div>
        </div>

        <!-- Order Stats -->
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--sp-3);margin-bottom:var(--sp-6)">
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:1px solid var(--clr-border-light);text-align:center;cursor:pointer"><div style="font-size:var(--text-sm);color:var(--clr-text-tertiary)">الكل</div><div style="font-size:var(--text-2xl);font-weight:900">${stats.totalOrders}</div></div>
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:2px solid var(--clr-warning);text-align:center;cursor:pointer"><div style="font-size:var(--text-sm);color:var(--clr-warning)">⏳ في الانتظار</div><div style="font-size:var(--text-2xl);font-weight:900;color:var(--clr-warning)">${stats.pendingOrders}</div></div>
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:2px solid var(--clr-info);text-align:center;cursor:pointer"><div style="font-size:var(--text-sm);color:var(--clr-info)">📦 قيد التجهيز</div><div style="font-size:var(--text-2xl);font-weight:900;color:var(--clr-info)">${stats.processingOrders}</div></div>
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:2px solid var(--clr-success);text-align:center;cursor:pointer"><div style="font-size:var(--text-sm);color:var(--clr-success)">🚚 تم الشحن</div><div style="font-size:var(--text-2xl);font-weight:900;color:var(--clr-success)">${stats.shippedOrders}</div></div>
          <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:1px solid var(--clr-border-light);text-align:center;cursor:pointer"><div style="font-size:var(--text-sm);color:var(--clr-text-tertiary)">✅ تم التوصيل</div><div style="font-size:var(--text-2xl);font-weight:900">890</div></div>
        </div>

        <div style="background:var(--clr-bg-elevated);border-radius:var(--r-xl);padding:var(--sp-4);border:1px solid var(--clr-border-light);margin-bottom:var(--sp-5);display:flex;gap:var(--sp-3);flex-wrap:wrap;align-items:center">
          <input type="text" placeholder="🔍 بحث برقم الطلب، اسم العميل..." style="flex:1;min-width:250px;padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)">
          <select style="padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)"><option>جميع الحالات</option><option>في الانتظار</option><option>قيد التجهيز</option><option>تم الشحن</option><option>تم التوصيل</option></select>
          <select style="padding:var(--sp-3) var(--sp-4);border:1px solid var(--clr-border);border-radius:var(--r-md);font-size:var(--text-sm)"><option>جميع التواريخ</option><option>اليوم</option><option>آخر 7 أيام</option><option>آخر 30 يوم</option></select>
          <button class="btn btn-primary btn-sm">🔍 بحث</button>
        </div>

        <div class="dashboard-table">
          <div class="dashboard-table-header">
            <div style="display:flex;gap:var(--sp-3);align-items:center">
              <label style="display:flex;align-items:center;gap:var(--sp-2);font-size:var(--text-sm);cursor:pointer"><input type="checkbox" style="accent-color:var(--clr-brand)"> تحديد الكل</label>
              <span style="color:var(--clr-text-tertiary)">|</span>
              <button class="btn btn-ghost btn-sm" style="color:var(--clr-success)">✅ قبول المحدد</button>
              <button class="btn btn-ghost btn-sm" style="color:var(--clr-danger)">❌ إلغاء المحدد</button>
            </div>
            <div style="font-size:var(--text-sm);color:var(--clr-text-tertiary)">عرض 1-${Math.min(10, stats.totalOrders)} من ${stats.totalOrders}</div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead><tr><th style="width:40px"><input type="checkbox" style="accent-color:var(--clr-brand)"></th><th>رقم الطلب</th><th>العميل</th><th>المنتجات</th><th>المبلغ</th><th>طريقة الدفع</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th></tr></thead>
              <tbody>
                ${STORE.orders.map(order => {
                  const sm = { pending: { label: 'في الانتظار', class: 'pending', icon: '⏳' }, processing: { label: 'قيد التجهيز', class: 'processing', icon: '📦' }, shipped: { label: 'تم الشحن', class: 'shipped', icon: '🚚' }, delivered: { label: 'تم التوصيل', class: 'delivered', icon: '✅' }, cancelled: { label: 'ملغي', class: 'cancelled', icon: '❌' } };
                  const status = sm[order.status];
                  const payments = ['الدفع عند الاستلام', 'محفظة إلكترونية', 'تحويل بنكي'];
                  const customers = ['أحمد محمد', 'سارة علي', 'خالد حسن', 'فاطمة أحمد'];
                  const phones = ['777123456', '733987654', '712345678', '788765432'];
                  const cities = ['صنعاء', 'عدن', 'تعز', 'الحديدة'];
                  const i = STORE.orders.indexOf(order);
                  return `<tr>
                    <td><input type="checkbox" style="accent-color:var(--clr-brand)"></td>
                    <td><div style="font-weight:700;color:var(--clr-brand-dark)">${order.id}</div></td>
                    <td><div style="display:flex;align-items:center;gap:var(--sp-3)"><div style="width:36px;height:36px;border-radius:var(--r-full);background:var(--clr-brand-glow);display:flex;align-items:center;justify-content:center;font-size:var(--text-sm);font-weight:700;color:var(--clr-brand-dark)">${customers[i].charAt(0)}</div><div><div style="font-weight:600;font-size:var(--text-sm)">${customers[i]}</div><div style="font-size:11px;color:var(--clr-text-tertiary)">📱 ${phones[i]} • 📍 ${cities[i]}</div></div></div></td>
                    <td><div style="display:flex;align-items:center;gap:var(--sp-2)"><div style="font-weight:600">${order.items}</div><div style="font-size:11px;color:var(--clr-text-tertiary)">منتج</div></div></td>
                    <td><div style="font-weight:800;font-size:var(--text-sm);color:var(--clr-accent)">${formatPrice(order.total)} ${STORE.currency}</div></td>
                    <td><div style="font-size:var(--text-xs);display:flex;align-items:center;gap:var(--sp-1)">${payments[i % 3] === 'الدفع عند الاستلام' ? '💵' : payments[i % 3] === 'محفظة إلكترونية' ? '📱' : '🏦'} ${payments[i % 3]}</div></td>
                    <td><span class="status-badge ${status.class}">${status.icon} ${status.label}</span></td>
                    <td><div style="font-size:var(--text-sm)">${order.date}</div></td>
                    <td><div style="display:flex;gap:var(--sp-1);flex-wrap:wrap">
                      <button class="btn btn-ghost btn-sm" onclick="showOrderDetail('${order.id}')">👁️</button>
                      ${order.status === 'pending' ? '<button class="btn btn-success btn-sm" onclick="updateOrderStatus(\'' + order.id + '\', \'processing\')">✅</button>' : ''}
                      ${order.status === 'processing' ? '<button class="btn btn-primary btn-sm" onclick="updateOrderStatus(\'' + order.id + '\', \'shipped\')">🚚</button>' : ''}
                      ${order.status === 'shipped' ? '<button class="btn btn-success btn-sm" onclick="updateOrderStatus(\'' + order.id + '\', \'delivered\')">✅</button>' : ''}
                      ${order.status === 'pending' ? '<button class="btn btn-danger btn-sm" onclick="updateOrderStatus(\'' + order.id + '\', \'cancelled\')">❌</button>' : ''}
                    </div></td>
                  </tr>`;
                }).join('')}
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
          <button class="page-btn">45</button>
          <button class="page-btn">→</button>
        </div>
      </div>
    </div>
  `;
}

function showOrderDetail(orderId) {
  const order = STORE.orders.find(o => o.id === orderId);
  if (!order) return;
  const sm = { pending: { label: 'في الانتظار', class: 'pending', icon: '⏳' }, processing: { label: 'قيد التجهيز', class: 'processing', icon: '📦' }, shipped: { label: 'تم الشحن', class: 'shipped', icon: '🚚' }, delivered: { label: 'تم التوصيل', class: 'delivered', icon: '✅' } };
  const status = sm[order.status];

  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal" style="max-width:700px">
      <div class="modal-header">
        <h3>📋 تفاصيل الطلب ${order.id}</h3>
        <button style="background:none;border:none;font-size:24px;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4);margin-bottom:var(--sp-5)">
          <div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">العميل</div><div style="font-weight:600">أحمد محمد</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">📱 777123456</div></div>
          <div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">العنوان</div><div style="font-weight:600">صنعاء، شارع الستين</div></div>
          <div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">طريقة الدفع</div><div style="font-weight:600">💵 الدفع عند الاستلام</div></div>
          <div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">الحالة</div><span class="status-badge ${status.class}">${status.icon} ${status.label}</span></div>
        </div>
        <h4 style="font-weight:700;margin-bottom:var(--sp-3)">📦 المنتجات</h4>
        ${STORE.products.slice(0, order.items).map(p => `
          <div style="display:flex;gap:var(--sp-3);padding:var(--sp-3);background:var(--clr-bg-sunken);border-radius:var(--r-lg);margin-bottom:var(--sp-2)">
            <div style="width:48px;height:48px;border-radius:var(--r-lg);background:var(--clr-border-light);display:flex;align-items:center;justify-content:center;font-size:24px">${p.image}</div>
            <div style="flex:1"><div style="font-weight:500;font-size:var(--text-sm)">${p.name.substring(0, 50)}...</div><div style="font-size:var(--text-xs);color:var(--clr-text-tertiary)">الكمية: ${p.moq}</div></div>
            <div style="font-weight:700">${formatPrice(p.price * p.moq)} ${STORE.currency}</div>
          </div>
        `).join('')}
        <div style="border-top:2px solid var(--clr-border);margin-top:var(--sp-4);padding-top:var(--sp-4)">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--sp-2);font-size:var(--text-sm)"><span>المجموع الفرعي</span><span>${formatPrice(order.total - 3000)} ${STORE.currency}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--sp-2);font-size:var(--text-sm)"><span>الشحن</span><span style="color:var(--clr-success)">مجاني</span></div>
          <div style="display:flex;justify-content:space-between;font-size:var(--text-xl);font-weight:800;color:var(--clr-accent);border-top:1px solid var(--clr-border);padding-top:var(--sp-2)"><span>الإجمالي</span><span>${formatPrice(order.total)} ${STORE.currency}</span></div>
        </div>
      </div>
      <div class="modal-footer">
        ${order.status === 'pending' ? '<button class="btn btn-success" onclick="updateOrderStatus(\'' + order.id + '\', \'processing\');this.closest(\'.modal-overlay\').remove()">✅ قبول الطلب</button>' : ''}
        ${order.status === 'processing' ? '<button class="btn btn-primary" onclick="updateOrderStatus(\'' + order.id + '\', \'shipped\');this.closest(\'.modal-overlay\').remove()">🚚 شحن الطلب</button>' : ''}
        <button class="btn btn-ghost" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function updateOrderStatus(orderId, newStatus) {
  const order = STORE.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    const labels = { processing: 'تم قبول الطلب', shipped: 'تم شحن الطلب', delivered: 'تم توصيل الطلب', cancelled: 'تم إلغاء الطلب' };
    showToast(labels[newStatus] || 'تم تحديث الحالة', 'success');
    renderDashboardOrders();
  }
}

// --- Page: Search ---
function renderSearch(query) {
  const content = document.getElementById('app-content');
  const results = STORE.products.filter(p =>
    p.name.includes(query) || p.subCategory.includes(query) || p.description.includes(query)
  );

  content.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="breadcrumb">
          <a onclick="Router.navigate('home')">الرئيسية</a>
          <span class="sep">←</span>
          <span class="current">نتائج البحث: "${query}"</span>
        </div>
        <h2 class="section-title" style="margin-bottom:var(--sp-6)">🔍 نتائج البحث عن "${query}"</h2>
        <p style="color:var(--clr-text-tertiary);margin-bottom:var(--sp-6)">${results.length} نتيجة</p>
        <div class="products-grid stagger-in">
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
  buildCategoriesMegaMenu();

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

  Router.init();
  updateCartBadge();
}

document.addEventListener('DOMContentLoaded', initApp);
