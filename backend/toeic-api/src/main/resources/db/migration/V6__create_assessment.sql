CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type VARCHAR(30) NOT NULL,
    total_score INT,
    duration_seconds INT,
    taken_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_assessments_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT ck_assessments_type
        CHECK (type IN ('BASELINE', 'PROGRESS', 'POST_TEST', 'DIAGNOSTIC', 'FINAL', 'MOCK'))
);

CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL,
    skill_id UUID NOT NULL,
    correct INT NOT NULL,
    total INT NOT NULL,
    accuracy FLOAT NOT NULL,
    CONSTRAINT fk_assessment_results_assessment
        FOREIGN KEY (assessment_id) REFERENCES assessments (id) ON DELETE RESTRICT,
    CONSTRAINT fk_assessment_results_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT
);