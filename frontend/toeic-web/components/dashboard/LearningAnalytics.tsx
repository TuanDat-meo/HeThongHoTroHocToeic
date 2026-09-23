import Link from 'next/link';

export function LearningAnalytics() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
      {/* Left Column: 5 Main TOEIC Skills Assessment */}
      <div className="xl:col-span-8 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase">Learning Analytics & Weakness Drift</span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Phân tích Tiến độ & Khoảng trống Kỹ năng</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-caption text-caption text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded">5 Kỹ năng Trọng tâm (Reading & Vocab)</span>
            </div>
          </div>

          {/* Skills Matrix Table */}
          <div className="overflow-x-auto mt-space-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                  <th className="py-2.5 px-3 rounded-l">Kỹ năng / Thành phần Kiến thức</th>
                  <th className="py-2.5 px-3">Xác suất Thành thạo P(Know)</th>
                  <th className="py-2.5 px-3">Tỷ lệ Chính xác</th>
                  <th className="py-2.5 px-3">Mức độ Điểm yếu</th>
                  <th className="py-2.5 px-3 rounded-r text-right">Khuyến nghị Điều chỉnh</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm divide-y-0">
                {/* Skill 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">Từ vựng theo ngữ cảnh (Vocab in Context)</div>
                        <div className="font-caption text-caption text-on-surface-variant">Synonyms, Word Forms, Domain Vocab</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-on-surface">0.76</span>
                      <span className="inline-block px-1.5 py-0.5 bg-surface-container text-primary font-label-sm text-label-sm rounded">Khá</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant font-mono mt-0.5 block">78% (14,210 lượt)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Thấp</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-caption text-caption text-on-surface-variant">Duy trì Spaced Repetition</span>
                  </td>
                </tr>

                {/* Skill 2 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">Ý chính đoạn văn (Main Idea)</div>
                        <div className="font-caption text-caption text-on-surface-variant">Skimming, Gist Identification, Purpose</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-on-surface">0.82</span>
                      <span className="inline-block px-1.5 py-0.5 bg-surface-container text-tertiary font-label-sm text-label-sm rounded">Tốt</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full" style={{ width: '84%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant font-mono mt-0.5 block">84% (9,840 lượt)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Thấp</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-caption text-caption text-on-surface-variant">Tăng đoạn văn phức hợp</span>
                  </td>
                </tr>

                {/* Skill 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">Thông tin chi tiết (Detail Extraction)</div>
                        <div className="font-caption text-caption text-on-surface-variant">Scanning, NOT/TRUE items, Numerical data</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-on-surface">0.79</span>
                      <span className="inline-block px-1.5 py-0.5 bg-surface-container text-tertiary font-label-sm text-label-sm rounded">Tốt</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full" style={{ width: '81%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant font-mono mt-0.5 block">81% (16,400 lượt)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">Rất thấp</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-caption text-caption text-on-surface-variant">Mức vững chắc</span>
                  </td>
                </tr>

                {/* Skill 4 (Weakness hotspot) */}
                <tr className="hover:bg-surface-container-low transition-colors bg-error-container/20">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">Suy luận & Ngữ cảnh (Inference)</div>
                        <div className="font-caption text-caption text-on-surface-variant">Implied Meaning, Speaker Attitude, Cross-text</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-error">0.44</span>
                      <span className="inline-block px-1.5 py-0.5 bg-error-container text-on-error-container font-label-sm text-label-sm rounded">Cần chú ý</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-error h-full rounded-full" style={{ width: '48%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-error font-mono mt-0.5 block">48% (11,050 lượt)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-semibold">Cao (Ưu tiên)</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="font-label-sm text-label-sm text-primary hover:underline font-semibold" type="button">Tạo bài luyện phù hợp</button>
                  </td>
                </tr>

                {/* Skill 5 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">Ngữ pháp & Cụm từ liên kết (Collocations)</div>
                        <div className="font-caption text-caption text-on-surface-variant">Prepositions, Phrasal Verbs, Participles</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-on-surface">0.52</span>
                      <span className="inline-block px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded">Trung bình</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-28 bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '56%' }}></div>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant font-mono mt-0.5 block">56% (13,100 lượt)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Trung bình</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-caption text-caption text-on-surface-variant">Bổ sung mini-quiz Part 5</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Skill insights note */}
        <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">lightbulb</span>
          <div className="font-caption text-caption text-on-surface-variant">
            <span className="font-semibold text-on-surface">Khuyến nghị thuật toán BKT:</span> Học viên nhóm band 550-650 gặp hiện tượng trượt điểm (drift) chủ yếu ở kỹ năng <span className="font-semibold text-on-surface">Suy luận & Ngữ cảnh (Inference)</span>. Hệ thống đã tự động định tuyến tăng 30% tần suất câu hỏi suy luận có giải thích từng bước (Chain-of-Thought) cho nhóm này.
          </div>
        </div>
      </div>

      {/* Right Column: Baseline vs Current Growth Chart */}
      <div className="xl:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold tracking-wider uppercase">Baseline vs Current</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Tăng trưởng Lộ trình Học</h3>
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              +23 Điểm %
            </span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mb-space-md">
            So sánh tỷ lệ làm đúng bài kiểm tra đầu vào (Baseline) và bài đánh giá chu kỳ hiện tại (Current Assessment).
          </p>

          {/* SVG Progression Visualization */}
          <div className="relative w-full h-48 bg-surface-container-low/40 rounded-xl p-space-sm flex items-center justify-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 340 160">
              {/* Grid lines */}
              <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="320" y1="20" y2="20"></line>
              <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="320" y1="60" y2="60"></line>
              <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.08" x1="40" x2="320" y1="100" y2="100"></line>
              <line stroke="currentColor" strokeOpacity="0.12" x1="40" x2="320" y1="140" y2="140"></line>
              
              {/* Axis labels */}
              <text className="text-[10px] font-mono" fill="currentColor" opacity="0.5" x="15" y="24">100%</text>
              <text className="text-[10px] font-mono" fill="currentColor" opacity="0.5" x="20" y="64">75%</text>
              <text className="text-[10px] font-mono" fill="currentColor" opacity="0.5" x="20" y="104">50%</text>
              <text className="text-[10px] font-mono" fill="currentColor" opacity="0.5" x="25" y="144">0%</text>
              
              {/* Gradient Area */}
              <defs>
                <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1b41ae" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#1b41ae" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              
              {/* Area Path */}
              <polygon fill="url(#growthGradient)" points="50,110 100,102 160,88 220,70 280,56 315,50 315,140 50,140"></polygon>
              
              {/* Line Path */}
              <polyline fill="none" points="50,110 100,102 160,88 220,70 280,56 315,50" stroke="#1b41ae" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
              
              {/* Baseline Marker (55%) */}
              <circle cx="50" cy="110" fill="#515f74" r="4.5"></circle>
              <text className="text-[10px] font-semibold" fill="currentColor" x="42" y="128">55%</text>
              <text className="text-[9px]" fill="currentColor" opacity="0.6" x="35" y="152">Bắt đầu</text>
              
              {/* Current Assessment Marker (78%) */}
              <circle cx="315" cy="50" fill="#007066" r="5.5"></circle>
              <text className="text-[11px] font-bold" fill="#007066" x="298" y="38">78%</text>
              <text className="text-[9px]" fill="currentColor" opacity="0.6" x="290" y="152">Hiện tại</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-space-md">
            <div className="bg-surface-container-low p-2.5 rounded-lg text-center">
              <span className="block font-label-sm text-label-sm text-on-surface-variant">Điểm xuất phát TB</span>
              <span className="font-headline-sm text-headline-sm text-secondary font-bold">515 điểm</span>
              <span className="font-caption text-caption text-on-surface-variant block mt-0.5">Khảo sát 45 ngày trước</span>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-lg text-center">
              <span className="block font-label-sm text-label-sm text-on-surface-variant">Dự báo điểm hiện tại</span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">725 điểm</span>
              <span className="font-caption text-caption text-tertiary block mt-0.5 font-medium">+210 điểm tăng</span>
            </div>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs text-center">
          <Link href="/learning-analytics" className="font-label-md text-label-md text-primary hover:underline inline-flex items-center gap-1 font-semibold">
            <span>Xem chi tiết báo cáo BKT & Lộ trình cá nhân</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
