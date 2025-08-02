// Mobile Components Demo Functions

// Global demo instances
let demoActionSheet = null;
let demoBottomSheet = null;

// Initialize mobile demos
document.addEventListener('DOMContentLoaded', () => {
  initBottomNavDemo();
  initMobileSearchDemo();
  initMobileTabsDemo();
  initFabDemo();
});

// Bottom Navigation Demo
function initBottomNavDemo() {
  const container = document.getElementById('bottom-nav-demo');
  if (!container) return;

  const bottomNav = new MobileComponents.BottomNavigation({
    items: [
      { label: '홈', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' },
      { label: '검색', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>' },
      { label: '알림', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>', badge: '3' },
      { label: '프로필', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' }
    ],
    activeIndex: 0,
    onItemClick: (item, index) => {
      new LinearComponents.Toast({
        message: `${item.label} 탭이 선택되었습니다.`,
        type: 'info',
        duration: 2000
      }).show();
    }
  });

  const navElement = bottomNav.render();
  navElement.style.position = 'absolute';
  navElement.style.bottom = '0';
  container.appendChild(navElement);
}

// Action Sheet Demo
function showActionSheetDemo() {
  if (!demoActionSheet) {
    demoActionSheet = new MobileComponents.ActionSheet({
      title: '작업 선택',
      items: [
        {
          text: '사진 촬영',
          onClick: () => {
            new LinearComponents.Toast({
              message: '사진 촬영 기능을 실행합니다.',
              type: 'info'
            }).show();
          }
        },
        {
          text: '갤러리에서 선택',
          onClick: () => {
            new LinearComponents.Toast({
              message: '갤러리를 엽니다.',
              type: 'info'
            }).show();
          }
        },
        {
          text: '파일 업로드',
          onClick: () => {
            new LinearComponents.Toast({
              message: '파일 업로드를 시작합니다.',
              type: 'info'
            }).show();
          }
        },
        {
          text: '삭제',
          destructive: true,
          onClick: () => {
            new LinearComponents.Toast({
              message: '항목이 삭제되었습니다.',
              type: 'error'
            }).show();
          }
        }
      ],
      cancelText: '취소',
      onCancel: () => {
        new LinearComponents.Toast({
          message: '작업이 취소되었습니다.',
          type: 'info'
        }).show();
      }
    });
  }
  demoActionSheet.show();
}

// Mobile Search Demo
function initMobileSearchDemo() {
  const container = document.getElementById('mobile-search-demo');
  if (!container) return;

  const searchBar = new MobileComponents.MobileSearchBar({
    placeholder: '검색어를 입력하세요...',
    onSearch: (value) => {
      new LinearComponents.Toast({
        message: `"${value}" 검색 중...`,
        type: 'info'
      }).show();
    },
    onVoice: () => {
      new LinearComponents.Toast({
        message: '음성 검색 기능을 시작합니다.',
        type: 'info'
      }).show();
    },
    onChange: (value) => {
      // Real-time search suggestions could be implemented here
    }
  });

  container.appendChild(searchBar.render());
}

// Mobile Tabs Demo
function initMobileTabsDemo() {
  const container = document.getElementById('mobile-tabs-demo');
  const contentContainer = document.getElementById('tab-content');
  if (!container || !contentContainer) return;

  const tabContents = {
    0: '<p><strong>홈</strong> 탭 내용입니다. 여기에는 메인 대시보드가 표시됩니다.</p>',
    1: '<p><strong>프로젝트</strong> 탭 내용입니다. 진행 중인 프로젝트 목록을 확인할 수 있습니다.</p>',
    2: '<p><strong>팀</strong> 탭 내용입니다. 팀원들과의 협업 도구가 제공됩니다.</p>',
    3: '<p><strong>설정</strong> 탭 내용입니다. 앱의 각종 설정을 변경할 수 있습니다.</p>',
    4: '<p><strong>도움말</strong> 탭 내용입니다. 자주 묻는 질문과 가이드를 확인하세요.</p>'
  };

  const tabBar = new MobileComponents.MobileTabBar({
    tabs: [
      { label: '홈 Home' },
      { label: '프로젝트 Projects' },
      { label: '팀 Team' },
      { label: '설정 Settings' },
      { label: '도움말 Help' }
    ],
    activeIndex: 0,
    onTabChange: (tab, index) => {
      contentContainer.innerHTML = tabContents[index];
      new LinearComponents.Toast({
        message: `${tab.label} 탭으로 이동했습니다.`,
        type: 'info',
        duration: 1500
      }).show();
    }
  });

  container.appendChild(tabBar.render());
}

// FAB Demo
function initFabDemo() {
  const container = document.getElementById('fab-demo');
  if (!container) return;

  const fab = new MobileComponents.FloatingActionButton({
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
    onClick: () => {
      new LinearComponents.Toast({
        message: '새 항목을 추가합니다.',
        type: 'success'
      }).show();
    }
  });

  const fabElement = fab.render();
  fabElement.style.position = 'absolute';
  fabElement.style.bottom = '16px';
  fabElement.style.right = '16px';
  container.appendChild(fabElement);
}

// Bottom Sheet Demo
function showBottomSheetDemo() {
  if (!demoBottomSheet) {
    demoBottomSheet = new MobileComponents.BottomSheet({
      content: `
        <h3 style="margin-bottom: var(--spacing-4); color: var(--color-text-primary);">바텀 시트 예제</h3>
        <p style="color: var(--color-text-secondary); line-height: var(--leading-relaxed); margin-bottom: var(--spacing-4);">
          이것은 바텀 시트 컴포넌트입니다. 위의 핸들을 드래그하여 높이를 조절하거나 닫을 수 있습니다.
        </p>
        <div style="display: flex; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
          <button class="btn btn-primary" onclick="handleBottomSheetAction('확인')">확인</button>
          <button class="btn btn-secondary" onclick="handleBottomSheetAction('취소')">취소</button>
        </div>
        <div style="background: var(--color-bg-secondary); padding: var(--spacing-4); border-radius: var(--radius-md);">
          <h4 style="color: var(--color-text-primary); margin-bottom: var(--spacing-2);">추가 정보</h4>
          <p style="color: var(--color-text-tertiary); font-size: var(--text-sm);">
            바텀 시트는 모바일 앱에서 추가 컨텐츠나 액션을 표시하는 데 사용됩니다. 
            사용자 경험을 향상시키는 중요한 UI 패턴 중 하나입니다.
          </p>
        </div>
      `,
      onClose: () => {
        new LinearComponents.Toast({
          message: '바텀 시트가 닫혔습니다.',
          type: 'info'
        }).show();
      }
    });
  }
  demoBottomSheet.show();
}

// Bottom Sheet Action Handler
function handleBottomSheetAction(action) {
  new LinearComponents.Toast({
    message: `${action} 버튼이 클릭되었습니다.`,
    type: action === '확인' ? 'success' : 'info'
  }).show();
  
  if (demoBottomSheet) {
    demoBottomSheet.hide();
  }
}

// Export for global access
window.showActionSheetDemo = showActionSheetDemo;
window.showBottomSheetDemo = showBottomSheetDemo;
window.handleBottomSheetAction = handleBottomSheetAction;