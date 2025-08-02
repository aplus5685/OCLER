# 오클러 검색 기능 컴포넌트 명세서

## 1. 검색 기능 아키텍처

### 1.1 킬러앱 검색 전략
오클러의 2가지 핵심 검색 기능:
- **🔥 폐업 검색 (무료)**: STEP 1-3 간단한 기본 검색
- **💎 빈점포 검색 (유료)**: STEP 1-8 고급 검색 + 분석

### 1.2 사용자 여정별 검색 플로우
```
일반유저 (무료):
지역선택 → 업종선택 → 소분류 → 폐업업체 결과

예비창업자 (유료):
지역선택 → 업종선택 → 소분류 → 페이월 → 고급옵션 → 빈점포 결과
```

---

## 2. 기본 검색 컴포넌트 (무료)

### 2.1 BasicSearchFlow 컴포넌트
**목적**: 폐업 검색을 위한 3단계 간단 검색

```typescript
interface BasicSearchFlowProps {
  onSearchComplete: (results: ClosedStore[]) => void;
  onUpgradePrompt?: () => void; // 유료 전환 유도
}

interface BasicSearchState {
  step: 1 | 2 | 3;
  selectedRegion: string;
  selectedMainCategory: string;
  selectedSubCategory: string;
}

export const BasicSearchFlow: React.FC<BasicSearchFlowProps> = ({
  onSearchComplete,
  onUpgradePrompt
}) => {
  const [state, setState] = useState<BasicSearchState>({
    step: 1,
    selectedRegion: '',
    selectedMainCategory: '',
    selectedSubCategory: ''
  });

  return (
    <div className="basic-search-flow">
      {state.step === 1 && (
        <RegionSelector 
          onSelect={(region) => {
            setState(prev => ({ ...prev, selectedRegion: region, step: 2 }));
          }}
        />
      )}
      
      {state.step === 2 && (
        <MainCategorySelector
          onSelect={(category) => {
            setState(prev => ({ ...prev, selectedMainCategory: category, step: 3 }));
          }}
          onBack={() => setState(prev => ({ ...prev, step: 1 }))}
        />
      )}
      
      {state.step === 3 && (
        <SubCategorySelector
          mainCategory={state.selectedMainCategory}
          onSelect={(subCategory) => {
            setState(prev => ({ ...prev, selectedSubCategory: subCategory }));
            handleBasicSearch({ ...state, selectedSubCategory: subCategory });
          }}
          onBack={() => setState(prev => ({ ...prev, step: 2 }))}
          onUpgrade={onUpgradePrompt} // 고급 검색 유도
        />
      )}
    </div>
  );
};
```

### 2.2 MainCategorySelector 컴포넌트
**업종 대분류 선택**

```typescript
interface MainCategory {
  id: string;
  name: string;
  icon: string;
  subCount: number; // 하위 카테고리 수
  description: string;
}

const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'restaurant',
    name: '음식점',
    icon: '🍽️',
    subCount: 12,
    description: '한식, 중식, 양식, 카페 등'
  },
  {
    id: 'retail',
    name: '소매업',
    icon: '🛍️', 
    subCount: 8,
    description: '의류, 잡화, 편의점 등'
  },
  {
    id: 'service',
    name: '서비스업',
    icon: '✂️',
    subCount: 10,
    description: '미용, 교육, 수리 등'
  },
  {
    id: 'entertainment',
    name: '여가/오락',
    icon: '🎮',
    subCount: 6,
    description: 'PC방, 노래방, 체육시설 등'
  }
];

export const MainCategorySelector: React.FC<MainCategorySelectorProps> = ({
  onSelect,
  onBack
}) => {
  return (
    <div className="main-category-selector">
      <div className="category-header">
        <BackButton onClick={onBack} />
        <h2>업종을 선택해주세요</h2>
        <p>어떤 종류의 업체를 찾고 계신가요?</p>
      </div>
      
      <div className="category-grid">
        {MAIN_CATEGORIES.map(category => (
          <div 
            key={category.id}
            className="category-card"
            onClick={() => onSelect(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <span className="sub-count">{category.subCount}개 세부업종</span>
          </div>
        ))}
      </div>
      
      <div className="upgrade-hint">
        <p>🔥 더 정확한 검색을 원하시나요?</p>
        <button className="upgrade-btn-hint">고급 검색 보기</button>
      </div>
    </div>
  );
};
```

### 2.3 SubCategorySelector 컴포넌트
**업종 소분류 선택**

```typescript
interface SubCategory {
  id: string;
  name: string;
  mainCategoryId: string;
  storeCount: number; // 해당 업종 업체 수
}

const SUB_CATEGORIES: { [key: string]: SubCategory[] } = {
  restaurant: [
    { id: 'korean', name: '한식', mainCategoryId: 'restaurant', storeCount: 1234 },
    { id: 'chinese', name: '중식', mainCategoryId: 'restaurant', storeCount: 567 },
    { id: 'western', name: '양식', mainCategoryId: 'restaurant', storeCount: 432 },
    { id: 'japanese', name: '일식', mainCategoryId: 'restaurant', storeCount: 345 },
    { id: 'cafe', name: '카페/디저트', mainCategoryId: 'restaurant', storeCount: 678 },
    { id: 'fastfood', name: '패스트푸드', mainCategoryId: 'restaurant', storeCount: 234 },
    { id: 'chicken', name: '치킨/피자', mainCategoryId: 'restaurant', storeCount: 456 },
    { id: 'pub', name: '술집/호프', mainCategoryId: 'restaurant', storeCount: 389 }
  ],
  retail: [
    { id: 'clothing', name: '의류', mainCategoryId: 'retail', storeCount: 567 },
    { id: 'convenience', name: '편의점', mainCategoryId: 'retail', storeCount: 123 },
    { id: 'pharmacy', name: '약국', mainCategoryId: 'retail', storeCount: 89 },
    { id: 'cosmetics', name: '화장품', mainCategoryId: 'retail', storeCount: 234 }
  ]
  // ... 기타 카테고리들
};

export const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  mainCategory,
  onSelect,
  onBack,
  onUpgrade
}) => {
  const subCategories = SUB_CATEGORIES[mainCategory] || [];
  
  return (
    <div className="sub-category-selector">
      <div className="category-header">
        <BackButton onClick={onBack} />
        <h2>세부 업종을 선택해주세요</h2>
      </div>
      
      <div className="sub-category-list">
        {subCategories.map(subCategory => (
          <div 
            key={subCategory.id}
            className="sub-category-item"
            onClick={() => onSelect(subCategory.id)}
          >
            <span className="sub-name">{subCategory.name}</span>
            <span className="store-count">{subCategory.storeCount.toLocaleString()}개</span>
          </div>
        ))}
      </div>
      
      <div className="search-upgrade-prompt">
        <div className="prompt-card">
          <h3>🎯 더 정확한 검색이 필요하세요?</h3>
          <p>면적, 임대료, 주차 등 상세 조건으로 검색해보세요</p>
          <button className="upgrade-button" onClick={onUpgrade}>
            💎 프리미엄 검색 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. 고급 검색 컴포넌트 (유료)

### 3.1 PremiumSearchFlow 컴포넌트
**8단계 고급 검색 플로우**

```typescript
interface PremiumSearchFlowProps {
  userTier: 'free' | 'premium';
  onPaymentRequired: (feature: string) => void;
  onSearchComplete: (results: VacantStore[]) => void;
}

interface PremiumSearchState extends BasicSearchState {
  // 고급 검색 옵션들
  detailedAddress: string;      // 상세 주소
  specificProduct: string;      // 특정 상품/서비스  
  managerInfo: string;          // 기획관/담당자
  parkingRequired: boolean;     // 주차 정보
  areaRange: [number, number];  // 평수 범위
  operatingHours: string[];     // 운영시간
  hasEvents: boolean;           // 이벤트 진행
  newBusinessOnly: boolean;     // 신상업체만
}

export const PremiumSearchFlow: React.FC<PremiumSearchFlowProps> = ({
  userTier,
  onPaymentRequired,
  onSearchComplete
}) => {
  const [state, setState] = useState<PremiumSearchState>({
    step: 1,
    selectedRegion: '',
    selectedMainCategory: '',
    selectedSubCategory: '',
    detailedAddress: '',
    specificProduct: '',
    managerInfo: '',
    parkingRequired: false,
    areaRange: [0, 200],
    operatingHours: [],
    hasEvents: false,
    newBusinessOnly: false
  });

  // 유료 기능 접근 시 권한 체크
  const checkPremiumAccess = (feature: string) => {
    if (userTier !== 'premium') {
      onPaymentRequired(feature);
      return false;
    }
    return true;
  };

  return (
    <div className="premium-search-flow">
      {/* 기본 3단계는 동일 */}
      {state.step <= 3 && (
        <BasicSearchFlow 
          onSearchComplete={() => {
            if (checkPremiumAccess('advanced_search')) {
              setState(prev => ({ ...prev, step: 4 }));
            }
          }}
        />
      )}
      
      {/* 고급 검색 단계들 */}
      {state.step === 4 && (
        <AddressDetailSelector
          onNext={(address) => {
            setState(prev => ({ ...prev, detailedAddress: address, step: 5 }));
          }}
          onBack={() => setState(prev => ({ ...prev, step: 3 }))}
        />
      )}
      
      {state.step === 5 && (
        <AreaRentSelector
          onNext={(area, rent) => {
            setState(prev => ({ ...prev, areaRange: area, step: 6 }));
          }}
          onBack={() => setState(prev => ({ ...prev, step: 4 }))}
        />
      )}
      
      {/* ... 기타 고급 검색 단계들 */}
    </div>
  );
};
```

### 3.2 AreaRentSelector 컴포넌트
**면적/임대료 범위 설정**

```typescript
interface AreaRentSelectorProps {
  onNext: (areaRange: [number, number], rentRange: [number, number]) => void;
  onBack: () => void;
}

export const AreaRentSelector: React.FC<AreaRentSelectorProps> = ({
  onNext,
  onBack
}) => {
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 200]);
  const [rentRange, setRentRange] = useState<[number, number]>([0, 10000000]);

  return (
    <div className="area-rent-selector">
      <div className="selector-header">
        <BackButton onClick={onBack} />
        <h2>면적과 임대료를 설정해주세요</h2>
        <p>원하는 규모와 예산 범위를 선택하세요</p>
      </div>

      <div className="range-selectors">
        <div className="range-section">
          <h3>🏢 면적 (평)</h3>
          <RangeSlider
            min={0}
            max={200}
            value={areaRange}
            onChange={setAreaRange}
            step={5}
            marks={[
              { value: 0, label: '0평' },
              { value: 30, label: '30평' },
              { value: 50, label: '50평' },
              { value: 100, label: '100평' },
              { value: 200, label: '200평+' }
            ]}
          />
          <div className="range-display">
            {areaRange[0]}평 ~ {areaRange[1] === 200 ? '200평+' : `${areaRange[1]}평`}
          </div>
        </div>

        <div className="range-section">
          <h3>💰 월 임대료 (만원)</h3>
          <RangeSlider
            min={0}
            max={1000}
            value={[rentRange[0] / 10000, rentRange[1] / 10000]}
            onChange={([min, max]) => setRentRange([min * 10000, max * 10000])}
            step={10}
            marks={[
              { value: 0, label: '0' },
              { value: 100, label: '100만' },
              { value: 300, label: '300만' },
              { value: 500, label: '500만' },
              { value: 1000, label: '1000만+' }
            ]}
          />
          <div className="range-display">
            {(rentRange[0] / 10000).toLocaleString()}만원 ~ 
            {rentRange[1] === 10000000 ? '1000만원+' : `${(rentRange[1] / 10000).toLocaleString()}만원`}
          </div>
        </div>
      </div>

      <div className="preset-buttons">
        <h4>빠른 설정</h4>
        <div className="preset-grid">
          <button onClick={() => {
            setAreaRange([10, 30]);
            setRentRange([500000, 1500000]);
          }}>
            소규모 창업 (10-30평, 50-150만원)
          </button>
          <button onClick={() => {
            setAreaRange([30, 70]);
            setRentRange([1500000, 4000000]);
          }}>
            중규모 매장 (30-70평, 150-400만원)
          </button>
          <button onClick={() => {
            setAreaRange([70, 200]);
            setRentRange([4000000, 10000000]);
          }}>
            대형 매장 (70평+, 400만원+)
          </button>
        </div>
      </div>

      <div className="selector-actions">
        <button className="back-btn" onClick={onBack}>
          이전
        </button>
        <button 
          className="next-btn"
          onClick={() => onNext(areaRange, rentRange)}
        >
          다음 (운영시간 설정)
        </button>
      </div>
    </div>
  );
};
```

### 3.3 OperatingHoursSelector 컴포넌트
**운영시간 선택**

```typescript
interface OperatingHour {
  id: string;
  name: string;
  timeRange: string;
  description: string;
}

const OPERATING_HOURS: OperatingHour[] = [
  {
    id: 'morning',
    name: '아침 운영',
    timeRange: '06:00-11:00',
    description: '모닝 카페, 조식 전문점'
  },
  {
    id: 'lunch',
    name: '점심 운영',
    timeRange: '11:00-15:00',
    description: '직장인 대상 식당'
  },
  {
    id: 'evening',
    name: '저녁 운영',
    timeRange: '17:00-22:00',
    description: '일반 식당, 카페'
  },
  {
    id: 'night',
    name: '야간 운영',
    timeRange: '22:00-02:00',
    description: '술집, 야식, 24시간'
  },
  {
    id: 'allday',
    name: '종일 운영',
    timeRange: '06:00-22:00',
    description: '편의점, 카페 등'
  }
];

export const OperatingHoursSelector: React.FC<OperatingHoursSelectorProps> = ({
  onNext,
  onBack
}) => {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const toggleHour = (hourId: string) => {
    setSelectedHours(prev => 
      prev.includes(hourId) 
        ? prev.filter(id => id !== hourId)
        : [...prev, hourId]
    );
  };

  return (
    <div className="operating-hours-selector">
      <div className="selector-header">
        <BackButton onClick={onBack} />
        <h2>운영시간을 선택해주세요</h2>
        <p>언제 운영할 계획이신가요? (복수 선택 가능)</p>
      </div>

      <div className="hours-grid">
        {OPERATING_HOURS.map(hour => (
          <div 
            key={hour.id}
            className={`hour-card ${selectedHours.includes(hour.id) ? 'selected' : ''}`}
            onClick={() => toggleHour(hour.id)}
          >
            <div className="hour-header">
              <h3>{hour.name}</h3>
              <span className="time-range">{hour.timeRange}</span>
            </div>
            <p className="hour-description">{hour.description}</p>
            {selectedHours.includes(hour.id) && (
              <div className="selected-indicator">✓</div>
            )}
          </div>
        ))}
      </div>

      <div className="business-insights">
        <h4>💡 운영시간별 예상 고객층</h4>
        <div className="insights-list">
          {selectedHours.includes('morning') && (
            <div className="insight-item">
              <span className="time">아침:</span> 출근족, 학생, 조깅족
            </div>
          )}
          {selectedHours.includes('lunch') && (
            <div className="insight-item">
              <span className="time">점심:</span> 직장인, 회사원, 학생
            </div>
          )}
          {selectedHours.includes('evening') && (
            <div className="insight-item">
              <span className="time">저녁:</span> 가족단위, 친구모임, 데이트
            </div>
          )}
          {selectedHours.includes('night') && (
            <div className="insight-item">
              <span className="time">야간:</span> 직장인 회식, 야식족, 주말 모임
            </div>
          )}
        </div>
      </div>

      <div className="selector-actions">
        <button className="back-btn" onClick={onBack}>
          이전
        </button>
        <button 
          className="next-btn"
          disabled={selectedHours.length === 0}
          onClick={() => onNext(selectedHours)}
        >
          다음 (추가 옵션)
        </button>
      </div>
    </div>
  );
};
```

---

## 4. 검색 결과 컴포넌트

### 4.1 SearchResults 컴포넌트
**무료/유료 결과 통합 표시**

```typescript
interface SearchResultsProps {
  results: (ClosedStore | VacantStore)[];
  searchType: 'basic' | 'premium';
  userTier: 'free' | 'premium';
  onUpgrade?: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchType,
  userTier,
  onUpgrade
}) => {
  return (
    <div className="search-results">
      <div className="results-header">
        <h2>검색 결과 ({results.length}개)</h2>
        <div className="results-actions">
          <ViewToggle mode="list" onToggle={() => {}} />
          <SortSelector onSort={() => {}} />
        </div>
      </div>

      {searchType === 'basic' && userTier === 'free' && (
        <div className="upgrade-banner">
          <h3>🔥 더 많은 정보가 필요하신가요?</h3>
          <p>빈점포 전용 검색, 임대료 정보, 연락처까지!</p>
          <button className="upgrade-btn" onClick={onUpgrade}>
            프리미엄으로 업그레이드
          </button>
        </div>
      )}

      <div className="results-list">
        {results.map((store, index) => (
          <div key={store.id || index}>
            {searchType === 'basic' ? (
              <ClosedStoreCard store={store as ClosedStore} />
            ) : (
              <VacantStoreCard store={store as VacantStore} />
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="no-results">
          <h3>검색 결과가 없습니다</h3>
          <p>검색 조건을 변경해보세요</p>
          <button className="modify-search-btn">
            검색 조건 수정
          </button>
        </div>
      )}
    </div>
  );
};
```

### 4.2 VacantStoreCard 컴포넌트
**빈점포 전용 카드**

```typescript
interface VacantStore extends BaseStore {
  monthlyRent: number;
  deposit: number;
  availableDate: Date;
  landlordContact?: string; // 프리미엄만
  marketScore?: number;     // 프리미엄만
  competitorCount?: number; // 프리미엄만
}

export const VacantStoreCard: React.FC<{ store: VacantStore }> = ({ store }) => {
  return (
    <div className="vacant-store-card premium-card">
      <div className="card-header">
        <div className="store-info">
          <h3>{store.name || '빈점포'}</h3>
          <p className="address">{store.address}</p>
        </div>
        <div className="premium-badge">💎 프리미엄</div>
      </div>

      <div className="rental-info">
        <div className="rent-item">
          <span className="label">월 임대료</span>
          <span className="value">{store.monthlyRent.toLocaleString()}만원</span>
        </div>
        <div className="rent-item">
          <span className="label">보증금</span>
          <span className="value">{store.deposit.toLocaleString()}만원</span>
        </div>
        <div className="rent-item">
          <span className="label">면적</span>
          <span className="value">{store.area}평</span>
        </div>
        <div className="rent-item">
          <span className="label">입주가능</span>
          <span className="value">{formatDate(store.availableDate)}</span>
        </div>
      </div>

      {store.marketScore && (
        <div className="market-analysis">
          <h4>📊 상권 분석</h4>
          <div className="analysis-row">
            <span>상권 점수</span>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${store.marketScore}%` }}
              />
              <span className="score-text">{store.marketScore}/100</span>
            </div>
          </div>
          {store.competitorCount && (
            <div className="analysis-row">
              <span>경쟁업체</span>
              <span>{store.competitorCount}개 (반경 500m)</span>
            </div>
          )}
        </div>
      )}

      <div className="card-actions">
        <button className="contact-btn">
          📞 연락처 보기
        </button>
        <button className="favorite-btn">
          ❤️ 관심목록
        </button>
        <button className="analysis-btn">
          📊 상세 분석
        </button>
      </div>
    </div>
  );
};
```

---

## 5. 공통 컴포넌트

### 5.1 RangeSlider 컴포넌트
**범위 설정용 슬라이더**

```typescript
interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  marks?: { value: number; label: string }[];
  unit?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  marks = [],
  unit = ''
}) => {
  const handleSliderChange = (newValue: [number, number]) => {
    onChange(newValue);
  };

  return (
    <div className="range-slider">
      <div className="slider-track">
        <div 
          className="slider-range"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            width: `${((value[1] - value[0]) / (max - min)) * 100}%`
          }}
        />
        
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          step={step}
          onChange={(e) => handleSliderChange([Number(e.target.value), value[1]])}
          className="slider-thumb slider-thumb-min"
        />
        
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          step={step}
          onChange={(e) => handleSliderChange([value[0], Number(e.target.value)])}
          className="slider-thumb slider-thumb-max"
        />
      </div>

      {marks.length > 0 && (
        <div className="slider-marks">
          {marks.map(mark => (
            <div 
              key={mark.value}
              className="slider-mark"
              style={{ left: `${((mark.value - min) / (max - min)) * 100}%` }}
            >
              <span className="mark-label">{mark.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="range-values">
        <span>{value[0]}{unit}</span>
        <span>~</span>
        <span>{value[1]}{unit}</span>
      </div>
    </div>
  );
};
```

### 5.2 BackButton 컴포넌트
**뒤로가기 버튼**

```typescript
interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  label = '이전' 
}) => {
  return (
    <button className="back-button" onClick={onClick}>
      <span className="back-icon">←</span>
      <span className="back-label">{label}</span>
    </button>
  );
};
```

---

## 6. 성능 최적화

### 6.1 검색 결과 가상화
```typescript
// hooks/useVirtualizedResults.ts
export const useVirtualizedResults = (results: any[], itemHeight: number) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  
  const getVisibleItems = () => {
    return results.slice(visibleRange.start, visibleRange.end);
  };

  return { visibleItems: getVisibleItems(), setVisibleRange };
};
```

### 6.2 검색 디바운싱
```typescript
// hooks/useSearchDebounce.ts
export const useSearchDebounce = (searchFn: Function, delay: number = 300) => {
  const [debouncedSearchFn] = useMemo(
    () => debounce(searchFn, delay),
    [searchFn, delay]
  );

  return debouncedSearchFn;
};
```

---

## 7. 테스트 케이스

### 7.1 기본 검색 플로우 테스트
```typescript
describe('BasicSearchFlow', () => {
  test('지역 → 업종 → 소분류 선택 플로우', async () => {
    render(<BasicSearchFlow onSearchComplete={mockCallback} />);
    
    // Step 1: 지역 선택
    fireEvent.click(screen.getByText('광안'));
    
    // Step 2: 업종 선택
    await waitFor(() => {
      expect(screen.getByText('업종을 선택해주세요')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('음식점'));
    
    // Step 3: 소분류 선택
    await waitFor(() => {
      expect(screen.getByText('세부 업종을 선택해주세요')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('한식'));
    
    // 검색 결과 확인
    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        region: 'gwangan',
        mainCategory: 'restaurant',
        subCategory: 'korean'
      })
    );
  });
});
```

---

**작성일**: 2025-01-30  
**버전**: v1.0  
**작성자**: 개발팀 리드  
**검토자**: UX 팀, 기획팀

---

> 🔍 **오클러 검색 컴포넌트 전략**  
> 간단한 무료 검색으로 사용자 확보 → 고급 유료 검색으로 수익화 극대화! 💎