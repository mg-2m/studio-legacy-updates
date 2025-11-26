
"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderPartiesTab from './header-parties-tab';
import FactsTab from './facts-tab';
import EvidenceTab from './evidence-tab';
import type { AppState } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { SidebarTrigger } from '../ui/sidebar';

interface EditorColumnProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EditorColumn({ state, dispatch }: EditorColumnProps) {
  return (
    <section 
      className="no-print relative flex flex-col bg-card border-r w-[45%] min-w-[450px]"
    >
      <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center p-2 border-b">
          <SidebarTrigger />
          <TabsList className="ml-2 flex-1">
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
