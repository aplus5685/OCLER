# 오클러 컴포넌트 디자이너 패키지

## 📦 패키지 구성

### 핵심 파일
- `index.html` - 컴포넌트 쇼케이스 페이지
- `styles/components.css` - 완성된 컴포넌트 스타일시트
- `js/components.js` - 컴포넌트 JavaScript 라이브러리

### 컴포넌트 목록

#### 1. StoreInfoCard (업체 정보 카드)
- **용도**: 상권 업체 정보 표시
- **특징**: 이미지, 즐겨찾기, 상태 배지, 거리 정보
- **반응형**: 모바일/태블릿/데스크톱 최적화
- **접근성**: WCAG 2.1 AA 준수

#### 2. SearchFilter (검색 필터)
- **용도**: 다중 조건 업체 검색
- **필터**: 업종, 지역, 영업상태
- **인터랙션**: 적용/초기화 버튼

#### 3. MapMarker (지도 마커)
- **용도**: 지도 위 업체 정보 팝업
- **기능**: 상세보기, 길찾기 버튼
- **최적화**: 모바일 터치 인터페이스

#### 4. StatsCard (통계 카드)
- **용도**: 대시보드 통계 표시
- **요소**: 아이콘, 수치, 변화율 표시
- **색상**: Primary, Success, Error, Warning, Info

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #5E6AD2 (브랜드 메인)
- **Success**: #26B76A (성공/영업중)
- **Error**: #EF4444 (에러/폐업)
- **Warning**: #F59E0B (경고/확인중)

### 타이포그래피
- **한글**: 시스템 기본 폰트
- **크기**: 12px(xs) ~ 24px(xl)
- **무게**: 400(regular) ~ 700(bold)

### 간격 시스템
- **기본 단위**: 4px
- **범위**: 4px(1) ~ 96px(24)

## 🔧 커스터마이징 가이드

### CSS 변수 수정
```css
:root {
  --color-brand-primary: #5E6AD2;
  --font-size-base: 14px;
  --spacing-base: 16px;
}
```

### 컴포넌트 옵션
```javascript
new StoreInfoCard({
  name: '업체명',
  category: '카테고리',
  status: 'active', // active, closed, pending
  onClick: (data) => console.log(data)
});
```

## 📱 반응형 브레이크포인트

- **모바일**: ~767px
- **태블릿**: 768px ~ 1023px  
- **데스크톱**: 1024px+

## ♿ 접근성 기능

- 키보드 네비게이션 지원
- 스크린 리더 호환
- 고대비 모드 지원
- 터치 인터페이스 최적화 (44px 최소 터치 영역)

## 🚀 사용 방법

1. HTML에 CSS/JS 파일 포함
2. 컴포넌트 인스턴스 생성
3. DOM에 렌더링

```html
<link rel="stylesheet" href="styles/components.css">
<script src="js/components.js"></script>
```

---
**작성**: 팀장킴 | **검수**: 품질관리팀 | **버전**: v1.0