CREATE TABLE knowledge_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    skill_id UUID NOT NULL,
    p_know FLOAT NOT NULL,
    p_learn FLOAT NOT NULL,
    p_guess FLOAT NOT NULL,
    p_slip FLOAT NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_knowledge_states_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_knowledge_states_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT,
    CONSTRAINT uq_knowledge_states_user_skill
        UNIQUE (user_id, skill_id)
);