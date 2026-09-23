CREATE TABLE vocabularies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word VARCHAR(255) NOT NULL,
    normalized_word VARCHAR(255) NOT NULL UNIQUE,
    ipa VARCHAR(255),
    part_of_speech VARCHAR(50),
    topic_id UUID,
    difficulty_id UUID,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_vocabularies_topic
        FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE RESTRICT,
    CONSTRAINT fk_vocabularies_difficulty
        FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels (id) ON DELETE RESTRICT,
    CONSTRAINT ck_vocabularies_status
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
);

CREATE TABLE vocabulary_meanings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vocabulary_id UUID NOT NULL,
    meaning VARCHAR(500) NOT NULL,
    normalized_meaning VARCHAR(500) NOT NULL,
    example TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_vocabulary_meanings_vocabulary
        FOREIGN KEY (vocabulary_id) REFERENCES vocabularies (id) ON DELETE RESTRICT,
    CONSTRAINT uq_vocabulary_meanings_normalized
        UNIQUE (vocabulary_id, normalized_meaning)
);

CREATE TABLE vocabulary_meaning_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vocabulary_meaning_id UUID NOT NULL,
    source VARCHAR(255) NOT NULL,
    import_batch_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_meaning_sources_meaning
        FOREIGN KEY (vocabulary_meaning_id) REFERENCES vocabulary_meanings (id) ON DELETE RESTRICT,
    CONSTRAINT fk_meaning_sources_batch
        FOREIGN KEY (import_batch_id) REFERENCES import_batches (id) ON DELETE SET NULL
);

CREATE TABLE vocabulary_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    vocabulary_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL,
    mastery_score FLOAT,
    retention FLOAT,
    review_count INT NOT NULL,
    ease_factor FLOAT,
    interval_days INT,
    next_review_at TIMESTAMP,
    last_reviewed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_vocabulary_progress_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_vocabulary_progress_vocabulary
        FOREIGN KEY (vocabulary_id) REFERENCES vocabularies (id) ON DELETE RESTRICT,
    CONSTRAINT uq_vocabulary_progress_user_vocabulary
        UNIQUE (user_id, vocabulary_id),
    CONSTRAINT ck_vocabulary_progress_status
        CHECK (status IN ('NEW', 'LEARNING', 'MASTERED'))
);