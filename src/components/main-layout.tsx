
"use client";

import EditorColumn from "@/components/editor-column";
import PreviewColumn from "@/components/preview/preview-column";
import type { AppState, Action } from "@/lib/types";
import React from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider, SidebarInset } from "./ui/sidebar";
import { EditorSidebarProvider, EditorSidebar, EditorSidebarInset } from "./ui/editor-sidebar";
import { PreviewSidebarProvider } from "./ui/preview-sidebar";

interface MainLayoutProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export function MainLayout({ state, dispatch }: MainLayoutProps) {
  return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar
            selectedTemplate={state.selectedTemplate}
            selectedSubTemplate={state.selectedSubTemplate ?? ""}
            dispatch={dispatch}
          />
          <EditorSidebarProvider>
            <SidebarInset className="flex-1 flex flex-row overflow-hidden">
                <EditorSidebar>
                    <EditorColumn state={state} dispatch={dispatch} />
                </EditorSidebar>
                <EditorSidebarInset>
                    <PreviewSidebarProvider>
                        <PreviewColumn state={state} />
                    </PreviewSidebarProvider>
                </EditorSidebarInset>
            </SidebarInset>
          </EditorSidebarProvider>
        </div>
    </SidebarProvider>
  );
}
