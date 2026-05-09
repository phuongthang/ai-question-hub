CREATE TABLE IF NOT EXISTS questions (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    topic_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    answer VARCHAR(1) NOT NULL,
    status SMALLINT,
    ai_model_id BIGINT,
    prompt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,
    deleted_at TIMESTAMP,
    deleted_by BIGINT
);
