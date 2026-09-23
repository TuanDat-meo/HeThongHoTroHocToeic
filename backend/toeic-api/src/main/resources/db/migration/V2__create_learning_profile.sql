CREATE TABLE learning_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    current_level VARCHAR(50),
    target_score INT,
    learning_mode VARCHAR(30),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_learning_profiles_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT ck_learning_profiles_current_level
        CHECK (current_level IS NULL OR current_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
    CONSTRAINT ck_learning_profiles_learning_mode
        CHECK (learning_mode IS NULL OR learning_mode IN ('GUIDED', 'FREE'))
);

CREATE TABLE goal_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    target_score INT NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_goal_history_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
);