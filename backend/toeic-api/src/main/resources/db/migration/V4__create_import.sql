CREATE TABLE content_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL,
    reference VARCHAR(1000),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT ck_content_sources_type
        CHECK (type IN ('EXCEL', 'WORD', 'PDF', 'CSV', 'MANUAL', 'AI', 'SYSTEM'))
);

CREATE TABLE import_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL,
    file_name VARCHAR(500),
    total_records INT NOT NULL,
    success_count INT NOT NULL,
    failed_count INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    completed_at TIMESTAMP,
    CONSTRAINT fk_import_batches_source
        FOREIGN KEY (source_id) REFERENCES content_sources (id) ON DELETE RESTRICT
);

CREATE TABLE import_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    import_batch_id UUID NOT NULL,
    raw_data JSONB NOT NULL,
    status VARCHAR(30) NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT fk_import_items_batch
        FOREIGN KEY (import_batch_id) REFERENCES import_batches (id) ON DELETE RESTRICT,
    CONSTRAINT ck_import_items_status
        CHECK (status IN ('SUCCESS', 'FAILED', 'DUPLICATE', 'MERGED'))
);