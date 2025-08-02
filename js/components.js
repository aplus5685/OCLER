// Linear Theme Components JavaScript

// Component Factory
class ComponentFactory {
  constructor() {
    this.components = {};
  }

  register(name, component) {
    this.components[name] = component;
  }

  create(name, options) {
    const Component = this.components[name];
    if (!Component) {
      throw new Error(`Component ${name} not found`);
    }
    return new Component(options);
  }
}

// Base Component Class
class BaseComponent {
  constructor(options = {}) {
    this.options = options;
    this.element = null;
  }

  render() {
    throw new Error('render() must be implemented');
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Button Component
class Button extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      text: 'Button',
      variant: 'primary',
      size: 'md',
      disabled: false,
      onClick: null
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const button = document.createElement('button');
    button.className = `btn btn-${this.options.variant}`;
    
    if (this.options.size !== 'md') {
      button.classList.add(`btn-${this.options.size}`);
    }
    
    button.textContent = this.options.text;
    button.disabled = this.options.disabled;
    
    if (this.options.onClick) {
      button.addEventListener('click', this.options.onClick);
    }
    
    this.element = button;
    return button;
  }
}

// Input Component
class Input extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      type: 'text',
      placeholder: '',
      value: '',
      disabled: false,
      error: false,
      onChange: null
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const input = document.createElement('input');
    input.type = this.options.type;
    input.className = 'input';
    
    if (this.options.error) {
      input.classList.add('input-error');
    }
    
    input.placeholder = this.options.placeholder;
    input.value = this.options.value;
    input.disabled = this.options.disabled;
    
    if (this.options.onChange) {
      input.addEventListener('input', this.options.onChange);
    }
    
    this.element = input;
    return input;
  }
}

// Card Component
class Card extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      title: '',
      content: '',
      actions: [],
      hover: false
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const card = document.createElement('div');
    card.className = 'card';
    
    if (this.options.hover) {
      card.classList.add('card-hover');
    }
    
    if (this.options.title) {
      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = this.options.title;
      card.appendChild(title);
    }
    
    if (this.options.content) {
      const content = document.createElement('p');
      content.className = 'card-content';
      content.textContent = this.options.content;
      card.appendChild(content);
    }
    
    if (this.options.actions.length > 0) {
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      
      this.options.actions.forEach(action => {
        const button = new Button(action).render();
        actions.appendChild(button);
      });
      
      card.appendChild(actions);
    }
    
    this.element = card;
    return card;
  }
}

// Modal Component
class Modal extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      title: 'Modal Title',
      content: '',
      onConfirm: null,
      onCancel: null
    };
    this.options = { ...this.defaults, ...options };
  }

  show() {
    if (this.element) {
      this.element.classList.add('active');
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.remove('active');
    }
  }

  render() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.hide();
      }
    });

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.addEventListener('click', (e) => e.stopPropagation());

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = this.options.title;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.hide());
    
    header.appendChild(title);
    header.appendChild(closeBtn);

    // Content
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = this.options.content;

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    const confirmBtn = new Button({
      text: 'Confirm',
      variant: 'primary',
      onClick: () => {
        if (this.options.onConfirm) {
          this.options.onConfirm();
        }
        this.hide();
      }
    }).render();
    
    const cancelBtn = new Button({
      text: 'Cancel',
      variant: 'secondary',
      onClick: () => {
        if (this.options.onCancel) {
          this.options.onCancel();
        }
        this.hide();
      }
    }).render();
    
    footer.appendChild(confirmBtn);
    footer.appendChild(cancelBtn);

    // Assemble modal
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);
    backdrop.appendChild(modal);

    this.element = backdrop;
    return backdrop;
  }
}

// Toast Notification
class Toast {
  constructor(options = {}) {
    this.defaults = {
      message: '',
      type: 'info',
      duration: 3000,
      position: 'top-right'
    };
    this.options = { ...this.defaults, ...options };
  }

  show() {
    const toast = document.createElement('div');
    toast.className = `toast toast-${this.options.type}`;
    toast.textContent = this.options.message;
    
    // Get or create container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = `toast-container ${this.options.position}`;
      document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) {
          container.remove();
        }
      }, 300);
    }, this.options.duration);
  }
}

// Initialize component factory
const componentFactory = new ComponentFactory();
componentFactory.register('button', Button);
componentFactory.register('input', Input);
componentFactory.register('card', Card);
componentFactory.register('modal', Modal);

// ============================================================================
// 오클러 전용 데모 함수들
// ============================================================================

// 샘플 데이터
const sampleStores = [
  {
    id: '1',
    name: '서면 맛집',
    category: '한식.분식',
    address: '부산광역시 부산진구 서면로 123',
    status: 'active',
    phone: '051-123-4567',
    rating: '4.5',
    distance: '0.5km',
    image: 'https://via.placeholder.com/300x200?text=Store+Image'
  },
  {
    id: '2', 
    name: '광안리 카페',
    category: '카페.디저트',
    address: '부산광역시 수영구 광안해변로 456',
    status: 'active',
    phone: '051-987-6543',
    rating: '4.2',
    distance: '1.2km'
  },
  {
    id: '3',
    name: '해운대 레스토랑',
    category: '양식',
    address: '부산광역시 해운대구 해운대해변로 789',
    status: 'closed',
    distance: '2.1km'
  }
];

// 업체 카드 데모
function createStoreCardsDemo() {
  const container = document.querySelector('#store-cards-demo');
  if (!container) return;
  
  container.innerHTML = '';
  
  sampleStores.forEach(store => {
    const storeCard = new StoreInfoCard({
      ...store,
      onClick: (storeData) => {
        new Toast({
          message: `${storeData.name} 상세보기를 열었습니다.`,
          type: 'info'
        }).show();
      },
      onFavorite: (storeId, isFavorite) => {
        new Toast({
          message: `업체가 즐겨찾기에서 ${isFavorite ? '추가' : '제거'}되었습니다.`,
          type: 'success'
        }).show();
      }
    });
    container.appendChild(storeCard.render());
  });
}

// 검색 필터 데모
function createSearchFilterDemo() {
  const container = document.querySelector('#search-filter-demo');
  if (!container) return;
  
  const searchFilter = new SearchFilter({
    filters: {
      category: {
        label: '업종',
        options: [
          { value: 'korean', label: '한식.분식' },
          { value: 'western', label: '양식' },
          { value: 'cafe', label: '카페.디저트' },
          { value: 'retail', label: '도소매' }
        ]
      },
      region: {
        label: '지역',
        options: [
          { value: 'seomyeon', label: '서면' },
          { value: 'gwangalli', label: '광안리' },
          { value: 'haeundae', label: '해운대' },
          { value: 'nampo', label: '남포' }
        ]
      },
      status: {
        label: '영업상태',
        options: [
          { value: 'active', label: '영업중' },
          { value: 'closed', label: '폐업' },
          { value: 'pending', label: '확인중' }
        ]
      }
    },
    onFilter: (filters) => {
      new Toast({
        message: `필터가 적용되었습니다: ${JSON.stringify(filters)}`,
        type: 'success'
      }).show();
    },
    onReset: () => {
      new Toast({
        message: '필터가 초기화되었습니다.',
        type: 'info'
      }).show();
    }
  });
  
  container.appendChild(searchFilter.render());
}

// 통계 카드 데모
function createStatsCardsDemo() {
  const container = document.querySelector('#stats-cards-demo');
  if (!container) return;
  
  const statsData = [
    {
      title: '총 업체 수',
      value: 12000,
      unit: '개',
      change: { value: 8, type: 'increase' },
      color: 'primary',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>'
    },
    {
      title: '영업중',
      value: 8450,
      unit: '개',
      change: { value: 3, type: 'increase' },
      color: 'success',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>'
    },
    {
      title: '폐업',
      value: 2100,
      unit: '개',
      change: { value: 12, type: 'decrease' },
      color: 'error',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
    },
    {
      title: '이번 달 신규',
      value: 156,
      unit: '개',
      change: { value: 24, type: 'increase' },
      color: 'info',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>'
    }
  ];
  
  container.innerHTML = '';
  
  statsData.forEach(stat => {
    const statsCard = new StatsCard(stat);
    container.appendChild(statsCard.render());
  });
}

// Modal functions for demo
let demoModal = null;

function openModal() {
  if (!demoModal) {
    demoModal = new Modal({
      title: 'Example Modal',
      content: '<p>This is a modal dialog. It can contain any content you want.</p><p>Click outside or press the X button to close.</p>',
      onConfirm: () => {
        new Toast({
          message: 'Modal confirmed!',
          type: 'success'
        }).show();
      },
      onCancel: () => {
        new Toast({
          message: 'Modal cancelled',
          type: 'info'
        }).show();
      }
    });
    document.body.appendChild(demoModal.render());
  }
  demoModal.show();
}

function closeModal(event) {
  if (demoModal) {
    if (!event || event.target.classList.contains('modal-backdrop') || 
        event.target.classList.contains('modal-close') ||
        event.target.classList.contains('btn-secondary')) {
      demoModal.hide();
    }
  }
}

// 오클러 컴포넌트 초기화
function initOcclerComponents() {
  createStoreCardsDemo();
  createSearchFilterDemo();
  createStatsCardsDemo();
}

// Navigation active state
document.addEventListener('DOMContentLoaded', () => {
  // 오클러 컴포넌트 초기화
  initOcclerComponents();
  const navItems = document.querySelectorAll('.nav-item');
  
  // Update active nav item based on scroll
  const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveNav);
  
  // Smooth scroll for nav items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ============================================================================
// 오클러 전용 컴포넌트 - 상권 정보 플랫폼 특화
// ============================================================================

// Store Info Card Component (업체 정보 카드)
class StoreInfoCard extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      id: '',
      name: '업체명',
      category: '카테고리',
      address: '주소 정보',
      status: 'active', // active, closed, pending
      distance: null,
      phone: null,
      rating: null,
      image: null,
      onClick: null,
      onFavorite: null,
      showDistance: true,
      showStatus: true
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const card = document.createElement('div');
    card.className = 'store-card';
    card.setAttribute('data-store-id', this.options.id);
    
    // 상태별 클래스 추가
    if (this.options.status !== 'active') {
      card.classList.add(`store-${this.options.status}`);
    }
    
    // 이미지 섹션
    let imageSection = '';
    if (this.options.image) {
      imageSection = `
        <div class="store-card-image">
          <img src="${this.options.image}" alt="${this.options.name}" loading="lazy">
          <div class="store-card-overlay">
            <button class="store-favorite-btn" aria-label="즐겨찾기">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    }
    
    // 상태 배지
    let statusBadge = '';
    if (this.options.showStatus) {
      const statusMap = {
        active: { text: '영업중', class: 'badge-success' },
        closed: { text: '폐업', class: 'badge-error' },
        pending: { text: '확인중', class: 'badge-warning' }
      };
      const status = statusMap[this.options.status] || statusMap.active;
      statusBadge = `<span class="badge ${status.class}">${status.text}</span>`;
    }
    
    // 거리 정보
    let distanceInfo = '';
    if (this.options.showDistance && this.options.distance) {
      distanceInfo = `
        <div class="store-distance">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.62 4.4C11.13 19.45 12 21.64 12 21.64s.87-2.19 1.97-3.4c1.42-1.54 2.67-2.86 3.62-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${this.options.distance}
        </div>
      `;
    }
    
    // 전화번호 및 평점
    let contactInfo = '';
    if (this.options.phone || this.options.rating) {
      contactInfo = '<div class="store-contact">';
      if (this.options.phone) {
        contactInfo += `
          <div class="store-phone">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            ${this.options.phone}
          </div>
        `;
      }
      if (this.options.rating) {
        contactInfo += `
          <div class="store-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            ${this.options.rating}
          </div>
        `;
      }
      contactInfo += '</div>';
    }
    
    card.innerHTML = `
      ${imageSection}
      <div class="store-card-content">
        <div class="store-card-header">
          <div class="store-info">
            <h3 class="store-name" role="heading" aria-level="3">${this.options.name}</h3>
            <p class="store-category">${this.options.category}</p>
            ${statusBadge}
          </div>
          ${distanceInfo}
        </div>
        <p class="store-address" title="${this.options.address}">${this.options.address}</p>
        ${contactInfo}
      </div>
    `;
    
    // 접근성 속성 추가
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${this.options.name} - ${this.options.category}`);
    if (this.options.onClick) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-describedby', `store-${this.options.id}-desc`);
    }
    
    // 이벤트 리스너
    if (this.options.onClick) {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.store-favorite-btn')) {
          this.options.onClick(this.options);
        }
      });
      
      // 키보드 접근성
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!e.target.closest('.store-favorite-btn')) {
            this.options.onClick(this.options);
          }
        }
      });
      
      card.style.cursor = 'pointer';
    }
    
    // 즐겨찾기 버튼 이벤트
    const favoriteBtn = card.querySelector('.store-favorite-btn');
    if (favoriteBtn && this.options.onFavorite) {
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        favoriteBtn.classList.toggle('active');
        this.options.onFavorite(this.options.id, favoriteBtn.classList.contains('active'));
      });
    }
    
    this.element = card;
    return card;
  }
}

// Search Filter Component (검색 필터)
class SearchFilter extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      filters: {
        category: { label: '업종', options: [], value: '' },
        region: { label: '지역', options: [], value: '' },
        status: { label: '상태', options: [
          { value: '', label: '전체' },
          { value: 'active', label: '영업중' },
          { value: 'closed', label: '폐업' },
          { value: 'pending', label: '확인중' }
        ], value: '' }
      },
      onFilter: null,
      onReset: null
    };
    this.options = { ...this.defaults, ...options };
    this.values = {};
  }

  render() {
    const container = document.createElement('div');
    container.className = 'search-filter';
    
    let filtersHTML = '';
    Object.keys(this.options.filters).forEach(key => {
      const filter = this.options.filters[key];
      filtersHTML += `
        <div class="filter-group">
          <label class="filter-label">${filter.label}</label>
          <select class="filter-select" data-filter="${key}">
            <option value="">전체</option>
            ${filter.options.map(option => 
              `<option value="${option.value}" ${option.value === filter.value ? 'selected' : ''}>
                ${option.label}
              </option>`
            ).join('')}
          </select>
        </div>
      `;
    });
    
    container.innerHTML = `
      <div class="filter-content">
        ${filtersHTML}
        <div class="filter-actions">
          <button class="btn btn-primary filter-apply">적용</button>
          <button class="btn btn-ghost filter-reset">초기화</button>
        </div>
      </div>
    `;
    
    // 이벤트 리스너
    const applyBtn = container.querySelector('.filter-apply');
    const resetBtn = container.querySelector('.filter-reset');
    const selects = container.querySelectorAll('.filter-select');
    
    applyBtn.addEventListener('click', () => {
      this.values = {};
      selects.forEach(select => {
        this.values[select.dataset.filter] = select.value;
      });
      if (this.options.onFilter) {
        this.options.onFilter(this.values);
      }
    });
    
    resetBtn.addEventListener('click', () => {
      selects.forEach(select => {
        select.value = '';
      });
      this.values = {};
      if (this.options.onReset) {
        this.options.onReset();
      }
    });
    
    this.element = container;
    return container;
  }
}

// Map Marker Component (지도 마커 정보)
class MapMarker extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      store: null,
      onViewDetails: null,
      onGetDirections: null
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const popup = document.createElement('div');
    popup.className = 'map-marker-popup';
    
    const store = this.options.store;
    if (!store) return popup;
    
    popup.innerHTML = `
      <div class="marker-content">
        <div class="marker-header">
          <h4 class="marker-title">${store.name}</h4>
          <span class="badge badge-${store.status === 'active' ? 'success' : store.status === 'closed' ? 'error' : 'warning'}">
            ${store.status === 'active' ? '영업중' : store.status === 'closed' ? '폐업' : '확인중'}
          </span>
        </div>
        <p class="marker-category">${store.category}</p>
        <p class="marker-address">${store.address}</p>
        ${store.phone ? `<p class="marker-phone">${store.phone}</p>` : ''}
        <div class="marker-actions">
          <button class="btn btn-primary btn-sm marker-details">상세보기</button>
          <button class="btn btn-secondary btn-sm marker-directions">길찾기</button>
        </div>
      </div>
    `;
    
    // 이벤트 리스너
    const detailsBtn = popup.querySelector('.marker-details');
    const directionsBtn = popup.querySelector('.marker-directions');
    
    if (detailsBtn && this.options.onViewDetails) {
      detailsBtn.addEventListener('click', () => {
        this.options.onViewDetails(store);
      });
    }
    
    if (directionsBtn && this.options.onGetDirections) {
      directionsBtn.addEventListener('click', () => {
        this.options.onGetDirections(store);
      });
    }
    
    this.element = popup;
    return popup;
  }
}

// Statistics Card Component (통계 카드)
class StatsCard extends BaseComponent {
  constructor(options) {
    super(options);
    this.defaults = {
      title: '',
      value: 0,
      unit: '',
      change: null, // { value: 10, type: 'increase|decrease' }
      icon: null,
      color: 'primary'
    };
    this.options = { ...this.defaults, ...options };
  }

  render() {
    const card = document.createElement('div');
    card.className = `stats-card stats-card-${this.options.color}`;
    
    let changeIndicator = '';
    if (this.options.change) {
      const changeClass = this.options.change.type === 'increase' ? 'stats-increase' : 'stats-decrease';
      const changeIcon = this.options.change.type === 'increase' ? '↗' : '↘';
      changeIndicator = `
        <div class="stats-change ${changeClass}">
          <span class="stats-change-icon">${changeIcon}</span>
          <span class="stats-change-value">${Math.abs(this.options.change.value)}%</span>
        </div>
      `;
    }
    
    card.innerHTML = `
      <div class="stats-content">
        <div class="stats-header">
          ${this.options.icon ? `<div class="stats-icon">${this.options.icon}</div>` : ''}
          <h3 class="stats-title">${this.options.title}</h3>
        </div>
        <div class="stats-body">
          <div class="stats-value">
            <span class="stats-number">${this.options.value.toLocaleString()}</span>
            ${this.options.unit ? `<span class="stats-unit">${this.options.unit}</span>` : ''}
          </div>
          ${changeIndicator}
        </div>
      </div>
    `;
    
    this.element = card;
    return card;
  }
}

// Register new components
componentFactory.register('storeInfoCard', StoreInfoCard);
componentFactory.register('searchFilter', SearchFilter);
componentFactory.register('mapMarker', MapMarker);
componentFactory.register('statsCard', StatsCard);

// Export for use in other scripts
window.LinearComponents = {
  factory: componentFactory,
  Button,
  Input,
  Card,
  Modal,
  Toast,
  // 오클러 전용 컴포넌트
  StoreInfoCard,
  SearchFilter,
  MapMarker,
  StatsCard
};

// 오클러 전용 헬퍼 함수들
window.OcclerHelpers = {
  // 거리 계산 함수
  calculateDistance: function(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return Math.round(distance * 1000) + 'm';
    } else {
      return distance.toFixed(1) + 'km';
    }
  },
  
  // 전화번호 포맷팅
  formatPhoneNumber: function(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  },
  
  // 주소 단축
  truncateAddress: function(address, maxLength = 50) {
    if (!address || address.length <= maxLength) return address;
    return address.substring(0, maxLength) + '...';
  }
};