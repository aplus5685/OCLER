/**
 * OCLER 컴포넌트 테스트 시스템
 * 성능, 접근성, 한국어 지원 테스트 포함
 */

class OCLERTestRunner {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            errors: [],
            performance: {},
            accessibility: {},
            korean: {}
        };
        this.startTime = 0;
    }

    // 테스트 추가
    test(name, testFn) {
        this.tests.push({ name, testFn });
    }

    // 모든 테스트 실행
    async runAll() {
        console.log('🧪 OCLER 컴포넌트 테스트 시작...\n');
        this.startTime = performance.now();
        
        for (const test of this.tests) {
            await this.runSingleTest(test);
        }
        
        this.generateReport();
    }

    // 개별 테스트 실행
    async runSingleTest(test) {
        try {
            const startTime = performance.now();
            await test.testFn();
            const duration = performance.now() - startTime;
            
            console.log(`✅ ${test.name} (${duration.toFixed(2)}ms)`);
            this.results.passed++;
            
        } catch (error) {
            console.log(`❌ ${test.name}`);
            console.log(`   Error: ${error.message}\n`);
            this.results.failed++;
            this.results.errors.push({
                test: test.name,
                error: error.message
            });
        }
    }

    // 결과 리포트 생성
    generateReport() {
        const totalTime = performance.now() - this.startTime;
        const total = this.results.passed + this.results.failed;
        
        console.log('\n' + '='.repeat(50));
        console.log('📊 OCLER 테스트 결과 리포트');
        console.log('='.repeat(50));
        console.log(`총 테스트: ${total}`);
        console.log(`통과: ${this.results.passed} ✅`);
        console.log(`실패: ${this.results.failed} ❌`);
        console.log(`성공률: ${((this.results.passed / total) * 100).toFixed(1)}%`);
        console.log(`총 소요시간: ${totalTime.toFixed(2)}ms`);
        
        if (this.results.errors.length > 0) {
            console.log('\n🚨 실패한 테스트:');
            this.results.errors.forEach(error => {
                console.log(`   • ${error.test}: ${error.error}`);
            });
        }
        
        console.log('\n' + '='.repeat(50));
    }

    // 어설션 헬퍼
    assert(condition, message = 'Assertion failed') {
        if (!condition) {
            throw new Error(message);
        }
    }

    assertEqual(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`${message} Expected: ${expected}, Actual: ${actual}`);
        }
    }

    assertExists(element, message = 'Element does not exist') {
        if (!element) {
            throw new Error(message);
        }
    }

    assertHasClass(element, className, message = '') {
        if (!element.classList.contains(className)) {
            throw new Error(`${message} Element does not have class: ${className}`);
        }
    }

    assertAccessible(element, message = 'Element is not accessible') {
        // 기본 접근성 검사
        const checks = [
            element.getAttribute('tabindex') !== null || element.tagName.toLowerCase() === 'button' || element.tagName.toLowerCase() === 'a',
            element.getAttribute('aria-label') || element.textContent.trim() !== '',
            !element.hasAttribute('aria-hidden') || element.getAttribute('aria-hidden') === 'false'
        ];
        
        if (!checks.every(check => check)) {
            throw new Error(message);
        }
    }
}

// 테스트 인스턴스 생성
const testRunner = new OCLERTestRunner();

// ==========================================================================
// 컴포넌트 기본 기능 테스트
// ==========================================================================

testRunner.test('컴포넌트 팩토리 초기화', () => {
    testRunner.assertExists(window.OCLERComponents, 'OCLERComponents 글로벌 객체가 없습니다');
    testRunner.assertExists(window.OCLERComponents.factory, '컴포넌트 팩토리가 없습니다');
});

testRunner.test('버튼 컴포넌트 생성', () => {
    const button = window.OCLERComponents.createButton({
        text: '테스트 버튼',
        variant: 'primary'
    });
    
    testRunner.assertExists(button, '버튼 컴포넌트가 생성되지 않았습니다');
    testRunner.assertExists(button.element, '버튼 엘리먼트가 없습니다');
    testRunner.assertEqual(button.element.tagName.toLowerCase(), 'button', '잘못된 태그입니다');
    testRunner.assertHasClass(button.element, 'ocler-btn', '버튼 클래스가 없습니다');
    testRunner.assertHasClass(button.element, 'ocler-btn--primary', 'primary 클래스가 없습니다');
    
    // 정리
    button.destroy();
});

testRunner.test('입력 필드 컴포넌트 생성', () => {
    const input = window.OCLERComponents.createInput({
        label: '테스트 입력',
        placeholder: '텍스트를 입력하세요',
        type: 'text'
    });
    
    testRunner.assertExists(input, '입력 필드 컴포넌트가 생성되지 않았습니다');
    testRunner.assertExists(input.element, '입력 필드 엘리먼트가 없습니다');
    testRunner.assertExists(input.inputElement, '실제 input 엘리먼트가 없습니다');
    testRunner.assertHasClass(input.element, 'ocler-input-group', '입력 그룹 클래스가 없습니다');
    
    // 정리
    input.destroy();
});

// ==========================================================================
// 접근성 테스트
// ==========================================================================

testRunner.test('버튼 접근성 검사', () => {
    const button = window.OCLERComponents.createButton({
        text: '접근성 테스트 버튼'
    });
    
    document.body.appendChild(button.element);
    
    // ARIA 레이블 검사
    testRunner.assertExists(button.element.getAttribute('aria-label'), 'ARIA 레이블이 없습니다');
    
    // 키보드 접근성 검사
    testRunner.assertAccessible(button.element, '버튼이 접근 가능하지 않습니다');
    
    // 포커스 가능성 검사
    button.element.focus();
    testRunner.assertEqual(document.activeElement, button.element, '버튼이 포커스되지 않습니다');
    
    // 정리
    document.body.removeChild(button.element);
    button.destroy();
});

testRunner.test('입력 필드 접근성 검사', () => {
    const input = window.OCLERComponents.createInput({
        label: '접근성 테스트',
        required: true
    });
    
    document.body.appendChild(input.element);
    
    // 레이블 연결 검사
    testRunner.assertExists(input.labelElement, '레이블이 없습니다');
    testRunner.assertExists(input.inputElement.id, 'input ID가 없습니다');
    testRunner.assertEqual(
        input.labelElement.getAttribute('for'), 
        input.inputElement.id, 
        '레이블과 입력 필드가 연결되지 않았습니다'
    );
    
    // 필수 필드 표시 검사
    testRunner.assertEqual(
        input.inputElement.getAttribute('aria-required'), 
        'true', 
        'aria-required가 설정되지 않았습니다'
    );
    
    // 정리
    document.body.removeChild(input.element);
    input.destroy();
});

// ==========================================================================
// 성능 테스트
// ==========================================================================

testRunner.test('컴포넌트 렌더링 성능', () => {
    const startTime = performance.now();
    const components = [];
    
    // 100개 버튼 생성
    for (let i = 0; i < 100; i++) {
        const button = window.OCLERComponents.createButton({
            text: `버튼 ${i}`,
            variant: i % 2 === 0 ? 'primary' : 'secondary'
        });
        components.push(button);
    }
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    testRunner.assert(renderTime < 100, `렌더링이 너무 느립니다: ${renderTime.toFixed(2)}ms`);
    console.log(`   📊 100개 컴포넌트 렌더링: ${renderTime.toFixed(2)}ms`);
    
    // 정리
    components.forEach(component => component.destroy());
});

testRunner.test('메모리 누수 방지', () => {
    const factory = window.OCLERComponents.factory;
    const initialReport = factory.getPerformanceReport();
    
    // 컴포넌트 생성 및 삭제
    const components = [];
    for (let i = 0; i < 50; i++) {
        components.push(window.OCLERComponents.createButton({ text: `테스트 ${i}` }));
    }
    
    const midReport = factory.getPerformanceReport();
    testRunner.assertEqual(midReport.activeComponents, 50, '활성 컴포넌트 수가 일치하지 않습니다');
    
    // 모든 컴포넌트 삭제
    components.forEach(component => component.destroy());
    
    const finalReport = factory.getPerformanceReport();
    testRunner.assertEqual(finalReport.activeComponents, 0, '컴포넌트가 완전히 정리되지 않았습니다');
});

// ==========================================================================
// 한국어 지원 테스트
// ==========================================================================

testRunner.test('한글 입력 지원', () => {
    const input = window.OCLERComponents.createInput({
        label: '한글 입력 테스트',
        korean: true
    });
    
    document.body.appendChild(input.element);
    
    // 한글 속성 검사
    testRunner.assertEqual(input.inputElement.lang, 'ko', '한국어 lang 속성이 설정되지 않았습니다');
    testRunner.assertEqual(
        input.inputElement.getAttribute('inputmode'), 
        'text', 
        'inputmode가 설정되지 않았습니다'
    );
    
    // 한글 입력 시뮬레이션
    const koreanText = '안녕하세요';
    input.setValue(koreanText);
    testRunner.assertEqual(input.getValue(), koreanText, '한글 텍스트가 올바르지 않습니다');
    
    // 정리
    document.body.removeChild(input.element);
    input.destroy();
});

testRunner.test('한국어 유틸리티 함수', () => {
    const KoreanUtils = window.OCLERComponents.KoreanUtils;
    
    // 주소 파싱 테스트
    const address = '서울특별시 강남구 역삼동';
    const parsed = KoreanUtils.parseKoreanAddress(address);
    
    testRunner.assertEqual(parsed.sido, '서울', '시도 파싱이 올바르지 않습니다');
    testRunner.assertEqual(parsed.sigungu, '강남구', '시군구 파싱이 올바르지 않습니다');
    testRunner.assertEqual(parsed.dong, '역삼동', '동 파싱이 올바르지 않습니다');
    
    // 카테고리 정렬 테스트
    const categories = ['한식', '중식', '일식', '양식'];
    const sorted = KoreanUtils.sortBusinessCategories(categories);
    testRunner.assertEqual(sorted[0], '양식', '한글 정렬이 올바르지 않습니다');
});

// ==========================================================================
// 반응형 디자인 테스트
// ==========================================================================

testRunner.test('반응형 클래스 적용', () => {
    const button = window.OCLERComponents.createButton({
        text: '반응형 테스트',
        responsive: true
    });
    
    document.body.appendChild(button.element);
    
    testRunner.assertHasClass(button.element, 'ocler-responsive', '반응형 클래스가 없습니다');
    
    // 모바일 시뮬레이션
    button.onResponsiveChange(true);
    testRunner.assertHasClass(button.element, 'mobile', '모바일 클래스가 추가되지 않았습니다');
    
    // 정리
    document.body.removeChild(button.element);
    button.destroy();
});

// ==========================================================================
// 에러 처리 테스트
// ==========================================================================

testRunner.test('잘못된 컴포넌트 생성 처리', () => {
    try {
        window.OCLERComponents.factory.create('nonexistent');
        testRunner.assert(false, '존재하지 않는 컴포넌트 생성이 성공했습니다');
    } catch (error) {
        testRunner.assert(error.message.includes('not found'), '적절한 오류 메시지가 없습니다');
    }
});

testRunner.test('입력 필드 유효성 검사', () => {
    const input = window.OCLERComponents.createInput({
        label: '이메일',
        pattern: '^[^@]+@[^@]+\\.[^@]+$',
        required: true
    });
    
    document.body.appendChild(input.element);
    
    // 빈 값 검사
    input.setValue('');
    testRunner.assert(!input.validate(), '빈 필수 필드가 유효성 검사를 통과했습니다');
    
    // 잘못된 패턴 검사
    input.setValue('invalid-email');
    testRunner.assert(!input.validate(), '잘못된 이메일 형식이 유효성 검사를 통과했습니다');
    
    // 올바른 값 검사
    input.setValue('test@example.com');
    testRunner.assert(input.validate(), '올바른 이메일 형식이 유효성 검사를 실패했습니다');
    
    // 정리
    document.body.removeChild(input.element);
    input.destroy();
});

// ==========================================================================
// 테스트 실행
// ==========================================================================

// DOM이 로드된 후 테스트 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        testRunner.runAll();
    });
} else {
    testRunner.runAll();
}

// 테스트 결과를 전역에서 접근 가능하도록
window.OCLERTests = {
    runner: testRunner,
    runAll: () => testRunner.runAll(),
    results: testRunner.results
};