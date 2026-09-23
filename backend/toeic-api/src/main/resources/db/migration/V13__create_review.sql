CREATE TABLE wrong_answer_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    question_attempt_id UUID NOT NULL,
    note TEXT,
    resolved BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_wrong_answer_notes_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_wrong_answer_notes_attempt
        FOREIGN KEY (question_attempt_id) REFERENCES question_attempts (id) ON DELETE RESTRICT
);

CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_bookmarks_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT uq_bookmarks_user_content
        UNIQUE (user_id, content_type, content_id),
    CONSTRAINT ck_bookmarks_content_type
        CHECK (content_type IN ('VOCABULARY', 'QUESTION', 'PASSAGE'))
);