-- ============================================================================
-- 부산 지역 매장/상점 정보 관리 데이터베이스 스키마
-- PostgreSQL 15+ 호환 버전
-- 
-- 프로젝트: 오클러 - 부산 지역 매장 정보 시스템
-- 설계자: 강디비(database-optimizer)
-- 생성일: 2025-07-30
-- 버전: 1.0
-- ============================================================================

-- 데이터베이스 생성 (필요시)
-- CREATE DATABASE busan_stores_db ENCODING 'UTF8' LC_COLLATE='ko_KR.UTF-8' LC_CTYPE='ko_KR.UTF-8';

-- 확장 모듈 설치
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- UUID 생성용
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- 유사도 검색용
CREATE EXTENSION IF NOT EXISTS "unaccent";       -- 텍스트 정규화용

-- ============================================================================
-- 1. 기본 참조 테이블 (마스터 데이터)
-- ============================================================================

-- 지역 정보 테이블 (핫플레이스)
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_hotplace BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 카테고리 대분류 테이블
CREATE TABLE category_major (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 카테고리 중분류 테이블
CREATE TABLE category_minor (
    id SERIAL PRIMARY KEY,
    major_id INTEGER NOT NULL REFERENCES category_major(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(major_id, code)
);

-- ============================================================================
-- 2. 매장 정보 메인 테이블
-- ============================================================================

-- 매장 정보 테이블
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    store_key VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    region_id INTEGER REFERENCES regions(id),
    category_major_id INTEGER REFERENCES category_major(id),
    category_minor_id INTEGER REFERENCES category_minor(id),
    
    -- 주소 정보
    address_full TEXT,
    address_city VARCHAR(100),
    address_district VARCHAR(100),
    address_detail VARCHAR(300),
    
    -- 운영 정보
    open_date DATE,
    close_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'temporary_closed', 'pending', 'unknown')),
    
    -- 지도 정보
    map_link TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- 검색 최적화용 (전문 검색)
    search_vector tsvector,
    
    -- 메타 정보
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 제약 조건
    CONSTRAINT valid_coordinates CHECK (
        (latitude IS NULL AND longitude IS NULL) OR 
        (latitude IS NOT NULL AND longitude IS NOT NULL AND 
         latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
    ),
    CONSTRAINT valid_operation_period CHECK (close_date IS NULL OR open_date <= close_date)
);

-- ============================================================================
-- 3. 키워드 관리 테이블 (다대다 관계)
-- ============================================================================

-- 키워드 마스터 테이블
CREATE TABLE keywords (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    usage_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,    -- 검증된 키워드 여부
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 매장-키워드 연결 테이블
CREATE TABLE store_keywords (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    keyword_id INTEGER NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
    keyword_type VARCHAR(20) DEFAULT 'primary' CHECK (keyword_type IN ('primary', 'secondary', 'tertiary')),
    confidence_score DECIMAL(3,2) DEFAULT 1.0,    -- 키워드 신뢰도 (0.0~1.0)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(store_id, keyword_id)
);

-- ============================================================================
-- 4. 매장 확장 정보 테이블
-- ============================================================================

-- 매장 추가 속성 테이블 (EAV 패턴)
CREATE TABLE store_attributes (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    attribute_name VARCHAR(100) NOT NULL,
    attribute_value TEXT,
    attribute_type VARCHAR(20) DEFAULT 'text' CHECK (attribute_type IN ('text', 'number', 'boolean', 'date', 'url', 'json')),
    is_public BOOLEAN DEFAULT true,       -- 공개 여부
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(store_id, attribute_name)
);

-- 매장 미디어 파일 테이블
CREATE TABLE store_media (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('thumbnail', 'photo', 'video', 'document')),
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_size INTEGER,
    file_extension VARCHAR(10),
    alt_text VARCHAR(500),              -- 접근성을 위한 대체 텍스트
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. 운영 및 로그 테이블
-- ============================================================================

-- 매장 상태 변경 이력
CREATE TABLE store_status_history (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    reason TEXT,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 데이터 변경 로그 (감사용)
CREATE TABLE data_change_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id INTEGER NOT NULL,
    operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. 인덱스 생성 (성능 최적화)
-- ============================================================================

-- 매장 검색 최적화 인덱스
CREATE INDEX idx_stores_name_gin ON stores USING gin(to_tsvector('korean', name));
CREATE INDEX idx_stores_search_vector ON stores USING gin(search_vector);
CREATE INDEX idx_stores_region_category ON stores(region_id, category_major_id, category_minor_id);
CREATE INDEX idx_stores_status_open ON stores(status, open_date) WHERE status IN ('active', 'pending');
CREATE INDEX idx_stores_coordinates ON stores(latitude, longitude) WHERE latitude IS NOT NULL;

-- 주소 검색 인덱스
CREATE INDEX idx_stores_address_city ON stores(address_city);
CREATE INDEX idx_stores_address_district ON stores(address_district);
CREATE INDEX idx_stores_address_full_gin ON stores USING gin(to_tsvector('korean', address_full));

-- 키워드 검색 인덱스
CREATE INDEX idx_keywords_name_gin ON keywords USING gin(to_tsvector('korean', name));
CREATE INDEX idx_keywords_category ON keywords(category, is_verified);
CREATE INDEX idx_store_keywords_store_type ON store_keywords(store_id, keyword_type);
CREATE INDEX idx_store_keywords_keyword ON store_keywords(keyword_id);
CREATE INDEX idx_store_keywords_confidence ON store_keywords(confidence_score DESC);

-- 카테고리 인덱스
CREATE INDEX idx_category_minor_major ON category_minor(major_id, is_active);
CREATE INDEX idx_category_major_active ON category_major(is_active, sort_order);

-- 매장 속성 검색 인덱스
CREATE INDEX idx_store_attributes_name_value ON store_attributes(attribute_name, attribute_value);
CREATE INDEX idx_store_attributes_store_public ON store_attributes(store_id, is_public);

-- 미디어 파일 인덱스
CREATE INDEX idx_store_media_store_type ON store_media(store_id, media_type, is_active);
CREATE INDEX idx_store_media_primary ON store_media(store_id, is_primary) WHERE is_primary = true;

-- 복합 검색을 위한 인덱스
CREATE INDEX idx_stores_search_composite ON stores(region_id, category_major_id, status) 
WHERE status IN ('active', 'pending');

-- 날짜 기반 인덱스
CREATE INDEX idx_stores_open_date ON stores(open_date);
CREATE INDEX idx_stores_created_at ON stores(created_at);

-- ============================================================================
-- 7. 뷰(View) 생성 - 조회 성능 최적화
-- ============================================================================

-- 매장 상세 정보 통합 뷰
CREATE VIEW v_store_details AS
SELECT 
    s.id,
    s.store_key,
    s.name,
    r.name as region_name,
    cm.name as category_major_name,
    cn.name as category_minor_name,
    s.address_full,
    s.address_city,
    s.address_district,
    s.address_detail,
    s.open_date,
    s.close_date,
    s.status,
    s.map_link,
    s.latitude,
    s.longitude,
    s.created_at,
    s.updated_at
FROM stores s
LEFT JOIN regions r ON s.region_id = r.id
LEFT JOIN category_major cm ON s.category_major_id = cm.id
LEFT JOIN category_minor cn ON s.category_minor_id = cn.id;

-- 매장별 키워드 집계 뷰
CREATE VIEW v_store_keywords AS
SELECT 
    s.id as store_id,
    s.name as store_name,
    string_agg(k.name, ', ' ORDER BY sk.keyword_type, sk.confidence_score DESC, k.name) as keywords,
    COUNT(k.id) as keyword_count,
    AVG(sk.confidence_score) as avg_confidence
FROM stores s
LEFT JOIN store_keywords sk ON s.id = sk.store_id
LEFT JOIN keywords k ON sk.keyword_id = k.id
GROUP BY s.id, s.name;

-- 카테고리별 매장 통계 뷰
CREATE VIEW v_category_stats AS
SELECT 
    cm.name as major_category,
    cn.name as minor_category,
    COUNT(s.id) as total_stores,
    COUNT(CASE WHEN s.status = 'active' THEN 1 END) as active_stores,
    COUNT(CASE WHEN s.status = 'closed' THEN 1 END) as closed_stores,
    COUNT(CASE WHEN s.status = 'temporary_closed' THEN 1 END) as temp_closed_stores,
    ROUND(COUNT(CASE WHEN s.status = 'active' THEN 1 END) * 100.0 / NULLIF(COUNT(s.id), 0), 2) as active_rate
FROM category_major cm
LEFT JOIN category_minor cn ON cm.id = cn.major_id
LEFT JOIN stores s ON cn.id = s.category_minor_id
GROUP BY cm.id, cm.name, cn.id, cn.name
ORDER BY cm.sort_order, cn.sort_order;

-- 지역별 매장 현황 뷰
CREATE VIEW v_region_stats AS
SELECT 
    r.name as region_name,
    COUNT(s.id) as total_stores,
    COUNT(CASE WHEN s.status = 'active' THEN 1 END) as active_stores,
    ROUND(AVG(CASE WHEN s.latitude IS NOT NULL THEN 1.0 ELSE 0.0 END), 3) as location_coverage
FROM regions r
LEFT JOIN stores s ON r.id = s.region_id
GROUP BY r.id, r.name
ORDER BY total_stores DESC;

-- ============================================================================
-- 8. 트리거 및 함수 - 데이터 무결성 보장
-- ============================================================================

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 매장 테이블 업데이트 트리거
CREATE TRIGGER update_stores_updated_at 
    BEFORE UPDATE ON stores 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 매장 속성 테이블 업데이트 트리거
CREATE TRIGGER update_store_attributes_updated_at 
    BEFORE UPDATE ON store_attributes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 키워드 사용 횟수 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_keyword_usage_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE keywords SET usage_count = usage_count + 1 WHERE id = NEW.keyword_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE keywords SET usage_count = GREATEST(usage_count - 1, 0) WHERE id = OLD.keyword_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- 키워드 사용 횟수 트리거
CREATE TRIGGER trigger_keyword_usage_count
    AFTER INSERT OR DELETE ON store_keywords
    FOR EACH ROW
    EXECUTE FUNCTION update_keyword_usage_count();

-- 검색 벡터 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('korean', 
        COALESCE(NEW.name, '') || ' ' ||
        COALESCE(NEW.address_full, '') || ' ' ||
        COALESCE(NEW.address_city, '') || ' ' ||
        COALESCE(NEW.address_district, '')
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 검색 벡터 업데이트 트리거
CREATE TRIGGER trigger_stores_search_vector
    BEFORE INSERT OR UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION update_search_vector();

-- 매장 상태 변경 이력 기록 함수
CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO store_status_history (store_id, old_status, new_status, changed_at)
        VALUES (NEW.id, OLD.status, NEW.status, CURRENT_TIMESTAMP);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 매장 상태 변경 이력 트리거
CREATE TRIGGER trigger_store_status_history
    AFTER UPDATE ON stores
    FOR EACH ROW
    EXECUTE FUNCTION log_status_change();

-- ============================================================================
-- 9. 기본 데이터 삽입
-- ============================================================================

-- 지역 데이터 삽입
INSERT INTO regions (name, description, sort_order) VALUES
('서면', '부산의 중심 상업지구', 1),
('남포', '전통적인 상업 중심지', 2),
('경성', '경성대학교 인근 상권', 3),
('전포', '카페거리로 유명한 지역', 4),
('동래', '동래구 중심가', 5),
('연산', '연제구 연산동 상권', 6),
('해운대', '부산의 대표적인 해변 관광지', 7),
('광안리', '야경이 아름다운 해변가', 8),
('송정', '서핑과 카페로 유명한 지역', 9),
('기타', '기타 지역', 99);

-- 카테고리 대분류 데이터
INSERT INTO category_major (code, name, sort_order) VALUES
('FOOD', '식사술', 1),
('DESSERT', '디저트', 2),
('BEAUTY', '뷰티.관리', 3),
('RETAIL', '도소매', 4),
('ENTERTAINMENT', '놀이', 5),
('HEALTH', '헬스.힐링', 6),
('EDUCATION', '학원', 7),
('MEDICAL', '병원', 8),
('OTHER', '그밖에', 9);

-- 카테고리 중분류 데이터 (식사술)
INSERT INTO category_minor (major_id, code, name, sort_order) 
SELECT cm.id, 'KOREAN', '한식.분식', 1 FROM category_major cm WHERE cm.code = 'FOOD'
UNION ALL
SELECT cm.id, 'WESTERN', '양식', 2 FROM category_major cm WHERE cm.code = 'FOOD'
UNION ALL
SELECT cm.id, 'JAPANESE', '일식', 3 FROM category_major cm WHERE cm.code = 'FOOD'
UNION ALL
SELECT cm.id, 'CHINESE', '중식', 4 FROM category_major cm WHERE cm.code = 'FOOD'
UNION ALL
SELECT cm.id, 'FUSION', '퓨전요리', 5 FROM category_major cm WHERE cm.code = 'FOOD'
UNION ALL
SELECT cm.id, 'DRINK', '술집.바', 6 FROM category_major cm WHERE cm.code = 'FOOD';

-- 카테고리 중분류 데이터 (디저트)
INSERT INTO category_minor (major_id, code, name, sort_order) 
SELECT cm.id, 'CAFE', '카페.디저트', 1 FROM category_major cm WHERE cm.code = 'DESSERT'
UNION ALL
SELECT cm.id, 'BAKERY', '베이커리', 2 FROM category_major cm WHERE cm.code = 'DESSERT'
UNION ALL
SELECT cm.id, 'ICE_CREAM', '아이스크림', 3 FROM category_major cm WHERE cm.code = 'DESSERT';

-- 기본 키워드 데이터
INSERT INTO keywords (name, category, is_verified) VALUES
('커피전문점', 'dessert', true),
('한식', 'food', true),
('양식', 'food', true),
('일식', 'food', true),
('중식', 'food', true),
('술집', 'food', true),
('카페', 'dessert', true),
('헤어샵', 'beauty', true),
('네일샵', 'beauty', true),
('편의점', 'retail', true);

-- ============================================================================
-- 10. 성능 최적화 설정
-- ============================================================================

-- 테이블별 통계 정보 자동 업데이트 설정
ALTER TABLE stores SET (autovacuum_analyze_scale_factor = 0.02);
ALTER TABLE store_keywords SET (autovacuum_analyze_scale_factor = 0.05);
ALTER TABLE keywords SET (autovacuum_analyze_scale_factor = 0.1);

-- 풀텍스트 검색을 위한 한국어 설정 (시스템에 따라 조정 필요)
-- CREATE TEXT SEARCH CONFIGURATION korean (COPY = pg_catalog.simple);

-- ============================================================================
-- 11. 권한 설정 (보안)
-- ============================================================================

-- 애플리케이션 사용자 생성 (예시)
-- CREATE USER app_user WITH PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE busan_stores_db TO app_user;
-- GRANT USAGE ON SCHEMA public TO app_user;
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- 읽기 전용 사용자 생성 (예시)
-- CREATE USER readonly_user WITH PASSWORD 'readonly_password';
-- GRANT CONNECT ON DATABASE busan_stores_db TO readonly_user;
-- GRANT USAGE ON SCHEMA public TO readonly_user;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- ============================================================================
-- 12. 유지보수 및 모니터링을 위한 쿼리
-- ============================================================================

-- 테이블 크기 확인
-- SELECT 
--     schemaname,
--     tablename,
--     attname,
--     n_distinct,
--     correlation
-- FROM pg_stats 
-- WHERE schemaname = 'public' AND tablename IN ('stores', 'keywords', 'store_keywords');

-- 인덱스 사용률 확인
-- SELECT 
--     schemaname,
--     tablename,
--     indexname,
--     idx_scan,
--     idx_tup_read,
--     idx_tup_fetch
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public';

-- ============================================================================
-- 스키마 생성 완료
-- ============================================================================

-- 스키마 버전 정보 테이블
CREATE TABLE schema_version (
    version VARCHAR(10) PRIMARY KEY,
    description TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_version (version, description) VALUES 
('1.0', '초기 스키마 생성 - 부산 매장 정보 관리 시스템');

-- 스키마 생성 완료 메시지
SELECT 'Database schema created successfully! Version 1.0' as status;