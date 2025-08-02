# SuperClaude Framework - /SC 명령어 참고서

SuperClaude Framework의 모든 /SC 명령어를 사용 빈도가 높을 것으로 예상되는 순서로 정리했습니다.

## 🚀 가장 자주 사용할 명령어들

### 1. `/sc:implement` - 기능 구현
**가장 중요한 명령어! 기능, 컴포넌트, API 구현**

```bash
# 기본 사용법
/sc:implement 사용자인증시스템
/sc:implement 쇼핑카트기능

# 타입별 구현
/sc:implement --type component LoginForm
/sc:implement --type api user-management  
/sc:implement --type service payment-processing
/sc:implement --type feature dashboard

# 프레임워크별 구현
/sc:implement dashboard --framework react
/sc:implement user-profile --framework vue
/sc:implement blog-system --framework next

# 추가 옵션
/sc:implement user-auth --with-tests        # 테스트 포함
/sc:implement payment --safe                # 안전 모드
/sc:implement chat --iterative             # 반복 개선
/sc:implement api --documentation          # 문서 포함
```

### 2. `/sc:analyze` - 코드 분석
**프로젝트 이해와 문제 파악에 필수**

```bash
# 기본 분석
/sc:analyze src/                           # 전체 소스 분석
/sc:analyze components/                    # 특정 폴더 분석
/sc:analyze app.js                         # 특정 파일 분석

# 집중 분석
/sc:analyze --focus security              # 보안 중심 분석
/sc:analyze --focus performance           # 성능 중심 분석
/sc:analyze --focus architecture          # 아키텍처 중심 분석
/sc:analyze --focus quality               # 코드 품질 분석

# 분석 깊이
/sc:analyze --depth quick src/            # 빠른 분석
/sc:analyze --depth deep app.js          # 심층 분석

# 리포트 생성
/sc:analyze --format report .             # 분석 리포트 생성
/sc:analyze --output detailed src/        # 상세 결과
```

### 3. `/sc:build` - 프로젝트 빌드
**스마트 빌드 시스템, 자동으로 빌드 방식 감지**

```bash
# 기본 빌드 (자동 감지)
/sc:build                                 # 프로젝트 자동 빌드

# 빌드 타입별
/sc:build --type dev                      # 개발용 빌드
/sc:build --type prod                     # 프로덕션 빌드
/sc:build --type test                     # 테스트용 빌드

# 빌드 옵션
/sc:build --clean                         # 클린 빌드
/sc:build --optimize                      # 최적화 빌드
/sc:build --watch                         # 감시 모드
/sc:build --verbose                       # 상세 로그
```

### 4. `/sc:improve` - 코드 개선
**기존 코드 품질 향상**

```bash
# 기본 개선
/sc:improve messy-file.js                 # 특정 파일 개선
/sc:improve src/components/               # 폴더 전체 개선

# 개선 타입별
/sc:improve --type performance app.js     # 성능 개선
/sc:improve --type quality src/           # 코드 품질 개선
/sc:improve --type security auth.js       # 보안 개선
/sc:improve --type accessibility ui/      # 접근성 개선

# 개선 옵션
/sc:improve --safe components/            # 안전 모드 (파괴적 변경 방지)
/sc:improve --preview app.js              # 미리보기만
/sc:improve --iterative slow-function.js  # 점진적 개선
```

## 🔧 개발 과정에서 자주 사용할 명령어들

### 5. `/sc:troubleshoot` - 문제 해결
**버그와 오류 디버깅**

```bash
# 기본 문제 해결
/sc:troubleshoot "로그인이 안 됨"
/sc:troubleshoot "API 500 에러"
/sc:troubleshoot "페이지 로딩 느림"

# 로그 파일 분석
/sc:troubleshoot --logs error.log
/sc:troubleshoot --logs server.log --focus database

# 시스템적 디버깅
/sc:troubleshoot --systematic "결제 실패"
/sc:troubleshoot --focus network "연결 문제"
/sc:troubleshoot --focus database "쿼리 오류"
```

### 6. `/sc:test` - 테스트
**테스트 작성 및 실행**

```bash
# 기본 테스트
/sc:test                                  # 전체 테스트 실행
/sc:test components/                      # 특정 폴더 테스트

# 테스트 타입별
/sc:test --type unit LoginForm.jsx        # 단위 테스트
/sc:test --type integration api/          # 통합 테스트
/sc:test --type e2e user-flow             # E2E 테스트

# 테스트 생성
/sc:test --generate UserService.js        # 테스트 코드 생성
/sc:test --coverage src/                  # 커버리지 측정
```

### 7. `/sc:design` - 시스템 설계
**아키텍처와 설계**

```bash
# 시스템 설계
/sc:design --type architecture ecommerce-system
/sc:design --type api user-management
/sc:design --type database inventory-system
/sc:design --type component chat-interface

# 설계 포맷
/sc:design --format diagram chat-system   # 다이어그램 생성
/sc:design --format spec payment-api      # 스펙 문서 생성
/sc:design --format wireframe mobile-app  # 와이어프레임

# 상세 설계
/sc:design --detailed microservices-arch
/sc:design --with-examples rest-api
```

## 📋 프로젝트 관리 명령어들

### 8. `/sc:workflow` - 워크플로우 생성
**PRD에서 구현 워크플로우 생성**

```bash
# PRD 기반 워크플로우
/sc:workflow feature-100-prd.md
/sc:workflow docs/user-auth-spec.md

# 워크플로우 전략
/sc:workflow --strategy systematic user-dashboard
/sc:workflow --strategy mvp payment-system
/sc:workflow --strategy agile chat-feature

# 상세 워크플로우
/sc:workflow --output detailed feature-spec.md
/sc:workflow --risks --dependencies complex-feature
/sc:workflow --persona security auth-system
```

### 9. `/sc:task` - 작업 관리
**태스크 관리와 추적**

```bash
# 기본 작업 관리
/sc:task create "사용자 인증 구현"
/sc:task list                             # 작업 목록
/sc:task status                           # 진행 상황

# 작업 생성
/sc:task --priority high "보안 패치"
/sc:task --estimate 3d "대시보드 개발"
/sc:task --assign frontend "UI 개선"

# 작업 추적
/sc:task update "진행 중"
/sc:task complete "로그인 기능"
```

### 10. `/sc:estimate` - 작업 추정
**개발 시간 및 리소스 추정**

```bash
# 기본 추정
/sc:estimate "사용자 대시보드 개발"
/sc:estimate src/components/              # 기존 코드 기반 추정

# 상세 추정
/sc:estimate --detailed "전자상거래 시스템"
/sc:estimate --breakdown "채팅 시스템"    # 세부 작업별 분해
/sc:estimate --complexity high "AI 기능"  # 복잡도 고려

# 리소스 추정
/sc:estimate --team-size 3 "프로젝트 A"
/sc:estimate --skills react,node "웹앱"
```

## 📚 문서화 및 학습 명령어들

### 11. `/sc:document` - 문서화
**자동 문서 생성**

```bash
# 기본 문서화
/sc:document src/                         # 코드 기반 문서 생성
/sc:document --api routes/                # API 문서 생성

# 문서 타입별
/sc:document --type readme .              # README 생성
/sc:document --type api-spec controllers/ # API 스펙 문서
/sc:document --type user-guide features/  # 사용자 가이드
/sc:document --type technical-spec arch/  # 기술 명세서

# 문서 옵션
/sc:document --format markdown src/       # 마크다운 형식
/sc:document --detailed --examples api/   # 상세 문서 + 예제
```

### 12. `/sc:explain` - 설명
**코드와 개념 설명**

```bash
# 기본 설명
/sc:explain async/await                   # 개념 설명
/sc:explain --code complex-function.js    # 특정 코드 설명

# 난이도별 설명
/sc:explain --beginner "React hooks"      # 초보자용 설명
/sc:explain --advanced "메모리 관리"      # 고급자용 설명
/sc:explain --intermediate "API 설계"     # 중급자용 설명

# 상세 설명
/sc:explain --examples "Promise 패턴"     # 예제 포함 설명
/sc:explain --visual "데이터 플로우"       # 시각적 설명
```

## 🛠️ 유틸리티 명령어들

### 13. `/sc:cleanup` - 코드 정리
**코드베이스 정리 및 리팩토링**

```bash
# 기본 정리
/sc:cleanup src/                          # 전체 소스 정리
/sc:cleanup --unused                      # 사용하지 않는 코드 제거

# 정리 타입별
/sc:cleanup --type imports src/           # import 문정리
/sc:cleanup --type formatting .           # 코드 포맷팅
/sc:cleanup --type dependencies           # 의존성 정리

# 안전 정리
/sc:cleanup --safe --preview legacy/     # 안전 모드 + 미리보기
```

### 14. `/sc:git` - Git 작업
**Git 워크플로우 자동화**

```bash
# 기본 Git 작업
/sc:git commit "기능 구현 완료"           # 스마트 커밋
/sc:git branch feature/user-auth          # 브랜치 생성 및 전환

# 고급 Git 작업
/sc:git --semantic-commit "로그인 기능"   # 시맨틱 커밋 메시지
/sc:git --auto-push feature/payment       # 자동 푸시
/sc:git merge --smart develop             # 스마트 머지

# Git 분석
/sc:git analyze                           # 저장소 분석
/sc:git history complex-file.js           # 파일 히스토리
```

### 15. `/sc:index` - 인덱싱
**프로젝트 구조 파악**

```bash
# 기본 인덱싱
/sc:index                                 # 사용 가능한 기능 확인
/sc:index src/                           # 소스 구조 인덱싱

# 상세 인덱싱
/sc:index --detailed                      # 상세 프로젝트 구조
/sc:index --components                    # 컴포넌트 인덱스
/sc:index --api-endpoints                 # API 엔드포인트 목록
```

## 🎯 고급 명령어들

### 16. `/sc:load` - 리소스 로딩
**프로젝트 컨텍스트 로딩**

```bash
# 기본 로딩
/sc:load project                          # 프로젝트 컨텍스트 로딩
/sc:load --config development.json        # 설정 파일 로딩

# 특정 리소스 로딩
/sc:load --database schema.sql            # 데이터베이스 스키마
/sc:load --api-spec openapi.yaml          # API 스펙
```

### 17. `/sc:spawn` - 컴포넌트 생성
**새로운 컴포넌트나 모듈 생성**

```bash
# 기본 생성
/sc:spawn component UserCard              # React 컴포넌트 생성
/sc:spawn service AuthService             # 서비스 클래스 생성

# 템플릿 기반 생성
/sc:spawn --template crud UserModel       # CRUD 템플릿
/sc:spawn --template api UserController   # API 컨트롤러 템플릿
```

## 💡 사용 팁

### 빠른 시작
```bash
# 프로젝트 파악하기
/sc:index                                 # 뭐가 있는지 확인
/sc:analyze src/                          # 코드 분석

# 기능 구현하기  
/sc:implement 원하는기능                   # 바로 구현 시작
/sc:build                                 # 빌드 확인
```

### 문제 해결
```bash
# 뭔가 안될 때
/sc:troubleshoot "문제 설명"               # 문제 해결 시도
/sc:analyze --focus 문제영역               # 문제 영역 분석
/sc:improve --safe 문제파일                # 안전하게 개선
```

### 품질 관리
```bash
# 코드 품질 향상
/sc:analyze --focus quality               # 품질 분석
/sc:improve --type quality                # 품질 개선
/sc:cleanup --safe                        # 안전한 정리
/sc:test --coverage                       # 테스트 커버리지
```

## 🚨 중요 참고사항

1. **자동 활성화**: SuperClaude는 작업에 따라 적절한 전문가(프론트엔드, 백엔드, 보안)와 도구를 자동으로 활성화합니다.

2. **스마트 감지**: 대부분의 명령어는 프로젝트 타입과 구조를 자동으로 감지하여 적절한 방식으로 동작합니다.

3. **안전 우선**: `--safe` 플래그를 사용하면 파괴적인 변경을 방지할 수 있습니다.

4. **점진적 개선**: `--iterative` 플래그로 단계적으로 개선할 수 있습니다.

5. **시작은 간단하게**: `/sc:analyze`나 `/sc:implement`로 시작하세요. 모든 명령어를 외울 필요는 없습니다!

---

*이 문서는 SuperClaude Framework v3 기준으로 작성되었습니다. 최신 정보는 [공식 문서](https://github.com/SuperClaude-Org/SuperClaude_Framework)를 참고하세요.*