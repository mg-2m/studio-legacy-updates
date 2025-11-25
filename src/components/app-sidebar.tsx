
"use client";
import { Printer, Scale, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppSidebar() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <aside className="no-print flex h-screen w-64 flex-col bg-primary text-primary-foreground flex-shrink-0">
      <div className="flex h-16 items-center border-b border-secondary px-6">
        <Scale className="h-6 w-6 text-accent" />
        <span className="ml-3 text-lg font-bold">አዲስ ክራውን (ADDIS CROWN)</span>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Button variant="secondary" className="w-full justify-start text-base">
          <FileText className="mr-2 h-5 w-5" />
          የፍቺ ማመልከቻ (Divorce)
        </Button>
        <Button variant="ghost" className="w-full justify-start text-base text-primary-foreground/70 hover:bg-secondary hover:text-primary-foreground">
          <Briefcase className="mr-2 h-5 w-5" />
          የሠራተኛ ክርክር (Labour)
        </Button>
      </nav>
      <div className="mt-auto p-4">
        <Button
          onClick={handlePrint}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base"
        >
          <Printer className="mr-2 h-5 w-5" />
          Generate / Print
        </Button>
      </div>
    </aside>
  );
}
