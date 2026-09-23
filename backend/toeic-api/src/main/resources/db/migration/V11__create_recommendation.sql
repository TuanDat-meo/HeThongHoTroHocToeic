CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    based_on VARCHAR(50) NOT NULL,
    generated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_recommendations_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT ck_recommendations_based_on
        CHECK (based_on IN ('WEAKNESS', 'GOAL', 'KNOWLEDGE_STATE', 'RECENT_PERFORMANCE'))
);

CREATE TABLE recommendation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_id UUID NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    score FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_recommendation_items_recommendation
        FOREIGN KEY (recommendation_id) REFERENCES recommendations (id) ON DELETE RESTRICT,
    CONSTRAINT ck_recommendation_items_content_type
        CHECK (content_type IN ('VOCABULARY', 'PASSAGE', 'QUESTION'))
);