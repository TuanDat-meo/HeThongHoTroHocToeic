CREATE TABLE skill_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    skill_id UUID NOT NULL,
    mastery_score FLOAT,
    accuracy FLOAT,
    avg_response_time_ms INT,
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_skill_profiles_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_skill_profiles_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT,
    CONSTRAINT uq_skill_profiles_user_skill
        UNIQUE (user_id, skill_id)
);