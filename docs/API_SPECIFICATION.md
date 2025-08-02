# 오클러(Occler) API 명세서

## 📋 API 개요

### 기본 정보
- **Base URL**: `https://api.occler.com/v1`
- **인증 방식**: Bearer Token (JWT)
- **응답 형식**: JSON
- **문자 인코딩**: UTF-8
- **API 버전**: v1.0

### 공통 헤더
```http
Content-Type: application/json
Authorization: Bearer {access_token}
X-API-Version: v1
```

### 응답 형식
```json
{
  "success": true,
  "data": {},
  "message": "성공 메시지",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "meta": {
    "timestamp": "2025-01-30T10:00:00Z",
    "version": "v1.0"
  }
}
```

### 에러 응답 형식
```json
{
  "success": false,
  "error": {
    "code": "BUSINESS_NOT_FOUND",
    "message": "업체를 찾을 수 없습니다.",
    "details": "Requested business ID does not exist"
  },
  "meta": {
    "timestamp": "2025-01-30T10:00:00Z",
    "version": "v1.0"
  }
}
```

---

## 🔐 인증 API

### POST /auth/login
사용자 로그인

#### 요청
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 응답
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "name": "홍길동",
      "subscription": {
        "plan": "pro",
        "expiresAt": "2025-12-31T23:59:59Z"
      }
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 900
    }
  }
}
```

### POST /auth/refresh
토큰 갱신

#### 요청
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/logout
로그아웃

---

## 🏢 업체 관리 API

### GET /businesses
업체 목록 조회

#### 쿼리 파라미터
| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|----------|------|------|------|------|
| page | integer | N | 페이지 번호 (기본값: 1) | `?page=1` |
| limit | integer | N | 페이지당 항목 수 (기본값: 20, 최대: 100) | `?limit=50` |
| status | string | N | 영업 상태 필터 | `?status=operating` |
| category | string | N | 업종 분류 | `?category=restaurant` |
| region | string | N | 지역 필터 | `?region=서울시 강남구` |
| sort | string | N | 정렬 기준 | `?sort=name_asc` |
| search | string | N | 검색어 | `?search=스타벅스` |

#### 정렬 옵션
- `name_asc`: 이름 오름차순
- `name_desc`: 이름 내림차순
- `created_at_desc`: 등록일 최신순
- `distance_asc`: 거리순 (위치 기반 검색 시)

#### 응답
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "스타벅스 강남점",
      "businessNumber": "123-45-67890",
      "address": {
        "road": "서울특별시 강남구 테헤란로 123",
        "jibun": "서울특별시 강남구 역삼동 123-45"
      },
      "location": {
        "lat": 37.5665,
        "lng": 126.9780
      },
      "category": {
        "large": "음식점",
        "medium": "카페",
        "small": "커피전문점"
      },
      "status": "operating",
      "phone": "02-1234-5678",
      "area": 85.5,
      "monthlyRent": 5000000,
      "createdAt": "2025-01-15T09:00:00Z",
      "updatedAt": "2025-01-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12000,
    "totalPages": 600
  }
}
```

### GET /businesses/{id}
업체 상세 정보 조회

#### 경로 파라미터
- `id`: 업체 ID (UUID)

#### 응답
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "스타벅스 강남점",
    "businessNumber": "123-45-67890",
    "address": {
      "road": "서울특별시 강남구 테헤란로 123",
      "jibun": "서울특별시 강남구 역삼동 123-45",
      "zipCode": "06151",
      "detail": "1층"
    },
    "location": {
      "lat": 37.5665,
      "lng": 126.9780
    },
    "category": {
      "large": "음식점",
      "medium": "카페",
      "small": "커피전문점"
    },
    "status": "operating",
    "statusHistory": [
      {
        "status": "operating",
        "changedAt": "2025-01-15T09:00:00Z"
      }
    ],
    "contact": {
      "phone": "02-1234-5678",
      "fax": "02-1234-5679",
      "email": "gangnam@starbucks.co.kr",
      "website": "https://www.starbucks.co.kr"
    },
    "businessInfo": {
      "area": 85.5,
      "monthlyRent": 5000000,
      "deposit": 50000000,
      "ownerName": "홍길동",
      "registrationDate": "2024-06-01"
    },
    "images": [
      {
        "id": "img001",
        "url": "https://cdn.occler.com/images/business/550e8400/1.jpg",
        "type": "exterior",
        "description": "외관"
      }
    ],
    "operatingHours": {
      "monday": "07:00-22:00",
      "tuesday": "07:00-22:00",
      "wednesday": "07:00-22:00",
      "thursday": "07:00-22:00",
      "friday": "07:00-22:00",
      "saturday": "08:00-22:00",
      "sunday": "08:00-22:00"
    },
    "nearbyAnalysis": {
      "competitorCount": 5,
      "averageRent": 4500000,
      "footTraffic": "high",
      "marketPotential": 85
    },
    "createdAt": "2025-01-15T09:00:00Z",
    "updatedAt": "2025-01-30T10:00:00Z"
  }
}
```

---

## 🔍 검색 API

### GET /search
통합 검색

#### 쿼리 파라미터
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| q | string | Y | 검색어 |
| type | string | N | 검색 타입 (business, address, category) |
| page | integer | N | 페이지 번호 |
| limit | integer | N | 결과 수 제한 |

#### 응답
```json
{
  "success": true,
  "data": {
    "query": "스타벅스",
    "results": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "스타벅스 강남점",
        "address": "서울특별시 강남구 테헤란로 123",
        "category": "커피전문점",
        "status": "operating",
        "score": 95.5,
        "highlight": {
          "name": "<em>스타벅스</em> 강남점"
        }
      }
    ],
    "suggestions": [
      "스타벅스 역삼점",
      "스타벅스 선릉점"
    ],
    "totalResults": 45
  }
}
```

### GET /search/autocomplete
자동완성

#### 쿼리 파라미터
- `q`: 검색어 (최소 2자)
- `limit`: 결과 수 (기본값: 10, 최대: 20)

#### 응답
```json
{
  "success": true,
  "data": [
    {
      "text": "스타벅스",
      "type": "business_name",
      "count": 45
    },
    {
      "text": "스타벅스 강남점",
      "type": "exact_match",
      "businessId": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

---

## 🗺️ 지도 API

### GET /map/businesses
지도 범위 내 업체 조회

#### 쿼리 파라미터
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| bounds | string | Y | 지도 범위 (lat1,lng1,lat2,lng2) |
| zoom | integer | N | 줌 레벨 (1-21) |
| status | string | N | 영업 상태 필터 |
| category | string | N | 업종 필터 |

#### 응답
```json
{
  "success": true,
  "data": {
    "businesses": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "스타벅스 강남점",
        "lat": 37.5665,
        "lng": 126.9780,
        "status": "operating",
        "category": "커피전문점",
        "clusterId": null
      }
    ],
    "clusters": [
      {
        "id": "cluster_001",
        "lat": 37.5670,
        "lng": 126.9785,
        "count": 25,
        "bounds": {
          "north": 37.5680,
          "south": 37.5660,
          "east": 126.9795,
          "west": 126.9775
        }
      }
    ],
    "bounds": {
      "north": 37.5700,
      "south": 37.5600,
      "east": 126.9850,
      "west": 126.9700
    }
  }
}
```

### GET /map/clusters/{clusterId}
클러스터 상세 정보

#### 응답
```json
{
  "success": true,
  "data": {
    "id": "cluster_001",
    "businesses": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "스타벅스 강남점",
        "lat": 37.5665,
        "lng": 126.9780,
        "status": "operating"
      }
    ],
    "summary": {
      "total": 25,
      "operating": 20,
      "closed": 3,
      "vacant": 2
    }
  }
}
```

---

## 📊 분석 API

### GET /analytics/businesses/{id}/nearby
주변 상권 분석

#### 쿼리 파라미터
- `radius`: 반경 (미터, 기본값: 500)

#### 응답
```json
{
  "success": true,
  "data": {
    "businessId": "550e8400-e29b-41d4-a716-446655440000",
    "radius": 500,
    "analysis": {
      "competitorAnalysis": {
        "sameCategory": 3,
        "relatedCategory": 8,
        "averageDistance": 150
      },
      "marketAnalysis": {
        "totalBusinesses": 45,
        "operatingRate": 85.5,
        "vacancyRate": 14.5,
        "averageRent": 4500000
      },
      "categoryDistribution": [
        {
          "category": "음식점",
          "count": 15,
          "percentage": 33.3
        },
        {
          "category": "소매업",
          "count": 12,
          "percentage": 26.7
        }
      ],
      "footTraffic": {
        "level": "high",
        "score": 85,
        "peakHours": ["12:00-14:00", "18:00-20:00"]
      }
    },
    "generatedAt": "2025-01-30T10:00:00Z"
  }
}
```

### GET /analytics/region
지역별 통계

#### 쿼리 파라미터
- `region`: 지역명 (시/구/동)
- `period`: 기간 (1m, 3m, 6m, 1y)

#### 응답
```json
{
  "success": true,
  "data": {
    "region": "서울시 강남구",
    "period": "3m",
    "statistics": {
      "totalBusinesses": 1250,
      "newOpenings": 45,
      "closures": 28,
      "vacantSpaces": 89,
      "openingRate": 3.6,
      "closureRate": 2.2,
      "netGrowth": 1.4
    },
    "trends": [
      {
        "month": "2024-11",
        "openings": 12,
        "closures": 8,
        "vacancies": 85
      }
    ],
    "topCategories": [
      {
        "category": "음식점",
        "count": 425,
        "growth": 2.1
      }
    ]
  }
}
```

---

## 👤 사용자 API

### GET /users/profile
사용자 프로필 조회

#### 응답
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "subscription": {
      "plan": "pro",
      "status": "active",
      "startDate": "2025-01-01T00:00:00Z",
      "endDate": "2025-12-31T23:59:59Z",
      "autoRenewal": true
    },
    "usage": {
      "searchCount": 450,
      "downloadCount": 125,
      "limits": {
        "searchLimit": 1000,
        "downloadLimit": 500
      }
    },
    "preferences": {
      "defaultView": "list",
      "defaultRegion": "서울시 강남구",
      "notifications": {
        "email": true,
        "push": false
      }
    },
    "createdAt": "2024-12-01T00:00:00Z"
  }
}
```

### PUT /users/profile
사용자 프로필 수정

#### 요청
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "preferences": {
    "defaultView": "map",
    "defaultRegion": "서울시 서초구"
  }
}
```

---

## 📥 내보내기 API

### POST /export/businesses
업체 데이터 내보내기

#### 요청
```json
{
  "format": "excel",
  "filters": {
    "status": ["operating"],
    "category": ["음식점"],
    "region": "서울시 강남구"
  },
  "fields": [
    "name",
    "address",
    "phone",
    "category",
    "status"
  ]
}
```

#### 응답
```json
{
  "success": true,
  "data": {
    "exportId": "exp_550e8400",
    "status": "processing",
    "estimatedTime": 30,
    "recordCount": 245
  }
}
```

### GET /export/{exportId}
내보내기 상태 조회

#### 응답
```json
{
  "success": true,
  "data": {
    "id": "exp_550e8400",
    "status": "completed",
    "downloadUrl": "https://cdn.occler.com/exports/exp_550e8400.xlsx",
    "expiresAt": "2025-02-06T10:00:00Z",
    "recordCount": 245,
    "fileSize": 1048576
  }
}
```

---

## 📈 사용량 및 통계 API

### GET /usage/current
현재 사용량 조회

#### 응답
```json
{
  "success": true,
  "data": {
    "period": "2025-01",
    "usage": {
      "apiCalls": 1250,
      "searches": 450,
      "downloads": 125,
      "exports": 8
    },
    "limits": {
      "apiCalls": 5000,
      "searches": 1000,
      "downloads": 500,
      "exports": 20
    },
    "resetDate": "2025-02-01T00:00:00Z"
  }
}
```

---

## 📋 에러 코드

### 인증 관련
- `AUTH_REQUIRED`: 인증이 필요합니다
- `INVALID_TOKEN`: 유효하지 않은 토큰입니다
- `TOKEN_EXPIRED`: 토큰이 만료되었습니다
- `INSUFFICIENT_PERMISSION`: 권한이 부족합니다

### 비즈니스 로직 관련
- `BUSINESS_NOT_FOUND`: 업체를 찾을 수 없습니다
- `INVALID_REGION`: 유효하지 않은 지역입니다
- `SEARCH_LIMIT_EXCEEDED`: 검색 한도를 초과했습니다
- `EXPORT_LIMIT_EXCEEDED`: 내보내기 한도를 초과했습니다

### 시스템 관련
- `INTERNAL_SERVER_ERROR`: 내부 서버 오류
- `SERVICE_UNAVAILABLE`: 서비스를 사용할 수 없습니다
- `RATE_LIMIT_EXCEEDED`: 요청 한도를 초과했습니다

---

## 🔄 Rate Limiting

### 기본 제한
- **인증되지 않은 사용자**: 100 requests/hour
- **Basic 플랜**: 1,000 requests/hour
- **Pro 플랜**: 5,000 requests/hour
- **Enterprise 플랜**: 20,000 requests/hour

### 헤더 정보
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643558400
```

---

## 📝 변경 이력

### v1.0 (2025-01-30)
- 초기 API 명세서 작성
- 기본 CRUD 및 검색 API 정의
- 지도 및 분석 API 정의

---

**작성자**: 팀장킴 (API Architect)  
**검토자**: 나기획 (Technical Reviewer)  
**작성일**: 2025-01-30  
**버전**: v1.0