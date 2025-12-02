
"use client";

import PageOne from './page-one';
import PageTwo from './page-two';
import type { AppState } from '@/lib/types';
import { EditorSidebarTrigger } from '../ui/editor-sidebar';
import { SidebarTrigger } from '../ui/sidebar';
import { ScrollArea } from '../ui/scroll-area';

interface PreviewColumnProps {
  state: AppState;
}

export default function PreviewColumn({ state }: PreviewColumnProps) {
  return (
    <section id="preview-col" className="flex-1 bg-muted/50 flex flex-col overflow-hidden">
      <div className="no-print sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 p-2 backdrop-blur-sm">
        <SidebarTrigger />
        <EditorSidebarTrigger />
        <div className="ml-auto">
          {/* Other preview header controls can go here */}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-5 flex flex-col items-center">
          <PageOne state={state} />
          <PageTwo state={state} />
        </div>
      </ScrollArea>
    </section>
  );
}
