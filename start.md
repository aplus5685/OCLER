# 🚀 ClaudeFlood 프로젝트 시작 가이드

## 빠른 시작 (30초 설정)

### 1단계: 프로젝트 초기화
```bash
# 새 프로젝트 디렉토리로 이동
cd /your/project/directory

# ClaudeFlood 초기화 (전역 설치되어 있어야 함)
npx claude-flow@alpha init --force
```

### 2단계: 환경 변수 설정 (최초 1회만)
```bash
# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="your-api-key-here"
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "your-api-key", "User")

# macOS/Linux (Bash)
export ANTHROPIC_API_KEY="your-api-key-here"
echo 'export ANTHROPIC_API_KEY="your-api-key"' >> ~/.bashrc
source ~/.bashrc
```

### 3단계: 즉시 사용 가능!
```bash
# 기본 AI 스웜으로 작업 시작
npx claude-flow@alpha swarm "프로젝트 분석 및 개선 제안"

# 복잡한 작업을 위한 하이브 마인드
npx claude-flow@alpha hive-mind spawn "REST API 구축" --claude

# Claude Code와 통합 사용
claude
```

---

## 🎯 주요 명령어

### 스웜 시스템 (빠른 작업)
```bash
# 코드 분석
npx claude-flow@alpha swarm "코드 품질 분석"

# 버그 수정
npx claude-flow@alpha swarm "성능 이슈 해결"

# 기능 구현
npx claude-flow@alpha swarm "사용자 인증 시스템 구현"
```

### 하이브 마인드 (복잡한 프로젝트)
```bash
# 전체 시스템 설계
npx claude-flow@alpha hive-mind spawn "마이크로서비스 아키텍처 설계" --claude

# 기업용 개발
npx claude-flow@alpha hive-mind wizard

# 성능 최적화
npx claude-flow@alpha hive-mind spawn "데이터베이스 최적화" --claude
```

### Claude Code 통합
```bash
# 기본 세션
claude

# 권한 설정 건너뛰기
claude --dangerously-skip-permissions

# 특정 도구만 허용
claude --allowedTools "Edit,Write,Bash"
```

---

## 📁 생성되는 파일 구조

```
your-project/
├── .claude/                    # ClaudeFlood 설정 디렉토리
│   ├── agents/                 # 64개 전문 AI 에이전트
│   ├── commands/               # 10개 카테고리 명령어
│   ├── helpers/                # 유틸리티 스크립트
│   ├── settings.json           # 메인 설정
│   └── settings.local.json     # 로컬 권한 설정
├── .swarm/                     # 스웜 메모리 시스템
│   └── memory.db              # SQLite 메모리 데이터베이스
├── .hive-mind/                 # 하이브 마인드 시스템
│   └── hive.db                # 하이브 데이터베이스
├── claude-flow.config.json     # ClaudeFlood 프로젝트 설정
├── .mcp.json                   # MCP 서버 설정
└── CLAUDE.md                   # Claude Code 프로젝트 문서
```

---

## 🤖 사용 가능한 에이전트 카테고리

### 💻 개발 관련 (16개 카테고리)
- **analysis**: 코드 분석, 품질 검사
- **architecture**: 시스템 설계, 패턴 적용
- **core**: 기본 개발 작업
- **development**: 신규 개발, 기능 구현
- **devops**: 배포, CI/CD, 인프라
- **testing**: 테스트 작성, 품질 보증

### 🔧 협업 관련
- **consensus**: 팀 의사결정 지원
- **documentation**: 문서 작성, 가이드 생성
- **github**: Git 워크플로우, PR 관리
- **swarm**: 다중 에이전트 협업

### ⚡ 성능 관련
- **optimization**: 성능 최적화
- **data**: 데이터 처리, 분석
- **hive-mind**: 복잡한 문제 해결

---

## 🛠️ 고급 설정

### GitHub 통합 활성화
```bash
# GitHub 연동 설정
.claude/helpers/github-setup.sh

# 자동 체크포인트 활성화 (이미 기본 활성화됨)
# settings.json에서 "hooks" 섹션 확인
```

### 체크포인트 관리
```bash
# 체크포인트 생성
.claude/helpers/checkpoint-manager.sh create "기능 완성"

# 이전 체크포인트로 롤백
.claude/helpers/checkpoint-manager.sh rollback
```

### MCP 서버 추가
```bash
# Claude Flow MCP 서버 추가
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Ruv Swarm MCP 서버 추가
claude mcp add ruv-swarm npx ruv-swarm@latest mcp start
```

---

## 📊 성능 지표

### ClaudeFlood v2.0.0-alpha.83 성능
- ✅ **84.8% SWE-Bench 해결률**: 업계 최고 수준
- ✅ **32.3% 토큰 절약**: 효율적인 작업 분할
- ✅ **2.8-4.4배 속도 향상**: 병렬 처리로 처리량 극대화
- ✅ **87개 MCP 도구**: 가장 포괄적인 AI 도구 세트
- ✅ **제로 설정**: Claude Code와 자동 통합

---

## 🚨 문제 해결

### 설치 문제
```bash
# 전역 설치 확인
claude --version
claude-flow --version

# 재설치가 필요한 경우
npm install -g @anthropic-ai/claude-code
npm install -g claude-flow@2.0.0-alpha.83
```

### 권한 문제
```bash
# 권한 설정 초기화
claude --dangerously-skip-permissions

# 특정 도구만 허용
claude --allowedTools "Edit,Write,Bash,Grep,Read"
```

### API 키 문제
```bash
# 환경 변수 확인 (Windows)
echo $env:ANTHROPIC_API_KEY

# 환경 변수 확인 (Linux/macOS)
echo $ANTHROPIC_API_KEY
```

---

## 💡 팁 & 베스트 프랙티스

### 1. 프로젝트 타입별 활용
```bash
# 웹 애플리케이션
npx claude-flow@alpha swarm "React 컴포넌트 최적화"

# API 서버
npx claude-flow@alpha swarm "REST API 보안 강화"

# 데이터 분석
npx claude-flow@alpha hive-mind spawn "데이터 파이프라인 구축" --claude
```

### 2. 단계별 개발
```bash
# 1단계: 분석
npx claude-flow@alpha swarm "프로젝트 현황 분석"

# 2단계: 설계
npx claude-flow@alpha hive-mind spawn "아키텍처 설계" --claude

# 3단계: 구현
npx claude-flow@alpha swarm "기능 구현"

# 4단계: 최적화
npx claude-flow@alpha swarm "성능 최적화"
```

### 3. 협업 워크플로우
- 체크포인트를 활용한 진행상황 추적
- GitHub 통합으로 자동 커밋 및 PR 생성
- 에이전트별 역할 분담으로 효율적 개발

---

## 🔗 참고 링크

- [ClaudeFlood GitHub](https://github.com/ruvnet/claude-flow)
- [Claude Code 공식 문서](https://docs.anthropic.com/en/docs/claude-code)
- [명령어 상세 문서](.claude/commands/)
- [에이전트 가이드](.claude/agents/)

---

**🎉 설정 완료! 이제 AI 기반 개발의 새로운 경험을 시작하세요!**