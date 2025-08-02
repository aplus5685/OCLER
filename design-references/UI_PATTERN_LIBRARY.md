# 오클러 UI 패턴 및 컴포넌트 라이브러리

> **목적**: 오클러 앱의 일관된 UI 경험을 위한 컴포넌트 가이드  
> **적용 범위**: iOS/Android 모바일 앱  
> **업데이트**: 2025.07.30

## 🧩 컴포넌트 아키텍처

### 계층 구조
```
Atoms (기본 요소)
├── Button, Input, Icon, Badge
├── Typography, Spacing
└── Color Tokens

Molecules (조합 요소)  
├── Search Bar, Filter Chip
├── Status Indicator, Rating
└── Action Button Group

Organisms (복합 요소)
├── Business Card, Map Pin
├── Search Header, Filter Panel
└── Business Detail Sheet

Templates (레이아웃)
├── List View Template
├── Map View Template  
└── Detail View Template
```

## 🔤 Typography System

### 폰트 패밀리
- **iOS**: SF Pro Display/Text
- **Android**: Roboto/Noto Sans CJK KR

### 타이포그래피 스케일
```css
/* Heading Styles */
.text-h1 { font-size: 28px; font-weight: 700; line-height: 34px; }
.text-h2 { font-size: 24px; font-weight: 600; line-height: 30px; }
.text-h3 { font-size: 20px; font-weight: 600; line-height: 26px; }

/* Body Styles */
.text-body-lg { font-size: 18px; font-weight: 400; line-height: 24px; }
.text-body { font-size: 16px; font-weight: 400; line-height: 22px; }
.text-body-sm { font-size: 14px; font-weight: 400; line-height: 20px; }

/* Caption & Label */
.text-caption { font-size: 12px; font-weight: 400; line-height: 16px; }
.text-label { font-size: 14px; font-weight: 500; line-height: 18px; }
.text-label-sm { font-size: 12px; font-weight: 500; line-height: 16px; }
```

### 상태별 텍스트 스타일
```css
/* 영업중 */
.text-open {
  color: #16A34A;
  font-weight: 600;
}

/* 폐업 */
.text-closed {
  color: #DC2626;
  font-weight: 500;
  text-decoration: line-through;
}

/* 빈점포 */
.text-vacant {
  color: #6B7280;
  font-weight: 400;
  font-style: italic;
}
```

## 🎨 컴포넌트 라이브러리

### 1. Atoms (기본 요소)

#### 1.1 Button 컴포넌트
```typescript
// Primary Button
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

// 스타일 정의
.btn-primary {
  background: #3B82F6;
  color: white;
  border-radius: 8px;
  font-weight: 600;
}

.btn-secondary {
  background: transparent;
  color: #3B82F6;
  border: 1px solid #3B82F6;
}

.btn-ghost {
  background: transparent;
  color: #374151;
}

.btn-danger {
  background: #DC2626;
  color: white;
}
```

#### 1.2 Status Badge 컴포넌트
```typescript
interface StatusBadgeProps {
  status: 'open' | 'closed' | 'vacant';
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

// 스타일 구현
.badge-open {
  background: #DCFCE7;
  color: #16A34A;
  border: 1px solid #16A34A;
}

.badge-closed {
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #DC2626;
}

.badge-vacant {
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #9CA3AF;
}
```

#### 1.3 Icon System
```typescript
// 상태별 아이콘 매핑
const StatusIcons = {
  open: '🟢',      // 또는 체크마크
  closed: '🔴',    // 또는 X 마크  
  vacant: '⚪',    // 또는 대시
  loading: '⏳',   // 로딩 스피너
}

// 카테고리 아이콘
const CategoryIcons = {
  restaurant: '🍽️',
  cafe: '☕',
  retail: '🛍️',
  service: '🔧',
  medical: '🏥',
  beauty: '💄',
}
```

### 2. Molecules (조합 요소)

#### 2.1 Search Bar 컴포넌트
```typescript
interface SearchBarProps {
  placeholder: string;
  value: string;
  onSearch: (query: string) => void;
  onFilter: () => void;
  filterCount?: number;
  suggestions?: string[];
}

// 레이아웃 구조
<SearchContainer>
  <SearchInput placeholder="업체명, 업종, 지역 검색" />
  <FilterButton badge={filterCount} />
  <VoiceSearchButton />
</SearchContainer>
```

#### 2.2 Business Card 컴포넌트
```typescript
interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    category: string;
    address: string;
    status: 'open' | 'closed' | 'vacant';
    phone?: string;
    rating?: number;
    distance?: number;
    image?: string;
  };
  onPress: (id: string) => void;
  layout: 'list' | 'grid';
}

// 카드 레이아웃
<Card>
  <ImageContainer>
    <BusinessImage />
    <StatusBadge status={status} />
  </ImageContainer>
  
  <ContentContainer>
    <BusinessName>{name}</BusinessName>
    <CategoryText>{category}</CategoryText>
    <AddressText>{address}</AddressText>
    
    <MetaRow>
      <DistanceText>{distance}m</DistanceText>
      <RatingText>⭐ {rating}</RatingText>
    </MetaRow>
  </ContentContainer>
  
  <ActionContainer>
    <CallButton />
    <DirectionButton />
  </ActionContainer>
</Card>
```

#### 2.3 Filter Chip 컴포넌트
```typescript
interface FilterChipProps {
  label: string;
  active: boolean;
  count?: number;
  onToggle: () => void;
  removable?: boolean;
}

// 필터 상태별 스타일
.filter-chip {
  border-radius: 20px;
  padding: 6px 12px;
  border: 1px solid #E5E7EB;
}

.filter-chip-active {
  background: #3B82F6;
  color: white;
  border-color: #3B82F6;
}
```

### 3. Organisms (복합 요소)

#### 3.1 Search Header 컴포넌트
```typescript
interface SearchHeaderProps {
  onViewToggle: (view: 'list' | 'map') => void;
  currentView: 'list' | 'map';
  resultCount: number;
  onSort: (sortBy: string) => void;
  sortOptions: SortOption[];
}

<Header>
  <SearchBar />
  <FilterRow>
    <FilterChips />
    <ViewToggle />
    <SortButton />
  </FilterRow>
  <ResultSummary>
    {resultCount}개 업체 • {activeFilters.length}개 필터 적용
  </ResultSummary>
</Header>
```

#### 3.2 Business List 컴포넌트
```typescript
interface BusinessListProps {
  businesses: Business[];
  loading: boolean;
  onLoadMore: () => void;
  onBusinessPress: (id: string) => void;
  layout: 'card' | 'compact';
}

<VirtualizedList>
  {businesses.map(business => 
    <BusinessCard 
      key={business.id}
      business={business}
      layout={layout}
      onPress={onBusinessPress}
    />
  )}
  <LoadMoreIndicator loading={loading} />
</VirtualizedList>
```

#### 3.3 Map View 컴포넌트
```typescript
interface MapViewProps {
  businesses: Business[];
  center: Coordinate;
  onRegionChange: (region: Region) => void;
  onMarkerPress: (businessId: string) => void;
  clustering: boolean;
}

<MapContainer>
  <Map>
    {businesses.map(business => 
      <Marker 
        coordinate={business.coordinate}
        status={business.status}
        onPress={() => onMarkerPress(business.id)}
      />
    )}
  </Map>
  
  <MapControls>
    <LocationButton />
    <ClusterToggle />
  </MapControls>
  
  <BottomSheet>
    <BusinessPreview />
  </BottomSheet>
</MapContainer>
```

#### 3.4 Business Detail Sheet
```typescript
interface BusinessDetailProps {
  business: BusinessDetail;
  onClose: () => void;
  onCall: (phone: string) => void;
  onDirection: (coordinate: Coordinate) => void;
}

<BottomSheet>
  <Header>
    <CloseButton />
    <ShareButton />
    <BookmarkButton />
  </Header>
  
  <Content>
    <ImageGallery images={business.images} />
    
    <InfoSection>
      <BusinessName>{business.name}</BusinessName>
      <StatusBadge status={business.status} />
      <CategoryText>{business.category}</CategoryText>
    </InfoSection>
    
    <ContactSection>
      <PhoneRow onPress={() => onCall(business.phone)} />
      <AddressRow onPress={() => onDirection(business.coordinate)} />
      <WebsiteRow url={business.website} />
    </ContactSection>
    
    <DetailsSection>
      <OpeningHours hours={business.hours} />
      <Amenities amenities={business.amenities} />
      <Reviews reviews={business.reviews} />
    </DetailsSection>
  </Content>
</BottomSheet>
```

## 🎭 상태 관리 패턴

### Loading States
```typescript
// 로딩 상태별 UI
const LoadingStates = {
  initial: <InitialLoader />,
  searching: <SearchLoader />,
  loadingMore: <LoadMoreSpinner />,
  refreshing: <PullToRefresh />,
}

// 스켈레톤 로더
<SkeletonCard>
  <SkeletonImage />
  <SkeletonText lines={3} />
  <SkeletonBadge />
</SkeletonCard>
```

### Empty States
```typescript
// 빈 상태별 메시지
const EmptyStates = {
  noResults: {
    icon: '🔍',
    title: '검색 결과가 없습니다',
    description: '다른 키워드로 검색해보세요',
    action: '필터 초기화'
  },
  noLocation: {
    icon: '📍',
    title: '위치 권한이 필요합니다',
    description: '내 주변 업체를 찾으려면 위치 권한을 허용해주세요',
    action: '위치 권한 설정'
  }
}
```

### Error States
```typescript
// 에러 상태별 처리
const ErrorStates = {
  network: {
    icon: '📶',
    title: '인터넷 연결을 확인해주세요',
    action: '다시 시도'
  },
  server: {
    icon: '⚠️',
    title: '일시적인 오류가 발생했습니다',
    action: '새로고침'
  }
}
```

## 📱 반응형 디자인

### 브레이크포인트
```css
/* 화면 크기별 정의 */
@media (max-width: 375px) { /* iPhone SE */ }
@media (max-width: 414px) { /* iPhone Plus */ }
@media (max-width: 768px) { /* iPad Portrait */ }
@media (min-width: 769px) { /* iPad Landscape */ }
```

### 적응형 레이아웃
```typescript
// 화면 크기에 따른 컴포넌트 변형
const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  
  return {
    columns: width > 768 ? 2 : 1,
    cardSize: width > 414 ? 'large' : 'medium',
    showSidebar: width > 768,
  };
};
```

## 🎨 애니메이션 가이드

### 마이크로 인터랙션
```css
/* 버튼 호버/탭 효과 */
.btn:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

/* 카드 탭 효과 */
.card:active {
  opacity: 0.8;
  transform: scale(0.98);
  transition: all 0.2s ease;
}
```

### 페이지 전환
```typescript
// 뷰 전환 애니메이션
const ViewTransition = {
  listToMap: {
    duration: 300,
    easing: 'ease-out',
    transform: 'slideUp'
  },
  mapToList: {
    duration: 300,
    easing: 'ease-out', 
    transform: 'slideDown'
  }
}
```

## 📋 사용성 체크리스트

### 접근성
- [ ] 모든 인터랙티브 요소 44px 이상 터치 영역
- [ ] 색상 대비비 4.5:1 이상 확보
- [ ] 스크린 리더 대응 aria-label 설정
- [ ] 키보드 네비게이션 지원

### 성능
- [ ] 이미지 lazy loading 구현
- [ ] 가상화된 리스트 적용
- [ ] 컴포넌트 메모이제이션
- [ ] 불필요한 리렌더링 방지

### 일관성
- [ ] 디자인 토큰 기반 스타일링
- [ ] 재사용 가능한 컴포넌트 구조
- [ ] 플랫폼별 네이티브 패턴 준수
- [ ] 브랜드 가이드라인 적용

---

**문서 담당**: 유디자(Design Consistency)  
**최종 수정**: 2025.07.30  
**버전**: v1.0