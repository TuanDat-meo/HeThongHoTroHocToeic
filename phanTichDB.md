# TOEIC AI Learning — Database V2 Design

## 1. Mục tiêu

Database V2 được xây dựng dựa trên phạm vi chức năng của dự án **Hệ thống hỗ trợ học tập cá nhân hóa bằng AI cho TOEIC**.

Mục tiêu chính của DB:

- Quản lý người dùng và hồ sơ học tập.
- Quản lý ngân hàng Vocabulary và Reading.
- Quản lý quá trình luyện tập và kết quả từng câu.
- Phân tích điểm mạnh, điểm yếu.
- Hỗ trợ Bayesian Knowledge Tracing (BKT).
- Hỗ trợ Recommendation và Adaptive Difficulty.
- Hỗ trợ Adaptive Learning Path.
- Theo dõi Baseline / Progress / Post-test.
- Hỗ trợ Gemini AI.
- Chuẩn bị cho RAG với PostgreSQL + pgvector.
- Import dữ liệu Excel / Word / PDF / CSV.
- Phát hiện dữ liệu trùng và quản lý nội dung.
- Hỗ trợ Review, Bookmark và Notification.
- Hỗ trợ Audit cho Admin.
- Có khả năng mở rộng sang Full TOEIC Listening & Reading ở Phase 2.

---

# 2. Phân nhóm Database

Database được chia thành 8 nhóm chính:

1. User & Goal
2. Vocabulary
3. Reading & Question Bank
4. Practice & Assessment
5. Learning Analytics & Knowledge Tracing
6. Recommendation & Learning Path
7. AI & RAG
8. Import & Admin

---

# 3. USER & GOAL

## 3.1. users

Dùng cho tài khoản và phân quyền.

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| email | Email đăng nhập |
| password_hash | Mật khẩu đã mã hóa |
| display_name | Tên hiển thị |
| role | Vai trò người dùng |
| status | Trạng thái tài khoản |
| created_at | Thời gian tạo |
| updated_at | Thời gian cập nhật |

Chức năng:

- Đăng ký.
- Đăng nhập.
- Phân quyền.
- Quản lý trạng thái tài khoản.

---

## 3.2. learning_profiles

Lưu hồ sơ học tập của người dùng.

Các thông tin chính:

- user_id
- current_level
- target_score
- Các thuộc tính hồ sơ học tập khác theo Data Dictionary hiện tại.

Chức năng:

- Xác định trình độ hiện tại.
- Lưu mục tiêu TOEIC.
- Làm đầu vào cho Recommendation và Learning Path.

---

## 3.3. goal_history

Lưu lịch sử thay đổi mục tiêu.

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| user_id | Người dùng |
| old_target_score | Mục tiêu cũ |
| new_target_score | Mục tiêu mới |
| changed_at | Thời điểm thay đổi |

Ví dụ:

```text
500 → 550 → 650
```

---

# 4. VOCABULARY

## 4.1. vocabularies

Lưu từ vựng.

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| word | Từ tiếng Anh |
| normalized_word | Từ đã chuẩn hóa để chống trùng |
| part_of_speech | Từ loại |
| pronunciation | Phát âm |
| difficulty_id | Độ khó |
| source | Nguồn |
| status | Trạng thái |
| created_at | Thời gian tạo |
| updated_at | Thời gian cập nhật |

Khuyến nghị:

```sql
UNIQUE(normalized_word)
```

---

## 4.2. vocabulary_meanings

Một vocabulary có thể có nhiều nghĩa.

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| vocabulary_id | Vocabulary |
| meaning | Nghĩa |
| normalized_meaning | Nghĩa đã chuẩn hóa |
| created_at | Thời gian tạo |
| updated_at | Thời gian cập nhật |

Khuyến nghị:

```sql
UNIQUE(vocabulary_id, normalized_meaning)
```

Ví dụ:

```text
bank
├── ngân hàng
└── bờ sông
```

---

## 4.3. vocabulary_meaning_sources

Theo dõi nguồn của từng nghĩa.

Các thuộc tính chính:

- id
- vocabulary_meaning_id
- source_id
- source_reference
- created_at

---

## 4.4. vocabulary_progress

Theo dõi tiến trình học của từng user đối với từng vocabulary.

Các thuộc tính chính:

- id
- user_id
- vocabulary_id
- mastery_score
- retention
- ease_factor
- interval_days
- next_review_at
- last_reviewed_at
- created_at
- updated_at

Hỗ trợ:

```text
Học từ
→ Theo dõi tiến trình
→ Đánh giá khả năng nhớ
→ Đề xuất ôn tập
→ Spaced Repetition
```

---

# 5. READING & QUESTION BANK

## 5.1. reading_passages

Lưu bài đọc.

Các thuộc tính chính:

- id
- title
- content
- part
- skill_id
- topic_id
- difficulty_id
- source
- status
- created_at
- updated_at

---

## 5.2. questions

Đây là bảng cần bổ sung quan trọng trong DB hiện tại.

Đề xuất:

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| passage_id | Bài đọc liên quan |
| question_text | **Nội dung câu hỏi** |
| skill_id | Kỹ năng |
| topic_id | Chủ đề |
| difficulty_id | Độ khó |
| part | TOEIC Part |
| type | Loại câu hỏi |
| question_hash | Phát hiện câu hỏi trùng |
| status | Trạng thái |
| source | Nguồn |
| created_at | Thời gian tạo |
| updated_at | Thời gian cập nhật |

### Quan trọng

`question_text` là thuộc tính bắt buộc để Question Bank có thể hoạt động đầy đủ.

Có thể cân nhắc thêm:

```text
explanation
```

nếu muốn lưu lời giải cố định trong DB. Nếu Gemini sinh lời giải động thì không bắt buộc.

---

## 5.3. question_options

Lưu các lựa chọn.

Các thuộc tính:

- id
- question_id
- option_text
- is_correct
- display_order
- created_at
- updated_at

Ví dụ:

```text
A. ...
B. ...
C. ...
D. ...
```

---

## 5.4. question_vocabularies — tùy chọn

Có thể thêm bảng liên kết:

```text
question_vocabularies
```

với:

- question_id
- vocabulary_id

Mục đích:

```text
Question sai
→ Xác định vocabulary liên quan
→ Đề xuất học vocabulary đó
```

Bảng này **không bắt buộc cho MVP** nếu Vocabulary và Question được quản lý độc lập.

---

# 6. PRACTICE & ASSESSMENT

## 6.1. practice_sessions

Lưu một phiên luyện tập.

Các thông tin chính:

- id
- user_id
- started_at
- completed_at
- Các thuộc tính session hiện có trong Data Dictionary.

Chức năng:

```text
Bắt đầu luyện tập
→ Làm câu hỏi
→ Submit
→ Hoàn thành session
```

---

## 6.2. question_attempts

Đây là bảng dữ liệu quan trọng nhất cho Learning Analytics.

Các thuộc tính chính:

- id
- user_id
- session_id
- question_id
- selected_option_id
- is_correct
- response_time_ms
- skill_id
- difficulty_id
- created_at

Dữ liệu này cho phép phân tích:

- Câu đúng / sai.
- Kỹ năng.
- Độ khó.
- Thời gian trả lời.
- Recent Performance.
- Accuracy.
- Error Rate.

---

## 6.3. assessments

Dùng cho:

- Baseline Assessment.
- Progress Assessment.
- Post-test.

Các thuộc tính hiện có:

- id
- user_id
- type
- total_score
- duration_seconds
- taken_at

### Phase 2

Nên bổ sung:

```text
listening_score
reading_score
```

và giữ:

```text
total_score
```

MVP Vocabulary + Reading chưa bắt buộc sử dụng hai trường Listening/Reading.

---

## 6.4. assessment_results

Lưu kết quả chi tiết của Assessment.

Các thuộc tính chính:

- assessment_id
- skill_id
- correct
- total
- accuracy

### Phase 2

Nên bổ sung:

```text
part
```

để hỗ trợ thống kê:

```text
Part 1
Part 2
...
Part 7
```

---

# 7. LEARNING ANALYTICS & KNOWLEDGE TRACING

## 7.1. Không cần bảng analytics riêng cho mọi chỉ số

Các chỉ số như:

- Accuracy
- Error Rate
- Average Response Time
- Recent Accuracy

có thể tính từ:

```text
question_attempts
```

Ví dụ:

```text
question_attempts
→ Analytics Service
→ Accuracy
→ Error Rate
→ Response Time
→ Recent Performance
```

Không nên tạo quá nhiều bảng chỉ để lưu các chỉ số có thể tính lại.

---

## 7.2. skills

Danh mục kỹ năng.

Ví dụ:

```text
Vocabulary
Grammar
Reading Comprehension
Inference
Main Idea
...
```

---

## 7.3. topics

Danh mục chủ đề.

Ví dụ:

```text
Business
Travel
Office
Finance
Shopping
...
```

---

## 7.4. difficulty_levels

Danh mục độ khó.

Ví dụ:

```text
Easy
Medium
Hard
```

---

## 7.5. skill_profiles

Lưu snapshot năng lực của người học.

Các thông tin chính:

- user_id
- skill_id
- mastery_score
- accuracy
- avg_response_time_ms
- Các thuộc tính Learning Analytics hiện có.

Ví dụ:

```text
Grammar       82%
Vocabulary    76%
Reading       55%
Inference     43%
```

---

## 7.6. knowledge_states

Dùng cho Bayesian Knowledge Tracing.

Các thuộc tính:

- id
- user_id
- skill_id
- p_know
- p_learn
- p_guess
- p_slip
- updated_at

Luồng:

```text
Question Attempt
→ Skill
→ BKT
→ P(Know)
→ Knowledge State
```

---

# 8. RECOMMENDATION & LEARNING PATH

## 8.1. recommendations

Lưu một lần hệ thống tạo recommendation.

Dùng các dữ liệu:

- skill_profiles
- knowledge_states
- question_attempts
- vocabulary_progress
- difficulty
- topic

---

## 8.2. recommendation_items

Lưu các nội dung được đề xuất.

Có thể dùng:

```text
content_type
content_id
```

Ví dụ:

```text
Recommendation
├── Vocabulary: revenue
├── Vocabulary: invoice
├── Reading: Business Email
└── Question: Q123
```

Lưu ý: với mô hình `content_type + content_id`, tính toàn vẹn FK cần được kiểm soát ở application/service layer.

---

## 8.3. learning_paths

Lưu lộ trình học cá nhân.

Ví dụ:

```text
User A
Target: 650
```

---

## 8.4. learning_path_items

Các nội dung trong lộ trình.

Ví dụ:

```text
1. Vocabulary Business
2. Grammar
3. Reading
4. Practice
5. Assessment
```

Luồng:

```text
Analytics
→ Weakness
→ Recommendation
→ Learning Path
```

---

# 9. REVIEW

## 9.1. wrong_answer_notes

Lưu câu hỏi người học đã làm sai và ghi chú.

Luồng:

```text
Question sai
→ Wrong Answer Notebook
→ Review
→ Practice lại
```

---

## 9.2. bookmarks

Cho phép lưu nội dung yêu thích/cần xem lại.

Có thể áp dụng cho:

- Vocabulary.
- Reading.
- Question.
- Các content khác.

---

## 9.3. notifications

Hỗ trợ thông báo:

```text
Bạn có từ cần ôn hôm nay.

Bạn nên làm Progress Assessment.

Bạn còn X điểm để đạt mục tiêu.

Learning Path đã có nội dung mới.
```

---

# 10. AI & RAG

## 10.1. ai_interactions

Lưu lịch sử tương tác với Gemini.

Các thông tin chính:

- id
- user_id
- type
- prompt
- response
- created_at

Có thể phục vụ:

- Answer Explanation.
- Mistake Analysis.
- AI hỗ trợ học tập.

---

## 10.2. ai_generated_content

Lưu nội dung do AI sinh.

Ví dụ:

- Question.
- Vocabulary.
- Reading.
- Exercise.

Nên có trạng thái:

```text
GENERATED
PENDING_REVIEW
APPROVED
REJECTED
PUBLISHED
```

Nguyên tắc:

```text
AI Generate
→ Validation
→ Admin Review
→ Publish
```

Không nên tự động đưa nội dung AI chưa kiểm duyệt vào ngân hàng chính thức.

---

## 10.3. content_embeddings

Nếu RAG là một phần chính thức của kiến trúc, nên chuẩn bị bảng này.

Đề xuất:

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| content_type | Loại nội dung |
| content_id | ID nội dung |
| chunk_text | Nội dung chunk |
| embedding | Vector embedding |
| metadata | Metadata JSONB |
| created_at | Thời gian tạo |
| updated_at | Thời gian cập nhật |

Kiến trúc:

```text
Vocabulary / Reading / Question
→ Chunking
→ Embedding
→ PostgreSQL + pgvector
→ Similarity Search
→ Gemini
```

Lưu ý: `content_type + content_id` là quan hệ đa hình, nên FK trực tiếp không thể đảm bảo bằng một foreign key thông thường; application/service layer cần kiểm soát.

---

# 11. IMPORT & DATA QUALITY

## 11.1. content_sources

Theo dõi nguồn dữ liệu:

```text
Kaggle
Teacher
Admin
Excel
Word
PDF
CSV
...
```

---

## 11.2. import_batches

Một lần import dữ liệu.

Ví dụ:

```text
Import #001
File: vocabulary.xlsx
Status: COMPLETED
```

---

## 11.3. import_items

Theo dõi từng bản ghi import.

Có thể có trạng thái:

```text
VALID
INVALID
DUPLICATE
MERGED
PUBLISHED
```

Luồng:

```text
Upload
→ Import Batch
→ Import Items
→ Normalize
→ Validate
→ Duplicate Detection
→ Merge
→ Publish
```

---

# 12. ADMIN & AUDIT

## 12.1. audit_logs

Nên bổ sung để phục vụ Admin và Phase hardening.

Đề xuất:

| Thuộc tính | Mục đích |
|---|---|
| id | Khóa chính |
| user_id | Admin thực hiện |
| action | Hành động |
| entity_type | Loại đối tượng |
| entity_id | ID đối tượng |
| old_data | Dữ liệu trước thay đổi |
| new_data | Dữ liệu sau thay đổi |
| ip_address | IP |
| created_at | Thời gian |

Ví dụ:

```text
Admin
→ Edit Question Q001
→ Lưu old_data
→ Lưu new_data
→ audit_logs
```

---

# 13. ARCHIVE CONTENT

Các content chính nên hỗ trợ trạng thái:

```text
DRAFT
PENDING_REVIEW
PUBLISHED
ARCHIVED
```

Không nên xóa cứng nội dung đã từng được sử dụng nếu cần giữ lịch sử học tập.

Có thể dùng:

```text
status
```

kết hợp với:

```text
archived_at
```

nếu cần lưu thời điểm archive.

---

# 14. PHASE 2 — FULL TOEIC

## 14.1. audio_files

Dùng cho Listening.

Luồng:

```text
Audio
→ Listening Question
→ Options
→ Answer
→ Attempt
```

Cần kiểm tra quan hệ giữa:

```text
audio_files
```

và:

```text
questions
```

khi triển khai Phase 2.

---

## 14.2. Full TOEIC

Phase 2 có thể mở rộng:

```text
Listening Part 1–4
Reading Part 5–7
Full Test
Mock Test
Diagnostic Test
Review Center
Spaced Repetition
AI Listening
Transcript
```

---

# 15. Kiến trúc tổng thể

```text
USER
│
├── users
├── learning_profiles
└── goal_history
│
├────────────── VOCABULARY
│               ├── vocabularies
│               ├── vocabulary_meanings
│               ├── vocabulary_meaning_sources
│               └── vocabulary_progress
│
├────────────── CONTENT
│               ├── skills
│               ├── topics
│               ├── difficulty_levels
│               ├── reading_passages
│               ├── questions
│               └── question_options
│
├────────────── PRACTICE
│               ├── practice_sessions
│               ├── question_attempts
│               ├── assessments
│               └── assessment_results
│
├────────────── PERSONALIZATION
│               ├── skill_profiles
│               ├── knowledge_states
│               ├── recommendations
│               ├── recommendation_items
│               ├── learning_paths
│               └── learning_path_items
│
├────────────── REVIEW
│               ├── wrong_answer_notes
│               ├── bookmarks
│               └── notifications
│
├────────────── AI
│               ├── ai_interactions
│               ├── ai_generated_content
│               └── content_embeddings
│
├────────────── IMPORT
│               ├── content_sources
│               ├── import_batches
│               └── import_items
│
└────────────── ADMIN
                └── audit_logs
```

---

# 16. Những thay đổi quan trọng so với DB hiện tại

## 🔴 Bắt buộc cho MVP

### 1. Thêm `questions.question_text`

Đây là thay đổi quan trọng nhất.

---

## 🟡 Nên bổ sung

### 2. `updated_at` cho các bảng content có thể chỉnh sửa.

### 3. Chuẩn hóa `status` để hỗ trợ `ARCHIVED`.

### 4. Unique constraint:

```sql
UNIQUE(normalized_word)
```

và:

```sql
UNIQUE(vocabulary_id, normalized_meaning)
```

### 5. `audit_logs`

---

## 🔵 Chuẩn bị cho RAG

### 6. `content_embeddings`

Nếu RAG là kiến trúc chính thức.

---

## 🔵 Phase 2

### 7. `assessment_results.part`

### 8. `assessments.listening_score`

### 9. `assessments.reading_score`

### 10. Hoàn thiện quan hệ Audio ↔ Listening Question.

---

# 17. Migration đề xuất

> **Đã lỗi thời (deprecated).** Thứ tự migration dưới đây là bản phân tích ban đầu
> và không còn đúng (ví dụ `import` ở V14, `practice` ở V6, BKT ở V9). Thứ tự chính
> thức là mục 27 của `data-dictionary.md` (`import` ở V4, `assessment` ở V6,
> `practice` ở V8, knowledge tracing ở V10). Không dùng danh sách này khi viết migration.

Không nên tạo một migration khổng lồ.

Có thể chia:

```text
V1__create_users.sql

V2__create_learning_profile.sql

V3__create_learning_taxonomy.sql

V4__create_vocabulary.sql

V5__create_reading_question_bank.sql

V6__create_practice.sql

V7__create_assessment.sql

V8__create_learning_analytics.sql

V9__create_bkt.sql

V10__create_recommendation.sql

V11__create_learning_path.sql

V12__create_review.sql

V13__create_ai.sql

V14__create_import.sql

V15__create_embeddings.sql

V16__create_audit_logs.sql
```

Sau đó Phase 2:

```text
V17__add_full_toeic_support.sql
V18__add_listening.sql
V19__add_mock_test.sql
...
```

---

# 18. Nguyên tắc thiết kế cuối cùng

Database không cần biến mọi thuật toán thành một bảng.

Ví dụ:

```text
Accuracy
Error Rate
Weakness Score
Adaptive Difficulty
Recommendation Score
```

chủ yếu nên được xử lý ở:

```text
Spring Boot Service
        ↓
Algorithm / Analytics
        ↓
PostgreSQL
```

Trong khi DB tập trung lưu:

```text
Raw Learning Data
+
User State
+
Content
+
History
+
AI Data
+
Business State
```

Điều này giúp DB của dự án vừa đủ cho MVP, vừa có đường mở rộng lên Full TOEIC mà không phải thiết kế lại toàn bộ.
