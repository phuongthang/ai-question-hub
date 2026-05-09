CREATE TABLE IF NOT EXISTS project_topic_questions (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    project_topic_id BIGINT NOT NULL,
    question_id BIGINT,
    order_index INT DEFAULT 1,
    status SMALLINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,
    deleted_at TIMESTAMP,
    deleted_by BIGINT
);
