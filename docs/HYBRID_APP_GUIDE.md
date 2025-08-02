# 오클러 하이브리드 앱 개발 가이드

## 1. 하이브리드 앱 선택 배경

### 1.1 킬러앱 전략과 하이브리드의 적합성
오클러는 **폐업 검색**과 **빈점포 검색** 두 가지 핵심 기능으로 승부하는 킬러앱입니다. 하이브리드 접근 방식이 적합한 이유:

- **빠른 시장 출시**: 네이티브 앱 대비 50% 빠른 개발 속도
- **데이터 중심 서비스**: UI보다 정보 표시가 핵심이므로 네이티브 성능 차이 미미
- **분기별 데이터 업데이트**: 웹뷰 기반으로 즉시 업데이트 가능
- **비용 효율성**: 1개 코드베이스로 iOS/Android 동시 지원

### 1.2 비교 분석: 네이티브 vs 하이브리드

| 구분 | 네이티브 | 하이브리드 (Ionic) | 선택 이유 |
|------|----------|-------------------|-----------|
| 개발 시간 | 8개월 | 4-5개월 | ✅ 빠른 출시 |
| 개발 비용 | 100% | 60% | ✅ 비용 절약 |
| 성능 | 100% | 85-90% | ✅ 충분한 성능 |
| 업데이트 | 스토어 승인 | 즉시 반영 | ✅ 데이터 업데이트 |
| 유지보수 | 2개 코드베이스 | 1개 코드베이스 | ✅ 유지보수성 |

---

## 2. 기술 스택 아키텍처

### 2.1 프론트엔드 스택
```yaml
Framework: Ionic 7.6.0
  - 장점: 네이티브 룩앤필, 성숙한 생태계
  - React 18 + TypeScript 지원
  - Capacitor 5 통합

Core Library: React 18.2.0
  - 장점: 기존 컴포넌트 재사용 가능
  - TypeScript 완전 지원
  - 풍부한 생태계

상태 관리: Zustand 4.4.0
  - 장점: Redux보다 간단, 작은 번들 크기
  - TypeScript 지원 우수
  - 킬러앱에 적합한 가벼움

빌드 도구: Vite 5.0.0
  - 장점: 개발 서버 빠른 시작
  - 번들 크기 최적화
  - React 18 완벽 지원
```

### 2.2 하이브리드 런타임
```yaml
Capacitor: 5.6.0
  - 장점: Cordova보다 현대적
  - 네이티브 플러그인 시스템
  - 웹 표준 API 우선

네이티브 플러그인:
  - @capacitor/geolocation: 현재 위치 확인
  - @capacitor/local-notifications: 푸시 알림
  - @capacitor/share: 업체 정보 공유
  - @capacitor/browser: 외부 링크 처리
  - @capacitor/haptics: 터치 피드백
```

---

## 3. 프로젝트 구조

### 3.1 디렉토리 구조
```
오클러-hybrid/
├── src/
│   ├── components/           # 재사용 컴포넌트
│   │   ├── mobile/          # 기존 모바일 컴포넌트
│   │   ├── ionic/           # Ionic 전용 컴포넌트
│   │   └── shared/          # 공통 컴포넌트
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home/           # 지역 선택 홈
│   │   ├── Filter/         # 다단계 필터
│   │   ├── Results/        # 검색 결과
│   │   └── StoreDetail/    # 업체 상세
│   ├── stores/             # Zustand 상태 관리
│   ├── services/           # API 서비스
│   ├── hooks/              # React 커스텀 훅
│   ├── types/              # TypeScript 타입
│   └── utils/              # 유틸리티 함수
├── public/                 # 정적 파일
├── ios/                    # iOS 네이티브 코드
├── android/                # Android 네이티브 코드
└── capacitor.config.ts     # Capacitor 설정
```

### 3.2 기존 컴포넌트 마이그레이션 전략
```javascript
// 기존 컴포넌트 래퍼 패턴
// components/ionic/RegionSelectorWrapper.tsx
import { IonContent, IonPage } from '@ionic/react';
import { RegionSelector } from '../mobile/RegionSelector'; // 기존 컴포넌트

export const IonicRegionSelector: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <RegionSelector />
      </IonContent>
    </IonPage>
  );
};
```

---

## 4. 설치 및 셋업 가이드

### 4.1 환경 요구사항
```bash
# Node.js 18.17.0 이상
node --version

# npm 9.0.0 이상 또는 yarn 1.22.0 이상
npm --version

# Ionic CLI 7.0.0 이상
npm install -g @ionic/cli

# Capacitor CLI 5.0.0 이상
npm install -g @capacitor/cli
```

### 4.2 프로젝트 초기화
```bash
# 1. Ionic React 프로젝트 생성
ionic start 오클러-hybrid tabs --type=react --capacitor

# 2. 프로젝트 디렉토리 이동
cd 오클러-hybrid

# 3. TypeScript 설정
npm install typescript @types/react @types/react-dom

# 4. 상태 관리 라이브러리 설치
npm install zustand

# 5. 개발 도구 설치
npm install -D vite @vitejs/plugin-react
```

### 4.3 기존 컴포넌트 통합
```bash
# 1. 기존 컴포넌트 복사
cp -r ../js/mobile-components.js src/components/mobile/
cp -r ../styles/ src/theme/

# 2. CSS to SCSS 변환 (선택사항)
npm install -D sass
mv src/theme/mobile-components.css src/theme/mobile-components.scss
```

---

## 5. 핵심 컴포넌트 하이브리드 적응

### 5.1 지역 선택기 Ionic 버전
```typescript
// pages/Home/HomePage.tsx
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Region {
  id: string;
  name: string;
  icon: string;
}

const REGIONS: Region[] = [
  { id: 'kyungsung', name: '경성', icon: '🏛️' },
  { id: 'gwangan', name: '광안', icon: '🏖️' },
  { id: 'nampo', name: '남포', icon: '🛍️' },
  { id: 'dukcheon', name: '덕천', icon: '🚇' },
  { id: 'dongnae', name: '동래', icon: '🏯' },
  { id: 'seomyeon', name: '서면', icon: '🎯' },
  { id: 'yeonsan', name: '연산', icon: '🌸' },
  { id: 'jeonpo', name: '전포', icon: '🎨' },
  { id: 'haeun', name: '해운', icon: '🌊' }
];

export const HomePage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const history = useHistory();

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handleNext = () => {
    if (selectedRegion) {
      history.push(`/filter?region=${selectedRegion}`);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="region-selector-header">
          <h1>지역을 선택해주세요</h1>
          <p>부산 9개 지역 중 검색할 지역을 선택하세요</p>
        </div>

        <IonGrid>
          <IonRow>
            {REGIONS.map((region) => (
              <IonCol size="4" key={region.id}>
                <IonButton
                  fill={selectedRegion === region.id ? "solid" : "outline"}
                  expand="block"
                  shape="round"
                  className="circular-category-btn"
                  onClick={() => handleRegionSelect(region.id)}
                >
                  <div className="region-content">
                    <span className="region-icon">{region.icon}</span>
                    <span className="region-name">{region.name}</span>
                  </div>
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <div className="region-actions">
          <IonButton
            expand="block"
            disabled={!selectedRegion}
            onClick={handleNext}
            className="region-next-btn"
          >
            다음 단계
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
```

### 5.2 상태 관리 (Zustand)
```typescript
// stores/searchStore.ts
import { create } from 'zustand';

interface SearchState {
  selectedRegion: string;
  selectedMainCategory: string;
  selectedSubCategory: string;
  statusFilters: string[];
  areaRange: [number, number];
  rentRange: [number, number];
  
  // Actions
  setRegion: (region: string) => void;
  setMainCategory: (category: string) => void;
  setSubCategory: (category: string) => void;
  setStatusFilters: (filters: string[]) => void;
  setAreaRange: (range: [number, number]) => void;
  setRentRange: (range: [number, number]) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  selectedRegion: '',
  selectedMainCategory: '',
  selectedSubCategory: '',
  statusFilters: ['operating'],
  areaRange: [0, 200],
  rentRange: [0, 10000000],

  setRegion: (region) => set({ selectedRegion: region }),
  setMainCategory: (category) => set({ selectedMainCategory: category }),
  setSubCategory: (category) => set({ selectedSubCategory: category }),
  setStatusFilters: (filters) => set({ statusFilters: filters }),
  setAreaRange: (range) => set({ areaRange: range }),
  setRentRange: (range) => set({ rentRange: range }),
  
  reset: () => set({
    selectedRegion: '',
    selectedMainCategory: '',
    selectedSubCategory: '',
    statusFilters: ['operating'],
    areaRange: [0, 200],
    rentRange: [0, 10000000],
  }),
}));
```

---

## 6. Capacitor 네이티브 기능 통합

### 6.1 위치 서비스
```typescript
// services/locationService.ts
import { Geolocation } from '@capacitor/geolocation';

export class LocationService {
  static async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };
    } catch (error) {
      console.error('위치 정보를 가져올 수 없습니다:', error);
      return null;
    }
  }

  static async watchPosition(callback: (coords: any) => void) {
    const watchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000 },
      callback
    );
    return watchId;
  }
}
```

### 6.2 햅틱 피드백
```typescript
// hooks/useHaptics.ts
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const lightImpact = () => {
    Haptics.impact({ style: ImpactStyle.Light });
  };

  const mediumImpact = () => {
    Haptics.impact({ style: ImpactStyle.Medium });
  };

  const heavyImpact = () => {
    Haptics.impact({ style: ImpactStyle.Heavy });
  };

  return { lightImpact, mediumImpact, heavyImpact };
};
```

### 6.3 공유 기능
```typescript
// components/ShareButton.tsx
import { Share } from '@capacitor/share';
import { IonButton, IonIcon } from '@ionic/react';
import { shareOutline } from 'ionicons/icons';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const handleShare = async () => {
    try {
      await Share.share({
        title,
        text,
        url,
        dialogTitle: '업체 정보 공유하기',
      });
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  return (
    <IonButton fill="clear" onClick={handleShare}>
      <IonIcon icon={shareOutline} />
      공유
    </IonButton>
  );
};
```

---

## 7. 빌드 및 배포

### 7.1 개발 환경 실행
```bash
# 웹 브라우저에서 개발
ionic serve

# iOS 시뮬레이터에서 테스트 (macOS만)
ionic capacitor run ios --livereload

# Android 에뮬레이터에서 테스트
ionic capacitor run android --livereload
```

### 7.2 프로덕션 빌드
```bash
# 1. 웹 앱 빌드
ionic build --prod

# 2. Capacitor 동기화
npx cap sync

# 3. iOS 앱 빌드 (Xcode 필요)
npx cap open ios

# 4. Android 앱 빌드 (Android Studio 필요)
npx cap open android
```

### 7.3 앱스토어 배포 준비
```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kr.co.occler.app',
  appName: '오클러',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#5E6AD2',
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0D1117',
      showSpinner: false,
    },
  },
};

export default config;
```

---

## 8. 성능 최적화

### 8.1 번들 크기 최적화
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ionic: ['@ionic/react', '@ionic/react-router'],
          utils: ['zustand', 'date-fns'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['@ionic/react', '@ionic/react-router'],
  },
});
```

### 8.2 메모리 최적화
```typescript
// hooks/useVirtualList.ts (대용량 리스트 처리)
import { useMemo, useState } from 'react';

export const useVirtualList = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  return { visibleItems, setScrollTop };
};
```

---

## 9. 테스트 전략

### 9.1 단위 테스트 (Jest + React Testing Library)
```typescript
// components/__tests__/RegionSelector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { RegionSelector } from '../RegionSelector';

describe('RegionSelector', () => {
  test('지역 선택 시 콜백이 호출된다', () => {
    const mockOnSelect = jest.fn();
    render(<RegionSelector onRegionSelect={mockOnSelect} />);
    
    const gwanganButton = screen.getByText('광안');
    fireEvent.click(gwanganButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith('gwangan');
  });
});
```

### 9.2 E2E 테스트 (Cypress)
```typescript
// cypress/e2e/search-flow.cy.ts
describe('검색 플로우', () => {
  it('지역 선택부터 결과 조회까지 완료', () => {
    cy.visit('/');
    
    // 지역 선택
    cy.get('[data-testid="region-gwangan"]').click();
    cy.get('[data-testid="next-button"]').click();
    
    // 업종 선택
    cy.get('[data-testid="category-restaurant"]').click();
    cy.get('[data-testid="subcategory-korean"]').click();
    
    // 결과 확인
    cy.get('[data-testid="store-card"]').should('be.visible');
  });
});
```

---

## 10. 마이그레이션 체크리스트

### 10.1 단계별 마이그레이션
- [ ] **1단계**: Ionic 프로젝트 셋업
- [ ] **2단계**: 기존 CSS/JS 파일 통합
- [ ] **3단계**: 핵심 컴포넌트 Ionic 적응
- [ ] **4단계**: 라우팅 시스템 구축
- [ ] **5단계**: 상태 관리 통합
- [ ] **6단계**: API 서비스 연동
- [ ] **7단계**: 네이티브 기능 추가
- [ ] **8단계**: 성능 최적화
- [ ] **9단계**: 테스트 코드 작성
- [ ] **10단계**: 빌드 및 배포 준비

### 10.2 품질 확인 항목
- [ ] 모든 기존 컴포넌트 동작 확인
- [ ] 터치 영역 44px 이상 확보
- [ ] 로딩 시간 3초 이내 달성
- [ ] 메모리 사용량 50MB 이하
- [ ] iOS/Android 호환성 확인
- [ ] 접근성 WCAG 2.1 AA 준수

---

## 11. 예상 이슈 및 해결책

### 11.1 성능 이슈
**문제**: 하이브리드 앱 특성상 네이티브 대비 성능 저하
**해결책**:
- Ionic의 가상 스크롤 사용
- 이미지 지연 로딩 적용
- 네이티브 플러그인 활용 (위치, 카메라 등)

### 11.2 디자인 일관성
**문제**: iOS/Android 디자인 가이드라인 차이
**해결책**:
- Ionic Variables 활용한 플랫폼별 스타일
- MD/iOS 모드 자동 전환
- 커스텀 테마로 브랜드 정체성 유지

### 11.3 오프라인 지원
**문제**: 네트워크 연결 불안정 시 사용성 저하
**해결책**:
- Service Worker 캐싱 전략
- 오프라인 페이지 제공
- 데이터 동기화 큐 시스템

---

**작성일**: 2025-01-30  
**버전**: v1.0  
**작성자**: 개발팀 리드  
**검토 필요**: CTO, 모바일 개발팀

---

> 🚀 **오클러 하이브리드 앱으로 빠른 시장 진입!**  
> 네이티브 수준의 UX와 웹의 개발 효율성을 모두 확보하여 킬러앱의 성공을 보장합니다!