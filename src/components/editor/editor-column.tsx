

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

// NEW Strategy Card component to render markdown
const StrategyCard: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  // This regex is designed to split by '### ' but also handle potential markdown variations.
  const sections = content.split(/[\r\n]+###\s+/).filter(s => s.trim() !== '');
  
  // The first part might not have '###', handle it as the guide.
  const firstSection = sections[0].startsWith('Guide') ? sections.shift() : `Guide\n${sections.shift()}`;

  const processedSections = sections.map(section => {
      const [title, ...bodyLines] = section.split('\n');
      const body = bodyLines.join('\n').trim();
      return { title: title.trim(), body };
  });

  if (firstSection) {
    const [title, ...bodyLines] = firstSection.split('\n');
    processedSections.unshift({ title: title.replace('###', '').trim(), body: bodyLines.join('\n').trim() });
  }

  return (
    <Alert variant="default" className="bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-300">
      <Lightbulb className="h-5 w-5 !text-yellow-500" />
      <AlertTitle className="font-bold">የአብነት መመሪያ</AlertTitle>
      <AlertDescription>
        <div className="prose prose-sm dark:prose-invert text-yellow-900 dark:text-yellow-300 max-w-none">
          {processedSections.map((section, index) => {
            if (!section.body) return null;
            return (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="font-bold text-base my-1">{section.title}</h3>
                <ul className="list-disc pl-5 mt-1">
                  {section.body.split('\n').map((line, i) => {
                    const cleanLine = line.replace(/^\*\s*/, '').trim();
                    if (cleanLine) return <li key={i}>{cleanLine}</li>;
                    return null;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </AlertDescription>
    </Alert>
  );
};

interface EditorColumnProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EditorColumn({ state, dispatch }: EditorColumnProps) {
    if (!state.selectedSubTemplate) return null;
    const selectedTemplate = TEMPLATES.find(t => t.id === state.selectedTemplate);
    const selectedSubTemplate = selectedTemplate?.subTemplates.find(st => st.id === state.selectedSubTemplate);
    const templateData = TEMPLATE_DATA[state.selectedSubTemplate];
    const Icon = selectedSubTemplate?.icon;

  return (
    <section 
      id="editor-col"
      className="no-print relative flex flex-col bg-card border-r w-full h-full overflow-hidden"
    >
      <div className="flex h-14 shrink-0 items-center gap-2 p-2 border-b">
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
              <StrategyCard content={templateData.templateDescription} />
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
