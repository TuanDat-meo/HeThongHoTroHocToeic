'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type AuthMode = 'login' | 'register' | 'forgot' | 'reset';

const content: Record<AuthMode, {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
}> = {
  login: {
    eyebrow: '',
    title: 'Chào mừng trở lại',
    description: 'Đăng nhập để tiếp tục lộ trình học tập thích ứng cá nhân hóa của bạn.',
    submitLabel: 'Đăng Nhập Ngay',
  },
  register: {
    eyebrow: 'Bắt đầu hành trình',
    title: 'Tạo tài khoản mới',
    description: 'Thiết lập hồ sơ để nhận lộ trình học cá nhân hóa.',
    submitLabel: 'Tạo tài khoản',
  },
  forgot: {
    eyebrow: 'Lấy lại quyền truy cập',
    title: 'Quên mật khẩu?',
    description: 'Nhập email và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.',
    submitLabel: 'Gửi liên kết đặt lại',
  },
  reset: {
    eyebrow: 'Bảo mật tài khoản',
    title: 'Đặt mật khẩu mới',
    description: 'Mật khẩu mới nên có ít nhất 8 ký tự để bảo vệ tài khoản.',
    submitLabel: 'Lưu mật khẩu mới',
  },
};

function PasswordField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-label-md text-label-md font-semibold text-on-surface">{label}</span>
      <span className="relative block">
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
          lock
        </span>
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          minLength={8}
          required
          className="auth-input h-12 w-full rounded-lg border border-outline-variant/70 bg-surface-container-lowest pl-11 pr-12 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <button
          type="button"
          aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
        >
          <span className="material-symbols-outlined text-[20px]">{visible ? 'visibility_off' : 'visibility'}</span>
        </button>
      </span>
    </label>
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const copy = content[mode];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <div className="mb-6">
        {copy.eyebrow && <span className="mb-3 inline-flex items-center gap-2 font-label-sm text-label-sm font-semibold uppercase tracking-[0.12em] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-tertiary" />{copy.eyebrow}</span>}
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">{copy.title}</h1>
        <p className="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">{copy.description}</p>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-tertiary/25 bg-tertiary/10 p-4 text-body-md text-on-tertiary-fixed">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <div>
              <p className="font-semibold">Đã tiếp nhận yêu cầu</p>
              <p className="mt-1 text-sm opacity-80">
                Đây là bản giao diện thử nghiệm. Khi kết nối backend, thao tác này sẽ được xử lý tự động.
              </p>
            </div>
          </div>
          <button type="button" onClick={() => setSubmitted(false)} className="auth-text-button mt-4 font-label-md font-semibold text-tertiary underline underline-offset-4">
            Thực hiện lại
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'login' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="auth-provider-button flex h-10 items-center justify-center gap-2 rounded-md border border-outline-variant/30 bg-white text-sm font-medium text-on-surface shadow-sm transition hover:border-primary/40 hover:bg-primary/5"><span className="font-bold text-[#4285f4]">G</span>Google</button>
                <button type="button" className="auth-provider-button flex h-10 items-center justify-center gap-2 rounded-md border border-outline-variant/30 bg-white text-sm font-medium text-on-surface shadow-sm transition hover:border-primary/40 hover:bg-primary/5"><span className="grid grid-cols-2 gap-px"><i className="h-1.5 w-1.5 bg-[#f35325]" /><i className="h-1.5 w-1.5 bg-[#81bc06]" /><i className="h-1.5 w-1.5 bg-[#05a6f0]" /><i className="h-1.5 w-1.5 bg-[#ffba08]" /></span>Microsoft</button>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant"><span className="h-px flex-1 bg-outline-variant/40" />Hoặc tiếp tục với tài khoản riêng<span className="h-px flex-1 bg-outline-variant/40" /></div>
            </>
          )}
          {mode === 'register' && (
            <label htmlFor="name" className="block">
              <span className="mb-2 block font-label-md text-label-md font-semibold text-on-surface">Họ và tên</span>
              <span className="relative block">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">person</span>
                <input id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required className="auth-input h-12 w-full rounded-lg border border-outline-variant/70 bg-surface-container-lowest pl-11 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
              </span>
            </label>
          )}

          <label htmlFor="email" className="block">
            <span className="mb-2 flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface">{mode === 'login' ? 'Email hoặc Mã định danh' : 'Email'}{mode === 'login' && <small className="font-normal text-on-surface-variant">Định dạng email</small>}</span>
            <span className="relative block">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">mail</span>
              <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="auth-input h-12 w-full rounded-lg border border-outline-variant/70 bg-surface-container-lowest pl-11 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
            </span>
          </label>

          {mode !== 'forgot' && (
            <PasswordField id="password" label={mode === 'reset' ? 'Mật khẩu mới' : mode === 'login' ? 'Mật khẩu bảo mật' : 'Mật khẩu'} value={password} onChange={setPassword} />
          )}

          {(mode === 'register' || mode === 'reset') && (
            <PasswordField id="confirmation" label="Xác nhận mật khẩu" value={confirmation} onChange={setConfirmation} />
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <input type="checkbox" className="h-4 w-4 accent-primary" />
                Ghi nhớ phiên đăng nhập (30 ngày)
              </label>
              <Link href="/forgot-password" className="auth-text-button font-label-md font-semibold text-primary hover:underline">Quên mật khẩu?</Link>
            </div>
          )}

          {mode === 'register' && (
            <label className="flex items-start gap-2 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-primary" />
              Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật.
            </label>
          )}

          <button type="submit" className="auth-button flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 font-label-md text-label-md font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-container">
            {copy.submitLabel}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      )}

      {mode === 'login' && !submitted && <div className="mt-4 flex items-center justify-between rounded bg-primary/5 px-3 py-2 text-xs text-on-surface-variant"><span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">info</span>Dữ liệu bài làm và kết quả phân tích AI được lưu trữ bảo mật theo tiêu chuẩn ISO/IEC 27001.</span><b className="ml-2 shrink-0 text-tertiary">TLS 1.3</b></div>}

      <div className="mt-8 border-t border-outline-variant/30 pt-6 text-center font-body-sm text-body-sm text-on-surface-variant">
        {mode === 'login' && <>Chưa có tài khoản? <Link href="/register" className="auth-text-button font-semibold text-primary hover:underline">Đăng ký miễn phí</Link></>}
        {mode === 'register' && <>Đã có tài khoản? <Link href="/login" className="auth-text-button font-semibold text-primary hover:underline">Đăng nhập</Link></>}
        {mode === 'forgot' && <>Nhớ lại mật khẩu? <Link href="/login" className="auth-text-button font-semibold text-primary hover:underline">Quay lại đăng nhập</Link></>}
        {mode === 'reset' && <>Đã có mật khẩu? <Link href="/login" className="auth-text-button font-semibold text-primary hover:underline">Đăng nhập ngay</Link></>}
      </div>
    </div>
  );
}