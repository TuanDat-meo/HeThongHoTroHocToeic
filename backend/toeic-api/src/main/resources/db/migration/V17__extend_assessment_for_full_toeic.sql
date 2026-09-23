ALTER TABLE assessments
    ADD COLUMN listening_score INT,
    ADD COLUMN reading_score INT;

ALTER TABLE assessment_results
    ADD COLUMN part VARCHAR(30),
    ADD COLUMN avg_response_time_ms INT,
    ADD CONSTRAINT ck_assessment_results_part
        CHECK (part IS NULL OR part IN ('PART_1', 'PART_2', 'PART_3', 'PART_4', 'PART_5', 'PART_6', 'PART_7'));

ALTER TABLE reading_passages
    ADD COLUMN part VARCHAR(30),
    ADD CONSTRAINT ck_reading_passages_part
        CHECK (part IS NULL OR part IN ('PART_6', 'PART_7'));

ALTER TABLE questions
    ADD COLUMN part VARCHAR(30),
    ADD CONSTRAINT ck_questions_part
        CHECK (part IS NULL OR part IN ('PART_1', 'PART_2', 'PART_3', 'PART_4', 'PART_5', 'PART_6', 'PART_7'));