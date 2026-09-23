CREATE TABLE reading_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    topic_id UUID,
    difficulty_id UUID,
    source VARCHAR(255),
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_reading_passages_topic
        FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE RESTRICT,
    CONSTRAINT fk_reading_passages_difficulty
        FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels (id) ON DELETE RESTRICT,
    CONSTRAINT ck_reading_passages_status
        CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passage_id UUID,
    question_text TEXT NOT NULL,
    skill_id UUID NOT NULL,
    topic_id UUID,
    difficulty_id UUID,
    type VARCHAR(50) NOT NULL,
    question_hash VARCHAR(255),
    status VARCHAR(30) NOT NULL,
    source VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_questions_passage
        FOREIGN KEY (passage_id) REFERENCES reading_passages (id) ON DELETE RESTRICT,
    CONSTRAINT fk_questions_skill
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE RESTRICT,
    CONSTRAINT fk_questions_topic
        FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE RESTRICT,
    CONSTRAINT fk_questions_difficulty
        FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels (id) ON DELETE RESTRICT,
    CONSTRAINT ck_questions_source
        CHECK (source IN ('MANUAL', 'IMPORT', 'AI')),
    CONSTRAINT ck_questions_status
        CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
);

CREATE INDEX idx_questions_question_hash ON questions (question_hash);

CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    order_index INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_question_options_question
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT,
    CONSTRAINT uq_question_options_question_order
        UNIQUE (question_id, order_index),
    CONSTRAINT uq_question_options_id_question
        UNIQUE (id, question_id)
);

CREATE UNIQUE INDEX uq_question_options_one_correct
    ON question_options (question_id)
    WHERE is_correct = TRUE;

CREATE TABLE question_vocabularies (
    question_id UUID NOT NULL,
    vocabulary_id UUID NOT NULL,
    CONSTRAINT pk_question_vocabularies PRIMARY KEY (question_id, vocabulary_id),
    CONSTRAINT fk_question_vocabularies_question
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_question_vocabularies_vocabulary
        FOREIGN KEY (vocabulary_id) REFERENCES vocabularies (id) ON DELETE RESTRICT
);