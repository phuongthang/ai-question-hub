CREATE TABLE IF NOT EXISTS topic_tags (
    id         BIGSERIAL PRIMARY KEY,
    topic_id   BIGINT NOT NULL,
    tag_id     BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by BIGINT,
    deleted_at TIMESTAMP,
    deleted_by BIGINT,
    UNIQUE (topic_id, tag_id)
);
