
"use client";
import React from 'react';
import { Printer, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  selectedTemplate: string;
  selectedSubTemplate: string;
  dispatch: React.Dispatch<any>;
}

export default function AppSidebar({ selectedTemplate, selectedSubTemplate, dispatch }: AppSidebarProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Scale className="size-5 text-accent" />
          <span className="text-base font-semibold">አዲስ ክራውን (ADDIS CROWN)</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Accordion type="multiple" defaultValue={[selectedTemplate]} className="w-full">
            {TEMPLATES.map(template => (
              <AccordionItem value={template.id} key={template.id} className="border-b border-sidebar-border/50">
                <AccordionTrigger className="px-2 py-2 text-sm font-semibold hover:bg-sidebar-accent/70 hover:no-underline [&[data-state=open]]:bg-sidebar-accent">
                    <div className="flex items-center gap-2 text-sidebar-foreground">
                        <template.icon className="size-5" />
                        <span>{template.label}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 bg-black/20">
                    <SidebarMenu>
                    {template.subTemplates.map(subTemplate => (
                        <SidebarMenuItem key={subTemplate.id}>
                        <SidebarMenuButton 
                            isActive={selectedSubTemplate === subTemplate.id}
                            onClick={() => dispatch({ type: 'SET_SELECTED_SUB_TEMPLATE', payload: { templateId: template.id, subTemplateId: subTemplate.id } })}
                        >
                            <subTemplate.icon className="size-4" />
                            <span>{subTemplate.label}</span>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handlePrint}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Printer />
          <span>Generate / Print</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
