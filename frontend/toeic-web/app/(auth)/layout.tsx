import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-page relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(27,65,174,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(0,112,102,0.12),transparent_24%),linear-gradient(180deg,#f8f9ff_0%,#eef3ff_100%)] font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(255,255,255,0.8),transparent_22%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1100px] items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-0 lg:py-10">
      <div className="grid items-stretch overflow-hidden rounded-xl border border-outline-variant/40 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.1)] backdrop-blur-sm lg:min-h-[620px] lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#edf3ff_0%,#e6efff_52%,#dce9ff_100%)] p-7 text-on-surface lg:flex lg:h-full lg:min-h-[620px] lg:flex-col lg:gap-6 xl:p-8">
          <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.14),transparent_26%)]" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded bg-primary/10 px-2 py-1 text-[13px] font-medium text-primary"><span className="material-symbols-outlined text-[15px]">verified</span>Nền tảng học TOEIC cá nhân hóa</span>
            <h1 className="mt-5 max-w-md text-[25px] font-bold leading-tight text-on-surface">Chinh phục mục tiêu TOEIC theo cách của bạn</h1>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-on-surface-variant">Học đúng phần cần cải thiện, luyện tập vừa sức và theo dõi tiến bộ mỗi ngày với sự hỗ trợ của AI.</p>
            <div className="mt-5 space-y-3">
              <div className="flex gap-3 rounded-lg border border-white/70 bg-white/75 p-3 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"><span className="material-symbols-outlined">route</span></span><div><strong className="block text-[14px]">Lộ trình học theo mục tiêu</strong><p className="mt-0.5 text-[13px] leading-tight text-on-surface-variant">Xác định điểm xuất phát và mục tiêu điểm số để xây dựng kế hoạch học phù hợp với bạn.</p></div></div>
              <div className="flex gap-3 rounded-lg border border-white/70 bg-white/75 p-3 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"><span className="material-symbols-outlined">auto_awesome</span></span><div><strong className="block text-[14px]">Bài luyện thích ứng</strong><p className="mt-0.5 text-[13px] leading-tight text-on-surface-variant">Luyện đủ 7 Part TOEIC với câu hỏi được đề xuất dựa trên năng lực và lỗ hổng kiến thức.</p></div></div>
              <div className="flex gap-3 rounded-lg border border-white/70 bg-white/75 p-3 shadow-sm"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-tertiary/15 text-tertiary"><span className="material-symbols-outlined">insights</span></span><div><strong className="block text-[14px]">Phân tích tiến bộ rõ ràng</strong><p className="mt-0.5 text-[13px] leading-tight text-on-surface-variant">Biết mình đang tiến bộ ở đâu và nhận gợi ý cụ thể cho buổi học tiếp theo.</p></div></div>
            </div>
          </div>
          <div className="relative z-10 flex shrink-0 items-center justify-between rounded-lg border border-white/70 bg-white/80 p-3 shadow-sm"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded bg-primary text-white"><span className="material-symbols-outlined">trending_up</span></span><span><strong className="block text-lg leading-none">5.000<span className="text-sm">+ học viên</span></strong><span className="text-[12px] text-on-surface-variant">đang bền bỉ cải thiện điểm số mỗi ngày</span></span></div><span className="hidden border-l border-outline-variant/50 pl-3 text-center text-[12px] text-on-surface-variant sm:block"><b className="block text-primary">7 PART TOEIC</b>Luyện tập toàn diện</span></div>
        </aside>

        <main className="relative flex flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(237,242,255,0.96))] px-4 py-7 sm:px-10 sm:py-10 lg:px-12 xl:px-14">
          <div className="mb-6 flex w-full max-w-[440px] items-center justify-between">
            <Link href="/" className="group flex items-center gap-2 lg:hidden" aria-label="Về trang chủ TOEIC AI"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 transition group-hover:scale-105"><span className="material-symbols-outlined">school</span></span><span className="font-headline-sm text-headline-sm font-bold">TOEIC AI</span></Link>
            <Link href="/" className="ml-auto font-label-md text-label-md font-semibold text-on-surface-variant transition hover:text-primary">Về trang chủ</Link>
          </div>
          <div className="auth-card w-full max-w-[440px] rounded-[24px] border border-outline-variant/60 bg-white/80 p-5 shadow-[0_16px_30px_rgba(27,65,174,0.08)] backdrop-blur-sm sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
