import Link from 'next/link';

export function AiValidationQueue() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
      {/* AI Validation & Deduplication Queue */}
      <div className="xl:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">Kiểm duyệt & Khử trùng lặp</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Hàng đợi Phê duyệt Nội dung AI</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-medium">3 tác vụ chờ duyệt</span>
              <span className="text-on-surface-variant font-caption text-caption">Tự động duyệt: 96.5%</span>
            </div>
          </div>

          {/* Validation Queue Cards */}
          <div className="space-y-space-sm mt-space-xs">
            {/* Item 1 */}
            <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs transition-all hover:bg-surface-container">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">Part 5</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Câu hỏi Ngữ cảnh Doanh nghiệp: &apos;Business Contracts&apos;</span>
                </div>
                <span className="font-caption text-caption font-mono text-tertiary bg-surface-container-lowest px-2 py-0.5 rounded">
                  pgvector distance: 0.12 (Độc bản)
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface italic bg-surface-container-lowest/80 p-2.5 rounded border-l-2 border-primary">
                &quot;The executive board insisted that the revised terms of the merger agreement be thoroughly ________ by external legal counsel before signing.&quot;
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-caption text-caption text-on-surface-variant">
                <span>(A) review</span>
                <span className="text-tertiary font-semibold">(B) reviewed ✓</span>
                <span>(C) reviewing</span>
                <span>(D) reviewer</span>
              </div>
              <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Đạt 4/4 tiêu chuẩn phân loại ETS</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface bg-surface-container-lowest rounded font-label-sm text-label-sm shadow-sm transition-colors" type="button">
                    Tinh chỉnh câu lệnh
                  </button>
                  <button className="px-2.5 py-1 text-error hover:bg-error-container/30 bg-surface-container-lowest rounded font-label-sm text-label-sm shadow-sm transition-colors" type="button">
                    Từ chối
                  </button>
                  <button className="px-3 py-1 bg-primary text-on-primary hover:bg-primary-container rounded font-label-sm text-label-sm shadow-sm transition-colors font-medium" type="button">
                    Phê duyệt
                  </button>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs transition-all hover:bg-surface-container">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-semibold">Part 7 Reading</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Thông báo nội bộ công ty: Thay đổi chính sách làm việc Hybrid</span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded">
                  Độ khó: Medium (Band 650)
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                &quot;MEMORANDUM: To all regional staff. Commencing next quarter, the core attendance window will shift to facilitate cross-timezone coordination with our European logistics hubs...&quot;
              </p>
              <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">RAG Source: TechCorp internal policy & TOEIC ETS 2024</span>
                <div className="flex items-center gap-space-xs">
                  <button className="px-2.5 py-1 text-primary bg-surface-container-lowest hover:bg-surface-container-high rounded font-label-sm text-label-sm shadow-sm transition-colors" type="button">
                    Kiểm tra nguồn tham chiếu
                  </button>
                  <button className="px-3 py-1 bg-primary text-on-primary hover:bg-primary-container rounded font-label-sm text-label-sm shadow-sm transition-colors font-medium" type="button">
                    Phê duyệt
                  </button>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs transition-all hover:bg-surface-container">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">Từ vựng gộp</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Mục từ: &apos;Implement&apos; (Động từ)</span>
                </div>
                <span className="font-caption text-caption text-tertiary bg-surface-container-lowest px-2 py-0.5 rounded font-medium">
                  Tự động gộp 2 nguồn (ETS + Hackers)
                </span>
              </div>
              <p className="font-caption text-caption text-on-surface-variant">
                Gộp thành công định nghĩa chính: &quot;Thực hiện, áp dụng một kế hoạch hoặc hệ thống&quot; kèm 3 ví dụ thực tế và audio phát âm chuẩn IPA.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-caption text-caption text-tertiary">Đã ánh xạ vào Graph Knowledge node: #v-7821</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Tự động lưu vào ngân hàng</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between">
          <span className="font-caption text-caption text-on-surface-variant">Tiêu chuẩn kiểm duyệt tuân thủ chính sách RAG 2.1</span>
          <Link href="/ai-validation-ops" className="font-label-md text-label-md text-primary hover:underline font-semibold inline-flex items-center gap-1">
            <span>Xem toàn bộ hàng đợi (12 mục)</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
      </div>

      {/* Audit Stream & System Infrastructure */}
      <div className="xl:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">Nhật ký & Hạ tầng</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Hoạt động Thời gian thực</h2>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-ping" title="Luồng nhật ký đang nhận sự kiện"></span>
          </div>

          {/* Infrastructure Status */}
          <div className="grid grid-cols-2 gap-2 mb-space-md">
            <div className="bg-surface-container-low p-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface font-semibold">PostgreSQL 16 & pgvector</span>
                <span className="font-caption text-caption text-tertiary font-mono">Bình thường • 12ms</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface font-semibold">Gemini 1.5 Pro</span>
                <span className="font-caption text-caption text-tertiary font-mono">Khả dụng • Rate Limit 4%</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface font-semibold">Redis Cache & Pub/Sub</span>
                <span className="font-caption text-caption text-tertiary font-mono">Bình thường • Hit rate 88%</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface font-semibold">Spring Boot Backend</span>
                <span className="font-caption text-caption text-tertiary font-mono">Uptime 14d 6h • CPU 12%</span>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="space-y-3 font-mono text-xs text-on-surface-variant bg-[#0b1c30] p-4 rounded-xl shadow-inner overflow-hidden h-56 relative">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0b1c30] to-transparent z-10 pointer-events-none"></div>
            <div className="space-y-3 opacity-90">
              <div className="flex gap-2">
                <span className="text-secondary-fixed">09:42:15.112</span>
                <span className="text-primary-fixed-dim">[BKT_JOB]</span>
                <span className="text-inverse-on-surface">Calculated new skill distribution for batch_id=88421. Drift detected in &apos;Inference&apos;.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary-fixed">09:42:12.805</span>
                <span className="text-tertiary-fixed-dim">[RAG_SYNC]</span>
                <span className="text-inverse-on-surface">Updated 45 pgvector embeddings for new Reading passages.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary-fixed">09:42:08.441</span>
                <span className="text-error-container">[AI_VALIDATION]</span>
                <span className="text-inverse-on-surface text-error-container">Flagged passage id=992 for low groundedness score (0.65). Placed in manual queue.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary-fixed">09:42:01.109</span>
                <span className="text-primary-fixed-dim">[AUTH]</span>
                <span className="text-inverse-on-surface">Admin user &apos;nguyenquocbao&apos; logged in via JWT token.</span>
              </div>
              <div className="flex gap-2 opacity-50">
                <span className="text-secondary-fixed">09:41:55.992</span>
                <span className="text-tertiary-fixed-dim">[DATA_IMPORT]</span>
                <span className="text-inverse-on-surface">Completed async parse of 150 vocab items from Hackers TOEIC v2.csv.</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0b1c30] to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex justify-end">
          <Link href="/audit-logs" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface inline-flex items-center gap-1 transition-colors">
            <span>Truy xuất kho lưu trữ nhật ký đầy đủ</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
