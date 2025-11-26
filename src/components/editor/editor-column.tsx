
"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderPartiesTab from './header-parties-tab';
import FactsTab from './facts-tab';
import EvidenceTab from './evidence-tab';
import type { AppState } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { SidebarTrigger } from '../ui/sidebar';
import { TEMPLATES } from '@/lib/data';
import { Separator } from '../ui/separator';

interface EditorColumnProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EditorColumn({ state, dispatch }: EditorColumnProps) {
  const selectedTemplate = TEMPLATES.find(t => t.id === state.selectedTemplate);
  const Icon = selectedTemplate?.icon;

  return (
    <section 
      className="no-print relative flex flex-col bg-card border-r w-[45%] min-w-[450px]"
    >
      <div className="flex h-14 items-center p-2 border-b">
        <SidebarTrigger />
        {Icon && (
          <div className="ml-2 flex items-center gap-2 text-primary font-semibold">
            <Icon className="size-5" />
            <h1 className="text-base">{selectedTemplate?.label}</h1>
          </div>
        )}
      </div>

      <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
        <div className="p-2 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">ራስጌ እና ተዋዋይ ወገኖች</TabsTrigger>
            <TabsTrigger value="pleading" className="flex-1">የክሱ ፍሬነገሮች</TabsTrigger>
            <TabsTrigger value="evidence" className="flex-1">ማስረጃዎች</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="details">
              <HeaderPartiesTab state={state} dispatch={dispatch} />
            </TabsContent>
            <TabsContent value="pleading">
              <FactsTab state={state} dispatch={dispatch} />
            </TabsContent>
            <TabsContent value="evidence">
              <EvidenceTab state={state} dispatch={dispatch} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </section>
  );
}
