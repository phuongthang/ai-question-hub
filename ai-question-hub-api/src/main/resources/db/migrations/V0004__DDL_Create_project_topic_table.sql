CREATE TABLE IF NOT EXISTS project_topics (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    project_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    status SMALLINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,
    deleted_at TIMESTAMP,
    deleted_by BIGINT
);
