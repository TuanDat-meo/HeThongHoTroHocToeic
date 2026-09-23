CREATE TABLE practice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    mode VARCHAR(30) NOT NULL,
    source VARCHAR(30) NOT NULL,
    assessment_id UUID,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    CONSTRAINT fk_practice_sessions_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_practice_sessions_assessment
        FOREIGN KEY (assessment_id) REFERENCES assessments (id) ON DELETE SET NULL,
    CONSTRAINT ck_practice_sessions_mode
        CHECK (mode IN ('GUIDED', 'FREE')),
    CONSTRAINT ck_practice_sessions_source
        CHECK (source IN ('PRACTICE', 'MOCK', 'DIAGNOSTIC'))
);

CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    question_id UUID NOT NULL,
    session_id UUID NOT NULL,
    selected_option_id UUID,
    is_correct BOOLEAN NOT NULL,
    response_time_ms INT NOT NULL,
    skill_id UUID NOT NULL,
    topic_id UUID,
    difficulty_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_question_attempts_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_question
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_session
        FOREIGN KEY (session_id) REFERENCES practice_sessions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_selected_option
        FOREIGN KEY (selected_option_id, question_id)
        REFERENCES question_options (id, question_id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_topic
        FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_attempts_difficulty
        FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels (id) ON DELETE RESTRICT
);