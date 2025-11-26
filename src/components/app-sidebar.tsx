
"use client";
import React from 'react';
import { Printer, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/lib/data';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  selectedTemplate: 'divorce' | 'labour';
  dispatch: React.Dispatch<any>;
}

export default function AppSidebar({ selectedTemplate, dispatch }: AppSidebarProps) {
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
        <SidebarMenu>
          {TEMPLATES.map(template => (
            <SidebarMenuItem key={template.id}>
              <SidebarMenuButton 
                isActive={selectedTemplate === template.id}
                onClick={() => dispatch({ type: 'SET_SELECTED_TEMPLATE', payload: template.id })}
              >
                <template.icon />
                <span>{template.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
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
