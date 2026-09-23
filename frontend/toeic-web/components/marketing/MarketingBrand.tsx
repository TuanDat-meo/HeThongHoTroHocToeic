'use client';

import type { MouseEvent } from 'react';

export function MarketingBrand() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', window.location.pathname);
  }

  return (
    <a href="#home" onClick={handleClick} className="group flex min-w-0 items-center gap-3" aria-label="Về đầu trang TOEIC AI">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition group-hover:scale-105">
        <span className="material-symbols-outlined text-2xl text-white">school</span>
      </div>
      <div className="hidden min-w-0 sm:block">
        <span className="block truncate font-headline-md text-headline-md font-bold tracking-tight text-on-surface">TOEIC AI</span>
        <span className="block font-label-sm text-label-sm font-medium text-on-surface-variant">Lộ trình học TOEIC cá nhân hóa</span>
      </div>
    </a>
  );
}