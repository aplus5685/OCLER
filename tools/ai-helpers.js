#!/usr/bin/env node

/**
 * OCLER 프로젝트 AI 개발 헬퍼 스크립트
 * ClaudeFlood와 Claude Code를 활용한 개발 워크플로우 자동화
 */

const { execSync } = require('child_process');

const AI_HELPERS = {
    // 🚀 개발 시작
    devStart() {
        console.log('🚀 오늘의 개발 계획을 수립하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "오늘의 OCLER 개발 목표와 우선순위 설정"', {stdio: 'inherit'});
    },

    // 🔍 코드 리뷰
    codeReview() {
        console.log('🔍 현재 작업 코드를 리뷰하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "현재 OCLER 프로젝트 코드 리뷰 및 개선점 제안"', {stdio: 'inherit'});
    },

    // 🧩 컴포넌트 생성
    createComponent(name) {
        if (!name) {
            console.log('❌ 컴포넌트 이름을 지정해주세요: npm run ai:component <이름>');
            return;
        }
        console.log(`🧩 ${name} 컴포넌트를 생성하고 있습니다...`);
        execSync(`npx claude-flow@alpha swarm "OCLER용 ${name} UI 컴포넌트 생성 - 한국 비즈니스 특화"`, {stdio: 'inherit'});
    },

    // ⚡ 성능 최적화
    optimize() {
        console.log('⚡ 성능 최적화를 진행하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "OCLER UI 컴포넌트 성능 최적화 및 번들 크기 분석"', {stdio: 'inherit'});
    },

    // 🧪 테스트 생성
    createTests() {
        console.log('🧪 자동 테스트를 생성하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "OCLER 컴포넌트 자동 테스트 코드 생성"', {stdio: 'inherit'});
    },

    // 📱 반응형 체크
    responsiveCheck() {
        console.log('📱 반응형 디자인을 체크하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "OCLER 컴포넌트 반응형 디자인 및 모바일 최적화 검증"', {stdio: 'inherit'});
    },

    // 🎨 디자인 시스템
    designSystem() {
        console.log('🎨 디자인 시스템을 개선하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "OCLER 한국 비즈니스 특화 디자인 시스템 개선"', {stdio: 'inherit'});
    },

    // 📚 문서 생성
    generateDocs() {
        console.log('📚 문서를 자동 생성하고 있습니다...');
        execSync('npx claude-flow@alpha swarm "OCLER 컴포넌트 API 문서 및 사용 가이드 자동 생성"', {stdio: 'inherit'});
    },

    // 🔧 빌드 최적화
    optimizeBuild() {
        console.log('🔧 빌드 시스템을 최적화하고 있습니다...');
        execSync('npx claude-flow@alpha hive-mind spawn "OCLER 프로젝트 빌드 시스템 최적화" --claude', {stdio: 'inherit'});
    },

    // 🚨 버그 수정
    fixBug(description = '') {
        console.log('🚨 버그를 분석하고 수정하고 있습니다...');
        const prompt = description 
            ? `OCLER 프로젝트 버그 수정: ${description}`
            : 'OCLER 프로젝트의 현재 이슈 분석 및 버그 수정';
        execSync(`npx claude-flow@alpha swarm "${prompt}"`, {stdio: 'inherit'});
    },

    // 📊 프로젝트 분석
    analyze() {
        console.log('📊 프로젝트 전체를 분석하고 있습니다...');
        execSync('npx claude-flow@alpha hive-mind spawn "OCLER 프로젝트 종합 분석 및 개선 로드맵" --claude', {stdio: 'inherit'});
    },

    // 🎯 도움말
    help() {
        console.log(`
🤖 OCLER AI 개발 헬퍼 - 사용 가능한 명령어:

📋 일반 개발
  npm run ai:start          - 오늘의 개발 계획 수립
  npm run ai:review          - 코드 리뷰 및 개선점 제안
  npm run ai:analyze         - 프로젝트 종합 분석

🧩 컴포넌트 개발
  npm run ai:component <이름> - 새 컴포넌트 생성
  npm run ai:optimize        - 성능 최적화
  npm run ai:responsive      - 반응형 디자인 검증
  npm run ai:design          - 디자인 시스템 개선

🧪 품질 관리
  npm run ai:test            - 자동 테스트 생성
  npm run ai:bug [설명]      - 버그 분석 및 수정
  npm run ai:build           - 빌드 시스템 최적화

📚 문서화
  npm run ai:docs            - API 문서 자동 생성

💡 팁: 모든 명령어는 ClaudeFlood의 AI 에이전트가 자동으로 처리합니다!
        `);
    }
};

// 명령어 라인 처리
const command = process.argv[2];
const param = process.argv[3];

switch(command) {
    case 'start': AI_HELPERS.devStart(); break;
    case 'review': AI_HELPERS.codeReview(); break;
    case 'component': AI_HELPERS.createComponent(param); break;
    case 'optimize': AI_HELPERS.optimize(); break;
    case 'test': AI_HELPERS.createTests(); break;
    case 'responsive': AI_HELPERS.responsiveCheck(); break;
    case 'design': AI_HELPERS.designSystem(); break;
    case 'docs': AI_HELPERS.generateDocs(); break;
    case 'build': AI_HELPERS.optimizeBuild(); break;
    case 'bug': AI_HELPERS.fixBug(param); break;
    case 'analyze': AI_HELPERS.analyze(); break;
    case 'help':
    default: AI_HELPERS.help(); break;
}