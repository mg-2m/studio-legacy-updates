
"use client";

import React from 'react';
import { Printer, Scale, LayoutGrid, Award, BookOpen, Shield } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
    <Sidebar className="border-r border-white/5 bg-[#000d1b] text-slate-300">
      <SidebarHeader className="h-20 flex items-center justify-center border-b border-white/5 px-4 bg-[#000d1b]">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-1.5 rounded bg-orange-500 shadow-[0_0_15px_rgba(255,138,0,0.3)] transition-transform group-hover:rotate-[360deg] duration-700">
            <Scale className="size-5 text-[#001021]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tighter text-white uppercase italic">Addis Crown</span>
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest leading-none">Enterprise OS</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#000d1b] py-4 px-2 space-y-4">
        <div className="px-2 mb-2">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Legal Sectors</div>
        </div>

        <Accordion type="multiple" defaultValue={[selectedTemplate]} className="w-full space-y-1">
          {TEMPLATES.map(template => (
            <AccordionItem value={template.id} key={template.id} className="border-none">
              <AccordionTrigger className={cn(
                "px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-tight transition-all duration-300",
                "text-slate-400 hover:text-white hover:bg-white/5 hover:no-underline",
                "[&[data-state=open]]:bg-orange-500/10 [&[data-state=open]]:text-orange-500"
              )}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <template.icon className="size-4 shrink-0" />
                  <span className="whitespace-nowrap truncate">{template.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 mt-1 pl-4 border-l border-white/5">
                <SidebarMenu className="gap-1">
                  {template.subTemplates.map(subTemplate => (
                    <SidebarMenuItem key={subTemplate.id}>
                      <SidebarMenuButton
                        isActive={selectedSubTemplate === subTemplate.id}
                        onClick={() => dispatch({ type: 'SET_SELECTED_SUB_TEMPLATE', payload: { templateId: template.id, subTemplateId: subTemplate.id } })}
                        className={cn(
                          "h-9 rounded-md transition-all duration-300",
                          selectedSubTemplate === subTemplate.id
                            ? "bg-white/10 text-white font-bold translate-x-1"
                            : "hover:bg-white/5 text-slate-500 hover:text-slate-300"
                        )}
                      >
                        <subTemplate.icon className={cn("size-3.5", selectedSubTemplate === subTemplate.id && "text-orange-500")} />
                        <span className="text-xs">{subTemplate.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4 bg-[#000814]">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Users className="size-4 text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white uppercase tracking-tighter">Advocate Jafer</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Senior Counsel</span>
              </div>
            </div>
            <Award className="size-3 text-orange-500 animate-pulse" />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sovereign Active</span>
            </div>
            <Shield className="size-3 text-slate-700" />
          </div>
          <Button
            onClick={handlePrint}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-full font-bold shadow-[0_5px_20px_rgba(255,138,0,0.2)] active:scale-95 transition-all"
          >
            <Printer className="mr-2 size-4" />
            <span>Print Verdict</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
