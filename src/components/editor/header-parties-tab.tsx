
"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COURT_HIERARCHY, REGIONS_AND_CITIES, TEMPLATE_DATA } from '@/lib/data';
import type { AppState } from '@/lib/types';
import PartyForm from './party-form';
import { cn } from "@/lib/utils";


interface HeaderPartiesTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function HeaderPartiesTab({ state, dispatch }: HeaderPartiesTabProps) {
  const { metadata, applicants, respondents, partyTitles, selectedSubTemplate } = state;
  const dateObject = metadata.date.endsWith(' EC') ? new Date() : new Date(metadata.date);
  
  return (
    <Accordion type="multiple" defaultValue={['item-1', 'item-4', 'item-5']} className="w-full space-y-4">
      <AccordionItem value="item-1" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">የፍ/ቤት እና የክስ ራስጌ (Court & Header)</AccordionTrigger>
        <AccordionContent className="px-4 space-y-4">
          <div className="space-y-2">
            <Label>የፍ/ቤት ደረጃ (Court Tier)</Label>
            <Select 
              value={metadata.courtLevel} 
              onValueChange={(value) => {
                dispatch({ type: 'UPDATE_METADATA', payload: { key: 'courtLevel', value } });
                const newDefaultBench = COURT_HIERARCHY[value as keyof typeof COURT_HIERARCHY][0];
                dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value: newDefaultBench } });
              }}
            >
              <SelectTrigger><SelectValue placeholder="Select court tier" /></SelectTrigger>
              <SelectContent>{Object.keys(COURT_HIERARCHY).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ችሎት (Bench/Division)</Label>
             <Select value={metadata.bench} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value } })}>
                <SelectTrigger><SelectValue placeholder="Select bench" /></SelectTrigger>
                <SelectContent>{(COURT_HIERARCHY[metadata.courtLevel as keyof typeof COURT_HIERARCHY] || []).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ከተማ (City/Region)</Label>
            <Select value={metadata.city} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'city', value } })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>የመዝገብ ቁጥር (File No.)</Label>
            <Input value={metadata.fileNumber} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'fileNumber', value: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <Label>ቀን (Date)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !metadata.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {metadata.date ? metadata.date : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateObject}
                  onSelect={(date) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'date', value: date ? format(date, "dd/MM/yyyy") + ' EC' : '' } })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">ሥነ-ሥርዓት እና መግቢያ (Procedure & Intro)</AccordionTrigger>
        <AccordionContent className="px-4 space-y-4">
          
          <div className="space-y-2">
            <Label>ውክልና (Representation)</Label>
            <RadioGroup value={metadata.representation} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'representation', value } })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="rep-self" /><Label htmlFor="rep-self">ራሴ በመቅረብ ነው (In person)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="lawyer" id="rep-lawyer" /><Label htmlFor="rep-lawyer">በጠበቃዬ አማካይነት ነው (Through lawyer)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="both" id="rep-both" /><Label htmlFor="rep-both">በራሴ እና በጠበቃዬ (Both)</Label></div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>መጥሪያ አደራረስ (Summons Delivery)</Label>
            <RadioGroup value={metadata.summonsDelivery} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'summonsDelivery', value } })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="sum-self" /><Label htmlFor="sum-self">በራሴ (By Myself)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="police" id="sum-police" /><Label htmlFor="sum-police">በፖሊስ (Police)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="post" id="sum-post" /><Label htmlFor="sum-post">በፖስታ (Post)</Label></div>
            </RadioGroup>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-4" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">{partyTitles.applicant}</AccordionTrigger>
        <AccordionContent className="px-4">
          {applicants.map(p => <PartyForm key={p.id} role="applicants" party={p} dispatch={dispatch} />)}
          <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'applicants' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Applicant
          </Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-5" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">{partyTitles.respondent}</AccordionTrigger>
        <AccordionContent className="px-4">
          {respondents.map(p => <PartyForm key={p.id} role="respondents" party={p} dispatch={dispatch} />)}
           <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'respondents' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Respondent
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
