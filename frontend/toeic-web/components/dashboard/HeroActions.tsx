'use client';

export function HeroActions() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
      <div className="space-y-1">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span>
            Đồng bộ thời gian thực: Hoạt động
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Phiên bản lõi: v1.4.2-prod</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Bảng điều khiển Tổng quan & Chỉ số Vận hành</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Theo dõi dữ liệu học tập cá nhân hóa, mô hình Knowledge Tracing (BKT) và chất lượng nội dung sinh bởi Gemini AI trong thời gian thực.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <div className="inline-flex bg-surface-container-low p-1 rounded-lg">
          <button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">Hôm nay</button>
          <button className="px-3 py-1.5 rounded bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm transition-colors" type="button">7 ngày qua</button>
          <button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">30 ngày qua</button>
          <button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors" type="button">Tùy chỉnh</button>
        </div>
        <div className="flex items-center gap-space-xs">
          <button 
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all" 
            title="Cập nhật chỉ mục vector và đoạn trích" 
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-primary">hub</span>
            <span>Đồng bộ nguồn dữ liệu</span>
          </button>
          <button 
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg shadow-sm transition-all" 
            title="Ước lượng lại P(Know) và phân phối năng lực" 
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-tertiary">model_training</span>
            <span>Phân tích năng lực học tập</span>
          </button>
          <button 
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded-lg shadow-sm transition-all" 
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Tải báo cáo xuống</span>
          </button>
        </div>
      </div>
    </div>
  );
}
