
"use client";

import PageOne from './page-one';
import PageTwo from './page-two';
import type { AppState } from '@/lib/types';
import { EditorSidebarTrigger } from '../ui/editor-sidebar';
import { SidebarTrigger } from '../ui/sidebar';
import { ScrollArea } from '../ui/scroll-area';
import { PreviewSidebar, PreviewSidebarTrigger } from '../ui/preview-sidebar';
import DocumentOutline from './document-outline';

interface PreviewColumnProps {
  state: AppState;
}

export default function PreviewColumn({ state }: PreviewColumnProps) {
  return (
    <section className="flex flex-1 flex-col bg-muted/50 h-screen">
      {/* HEADER: This part has a fixed height and will NOT scroll. */}
      <div className="no-print z-10 flex h-14 flex-shrink-0 items-center gap-2 border-b bg-background/80 p-2 backdrop-blur-sm">
        <SidebarTrigger />
        <EditorSidebarTrigger />
        <div className="ml-auto">
          {/* Other preview header controls can go here */}
          <PreviewSidebarTrigger />
        </div>
      </div>

        <div className="flex flex-1 overflow-hidden">
            {/* This div is the main content area that will take up the remaining space */}
            <div className="flex-1 overflow-auto">
                <ScrollArea className="h-full">
                    <div className="p-5 flex flex-col items-center">
                    <PageOne state={state} />
                    <PageTwo state={state} />
                    </div>
                </ScrollArea>
            </div>
            <PreviewSidebar>
                <DocumentOutline />
            </PreviewSidebar>
        </div>


    </section>
  );
}
