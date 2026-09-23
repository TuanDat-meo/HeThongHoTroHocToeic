import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="h-16 px-space-md flex items-center gap-space-sm bg-surface-container-low">
          <img 
            alt="Brand logo" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida/AEtjO1XKBo5WcPCvcklZQU7OrWyidjo8XWW6dH1ReS8xZzuE3AA3VhGWktDhulid9WjtV395o0yhgYxQW-SQzjGa1ZtXiAIvtqFzIzQ1VUjBrWYImSN77O4PcfMS1W7ukL3dT1Ed1K7D68MMhjmJMsX2ZboBBNDhU-vgh3E5NiCKqyJWWXe9mpx06Tlya34DayIZg0KZLo3hogwGw1QQgqnesUIoWcUSPpP-wFFu3QKCBfeQ"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">TOEIC AI</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Quản Trị Hệ Thống</span>
          </div>
        </div>

        <div className="px-space-md py-space-sm">
          <div className="bg-surface-container-lowest px-space-sm py-space-xs rounded-lg flex items-center justify-between shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Máy chủ AI</span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-medium">320ms</span>
          </div>
        </div>

        <nav className="flex-1 px-space-sm py-space-xs space-y-space-md">
          <div className="space-y-space-xs">
            <div className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Tổng Quan</div>
            <div className="space-y-0.5">
              <Link href="/" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-primary bg-primary-container font-medium transition-colors">
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span className="font-body-sm text-body-sm">Bảng điều khiển & Số liệu</span>
              </Link>
              <Link href="/learning-analytics" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">insights</span>
                <span className="font-body-sm text-body-sm">Phân tích & Tiến độ học tập</span>
              </Link>
              <Link href="/knowledge-tracing" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">model_training</span>
                <span className="font-body-sm text-body-sm">Mô hình BKT & Dự đoán</span>
              </Link>
            </div>
          </div>

          <div className="space-y-space-xs">
            <div className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Quản Lý Nội Dung</div>
            <div className="space-y-0.5">
              <Link href="/vocabulary" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span className="font-body-sm text-body-sm">Ngân hàng Từ vựng</span>
              </Link>
              <Link href="/questions" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                <span className="font-body-sm text-body-sm">Ngân hàng Câu hỏi</span>
              </Link>
              <Link href="/reading" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">article</span>
                <span className="font-body-sm text-body-sm">Đoạn văn đọc Reading</span>
              </Link>
            </div>
          </div>

          <div className="space-y-space-xs">
            <div className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Vận Hành & AI</div>
            <div className="space-y-0.5">
              <Link href="/ai-validation" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-body-sm text-body-sm">Kiểm duyệt & Đánh giá AI</span>
              </Link>
              <Link href="/vector-rag" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">hub</span>
                <span className="font-body-sm text-body-sm">Vector RAG & Embedding</span>
              </Link>
              <Link href="/data-import" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">move_to_inbox</span>
                <span className="font-body-sm text-body-sm">Lô nhập & Xử lý dữ liệu</span>
              </Link>
            </div>
          </div>

          <div className="space-y-space-xs">
            <div className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Hệ Thống & Bảo Mật</div>
            <div className="space-y-0.5">
              <Link href="/audit-logs" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">security</span>
                <span className="font-body-sm text-body-sm">Nhật ký kiểm toán</span>
              </Link>
              <Link href="/users" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                <span className="font-body-sm text-body-sm">Tài khoản người dùng</span>
              </Link>
              <Link href="/system-health" className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
                <span className="font-body-sm text-body-sm">Trạng thái hệ thống</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-space-sm bg-surface-container">
        <div className="flex items-center justify-between px-space-sm py-space-xs bg-surface-container-lowest rounded-lg mb-space-xs shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Môi trường</span>
            <span className="font-label-md text-label-md text-on-surface font-medium">Sản phẩm • v1.4.2</span>
          </div>
          <button 
            type="button" 
            className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors" 
            title="Đổi chế độ giao diện"
          >
            <span className="material-symbols-outlined text-[18px]">light_mode</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
