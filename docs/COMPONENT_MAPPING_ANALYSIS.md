# 오클러 킬러앱 컴포넌트 매핑 분석 v2.0

## 1. 현재 컴포넌트 현황

### 1.1 킬러 기능 기반 컴포넌트 분류

#### 🔥 폐업 검색 기능 (무료) 컴포넌트
- **RegionSelector**: 9개 부산 지역 선택 (완성) ✅
- **BasicSearchFilter**: 간단한 3단계 필터링
- **MobileStoreCard**: 폐업 업체 카드 표시 (완성) ✅
- **ClosedStoreMarker**: 지도상 폐업 업체 마커

#### 💎 빈점포 검색 기능 (유료) 컴포넌트
- **AdvancedSearchFilter**: 8가지 고급 검색 옵션
- **VacantStoreCard**: 빈점포 정보 카드
- **PremiumPaywall**: 유료 기능 잠금/결제 안내
- **AreaRentFilter**: 면적/임대료 범위 설정

### 1.2 기존 완성 컴포넌트
- **CircularCategoryButton**: 원형 지역 선택 버튼 ✅
- **MultiStepFilter**: 3단계 필터링 시스템 ✅
- **NavigationBar**: 하단 네비게이션 ✅
- **MobileStoreCard**: 모바일 최적화 업체 카드 ✅

### 1.3 스타일 시스템 (킬러앱 최적화)
- **Linear Theme**: 다크 테마 기반 현대적 디자인
- **Brand Gradient**: #5E6AD2 → #8B7CF8 (킬러앱 정체성)
- **Premium Colors**: 골드/플래티넘 색상 (유료 기능 차별화)
- **Mobile First**: 44px+ 터치 영역, 햅틱 피드백

## 2. 킬러 기능별 컴포넌트 요구사항

### 2.1 🔥 폐업 검색 (무료) - 홈 화면
**킬러 기능 목표**: 일반유저 유입 + 브랜드 인지도 구축

**현재 상태**: ✅ 완성됨
- **RegionSelector**: 9개 부산 지역 선택 완료
- **CircularCategoryButton**: 터치 친화적 원형 버튼 완료

### 2.2 기본 검색 플로우 (Step 1-3)
**무료 사용자 대상 간단한 검색**:

#### Step 1: 지역 선택 ✅ 완성
- 9개 지역 원형 버튼 (경성, 광안, 남포, 덕천, 동래, 서면, 연산, 전포, 해운)

#### Step 2: 대분류 선택 ✅ 완성
- 음식점, 소매업, 서비스업 등 대분류

#### Step 3: 소분류 선택 ✅ 완성  
- 한식, 중식, 카페 등 세부 업종

### 2.3 💎 빈점포 검색 (유료) - 고급 검색
**킬러 기능 목표**: 핵심 수익원 (예비창업자 타겟)

**새로 필요한 컴포넌트**:

#### 🔒 PremiumPaywall 컴포넌트
**목적**: 유료 기능 잠금 및 결제 유도
```typescript
interface PremiumPaywallProps {
  feature: 'vacant_search' | 'market_analysis' | 'matching';
  price: number;
  duration: '1day' | '1month';
  onPayment: () => void;
  onTrial?: () => void; // 무료 체험
}
```

#### 🔍 AdvancedSearchFilter 컴포넌트  
**8가지 고급 검색 옵션**:
```typescript
interface AdvancedFilterOptions {
  address: string;        // 상세 주소 검색
  product: string;        // 특정 상품/서비스
  manager: string;        // 담당자 정보  
  parking: boolean;       // 주차 가능 여부
  area: [number, number]; // 면적 범위
  operatingHours: string; // 운영시간
  events: boolean;        // 특별 이벤트
  newBusiness: boolean;   // 신상업체
}
```

#### 💰 VacantStoreCard 컴포넌트
**빈점포 전용 정보 카드**:
```typescript
interface VacantStoreData {
  monthlyRent: number;    // 월 임대료
  deposit: number;        // 보증금
  area: number;           // 면적
  availableDate: Date;    // 입주 가능일
  landlordContact?: string; // 임대인 연락처 (프리미엄)
  marketAnalysis?: object;  // 상권 분석 (프리미엄)
}
```

### 2.4 사용자 유형별 차별화 컴포넌트

#### 🟢 일반유저 (무료) 컴포넌트
- **BasicStoreCard**: 기본 업체 정보만 표시
- **AdBanner**: 광고 수익을 위한 배너 컴포넌트
- **UpgradePrompt**: 유료 전환 유도 컴포넌트

#### 🟠 예비창업자 (유료) 컴포넌트  
- **MarketAnalysisCard**: 상권 분석 정보
- **ContactInfo**: 임대인/중개사 연락처
- **MatchingAlert**: 빈점포 매칭 알림

#### 🔵 빈점포소유주 & 중개사 컴포넌트
- **PropertyUpload**: 빈점포 등록 폼
- **InquiryManagement**: 문의 관리 대시보드
- **SubscriptionStatus**: 구독 상태 표시

## 3. 킬러앱 기반 개발 우선순위

### 3.1 Phase 1: 킬러 기능 MVP (완료) ✅
1. **RegionSelector** - 9개 지역 선택 ✅
2. **MultiStepFilter** - 3단계 필터링 ✅  
3. **MobileStoreCard** - 폐업 업체 카드 ✅

### 3.2 Phase 2: 유료 기능 핵심 (즉시 개발)
4. **PremiumPaywall** - 빈점포 검색 잠금/결제 🔥
5. **AdvancedSearchFilter** - 8가지 고급 옵션 🔥
6. **VacantStoreCard** - 빈점포 전용 카드 🔥

### 3.3 Phase 3: 수익화 강화 (2차 개발)
7. **MarketAnalysisCard** - 상권 분석 정보
8. **ContactInfo** - 프리미엄 연락처
9. **MatchingAlert** - 빈점포 매칭 알림

## 4. 킬러앱 특화 기술 요구사항

### 4.1 유료/무료 기능 분리
```typescript
// 컴포넌트 레벨에서 권한 관리
interface ComponentAuthProps {
  userTier: 'free' | 'premium' | 'owner' | 'merchant';
  feature: 'basic_search' | 'vacant_search' | 'analysis' | 'matching';
  fallback?: React.ComponentType; // 권한 없을 때 대체 컴포넌트
}

// 사용 예시
<ProtectedComponent 
  userTier={user.tier}
  feature="vacant_search"
  fallback={PremiumPaywall}
>
  <VacantStoreCard />
</ProtectedComponent>
```

### 4.2 분기별 데이터 업데이트 최적화
- **Cache-First Strategy**: 분기 데이터는 3개월간 캐싱
- **Delta Updates**: 변경된 업체 데이터만 업데이트
- **Offline Fallback**: 네트워크 없을 때 캐시된 데이터 사용
- **Update Notification**: 새로운 분기 데이터 알림

### 4.3 수익화 관련 성능
- **Payment Integration**: 아임포트 결제 모듈 경량화
- **Conversion Tracking**: 유료 전환 추적 시스템
- **A/B Testing**: 페이월 위치/문구 최적화

## 5. 킬러앱 로드맵 (하이브리드 앱 기반)

### 🚀 Phase 1: 킬러기능 MVP (완료) ✅
**목표**: 폐업검색 무료 서비스로 사용자 확보
- RegionSelector ✅
- MultiStepFilter ✅  
- MobileStoreCard ✅
- 하이브리드 앱 셋업 가이드 완료 ✅

### 💰 Phase 2: 수익화 핵심 (즉시 시작)
**목표**: 빈점포검색 유료 서비스 구현
- **PremiumPaywall**: 1일 3,000원 결제 시스템
- **AdvancedSearchFilter**: 8가지 고급 검색 옵션
- **VacantStoreCard**: 빈점포 전용 정보 카드
- **UserTierManager**: 4단계 사용자 관리

### 📈 Phase 3: 전환율 최적화 (2차)
**목표**: 무료→유료 전환율 20% 달성
- **ConversionOptimizer**: A/B 테스트 시스템
- **AnalyticsTracker**: 사용자 행동 분석
- **NotificationSystem**: 맞춤형 알림
- **OnboardingFlow**: 신규 사용자 가이드

### 🔄 Phase 4: 하이브리드 앱 최적화 (3차)
**목표**: 네이티브 수준 성능 달성
- **OfflineSync**: 분기별 데이터 동기화
- **NativeIntegration**: Capacitor 플러그인 최적화
- **PerformanceMonitor**: 실시간 성능 모니터링

## 6. 킬러앱 성공 지표

### 6.1 핵심 비즈니스 지표
- **무료→유료 전환율**: 20% (목표)
- **월간 활성 사용자**: 5,000명 (1년 후)
- **ARPU**: 25,000원/월
- **고객 이탈률**: 15% 이하

### 6.2 기술 성능 지표
- **앱 로딩 시간**: 3초 이내 (3G 환경)
- **결제 성공률**: 99% 이상
- **크래시율**: 0.3% 이하
- **하이브리드 앱 크기**: 30MB 이하

### 6.3 사용자 경험 지표
- **검색 완료율**: 85% 이상
- **페이월 전환율**: 3-5%
- **NPS 점수**: 60+ (높은 추천 의향)
- **앱스토어 평점**: 4.3/5.0 이상

---

**분석 버전**: v2.0 (킬러앱 전면 개편)  
**완료일**: 2025-01-30  
**분석자**: 개발팀 리드  
**검토자**: CTO, 기획팀 김기획

---

> 🔥 **오클러 킬러앱 컴포넌트 전략**  
> 폐업검색으로 사용자 확보 → 빈점포검색으로 수익화 → 하이브리드 앱으로 빠른 확장! 🚀