'use client';

import { useState } from 'react';

const levelOptions = [
  ['Mới bắt đầu', 'Nắm nền tảng từ vựng, ngữ pháp và cấu trúc bài thi.'],
  ['Cơ bản', 'Củng cố kỹ năng còn yếu và tăng độ chính xác.'],
  ['Trung cấp', 'Tăng tốc độ làm bài và xử lý câu hỏi nâng cao.'],
  ['Khá', 'Luyện đề theo mục tiêu và hoàn thiện chiến thuật.'],
] as const;

const goalSteps: Record<string, string[]> = {
  '450': ['Củng cố từ vựng và ngữ pháp nền tảng', 'Luyện Reading Part 5-6 theo độ khó cơ bản', 'Tập thói quen làm bài và theo dõi độ chính xác'],
  '550': ['Mở rộng từ vựng theo chủ đề TOEIC', 'Củng cố Inference, Main Idea và Vocabulary in Context', 'Luyện Listening và Reading theo từng Part'],
  '650': ['Ưu tiên các kỹ năng có mức độ thành thạo thấp', 'Kết hợp bài luyện trung bình và nâng cao', 'Luyện thời gian làm bài và kiểm tra tiến bộ định kỳ'],
  '750': ['Luyện đề toàn diện theo cấu trúc TOEIC', 'Tập trung tốc độ, bẫy câu hỏi và độ chính xác', 'Phân tích Post-test để tinh chỉnh chiến thuật'],
};

export function RoadmapPlanner() {
  const [goal, setGoal] = useState('550');
  const [level, setLevel] = useState('Cơ bản');

  return (
    <div className="marketing-layer mt-10 grid gap-6 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <span className="font-label-sm text-label-sm font-semibold uppercase tracking-[0.12em] text-primary">Tạo lộ trình định hướng</span>
        <h3 className="mt-3 font-headline-md text-headline-md font-bold">Chọn mục tiêu để bắt đầu</h3>
        <p className="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">Lộ trình dưới đây là định hướng cơ bản. Bài đánh giá đầu vào sẽ giúp hệ thống tạo lộ trình chính xác hơn theo năng lực thực tế.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block font-label-md text-label-md font-semibold">Mục tiêu điểm TOEIC</span>
            <select value={goal} onChange={(event) => setGoal(event.target.value)} className="h-11 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-md text-body-md outline-none focus:border-primary focus:ring-4 focus:ring-primary/10">
              <option value="450">450+</option>
              <option value="550">550+</option>
              <option value="650">650+</option>
              <option value="750">750+</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block font-label-md text-label-md font-semibold">Trình độ hiện tại</span>
            <select value={level} onChange={(event) => setLevel(event.target.value)} className="h-11 w-full rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-md text-body-md outline-none focus:border-primary focus:ring-4 focus:ring-primary/10">
              {levelOptions.map(([value]) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="marketing-layer-soft rounded-xl bg-surface-container-lowest p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-outline-variant/30 pb-4">
          <div><span className="font-label-sm text-label-sm font-semibold uppercase tracking-[0.1em] text-tertiary">Lộ trình cơ bản</span><h4 className="mt-1 font-headline-md text-headline-md font-bold">Mục tiêu {goal}+ từ mức {level}</h4></div>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-label-sm text-label-sm font-semibold text-primary">Định hướng</span>
        </div>
        <ol className="mt-5 space-y-4">{goalSteps[goal].map((step, index) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span><span className="pt-1 font-body-md text-body-md text-on-surface-variant">{step}</span></li>)}</ol>
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-tertiary/20 bg-tertiary/5 p-3"><span className="material-symbols-outlined text-tertiary">fact_check</span><p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">Sau khi đăng ký, hãy làm bài đánh giá đầu vào để tạo Baseline. Hệ thống sẽ so sánh trình độ, mục tiêu và kết quả từng kỹ năng để cập nhật lộ trình chuẩn hơn.</p></div>
      </div>
    </div>
  );
}