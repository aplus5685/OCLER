# GitHub 연동 완벽 가이드 📚

## 🎯 목적
오클러 프로젝트를 GitHub와 연동하여 안전한 코드 관리, 협업, 백업을 구현합니다.

## 📋 GitHub 연동이란?

### 🔍 기본 개념
- **Git**: 로컬 컴퓨터의 버전 관리 시스템
- **GitHub**: 클라우드 기반 Git 저장소 호스팅 서비스
- **연동**: 로컬 Git과 GitHub 저장소를 연결하는 것

### 💡 왜 GitHub와 연동해야 할까?
1. **백업**: 코드가 클라우드에 안전하게 저장됨
2. **협업**: 팀원들과 코드 공유 가능
3. **버전 관리**: 코드 변경 이력 추적
4. **배포**: GitHub Pages, Actions 등 활용 가능
5. **포트폴리오**: 개발 활동 증명

## 🚀 연동 방법 (단계별)

### 1단계: GitHub 계정 및 저장소 준비
```
필요한 것:
✓ GitHub 계정 (github.com)
✓ 새 저장소 생성 또는 기존 저장소 URL
```

### 2단계: 로컬 Git 정리
```bash
# 현재 상태 확인
git status

# 모든 파일 추가
git add .

# 첫 커밋 생성
git commit -m "Initial commit: 오클러 프로젝트 초기 설정"
```

### 3단계: GitHub 저장소와 연결
```bash
# 원격 저장소 추가
git remote add origin https://github.com/사용자명/저장소명.git

# 첫 푸시 (업로드)
git push -u origin master
```

## 🕐 연동 지속 기간

### ✅ 영구적 연동
- **한 번 설정하면**: 영구적으로 유지됨
- **컴퓨터 바뀌어도**: GitHub에 코드 안전하게 보관
- **팀원 변경되어도**: 저장소는 계속 존재

### 🔄 일상적인 사용 패턴
```bash
# 매일 작업 후
git add .                    # 변경사항 준비
git commit -m "작업 설명"     # 변경사항 저장
git push                     # GitHub에 업로드

# 새로운 컴퓨터에서 작업할 때
git clone https://github.com/사용자명/저장소명.git
```

## 📊 현재 오클러 프로젝트 상황

### 🔍 현재 상태
```
로컬 Git: ✅ 초기화됨
GitHub 연동: ❌ 미연결
파일 상태: 🔄 정리 필요
커밋: ❌ 없음
```

### 📁 연동할 파일들
```
✅ 포함할 파일들:
- 소스 코드 (.html, .css, .js, .jsx)
- 설정 파일 (package.json)
- 문서 (*.md)
- 컴포넌트 및 페이지

❌ 제외할 파일들:
- 임시 파일 (.tmp)
- 로그 파일 (.log)
- 개인 설정 (.env)
- 빌드 결과물 (dist/, build/)
```

## 🛠️ 연동 시나리오별 가이드

### 시나리오 1: 새 GitHub 저장소 생성
```bash
1. GitHub.com 접속
2. "New repository" 클릭
3. 저장소명: "occler" 입력
4. Public/Private 선택
5. "Create repository" 클릭
6. 제공된 URL 복사
```

### 시나리오 2: 기존 저장소 활용
```bash
1. 기존 저장소 URL 확인
2. 권한 확인 (읽기/쓰기 가능한지)
3. 브랜치 확인 (main? master?)
```

### 시나리오 3: 팀 프로젝트
```bash
1. Organization 저장소 생성
2. 팀원 초대
3. 브랜치 전략 수립 (main, develop, feature/*)
4. Pull Request 워크플로우 설정
```

## 🔧 실제 연동 명령어

### 1단계: 현재 상태 정리
```bash
cd "C:\dev\오클러"

# .gitignore 파일 생성 (제외할 파일 지정)
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore

# 모든 변경사항 스테이징
git add .

# 첫 커밋
git commit -m "🎉 오클러 프로젝트 초기 커밋

- 디자인 시스템 구축
- React 컴포넌트 (StoreCard, Pages)
- 스타일시트 통합 (main.css)
- 프로젝트 문서화
- SuperClaude Framework 참고서"
```

### 2단계: GitHub 연동
```bash
# GitHub 저장소 URL (예시)
git remote add origin https://github.com/사용자명/occler.git

# 기본 브랜치 설정
git branch -M main

# 첫 업로드
git push -u origin main
```

### 3단계: 일상적인 작업 플로우
```bash
# 매일 작업 시작 전 (최신 코드 받기)
git pull

# 작업 완료 후
git add .
git commit -m "✨ 새 기능: 사용자 인증 시스템 구현"
git push

# 새 기능 개발 시 (브랜치 사용)
git checkout -b feature/user-authentication
# ... 작업 ...
git push -u origin feature/user-authentication
```

## 🚨 주의사항 및 베스트 프랙티스

### ⚠️ 주의사항
1. **민감한 정보**: API 키, 비밀번호는 절대 업로드 금지
2. **대용량 파일**: 이미지, 동영상은 Git LFS 사용 고려
3. **커밋 메시지**: 명확하고 의미있게 작성
4. **정기 백업**: 주기적으로 push하여 백업

### 💪 베스트 프랙티스
```bash
# 좋은 커밋 메시지 예시
git commit -m "✨ feat: 로그인 폼 컴포넌트 추가"
git commit -m "🐛 fix: 모바일 반응형 오류 수정"
git commit -m "📝 docs: API 문서 업데이트"
git commit -m "♻️ refactor: CSS 스타일 통합"
git commit -m "🎨 style: 코드 포맷팅 정리"
```

### 📈 권장 워크플로우
```
개발 → 테스트 → 커밋 → 푸시 → 반복
  ↓
정기적인 백업과 문서화
  ↓
안정적인 프로젝트 관리
```

## 🎯 오클러 프로젝트 연동 액션 플랜

### 즉시 실행 (Priority 1)
1. **GitHub 저장소 생성** 결정
2. **현재 파일 정리** 및 첫 커밋
3. **원격 저장소 연결** 및 첫 푸시

### 단기 목표 (1주일 내)
1. **일일 커밋 습관** 형성
2. **브랜치 전략** 수립
3. **README.md** 프로젝트 소개 작성

### 장기 목표 (1개월 내)
1. **GitHub Actions** CI/CD 설정
2. **GitHub Pages** 배포 자동화
3. **팀 협업** 워크플로우 구축

## 🤝 도움이 필요할 때

### 문제 해결
```bash
# 연결 상태 확인
git remote -v

# 최근 커밋 확인
git log --oneline -5

# 현재 상태 확인
git status

# 변경사항 확인
git diff
```

### 자주 발생하는 문제들
1. **권한 오류**: GitHub 계정 인증 필요
2. **충돌 오류**: 다른 사람과 같은 파일 수정 시
3. **브랜치 오류**: 잘못된 브랜치에서 작업
4. **커밋 오류**: 잘못된 커밋 메시지나 파일

---

## 🚀 다음 단계

이 가이드를 읽었다면:
1. **GitHub 계정** 확인/생성
2. **저장소 생성** 방식 결정
3. **연동 실행** 준비

궁금한 점이나 도움이 필요하면 언제든지 말씀하세요! 💪