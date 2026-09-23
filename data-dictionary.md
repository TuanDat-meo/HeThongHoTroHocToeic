# Data Dictionary — TOEIC-AI-Learning

> Tài liệu Data Dictionary chính thức cho hệ thống **Hệ thống hỗ trợ học tập cá nhân hóa bằng AI cho TOEIC**.
>
> **Database:** PostgreSQL  
> **Migration:** Flyway  
> **Kiến trúc:** Modular Monolith + Feature-based  
> **MVP:** Vocabulary + Reading + Personalization  
> **Phase 2 của database:** Hoàn thiện TOEIC Listening & Reading
>
> Tài liệu này là bản chốt dùng làm cơ sở cho **ERD, Flyway Migration, Entity/Model và Backend Service**.

---

# 1. Nguyên tắc thiết kế Database

## 1.1. Nguyên tắc chung

Database được thiết kế để lưu:

- Dữ liệu người dùng.
- Hồ sơ học tập.
- Ngân hàng Vocabulary.
- Ngân hàng Reading và Question.
- Lịch sử luyện tập.
- Kết quả từng câu.
- Assessment.
- Trạng thái kiến thức của người học.
- Recommendation.
- Learning Path.
- AI interaction và AI-generated content.
- Import và kiểm soát chất lượng dữ liệu.
- Review, Bookmark và Notification.
- Audit dữ liệu quản trị.
- Audio và dữ liệu Listening cho Phase 2 của database.
- Vector embedding cho RAG.

Các thuật toán như:

- Accuracy.
- Error Rate.
- Weakness Score.
- Weighted Weakness Score.
- Adaptive Difficulty.
- Recommendation Score.

được xử lý chủ yếu ở **Backend Service / Algorithm Layer**, không tạo một bảng riêng cho từng chỉ số nếu có thể tính lại từ dữ liệu lịch sử.

Khi cần bổ sung một giá trị enum ở Phase 2 của database, migration Phase 2
của database phải dùng
`DROP CONSTRAINT` và `ADD CONSTRAINT` trên CHECK tương ứng. Không sửa lại
migration MVP/Phase 1 đã chạy.

---

## 1.2. UUID

Các khóa chính sử dụng:

```text
UUID
```

Mọi khóa chính UUID dùng `DEFAULT gen_random_uuid()`. Hàm này có sẵn từ
PostgreSQL 13; PostgreSQL 13 là phiên bản tối thiểu của hệ thống và không cần
extension `pgcrypto` cho UUID default.

để tạo ID duy nhất và thuận tiện khi mở rộng hệ thống.

---

## 1.3. Timestamp

Các trường thời gian sử dụng:

```text
TIMESTAMP
```

Có thể chuẩn hóa về UTC ở tầng Backend.

---

## 1.4. Soft Delete / Archive

Đối với các nội dung đã được sử dụng trong lịch sử học tập, ưu tiên:

```text
status = ARCHIVED
```

thay vì xóa cứng.

Mục tiêu là không làm mất lịch sử `question_attempts`, `assessments`, Recommendation hoặc Learning Path.

---

## 1.5. Polymorphic Content Reference

Một số bảng sử dụng:

```text
content_type
content_id
```

Ví dụ:

```text
content_type = QUESTION
content_id   = UUID
```

Mô hình này được dùng cho:

- `learning_path_items`
- `recommendation_items`
- `bookmarks`
- `content_embeddings`

Do PostgreSQL không thể tạo một Foreign Key thông thường từ `content_id` tới nhiều bảng khác nhau, tính toàn vẹn của quan hệ này phải được kiểm soát ở **Service/Application Layer**.

---

## 1.6. ON DELETE Policy

Mọi Foreign Key trong tài liệu này phải khai báo tường minh `ON DELETE`; không
dùng hành vi mặc định của PostgreSQL. Chính sách được ghi ngay tại dòng FK
của từng bảng và được dùng trực tiếp khi viết Flyway migration.

- `RESTRICT`: dùng cho dữ liệu lịch sử, snapshot, taxonomy và nội dung đã có
       thể được tham chiếu; không cho phép xóa bản ghi cha khi còn bản ghi con.
- `SET NULL`: chỉ dùng cho quan hệ tùy chọn mà việc giữ bản ghi con quan trọng
       hơn việc giữ liên kết tới bản ghi cha; cột FK tương ứng bắt buộc nullable.
- `CASCADE`: chỉ dùng cho bản ghi phụ thuộc thuần túy, không phải lịch sử học
       tập. Không dùng CASCADE cho `question_attempts`, `assessments`,
       `practice_sessions`, `knowledge_states`, `recommendations` hoặc
       `learning_paths`.
- `NO ACTION`: chỉ dùng khi được ghi rõ tại dòng FK. Các FK hiện tại được
       chọn `RESTRICT` hoặc `SET NULL` để chính sách xóa dễ kiểm tra hơn.

`phanTichDB.md` là tài liệu phân tích tham khảo. **`data-dictionary.md` là
nguồn chính thức duy nhất** cho tên bảng, tên cột, kiểu dữ liệu, ràng buộc,
Foreign Key và Flyway migration.

# 2. Quy ước trạng thái

## 2.1. User Status

```text
ACTIVE
DISABLED
```

## 2.2. User Role

```text
ADMIN
STUDENT
```

## 2.3. Learning Mode

```text
GUIDED
FREE
```

## 2.4. Content Status

Các bảng content có thể sử dụng:

```text
DRAFT
PENDING_REVIEW
PUBLISHED
ARCHIVED
REJECTED
```

Không bắt buộc mọi bảng phải sử dụng toàn bộ các trạng thái trên; trạng thái thực tế phụ thuộc nghiệp vụ của từng bảng.

---

# 3. Nhóm User & Learning Profile

## 3.1. `users`

Lưu tài khoản người dùng và thông tin cơ bản.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | ID người dùng |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email đăng nhập |
| password_hash | VARCHAR(255) | NOT NULL | Mật khẩu đã hash |
| full_name | VARCHAR(255) | NOT NULL | Họ tên |
| role | VARCHAR(30) | NOT NULL | `ADMIN`, `STUDENT` |
| status | VARCHAR(30) | NOT NULL | `ACTIVE`, `DISABLED` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | Thời gian tạo |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | Thời gian cập nhật |

```sql
CHECK (role IN ('ADMIN', 'STUDENT'))
CHECK (status IN ('ACTIVE', 'DISABLED'))
```

### Chức năng

- Đăng ký.
- Đăng nhập.
- JWT Authentication.
- Phân quyền.
- Quản lý trạng thái tài khoản.

---

## 3.2. `learning_profiles`

Lưu hồ sơ học tập của từng người dùng.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, UNIQUE, ON DELETE RESTRICT | Quan hệ 1–1 |
| current_level | VARCHAR(50) | NULLABLE | `BEGINNER`, `INTERMEDIATE`, `ADVANCED` |
| target_score | INT | | Điểm mục tiêu |
| learning_mode | VARCHAR(30) | NULLABLE | `GUIDED`, `FREE` |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Ví dụ

```text
current_level = INTERMEDIATE
target_score  = 650
learning_mode = GUIDED
```

```sql
CHECK (current_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED'))
CHECK (learning_mode IN ('GUIDED', 'FREE'))
```

---

## 3.3. `goal_history`

Lưu lịch sử thay đổi mục tiêu điểm.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| target_score | INT | NOT NULL | Mục tiêu tại thời điểm đó |
| changed_at | TIMESTAMP | NOT NULL, DEFAULT now() | Thời điểm thay đổi |

### Mức triển khai

Bảng được tạo trong MVP/Phase 1; quản lý mục tiêu đầy đủ được hoàn thiện ở
roadmap Phase 15.

---

# 4. Nhóm Taxonomy / Danh mục

## 4.1. `skills`

Danh mục kỹ năng học tập.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| code | VARCHAR(100) | UNIQUE, NOT NULL | Ví dụ `INFERENCE` |
| name | VARCHAR(255) | NOT NULL | Tên kỹ năng |
| category | VARCHAR(30) | NOT NULL | `VOCAB`, `READING`, `LISTENING` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (category IN ('VOCAB', 'READING', 'LISTENING'))
```

### Ví dụ

```text
INFERENCE
MAIN_IDEA
DETAIL
VOCABULARY_IN_CONTEXT
GRAMMAR
```

---

## 4.2. `topics`

Danh mục chủ đề.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| code | VARCHAR(100) | UNIQUE, NOT NULL | |
| name | VARCHAR(255) | NOT NULL | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Ví dụ

```text
BUSINESS
TRAVEL
OFFICE
FINANCE
SHOPPING
```

---

## 4.3. `difficulty_levels`

Danh mục độ khó.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| code | VARCHAR(30) | UNIQUE, NOT NULL | `EASY`, `MEDIUM`, `HARD` |
| order_index | INT | NOT NULL | Dùng để so sánh độ khó |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

`order_index` phục vụ Adaptive Difficulty.

Ví dụ:

```text
EASY   → 1
MEDIUM → 2
HARD   → 3
```

```sql
CHECK (code IN ('EASY', 'MEDIUM', 'HARD'))
```

---

# 5. Nhóm Vocabulary

## 5.1. `vocabularies`

Lưu một Vocabulary duy nhất.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| word | VARCHAR(255) | NOT NULL | Dạng hiển thị |
| normalized_word | VARCHAR(255) | UNIQUE, NOT NULL | Dùng chống trùng |
| ipa | VARCHAR(255) | NULLABLE | Phiên âm |
| part_of_speech | VARCHAR(50) | NULLABLE | Từ loại |
| topic_id | UUID | FK → topics.id, NULLABLE, ON DELETE RESTRICT | Chủ đề |
| difficulty_id | UUID | FK → difficulty_levels.id, NULLABLE, ON DELETE RESTRICT | Độ khó |
| status | VARCHAR(30) | NOT NULL | `DRAFT`, `PUBLISHED`, `ARCHIVED`, `REJECTED` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Quy tắc Duplicate

```text
normalized_word
```

phải duy nhất.

Ví dụ:

```text
Purchase
purchase
 PURCHASE
```

sau Normalize:

```text
purchase
```

```sql
CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
```

→ cùng một Vocabulary.

---

## 5.2. `vocabulary_meanings`

Một Vocabulary có thể có nhiều nghĩa.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| vocabulary_id | UUID | FK → vocabularies.id, ON DELETE RESTRICT | |
| meaning | VARCHAR(500) | NOT NULL | Nghĩa |
| normalized_meaning | VARCHAR(500) | NOT NULL | Dùng chống trùng nghĩa |
| example | TEXT | NULLABLE | Câu ví dụ |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

Khuyến nghị:

```sql
UNIQUE(vocabulary_id, normalized_meaning)
```

### Ví dụ

```text
bank
├── ngân hàng
└── bờ sông
```

Không tạo hai Vocabulary `bank`.

---

## 5.3. `vocabulary_meaning_sources`

Lưu nguồn của từng nghĩa.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| vocabulary_meaning_id | UUID | FK → vocabulary_meanings.id, ON DELETE RESTRICT | |
| source | VARCHAR(255) | NOT NULL | Nguồn |
| import_batch_id | UUID | FK → import_batches.id, NULLABLE, ON DELETE SET NULL | Batch import |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

---

## 5.4. `vocabulary_progress`

Lưu tiến trình học của từng User đối với từng Vocabulary.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| vocabulary_id | UUID | FK → vocabularies.id, ON DELETE RESTRICT | |
| status | VARCHAR(30) | NOT NULL | `NEW`, `LEARNING`, `MASTERED` |
| mastery_score | FLOAT | NULLABLE | Mức độ thành thạo |
| retention | FLOAT | NULLABLE | Mức độ duy trì |
| review_count | INT | NOT NULL | Số lần ôn |
| ease_factor | FLOAT | NULLABLE | Spaced Repetition |
| interval_days | INT | NULLABLE | Khoảng cách ôn |
| next_review_at | TIMESTAMP | NULLABLE | Lần ôn tiếp theo |
| last_reviewed_at | TIMESTAMP | NULLABLE | Lần ôn gần nhất |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

Ràng buộc:

```sql
UNIQUE(user_id, vocabulary_id)
```

```sql
CHECK (status IN ('NEW', 'LEARNING', 'MASTERED'))
```

### Chức năng

- Theo dõi tiến bộ từ vựng.
- Tìm từ yếu.
- Xác định từ đã thành thạo.
- Spaced Repetition.
- Đề xuất từ cần ôn.

---

# 6. Nhóm Reading / Question Bank

## 6.1. `reading_passages`

Lưu bài Reading.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| title | VARCHAR(500) | NOT NULL | Tiêu đề |
| content | TEXT | NOT NULL | Nội dung bài đọc |
| topic_id | UUID | FK → topics.id, NULLABLE, ON DELETE RESTRICT | Chủ đề |
| difficulty_id | UUID | FK → difficulty_levels.id, NULLABLE, ON DELETE RESTRICT | Độ khó |
| part | VARCHAR(30) | NULLABLE | `PART_6`, `PART_7` |
| source | VARCHAR(255) | NULLABLE | Nguồn |
| status | VARCHAR(30) | NOT NULL | `DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `ARCHIVED`, `REJECTED` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

`part` được sử dụng rõ ràng ở Phase 2 của database.

Câu hỏi Reading Part 5 không có passage (`questions.passage_id IS NULL`);
chỉ Reading Part 6 và Part 7 dùng `reading_passages`.

```sql
CHECK (part IS NULL OR part IN ('PART_6', 'PART_7'))
CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
```

---

## 6.2. `questions`

Đây là bảng Question Bank cốt lõi.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| passage_id | UUID | FK → reading_passages.id, NULLABLE, ON DELETE RESTRICT | Passage liên quan |
| question_text | TEXT | NOT NULL | **Nội dung câu hỏi** |
| skill_id | UUID | FK → skills.id, ON DELETE RESTRICT | Kỹ năng |
| topic_id | UUID | FK → topics.id, NULLABLE, ON DELETE RESTRICT | Chủ đề |
| difficulty_id | UUID | FK → difficulty_levels.id, NULLABLE, ON DELETE RESTRICT | Độ khó |
| part | VARCHAR(30) | NULLABLE | `PART_1` … `PART_7` |
| type | VARCHAR(50) | NOT NULL | Loại câu hỏi |
| question_hash | VARCHAR(255) | INDEX | Duplicate Detection |
| status | VARCHAR(30) | NOT NULL | `DRAFT`, `PENDING_REVIEW`, `PUBLISHED`, `ARCHIVED`, `REJECTED` |
| source | VARCHAR(30) | NOT NULL | `MANUAL`, `IMPORT`, `AI` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### `question_text` là bắt buộc

Question Bank phải lưu nội dung thực tế:

```text
What is the purpose of the email?
```

Không thể chỉ lưu `question_hash` hoặc ID.

### `question_hash`

Có thể được tạo từ dữ liệu đã Normalize:

```text
question_text
+
option_text
+
correct_answer
```

Mục tiêu là phát hiện Question trùng.

```sql
CHECK (part IS NULL OR part IN ('PART_1', 'PART_2', 'PART_3', 'PART_4', 'PART_5', 'PART_6', 'PART_7'))
CHECK (source IN ('MANUAL', 'IMPORT', 'AI'))
CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED', 'REJECTED'))
```

---

## 6.3. `question_options`

Lưu các phương án trả lời.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| question_id | UUID | FK → questions.id, ON DELETE RESTRICT | |
| content | TEXT | NOT NULL | Nội dung phương án |
| is_correct | BOOLEAN | NOT NULL | Đáp án đúng |
| order_index | INT | NOT NULL | Thứ tự hiển thị |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

---

Ràng buộc:

```sql
UNIQUE(question_id, order_index)
UNIQUE(id, question_id)

CREATE UNIQUE INDEX uq_question_options_one_correct
ON question_options(question_id)
WHERE is_correct = TRUE;
```

Quy tắc nghiệp vụ khi publish:

- Một question chỉ được chuyển sang `PUBLISHED` khi có ít nhất 2 option.
- Đúng 1 option phải có `is_correct = TRUE`.
- Service kiểm tra các điều kiện này trong cùng transaction trước khi publish.
- Quy tắc áp dụng cho cả dữ liệu import và dữ liệu AI-generated.

## 6.4. `question_vocabularies` — tùy chọn mở rộng

Bảng liên kết giữa Question và Vocabulary.

| Cột | Kiểu | Ràng buộc |
|---|---|---|
| question_id | UUID | FK → questions.id, ON DELETE RESTRICT |
| vocabulary_id | UUID | FK → vocabularies.id, ON DELETE RESTRICT |

Khóa chính:

```text
(question_id, vocabulary_id)
```

### Mục đích

Có thể xác định:

```text
Question sai
→ Vocabulary liên quan
→ Đề xuất học Vocabulary
```

### Phạm vi

Không bắt buộc để MVP hoạt động. Có thể triển khai khi Recommendation cần liên kết Question ↔ Vocabulary ở mức chi tiết.

---

# 7. Nhóm Listening — Phase 2 của database

## 7.1. `audio_files`

Quản lý Audio cho Listening.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| question_id | UUID | FK → questions.id, NULLABLE, ON DELETE RESTRICT | Audio của câu |
| passage_id | UUID | FK → reading_passages.id, NULLABLE, ON DELETE RESTRICT | Audio của passage/talk |
| url | VARCHAR(1000) | NOT NULL | Đường dẫn file |
| duration_seconds | INT | NULLABLE | Thời lượng |
| transcript_text | TEXT | NULLABLE | Transcript |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

Ràng buộc:

```sql
CHECK ((question_id IS NOT NULL AND passage_id IS NULL)
       OR (question_id IS NULL AND passage_id IS NOT NULL))
```

### Phase 2 của database

Hỗ trợ:

```text
Listening Part 1
Listening Part 2
Listening Part 3
Listening Part 4
```

Audio Player, Transcript và AI Explanation.

---

# 8. Nhóm Practice

## 8.1. `practice_sessions`

Lưu một phiên luyện tập.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| mode | VARCHAR(30) | NOT NULL | `GUIDED`, `FREE` |
| source | VARCHAR(30) | NOT NULL | `PRACTICE`, `MOCK`, `DIAGNOSTIC` |
| assessment_id | UUID | FK → assessments.id, NULLABLE, ON DELETE SET NULL | Nếu session thuộc Assessment |
| started_at | TIMESTAMP | NOT NULL | |
| ended_at | TIMESTAMP | NULLABLE | |

```sql
CHECK (mode IN ('GUIDED', 'FREE'))
CHECK (source IN ('PRACTICE', 'MOCK', 'DIAGNOSTIC'))
```

---

## 8.2. `question_attempts`

**Đây là bảng lõi của hệ thống Personalization.**

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| question_id | UUID | FK → questions.id, ON DELETE RESTRICT | |
| session_id | UUID | FK → practice_sessions.id, ON DELETE RESTRICT | Phiên làm bài |
| selected_option_id | UUID | FK → question_options.id, NULLABLE, composite FK with question_id, ON DELETE RESTRICT | Đáp án người dùng chọn |
| is_correct | BOOLEAN | NOT NULL | Đúng/sai |
| response_time_ms | INT | NOT NULL | Thời gian trả lời |
| skill_id | UUID | FK → skills.id, ON DELETE RESTRICT | Snapshot skill |
| topic_id | UUID | FK → topics.id, NULLABLE, ON DELETE RESTRICT | Snapshot topic |
| difficulty_id | UUID | FK → difficulty_levels.id, ON DELETE RESTRICT | Snapshot difficulty |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Dữ liệu được dùng cho

```text
Question Attempts
        ↓
Learning Analytics
        ↓
Weakness Detection
        ↓
BKT
        ↓
Recommendation
        ↓
Adaptive Difficulty
```

### Lưu Snapshot

`skill_id`, `topic_id` và `difficulty_id` được lưu tại thời điểm attempt để
lịch sử không bị thay đổi nếu metadata của Question thay đổi sau này.

`is_correct` là snapshot do Backend tự tính từ
`question_options.is_correct` tại thời điểm nộp bài; client không được gửi
giá trị này. Khi `selected_option_id IS NULL`, Backend ghi
`is_correct = FALSE`.

Foreign Key bảo đảm option được chọn thuộc đúng question:

```sql
FOREIGN KEY (selected_option_id, question_id)
REFERENCES question_options (id, question_id)
ON DELETE RESTRICT
```

---

# 9. Nhóm Knowledge Tracing

## 9.1. `knowledge_states`

Lưu trạng thái kiến thức của người học theo từng Skill.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| skill_id | UUID | FK → skills.id, ON DELETE RESTRICT | |
| p_know | FLOAT | NOT NULL | Probability of Knowledge |
| p_learn | FLOAT | NOT NULL | Learning Probability |
| p_guess | FLOAT | NOT NULL | Guess Probability |
| p_slip | FLOAT | NOT NULL | Slip Probability |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| UNIQUE | `(user_id, skill_id)` | | Một state hiện tại/skill |

### BKT

Sau mỗi `question_attempt`, Backend cập nhật:

```text
p_know
```

Các tham số:

```text
p_learn
p_guess
p_slip
```

có thể được cấu hình theo skill/model.

### Mục đích

- Theo dõi trạng thái kiến thức.
- Làm đầu vào cho Recommendation.
- So sánh với SAKT/AKT trong Phase 2 của database.
- Có dữ liệu state để audit thuật toán.

---

# 10. Nhóm Skill Profile / Learning Analytics

## 10.1. `skill_profiles`

Lưu snapshot năng lực của User theo Skill.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| skill_id | UUID | FK → skills.id, ON DELETE RESTRICT | |
| mastery_score | FLOAT | NULLABLE | Có thể lấy từ Knowledge State |
| accuracy | FLOAT | NULLABLE | |
| avg_response_time_ms | INT | NULLABLE | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| UNIQUE | `(user_id, skill_id)` | | |

### Không bắt buộc lưu mọi chỉ số

Các chỉ số có thể tính lại như:

```text
Error Rate
Recent Accuracy
Weakness Score
Weighted Weakness Score
```

không nhất thiết phải trở thành column nếu không cần snapshot.

---

# 11. Nhóm Assessment / Progress

## 11.1. `assessments`

Lưu các bài đánh giá.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| type | VARCHAR(30) | NOT NULL | `BASELINE`, `PROGRESS`, `POST_TEST`, `DIAGNOSTIC`, `FINAL`, `MOCK` |
| total_score | INT | NULLABLE | Điểm tổng |
| duration_seconds | INT | NULLABLE | Thời lượng |
| taken_at | TIMESTAMP | NOT NULL | |

```sql
CHECK (type IN ('BASELINE', 'PROGRESS', 'POST_TEST', 'DIAGNOSTIC', 'FINAL', 'MOCK'))
```

`listening_score` và `reading_score` được thêm ở Phase 2 của database bằng
`ADD COLUMN ... NULLABLE` trong V17; MVP/Phase 1 chỉ dùng `total_score`.

---

## 11.2. `assessment_results`

Lưu kết quả chi tiết của Assessment.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| assessment_id | UUID | FK → assessments.id, ON DELETE RESTRICT | |
| skill_id | UUID | FK → skills.id, ON DELETE RESTRICT | |
| part | VARCHAR(30) | NULLABLE | `PART_1` … `PART_7`, Phase 2 của database |
| correct | INT | NOT NULL | |
| total | INT | NOT NULL | |
| accuracy | FLOAT | NOT NULL | |
| avg_response_time_ms | INT | NULLABLE | Phase 2 của database |

```sql
CHECK (part IS NULL OR part IN ('PART_1', 'PART_2', 'PART_3', 'PART_4', 'PART_5', 'PART_6', 'PART_7'))
```

### Mục đích

Cho phép phân tích:

```text
Skill
Part
Accuracy
Response Time
```

---

# 12. Nhóm Learning Path

## 12.1. `learning_paths`

Lưu lộ trình cá nhân.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| target_score | INT | NOT NULL | |
| status | VARCHAR(30) | NOT NULL | `ACTIVE`, `COMPLETED`, `ARCHIVED` |
| baseline_assessment_id | UUID | FK → assessments.id, ON DELETE RESTRICT | |
| post_test_assessment_id | UUID | FK → assessments.id, NULLABLE, ON DELETE SET NULL | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (status IN ('ACTIVE', 'COMPLETED', 'ARCHIVED'))
```

### Chức năng

```text
Baseline
→ Weakness Analysis
→ Learning Path
→ Practice
→ Progress Assessment
→ Post-test
→ Updated Learning Path
```

---

## 12.2. `learning_path_items`

Lưu từng bước trong Learning Path.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| learning_path_id | UUID | FK → learning_paths.id, ON DELETE RESTRICT | |
| order_index | INT | NOT NULL | Thứ tự |
| skill_id | UUID | FK → skills.id, NULLABLE, ON DELETE RESTRICT | |
| difficulty_id | UUID | FK → difficulty_levels.id, NULLABLE, ON DELETE RESTRICT | |
| content_type | VARCHAR(50) | NOT NULL | `VOCABULARY`, `PASSAGE`, `QUESTION` |
| content_id | UUID | NOT NULL | Polymorphic reference |
| status | VARCHAR(30) | NOT NULL | `PENDING`, `IN_PROGRESS`, `DONE`, `SKIPPED` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (content_type IN ('VOCABULARY', 'PASSAGE', 'QUESTION'))
```

```sql
CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE', 'SKIPPED'))
```

---

# 13. Nhóm Recommendation

## 13.1. `recommendations`

Lưu một lần hệ thống tạo Recommendation.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| based_on | VARCHAR(50) | NOT NULL | `WEAKNESS`, `GOAL`, `KNOWLEDGE_STATE`, `RECENT_PERFORMANCE` |
| generated_at | TIMESTAMP | NOT NULL | |

```sql
CHECK (based_on IN ('WEAKNESS', 'GOAL', 'KNOWLEDGE_STATE', 'RECENT_PERFORMANCE'))
```

---

## 13.2. `recommendation_items`

Lưu từng nội dung được đề xuất.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| recommendation_id | UUID | FK → recommendations.id, ON DELETE RESTRICT | |
| content_type | VARCHAR(50) | NOT NULL | `VOCABULARY`, `PASSAGE`, `QUESTION` |
| content_id | UUID | NOT NULL | Polymorphic reference |
| score | FLOAT | NOT NULL | Recommendation Score |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (content_type IN ('VOCABULARY', 'PASSAGE', 'QUESTION'))
```

---

# 14. Nhóm Review

## 14.1. `wrong_answer_notes`

Sổ câu hỏi sai.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| question_attempt_id | UUID | FK → question_attempts.id, ON DELETE RESTRICT | Lần làm sai |
| note | TEXT | NULLABLE | Ghi chú cá nhân |
| resolved | BOOLEAN | NOT NULL | Đã xử lý/ôn lại |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Mức triển khai

Bảng được tạo trong MVP/Phase 1; tính năng Review hoàn thiện ở roadmap Phase 18.

Dùng cho:

- Wrong Answer Notebook.
- Review Center.
- Danh sách câu cần ôn lại.

---

## 14.2. `bookmarks`

Lưu nội dung người dùng đánh dấu.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| content_type | VARCHAR(50) | NOT NULL | `VOCABULARY`, `QUESTION`, `PASSAGE` |
| content_id | UUID | NOT NULL | Polymorphic reference |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

Khuyến nghị:

```sql
UNIQUE(user_id, content_type, content_id)
```

```sql
CHECK (content_type IN ('VOCABULARY', 'QUESTION', 'PASSAGE'))
```

---

# 15. Nhóm Notification

## 15.1. `notifications`

Dùng cho nhắc học và thông báo.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, ON DELETE RESTRICT | |
| type | VARCHAR(50) | NOT NULL | VARCHAR mở, không CHECK; giá trị được kiểm soát ở Service Layer |
| message | TEXT | NOT NULL | Nội dung |
| is_read | BOOLEAN | NOT NULL | Đã đọc |
| scheduled_at | TIMESTAMP | NULLABLE | Thời gian dự kiến |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

`notifications.type` là `VARCHAR(50)` mở, không có CHECK. Giá trị được kiểm
soát ở Service Layer. Khi nghiệp vụ chốt enum, thêm CHECK bằng migration Phase
2 của database; không sửa migration V19 đã chạy.

### Mức triển khai

Bảng được tạo trong Phase 2 của database ở V19; tính năng nhắc học được
hoàn thiện ở roadmap Phase 18.

---

# 16. Nhóm AI

## 16.1. `ai_interactions`

Lưu lịch sử tương tác với Gemini.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NULLABLE, ON DELETE SET NULL | Có thể là User hoặc hệ thống/Admin |
| type | VARCHAR(50) | NOT NULL | Loại AI request |
| prompt | TEXT | NOT NULL | Prompt |
| response | TEXT | NULLABLE | Response |
| model | VARCHAR(100) | NULLABLE | Model Gemini |
| status | VARCHAR(30) | NOT NULL | `PENDING`, `SUCCESS`, `FAILED` |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| completed_at | TIMESTAMP | NULLABLE | |

### Loại AI

```text
EXPLAIN_ANSWER
ANALYZE_MISTAKE
EXPLAIN_VOCAB
GENERATE_QUESTION
GENERATE_READING
GENERATE_EXERCISE
```

```sql
CHECK (type IN ('EXPLAIN_ANSWER', 'ANALYZE_MISTAKE', 'EXPLAIN_VOCAB', 'GENERATE_QUESTION', 'GENERATE_READING', 'GENERATE_EXERCISE'))
CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED'))
```

---

## 16.2. `ai_generated_content`

Lưu nội dung do AI sinh ra trước khi publish.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| ai_interaction_id | UUID | FK → ai_interactions.id, ON DELETE RESTRICT | |
| content_type | VARCHAR(50) | NOT NULL | `QUESTION`, `READING`, `EXERCISE` |
| payload_json | JSONB | NOT NULL | Nội dung sinh ra |
| validation_status | VARCHAR(30) | NOT NULL | `PENDING`, `PASSED`, `REJECTED` |
| reviewed_by | UUID | FK → users.id, NULLABLE, ON DELETE SET NULL | Admin |
| reviewed_at | TIMESTAMP | NULLABLE | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (content_type IN ('QUESTION', 'READING', 'EXERCISE'))
CHECK (validation_status IN ('PENDING', 'PASSED', 'REJECTED'))
```

Vocabulary không được AI sinh trực tiếp trong schema chính thức. README chỉ
nêu AI giải thích Vocabulary; các loại AI-generated content được lưu ở đây là
Question, Reading và Exercise.

### Quy trình

```text
AI Generate
     ↓
Validation
     ↓
Admin Review
     ↓
Publish
```

AI không tự động ghi trực tiếp nội dung chưa kiểm duyệt vào Question Bank chính thức.

---

# 17. Nhóm RAG / Vector

## 17.1. `content_embeddings`

Lưu embedding phục vụ RAG.

> Bảng này được thiết kế khi hệ thống sử dụng PostgreSQL + pgvector cho Retrieval.

Đây là bảng của MVP/Phase 1 và được tạo ở V15. Migration V15 bắt đầu bằng:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

PostgreSQL ở môi trường dev, CI và production phải cài sẵn pgvector.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| content_type | VARCHAR(50) | NOT NULL | `VOCABULARY`, `PASSAGE`, `QUESTION` |
| content_id | UUID | NOT NULL | ID nội dung |
| chunk_text | TEXT | NOT NULL | Text dùng tạo embedding |
| embedding | VECTOR(768) | NOT NULL | pgvector; `EMBEDDING_DIM = 768` |
| metadata | JSONB | NULLABLE | Metadata retrieval |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Luồng RAG

```text
Vocabulary / Reading / Question
             ↓
           Chunk
             ↓
         Embedding
             ↓
      PostgreSQL + pgvector
             ↓
       Similarity Search
             ↓
           Gemini
```

`content_type + content_id` là polymorphic reference và được kiểm soát ở Service Layer.

768 chiều nằm trong giới hạn 2000 chiều của index HNSW/IVFFlat cho kiểu
`vector`. Khi gọi Gemini Embedding, Backend phải đặt
`output_dimensionality = 768`. Với model `gemini-embedding-001`, Backend
phải normalize vector trước khi lưu vì API chỉ tự chuẩn hóa sẵn vector 3072
chiều; schema không phụ thuộc vào tên model cụ thể.

```sql
CHECK (content_type IN ('VOCABULARY', 'PASSAGE', 'QUESTION'))
```

---

# 18. Nhóm Content Source / Import

## 18.1. `content_sources`

Lưu nguồn của nội dung.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| name | VARCHAR(255) | NOT NULL | Tên nguồn |
| type | VARCHAR(30) | NOT NULL | `EXCEL`, `WORD`, `PDF`, `CSV`, `MANUAL`, `AI`, `SYSTEM` |
| reference | VARCHAR(1000) | NULLABLE | Link hoặc thông tin tham chiếu |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (type IN ('EXCEL', 'WORD', 'PDF', 'CSV', 'MANUAL', 'AI', 'SYSTEM'))
```

---

## 18.2. `import_batches`

Một lần import dữ liệu.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| source_id | UUID | FK → content_sources.id, ON DELETE RESTRICT | |
| file_name | VARCHAR(500) | NULLABLE | |
| total_records | INT | NOT NULL | |
| success_count | INT | NOT NULL | |
| failed_count | INT | NOT NULL | |
| status | VARCHAR(30) | NOT NULL | VARCHAR mở, không CHECK; giá trị được kiểm soát ở Service Layer |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |
| completed_at | TIMESTAMP | NULLABLE | |

`import_batches.status` là `VARCHAR(30)` mở, không có CHECK vì ba tài liệu
chưa cung cấp tập giá trị chính thức đầy đủ. Giá trị được kiểm soát ở Service
Layer. Khi nghiệp vụ chốt enum, thêm CHECK bằng migration Phase 2 của database;
không sửa migration MVP/Phase 1 đã chạy.

---

## 18.3. `import_items`

Theo dõi từng record trong Import Batch.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| import_batch_id | UUID | FK → import_batches.id, ON DELETE RESTRICT | |
| raw_data | JSONB | NOT NULL | Dữ liệu thô |
| status | VARCHAR(30) | NOT NULL | `SUCCESS`, `FAILED`, `DUPLICATE`, `MERGED` |
| error_message | TEXT | NULLABLE | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

```sql
CHECK (status IN ('SUCCESS', 'FAILED', 'DUPLICATE', 'MERGED'))
```

### Quy trình Import

```text
File
 ↓
Parser
 ↓
Normalize
 ↓
Validate
 ↓
Duplicate Detection
 ↓
Merge / Insert
 ↓
Publish
```

---

# 19. Nhóm Admin / Audit

## 19.1. `audit_logs`

Lưu lịch sử thao tác quản trị và các thay đổi dữ liệu quan trọng.

| Cột | Kiểu | Ràng buộc | Ghi chú |
|---|---|---|---|
| id | UUID | PK | |
| user_id | UUID | FK → users.id, NULLABLE, ON DELETE SET NULL | Người thực hiện |
| action | VARCHAR(100) | NOT NULL | Hành động |
| entity_type | VARCHAR(100) | NOT NULL | Loại entity |
| entity_id | UUID | NULLABLE | ID entity |
| old_data | JSONB | NULLABLE | Dữ liệu trước thay đổi |
| new_data | JSONB | NULLABLE | Dữ liệu sau thay đổi |
| ip_address | INET | NULLABLE | IP |
| created_at | TIMESTAMP | NOT NULL, DEFAULT now() | |

### Ví dụ

```text
Admin
 ↓
Edit Question Q001
 ↓
old_data
new_data
 ↓
audit_logs
```

### Mức triển khai

Bảng được tạo trong MVP/Phase 1; ghi log toàn bộ thao tác quản trị được
hoàn thiện ở roadmap Phase 23 (Hardening).

---

# 20. Quan hệ chính giữa các bảng

## 20.1. User → Learning

```text
users
  │
  ├── learning_profiles
  ├── goal_history
  ├── skill_profiles
  ├── knowledge_states
  ├── vocabulary_progress
  ├── practice_sessions
  ├── question_attempts
  ├── assessments
  ├── recommendations
  ├── learning_paths
  ├── wrong_answer_notes
  ├── bookmarks
  ├── notifications
  └── ai_interactions
```

---

## 20.2. Vocabulary

```text
vocabularies
      │
      ├── vocabulary_meanings
      │       │
      │       └── vocabulary_meaning_sources
      │
      └── vocabulary_progress
```

---

## 20.3. Reading / Question

```text
reading_passages
        │
        └── questions
              │
              └── question_options
```

Một Question có thể không thuộc Passage:

```text
passage_id = NULL
```

để hỗ trợ các dạng câu hỏi độc lập, đặc biệt khi mở rộng Listening hoặc Vocabulary/Grammar Question.

---

## 20.4. Practice

```text
practice_sessions
        │
        └── question_attempts
                │
                ├── questions
                └── question_options
```

`question_attempts` lưu snapshot `skill_id`, `topic_id` và `difficulty_id`;
`is_correct` là giá trị do Backend tính từ option tại thời điểm nộp bài.

---

## 20.5. Personalization

```text
question_attempts
        ↓
Learning Analytics
        ↓
skill_profiles
        ↓
knowledge_states
        ↓
recommendations
        ↓
learning_paths
```

---

# 21. Các bảng và thuộc tính bắt buộc cho MVP

MVP tập trung:

```text
Vocabulary
+
Reading
+
Practice
+
Personalization
```

### Bảng chính

```text
users
learning_profiles
skills
topics
difficulty_levels

vocabularies
vocabulary_meanings
vocabulary_meaning_sources
vocabulary_progress

reading_passages
questions
question_options

practice_sessions
question_attempts

skill_profiles
knowledge_states

assessments
assessment_results

recommendations
recommendation_items

learning_paths
learning_path_items

ai_interactions
ai_generated_content

content_sources
import_batches
import_items

content_embeddings
audit_logs
```

---

# 22. Các bảng Phase 2 của database

Các bảng/chức năng sau được sử dụng hoặc mở rộng khi hoàn thiện Full TOEIC:

```text
audio_files
notifications
question_vocabularies
```

Đồng thời mở rộng:

```text
assessments.listening_score
assessments.reading_score

assessment_results.part
assessment_results.avg_response_time_ms

questions.part
reading_passages.part
```

---

# 23. Các thay đổi quan trọng đã chốt

## 23.1. Bắt buộc: `questions.question_text`

Bảng `questions` phải có:

```text
question_text TEXT NOT NULL
```

Lý do:

- Question Bank phải lưu nội dung câu hỏi.
- Frontend cần hiển thị câu hỏi.
- `question_hash` cần dữ liệu câu hỏi để Duplicate Detection.
- AI Explanation cần biết nội dung câu hỏi.

---

## 23.2. Bắt buộc: `updated_at` cho Content có thể chỉnh sửa

Các bảng content chính nên có:

```text
updated_at
```

bao gồm:

```text
vocabularies
vocabulary_meanings
reading_passages
questions
question_options
ai_generated_content
content_embeddings
```

---

## 23.3. Bắt buộc: Duplicate Constraint cho Vocabulary

```sql
UNIQUE(normalized_word)
```

và:

```sql
UNIQUE(vocabulary_id, normalized_meaning)
```

---

## 23.4. RAG: `content_embeddings`

Nếu RAG được triển khai theo kiến trúc chính thức, sử dụng:

```text
PostgreSQL + pgvector
```

và bảng:

```text
content_embeddings
```

RAG và `content_embeddings` thuộc MVP/Phase 1; Phase 2 của database chỉ mở
rộng retrieval.

---

## 23.5. Admin: `audit_logs`

Dùng để lưu lịch sử thao tác quản trị và thay đổi content quan trọng.

---

## 23.6. Full TOEIC: Part và Section/Score

MVP/Phase 1 chỉ dùng các trường Reading hiện có. Phase 2 của database bổ sung bằng
migration V17 với `ADD COLUMN ... NULLABLE`:

```text
assessment_results.part
assessments.listening_score
assessments.reading_score
```

và sử dụng:

```text
questions.part
reading_passages.part
```

để thống kê Part 1–7.

## 23.7. Đồng bộ với `phanTichDB.md`

`data-dictionary.md` là nguồn chính thức. Các sai lệch tên cột trong
`phanTichDB.md` được chốt lại như sau:

| Nội dung | Tên chính thức trong Data Dictionary | Tên cũ trong `phanTichDB.md` |
|---|---|---|
| Tên người dùng | `full_name` | `display_name` |
| Mức trình độ | `current_level` VARCHAR(50), nhãn `BEGINNER` / `INTERMEDIATE` / `ADVANCED` | Mô tả không thống nhất |
| Lịch sử mục tiêu | `target_score` | `old_target_score`, `new_target_score` |
| Nguồn nghĩa Vocabulary | `source` và `import_batch_id` | `source_id`, `source_reference` |
| Phát âm Vocabulary | `ipa` | `pronunciation` |
| Nội dung option | `content` | `option_text` |
| Thứ tự option | `order_index` | `display_order` |
| Nguồn của Vocabulary | Không có cột `source` trong `vocabularies` (mục 5.1). Nguồn được lưu ở `vocabulary_meaning_sources` (mục 5.3) | `vocabularies.source` |
| Kỹ năng của Reading Passage | Không có `skill_id` trong `reading_passages` (mục 6.1). Kỹ năng được gắn ở `questions.skill_id` (mục 6.2) | `reading_passages.skill_id` |
| `ai_generated_content.validation_status` | `PENDING`, `PASSED`, `REJECTED` (mục 16.2) | `GENERATED`, `PENDING_REVIEW`, `APPROVED`, `REJECTED`, `PUBLISHED` |
| `import_items.status` | `SUCCESS`, `FAILED`, `DUPLICATE`, `MERGED` (mục 18.3) | `VALID`, `INVALID`, `DUPLICATE`, `MERGED`, `PUBLISHED` |
| `questions.explanation` | Không thuộc schema hiện tại; nếu cần thì thêm ở Phase 2 của database bằng `ADD COLUMN NULLABLE` | Đề xuất ở mục 5.2 |
| `archived_at` | Không thuộc schema hiện tại; dùng `status = 'ARCHIVED'` và `updated_at` | Đề xuất ở mục 13 |
| `bookmarks.content_type` | Chỉ `VOCABULARY`, `QUESTION`, `PASSAGE`; mở rộng ở Phase 2 của database bằng sửa CHECK | `phanTichDB.md` ghi “các content khác” |
| `ai_generated_content.content_type` | Chỉ `QUESTION`, `READING`, `EXERCISE`; Vocabulary không được AI sinh trực tiếp trong schema chính thức | `phanTichDB.md` nêu thêm Vocabulary |

Các migration, Entity, DTO và tài liệu triển khai về sau phải dùng tên ở cột
"Tên chính thức". Không tạo alias cột hoặc bảng mới chỉ để tương thích với
`phanTichDB.md`.

Thứ tự Flyway migration chính thức là mục 27 của `data-dictionary.md`. Mục 17 của
`phanTichDB.md` đã lỗi thời và không được dùng để viết migration.

---

# 24. Những dữ liệu không cần tạo bảng riêng

Không tạo bảng riêng chỉ vì một thuật toán có một chỉ số.

## Không cần bảng riêng cho

```text
Accuracy
Error Rate
Recent Accuracy
Response Time
Weakness Score
Weighted Weakness Score
Recommendation Score
Adaptive Difficulty
```

### Cách xử lý

```text
question_attempts
       ↓
Analytics Service
       ↓
Algorithm
       ↓
Result
```

Nếu cần lưu snapshot, có thể sử dụng:

```text
skill_profiles
recommendations
```

hoặc bảng chuyên biệt sau này khi có yêu cầu rõ ràng.

---

# 25. Data Flow chính

## 25.1. Learning Analytics

```text
User
 ↓
Practice Session
 ↓
Question
 ↓
Answer
 ↓
Question Attempt
 ↓
Analytics
 ├── Accuracy
 ├── Error Rate
 ├── Response Time
 └── Recent Performance
```

---

## 25.2. Weakness Detection

```text
Question Attempts
       ↓
Skill / Topic
       ↓
Performance Analysis
       ↓
Weakness Score
       ↓
Weak Skills / Topics
```

---

## 25.3. BKT

```text
Question Attempt
       ↓
Correct / Incorrect
       ↓
BKT Update
       ↓
P(Know)
       ↓
knowledge_states
```

---

## 25.4. Recommendation

```text
Learning History
       ↓
Skill Profile
       ↓
Knowledge State
       ↓
Weakness
       ↓
Recommendation Algorithm
       ↓
recommendations
       ↓
recommendation_items
```

---

## 25.5. Adaptive Learning Path

```text
Baseline
   ↓
Weakness Analysis
   ↓
Recommendation
   ↓
Learning Path
   ↓
Practice
   ↓
Progress Assessment
   ↓
Post-test
   ↓
Before / After Analysis
   ↓
Updated Learning Path
```

---

## 25.6. AI

```text
User / Admin
     ↓
Backend
     ↓
AI Interaction
     ↓
Gemini
     ↓
AI Response
```

Đối với nội dung mới:

```text
Gemini
 ↓
ai_generated_content
 ↓
Validation
 ↓
Admin Review
 ↓
Publish
 ↓
Question / Reading Bank
```

---

## 25.7. RAG

```text
Database Content
      ↓
Chunk
      ↓
Embedding
      ↓
content_embeddings
      ↓
Similarity Search
      ↓
Relevant Context
      ↓
Gemini
      ↓
Explanation / Analysis / Generation
```

---

# 26. MVP vs Phase 2

| Thành phần | MVP | Phase 2 |
|---|---:|---:|
| Users | ✅ | ✅ |
| Learning Profile | ✅ | ✅ |
| Goal History | Bảng có sẵn từ MVP; quản lý mục tiêu đầy đủ ở roadmap Phase 15 | ✅ |
| Skills | ✅ | ✅ |
| Topics | ✅ | ✅ |
| Difficulty | ✅ | ✅ |
| Vocabulary | ✅ | ✅ |
| Vocabulary Meaning | ✅ | ✅ |
| Vocabulary Progress | ✅ | ✅ |
| Reading | ✅ | ✅ |
| Question Bank | ✅ | ✅ |
| Practice | ✅ | ✅ |
| Question Attempt | ✅ | ✅ |
| Learning Analytics | ✅ | ✅ |
| Skill Profile | ✅ | ✅ |
| BKT | ✅ | Có thể mở rộng SAKT/AKT |
| Recommendation | ✅ | Hybrid Recommendation |
| Adaptive Difficulty | ✅ | ✅ |
| Learning Path | ✅ | Goal-based nâng cao |
| Baseline | ✅ | Diagnostic nâng cao |
| Progress Assessment | ✅ | ✅ |
| Post-test | ✅ | ✅ |
| `assessments.listening_score`, `assessments.reading_score` | ❌ | ✅; ADD COLUMN NULLABLE ở V17 |
| Wrong Answer Notebook | Có thể triển khai | Hoàn thiện |
| Bookmark | Có thể triển khai | Hoàn thiện |
| Spaced Repetition | Cơ bản | Hoàn thiện |
| Gemini | ✅ | ✅ |
| AI Generated Content | ✅ | ✅ |
| RAG | ✅ MVP/Phase 1 | Mở rộng |
| Import | ✅ | Hoàn thiện |
| Duplicate Detection | ✅ | Hoàn thiện |
| Audit Log | ✅ MVP/Phase 1; hoàn thiện ghi log quản trị ở roadmap Phase 23 | ✅ |
| Notification | ❌ | ✅; bảng tạo ở V19, hoàn thiện nhắc học ở roadmap Phase 18 |
| Audio | Không bắt buộc | ✅ |
| Listening Part 1–4 | ❌ | ✅ |
| Reading Part 5–7 | Một phần | ✅ |
| Full/Mock Test | ❌ | ✅; Mock dùng `assessments.type = 'MOCK'` và `practice_sessions.source = 'MOCK'` |
| AI Queue | ❌ | Khi cần |
| SAKT/AKT | ❌ | Có thể nghiên cứu |
| Hybrid Recommendation | ❌ | Có thể nghiên cứu |

---

# 27. Flyway Migration đề xuất

Không nên tạo một migration khổng lồ. Chọn phương án đổi thứ tự module để
mọi bảng cha tồn tại trước bảng con; không dùng migration deferred FK. Các
cross-module dependency đã được xử lý như sau:

- `practice_sessions.assessment_id → assessments.id`: `assessments` được
       tạo ở V6, `practice_sessions` ở V8.
- `vocabulary_meaning_sources.import_batch_id → import_batches.id`:
       `import_batches` được tạo ở V4, `vocabulary_meaning_sources` ở V5.
       Vì vậy Foreign Key được tạo trực tiếp trong V5.

```text
V1__create_users.sql

V2__create_learning_profile.sql

V3__create_taxonomy.sql

V4__create_import.sql

V5__create_vocabulary.sql

V6__create_assessment.sql

V7__create_reading_question_bank.sql

V8__create_practice.sql

V9__create_learning_analytics.sql

V10__create_knowledge_tracing.sql

V11__create_recommendation.sql

V12__create_learning_path.sql

V13__create_review.sql

V14__create_ai.sql

V15__create_rag_embeddings.sql

V16__create_audit_logs.sql
```

Phase 2 của database (V17 trở đi):

```text
V17__extend_assessment_for_full_toeic.sql

V18__create_listening_audio.sql

V19__create_notification.sql
```

V17 chỉ bổ sung các cột Phase 2 bằng `ADD COLUMN ... NULLABLE` và CHECK mới;
không sửa V6 hoặc các migration MVP/Phase 1 đã chạy. Các cột bổ sung gồm
`assessments.listening_score`, `assessments.reading_score`,
`assessment_results.part`, `assessment_results.avg_response_time_ms`,
`reading_passages.part` và `questions.part`.
V18 tạo `audio_files`. Mock Test không tạo bảng riêng: dùng
`assessments.type = 'MOCK'` và `practice_sessions.source = 'MOCK'` trong các
bảng MVP/Phase 1 hiện có (roadmap Phase 17). V19 tạo `notifications`.

Tên migration thực tế có thể điều chỉnh theo thứ tự triển khai của nhóm.

---

# 28. Checklist trước khi bắt đầu code Backend

## Database

- [ ] PostgreSQL đã tạo.
- [ ] ERD khớp Data Dictionary.
- [ ] Tất cả PK đã xác định.
- [ ] Tất cả FK đã xác định.
- [ ] Mọi FK có `ON DELETE` tường minh theo mục 1.6.
- [ ] Unique constraint đã xác định.
- [ ] `question_options` có UNIQUE `(question_id, order_index)` và UNIQUE `(id, question_id)`.
- [ ] `question_attempts.selected_option_id` dùng composite FK với `question_id`.
- [ ] `question_options` có partial unique index cho một đáp án đúng.
- [ ] Question chỉ được publish khi có ít nhất 2 option và đúng 1 option đúng; Service kiểm tra trong cùng transaction cho import và AI-generated.
- [ ] `audio_files` có CHECK đúng một owner.
- [ ] `question_attempts` có snapshot `skill_id`, `topic_id` và `difficulty_id`.
- [ ] Index cho các trường tìm kiếm đã xác định.
- [ ] `questions.question_text` đã có.
- [ ] `question_hash` đã có.
- [ ] `normalized_word` có UNIQUE.
- [ ] `(vocabulary_id, normalized_meaning)` có UNIQUE.
- [ ] `question_attempts.session_id` có FK.
- [ ] `knowledge_states` đã có.
- [ ] `content_embeddings` đã có nếu triển khai RAG.
- [ ] MVP/Phase 1 có pgvector cài sẵn ở dev, CI và production; V15 chạy `CREATE EXTENSION IF NOT EXISTS vector`.
- [ ] Embedding dùng `VECTOR(768)`, Gemini Embedding đặt `output_dimensionality = 768` và Backend normalize vector trước khi lưu theo yêu cầu model.
- [ ] `audit_logs` đã có.
- [ ] Content có `status`.
- [ ] Content có `updated_at`.

## MVP

- [ ] Users.
- [ ] Learning Profile.
- [ ] Vocabulary.
- [ ] Reading.
- [ ] Question.
- [ ] Practice.
- [ ] Question Attempt.
- [ ] Analytics.
- [ ] BKT.
- [ ] Recommendation.
- [ ] Adaptive Difficulty.
- [ ] Learning Path.
- [ ] Assessment.
- [ ] Gemini.
- [ ] Import.
- [ ] RAG/pgvector MVP/Phase 1.

## Phase 2 của database

- [ ] Listening Part 1–4.
- [ ] Reading Part 5–7.
- [ ] Audio.
- [ ] Transcript.
- [ ] Full/Mock Test.
- [ ] Wrong Answer Notebook.
- [ ] Review Center.
- [ ] Spaced Repetition.
- [ ] Notification.
- [ ] AI Queue.
- [ ] SAKT/AKT.
- [ ] Hybrid Recommendation.

---

# 29. Quyết định cuối cùng

Database của dự án **không thiết kế lại từ đầu**. Bản Data Dictionary này giữ các entity đã có và bổ sung các phần cần thiết để đáp ứng phạm vi README.

Các điểm bắt buộc đã được chốt:

```text
1. questions.question_text
2. updated_at cho content có thể chỉnh sửa
3. UNIQUE(normalized_word)
4. UNIQUE(vocabulary_id, normalized_meaning)
5. knowledge_states cho BKT
6. content_embeddings cho RAG
7. audit_logs cho Admin
8. assessment_results.part cho Full TOEIC
9. assessments.listening_score
10. assessments.reading_score
11. status hỗ trợ ARCHIVED
12. question_attempts.session_id
```

### MVP chính thức

```text
Vocabulary
+
Reading
+
Practice
+
Learning Analytics
+
Weakness Detection
+
BKT
+
Recommendation
+
Adaptive Difficulty
+
Adaptive Learning Path
+
Baseline / Progress / Post-test
+
Gemini
+
RAG
+
Import / Deduplication
```

### Phase 2 của database chính thức

```text
Full TOEIC Listening & Reading
+
Diagnostic Test
+
Goal-based Learning Path
+
Full / Mock Test
+
Review Center
+
Wrong Answer Notebook
+
Spaced Repetition
+
Listening AI
+
AI Queue khi cần
+
Advanced Knowledge Tracing
+
Hybrid Recommendation
+
Security / Performance / Monitoring / Backup / Audit
```

> **Đây là Data Dictionary làm cơ sở để chuyển sang bước thiết kế ERD và Flyway Migration. Không nên tự ý thêm entity mới trong quá trình code nếu chưa xác định rõ dữ liệu đó có trạng thái, lịch sử hoặc quan hệ nghiệp vụ riêng.**

---

# Changelog bản chốt

So với bản trước, tài liệu này đã thay đổi:

- Thêm mục 1.6 quy định chính sách `ON DELETE` và ghi chính sách trực tiếp
       trên từng dòng Foreign Key.
- Chốt `current_level` là `VARCHAR(50)` với các nhãn
       `BEGINNER`, `INTERMEDIATE`, `ADVANCED`.
- Thêm `DEFAULT now()` cho toàn bộ `created_at`, `updated_at` và
       `changed_at` đang `NOT NULL`.
- Thêm các `CHECK` constraint cho mọi enum-text đã có tập giá trị được mô tả.
- Thêm `UNIQUE(question_id, order_index)`, `UNIQUE(id, question_id)` và
       partial unique index bảo đảm một đáp án đúng cho `question_options`.
- Chuyển `question_attempts.selected_option_id` sang composite FK cùng
       `question_id` để option phải thuộc đúng question.
- Thêm CHECK cho `audio_files` để đúng một trong `question_id` và
       `passage_id` khác `NULL`.
- Sửa thứ tự Flyway: import và assessment được tạo trước các bảng tham chiếu;
       FK `vocabulary_meaning_sources.import_batch_id` được tạo trực tiếp ở V5.
- Thêm bảng đối chiếu tên cột chính thức với `phanTichDB.md`; xác nhận
       `data-dictionary.md` là nguồn chuẩn duy nhất.
- Bổ sung `topic_id` snapshot cho `question_attempts` và quy định Backend tự
       tính `is_correct`.
- Chuyển `listening_score` và `reading_score` sang Phase 2 của database/V17;
       Mock Test dùng `assessments` và `practice_sessions`, còn V19 tạo
       `notifications`.
- Chốt RAG/pgvector là MVP/Phase 1, `VECTOR(768)`, extension `vector` ở V15
       và yêu cầu output dimensionality/normalization khi lưu embedding.
- Chốt audit_logs và goal_history thuộc MVP/Phase 1; chỉ mức hoàn thiện tính
       năng được ghi ở roadmap Phase 23 và roadmap Phase 15 tương ứng.
- Chốt `notifications.type` là `VARCHAR(50)` mở và
       `import_batches.status` là `VARCHAR(30)` mở; cả hai không có CHECK,
       được kiểm soát ở Service Layer và chỉ thêm CHECK bằng migration Phase 2
       của database khi nghiệp vụ chốt enum.
- Không thêm entity hoặc bảng mới.
