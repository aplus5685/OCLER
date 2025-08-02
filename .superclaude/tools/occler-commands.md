# 오클러 전용 명령어 도구

## 📋 오클러 특화 명령어

### `/business-search [조건]`
**설명**: 12,000개 업체 데이터에서 조건에 맞는 업체 검색
**사용법**: 
```
/business-search status:operating category:cafe location:강남구
/business-search keyword:카페 radius:500m
```

### `/data-quality-check`
**설명**: 업체 데이터 품질 분석 및 개선사항 제안
**결과**: 완전성, 정확성, 일관성, 유효성 점수 리포트

### `/schema-optimize [테이블명]`
**설명**: 특정 테이블의 성능 최적화 방안 제안
**예시**: `/schema-optimize businesses`

### `/ui-component [컴포넌트명]`
**설명**: 오클러 앱용 UI 컴포넌트 생성
**예시**: 
```
/ui-component BusinessCard
/ui-component MapView
/ui-component StatusFilter
```

### `/api-endpoint [기능명]`
**설명**: RESTful API 엔드포인트 설계 및 구현
**예시**: `/api-endpoint search-businesses`

### `/test-scenario [기능명]`
**설명**: 특정 기능에 대한 테스트 시나리오 생성
**예시**: `/test-scenario business-status-change`

### `/security-audit [영역]`
**설명**: 특정 영역의 보안 취약점 점검
**예시**: `/security-audit api-authentication`

### `/performance-analysis [영역]`
**설명**: 성능 병목 지점 분석 및 개선 방안 제시
**예시**: `/performance-analysis database-queries`

### `/design-system [요소]`
**설명**: 디자인 시스템 요소 생성 및 가이드 제공
**예시**: `/design-system color-palette`

### `/user-journey [페르소나]`
**설명**: 특정 사용자 페르소나의 사용자 여정 분석
**예시**: `/user-journey 김창업`

## 🔧 조합 명령어

### `/review-code [파일경로]`
**설명**: 오클러 프로젝트 규칙에 따라 코드 리뷰
**담당**: 박방어 + 이디버 + 한보안

### `/deploy-checklist`
**설명**: 배포 전 체크리스트 생성
**담당**: 팀장킴 + 오테스 + 한보안

### `/feature-complete [기능명]`
**설명**: 새 기능 완료 시 전체 검증 프로세스
**담당**: 전체 팀원 순차 검토

## 📊 데이터 분석 명령어

### `/data-insight`
**설명**: 12,000개 업체 데이터에서 비즈니스 인사이트 도출

### `/trend-analysis [기간]`
**설명**: 업체 상태 변화 트렌드 분석

### `/competitor-analysis`
**설명**: 경쟁사 대비 차별화 포인트 분석

## 🎯 프로젝트 관리 명령어

### `/sprint-plan [주차]`
**설명**: 주간 스프린트 계획 수립

### `/risk-assessment`
**설명**: 프로젝트 위험 요소 평가 및 대응 방안

### `/milestone [단계]`
**설명**: 마일스톤 달성 여부 점검

---

**모든 명령어는 오클러 프로젝트의 RULES.md를 기반으로 실행됩니다.**