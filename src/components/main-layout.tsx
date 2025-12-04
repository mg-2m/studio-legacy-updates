
"use client";

import React from 'react';
import type { AppState } from '@/lib/types';
import AppSidebar from '@/components/app-sidebar';
import EditorColumn from '@/components/editor/editor-column';
import PreviewColumn from '@/components/preview/preview-column';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { EditorSidebarProvider, EditorSidebar, EditorSidebarInset } from '@/components/ui/editor-sidebar';
import Welcome from './welcome';


interface MainLayoutProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function MainLayout({ state, dispatch }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full bg-background overflow-hidden">
        <AppSidebar selectedTemplate={state.selectedTemplate} selectedSubTemplate={state.selectedSubTemplate} dispatch={dispatch} />
        <SidebarInset>
          <EditorSidebarProvider>
            <main className="flex flex-1 h-dvh overflow-hidden">
                <EditorSidebar>
                    {state.selectedSubTemplate ? (
                        <EditorColumn state={state} dispatch={dispatch} />
                    ) : (
                        <Welcome dispatch={dispatch} />
                    )}
                </EditorSidebar>
                <EditorSidebarInset>
                    <PreviewColumn state={state} />
                </EditorSidebarInset>
            </main>
          </EditorSidebarProvider>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
