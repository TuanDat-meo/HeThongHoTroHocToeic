export function KpiRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {/* KPI 1 */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Học viên Hoạt động</span>
            <span className="p-1.5 rounded bg-surface-container-low text-primary">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-stat-metric text-stat-metric text-on-surface tracking-tight">1,420</span>
            <span className="inline-flex items-center text-tertiary font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              +12.5%
            </span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-0.5">So với chu kỳ 30 ngày trước</p>
        </div>
        <div className="mt-space-md pt-space-xs bg-surface-container-low/50 p-2.5 rounded-lg">
          <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
            <span className="text-on-surface-variant">Lộ trình Cá nhân hóa:</span>
            <span className="text-primary font-semibold">84.6% (1,201 học viên)</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '84.6%' }}></div>
          </div>
        </div>
      </div>

      {/* KPI 2 */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Ngân hàng Câu hỏi & Từ vựng</span>
            <span className="p-1.5 rounded bg-surface-container-low text-tertiary">
              <span className="material-symbols-outlined text-[20px]">library_books</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-stat-metric text-stat-metric text-on-surface tracking-tight">4,850</span>
            <span className="font-label-md text-label-md text-on-surface-variant">câu hỏi</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
              94% Đã kiểm duyệt
            </span>
            <span className="font-caption text-caption text-on-surface-variant">290 câu mới tạo</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs bg-surface-container-low/50 p-2.5 rounded-lg flex items-center justify-between">
          <div>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">Từ vựng chuẩn hóa</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">6,120 <span className="font-caption text-caption text-on-surface-variant">mục</span></span>
          </div>
          <div className="text-right">
            <span className="block font-label-sm text-label-sm text-tertiary font-semibold">99.8%</span>
            <span className="font-caption text-caption text-on-surface-variant">Khử trùng lặp</span>
          </div>
        </div>
      </div>

      {/* KPI 3 */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Mô hình Bayesian Knowledge Tracing</span>
            <span className="p-1.5 rounded bg-surface-container-low text-primary-container">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-stat-metric text-stat-metric text-on-surface tracking-tight">0.68</span>
            <span className="font-label-md text-label-md text-on-surface-variant font-mono">P(Know) TB</span>
          </div>
          <p className="font-caption text-caption text-on-surface-variant mt-0.5">Xác suất thành thạo trung bình toàn hệ thống</p>
        </div>
        <div className="mt-space-md pt-space-xs bg-surface-container-low/50 p-2.5 rounded-lg">
          <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
            <span className="text-on-surface-variant">Độ hội tụ thuật toán:</span>
            <span className="text-tertiary font-semibold">98.4% (Chuẩn xác)</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: '98.4%' }}></div>
          </div>
        </div>
      </div>

      {/* KPI 4 */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Hiệu suất Gemini AI & RAG</span>
            <span className="p-1.5 rounded bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-stat-metric text-stat-metric text-on-surface tracking-tight">12,480</span>
            <span className="font-label-md text-label-md text-on-surface-variant">lượt gọi/ngày</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-caption text-caption text-tertiary font-medium">Độ trễ trung bình: 380ms</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs bg-surface-container-low/50 p-2.5 rounded-lg flex items-center justify-between">
          <div>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">Groundedness (Độ tin cậy)</span>
            <span className="font-headline-sm text-headline-sm text-primary font-semibold">94.2%</span>
          </div>
          <div className="text-right">
            <span className="block font-label-sm text-label-sm text-on-surface-variant">Zero Hallucination</span>
            <span className="font-caption text-caption text-tertiary font-semibold">Đạt chuẩn y khoa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
