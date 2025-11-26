"use client";

import React from 'react';
import type { AppState } from '@/lib/types';
import AppSidebar from '@/components/app-sidebar';
import EditorColumn from '@/components/editor/editor-column';
import PreviewColumn from '@/components/preview/preview-column';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

interface MainLayoutProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function MainLayout({ state, dispatch }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <AppSidebar selectedTemplate={state.selectedTemplate} dispatch={dispatch} />
        <SidebarInset>
          <main className="flex flex-1 overflow-hidden">
            <EditorColumn
              state={state}
              dispatch={dispatch}
            />
            <PreviewColumn state={state} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
