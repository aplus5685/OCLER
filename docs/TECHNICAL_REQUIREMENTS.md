# 오클러(Occler) 기술 요구사항 명세서

## 1. 시스템 아키텍처

### 1.1 전체 시스템 구조
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React/Next)  │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   Redis Cache   │    │   File Storage  │
│   (CloudFlare)  │    │                 │    │   (AWS S3)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 마이크로서비스 구조
- **API Gateway**: 요청 라우팅 및 인증
- **Business Service**: 업체 정보 관리
- **Search Service**: 검색 엔진
- **Map Service**: 지도 데이터 처리
- **User Service**: 사용자 관리
- **Analytics Service**: 통계 및 분석

## 2. 프론트엔드 요구사항

### 2.1 기술 스택
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **지도**: Naver Maps API / Kakao Map API
- **차트**: Chart.js
- **빌드 도구**: Turbopack

### 2.2 성능 요구사항
- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Time to Interactive**: < 3.5초
- **Core Web Vitals**: 모든 지표 Good 등급

### 2.3 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 모바일: iOS 14+, Android 10+

### 2.4 반응형 디자인
```css
/* Breakpoints */
sm: 640px   /* 모바일 세로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 데스크톱 */
2xl: 1536px /* 초대형 화면 */
```

## 3. 백엔드 요구사항

### 3.1 기술 스택
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL 15 + PostGIS
- **ORM**: Prisma
- **Cache**: Redis 7
- **Queue**: Bull Queue
- **Authentication**: JWT + Refresh Token

### 3.2 데이터베이스 설계

#### 3.2.1 핵심 테이블
```sql
-- 업체 정보
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    business_number VARCHAR(12) UNIQUE,
    address_road VARCHAR(500),
    address_jibun VARCHAR(500),
    location POINT, -- PostGIS
    category_large VARCHAR(100),
    category_medium VARCHAR(100),
    category_small VARCHAR(100),
    status ENUM('operating', 'closed', 'vacant'),
    phone VARCHAR(20),
    area_sqm DECIMAL(10,2),
    monthly_rent INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_businesses_location ON businesses USING GIST(location);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_category ON businesses(category_large, category_medium);

-- 사용자
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    subscription_plan ENUM('basic', 'pro', 'enterprise'),
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 검색 로그
CREATE TABLE search_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    query_text TEXT,
    filters JSONB,
    result_count INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.3 API 성능 요구사항
- **응답 시간**: 평균 < 200ms, 95퍼센타일 < 500ms
- **처리량**: 1000 RPS
- **동시 사용자**: 500명
- **가용성**: 99.9% (월 43분 이하 다운타임)

## 4. 검색 엔진 요구사항

### 4.1 검색 기능
- **전문 검색**: 업체명, 주소 텍스트 검색
- **위치 기반 검색**: 반경 내 업체 검색
- **필터링**: 다중 조건 필터
- **정렬**: 거리, 이름, 업종별 정렬
- **자동완성**: 실시간 검색어 제안

### 4.2 성능 목표
- **검색 응답 시간**: < 100ms
- **인덱싱 시간**: 신규 데이터 < 1분
- **검색 정확도**: > 95%

### 4.3 기술 구현
```javascript
// Elasticsearch 스키마 예시
const businessMapping = {
  mappings: {
    properties: {
      name: {
        type: 'text',
        analyzer: 'korean',
        fields: {
          keyword: { type: 'keyword' }
        }
      },
      location: {
        type: 'geo_point'
      },
      category: {
        type: 'nested',
        properties: {
          large: { type: 'keyword' },
          medium: { type: 'keyword' },
          small: { type: 'keyword' }
        }
      },
      status: { type: 'keyword' }
    }
  }
};
```

## 5. 지도 서비스 요구사항

### 5.1 지도 기능
- **마커 표시**: 업체 위치 시각화
- **클러스터링**: 밀집 지역 그룹화
- **팝업**: 간단한 정보 표시
- **필터 오버레이**: 상태별 색상 구분

### 5.2 성능 최적화
- **마커 가상화**: 화면에 보이는 마커만 렌더링
- **데이터 분할**: 줌 레벨별 데이터 로딩
- **캐싱**: 타일 및 마커 데이터 캐시

## 6. 보안 요구사항

### 6.1 인증 및 인가
- **JWT 토큰**: Access Token (15분) + Refresh Token (7일)
- **API 키 관리**: 외부 서비스 API 키 암호화 저장
- **권한 기반 접근**: RBAC (Role-Based Access Control)

### 6.2 데이터 보안
- **암호화**: 민감 데이터 AES-256 암호화
- **SQL Injection 방지**: Prepared Statement 사용
- **XSS 방지**: Content Security Policy 적용
- **Rate Limiting**: API 호출 제한 (100 req/min/user)

### 6.3 개인정보 보호
- **GDPR 준수**: 사용자 데이터 삭제 권한
- **로그 관리**: 개인정보 로그 자동 삭제 (90일)
- **암호화 통신**: HTTPS/TLS 1.3

## 7. 배포 및 운영 요구사항

### 7.1 컨테이너화
```dockerfile
# 프론트엔드 Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 7.2 CI/CD 파이프라인
```yaml
# GitHub Actions 워크플로우
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: kubectl apply -f k8s/
```

### 7.3 모니터링
- **APM**: New Relic / DataDog
- **로그 관리**: ELK Stack
- **메트릭**: Prometheus + Grafana
- **알림**: Slack 연동

## 8. 확장성 요구사항

### 8.1 수평 확장
- **로드 밸런서**: NGINX
- **오토 스케일링**: CPU 70% 기준
- **데이터베이스**: Read Replica 구성

### 8.2 캐싱 전략
```javascript
// Redis 캐싱 구조
const cacheKeys = {
  businesses: 'business:list:{filters}:{page}',
  businessDetail: 'business:detail:{id}',
  searchResults: 'search:{query}:{filters}',
  mapData: 'map:bounds:{lat1}:{lng1}:{lat2}:{lng2}'
};

// TTL 설정
const cacheTTL = {
  businesses: 300,      // 5분
  businessDetail: 3600, // 1시간
  searchResults: 600,   // 10분
  mapData: 1800        // 30분
};
```

## 9. 성능 테스트 요구사항

### 9.1 테스트 시나리오
- **부하 테스트**: 1000 동시 사용자
- **스트레스 테스트**: 한계점 확인
- **내구성 테스트**: 24시간 연속 운영

### 9.2 목표 지표
```
응답시간 (95%ile): < 500ms
처리량: > 1000 RPS
오류율: < 0.1%
메모리 사용률: < 80%
CPU 사용률: < 70%
```

---

**작성자**: 팀장킴 (Project Manager)  
**기술 검토**: 나기획 (Technical Planner)  
**작성일**: 2025-01-30  
**버전**: v1.0