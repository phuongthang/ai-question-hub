-- Topic Activity Log Action Types (action_type SMALLINT):
--   1  = TOPIC_CREATED              - Tạo topic mới
--   2  = TOPIC_UPDATED              - Cập nhật thông tin topic (title, tags, ...)
--   3  = TOPIC_DELETED              - Xóa topic
--   4  = QUESTION_GENERATED         - Sinh câu hỏi bằng AI
--   5  = QUESTION_ADDED             - Thêm câu hỏi thủ công
--   6  = QUESTION_UPDATED           - Cập nhật câu hỏi
--   7  = QUESTION_DELETED           - Xóa câu hỏi
--   8  = TOPIC_ADDED_TO_PROJECT     - Thêm topic vào dự án
--   9  = TOPIC_REMOVED_FROM_PROJECT - Gỡ topic khỏi dự án
--  10  = TAG_ADDED                  - Thêm tag vào topic
--  11  = TAG_REMOVED                - Gỡ tag khỏi topic

CREATE TABLE IF NOT EXISTS topic_activity_logs (
    id              BIGSERIAL PRIMARY KEY,
    topic_id        BIGINT    NOT NULL,
    action_type     SMALLINT  NOT NULL,
    actor_id        BIGINT    NOT NULL,
    project_id      BIGINT,
    question_id     BIGINT,
    tag_id          BIGINT,
    detail          JSONB,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by      BIGINT,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by      BIGINT,
    deleted_at      TIMESTAMP,
    deleted_by      BIGINT
);

CREATE INDEX idx_tal_topic_id    ON topic_activity_logs (topic_id);
CREATE INDEX idx_tal_actor_id    ON topic_activity_logs (actor_id);
CREATE INDEX idx_tal_action_type ON topic_activity_logs (action_type);
CREATE INDEX idx_tal_created_at  ON topic_activity_logs (created_at DESC);
