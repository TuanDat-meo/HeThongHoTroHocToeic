CREATE TABLE audio_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID,
    passage_id UUID,
    url VARCHAR(1000) NOT NULL,
    duration_seconds INT,
    transcript_text TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_audio_files_question
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_audio_files_passage
        FOREIGN KEY (passage_id) REFERENCES reading_passages (id) ON DELETE RESTRICT,
    CONSTRAINT ck_audio_files_exactly_one_owner
        CHECK ((question_id IS NOT NULL AND passage_id IS NULL)
            OR (question_id IS NULL AND passage_id IS NOT NULL))
);