import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input 
            className="w-full h-9 pl-9 pr-14 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] transition-all" 
            placeholder="Tìm kiếm mã câu hỏi, từ vựng, tài liệu, học viên... (⌘K)" 
            type="text"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-container rounded text-on-surface-variant font-label-sm text-label-sm">
            <kbd className="font-mono">⌘</kbd>
            <kbd className="font-mono">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="hidden xl:flex items-center gap-space-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low rounded-full">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
            <span className="font-label-sm text-label-sm text-on-surface">pgvector: Hoạt động</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label-sm text-label-sm text-on-surface">Máy chủ: Sẵn sàng</span>
          </div>
        </div>
        
        <button 
          className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors" 
          title="Chuyển đổi giao diện" 
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">contrast</span>
        </button>
        
        <Link 
          href="/data-import"
          className="flex items-center gap-1.5 h-9 px-3.5 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary transition-colors shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Nhập dữ liệu mới</span>
        </Link>

        <div className="flex items-center gap-space-sm pl-space-xs">
          <img 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/AEtjO1WnotwTUWmXJkvYMeUByQzYEvEVK9u5KzSNLsmieB4DtBI8kK29ojaK-VmOib3K2BuGE6pfmT9D6gYSKjcko_kFlWt9F-j0G1Vz9jW0F0iG4uInqcdDcV0yNkBC2crP4L1PMVqFQMA6UR-a6GDNTtTszCKeOvrUhlf8G3ITVZvup_VIWV90TU3Cmhu3cOfI-TVNJMHJDvlhkPMRbvHCFO1TkqpU-8FAxVdJgxgukRQ-"
          />
          <div className="hidden md:flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">Nguyễn Quốc Bảo</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Quản trị viên trưởng</span>
          </div>
        </div>
      </div>
    </header>
  );
}
