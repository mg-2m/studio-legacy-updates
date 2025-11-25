"use client";

import PageOne from './page-one';
import PageTwo from './page-two';
import type { AppState } from '@/lib/types';

interface PreviewColumnProps {
  state: AppState;
}

export default function PreviewColumn({ state }: PreviewColumnProps) {
  return (
    <section id="preview-col" className="flex-1 bg-muted/50 p-5 overflow-y-auto flex flex-col items-center">
      <PageOne state={state} />
      <PageTwo state={state} />
    </section>
  );
}
