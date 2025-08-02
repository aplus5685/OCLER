# 📊 데이터 분석 보고서
**부산 지역 매장/상점 정보 데이터베이스 분석**

---

## 📋 프로젝트 개요

### 기본 정보
- **분석 대상**: `2025.07.04 2분기 12. 정보조회용.xlsm`
- **파일 크기**: 2.13 MB
- **데이터 규모**: 12,379개 매장 정보
- **분석 일자**: 2025년 7월 30일
- **분석 담당**: 팀장킴(project-manager)

### 프로젝트 목적
부산 지역 매장/상점 정보의 체계적 관리를 위한 데이터베이스 구축 및 최적화

---

## 🗃️ 데이터 구조 분석

### 파일 구성
| 시트명 | 행 수 | 컬럼 수 | 용도 |
|--------|-------|---------|------|
| **카테고리** | 11 | 19 | 매장 분류 체계 참조 테이블 |
| **LIST** | 12,379 | 23 | 매장 정보 메인 데이터베이스 |

### LIST 시트 - 주요 컬럼 구조

#### 🔑 **식별자 정보**
- `id`: 매장 고유 ID (12,379개, 중복 없음)
- `store_key`: 매장 키 (5,185개 고유값, **58.1% 중복** ⚠️)
- `name`: 매장명 (12,378개, 1개 누락)

#### 📍 **위치 정보**
- `hotplace`: 핫플레이스 지역 (완전 데이터)
- `address_a`: 구 주소 (완전 데이터)
- `address_b`: 동 주소 (완전 데이터)
- `address_c`: 상세 주소 (완전 데이터)

#### 🏷️ **분류 정보**
- `category_a`: 대분류 카테고리 (완전 데이터)
- `category_b`: 중분류 카테고리 (완전 데이터)

#### 🔍 **키워드 정보**
- `keywords_a`: 주요 키워드 (12,368개, 11개 누락)
- `keywords_b`: 보조 키워드 (6,898개, **44.3% 누락** ⚠️)
- `keywords_c`: 추가 키워드 (1,676개, **86.5% 누락** ⚠️)

#### 📅 **운영 정보**
- `open_date`: 오픈 날짜 (완전 데이터)
- `close_date`: 마감 날짜 (12,378개, 1개 누락)
- `status`: 매장 상태 (238개만 데이터, **98.1% 누락** 🚨)

#### 🗺️ **지도 정보**
- `map_link`: 지도 링크 (9,275개, **25.1% 누락**)

#### ❌ **완전 누락 컬럼 (7개)**
`concept`, `extra_link`, `description`, `thumbnail`, `photos`, `parking`, `event`

---

## 📈 데이터 분포 현황

### 카테고리별 분포
| 대분류 | 매장 수 | 비율 |
|--------|---------|------|
| 식사술 | 7,499 | 60.6% |
| 디저트 | 1,279 | 10.3% |
| 뷰티.관리 | 970 | 7.8% |
| 도소매 | 924 | 7.5% |
| 놀이 | 902 | 7.3% |
| 그밖에 | 372 | 3.0% |
| 헬스.힐링 | 232 | 1.9% |
| 학원 | 148 | 1.2% |
| 병원 | 53 | 0.4% |

### 지역별 분포 (핫플레이스)
| 지역 | 매장 수 | 비율 |
|------|---------|------|
| 서면 | 3,366 | 27.2% |
| 남포 | 1,769 | 14.3% |
| 경성 | 1,704 | 13.8% |
| 전포 | 1,182 | 9.5% |
| 동래 | 939 | 7.6% |
| 기타 | 3,419 | 27.6% |

### 연도별 오픈 현황
| 연도 | 오픈 매장 수 |
|------|------------|
| 2021년 | 924개 |
| 2022년 | 1,128개 |
| 2023년 | 1,004개 |
| 2024년 | 1,010개 |
| 2025년 | 446개 (현재까지) |

---

## 🎯 데이터 품질 분석

### 전체 품질 점수: **35.8점/100점** (매우 낮음)

### 심각한 품질 이슈

#### 🚨 **Level 1 - 긴급 수정 필요**
1. **status 컬럼 데이터 오류**
   - 영업상태 정보 대신 이미지 파일명(.jpg) 저장
   - 영향 범위: 238개 행 모두
   - 예시: "00174.2.jpg", "00285.2.jpg"

2. **store_key 중복 문제**
   - 고유값: 5,185개 (전체 12,379개 중)
   - 중복률: 58.1%
   - 최다 중복: "2-030" (22개), "1-021" (20개)

#### ⚠️ **Level 2 - 높은 누락률**
1. **핵심 비즈니스 정보 누락**
   - concept (100% 누락): 매장 컨셉 정보 완전 부재
   - description (100% 누락): 매장 상세정보 제공 불가
   - thumbnail (100% 누락): 썸네일 이미지 부재
   - parking (100% 누락): 주차 정보 제공 불가

2. **키워드 정보 부족**
   - keywords_b: 44.3% 누락 (5,481개)
   - keywords_c: 86.5% 누락 (10,703개)

### 양호한 데이터 품질

#### ✅ **완전성이 높은 필드**
- 기본 정보: `id`, `name`, `hotplace`
- 주소 정보: `address_a`, `address_b`, `address_c`
- 분류 정보: `category_a`, `category_b`
- 운영 정보: `open_date`, `close_date`

#### ✅ **데이터 정확성**
- 주소 데이터: 9개 시/도, 20개 구/시 단위로 체계적 분류
- 날짜 데이터: 100% 유효한 형식, 2018-2025년 합리적 범위
- URL 데이터: 9,275개 모두 유효한 네이버 지도 링크

---

## 🛠️ 데이터베이스 스키마 설계

### 설계 원칙
1. **정규화**: 3NF 기준, 중복 데이터 최소화
2. **성능 최적화**: 인덱스 전략 수립
3. **확장성**: 동적 속성 추가 가능 구조
4. **데이터 무결성**: 제약조건 및 트리거 활용

### 주요 테이블 구조

#### 🏪 **stores (매장 정보)**
```sql
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    store_key VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    region_id INTEGER REFERENCES regions(id),
    category_major_id INTEGER REFERENCES category_major(id),
    category_minor_id INTEGER REFERENCES category_minor(id),
    address_full TEXT,
    address_city VARCHAR(100),
    address_district VARCHAR(100),
    address_detail VARCHAR(300),
    open_date DATE,
    close_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    map_link TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 🏷️ **키워드 관리 (다대다 관계)**
```sql
CREATE TABLE keywords (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    usage_count INTEGER DEFAULT 0
);

CREATE TABLE store_keywords (
    store_id INTEGER REFERENCES stores(id),
    keyword_id INTEGER REFERENCES keywords(id),
    keyword_type VARCHAR(20) DEFAULT 'primary'
);
```

#### 📂 **분류 체계**
```sql
CREATE TABLE category_major (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE category_minor (
    id SERIAL PRIMARY KEY,
    major_id INTEGER REFERENCES category_major(id),
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL
);
```

### 인덱스 전략
- 매장명 풀텍스트 검색: `GIN 인덱스`
- 지역-카테고리 복합 검색: `복합 인덱스`
- 좌표 기반 검색: `공간 인덱스`

---

## 📝 권고사항

### 즉시 조치 사항

#### 1. **데이터 오류 수정** (1주 내)
- status 컬럼 이미지 파일명 → 영업상태 코드 변환
- store_key 중복 해결을 위한 새로운 고유 키 생성

#### 2. **핵심 데이터 수집** (1-3개월)
- concept: 매장 컨셉 정보 수집
- description: 매장 상세 설명 작성
- thumbnail: 대표 이미지 업로드
- parking: 주차 가능 여부 확인

### 중장기 개선 방안

#### 3. **데이터 품질 모니터링 체계 구축**
- 일일 품질 지표 모니터링
- 자동 오류 탐지 시스템
- 품질 개선 효과 측정

#### 4. **자동화 시스템 도입**
- 키워드 자동 추출
- 카테고리 기반 추천
- 중복 데이터 자동 탐지

---

## 🎯 기대 효과

### 단계별 품질 개선 목표
- **Level 1 완료 시**: 품질 점수 **50점** 달성
- **Level 2 완료 시**: 품질 점수 **75점** 달성  
- **Level 3 완료 시**: 품질 점수 **90점** 달성

### 비즈니스 임팩트
1. **고객 경험 향상**: 정확한 매장 정보 제공
2. **운영 효율성**: 체계적인 데이터 관리
3. **확장성 확보**: 향후 서비스 확장 기반 마련
4. **의사결정 지원**: 신뢰할 수 있는 데이터 기반 분석

---

## 📞 문의 및 추가 분석

이 보고서에 대한 추가 문의사항이나 상세 분석이 필요한 경우:

**담당자**: 팀장킴(project-manager)  
**분석일**: 2025년 7월 30일  
**다음 리뷰**: 데이터 품질 개선 후 재분석 예정

---

*본 분석 보고서는 오클러 프로젝트의 데이터베이스 구축을 위한 기초 자료로 활용됩니다.*