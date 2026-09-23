CREATE TABLE learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    target_score INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    baseline_assessment_id UUID NOT NULL,
    post_test_assessment_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_learning_paths_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_learning_paths_baseline_assessment
        FOREIGN KEY (baseline_assessment_id) REFERENCES assessments (id) ON DELETE RESTRICT,
    CONSTRAINT fk_learning_paths_post_test_assessment
        FOREIGN KEY (post_test_assessment_id) REFERENCES assessments (id) ON DELETE SET NULL,
    CONSTRAINT ck_learning_paths_status
        CHECK (status IN ('ACTIVE', 'COMPLETED', 'ARCHIVED'))
);

CREATE TABLE learning_path_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_path_id UUID NOT NULL,
    order_index INT NOT NULL,
    skill_id UUID,
    difficulty_id UUID,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_learning_path_items_path
        FOREIGN KEY (learning_path_id) REFERENCES learning_paths (id) ON DELETE RESTRICT,
    CONSTRAINT fk_learning_path_items_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT,
    CONSTRAINT fk_learning_path_items_difficulty
        FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels (id) ON DELETE RESTRICT,
    CONSTRAINT ck_learning_path_items_content_type
        CHECK (content_type IN ('VOCABULARY', 'PASSAGE', 'QUESTION')),
    CONSTRAINT ck_learning_path_items_status
        CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE', 'SKIPPED'))
);