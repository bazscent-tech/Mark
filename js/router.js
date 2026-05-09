// ===== سوق الجمله اليمني - App Router =====

const Router = {
  routes: {},
  currentPage: null,

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [page, ...params] = hash.split('/');

    if (this.routes[page]) {
      this.currentPage = page;
      STORE.currentPage = page;
      this.routes[page](...params);
      this.updateNav();
      if (typeof updateBottomNav === 'function') updateBottomNav(page);
      window.scrollTo(0, 0);
    }
  },

  updateNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === this.currentPage);
    });
  }
};
