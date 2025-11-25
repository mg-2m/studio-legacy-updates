"use client";

import React, { useState } from 'react';
import type { AppState } from '@/lib/types';
import AppSidebar from '@/components/app-sidebar';
import EditorColumn from '@/components/editor/editor-column';
import PreviewColumn from '@/components/preview/preview-column';

interface MainLayoutProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function MainLayout({ state, dispatch }: MainLayoutProps) {
  const [isEditorCollapsed, setEditorCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <AppSidebar />
      <main className="flex flex-1 overflow-hidden">
        <EditorColumn
          state={state}
          dispatch={dispatch}
          isCollapsed={isEditorCollapsed}
          onToggle={() => setEditorCollapsed(!isEditorCollapsed)}
        />
        <PreviewColumn state={state} />
      </main>
    </div>
  );
}
