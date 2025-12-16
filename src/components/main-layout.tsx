
"use client";

import EditorColumn from "@/components/editor-column";
import PreviewColumn from "@/components/preview/preview-column";
import type { AppState, Action } from "@/lib/types";
import React from "react";

interface MainLayoutProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export function MainLayout({ state, dispatch }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      <EditorColumn state={state} dispatch={dispatch} />
      <PreviewColumn state={state} />
    </div>
  );
}
