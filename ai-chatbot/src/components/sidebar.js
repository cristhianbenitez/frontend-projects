const sidebar = {
  init() {
    this.sidebar = document.getElementById('sidebar');
    this.closeSidebarBtn = document.getElementById('closeSidebar');
    this.openSidebarBtn = document.getElementById('openSidebar');
    this.openSidebarBtnMobile = document.getElementById('openSidebar-mobile');
    this.bindEvents();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },

  handleResize() {
    if (window.innerWidth <= 1024) {
      this.sidebar.classList.add('closed');
    } else {
      this.sidebar.classList.remove('closed');
    }
  },

  bindEvents() {
    this.closeSidebarBtn.addEventListener('click', () => this.toggle('hide'));
    this.openSidebarBtn.addEventListener('click', () => this.toggle('show'));
    this.openSidebarBtnMobile.addEventListener('click', () => this.toggle('show'));
  },

  toggle(action) {
    console.log(action);
    if (action === 'hide') {
      this.sidebar.classList.add('closed');
      this.openSidebarBtn.classList.remove('hidden');
      this.openSidebarBtnMobile.classList.remove('hidden');
    } else {
      this.sidebar.classList.remove('closed');
      this.openSidebarBtn.classList.add('hidden');
      this.openSidebarBtnMobile.classList.add('hidden');
    }
  }
};

export default sidebar;
