"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderPartiesTab from './header-parties-tab';
import FactsTab from './facts-tab';
import EvidenceTab from './evidence-tab';
import type { AppState } from '@/lib/types';

interface EditorColumnProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function EditorColumn({ state, dispatch, isCollapsed, onToggle }: EditorColumnProps) {
  return (
    <section 
      className={`no-print relative flex flex-col bg-card border-r transition-all duration-300 ease-in-out ${isCollapsed ? 'w-10 min-w-10' : 'w-[45%] min-w-[450px]'}`}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggle}
        className="absolute top-4 -right-5 z-10 h-10 w-10 rounded-full"
      >
        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </Button>

      {!isCollapsed && (
        <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
          <TabsList className="m-2">
            <TabsTrigger value="details" className="flex-1">Header & Parties</TabsTrigger>
            <TabsTrigger value="pleading" className="flex-1">Facts</TabsTrigger>
            <TabsTrigger value="evidence" className="flex-1">Evidence</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4">
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
        </Tabs>
      )}
    </section>
  );
}
