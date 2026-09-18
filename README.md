# TOEIC-AI-Learning

> Hệ thống hỗ trợ học tập cá nhân hóa bằng AI cho TOEIC, tập trung vào Từ vựng và Reading trong phiên bản thử nghiệm. Hệ thống thu thập lịch sử học tập, phân tích năng lực theo từng kỹ năng, xác định điểm mạnh/điểm yếu, đề xuất nội dung phù hợp và sử dụng Gemini để giải thích, phân tích lỗi và bổ sung nội dung học tập.

---

## 1. Giới thiệu

**TOEIC-AI-Learning** là một web application hỗ trợ người học TOEIC theo hướng **cá nhân hóa dựa trên dữ liệu học tập**.

Khác với mô hình luyện thi chỉ tập trung vào làm câu hỏi và chấm đúng/sai, hệ thống lưu lại các thông tin trong quá trình học như:

- Kết quả đúng/sai.
- Thời gian trả lời.
- Kỹ năng/chủ đề của câu hỏi.
- Độ khó của nội dung.
- Lịch sử làm bài.
- Các lỗi lặp lại và kết quả gần đây.

Từ dữ liệu đó, hệ thống xây dựng hồ sơ năng lực của từng người học, ước lượng mức độ thành thạo theo kỹ năng và sử dụng cơ chế đề xuất để lựa chọn nội dung luyện tập phù hợp.

Gemini được sử dụng như một **thành phần AI hỗ trợ**, không thay thế toàn bộ logic nghiệp vụ. Backend vẫn chịu trách nhiệm chấm điểm, phân tích dữ liệu, Knowledge Tracing, Recommendation và kiểm soát chất lượng dữ liệu.

---

## 2. Mục tiêu

### 2.1. Mục tiêu chính

1. Xây dựng nền tảng luyện TOEIC trên web tập trung vào **Vocabulary và Reading**.
2. Theo dõi quá trình học tập của từng người dùng.
3. Phân tích điểm mạnh, điểm yếu theo kỹ năng và chủ đề.
4. Ước lượng mức độ thành thạo của người học theo thời gian.
5. Đề xuất nội dung học tập phù hợp với năng lực cá nhân.
6. Điều chỉnh độ khó của nội dung dựa trên kết quả học tập.
7. Sử dụng Gemini để giải thích đáp án, phân tích lỗi sai và sinh thêm nội dung khi cần.
8. Hỗ trợ nhập ngân hàng dữ liệu từ nhiều nguồn như Excel, Word, PDF và CSV.
9. Kiểm soát dữ liệu trùng lặp và hợp nhất các bản ghi Vocabulary có cùng nội dung.
10. Phân tích điểm mạnh, điểm yếu và đưa ra lời khuyên học tập phù hợp.
11. Xây dựng Learning Path thích ứng, cho phép người học học theo lộ trình hoặc học tự do.
12. Đo lường tiến bộ bằng kết quả từng bài, điểm tích lũy và so sánh trước/sau lộ trình.
13. Xây dựng hệ thống có khả năng kiểm thử, bảo trì và mở rộng.

### 2.2. Phạm vi phiên bản hiện tại

Phiên bản thử nghiệm tập trung vào:

- Vocabulary.
- Reading.
- Learning Analytics.
- Weakness Detection.
- Bayesian Knowledge Tracing (BKT).
- Content-Based Recommendation.
- Adaptive Difficulty.
- Gemini API.
- RAG.
- Import và chuẩn hóa dữ liệu.

### 2.3. Giai đoạn 2 – Hoàn thiện và mở rộng hệ thống

Sau khi phiên bản thử nghiệm Vocabulary + Reading hoạt động ổn định, hệ thống được mở rộng theo định hướng của đề tài nhóm:

- Hoàn thiện đầy đủ **TOEIC Listening Part 1–4**.
- Hoàn thiện đầy đủ **TOEIC Reading Part 5–7**.
- Xây dựng **Diagnostic Test** để xác định trình độ đầu vào.
- Xây dựng lộ trình theo mục tiêu điểm TOEIC, ví dụ **450+, 550+, 650+, 750+**.
- Hoàn thiện **Full/Mock Test** theo cấu trúc TOEIC Listening & Reading.
- Theo dõi thời gian làm bài theo từng Part và từng câu.
- Bổ sung Audio Player, Transcript và giải thích cho Listening.
- Bổ sung **Review Center / Wrong Answer Notebook** để người học xem lại các câu sai.
- Bổ sung Bookmark/đánh dấu nội dung cần ôn lại.
- Bổ sung thống kê tiến bộ theo Part 1–7, kỹ năng, chủ đề và theo thời gian.
- Cập nhật Learning Path sau mỗi bài test và sau mỗi giai đoạn học.
- Hoàn thiện cơ chế **AI Question Generation** theo skill, topic và difficulty.
- Bổ sung xử lý request AI bất đồng bộ bằng **Message Queue** khi cần kiểm soát rate-limit hoặc các tác vụ sinh nội dung số lượng lớn.
- Hoàn thiện Admin Content Management, import, validate, duplicate detection, merge và publish.
- Bổ sung thông báo/nhắc học và các nhiệm vụ học tập theo ngày nếu phạm vi triển khai cho phép.
- Mở rộng Knowledge Tracing từ BKT sang **SAKT/AKT** để nghiên cứu và so sánh.
- Có thể mở rộng từ Content-Based Recommendation sang **Hybrid Recommendation**.

### 2.4. Định hướng mở rộng dài hạn

Các tính năng sau không bắt buộc trong Giai đoạn 2, có thể thực hiện khi dự án tiếp tục phát triển:

- Speaking.
- Writing.
- Knowledge Graph.
- Các mô hình Knowledge Tracing nâng cao khác.
- Triển khai Kubernetes ở mức cơ bản khi cần trình diễn hoặc mở rộng hạ tầng.

---

## 3. Điểm nổi bật của hệ thống

### 3.1. Cá nhân hóa dựa trên lịch sử học tập

Hệ thống không đưa cùng một lộ trình cho mọi người học. Các đề xuất dựa trên dữ liệu thực tế của từng người dùng:

```text
Learning History
      ↓
Learning Analytics
      ↓
Weakness Analysis
      ↓
Knowledge Tracing
      ↓
Learner Knowledge Profile
      ↓
Recommendation
      ↓
Personalized Content
```

### 3.2. Theo dõi điểm yếu theo kỹ năng

Ví dụ hệ thống có thể nhận diện:

```text
Vocabulary                 0.70
Main Idea                  0.76
Detail                     0.81
Inference                  0.45
Vocabulary in Context      0.38
```

Từ đó ưu tiên nội dung liên quan đến các kỹ năng có mức độ thành thạo thấp.

### 3.3. Knowledge Tracing

Phiên bản đầu sử dụng **Bayesian Knowledge Tracing (BKT)** để cập nhật trạng thái kiến thức của người học sau từng lần tương tác.

Thay vì chỉ lưu:

> Người học đúng 60%.

hệ thống hướng tới việc ước lượng:

> Người học hiện đang thành thạo kỹ năng X ở mức nào?

Đây là cơ sở để Recommendation Engine đưa ra đề xuất theo trạng thái học tập hiện tại.

### 3.4. Adaptive Difficulty

Độ khó của bài tập có thể được điều chỉnh theo kết quả gần đây của người học.

Ví dụ:

```text
Kết quả thấp liên tục
        ↓
Giảm độ khó

Kết quả ổn định cao
        ↓
Tăng độ khó
```

Việc thay đổi độ khó không dựa trên một lần làm bài duy nhất mà ưu tiên xu hướng của nhiều lần học gần đây.

### 3.5. AI có kiểm soát

Gemini không quyết định toàn bộ hệ thống.

Backend chịu trách nhiệm:

- Chấm đúng/sai.
- Tính điểm.
- Phân tích thời gian.
- Phát hiện điểm yếu.
- Knowledge Tracing.
- Recommendation.
- Điều chỉnh độ khó.
- Kiểm tra dữ liệu AI sinh ra.

Gemini chịu trách nhiệm:

- Giải thích đáp án.
- Phân tích lỗi sai.
- Giải thích từ vựng.
- Sinh câu hỏi.
- Sinh bài Reading bổ sung.
- Bổ sung bài tập theo nhu cầu.

### 3.6. RAG dựa trên dữ liệu của hệ thống

Khi Gemini cần thông tin liên quan đến nội dung trong ngân hàng dữ liệu, hệ thống có thể truy xuất context trước khi gửi yêu cầu cho AI.

```text
Question / Passage / Vocabulary
              ↓
          Retrieval
              ↓
      Relevant Context
              ↓
            Gemini
              ↓
     Grounded Response
```

Ưu tiên PostgreSQL kết hợp `pgvector` khi triển khai vector retrieval để giảm số lượng dịch vụ bên ngoài và giữ chi phí thấp.

### 3.7. Ngân hàng Vocabulary chống trùng

Khi nhập nhiều nguồn dữ liệu, hệ thống chuẩn hóa trước khi lưu.

Ví dụ:

```text
Implement
implement
 IMPLEMENT
```

được chuẩn hóa thành:

```text
implement
```

Nếu cùng từ và cùng nghĩa:

```text
implement → thực hiện
implement → thực hiện
```

thì gộp thành một nghĩa.

Nếu cùng từ nhưng nghĩa khác:

```text
implement → thực hiện
implement → thực thi
```

thì giữ một Vocabulary nhưng bổ sung nghĩa mới.

Mô hình dữ liệu:

```text
vocabularies
      │
      └── vocabulary_meanings
                │
                └── vocabulary_meaning_sources
```

### 3.8. Import nhiều nguồn

Hệ thống định hướng hỗ trợ:

- Excel.
- Word.
- PDF.
- CSV.

Quy trình:

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

Không insert trực tiếp dữ liệu chưa kiểm tra vào bảng nghiệp vụ.

---

## 4. Kiến trúc hệ thống

Hệ thống sử dụng kiến trúc **Modular Monolith** kết hợp **Feature-based Structure**.

Không tách AI thành một microservice riêng trong phiên bản đầu.

```text
                         ┌────────────────────┐
                         │      Next.js       │
                         │      Frontend      │
                         └─────────┬──────────┘
                                   │
                              REST API + JWT
                                   │
                                   ▼
                         ┌────────────────────┐
                         │    Spring Boot     │
                         │      Backend       │
                         └─────────┬──────────┘
                                   │
              ┌────────────────────┼─────────────────────┐
              │                    │                     │
              ▼                    ▼                     ▼
       ┌──────────────┐    ┌───────────────┐    ┌────────────────┐
       │ PostgreSQL   │    │  Algorithms   │    │   AI Module    │
       │              │    │               │    │                │
       │ User Data    │    │ Analytics     │    │ Gemini         │
       │ Questions    │    │ BKT           │    │ RAG            │
       │ Vocabulary   │    │ Recommendation│    │ AI Validation  │
       │ Attempts     │    │ Difficulty    │    │                │
       └──────────────┘    └───────────────┘    └────────────────┘
```

### 4.1. Nguyên tắc phụ thuộc

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

Entity không trực tiếp gọi AI hoặc xử lý nghiệp vụ phức tạp.

DTO được tách khỏi Entity để hạn chế phụ thuộc giữa model DB và API.

---

## 5. Công nghệ sử dụng

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Frontend | Next.js + TypeScript | Web application |
| UI | Tailwind CSS + shadcn/ui | Giao diện |
| Data fetching | TanStack Query | Quản lý dữ liệu từ API |
| Form | React Hook Form + Zod | Form và validation |
| Chart | Recharts | Biểu đồ tiến độ |
| Backend | Spring Boot | REST API và business logic |
| Language | Java 21 | Backend |
| Security | Spring Security + JWT | Authentication/Authorization |
| ORM | Spring Data JPA + Hibernate | Truy xuất PostgreSQL |
| Validation | Jakarta Validation | Kiểm tra dữ liệu |
| API Docs | SpringDoc OpenAPI | Swagger/OpenAPI |
| Database | PostgreSQL | Lưu trữ dữ liệu quan hệ |
| Migration | Flyway | Quản lý thay đổi schema |
| AI | Gemini API | Explanation, analysis, generation |
| RAG | PostgreSQL + pgvector | Retrieval theo dữ liệu nội bộ khi cần |
| Unit Test | JUnit 5 + Mockito | Kiểm thử backend |
| Integration | Spring Boot Test | Integration Test |
| API Test | Postman | Kiểm thử REST API |
| Frontend Test | Vitest + Testing Library | Unit/UI test frontend |
| E2E | Playwright (tùy phạm vi) | Kiểm thử luồng người dùng |
| Container | Docker + Docker Compose | Môi trường chạy thống nhất |
| Version Control | Git + GitHub | Quản lý mã nguồn |
| CI/CD | GitHub Actions | Tự động build/test |
| Message Queue (Phase 2) | RabbitMQ (tùy chọn) | Xử lý AI request bất đồng bộ và rate-limit khi tải tăng |
| Vector Search (Phase 2) | PostgreSQL + pgvector | RAG/retrieval theo dữ liệu nội bộ |
| Cache (Phase 2, tùy nhu cầu) | Redis | Cache và giảm truy vấn lặp khi tải tăng |

### 5.1. Nguyên tắc chi phí

Ưu tiên công nghệ:

- Open-source.
- Free tier khi phù hợp.
- Chạy local trong quá trình phát triển.
- Docker Compose thay cho hạ tầng phức tạp.

Không đưa vào MVP:

- Kubernetes.
- Kafka.
- RabbitMQ / Message Queue.
- Elasticsearch.
- Redis.
- Cloud database trả phí.
- Microservices.

Ở Giai đoạn 2, RabbitMQ và/hoặc Redis chỉ được thêm khi hệ thống thực sự cần xử lý AI bất đồng bộ, kiểm soát rate-limit hoặc cache khi tải tăng.

Gemini API cần được sử dụng có kiểm soát quota/free tier. Hệ thống chỉ gọi AI khi thực sự cần và có thể lưu lại kết quả AI để hạn chế gọi lặp.

---

## 6. Các chức năng chính

### 6.1. Authentication và User

- Đăng ký.
- Đăng nhập.
- JWT authentication.
- Quản lý hồ sơ người dùng.
- Phân quyền Admin và User/Student.

### 6.2. Vocabulary

- Xem kho từ vựng.
- Tìm kiếm từ.
- Lọc theo chủ đề.
- Lọc theo độ khó.
- Xem nhiều nghĩa của một từ.
- Ví dụ và thông tin liên quan.
- Theo dõi tiến độ học từng từ.
- Đề xuất từ vựng phù hợp với năng lực.

### 6.3. Reading

- Quản lý Reading Passage.
- Phân loại theo chủ đề.
- Phân loại theo độ khó.
- Câu hỏi trắc nghiệm.
- Theo dõi kỹ năng như Main Idea, Detail, Inference, Vocabulary in Context.
- Đề xuất bài Reading phù hợp.

### 6.4. Practice

- Tạo Practice Session.
- Làm câu hỏi.
- Ghi nhận đáp án.
- Ghi nhận đúng/sai.
- Ghi nhận response time.
- Xem kết quả.

### 6.5. Learning Analytics

- Accuracy.
- Error Rate.
- Average Response Time.
- Recent Performance.
- Thống kê theo skill.
- Thống kê theo topic.
- Theo dõi xu hướng tiến bộ.

### 6.6. Phân tích điểm mạnh, điểm yếu và lời khuyên

Hệ thống kết hợp nhiều tín hiệu để xác định nội dung người học cần ưu tiên:

- Accuracy.
- Error Rate.
- Average Response Time.
- Recent Performance.
- Knowledge State từ BKT.

Kết quả được chia thành:

```text
Điểm mạnh
   ↓
Những skill có mastery và hiệu suất ổn định cao

Điểm yếu / cần cải thiện
   ↓
Những skill có error rate cao, mastery thấp hoặc response time cao
```

Hệ thống không chỉ hiển thị skill yếu mà còn đưa ra lời khuyên như:

```text
Weakness
   ↓
Reason
   ↓
Advice
   ↓
Recommended content
```

Ví dụ:

```text
Inference
Accuracy = 48%
Mastery = 0.41
Response Time = 25s

Khuyến nghị:
- Ôn cách xác định thông tin suy luận.
- Luyện câu Easy.
- Chuyển sang Medium khi kết quả ổn định.
```

### 6.7. Learning Path thích ứng

Hệ thống có thể tạo một lộ trình học dựa trên:

- Mục tiêu của người học.
- Trình độ hiện tại.
- Điểm mạnh/điểm yếu.
- Knowledge State.
- Nội dung đã hoàn thành.
- Kết quả gần đây.

Một Learning Path có thể có dạng:

```text
Baseline Assessment
        ↓
Vocabulary Foundation
        ↓
Inference - Easy
        ↓
Inference - Medium
        ↓
Reading Practice
        ↓
Review Errors
        ↓
Post-test
        ↓
Cập nhật Learning Path mới
```

Người học có hai chế độ:

**Guided Learning / Học theo lộ trình:** hệ thống đề xuất thứ tự học và nội dung tiếp theo.

**Free Learning / Học tự do:** người học tự chọn Vocabulary, Reading, Topic, Skill hoặc Difficulty. Các lần học tự do vẫn được lưu vào lịch sử, cập nhật BKT, Skill Profile và Recommendation.

### 6.8. Đo lường tiến bộ trước và sau

Hệ thống lưu các mốc đánh giá để đo sự thay đổi theo thời gian:

```text
Baseline
   ↓
Learning Path
   ↓
Practice / Free Learning
   ↓
Progress Assessments
   ↓
Post-test
   ↓
Improvement Report
```

Các chỉ số chính:

**Accuracy của từng bài test**

```text
Accuracy = Correct / Total × 100
```

**Accuracy tích lũy**

```text
Cumulative Accuracy = Sum(Correct) / Sum(Total) × 100
```

Không lấy trung bình đơn giản của các phần trăm từng bài nếu số lượng câu hỏi giữa các bài khác nhau.

**Cải thiện trước/sau**

```text
Absolute Improvement = Post-test - Baseline
```

Ví dụ:

```text
Baseline = 55%
Post-test = 78%

Cải thiện = +23 điểm phần trăm
```

Có thể bổ sung mức cải thiện tương đối:

```text
Relative Improvement = (Post-test - Baseline) / Baseline × 100
```

Hệ thống cũng hiển thị điểm tích lũy và hiệu suất gần đây để tránh việc kết quả cũ che khuất xu hướng tiến bộ hiện tại.

Ví dụ Dashboard:

```text
Baseline                 55%
Current                  78%
Improvement               +23 điểm %
Cumulative Accuracy       68.1%
Recent Accuracy           81%

Inference                 41% → 69%
Vocabulary in Context     38% → 69%
Main Idea                 72% → 81%
```

Kết quả trước/sau được trình bày như **mức cải thiện quan sát được trong các bài đánh giá**, không khẳng định rằng AI là nguyên nhân duy nhất của sự thay đổi.

### 6.9. Knowledge Tracing

- Theo dõi mastery của từng skill.
- Cập nhật Knowledge State sau mỗi lần tương tác.
- Dùng BKT trong phiên bản đầu.
- Có thể mở rộng SAKT/AKT ở giai đoạn nghiên cứu nâng cao.

### 6.10. Recommendation

- Xác định nội dung phù hợp.
- Ưu tiên skill yếu.
- Điều chỉnh theo difficulty.
- Điều chỉnh theo kết quả gần đây.
- Đề xuất Vocabulary.
- Đề xuất Reading.
- Đề xuất Practice.

### 6.11. AI / Gemini

- Explain Answer.
- Analyze Mistake.
- Explain Vocabulary.
- Generate Question.
- Generate Reading.
- Generate Exercise.
- Hỗ trợ nội dung theo skill/topic/difficulty.

### 6.12. Admin Content Management

- Quản lý Vocabulary.
- Quản lý Vocabulary Meaning.
- Quản lý Reading.
- Quản lý Question Bank.
- Import dữ liệu.
- Preview dữ liệu.
- Kiểm tra lỗi.
- Kiểm tra duplicate.
- Merge dữ liệu.
- Publish dữ liệu.

---

## 7. Thuật toán và mô hình

### 7.1. Learning Analytics

Các chỉ số cơ bản:

$$
Accuracy = \frac{Correct}{Total}
$$

$$
ErrorRate = 1 - Accuracy
$$

$$
AverageResponseTime = \frac{\sum ResponseTime}{N}
$$

Kết quả được phân tích theo user, skill, topic, difficulty và khoảng thời gian.

### 7.2. Weighted Weakness Score

Dùng làm baseline cho Weakness Detection.

Ví dụ:

$$
WeaknessScore = w_1 ErrorRate + w_2 TimeScore + w_3 RecentErrorRate
$$

Một bộ trọng số có thể được thiết lập và hiệu chỉnh trong quá trình thực nghiệm.

Điểm số càng cao thì mức độ cần ưu tiên hỗ trợ càng lớn.

### 7.3. Time-weighted Performance

Các kết quả gần đây có thể được ưu tiên hơn kết quả cũ.

Ví dụ dạng suy giảm theo thời gian:

$$
Weight(t) = e^{-\lambda t}
$$

Mục tiêu là tránh việc kết quả quá cũ ảnh hưởng ngang với kết quả mới.

### 7.4. Bayesian Knowledge Tracing (BKT)

BKT được sử dụng để mô hình hóa xác suất người học đã nắm được một kỹ năng.

Khái niệm chính:

- Probability of Knowledge.
- Learning Probability.
- Guess Probability.
- Slip Probability.

Sau mỗi lần trả lời, trạng thái kiến thức được cập nhật.

BKT được chọn vì:

- Dễ giải thích.
- Phù hợp với dữ liệu chuỗi tương tác học tập.
- Không yêu cầu GPU.
- Phù hợp với quy mô dữ liệu ban đầu.
- Dễ triển khai và kiểm thử.

### 7.5. Content-Based Recommendation

Mỗi nội dung có metadata như:

- Skill.
- Topic.
- Difficulty.
- Question Type.

Recommendation Engine so khớp nội dung với hồ sơ người học.

Ví dụ:

```text
Inference mastery thấp
        ↓
Ưu tiên câu hỏi skill = Inference
```

### 7.6. Recommendation Score

Có thể sử dụng:

$$
RecommendationScore =
\alpha WeaknessMatch +
\beta DifficultyMatch +
\gamma TopicMatch +
\delta RecentNeed
$$

Trọng số được điều chỉnh trong quá trình thực nghiệm.

### 7.7. Adaptive Difficulty

Độ khó được điều chỉnh dựa trên xu hướng kết quả của người học thay vì chỉ một lần làm bài.

Ví dụ:

```text
Hiệu suất thấp ổn định
→ Easy / Medium

Hiệu suất tốt ổn định
→ Medium / Hard
```

### 7.8. Duplicate Detection

#### Vocabulary

```text
Raw Text
   ↓
Trim
   ↓
Lowercase
   ↓
Normalize Spaces
   ↓
Normalized Text
```

Sau đó kiểm tra:

```text
word_normalized
+
meaning_normalized
```

Nếu giống nhau → gộp.

Nếu word giống nhưng meaning khác → bổ sung meaning.

#### Question

Có thể tạo `question_hash` dựa trên dữ liệu đã chuẩn hóa:

```text
normalized question text
+
normalized options
+
correct answer
```

Nếu hash trùng → không tạo duplicate.

### 7.9. Similarity Detection

Có thể dùng các kỹ thuật như Jaccard Similarity hoặc Cosine Similarity để **gợi ý** nội dung gần trùng.

Similarity cao không nên tự động merge toàn bộ dữ liệu quan trọng. Có thể chuyển sang trạng thái cần Admin kiểm tra.

### 7.10. SAKT / AKT

SAKT hoặc AKT là lựa chọn nâng cao nếu nhóm muốn nghiên cứu Knowledge Tracing bằng attention/Transformer.

Cách triển khai đề xuất:

```text
Baseline: BKT
       ↓
Advanced: SAKT / AKT
       ↓
So sánh
       ↓
AUC / Accuracy / F1 / Calibration
```

Các mô hình này không bắt buộc để hoàn thành MVP.

---

## 8. AI và RAG

### 8.1. Vai trò của Gemini

Gemini là AI/LLM hỗ trợ các tác vụ có tính ngôn ngữ và sinh nội dung:

```text
Answer Explanation
Mistake Analysis
Vocabulary Explanation
Question Generation
Reading Generation
Exercise Generation
```

### 8.2. Vai trò của Backend

```text
Backend
├── Score
├── Analytics
├── Weakness
├── BKT
├── Recommendation
├── Difficulty
├── Validation
└── Data Integrity
```

### 8.3. RAG Flow

```text
User Request
      ↓
Retrieve relevant content
      ↓
Build context
      ↓
Gemini
      ↓
Validate output
      ↓
Return response
```

RAG giúp câu trả lời của AI có context từ dữ liệu của hệ thống thay vì chỉ dựa vào kiến thức tổng quát của model.

### 8.4. AI Output Validation

Nội dung do Gemini sinh ra cần được kiểm tra.

Ví dụ Question Generation:

```text
Generated Question
      ↓
Có đủ A/B/C/D?
      ↓
Có đúng 1 đáp án?
      ↓
Skill đúng?
      ↓
Difficulty phù hợp?
      ↓
Có duplicate?
      ↓
Publish / Reject
```

---

## 9. Thiết kế Database

### 9.1. Nhóm User

```text
users
learning_profiles
skill_profiles
```

### 9.2. Nhóm Vocabulary

```text
vocabularies
vocabulary_meanings
vocabulary_progress
vocabulary_meaning_sources
```

### 9.3. Nhóm Reading / Question

```text
reading_passages
questions
question_options
```

### 9.4. Nhóm Learning

```text
practice_sessions
question_attempts
```

### 9.5. Nhóm Assessment / Progress

```text
assessments
assessment_results
```

`assessments` lưu các mốc đánh giá như `BASELINE`, `PROGRESS`, `POST_TEST`, `DIAGNOSTIC`, `FINAL`.

`assessment_results` lưu kết quả chi tiết theo từng skill để có thể so sánh trước/sau.

### 9.6. Nhóm Learning Path

```text
learning_paths
learning_path_items
```

`learning_paths` lưu lộ trình đang hoạt động của người học và liên kết với Baseline/Post-test khi áp dụng.

`learning_path_items` lưu từng bước trong lộ trình, thứ tự, skill, difficulty, nội dung và trạng thái hoàn thành.

### 9.7. Nhóm Recommendation

```text
recommendations
recommendation_items
```

### 9.8. Nhóm AI

```text
ai_interactions
```

### 9.9. Nhóm Content / Import

```text
content_sources
import_batches
import_items
```

### 9.10. Bảng quan trọng nhất cho personalization

`question_attempts` lưu:

- `user_id`
- `question_id`
- `selected_option_id`
- `is_correct`
- `response_time_ms`
- `skill`
- `difficulty`
- `created_at`

Đây là nguồn dữ liệu để xây dựng:

```text
Question Attempts
      ↓
Analytics
      ↓
Weakness
      ↓
BKT
      ↓
Recommendation
```

---

## 10. Data Import và Deduplication

### 10.1. Nguồn dữ liệu

```text
Excel
Word
PDF
CSV
Manual Entry
AI Generated
System
```

### 10.2. Import Batch

`import_batches` đại diện cho một lần nhập dữ liệu.

Ví dụ:

```text
TOEIC_Vocabulary.xlsx
1000 records
985 success
15 failed
```

`import_items` lưu trạng thái từng record:

```text
SUCCESS
FAILED
DUPLICATE
MERGED
```

và có thể lưu `error_message` để Admin biết lỗi cụ thể.

### 10.3. Vocabulary Merge

```text
Source A
implement → thực hiện

Source B
implement → thực hiện

Source C
implement → thực thi
```

Kết quả:

```text
implement
├── thực hiện
│   ├── Source A
│   └── Source B
│
└── thực thi
    └── Source C
```

Không nhân bản từ `implement` thành nhiều record chỉ vì có nhiều nguồn dữ liệu.

### 10.4. Question Import

Question phải được chuẩn hóa và kiểm tra duplicate trước khi publish.

---

## 11. Cấu trúc thư mục

```text
TOEIC-AI-Learning/
│
├── frontend/
│   └── toeic-web/
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   └── register/
│       │   │
│       │   ├── dashboard/
│       │   ├── vocabulary/
│       │   ├── reading/
│       │   ├── practice/
│       │   ├── result/
│       │   ├── recommendation/
│       │   ├── progress/
│       │   ├── profile/
│       │   └── admin/
│       │       ├── vocabulary/
│       │       ├── questions/
│       │       ├── reading/
│       │       └── imports/
│       │
│       ├── components/
│       ├── services/
│       ├── hooks/
│       ├── types/
│       ├── lib/
│       └── tests/
│
├── backend/
│   └── toeic-api/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/toeic/ai/
│       │   │   │   ├── common/
│       │   │   │   ├── config/
│       │   │   │   ├── security/
│       │   │   │   ├── auth/
│       │   │   │   ├── user/
│       │   │   │   ├── vocabulary/
│       │   │   │   ├── reading/
│       │   │   │   ├── question/
│       │   │   │   ├── practice/
│       │   │   │   ├── analytics/
│       │   │   │   ├── knowledge/
│       │   │   │   ├── recommendation/
│       │   │   │   ├── ai/
│       │   │   │   └── importdata/
│       │   │   │
│       │   │   └── resources/
│       │   │       ├── application.yml
│       │   │       ├── application-dev.yml
│       │   │       └── application-test.yml
│       │   │
│       │   └── test/java/com/toeic/ai/
│       │       ├── vocabulary/
│       │       ├── question/
│       │       ├── knowledge/
│       │       ├── recommendation/
│       │       ├── ai/
│       │       └── importdata/
│       │
│       ├── pom.xml
│       └── Dockerfile
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── README.md
│
├── postman/
│   └── TOEIC-AI.postman_collection.json
│
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── database/
│   ├── algorithms/
│   ├── api/
│   └── testing/
│
├── docker/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## 12. Backend Module Structure

Backend sử dụng **package-by-feature** để dễ tìm kiếm và bảo trì.

Mỗi module nghiệp vụ có cấu trúc tương đối:

```text
module/
├── controller/
├── service/
├── repository/
├── entity/
└── dto/
```

### Ví dụ Vocabulary

```text
vocabulary/
├── controller/
│   └── VocabularyController.java
├── service/
│   ├── VocabularyService.java
│   ├── VocabularyMergeService.java
│   └── VocabularyProgressService.java
├── repository/
├── entity/
└── dto/
```

### Knowledge

```text
knowledge/
├── controller/
├── service/
│   ├── KnowledgeTracingService.java
│   ├── BktService.java
│   └── KnowledgeStateUpdater.java
├── model/
└── dto/
```

Thiết kế interface cho Knowledge Tracing cho phép mở rộng:

```text
KnowledgeTracingService
        │
        ├── BktService
        └── SaktService (Future)
```

### Recommendation

```text
recommendation/
├── controller/
├── service/
│   ├── RecommendationService.java
│   ├── RecommendationEngine.java
│   ├── ContentBasedRecommendation.java
│   ├── RecommendationScoreService.java
│   └── DifficultyAdaptationService.java
├── repository/
├── entity/
└── dto/
```

### AI

```text
ai/
├── controller/
├── service/
│   ├── AIService.java
│   ├── GeminiService.java
│   ├── PromptService.java
│   └── AIValidationService.java
├── rag/
│   ├── Retriever.java
│   ├── ContextBuilder.java
│   └── RagService.java
├── repository/
├── entity/
└── dto/
```

### Import

```text
importdata/
├── controller/
├── parser/
│   ├── ExcelParser.java
│   ├── WordParser.java
│   ├── PdfParser.java
│   └── CsvParser.java
├── normalize/
├── validator/
├── service/
├── repository/
├── entity/
└── dto/
```

---

## 13. REST API định hướng

API sử dụng versioning:

```text
/api/v1
```

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Vocabulary

```http
GET /api/v1/vocabulary
GET /api/v1/vocabulary/{id}
GET /api/v1/vocabulary/recommended
```

### Reading

```http
GET /api/v1/reading
GET /api/v1/reading/{id}
GET /api/v1/reading/recommended
```

### Practice

```http
POST /api/v1/practice/start
POST /api/v1/practice/{id}/submit
GET /api/v1/practice/{id}/result
```

### Analytics

```http
GET /api/v1/analytics/performance
GET /api/v1/analytics/weakness
```

### Knowledge

```http
GET /api/v1/knowledge/profile
GET /api/v1/knowledge/skills
```

### Recommendation

```http
GET /api/v1/recommendations
GET /api/v1/recommendations/{id}
```

### Learning Progress / Assessment

```http
GET /api/v1/progress
GET /api/v1/progress/cumulative
GET /api/v1/progress/improvement
POST /api/v1/assessments/baseline/start
POST /api/v1/assessments/{id}/submit
GET /api/v1/assessments/{id}/result
```

### Learning Path

```http
GET /api/v1/learning-path
GET /api/v1/learning-path/current
POST /api/v1/learning-path/generate
POST /api/v1/learning-path/{id}/select-mode
POST /api/v1/learning-path/{id}/items/{itemId}/complete
```

### AI

```http
POST /api/v1/ai/explain-answer
POST /api/v1/ai/analyze-mistake
POST /api/v1/ai/generate-question
```

### Import

```http
POST /api/v1/admin/import/vocabulary
POST /api/v1/admin/import/questions
POST /api/v1/admin/import/reading
GET /api/v1/admin/import/{id}
```

---

## 14. Learning Flow

```text
                    User
                     │
                     ▼
                Do Practice
                     │
                     ▼
             Question Attempts
                     │
                     ▼
              Learning Analytics
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
 Weakness Analysis          Knowledge Tracing
        │                         │
        └────────────┬────────────┘
                     ▼
             Learner Profile
                     │
                     ▼
          Recommendation Engine
                     │
                     ▼
             Adaptive Difficulty
                     │
             ┌───────┴────────┐
             ▼                ▼
      Existing Content    Need More Content
             │                │
             │                ▼
             │               RAG
             │                │
             │             Gemini
             │                │
             └────────┬───────┘
                      ▼
             Personalized Content
                      │
                      ▼
                     User
```

---

## 15. Learning Progress & Adaptive Learning Path

Đây là một thành phần cốt lõi của hệ thống cá nhân hóa. Hệ thống không chỉ xác định người học yếu ở đâu mà còn theo dõi sự thay đổi trước và sau khi áp dụng nội dung/lộ trình học.

### 15.1. Baseline → Learning → Post-test

```text
Baseline Assessment
        ↓
Strength / Weakness Analysis
        ↓
Advice
        ↓
Learning Path
        ↓
Guided Learning hoặc Free Learning
        ↓
Practice / Progress Assessments
        ↓
Post-test
        ↓
Before / After Analysis
        ↓
Updated Learning Path
```

### 15.2. Hai chế độ học

**Guided Learning:** người học chọn theo lộ trình, hệ thống đưa ra thứ tự nội dung và bước tiếp theo.

**Free Learning:** người học tự chọn nội dung. Hệ thống vẫn lưu attempt, cập nhật BKT, điểm tích lũy, skill profile và recommendation.

### 15.3. Chỉ số tiến bộ

Hệ thống hiển thị đồng thời:

- Điểm của từng bài test.
- Accuracy tích lũy trên toàn bộ câu hỏi đã làm.
- Accuracy gần đây.
- Baseline.
- Current Performance.
- Post-test.
- Cải thiện theo điểm phần trăm.
- Cải thiện tương đối.
- Cải thiện theo từng skill.

Ví dụ:

```text
                Baseline     Current     Improvement
Vocabulary        55%          76%          +21 điểm %
Inference         41%          69%          +28 điểm %
Main Idea         72%          81%           +9 điểm %

Overall           55%          78%          +23 điểm %
Cumulative Accuracy: 68.1%
Recent Accuracy:     81%
```

### 15.4. Adaptive Learning Path

Lộ trình được cập nhật dựa trên kết quả mới. Nếu mastery hoặc hiệu suất chưa đạt yêu cầu, hệ thống có thể quay lại bước củng cố. Nếu kết quả ổn định tốt, hệ thống có thể tăng difficulty hoặc chuyển sang skill tiếp theo.

```text
Inference mastery = 0.39
        ↓
Inference Easy
        ↓
Inference Medium
        ↓
Post-test
        ↓
Mastery = 0.71
        ↓
Chuyển sang nội dung khó hơn / skill tiếp theo
```

### 15.5. Progress Report

Báo cáo có thể hiển thị:

```text
BÁO CÁO TIẾN BỘ

Baseline              55%
Current               78%
Improvement            +23 điểm %
Cumulative Accuracy   68.1%
Recent Accuracy        81%

Điểm mạnh
- Main Idea
- Vocabulary

Điểm cần cải thiện
- Inference
- Vocabulary in Context

Lộ trình
- Đã hoàn thành: 8/10 bước
- Bước hiện tại: Inference - Medium

Lời khuyên tiếp theo
- Hoàn thành Inference - Medium
- Ôn Vocabulary in Context
- Làm Post-test
```

## 15.6. Phase 2 – Các tính năng hoàn thiện bổ sung

Giai đoạn 2 bổ sung các tính năng còn thiếu để hệ thống tiến từ bản thử nghiệm Vocabulary + Reading sang nền tảng TOEIC Listening & Reading hoàn chỉnh. Các chức năng được triển khai theo thứ tự ưu tiên, không bắt buộc bật toàn bộ ngay từ đầu.

### 15.6.1. Diagnostic Test và mục tiêu điểm

Người học có thể thực hiện bài kiểm tra đầu vào để tạo Baseline. Sau đó chọn mục tiêu điểm, ví dụ 450+, 550+, 650+ hoặc 750+. Hệ thống dùng khoảng cách giữa Baseline và Goal để điều chỉnh Learning Path.

### 15.6.2. Full TOEIC Listening & Reading

Phase 2 hoàn thiện Listening Part 1–4 và Reading Part 5–7, bao gồm dữ liệu audio, transcript, timer, phân loại Part/skill/topic/difficulty và thống kê kết quả chi tiết.

### 15.6.3. Mock Test và đánh giá định kỳ

Bổ sung Full Test/Mock Test, Progress Assessment và Post-test. Kết quả được so sánh với Baseline và các lần đánh giá trước để theo dõi:

- Accuracy từng Part.
- Accuracy tích lũy.
- Recent Accuracy.
- Response Time.
- Skill Mastery.
- Improvement Before/After.
- Khoảng cách đến mục tiêu điểm.

### 15.6.4. Review Center và Wrong Answer Notebook

Người học có thể xem lại các câu đã sai, lọc theo Part/skill/topic, đánh dấu cần ôn lại và đưa các câu này trở lại Learning Path hoặc Free Learning.

### 15.6.5. Spaced Repetition hoàn thiện

Vocabulary Progress được mở rộng để ưu tiên các từ có mức độ ghi nhớ thấp, xuất hiện lại theo lịch ôn và được điều chỉnh dựa trên kết quả trả lời.

### 15.6.6. Thông báo và nhắc học

Có thể bổ sung nhắc lịch học, nhắc review vocabulary, nhắc hoàn thành Learning Path hoặc thông báo khi có Progress Assessment cần thực hiện. Chức năng này ưu tiên triển khai sau khi các chức năng học tập cốt lõi đã ổn định.

### 15.6.7. Xử lý AI bất đồng bộ

Khi có nhiều yêu cầu sinh nội dung từ Gemini, hệ thống có thể dùng Message Queue để tránh block request và kiểm soát rate-limit. Với Spring Boot, RabbitMQ là lựa chọn phù hợp hơn BullMQ vì không cần bổ sung Node.js worker chỉ cho queue.

### 15.6.8. Quản trị nội dung hoàn chỉnh

Admin có thể import, preview, validate, duplicate detection, merge, publish, archive và theo dõi nguồn của Vocabulary/Question/Reading. Nội dung AI sinh phải qua validation trước khi xuất hiện trong ngân hàng chính thức.

---

## 16. Testing Strategy

Hệ thống áp dụng nhiều mức kiểm thử.

### 16.1. Unit Test

Kiểm tra các thành phần độc lập:

```text
WeaknessAnalyzer
BktService
RecommendationEngine
VocabularyMergeService
QuestionDuplicateService
ImportService
AIValidationService
```

Mục tiêu dự kiến:

```text
Unit Test Coverage > 90%
```

### 16.2. Integration Test

Kiểm tra tương tác giữa:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
```

Ví dụ:

- Submit Practice → lưu Question Attempt.
- Analytics → đọc lịch sử học tập.
- Recommendation → sử dụng profile.
- Import → lưu dữ liệu sau validation.

### 16.3. API Test

Dùng Postman để kiểm thử REST API.

Kiểm tra các trường hợp:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

### 16.4. System Test

Kiểm thử flow toàn bộ hệ thống.

Ví dụ:

```text
Login
 ↓
Choose Practice
 ↓
Answer Questions
 ↓
Submit
 ↓
Analytics
 ↓
BKT
 ↓
Recommendation
 ↓
Display Personalized Content
```

### 16.5. Acceptance Test

Kiểm tra theo yêu cầu nghiệp vụ:

- User có thể đăng nhập.
- User có thể làm bài.
- Hệ thống lưu lịch sử.
- Hệ thống phát hiện điểm yếu.
- Recommendation thay đổi theo kết quả.
- Gemini giải thích được câu hỏi.
- Admin có thể import dữ liệu.
- Duplicate Vocabulary được gộp đúng.

### 16.6. UI / E2E Test

Có thể dùng Playwright để kiểm tra các luồng người dùng quan trọng.

### 16.7. Regression Test

Chạy lại bộ test khi thêm tính năng mới để đảm bảo chức năng cũ không bị ảnh hưởng.

### 16.8. Performance Test

Có thể dùng JMeter hoặc k6 để đo:

- Response Time.
- Throughput.
- Error Rate.

### 16.9. Security Test

Kiểm tra:

- Authentication.
- JWT expiration.
- Authorization.
- Role-based access.
- API access control.
- Input validation.
- SQL Injection.
- Bảo vệ API key.

### 16.10. Database Test

Kiểm tra:

- PK/FK.
- Unique constraint.
- Duplicate Vocabulary.
- Duplicate Question.
- Transaction.
- Data consistency.

### 16.11. AI Evaluation

Kiểm tra chất lượng Gemini/RAG:

- Relevance.
- Groundedness.
- Hallucination.
- Explanation quality.
- Generated Question Quality.
- Skill correctness.
- Difficulty correctness.
- Duplicate output.

---

## 17. Docker và môi trường chạy

Trong môi trường phát triển, hệ thống ưu tiên Docker Compose.

```text
Docker Compose
│
├── PostgreSQL
├── Backend
└── Frontend
```

Gemini API được gọi từ Backend và không cần một AI server riêng trong MVP.

Ví dụ khởi động:

```bash
docker compose up -d
```

Development có thể chạy riêng:

```text
Frontend  → http://localhost:3000
Backend   → http://localhost:8080
Postgres  → localhost:5432
```

---

## 18. CI/CD

GitHub Actions được sử dụng để tự động kiểm tra mã nguồn.

```text
Git Push / Pull Request
          ↓
      GitHub Actions
          ↓
        Lint
          ↓
      Unit Test
          ↓
   Integration Test
          ↓
        Build
          ↓
     Docker Build
          ↓
       PASS / FAIL
```

Các workflow chính:

```text
.github/
└── workflows/
    ├── frontend-ci.yml
    └── backend-ci.yml
```

---

## 19. Development Roadmap

### Giai đoạn 1 – MVP: Vocabulary + Reading + Personalization

#### Phase 1 – Project Setup

- Git repository.
- Next.js.
- Spring Boot.
- PostgreSQL Docker.
- Docker Compose.

#### Phase 2 – Database Design

- ERD.
- Data Dictionary.
- Migration.
- Seed data.

#### Phase 3 – Authentication

- Register.
- Login.
- JWT.
- Authorization.

#### Phase 4 – Content

- Vocabulary.
- Vocabulary Meaning.
- Reading.
- Question.
- Question Option.

#### Phase 5 – Practice

- Practice Session.
- Submit Answer.
- Question Attempt.
- Result.

#### Phase 6 – Learning Analytics

- Accuracy.
- Error Rate.
- Response Time.
- Recent Performance.
- Weakness Detection.

#### Phase 7 – Knowledge Tracing

- BKT.
- Knowledge Profile.
- Skill State.

#### Phase 8 – Progress & Learning Path

- Baseline Assessment.
- Progress Assessment.
- Post-test.
- Cumulative Accuracy.
- Before/After Improvement Report.
- Strength/Weakness Advice.
- Guided Learning Path.
- Free Learning Mode.
- Adaptive Learning Path.
- Goal-based Learning Path.

#### Phase 9 – Recommendation

- Content-Based Recommendation.
- Recommendation Score.
- Adaptive Difficulty.

#### Phase 10 – Import

- Excel Parser.
- Word Parser.
- PDF Parser.
- CSV Parser.
- Normalize.
- Validate.
- Duplicate Detection.
- Merge.
- Publish.

#### Phase 11 – AI

- Gemini Integration.
- Answer Explanation.
- Mistake Analysis.
- Question Generation.
- RAG.
- AI Validation.

#### Phase 12 – Frontend Completion

- Dashboard.
- Learning Progress.
- Recommendation.
- Admin Content Management.

#### Phase 13 – Testing

- Unit Test.
- Integration Test.
- API Test.
- System Test.
- Acceptance Test.
- Regression Test.
- Security Test.
- Performance Test.
- AI Evaluation.

#### Phase 14 – Deployment / CI/CD

- Docker.
- GitHub Actions.
- Build/Test Pipeline.

### Giai đoạn 2 – Hoàn thiện và mở rộng TOEIC Listening & Reading

Giai đoạn 2 được thực hiện sau khi MVP ổn định. Mục tiêu là hoàn thiện hệ thống theo phạm vi TOEIC Listening & Reading và tăng mức độ cá nhân hóa.

#### Phase 15 – Diagnostic Test & Goal Management

- Diagnostic Test đầu vào.
- Xác định trình độ ban đầu.
- Thiết lập mục tiêu điểm: 450+, 550+, 650+, 750+ hoặc mục tiêu tùy chỉnh.
- Tính khoảng cách giữa trình độ hiện tại và mục tiêu.
- Tạo Learning Path tương ứng với mục tiêu.

#### Phase 16 – Full Listening & Reading

- Listening Part 1: Photographs.
- Listening Part 2: Question-Response.
- Listening Part 3: Conversations.
- Listening Part 4: Talks.
- Reading Part 5: Incomplete Sentences.
- Reading Part 6: Text Completion.
- Reading Part 7: Reading Comprehension.
- Phân loại theo Part, skill, topic và difficulty.

#### Phase 17 – Full/Mock Test

- Full Listening & Reading Test.
- Mock Test theo mục tiêu điểm.
- Timer.
- Chấm điểm sau bài thi.
- Phân tích kết quả theo Part 1–7.
- So sánh với Baseline và các Post-test trước đó.

#### Phase 18 – Review & Retention

- Wrong Answer Notebook.
- Review Center.
- Bookmark.
- Spaced Repetition hoàn thiện cho Vocabulary.
- Danh sách nội dung cần ôn lại.
- Đề xuất ôn lại các câu/skill thường sai.

#### Phase 19 – Listening AI

- Audio management.
- Transcript.
- AI explanation cho Listening.
- Sinh bài Listening bổ sung theo skill/topic/difficulty.
- Validation nội dung AI sinh trước khi publish.

#### Phase 20 – Adaptive Goal-based Learning Path

- Cập nhật Learning Path theo kết quả mới.
- Điều chỉnh nội dung theo khoảng cách đến mục tiêu điểm.
- Tăng/giảm difficulty theo performance.
- Chuyển giữa Guided Learning và Free Learning.
- Đánh giá lại lộ trình sau mỗi Progress Assessment/Post-test.

#### Phase 21 – AI Queue & Rate-limit Handling

Khi số lượng yêu cầu Gemini tăng, có thể bổ sung Message Queue để xử lý bất đồng bộ:

```text
User / Admin Request
        ↓
Backend
        ↓
Message Queue
        ↓
AI Worker
        ↓
Gemini API
        ↓
Validation
        ↓
Database
```

Ưu tiên **RabbitMQ** cho backend Java/Spring Boot; Redis/BullMQ chỉ xem xét khi nhóm có thêm Node.js worker thực sự cần thiết. Message Queue không bắt buộc trong MVP và chỉ được thêm khi có nhu cầu kiểm soát rate-limit hoặc xử lý batch AI.

#### Phase 22 – Advanced Recommendation & Knowledge Tracing

- SAKT hoặc AKT.
- So sánh BKT với mô hình nâng cao.
- Hybrid Recommendation.
- Có thể bổ sung knowledge graph nếu cần.

#### Phase 23 – Hardening & Production Readiness

- Tăng cường Security Test.
- Performance/Load Test.
- Regression Test toàn hệ thống.
- Monitoring và health check.
- Backup/restore Database.
- Hoàn thiện logging và audit các thao tác quản trị nội dung.
- Tối ưu Docker và CI/CD.
- Kubernetes cơ bản là **tùy chọn**, chỉ triển khai khi cần trình diễn hoặc mở rộng hạ tầng; không phải yêu cầu bắt buộc để hoàn thành hệ thống.

---

## 20. Giá trị và điểm mới của đề tài

Điểm nổi bật của đề tài không nằm ở việc chỉ gọi Gemini để sinh câu hỏi.

Giá trị chính nằm ở việc kết hợp các thành phần thành một vòng lặp học tập cá nhân hóa:

```text
Learning History
      ↓
Learning Analytics
      ↓
Weakness Detection
      ↓
Knowledge Tracing
      ↓
Learner Knowledge Profile
      ↓
Adaptive Recommendation
      ↓
RAG + Gemini
      ↓
Personalized Content
      ↓
New Learning Interaction
      ↓
Updated Knowledge State
```

Các điểm đáng chú ý:

1. **Personalized learning dựa trên dữ liệu hành vi học tập**, thay vì chỉ dựa trên điểm tổng.
2. **Knowledge Tracing** được sử dụng để mô hình hóa trạng thái kiến thức theo từng kỹ năng.
3. **Recommendation Engine** và AI được tách trách nhiệm rõ ràng.
4. **RAG + Gemini** cho phép AI sử dụng context từ kho dữ liệu của hệ thống.
5. **Multi-source Content Import** hỗ trợ Excel/Word/PDF/CSV.
6. **Vocabulary Meaning Merge** giúp hạn chế dữ liệu trùng khi mở rộng ngân hàng từ vựng.
7. **AI Output Validation** kiểm soát nội dung do LLM sinh ra trước khi đưa vào ngân hàng dữ liệu.
8. Kiến trúc cho phép mở rộng từ BKT sang SAKT/AKT và từ Content-Based Recommendation sang Hybrid Recommendation mà không phải viết lại toàn bộ hệ thống.

Các thuật toán BKT, SAKT, AKT, RAG và Recommendation không được xem là các công nghệ hoàn toàn mới của đề tài. Điểm nghiên cứu của dự án nằm ở **cách kết hợp chúng thành một hệ thống personalized TOEIC có khả năng đo lường, đề xuất, giải thích và cập nhật liên tục theo người học**.

---

## 21. Quyết định kiến trúc chính thức

Phiên bản hiện tại chốt các quyết định sau:

```text
Frontend
→ Next.js + TypeScript

Backend
→ Spring Boot + Java 21

Architecture
→ Modular Monolith + Feature-based

Database
→ PostgreSQL

Database Migration
→ Flyway

Authentication
→ Spring Security + JWT

Main Personalization
→ Learning Analytics
→ Strength / Weakness Analysis
→ Weighted Weakness Score
→ BKT
→ Content-Based Recommendation
→ Adaptive Difficulty
→ Adaptive Learning Path
→ Baseline / Post-test Improvement Tracking
→ Cumulative Progress Tracking

AI
→ Gemini API
→ RAG

Content Import
→ Excel / Word / PDF / CSV

Data Quality
→ Normalize
→ Duplicate Detection
→ Merge
→ Validation

Testing
→ Unit
→ Integration
→ API
→ System
→ Acceptance
→ Regression
→ Security
→ Performance
→ Database
→ AI Evaluation

Container
→ Docker + Docker Compose

CI/CD
→ GitHub Actions
```

---

## 22. Nguyên tắc phát triển

1. **Không xây quá phạm vi MVP.** Tập trung Vocabulary + Reading trước.
2. **Database được thiết kế trước khi code nghiệp vụ lớn.**
3. **Backend chịu trách nhiệm logic cốt lõi; Gemini chỉ hỗ trợ phần AI.**
4. **Không để AI tự động thay đổi dữ liệu quan trọng mà không có validation.**
5. **Không tạo duplicate Vocabulary chỉ vì dữ liệu đến từ nhiều nguồn.**
6. **Tách module theo feature để dễ tìm kiếm và bảo trì.**
7. **Thiết kế interface cho các thuật toán quan trọng để có thể thay thế mô hình.**
8. **Ưu tiên công nghệ miễn phí/open-source và local deployment.**
9. **Testing được thực hiện song song với quá trình phát triển.**
10. **Listening, Speaking và Writing chỉ mở rộng sau khi phiên bản Vocabulary + Reading ổn định.**

---

## 23. Tài liệu dự án

```text
docs/
├── requirements/
│   └── requirements.md
│
├── architecture/
│   ├── system-architecture.md
│   └── diagrams/
│
├── database/
│   ├── erd.md
│   └── data-dictionary.md
│
├── algorithms/
│   ├── learning-analytics.md
│   ├── bkt.md
│   ├── recommendation.md
│   └── adaptive-difficulty.md
│
├── api/
│   └── api-spec.md
│
└── testing/
    ├── test-plan.md
    ├── test-cases.md
    └── test-report.md
```

---

## 24. Trạng thái dự án

> Dự án được chia thành **2 giai đoạn**. Giai đoạn 1 xây dựng MVP tập trung Vocabulary + Reading và hoàn thiện vòng lặp cá nhân hóa. Giai đoạn 2 hoàn thiện hệ thống theo định hướng TOEIC Listening & Reading, bổ sung các tính năng còn thiếu, tăng khả năng chịu tải và mở rộng thuật toán/AI.

### Giai đoạn 1 – MVP

- Vocabulary + Reading.
- Learning Analytics.
- Strength / Weakness Analysis.
- BKT.
- Recommendation.
- Adaptive Difficulty.
- Adaptive Learning Path.
- Baseline / Post-test / Cumulative Progress.
- Import và Deduplication.
- Gemini + RAG.
- Testing cơ bản đến toàn diện.

### Giai đoạn 2 – Hoàn thiện và mở rộng

- Listening Part 1–4.
- Reading Part 5–7 hoàn chỉnh.
- Diagnostic Test và Goal-based Learning Path.
- Full/Mock Test.
- Review Center / Wrong Answer Notebook.
- AI Listening.
- Message Queue khi cần.
- SAKT/AKT và Hybrid Recommendation ở mức nâng cao.
- Performance, Security, Monitoring, Backup và CI/CD nâng cao.

---

## 25. License

License có thể được bổ sung sau khi nhóm thống nhất quyền sử dụng và phân phối mã nguồn.
