'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';

const navigationItems = [
  ['home', 'Trang chủ'],
  ['features', 'Tính năng'],
  ['methodology', 'Cách hoạt động'],
  ['roadmap', 'Lộ trình'],
  ['pricing', 'Gói học'],
] as const;

export function MarketingNav() {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, targetId: string) {
    event.preventDefault();
    setIsOpen(false);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    window.history.replaceState(null, '', `#${targetId}`);
  }

  return (
    <div className="relative">
      <nav className="hidden items-center gap-1 rounded-full border border-outline-variant/40 bg-surface-container-low px-1.5 py-1 md:flex" aria-label="Điều hướng chính">
        {navigationItems.map(([targetId, label]) => (
          <a
            key={targetId}
            href={`#${targetId}`}
            onClick={(event) => handleNavigation(event, targetId)}
            className="rounded-full px-3.5 py-2 font-label-md text-label-md font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-primary lg:px-4"
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-marketing-navigation"
        aria-label={isOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
        onClick={() => setIsOpen(!isOpen)}
        className="marketing-button flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-container-low text-on-surface md:hidden"
      >
        <span className="material-symbols-outlined text-[21px]">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {isOpen && (
        <nav id="mobile-marketing-navigation" className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-2 shadow-xl md:hidden" aria-label="Điều hướng trên thiết bị di động">
          {navigationItems.map(([targetId, label]) => (
            <a
              key={targetId}
              href={`#${targetId}`}
              onClick={(event) => handleNavigation(event, targetId)}
              className="block rounded-lg px-3 py-3 font-label-md text-label-md font-semibold text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}