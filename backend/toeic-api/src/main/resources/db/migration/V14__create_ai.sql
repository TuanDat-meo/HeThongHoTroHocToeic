CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    type VARCHAR(50) NOT NULL,
    prompt TEXT NOT NULL,
    response TEXT,
    model VARCHAR(100),
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    completed_at TIMESTAMP,
    CONSTRAINT fk_ai_interactions_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT ck_ai_interactions_type
        CHECK (type IN ('EXPLAIN_ANSWER', 'ANALYZE_MISTAKE', 'EXPLAIN_VOCAB', 'GENERATE_QUESTION', 'GENERATE_READING', 'GENERATE_EXERCISE')),
    CONSTRAINT ck_ai_interactions_status
        CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED'))
);

CREATE TABLE ai_generated_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ai_interaction_id UUID NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    payload_json JSONB NOT NULL,
    validation_status VARCHAR(30) NOT NULL,
    reviewed_by UUID,
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_ai_generated_content_interaction
        FOREIGN KEY (ai_interaction_id) REFERENCES ai_interactions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_ai_generated_content_reviewer
        FOREIGN KEY (reviewed_by) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT ck_ai_generated_content_type
        CHECK (content_type IN ('QUESTION', 'READING', 'EXERCISE')),
    CONSTRAINT ck_ai_generated_content_validation
        CHECK (validation_status IN ('PENDING', 'PASSED', 'REJECTED'))
);