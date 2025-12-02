
"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderPartiesTab from './header-parties-tab';
import FactsTab from './facts-tab';
import EvidenceTab from './evidence-tab';
import ReliefTab from './relief-tab';
import type { AppState } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { TEMPLATE_DATA, TEMPLATES } from '@/lib/data';
import { ChevronRight, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// A simple markdown-to-React component
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
    if (!content) return null;

    // Split by lines to handle paragraphs and bullet points
    const lines = content.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="prose prose-sm dark:prose-invert text-yellow-900 dark:text-yellow-300">
            {lines.map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="font-bold text-base my-2">{line.substring(4)}</h3>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={index} className="block my-1">{line.substring(2, line.length - 2)}</strong>;
                }
                if (line.startsWith('*   ')) {
                    return <li key={index} className="ml-4 list-disc">{line.substring(4)}</li>;
                }
                return <p key={index} className="my-1">{line}</p>;
            })}
        </div>
    );
};


interface EditorColumnProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EditorColumn({ state, dispatch }: EditorColumnProps) {
    const selectedTemplate = TEMPLATES.find(t => t.id === state.selectedTemplate);
    const selectedSubTemplate = selectedTemplate?.subTemplates.find(st => st.id === state.selectedSubTemplate);
    const templateData = TEMPLATE_DATA[state.selectedSubTemplate];
    const Icon = selectedSubTemplate?.icon;

  return (
    <section 
      className="no-print relative flex flex-col bg-card border-r w-full h-full"
    >
      <div className="flex h-14 items-center gap-2 p-2 border-b">
        {selectedTemplate && selectedSubTemplate && Icon && (
          <div className="ml-2 flex items-center gap-2 text-primary font-semibold">
            <Icon className="size-5" />
            <span className="text-base text-muted-foreground">{selectedTemplate.label}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
            <h1 className="text-base">{selectedSubTemplate.label}</h1>
          </div>
        )}
      </div>

      <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
        <div className="p-2 border-b">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="details" className="flex-1">ራስጌ እና ተዋዋይ ወገኖች</TabsTrigger>
            <TabsTrigger value="pleading" className="flex-1">የክሱ ፍሬነገሮች</TabsTrigger>
            <TabsTrigger value="relief" className="flex-1">የክስ ዳኝነት</TabsTrigger>
            <TabsTrigger value="evidence" className="flex-1">ማስረጃዎች</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {templateData?.templateDescription && (
              <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-300">
                <Lightbulb className="h-5 w-5 !text-yellow-500" />
                <AlertTitle className="font-bold">የአብነት መመሪያ</AlertTitle>
                <AlertDescription>
                  <SimpleMarkdown content={templateData.templateDescription} />
                </AlertDescription>
              </Alert>
            )}
            <TabsContent value="details" className="m-0">
              <HeaderPartiesTab state={state} dispatch={dispatch} />
            </TabsContent>
            <TabsContent value="pleading" className="m-0">
              <FactsTab state={state} dispatch={dispatch} />
            </TabsContent>
             <TabsContent value="relief" className="m-0">
              <ReliefTab state={state} dispatch={dispatch} />
            </TabsContent>
            <TabsContent value="evidence" className="m-0">
              <EvidenceTab state={state} dispatch={dispatch} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </section>
  );
}
