
"use client";
import { Printer, Scale, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

export default function AppSidebar() {
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
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <FileText />
              <span>የፍቺ ማመልከቻ (Divorce)</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Briefcase />
              <span>የሠራተኛ ክርክር (Labour)</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
