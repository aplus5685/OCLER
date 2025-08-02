# 오클러 컬러 팔레트 및 타이포그래피 가이드

> **목적**: 오클러 앱의 시각적 일관성을 위한 컬러 및 폰트 시스템  
> **적용 범위**: 모든 UI 컴포넌트 및 화면  
> **업데이트**: 2025.07.30

## 🎨 브랜드 컬러 시스템

### Primary Colors (주 색상)
```css
/* 오클러 브랜드 블루 */
--primary-50: #EFF6FF;   /* 배경용 */
--primary-100: #DBEAFE;  /* 호버 배경 */
--primary-200: #BFDBFE;  /* 비활성 상태 */
--primary-300: #93C5FD;  /* 보조 색상 */
--primary-400: #60A5FA;  /* 액센트 */
--primary-500: #3B82F6;  /* 메인 브랜드 색상 */
--primary-600: #2563EB;  /* 호버 상태 */
--primary-700: #1D4ED8;  /* 액티브 상태 */
--primary-800: #1E40AF;  /* 깊은 색상 */
--primary-900: #1E3A8A;  /* 가장 어두운 색상 */
```

### Status Colors (상태 색상)
```css
/* 영업중 (Open) - 그린 계열 */
--status-open-50: #F0FDF4;
--status-open-100: #DCFCE7;
--status-open-200: #BBF7D0;
--status-open-300: #86EFAC;
--status-open-400: #4ADE80;
--status-open-500: #22C55E;   /* 메인 영업중 색상 */
--status-open-600: #16A34A;   /* 텍스트용 */
--status-open-700: #15803D;
--status-open-800: #166534;
--status-open-900: #14532D;

/* 폐업 (Closed) - 레드 계열 */
--status-closed-50: #FEF2F2;
--status-closed-100: #FEE2E2;
--status-closed-200: #FECACA;
--status-closed-300: #FCA5A5;
--status-closed-400: #F87171;
--status-closed-500: #EF4444;   /* 메인 폐업 색상 */
--status-closed-600: #DC2626;   /* 텍스트용 */
--status-closed-700: #B91C1C;
--status-closed-800: #991B1B;
--status-closed-900: #7F1D1D;

/* 빈점포 (Vacant) - 그레이 계열 */
--status-vacant-50: #F9FAFB;
--status-vacant-100: #F3F4F6;
--status-vacant-200: #E5E7EB;
--status-vacant-300: #D1D5DB;
--status-vacant-400: #9CA3AF;
--status-vacant-500: #6B7280;   /* 메인 빈점포 색상 */
--status-vacant-600: #4B5563;   /* 텍스트용 */
--status-vacant-700: #374151;
--status-vacant-800: #1F2937;
--status-vacant-900: #111827;
```

### Neutral Colors (중성 색상)
```css
/* 그레이 스케일 */
--gray-50: #F9FAFB;    /* 배경 */
--gray-100: #F3F4F6;   /* 카드 배경 */
--gray-200: #E5E7EB;   /* 구분선 */
--gray-300: #D1D5DB;   /* 테두리 */
--gray-400: #9CA3AF;   /* 플레이스홀더 */
--gray-500: #6B7280;   /* 보조 텍스트 */
--gray-600: #4B5563;   /* 본문 텍스트 */
--gray-700: #374151;   /* 제목 텍스트 */
--gray-800: #1F2937;   /* 헤딩 */
--gray-900: #111827;   /* 주요 헤딩 */

/* 흰색/검정 */
--white: #FFFFFF;
--black: #000000;
```

### Semantic Colors (의미 색상)
```css
/* 성공 */
--success-50: #ECFDF5;
--success-500: #10B981;
--success-600: #059669;

/* 경고 */
--warning-50: #FFFBEB;
--warning-500: #F59E0B;
--warning-600: #D97706;

/* 위험 */
--danger-50: #FEF2F2;
--danger-500: #EF4444;
--danger-600: #DC2626;

/* 정보 */
--info-50: #EFF6FF;
--info-500: #3B82F6;
--info-600: #2563EB;
```

## 🎯 상태별 컬러 적용 가이드

### 1. Business Card 상태 표시
```css
/* 영업중 업체 카드 */
.business-card.open {
  border-left: 4px solid var(--status-open-500);
  background: var(--white);
}

.business-card.open .status-badge {
  background: var(--status-open-100);
  color: var(--status-open-600);
  border: 1px solid var(--status-open-200);
}

/* 폐업 업체 카드 */
.business-card.closed {
  border-left: 4px solid var(--status-closed-500);
  background: var(--gray-50);
  opacity: 0.8;
}

.business-card.closed .business-name {
  color: var(--status-closed-600);
  text-decoration: line-through;
}

/* 빈점포 업체 카드 */
.business-card.vacant {
  border-left: 4px solid var(--status-vacant-400);
  background: var(--gray-50);
}

.business-card.vacant .business-name {
  color: var(--status-vacant-600);
  font-style: italic;
}
```

### 2. Map Pin 색상
```css
/* 지도 핀 색상 */
.map-pin.open {
  background: var(--status-open-500);
  border: 2px solid var(--white);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}

.map-pin.closed {
  background: var(--status-closed-500);
  border: 2px solid var(--white);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.map-pin.vacant {
  background: var(--status-vacant-500);
  border: 2px solid var(--white);
  box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3);
}
```

### 3. Filter 및 Badge 색상
```css
/* 상태 필터 칩 */
.filter-chip.status-open.active {
  background: var(--status-open-500);
  color: var(--white);
}

.filter-chip.status-closed.active {
  background: var(--status-closed-500);
  color: var(--white);
}

.filter-chip.status-vacant.active {
  background: var(--status-vacant-500);
  color: var(--white);
}
```

## 📝 타이포그래피 시스템

### Font Family (폰트 패밀리)
```css
/* iOS */
--font-ios-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont;
--font-ios-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont;

/* Android */
--font-android: 'Roboto', 'Noto Sans CJK KR', sans-serif;

/* Web Fallback */
--font-web: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
           'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
```

### Typography Scale (크기 체계)
```css
/* Display Text (큰 제목) */
--text-display-2xl: 72px; /* 특별한 경우 */
--text-display-xl: 60px;  /* Hero 타이틀 */
--text-display-lg: 48px;  /* 페이지 메인 타이틀 */
--text-display-md: 36px;  /* 섹션 타이틀 */
--text-display-sm: 30px;  /* 서브 타이틀 */
--text-display-xs: 24px;  /* 카드 타이틀 */

/* Heading Text (제목) */
--text-heading-xl: 30px;  /* h1 */
--text-heading-lg: 24px;  /* h2 */
--text-heading-md: 20px;  /* h3 */
--text-heading-sm: 18px;  /* h4 */
--text-heading-xs: 16px;  /* h5 */

/* Body Text (본문) */
--text-body-xl: 20px;     /* 큰 본문 */
--text-body-lg: 18px;     /* 일반 본문 큰 사이즈 */
--text-body-md: 16px;     /* 기본 본문 */
--text-body-sm: 14px;     /* 작은 본문 */
--text-body-xs: 12px;     /* 매우 작은 본문 */

/* Label Text (라벨) */
--text-label-lg: 16px;    /* 큰 라벨 */
--text-label-md: 14px;    /* 기본 라벨 */
--text-label-sm: 12px;    /* 작은 라벨 */
--text-label-xs: 10px;    /* 매우 작은 라벨 */
```

### Font Weight (글자 굵기)
```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;       /* 기본 본문 */
--font-medium: 500;       /* 라벨, 버튼 */
--font-semibold: 600;     /* 소제목 */
--font-bold: 700;         /* 제목 */
--font-extrabold: 800;
--font-black: 900;        /* 강조 */
```

### Line Height (줄 간격)
```css
--leading-none: 1;        /* 100% */
--leading-tight: 1.25;    /* 125% */
--leading-snug: 1.375;    /* 137.5% */
--leading-normal: 1.5;    /* 150% - 기본 */
--leading-relaxed: 1.625; /* 162.5% */
--leading-loose: 2;       /* 200% */
```

## 🎨 텍스트 컬러 시스템

### Primary Text Colors
```css
/* 주요 텍스트 */
--text-primary: var(--gray-900);      /* 메인 헤딩 */
--text-secondary: var(--gray-700);    /* 서브 헤딩 */
--text-tertiary: var(--gray-600);     /* 본문 텍스트 */
--text-quaternary: var(--gray-500);   /* 보조 텍스트 */
--text-disabled: var(--gray-400);     /* 비활성 텍스트 */

/* 역방향 텍스트 (어두운 배경용) */
--text-inverse-primary: var(--white);
--text-inverse-secondary: var(--gray-100);
--text-inverse-tertiary: var(--gray-200);
```

### Status Text Colors
```css
/* 상태별 텍스트 색상 */
--text-open: var(--status-open-600);
--text-closed: var(--status-closed-600);
--text-vacant: var(--status-vacant-600);

/* 상태별 배경 위 텍스트 */
--text-on-open: var(--status-open-50);
--text-on-closed: var(--status-closed-50);
--text-on-vacant: var(--status-vacant-50);
```

### Interactive Text Colors
```css
/* 링크 텍스트 */
--text-link: var(--primary-600);
--text-link-hover: var(--primary-700);
--text-link-visited: var(--primary-800);

/* 액션 텍스트 */
--text-action: var(--primary-600);
--text-action-hover: var(--primary-700);
--text-action-pressed: var(--primary-800);
```

## 📱 텍스트 스타일 적용 예시

### 1. Business Card Typography
```css
/* 업체명 */
.business-name {
  font-size: var(--text-heading-sm);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* 업종 */
.business-category {
  font-size: var(--text-body-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* 주소 */
.business-address {
  font-size: var(--text-body-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
}

/* 상태 텍스트 */
.business-status.open {
  font-size: var(--text-label-sm);
  font-weight: var(--font-semibold);
  color: var(--text-open);
}
```

### 2. Search & Navigation Typography
```css
/* 검색 입력창 */
.search-input {
  font-size: var(--text-body-md);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
}

.search-placeholder {
  color: var(--text-quaternary);
}

/* 필터 칩 */
.filter-chip-text {
  font-size: var(--text-label-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
}

/* 결과 카운트 */
.result-count {
  font-size: var(--text-body-sm);
  font-weight: var(--font-normal);
  color: var(--text-secondary);
}
```

### 3. Detail Page Typography
```css
/* 상세 페이지 제목 */
.detail-title {
  font-size: var(--text-heading-lg);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* 연락처 정보 */
.contact-label {
  font-size: var(--text-label-md);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.contact-value {
  font-size: var(--text-body-md);
  font-weight: var(--font-normal);
  color: var(--text-link);
}
```

## 🌙 다크 모드 컬러 (향후 확장용)

### Dark Mode Colors
```css
/* 다크 모드 배경 */
--dark-bg-primary: #0F172A;
--dark-bg-secondary: #1E293B;
--dark-bg-tertiary: #334155;

/* 다크 모드 텍스트 */
--dark-text-primary: #F8FAFC;
--dark-text-secondary: #E2E8F0;
--dark-text-tertiary: #CBD5E1;
--dark-text-quaternary: #94A3B8;

/* 다크 모드 상태 색상 (채도 조정) */
--dark-status-open: #34D399;
--dark-status-closed: #F87171;
--dark-status-vacant: #9CA3AF;
```

## 📏 간격 시스템 (Spacing Scale)

### Spacing Tokens
```css
--space-0: 0px;
--space-1: 4px;      /* 0.25rem */
--space-2: 8px;      /* 0.5rem */
--space-3: 12px;     /* 0.75rem */
--space-4: 16px;     /* 1rem - 기본 */
--space-5: 20px;     /* 1.25rem */
--space-6: 24px;     /* 1.5rem */
--space-8: 32px;     /* 2rem */
--space-10: 40px;    /* 2.5rem */
--space-12: 48px;    /* 3rem */
--space-16: 64px;    /* 4rem */
--space-20: 80px;    /* 5rem */
--space-24: 96px;    /* 6rem */
```

### 간격 적용 가이드
```css
/* 컴포넌트 내부 여백 */
.card-padding { padding: var(--space-4); }
.section-padding { padding: var(--space-6) var(--space-4); }

/* 컴포넌트 간 간격 */
.stack-tight > * + * { margin-top: var(--space-2); }
.stack-normal > * + * { margin-top: var(--space-4); }
.stack-loose > * + * { margin-top: var(--space-6); }
```

## 🎯 접근성 고려사항

### 색상 대비율
- **AAA 등급**: 7:1 이상 (큰 텍스트 4.5:1)
- **AA 등급**: 4.5:1 이상 (큰 텍스트 3:1)
- **최소 요구**: AA 등급 준수

### 색각 이상자 대응
```css
/* 색상 외 추가 시각적 단서 */
.status-open::before { content: "●"; }
.status-closed::before { content: "×"; }
.status-vacant::before { content: "○"; }
```

### 고대비 모드 대응
```css
@media (prefers-contrast: high) {
  :root {
    --primary-500: #0052CC;
    --status-open-600: #0F5132;
    --status-closed-600: #842029;
  }
}
```

---

**문서 담당**: 유디자(Design Consistency)  
**최종 수정**: 2025.07.30  
**버전**: v1.0