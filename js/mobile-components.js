// Mobile-specific Components

// Bottom Navigation Component
class BottomNavigation {
  constructor(options = {}) {
    this.defaults = {
      items: [],
      activeIndex: 0,
      onItemClick: null
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav safe-area-bottom';

    this.options.items.forEach((item, index) => {
      const navItem = document.createElement('a');
      navItem.href = item.href || '#';
      navItem.className = 'bottom-nav-item';
      
      if (index === this.options.activeIndex) {
        navItem.classList.add('active');
      }

      // Icon
      const icon = document.createElement('div');
      icon.className = 'bottom-nav-icon';
      icon.innerHTML = item.icon || this.getDefaultIcon(index);
      
      // Label
      const label = document.createElement('span');
      label.className = 'bottom-nav-label';
      label.textContent = item.label;

      // Badge
      if (item.badge) {
        const badge = document.createElement('span');
        badge.className = 'bottom-nav-badge';
        badge.textContent = item.badge;
        navItem.appendChild(badge);
      }

      navItem.appendChild(icon);
      navItem.appendChild(label);

      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActive(index);
        if (this.options.onItemClick) {
          this.options.onItemClick(item, index);
        }
      });

      nav.appendChild(navItem);
    });

    this.element = nav;
    return nav;
  }

  setActive(index) {
    const items = this.element.querySelectorAll('.bottom-nav-item');
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    this.options.activeIndex = index;
  }

  getDefaultIcon(index) {
    const icons = [
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>'
    ];
    return icons[index] || icons[0];
  }
}

// Action Sheet Component
class ActionSheet {
  constructor(options = {}) {
    this.defaults = {
      title: '',
      items: [],
      cancelText: '취소',
      onItemClick: null,
      onCancel: null
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
    this.backdrop = null;
  }

  render() {
    // Backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'action-sheet-backdrop';
    this.backdrop.addEventListener('click', () => this.hide());

    // Sheet
    const sheet = document.createElement('div');
    sheet.className = 'action-sheet safe-area-bottom';

    // Header
    if (this.options.title) {
      const header = document.createElement('div');
      header.className = 'action-sheet-header';
      
      const title = document.createElement('h3');
      title.className = 'action-sheet-title';
      title.textContent = this.options.title;
      
      header.appendChild(title);
      sheet.appendChild(header);
    }

    // Items
    this.options.items.forEach(item => {
      const button = document.createElement('button');
      button.className = 'action-sheet-item';
      
      if (item.destructive) {
        button.classList.add('destructive');
      }
      
      button.textContent = item.text;
      button.addEventListener('click', () => {
        if (this.options.onItemClick) {
          this.options.onItemClick(item);
        }
        if (item.onClick) {
          item.onClick();
        }
        this.hide();
      });
      
      sheet.appendChild(button);
    });

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'action-sheet-item action-sheet-cancel';
    cancelBtn.textContent = this.options.cancelText;
    cancelBtn.addEventListener('click', () => {
      if (this.options.onCancel) {
        this.options.onCancel();
      }
      this.hide();
    });
    sheet.appendChild(cancelBtn);

    this.backdrop.appendChild(sheet);
    this.element = this.backdrop;
    return this.backdrop;
  }

  show() {
    if (!this.element) {
      document.body.appendChild(this.render());
    }
    requestAnimationFrame(() => {
      this.backdrop.classList.add('active');
    });
  }

  hide() {
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
  }
}

// Floating Action Button Component
class FloatingActionButton {
  constructor(options = {}) {
    this.defaults = {
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
      label: '',
      onClick: null,
      position: 'bottom-right'
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const fab = document.createElement('button');
    fab.className = 'fab';
    
    if (this.options.label) {
      fab.classList.add('fab-extended');
    }

    const icon = document.createElement('span');
    icon.className = 'fab-icon';
    icon.innerHTML = this.options.icon;
    fab.appendChild(icon);

    if (this.options.label) {
      const label = document.createElement('span');
      label.className = 'fab-label';
      label.textContent = this.options.label;
      fab.appendChild(label);
    }

    if (this.options.onClick) {
      fab.addEventListener('click', this.options.onClick);
    }

    this.element = fab;
    return fab;
  }

  hide() {
    if (this.element) {
      this.element.style.transform = 'scale(0)';
    }
  }

  show() {
    if (this.element) {
      this.element.style.transform = 'scale(1)';
    }
  }
}

// Mobile Search Bar Component
class MobileSearchBar {
  constructor(options = {}) {
    this.defaults = {
      placeholder: '검색',
      value: '',
      onSearch: null,
      onVoice: null,
      onChange: null
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'mobile-search';

    // Search icon
    const searchIcon = document.createElement('span');
    searchIcon.className = 'mobile-search-icon';
    searchIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>';

    // Input
    const input = document.createElement('input');
    input.className = 'mobile-search-input';
    input.type = 'search';
    input.placeholder = this.options.placeholder;
    input.value = this.options.value;

    input.addEventListener('input', (e) => {
      if (this.options.onChange) {
        this.options.onChange(e.target.value);
      }
    });

    input.addEventListener('search', (e) => {
      if (this.options.onSearch) {
        this.options.onSearch(e.target.value);
      }
    });

    // Voice button
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'mobile-search-voice';
    voiceBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93 0-.47.05-.94.13-1.39l.57.57C5.24 7.59 6 9.14 6 11c0 2.76 2.24 5 5 5h2c2.76 0 5-2.24 5-5 0-1.86-.76-3.41-1.88-4.51l.57-.57c.08.45.13.92.13 1.39 0 4.08-3.06 7.44-7 7.93V19h3v2H8v-2h3v-3.07z"/></svg>';
    
    if (this.options.onVoice) {
      voiceBtn.addEventListener('click', this.options.onVoice);
    }

    container.appendChild(searchIcon);
    container.appendChild(input);
    container.appendChild(voiceBtn);

    this.element = container;
    return container;
  }

  getValue() {
    const input = this.element.querySelector('input');
    return input ? input.value : '';
  }

  setValue(value) {
    const input = this.element.querySelector('input');
    if (input) {
      input.value = value;
    }
  }

  focus() {
    const input = this.element.querySelector('input');
    if (input) {
      input.focus();
    }
  }
}

// Mobile Tab Bar Component
class MobileTabBar {
  constructor(options = {}) {
    this.defaults = {
      tabs: [],
      activeIndex: 0,
      onTabChange: null
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'mobile-tabs';

    this.options.tabs.forEach((tab, index) => {
      const tabElement = document.createElement('a');
      tabElement.href = tab.href || '#';
      tabElement.className = 'mobile-tab';
      tabElement.textContent = tab.label;

      if (index === this.options.activeIndex) {
        tabElement.classList.add('active');
      }

      tabElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActive(index);
        if (this.options.onTabChange) {
          this.options.onTabChange(tab, index);
        }
      });

      container.appendChild(tabElement);
    });

    this.element = container;
    return container;
  }

  setActive(index) {
    const tabs = this.element.querySelectorAll('.mobile-tab');
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        tab.classList.remove('active');
      }
    });
    this.options.activeIndex = index;
  }
}

// Bottom Sheet Component
class BottomSheet {
  constructor(options = {}) {
    this.defaults = {
      content: '',
      snapPoints: [0.5, 0.9],
      onClose: null
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
    this.currentSnapIndex = 0;
    this.startY = 0;
    this.currentY = 0;
  }

  render() {
    const sheet = document.createElement('div');
    sheet.className = 'bottom-sheet';

    // Handle
    const handle = document.createElement('div');
    handle.className = 'bottom-sheet-handle';
    this.setupDragHandlers(handle);

    // Content
    const content = document.createElement('div');
    content.className = 'bottom-sheet-content';
    content.innerHTML = this.options.content;

    sheet.appendChild(handle);
    sheet.appendChild(content);

    this.element = sheet;
    return sheet;
  }

  setupDragHandlers(handle) {
    let isDragging = false;

    const handleStart = (e) => {
      isDragging = true;
      this.startY = e.touches ? e.touches[0].clientY : e.clientY;
      handle.style.cursor = 'grabbing';
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      
      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - this.startY;
      
      const sheetHeight = this.element.offsetHeight;
      const translateY = Math.max(0, Math.min(sheetHeight, deltaY));
      
      this.element.style.transform = `translateY(${translateY}px)`;
      this.element.style.transition = 'none';
    };

    const handleEnd = () => {
      if (!isDragging) return;
      
      isDragging = false;
      handle.style.cursor = 'grab';
      this.element.style.transition = '';
      
      // Snap to closest point
      const sheetHeight = this.element.offsetHeight;
      const currentTranslateY = this.getCurrentTranslateY();
      
      if (currentTranslateY > sheetHeight * 0.3) {
        this.hide();
      } else {
        this.snapToPoint(this.currentSnapIndex);
      }
    };

    handle.addEventListener('mousedown', handleStart);
    handle.addEventListener('touchstart', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
  }

  getCurrentTranslateY() {
    const transform = this.element.style.transform;
    const match = transform.match(/translateY\((.+)px\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  snapToPoint(index) {
    const snapPoint = this.options.snapPoints[index];
    const windowHeight = window.innerHeight;
    const translateY = windowHeight * (1 - snapPoint);
    
    this.element.style.transform = `translateY(${translateY}px)`;
    this.currentSnapIndex = index;
  }

  show() {
    if (!this.element) {
      document.body.appendChild(this.render());
    }
    requestAnimationFrame(() => {
      this.element.classList.add('active');
      this.snapToPoint(0);
    });
  }

  hide() {
    if (this.element) {
      this.element.style.transform = 'translateY(100%)';
      setTimeout(() => {
        this.element.classList.remove('active');
        if (this.options.onClose) {
          this.options.onClose();
        }
      }, 300);
    }
  }
}

// 원형 카테고리 버튼 컴포넌트 (홈화면 지역 선택용)
class CircularCategoryButton {
  constructor(options = {}) {
    this.defaults = {
      text: '지역명',
      region: 'default',
      icon: null,
      selected: false,
      size: 'md', // sm, md, lg
      onClick: null,
      color: 'primary'
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'circular-category-container';

    const button = document.createElement('button');
    button.className = `circular-category-btn circular-category-${this.options.size}`;
    
    if (this.options.selected) {
      button.classList.add('selected');
    }
    
    button.setAttribute('data-region', this.options.region);
    button.setAttribute('aria-label', `${this.options.text} 지역 선택`);

    // 아이콘이 있는 경우
    if (this.options.icon) {
      const icon = document.createElement('span');
      icon.className = 'circular-category-icon';
      icon.innerHTML = this.options.icon;
      button.appendChild(icon);
    }

    // 텍스트 레이블
    const label = document.createElement('span');
    label.className = 'circular-category-text';
    label.textContent = this.options.text;
    
    container.appendChild(button);
    container.appendChild(label);

    // 클릭 이벤트
    if (this.options.onClick) {
      button.addEventListener('click', (e) => {
        this.options.onClick(this.options.region, e);
      });
    }

    // 터치 피드백
    button.addEventListener('touchstart', () => {
      button.classList.add('touch-active');
    });
    
    button.addEventListener('touchend', () => {
      setTimeout(() => button.classList.remove('touch-active'), 150);
    });

    this.element = container;
    return container;
  }

  setSelected(selected) {
    this.options.selected = selected;
    if (this.element) {
      const button = this.element.querySelector('.circular-category-btn');
      if (selected) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    }
  }
}

// 지역 선택기 (홈화면 전체 레이아웃)
class RegionSelector {
  constructor(options = {}) {
    this.defaults = {
      regions: [
        { id: 'kyungsung', name: '경성', icon: '🏛️' },
        { id: 'gwangan', name: '광안', icon: '🏖️' },
        { id: 'nampo', name: '남포', icon: '🛍️' },
        { id: 'dukcheon', name: '덕천', icon: '🚇' },
        { id: 'dongnae', name: '동래', icon: '🏯' },
        { id: 'seomyeon', name: '서면', icon: '🎯' },
        { id: 'yeonsan', name: '연산', icon: '🌸' },
        { id: 'jeonpo', name: '전포', icon: '🎨' },
        { id: 'haeun', name: '해운', icon: '🌊' }
      ],
      selectedRegion: null,
      onRegionSelect: null,
      title: '지역을 선택해주세요'
    };
    this.options = { ...this.defaults, ...options };
    this.categoryButtons = [];
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'region-selector';

    // 헤더
    const header = document.createElement('div');
    header.className = 'region-selector-header';
    
    const title = document.createElement('h1');
    title.className = 'region-selector-title';
    title.textContent = this.options.title;
    header.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'region-selector-subtitle';
    subtitle.textContent = '원하는 지역을 선택하면 해당 지역의 상권 정보를 확인할 수 있습니다.';
    header.appendChild(subtitle);

    container.appendChild(header);

    // 지역 버튼 그리드
    const grid = document.createElement('div');
    grid.className = 'region-selector-grid';

    this.options.regions.forEach((region, index) => {
      const categoryBtn = new CircularCategoryButton({
        text: region.name,
        region: region.id,
        icon: region.icon,
        selected: this.options.selectedRegion === region.id,
        onClick: (regionId) => this.handleRegionSelect(regionId)
      });

      const btnElement = categoryBtn.render();
      btnElement.style.animationDelay = `${index * 100}ms`;
      btnElement.classList.add('fade-in-up');
      
      grid.appendChild(btnElement);
      this.categoryButtons.push(categoryBtn);
    });

    container.appendChild(grid);

    // 다음 단계 버튼
    const nextButton = document.createElement('button');
    nextButton.className = 'region-next-btn';
    nextButton.textContent = '다음 단계';
    nextButton.disabled = !this.options.selectedRegion;
    nextButton.addEventListener('click', () => this.handleNext());

    container.appendChild(nextButton);

    this.element = container;
    this.nextBtn = nextButton;
    return container;
  }

  handleRegionSelect(regionId) {
    // 이전 선택 해제
    this.categoryButtons.forEach(btn => btn.setSelected(false));
    
    // 새 선택 설정
    const selectedBtn = this.categoryButtons.find(btn => btn.options.region === regionId);
    if (selectedBtn) {
      selectedBtn.setSelected(true);
    }

    this.options.selectedRegion = regionId;
    
    // 다음 버튼 활성화
    if (this.nextBtn) {
      this.nextBtn.disabled = false;
      this.nextBtn.classList.add('enabled');
    }

    // 햅틱 피드백 (모바일)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  handleNext() {
    if (this.options.selectedRegion && this.options.onRegionSelect) {
      this.options.onRegionSelect(this.options.selectedRegion);
    }
  }

  getSelectedRegion() {
    return this.options.selectedRegion;
  }
}

// 모바일 최적화 업체 카드
class MobileStoreCard {
  constructor(options = {}) {
    this.defaults = {
      id: null,
      name: '업체명',
      address: '주소',
      category: '업종',
      status: 'operating', // operating, closed, vacant
      area: null,
      rent: null,
      image: null,
      distance: null,
      rating: null,
      reviewCount: 0,
      isFavorite: false,
      onClick: null,
      onFavorite: null,
      showDistance: true,
      showRating: true
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'mobile-store-card';
    card.setAttribute('data-store-id', this.options.id);

    // 상태에 따른 클래스 추가
    card.classList.add(`status-${this.options.status}`);

    // 카드 이미지
    const imageContainer = document.createElement('div');
    imageContainer.className = 'store-card-image';
    
    if (this.options.image) {
      const img = document.createElement('img');
      img.src = this.options.image;
      img.alt = this.options.name;
      img.loading = 'lazy';
      imageContainer.appendChild(img);
    } else {
      // 기본 이미지 또는 아이콘
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.innerHTML = '🏪';
      imageContainer.appendChild(placeholder);
    }

    // 즐겨찾기 버튼
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = this.options.isFavorite ? '❤️' : '🤍';
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFavorite();
    });
    imageContainer.appendChild(favoriteBtn);

    card.appendChild(imageContainer);

    // 카드 콘텐츠
    const content = document.createElement('div');
    content.className = 'store-card-content';

    // 상단 정보 (이름, 상태)
    const header = document.createElement('div');
    header.className = 'store-card-header';

    const name = document.createElement('h3');
    name.className = 'store-name';
    name.textContent = this.options.name;
    header.appendChild(name);

    const status = document.createElement('span');
    status.className = `store-status status-${this.options.status}`;
    status.textContent = this.getStatusText(this.options.status);
    header.appendChild(status);

    content.appendChild(header);

    // 주소
    const address = document.createElement('p');
    address.className = 'store-address';
    address.textContent = this.options.address;
    content.appendChild(address);

    // 카테고리
    const category = document.createElement('span');
    category.className = 'store-category';
    category.textContent = this.options.category;
    content.appendChild(category);

    // 추가 정보 (면적, 임대료)
    const details = document.createElement('div');
    details.className = 'store-details';

    if (this.options.area) {
      const area = document.createElement('span');
      area.className = 'store-area';
      area.textContent = `${this.options.area}㎡`;
      details.appendChild(area);
    }

    if (this.options.rent) {
      const rent = document.createElement('span');
      rent.className = 'store-rent';
      rent.textContent = `월 ${this.formatPrice(this.options.rent)}`;
      details.appendChild(rent);
    }

    content.appendChild(details);

    // 하단 정보 (거리, 평점)
    const footer = document.createElement('div');
    footer.className = 'store-card-footer';

    if (this.options.showDistance && this.options.distance) {
      const distance = document.createElement('span');
      distance.className = 'store-distance';
      distance.textContent = `${this.options.distance}m`;
      footer.appendChild(distance);
    }

    if (this.options.showRating && this.options.rating) {
      const rating = document.createElement('div');
      rating.className = 'store-rating';
      
      const stars = document.createElement('span');
      stars.className = 'rating-stars';
      stars.textContent = '⭐'.repeat(Math.floor(this.options.rating));
      rating.appendChild(stars);

      const score = document.createElement('span');
      score.className = 'rating-score';
      score.textContent = `${this.options.rating} (${this.options.reviewCount})`;
      rating.appendChild(score);

      footer.appendChild(rating);
    }

    content.appendChild(footer);
    card.appendChild(content);

    // 클릭 이벤트
    if (this.options.onClick) {
      card.addEventListener('click', () => {
        this.options.onClick(this.options.id, this.options);
      });
    }

    // 터치 피드백
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
    });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('touch-active'), 150);
    });

    this.element = card;
    this.favoriteBtn = favoriteBtn;
    return card;
  }

  getStatusText(status) {
    const statusMap = {
      operating: '영업중',
      closed: '폐업',
      vacant: '빈점포'
    };
    return statusMap[status] || '알 수 없음';
  }

  formatPrice(price) {
    if (price >= 100000000) {
      return `${(price / 100000000).toFixed(1)}억원`;
    } else if (price >= 10000) {
      return `${(price / 10000).toFixed(0)}만원`;
    } else {
      return `${price.toLocaleString()}원`;
    }
  }

  toggleFavorite() {
    this.options.isFavorite = !this.options.isFavorite;
    this.favoriteBtn.innerHTML = this.options.isFavorite ? '❤️' : '🤍';
    
    // 햅틱 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // 애니메이션
    this.favoriteBtn.classList.add('favorite-animation');
    setTimeout(() => {
      this.favoriteBtn.classList.remove('favorite-animation');
    }, 300);

    if (this.options.onFavorite) {
      this.options.onFavorite(this.options.id, this.options.isFavorite);
    }
  }

  updateData(newData) {
    this.options = { ...this.options, ...newData };
    // 카드 재렌더링 또는 특정 부분만 업데이트
    if (this.element && this.element.parentNode) {
      const parent = this.element.parentNode;
      const newElement = this.render();
      parent.replaceChild(newElement, this.element);
    }
  }
}

// 다단계 필터 컴포넌트 
class MultiStepFilter {
  constructor(options = {}) {
    this.defaults = {
      steps: [
        { id: 'region', title: '지역', completed: false },
        { id: 'category', title: '업종', completed: false },
        { id: 'conditions', title: '조건', completed: false }
      ],
      currentStep: 0,
      data: {},
      onStepComplete: null,
      onBack: null,
      categories: {
        '음식점': ['한식', '중식', '일식', '양식', '기타'],
        '소매업': ['편의점', '마트', '의류', '화장품', '기타'],
        '서비스업': ['미용실', '세탁소', '부동산', '학원', '기타']
      }
    };
    this.options = { ...this.defaults, ...options };
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'multi-step-filter';

    // 진행 표시 바
    const progressBar = this.createProgressBar();
    container.appendChild(progressBar);

    // 단계별 콘텐츠
    const content = document.createElement('div');
    content.className = 'filter-step-content';
    container.appendChild(content);

    // 하단 버튼
    const buttons = this.createButtons();
    container.appendChild(buttons);

    this.element = container;
    this.contentElement = content;
    this.progressBarElement = progressBar;
    this.buttonsElement = buttons;

    this.renderCurrentStep();
    return container;
  }

  createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'filter-progress';

    this.options.steps.forEach((step, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'progress-step';
      
      if (index < this.options.currentStep) {
        stepElement.classList.add('completed');
      } else if (index === this.options.currentStep) {
        stepElement.classList.add('current');
      }

      const stepNumber = document.createElement('span');
      stepNumber.className = 'step-number';
      stepNumber.textContent = index + 1;
      stepElement.appendChild(stepNumber);

      const stepTitle = document.createElement('span');
      stepTitle.className = 'step-title';
      stepTitle.textContent = step.title;
      stepElement.appendChild(stepTitle);

      progressContainer.appendChild(stepElement);

      // 연결선 (마지막 단계 제외)
      if (index < this.options.steps.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'step-connector';
        if (index < this.options.currentStep) {
          connector.classList.add('completed');
        }
        progressContainer.appendChild(connector);
      }
    });

    return progressContainer;
  }

  createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'filter-buttons';

    const backBtn = document.createElement('button');
    backBtn.className = 'filter-btn filter-btn-back';
    backBtn.textContent = '이전';
    backBtn.disabled = this.options.currentStep === 0;
    backBtn.addEventListener('click', () => this.goBack());

    const nextBtn = document.createElement('button');
    nextBtn.className = 'filter-btn filter-btn-next';
    nextBtn.textContent = this.options.currentStep === this.options.steps.length - 1 ? '완료' : '다음';
    nextBtn.addEventListener('click', () => this.goNext());

    buttonContainer.appendChild(backBtn);
    buttonContainer.appendChild(nextBtn);

    this.backBtn = backBtn;
    this.nextBtn = nextBtn;

    return buttonContainer;
  }

  renderCurrentStep() {
    if (!this.contentElement) return;

    const currentStep = this.options.steps[this.options.currentStep];
    this.contentElement.innerHTML = '';

    switch (currentStep.id) {
      case 'region':
        this.renderRegionStep();
        break;
      case 'category':
        this.renderCategoryStep();
        break;
      case 'conditions':
        this.renderConditionsStep();
        break;
    }

    this.updateProgressBar();
    this.updateButtons();
  }

  renderRegionStep() {
    const regionStep = document.createElement('div');
    regionStep.className = 'filter-step filter-region-step';

    const title = document.createElement('h2');
    title.textContent = '지역을 선택해주세요';
    regionStep.appendChild(title);

    // 지역 선택기 재사용
    const regionSelector = new RegionSelector({
      selectedRegion: this.options.data.region,
      onRegionSelect: (regionId) => {
        this.options.data.region = regionId;
        this.validateCurrentStep();
      }
    });

    regionStep.appendChild(regionSelector.render());
    this.contentElement.appendChild(regionStep);
  }

  renderCategoryStep() {
    const categoryStep = document.createElement('div');
    categoryStep.className = 'filter-step filter-category-step';

    const title = document.createElement('h2');
    title.textContent = '업종을 선택해주세요';
    categoryStep.appendChild(title);

    const categoryGrid = document.createElement('div');
    categoryGrid.className = 'category-grid';

    Object.keys(this.options.categories).forEach(mainCategory => {
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      
      if (this.options.data.mainCategory === mainCategory) {
        categoryCard.classList.add('selected');
      }

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = mainCategory;
      categoryCard.appendChild(categoryTitle);

      const subCategoryList = document.createElement('div');
      subCategoryList.className = 'sub-category-list';
      
      this.options.categories[mainCategory].forEach(subCategory => {
        const subCategoryBtn = document.createElement('button');
        subCategoryBtn.className = 'sub-category-btn';
        subCategoryBtn.textContent = subCategory;
        
        if (this.options.data.subCategory === subCategory) {
          subCategoryBtn.classList.add('selected');
        }

        subCategoryBtn.addEventListener('click', () => {
          this.options.data.mainCategory = mainCategory;
          this.options.data.subCategory = subCategory;
          this.renderCategoryStep(); // 다시 렌더링
          this.validateCurrentStep();
        });

        subCategoryList.appendChild(subCategoryBtn);
      });

      categoryCard.appendChild(subCategoryList);
      categoryGrid.appendChild(categoryCard);
    });

    categoryStep.appendChild(categoryGrid);
    this.contentElement.appendChild(categoryStep);
  }

  renderConditionsStep() {
    const conditionsStep = document.createElement('div');
    conditionsStep.className = 'filter-step filter-conditions-step';

    const title = document.createElement('h2');
    title.textContent = '상세 조건을 설정해주세요';
    conditionsStep.appendChild(title);

    // 영업상태 토글 (간단한 버전)
    const statusSection = document.createElement('div');
    statusSection.className = 'condition-section';
    
    const statusTitle = document.createElement('h3');
    statusTitle.textContent = '영업상태';
    statusSection.appendChild(statusTitle);

    const statusOptions = ['영업중', '폐업', '빈점포'];
    const statusContainer = document.createElement('div');
    statusContainer.className = 'status-toggles';

    statusOptions.forEach(status => {
      const toggle = document.createElement('label');
      toggle.className = 'status-toggle';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = status;
      checkbox.checked = true; // 기본적으로 모든 상태 선택

      const label = document.createElement('span');
      label.textContent = status;

      toggle.appendChild(checkbox);
      toggle.appendChild(label);
      statusContainer.appendChild(toggle);
    });

    statusSection.appendChild(statusContainer);
    conditionsStep.appendChild(statusSection);

    this.contentElement.appendChild(conditionsStep);
  }

  updateProgressBar() {
    const steps = this.progressBarElement.querySelectorAll('.progress-step');
    const connectors = this.progressBarElement.querySelectorAll('.step-connector');

    steps.forEach((step, index) => {
      step.classList.remove('completed', 'current');
      if (index < this.options.currentStep) {
        step.classList.add('completed');
      } else if (index === this.options.currentStep) {
        step.classList.add('current');
      }
    });

    connectors.forEach((connector, index) => {
      connector.classList.remove('completed');
      if (index < this.options.currentStep) {
        connector.classList.add('completed');
      }
    });
  }

  updateButtons() {
    this.backBtn.disabled = this.options.currentStep === 0;
    this.nextBtn.textContent = this.options.currentStep === this.options.steps.length - 1 ? '검색하기' : '다음';
  }

  validateCurrentStep() {
    let isValid = false;
    const currentStep = this.options.steps[this.options.currentStep];

    switch (currentStep.id) {
      case 'region':
        isValid = !!this.options.data.region;
        break;
      case 'category':
        isValid = !!(this.options.data.mainCategory && this.options.data.subCategory);
        break;
      case 'conditions':
        isValid = true; // 조건 단계는 항상 유효
        break;
    }

    this.nextBtn.disabled = !isValid;
    return isValid;
  }

  goNext() {
    if (!this.validateCurrentStep()) return;

    if (this.options.currentStep < this.options.steps.length - 1) {
      this.options.currentStep++;
      this.renderCurrentStep();
    } else {
      // 완료
      if (this.options.onStepComplete) {
        this.options.onStepComplete(this.options.data);
      }
    }
  }

  goBack() {
    if (this.options.currentStep > 0) {
      this.options.currentStep--;
      this.renderCurrentStep();
    } else if (this.options.onBack) {
      this.options.onBack();
    }
  }
}

// Export mobile components
window.MobileComponents = {
  BottomNavigation,
  ActionSheet,
  FloatingActionButton,
  MobileSearchBar,
  MobileTabBar,
  BottomSheet,
  // 새로운 오클러 전용 컴포넌트들
  CircularCategoryButton,
  RegionSelector,
  MobileStoreCard,
  MultiStepFilter
};