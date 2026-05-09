// ===== سوق الجمله اليمني - Data Store =====

const STORE = {
  name: 'سوق الجمله اليمني',
  nameEn: 'Yemeni Wholesale Market',
  currency: '﷼',
  currencyEn: 'YER',

  categories: [
    { id: 1, name: 'إلكترونيات', icon: '📱', count: 1250 },
    { id: 2, name: 'أزياء وموضة', icon: '👗', count: 3400 },
    { id: 3, name: 'منزل ومطبخ', icon: '🏠', count: 890 },
    { id: 4, name: 'صحة وجمال', icon: '💄', count: 1100 },
    { id: 5, name: 'رياضة و outdoors', icon: '⚽', count: 670 },
    { id: 6, name: 'ألعاب وأطفال', icon: '🧸', count: 540 },
    { id: 7, name: 'سيارات وقطع غيار', icon: '🚗', count: 430 },
    { id: 8, name: 'أدوات ومعدات', icon: '🔧', count: 780 },
    { id: 9, name: 'مجوهرات وإكسسوارات', icon: '💍', count: 920 },
    { id: 10, name: 'حقائب وأحذية', icon: '👜', count: 1560 },
    { id: 11, name: 'كتب وقرطاسية', icon: '📚', count: 340 },
    { id: 12, name: 'أثاث ومفروشات', icon: '🛋️', count: 450 },
  ],

  subCategories: {
    1: ['هواتف ذكية', 'لابتوبات', 'سماعات', 'ساعات ذكية', 'كاميرات', 'شاشات', 'أجهزة لوحية', 'ملحقات'],
    2: ['ملابس رجالية', 'ملابس نسائية', 'ملابس أطفال', 'عبايات', 'ملابس داخلية', 'أزياء رياضية'],
    3: ['أواني طبخ', 'أجهزة منزلية', 'تخزين', 'ديكور', 'إضاءة', 'أدوات تنظيف'],
    4: ['مكياج', 'عناية بالبشرة', 'عطور', 'عناية بالشعر', 'أدوات تجميل'],
  },

  products: [
    {
      id: 1001, name: 'هاتف ذكي Xiaomi Redmi Note 13 Pro - شاشة AMOLED 6.67 بوصة - كاميرا 200 ميجا بيكسل',
      category: 1, subCategory: 'هواتف ذكية', price: 45000, originalPrice: 65000,
      image: '📱', rating: 4.7, reviews: 2340, orders: 5600,
      store: 'TechWorld Store', storeBadge: 'متجر ذهبي', moq: 2,
      variants: { 'اللون': ['أسود', 'أبيض', 'أزرق', 'أخضر'], 'الذاكرة': ['128GB', '256GB', '512GB'] },
      specs: { 'العلامة التجارية': 'Xiaomi', 'الشاشة': '6.67" AMOLED', 'المعالج': 'Snapdragon 7s Gen 2', 'البطارية': '5100mAh', 'نظام التشغيل': 'Android 14' },
      description: 'هاتف ذكي بمواصفات عالية وكاميرا احترافية. شاشة AMOLED بدقة عالية ومعالج قوي للأداء المتميز.',
      soldPercent: 78
    },
    {
      id: 1002, name: 'لابتوب Lenovo IdeaPad 3 - معالج Intel Core i5 - ذاكرة 8GB - SSD 512GB',
      category: 1, subCategory: 'لابتوبات', price: 120000, originalPrice: 165000,
      image: '💻', rating: 4.5, reviews: 890, orders: 2100,
      store: 'Digital Hub', storeBadge: 'بائع معتمد', moq: 1,
      variants: { 'المعالج': ['i3', 'i5', 'i7'], 'الذاكرة': ['8GB', '16GB', '32GB'] },
      specs: { 'العلامة التجارية': 'Lenovo', 'الشاشة': '15.6" FHD', 'المعالج': 'Intel Core i5-1235U', 'التخزين': '512GB SSD', 'نظام التشغيل': 'Windows 11' },
      description: 'لابتوب مثالي للعمل والدراسة. أداء قوي وتصميم أنيق.',
      soldPercent: 65
    },
    {
      id: 1003, name: 'سماعات لاسلكية TWS بلوتوث 5.3 - إلغاء ضوضاء نشط - مقاومة للماء IPX5',
      category: 1, subCategory: 'سماعات', price: 8500, originalPrice: 15000,
      image: '🎧', rating: 4.3, reviews: 5670, orders: 12000,
      store: 'Audio Pro', storeBadge: 'متجر ذهبي', moq: 5,
      variants: { 'اللون': ['أسود', 'أبيض', 'وردي'], 'النوع': ['عادية', 'Pro'] },
      specs: { 'العلامة التجارية': 'Generic', 'الإصدار': 'Bluetooth 5.3', 'البطارية': '6 ساعات', 'المقاومة': 'IPX5' },
      description: 'سماعات لاسلكية بجودة صوت عالية وإلغاء ضوضاء نشط.',
      soldPercent: 88
    },
    {
      id: 1004, name: 'ساعة ذكية Smart Watch - مراقبة صحة القلب - تتبع الرياضة - شاشة 1.43 بوصة',
      category: 1, subCategory: 'ساعات ذكية', price: 12000, originalPrice: 22000,
      image: '⌚', rating: 4.4, reviews: 3200, orders: 7800,
      store: 'GadgetZone', storeBadge: 'بائع مميز', moq: 3,
      variants: { 'اللون': ['أسود', 'فضي', 'ذهبي'], 'السوار': ['سيليكون', 'معدن', 'جلد'] },
      specs: { 'الشاشة': '1.43" AMOLED', 'البطارية': '7 أيام', 'المقاومة': 'IP68', 'الميزات': '心跳, SpO2, نوم' },
      description: 'ساعة ذكية متعددة الميزات لمراقبة صحتك ونشاطك اليومي.',
      soldPercent: 72
    },
    {
      id: 2001, name: 'عباية نسائية فاخرة - قماش كريب ياباني - تطريز يدوي - تصميم عصري',
      category: 2, subCategory: 'عبايات', price: 18000, originalPrice: 28000,
      image: '🧕', rating: 4.8, reviews: 1560, orders: 4200,
      store: 'أزياء الخليج', storeBadge: 'متجر ذهبي', moq: 2,
      variants: { 'المقاس': ['S', 'M', 'L', 'XL', 'XXL'], 'اللون': ['أسود', 'كحلي', 'بنفسجي'] },
      specs: { 'الخامة': 'كريب ياباني', 'التطريز': 'يدوي', 'التصميم': 'عصري', 'المنشأ': 'الإمارات' },
      description: 'عباية فاخرة بتطريز يدوي وتصميم عصري يناسب جميع المناسبات.',
      soldPercent: 82
    },
    {
      id: 2002, name: 'فستان نسائي صيفي - قماش خفيف - طباعة زهور - multiple ألوان',
      category: 2, subCategory: 'ملابس نسائية', price: 9500, originalPrice: 16000,
      image: '👗', rating: 4.6, reviews: 2100, orders: 5800,
      store: 'Fashion House', storeBadge: 'بائع معتمد', moq: 3,
      variants: { 'المقاس': ['S', 'M', 'L', 'XL'], 'اللون': ['أحمر', 'أزرق', 'أخضر', 'أصفر'] },
      specs: { 'الخامة': 'قطن 100%', 'التصميم': 'صيفي خفيف', 'الطول': 'متوسط' },
      description: 'فستان صيفي أنيق بطباعة زهور وقماش خفيف ومريح.',
      soldPercent: 69
    },
    {
      id: 2003, name: 'ثوب رجالي قطن مصري فاخر - تصميم كلاسيكي - multiple ألوان',
      category: 2, subCategory: 'ملابس رجالية', price: 14000, originalPrice: 20000,
      image: '👔', rating: 4.7, reviews: 980, orders: 3100,
      store: 'رجال الأناقة', storeBadge: 'متجر ذهبي', moq: 2,
      variants: { 'المقاس': ['M', 'L', 'XL', 'XXL', '3XL'], 'اللون': ['أبيض', 'بيج', 'رمادي'] },
      specs: { 'الخامة': 'قطن مصري 100%', 'التصميم': 'كلاسيكي', 'المناسبات': 'يومي / رسمي' },
      description: 'ثوب رجالي فاخر بقماش قطن مصري عالي الجودة.',
      soldPercent: 55
    },
    {
      id: 3001, name: 'طقم أواني طبخ ستانلس ستيل 10 قطع - غير لاصق - مناسب لجميع المواقد',
      category: 3, subCategory: 'أواني طبخ', price: 35000, originalPrice: 55000,
      image: '🍳', rating: 4.6, reviews: 1890, orders: 4500,
      store: 'مطبخك', storeBadge: 'بائع معتمد', moq: 1,
      variants: { 'العدد': ['7 قطع', '10 قطع', '15 قطع'] },
      specs: { 'المادة': 'ستانلس ستيل 304', 'الطلاء': 'غير لاصق', 'الموقد': 'جميع المواقد', 'الغسالة': 'آمنة' },
      description: 'طقم أواني طبخ عالي الجودة بطلاء غير لاصق ومتانة عالية.',
      soldPercent: 74
    },
    {
      id: 3002, name: 'خلاط كهربائي متعدد الاستخدامات - 1000 واط - 5 سرعات - مطحنة',
      category: 3, subCategory: 'أجهزة منزلية', price: 22000, originalPrice: 32000,
      image: '🔌', rating: 4.4, reviews: 1200, orders: 2800,
      store: 'أجهزة المنزل', storeBadge: 'متجر ذهبي', moq: 2,
      variants: { 'اللون': ['أحمر', 'أسود', 'فضي'] },
      specs: { 'القوة': '1000 واط', 'السرعات': '5 سرعات + نبض', 'السعة': '1.5 لتر', 'الملحقات': 'مطحنة + تقطيع' },
      description: 'خلاط متعدد الاستخدامات بقوة 1000 واط لجميع احتياجات المطبخ.',
      soldPercent: 61
    },
    {
      id: 4001, name: 'طقم مكياج احترافي 24 قظة - ظلال عيون + ألوان شفاه + بودرة + فرش',
      category: 4, subCategory: 'مكياج', price: 15000, originalPrice: 25000,
      image: '💄', rating: 4.5, reviews: 3400, orders: 8900,
      store: 'Beauty World', storeBadge: 'متجر ذهبي', moq: 5,
      variants: { 'الطقم': ['أساسي', 'احترافي', 'فاخر'] },
      specs: { 'عدد القطع': '24', 'النوع': 'طقم مكياج كامل', 'مناسب': 'جميع أنواع البشرة' },
      description: 'طقم مكياج احترافي متكامل بألوان عصرية وفرش عالية الجودة.',
      soldPercent: 91
    },
    {
      id: 4002, name: 'كريم ترطيب البشرة بخلاصة الصبار - 200مل - مرطب عميق',
      category: 4, subCategory: 'عناية بالبشرة', price: 4500, originalPrice: 8000,
      image: '🧴', rating: 4.7, reviews: 5600, orders: 14000,
      store: 'Skin Care Plus', storeBadge: 'بائع معتمد', moq: 10,
      variants: { 'الحجم': ['100مل', '200مل', '500مل'] },
      specs: { 'المادة الفعالة': 'خلاصة الصبار', 'النوع': 'مرطب عميق', 'مناسب': 'جميع أنواع البشرة' },
      description: 'كريم ترطيب عميق بخلاصة الصبار الطبيعي لنعومة وترطيب يدوم طويلاً.',
      soldPercent: 85
    },
    {
      id: 5001, name: 'دراجة هوائية جبلية 21 سرعة - إطارات 26 بوصة - هيكل ألومنيوم',
      category: 5, subCategory: 'دراجات', price: 85000, originalPrice: 120000,
      image: '🚲', rating: 4.3, reviews: 670, orders: 1200,
      store: 'Sports World', storeBadge: 'بائع مميز', moq: 1,
      variants: { 'اللون': ['أحمر', 'أزرق', 'أسود'] },
      specs: { 'السرعات': '21 سرعة', 'الإطارات': '26 بوصة', 'الهيكل': 'ألومنيوم', 'الفرامل': 'قرصية' },
      description: 'دراجة هوائية جبلية متينة بـ 21 سرعة وفرامل قرصية.',
      soldPercent: 45
    },
    {
      id: 6001, name: 'لعبة بناء ذهنية 500 قطعة - تنمي المهارات - مناسبة لعمر 6+',
      category: 6, subCategory: 'ألعاب تعليمية', price: 7500, originalPrice: 12000,
      image: '🧩', rating: 4.8, reviews: 2100, orders: 5600,
      store: 'Toy Land', storeBadge: 'متجر ذهبي', moq: 5,
      variants: { 'العدد': ['200 قطعة', '500 قطعة', '1000 قطعة'] },
      specs: { 'عدد القطع': '500', 'العمر': '6+', 'المادة': 'بلاستيك آمن', 'النوع': 'بناء ذهني' },
      description: 'لعبة بناء ذهنية تنمي الإبداع والمهارات الحركية الدقيقة.',
      soldPercent: 76
    },
    {
      id: 7001, name: 'إطار سيارة 205/55R16 - صناعة يابانية - مقاوم للتآكل',
      category: 7, subCategory: 'إطارات', price: 45000, originalPrice: 60000,
      image: '🛞', rating: 4.5, reviews: 890, orders: 2100,
      store: 'Auto Parts', storeBadge: 'بائع معتمد', moq: 2,
      variants: { 'المقاس': ['195/65R15', '205/55R16', '215/60R17'] },
      specs: { 'المقاس': '205/55R16', 'المنشأ': 'ياباني', 'الضمان': '50,000 كم', 'النوع': 'جميع المواسم' },
      description: 'إطار سيارة ياباني الصنع عالي الجودة ومقاوم للتآكل.',
      soldPercent: 52
    },
    {
      id: 8001, name: 'طقم أدوات كهربائية 100 قطعة - مثقاب + مفك + قطع تقطيع',
      category: 8, subCategory: 'أدوات كهربائية', price: 38000, originalPrice: 55000,
      image: '🔧', rating: 4.4, reviews: 1560, orders: 3400,
      store: 'Tools Pro', storeBadge: 'متجر ذهبي', moq: 1,
      variants: { 'الطقم': ['50 قطعة', '100 قطعة', '150 قطعة'] },
      specs: { 'عدد القطع': '100', 'المثقاب': '650 واط', 'المادة': 'فولاذ كروم فاناديوم', 'الحقيبة': 'بلاستيك متين' },
      description: 'طقم أدوات كهربائية شامل لجميع أعمال الصيانة والتركيب.',
      soldPercent: 68
    },
    {
      id: 9001, name: 'ساعة يد رجالية فاخرة - حركة سويسرية - ستانلس ستيل - مقاومة للماء',
      category: 9, subCategory: 'ساعات يد', price: 25000, originalPrice: 40000,
      image: '⌚', rating: 4.6, reviews: 2300, orders: 5100,
      store: 'Luxury Watches', storeBadge: 'متجر ذهبي', moq: 1,
      variants: { 'اللون': ['ذهبي', 'فضي', 'أسود'], 'السوار': ['ستانلس', 'جلد'] },
      specs: { 'الحركة': 'سويسرية', 'المادة': 'ستانلس ستيل 316L', 'المقاومة': '5 ATM', 'الضمان': 'سنتين' },
      description: 'ساعة يد رجالية فاخرة بحركة سويسرية وتصميم كلاسيكي أنيق.',
      soldPercent: 58
    },
    {
      id: 10001, name: 'حقيبة ظهر رجالية - مقاومة للماء - حامل لابتوب - USB مدمج',
      category: 10, subCategory: 'حقائب ظهر', price: 11000, originalPrice: 18000,
      image: '🎒', rating: 4.5, reviews: 3400, orders: 7800,
      store: 'Bag Store', storeBadge: 'بائع معتمد', moq: 3,
      variants: { 'اللون': ['أسود', 'رمادي', 'أزرق'], 'الحجم': ['عادي', 'كبير'] },
      specs: { 'المادة': 'نايلون مقاوم للماء', 'السعة': '30 لتر', 'اللابتوب': 'حتى 15.6"', 'المنافذ': 'USB مدمج' },
      description: 'حقيبة ظهر متعددة الاستخدامات بمنفذ USB مدمج ومقاومة للماء.',
      soldPercent: 73
    },
  ],

  reviews: [
    { user: 'أحمد', avatar: 'أ', rating: 5, date: '2026-05-01', text: 'منتج ممتاز ووصل بسرعة. الجودة عالية جداً وأنصح بالشراء.' },
    { user: 'محمد', avatar: 'م', rating: 4, date: '2026-04-28', text: 'منتج جيد وسعر مناسب. التغليف كان ممتاز والتوصيل سريع.' },
    { user: 'سارة', avatar: 'س', rating: 5, date: '2026-04-25', text: 'تعامل راقي ومنتج كما هو موصوف. سأطلب مرة أخرى بالتأكيد.' },
    { user: 'فاطمة', avatar: 'ف', rating: 4, date: '2026-04-20', text: 'جودة المنتج جيدة جداً. الشحن كان سريع والتغليف ممتاز.' },
    { user: 'خالد', avatar: 'خ', rating: 5, date: '2026-04-18', text: 'أفضل سعر وجدته هنا. المنتج أصلي وضمان حقيقي.' },
  ],

  orders: [
    { id: 'ORD-2026-001', date: '2026-05-08', status: 'processing', items: 3, total: 66000 },
    { id: 'ORD-2026-002', date: '2026-05-05', status: 'shipped', items: 1, total: 45000 },
    { id: 'ORD-2026-003', date: '2026-05-01', status: 'delivered', items: 5, total: 120000 },
    { id: 'ORD-2026-004', date: '2026-04-28', status: 'delivered', items: 2, total: 35000 },
  ],

  merchantStats: {
    totalSales: 2450000,
    totalOrders: 1234,
    totalProducts: 156,
    totalCustomers: 890,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    processingOrders: 45,
    shippedOrders: 67,
  },

  cart: [],
  user: null,
  currentPage: 'home',
};
