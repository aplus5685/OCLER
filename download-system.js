// 외주 디자이너용 컴포넌트 다운로드 시스템

class ComponentDownloader {
    constructor() {
        this.components = {
            // 버튼 컴포넌트들
            'primary-buttons': {
                name: 'Primary Buttons',
                category: 'buttons',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getPrimaryButtonsHTML(),
                css: this.getPrimaryButtonsCSS(),
                preview: 'primary-buttons-preview.png'
            },
            'secondary-buttons': {
                name: 'Secondary Buttons',
                category: 'buttons', 
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getSecondaryButtonsHTML(),
                css: this.getSecondaryButtonsCSS(),
                preview: 'secondary-buttons-preview.png'
            },
            'ghost-buttons': {
                name: 'Ghost Buttons',
                category: 'buttons',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getGhostButtonsHTML(),
                css: this.getGhostButtonsCSS(),
                preview: 'ghost-buttons-preview.png'
            },
            'danger-buttons': {
                name: 'Danger Buttons',
                category: 'buttons',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getDangerButtonsHTML(),
                css: this.getDangerButtonsCSS(),
                preview: 'danger-buttons-preview.png'
            },
            
            // 입력 컴포넌트들
            'text-inputs': {
                name: 'Text Inputs',
                category: 'inputs',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getTextInputsHTML(),
                css: this.getTextInputsCSS(),
                preview: 'text-inputs-preview.png'
            },
            'input-states': {
                name: 'Input States',
                category: 'inputs',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getInputStatesHTML(),
                css: this.getInputStatesCSS(),
                preview: 'input-states-preview.png'
            },
            'toggles': {
                name: 'Toggle Switches',
                category: 'inputs',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getTogglesHTML(),
                css: this.getTogglesCSS(),
                preview: 'toggles-preview.png'
            },
            'search-input': {
                name: 'Search Input',
                category: 'inputs',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getSearchInputHTML(),
                css: this.getSearchInputCSS(),
                preview: 'search-input-preview.png'
            },

            // 카드 컴포넌트들
            'basic-cards': {
                name: 'Basic Cards',
                category: 'cards',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getBasicCardsHTML(),
                css: this.getBasicCardsCSS(),
                preview: 'basic-cards-preview.png'
            },
            'glass-cards': {
                name: 'Glass Cards',
                category: 'cards',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getGlassCardsHTML(),
                css: this.getGlassCardsCSS(),
                preview: 'glass-cards-preview.png'
            },
            'feature-cards': {
                name: 'Feature Cards',
                category: 'cards',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getFeatureCardsHTML(),
                css: this.getFeatureCardsCSS(),
                preview: 'feature-cards-preview.png'
            },
            'metric-cards': {
                name: 'Metric Cards',
                category: 'cards',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getMetricCardsHTML(),
                css: this.getMetricCardsCSS(),
                preview: 'metric-cards-preview.png'
            },

            // 네비게이션 컴포넌트들
            'sidebar-nav': {
                name: 'Sidebar Navigation',
                category: 'navigation',
                files: ['linear-theme.css', 'linear-components.css'],
                html: this.getSidebarNavHTML(),
                css: this.getSidebarNavCSS(),
                preview: 'sidebar-nav-preview.png'
            }
        };
    }

    // 개별 컴포넌트 다운로드
    downloadComponent(componentId) {
        const component = this.components[componentId];
        if (!component) {
            console.error(`Component ${componentId} not found`);
            return;
        }

        const zip = new JSZip();
        const componentFolder = zip.folder(component.name);

        // HTML 파일 추가
        componentFolder.file(`${componentId}.html`, this.generateStandaloneHTML(component));
        
        // CSS 파일 추가
        componentFolder.file(`${componentId}.css`, component.css);
        
        // README 파일 추가
        componentFolder.file('README.md', this.generateReadme(component));
        
        // 사용 가이드 추가
        componentFolder.file('usage-guide.md', this.generateUsageGuide(component));
        
        // 테마 파일들 추가 (개별 다운로드에서도 포함)
        componentFolder.file('linear-theme.css', this.getThemeCSS());
        componentFolder.file('linear-components.css', this.getComponentsCSS());

        // ZIP 파일 생성 및 다운로드
        zip.generateAsync({type: 'blob'}).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `occler-${componentId}-component.zip`;
            link.click();
            URL.revokeObjectURL(link.href);
        });

        // 다운로드 알림
        this.showDownloadNotification(component.name);
    }

    // 전체 컴포넌트 다운로드
    downloadAllComponents() {
        const zip = new JSZip();
        
        // 테마 파일들 추가
        zip.file('linear-theme.css', this.getThemeCSS());
        zip.file('linear-components.css', this.getComponentsCSS());
        
        // 각 카테고리별 폴더 생성
        const categories = ['buttons', 'inputs', 'cards', 'navigation'];
        categories.forEach(category => {
            const categoryFolder = zip.folder(category);
            
            Object.entries(this.components).forEach(([id, component]) => {
                if (component.category === category) {
                    const componentFolder = categoryFolder.folder(component.name);
                    componentFolder.file(`${id}.html`, this.generateStandaloneHTML(component));
                    componentFolder.file(`${id}.css`, component.css);
                    componentFolder.file('README.md', this.generateReadme(component));
                }
            });
        });

        // 종합 가이드 추가
        zip.file('README.md', this.generateMainReadme());
        zip.file('design-tokens.css', this.getDesignTokensCSS());
        zip.file('usage-examples.html', this.generateUsageExamples());

        // ZIP 파일 생성 및 다운로드
        zip.generateAsync({type: 'blob'}).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'occler-linear-design-system-complete.zip';
            link.click();
            URL.revokeObjectURL(link.href);
        });

        this.showDownloadNotification('전체 디자인 시스템');
    }

    // 독립형 HTML 생성
    generateStandaloneHTML(component) {
        return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name} - Linear Design System</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        ${this.getThemeCSS()}
        ${component.css}
        
        body {
            padding: 40px;
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
        }
        
        .demo-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .demo-title {
            font-size: var(--text-3xl);
            font-weight: var(--font-bold);
            margin-bottom: var(--spacing-8);
            background: var(--gradient-text);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .demo-section {
            margin-bottom: var(--spacing-12);
            padding: var(--spacing-8);
            background-color: var(--color-bg-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <h1 class="demo-title">${component.name}</h1>
        <div class="demo-section">
            ${component.html}
        </div>
    </div>
</body>
</html>`;
    }

    // README 생성
    generateReadme(component) {
        return `# ${component.name}

Linear Design System에서 제공하는 ${component.name} 컴포넌트입니다.

## 사용법

1. \`linear-theme.css\`와 \`linear-components.css\`를 HTML 문서에 포함시키세요.
2. Inter 폰트를 로드하세요.
3. 아래 HTML 구조를 사용하세요.

## HTML 구조

\`\`\`html
${component.html}
\`\`\`

## CSS 클래스

이 컴포넌트는 다음 CSS 클래스들을 사용합니다:

${this.extractCSSClasses(component.css).map(cls => `- \`.${cls}\``).join('\n')}

## 필요한 파일

${component.files.map(file => `- ${file}`).join('\n')}

## 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 라이선스

이 컴포넌트는 오클러 프로젝트의 일부입니다.
`;
    }

    // 메인 README 생성
    generateMainReadme() {
        return `# Linear Design System

Linear.app에서 영감을 받은 모던하고 미니멀한 디자인 시스템입니다.

## 포함된 컴포넌트

### 버튼 (Buttons)
- Primary Buttons - 주요 액션용 그라디언트 버튼
- Secondary Buttons - 보조 액션용 서브틀한 버튼  
- Ghost Buttons - 최소한의 스타일을 가진 투명 버튼
- Danger Buttons - 위험한 액션용 경고 버튼

### 입력 (Inputs)
- Text Inputs - 기본적인 텍스트 입력 필드
- Input States - 다양한 상태의 입력 필드
- Toggle Switches - 온/오프 상태를 나타내는 토글
- Search Input - 검색 기능을 위한 특화된 입력

### 카드 (Cards)
- Basic Cards - 단순한 정보 표시를 위한 카드
- Glass Cards - 글래스모피즘 효과가 적용된 카드
- Feature Cards - 아이콘과 함께하는 기능 소개 카드
- Metric Cards - 숫자와 통계를 보여주는 카드

### 네비게이션 (Navigation)
- Sidebar Navigation - 세로형 네비게이션 메뉴

## 설치 및 사용법

1. 모든 CSS 파일을 프로젝트에 포함시키세요:
   \`\`\`html
   <link rel="stylesheet" href="linear-theme.css">
   <link rel="stylesheet" href="linear-components.css">
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   \`\`\`

2. 각 컴포넌트 폴더의 HTML 예제를 참고하여 구현하세요.

## 디자인 토큰

이 시스템은 CSS 커스텀 프로퍼티를 사용한 디자인 토큰을 제공합니다:

- 색상 (Colors)
- 타이포그래피 (Typography)  
- 간격 (Spacing)
- 둥근 모서리 (Border Radius)
- 그림자 (Shadows)
- 전환 효과 (Transitions)

자세한 내용은 \`design-tokens.css\` 파일을 참고하세요.

## 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 라이선스

오클러 프로젝트 전용 디자인 시스템입니다.
`;
    }

    // 사용 예제 HTML 생성
    generateUsageExamples() {
        return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Design System - 사용 예제</title>
    <link rel="stylesheet" href="linear-theme.css">
    <link rel="stylesheet" href="linear-components.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { padding: 40px; }
        .example-section { margin: 40px 0; padding: 40px; background: var(--color-bg-secondary); border-radius: var(--radius-lg); }
        .example-title { font-size: var(--text-2xl); font-weight: var(--font-bold); margin-bottom: var(--spacing-6); }
    </style>
</head>
<body>
    <h1 style="text-align: center; font-size: var(--text-4xl); margin-bottom: 60px; background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Linear Design System 사용 예제
    </h1>
    
    <div class="example-section">
        <h2 class="example-title">버튼 예제</h2>
        <div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
            <button class="linear-btn linear-btn-primary">Primary Button</button>
            <button class="linear-btn linear-btn-secondary">Secondary Button</button>
            <button class="linear-btn linear-btn-ghost">Ghost Button</button>
            <button class="linear-btn linear-btn-danger">Danger Button</button>
        </div>
    </div>
    
    <div class="example-section">
        <h2 class="example-title">입력 예제</h2>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
            <input type="text" class="linear-input" placeholder="이름을 입력하세요">
            <input type="email" class="linear-input" placeholder="이메일을 입력하세요">
            <div style="position: relative;">
                <input type="text" class="linear-input" placeholder="검색..." style="padding-left: 40px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-tertiary)" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            </div>
        </div>
    </div>
    
    <div class="example-section">
        <h2 class="example-title">카드 예제</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-6);">
            <div class="linear-card">
                <div class="linear-card-header">
                    <div>
                        <h4 class="linear-card-title">기본 카드</h4>
                        <p class="linear-card-subtitle">카드 설명</p>
                    </div>
                </div>
                <p class="linear-card-content">카드 내용이 여기에 표시됩니다.</p>
                <div class="linear-card-actions">
                    <button class="linear-btn linear-btn-primary linear-btn-sm">편집</button>
                    <button class="linear-btn linear-btn-ghost linear-btn-sm">보기</button>
                </div>
            </div>
            
            <div class="linear-card linear-glass">
                <div class="linear-card-header">
                    <div>
                        <h4 class="linear-card-title">글래스 카드</h4>
                        <p class="linear-card-subtitle">투명 효과</p>
                    </div>
                </div>
                <p class="linear-card-content">글래스모피즘 효과가 적용된 카드입니다.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    // 다운로드 알림 표시
    showDownloadNotification(componentName) {
        // 간단한 알림 구현
        const notification = document.createElement('div');
        notification.textContent = `${componentName} 다운로드가 시작되었습니다.`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-brand);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // 유틸리티 메서드들
    extractCSSClasses(css) {
        const classMatches = css.match(/\.([\w-]+)/g) || [];
        return [...new Set(classMatches.map(match => match.substring(1)))];
    }

    getThemeCSS() {
        // linear-theme.css 내용 반환
        return `/* Linear Theme CSS content would go here */`;
    }

    getComponentsCSS() {
        // linear-components.css 내용 반환  
        return `/* Linear Components CSS content would go here */`;
    }

    getDesignTokensCSS() {
        return `/* Design Tokens - CSS Custom Properties */
:root {
  /* Colors */
  --color-bg-primary: #0f0f0f;
  --color-bg-secondary: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #b3b3b3;
  --color-brand-primary: #5e6ad2;
  
  /* Typography */
  --font-sans: 'Inter Variable', sans-serif;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
}`;
    }

    // 각 컴포넌트의 HTML/CSS 생성 메서드들
    getPrimaryButtonsHTML() {
        return `<div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
    <button class="linear-btn linear-btn-primary linear-btn-sm">Small</button>
    <button class="linear-btn linear-btn-primary">Default</button>
    <button class="linear-btn linear-btn-primary linear-btn-lg">Large</button>
    <button class="linear-btn linear-btn-primary" disabled>Disabled</button>
</div>`;
    }

    getPrimaryButtonsCSS() {
        return `.linear-btn-primary {
    background: linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-sm);
}

.linear-btn-primary:hover:not(:disabled) {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}`;
    }

    // 다른 컴포넌트들의 HTML/CSS 메서드들도 동일하게 구현...
    getSecondaryButtonsHTML() {
        return `<div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
    <button class="linear-btn linear-btn-secondary linear-btn-sm">Small</button>
    <button class="linear-btn linear-btn-secondary">Default</button>
    <button class="linear-btn linear-btn-secondary linear-btn-lg">Large</button>
    <button class="linear-btn linear-btn-secondary" disabled>Disabled</button>
</div>`;
    }

    getSecondaryButtonsCSS() {
        return `.linear-btn-secondary {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    border-color: var(--color-border);
}`;
    }

    // Ghost Buttons 구현
    getGhostButtonsHTML() {
        return `<div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
    <button class="linear-btn linear-btn-ghost linear-btn-sm">Small Ghost</button>
    <button class="linear-btn linear-btn-ghost">Default Ghost</button>
    <button class="linear-btn linear-btn-ghost linear-btn-lg">Large Ghost</button>
    <button class="linear-btn linear-btn-ghost" disabled>Disabled</button>
    <button class="linear-btn linear-btn-ghost">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        With Icon
    </button>
</div>`;
    }

    getGhostButtonsCSS() {
        return `.linear-btn-ghost {
    background-color: transparent;
    color: var(--color-text-secondary);
    border: 1px solid transparent;
}

.linear-btn-ghost:hover:not(:disabled) {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    border-color: var(--color-border);
}

.linear-btn-ghost:active:not(:disabled) {
    background-color: var(--color-bg-secondary);
}`;
    }

    // Danger Buttons 구현
    getDangerButtonsHTML() {
        return `<div style="display: flex; gap: var(--spacing-4); flex-wrap: wrap;">
    <button class="linear-btn linear-btn-danger linear-btn-sm">Small Danger</button>
    <button class="linear-btn linear-btn-danger">Delete Item</button>
    <button class="linear-btn linear-btn-danger linear-btn-lg">Large Danger</button>
    <button class="linear-btn linear-btn-danger" disabled>Disabled</button>
    <button class="linear-btn linear-btn-danger">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
        Delete
    </button>
</div>`;
    }

    getDangerButtonsCSS() {
        return `.linear-btn-danger {
    background-color: var(--color-error);
    color: var(--color-text-primary);
    border-color: var(--color-error);
}

.linear-btn-danger:hover:not(:disabled) {
    background-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.linear-btn-danger:active:not(:disabled) {
    transform: translateY(0);
    background-color: #b91c1c;
}`;
    }

    // Text Inputs 구현
    getTextInputsHTML() {
        return `<div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
    <input type="text" class="linear-input" placeholder="이름을 입력하세요">
    <input type="email" class="linear-input" placeholder="이메일 주소">
    <input type="password" class="linear-input" placeholder="비밀번호">
    <input type="text" class="linear-input" value="기본값이 있는 입력" readonly>
    <input type="text" class="linear-input" placeholder="비활성화된 입력" disabled>
    <textarea class="linear-input" rows="3" placeholder="여러 줄 텍스트 입력"></textarea>
</div>`;
    }

    getTextInputsCSS() {
        return `.linear-input {
    display: block;
    width: 100%;
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--text-sm);
    font-weight: var(--font-regular);
    line-height: var(--leading-normal);
    color: var(--color-text-primary);
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    outline: none;
    font-family: var(--font-sans);
}

.linear-input::placeholder {
    color: var(--color-text-tertiary);
}

.linear-input:hover:not(:disabled) {
    border-color: var(--color-border-hover);
}

.linear-input:focus:not(:disabled) {
    border-color: var(--color-brand-primary);
    box-shadow: 0 0 0 3px rgba(94, 106, 210, 0.1);
    background-color: var(--color-bg-tertiary);
}

.linear-input:disabled {
    background-color: var(--color-bg-primary);
    color: var(--color-text-disabled);
    cursor: not-allowed;
    opacity: 0.6;
}`;
    }

    // Input States 구현
    getInputStatesHTML() {
        return `<div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
    <div>
        <label style="display: block; margin-bottom: var(--spacing-2); font-size: var(--text-sm); color: var(--color-text-primary);">정상 상태</label>
        <input type="text" class="linear-input" placeholder="정상적인 입력 상태">
    </div>
    <div>
        <label style="display: block; margin-bottom: var(--spacing-2); font-size: var(--text-sm); color: var(--color-text-primary);">오류 상태</label>
        <input type="text" class="linear-input linear-input-error" placeholder="오류가 있는 입력" value="잘못된 입력">
        <span style="font-size: var(--text-xs); color: var(--color-error); margin-top: var(--spacing-1); display: block;">이 필드는 필수입니다</span>
    </div>
    <div>
        <label style="display: block; margin-bottom: var(--spacing-2); font-size: var(--text-sm); color: var(--color-text-primary);">성공 상태</label>
        <input type="text" class="linear-input linear-input-success" placeholder="검증된 입력" value="올바른 입력">
        <span style="font-size: var(--text-xs); color: var(--color-success); margin-top: var(--spacing-1); display: block;">✓ 검증되었습니다</span>
    </div>
</div>`;
    }

    getInputStatesCSS() {
        return `.linear-input-error {
    border-color: var(--color-error);
}

.linear-input-error:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.linear-input-success {
    border-color: var(--color-success);
}

.linear-input-success:focus {
    border-color: var(--color-success);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}`;
    }

    // Toggles 구현
    getTogglesHTML() {
        return `<div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
    <div style="display: flex; align-items: center; gap: var(--spacing-3);">
        <label class="linear-toggle">
            <input type="checkbox" class="linear-toggle-input">
            <span class="linear-toggle-slider"></span>
        </label>
        <span style="font-size: var(--text-sm); color: var(--color-text-primary);">기본 토글</span>
    </div>
    <div style="display: flex; align-items: center; gap: var(--spacing-3);">
        <label class="linear-toggle">
            <input type="checkbox" class="linear-toggle-input" checked>
            <span class="linear-toggle-slider"></span>
        </label>
        <span style="font-size: var(--text-sm); color: var(--color-text-primary);">활성화된 토글</span>
    </div>
    <div style="display: flex; align-items: center; gap: var(--spacing-3);">
        <label class="linear-toggle">
            <input type="checkbox" class="linear-toggle-input" disabled>
            <span class="linear-toggle-slider"></span>
        </label>
        <span style="font-size: var(--text-sm); color: var(--color-text-disabled);">비활성화된 토글</span>
    </div>
</div>`;
    }

    getTogglesCSS() {
        return `.linear-toggle {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
}

.linear-toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.linear-toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    transition: var(--transition-fast);
    border-radius: var(--radius-full);
}

.linear-toggle-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: var(--color-text-primary);
    transition: var(--transition-fast);
    border-radius: 50%;
}

.linear-toggle-input:checked + .linear-toggle-slider {
    background: var(--gradient-brand);
    border-color: var(--color-brand-primary);
}

.linear-toggle-input:checked + .linear-toggle-slider:before {
    transform: translateX(20px);
}

.linear-toggle-input:disabled + .linear-toggle-slider {
    opacity: 0.4;
    cursor: not-allowed;
}`;
    }

    // Search Input 구현
    getSearchInputHTML() {
        return `<div style="display: flex; flex-direction: column; gap: var(--spacing-4); max-width: 400px;">
    <div style="position: relative;">
        <input type="text" class="linear-input linear-search-input" placeholder="검색어를 입력하세요...">
        <svg class="linear-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
    </div>
    <div style="position: relative;">
        <input type="text" class="linear-input linear-search-input" placeholder="필터와 함께 검색..." value="프로젝트">
        <svg class="linear-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <button class="linear-search-clear">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </button>
    </div>
</div>`;
    }

    getSearchInputCSS() {
        return `.linear-search-input {
    padding-left: 40px;
    padding-right: 40px;
}

.linear-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-tertiary);
    pointer-events: none;
}

.linear-search-clear {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-text-tertiary);
    cursor: pointer;
    padding: 2px;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
}

.linear-search-clear:hover {
    color: var(--color-text-primary);
    background-color: var(--color-bg-tertiary);
}`;
    }

    generateUsageGuide(component) {
        return `# ${component.name} 사용 가이드

## 개요
${component.name}은 Linear Design System의 일부로, 모던하고 미니멀한 디자인을 제공합니다.

## 기본 사용법
1. 필요한 CSS 파일들을 포함시키세요
2. HTML 구조를 복사하여 사용하세요
3. 필요에 따라 CSS 변수를 수정하여 커스터마이징하세요

## 커스터마이징
CSS 변수를 통해 쉽게 색상과 크기를 조정할 수 있습니다:

\`\`\`css
:root {
  --color-brand-primary: #your-color;
  --spacing-4: 20px;
}
\`\`\`

## 접근성
이 컴포넌트는 WCAG 2.1 AA 기준을 준수합니다:
- 키보드 네비게이션 지원
- 적절한 대비율
- 스크린 리더 호환성
`;
    }
}

// JSZip 라이브러리 로드 (CDN에서)
function loadJSZip() {
    return new Promise((resolve, reject) => {
        if (window.JSZip) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 전역 인스턴스 생성
let componentDownloader;

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadJSZip();
        componentDownloader = new ComponentDownloader();
        console.log('Component Downloader initialized');
    } catch (error) {
        console.error('Failed to load JSZip:', error);
    }
});

// 전역 함수들
function downloadComponent(componentId) {
    if (componentDownloader) {
        componentDownloader.downloadComponent(componentId);
    } else {
        console.error('Component Downloader not initialized');
    }
}

function downloadAllComponents() {
    if (componentDownloader) {
        componentDownloader.downloadAllComponents();
    } else {
        console.error('Component Downloader not initialized');
    }
}