"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COURT_HIERARCHY, CITIES, AA_SUBCITIES } from '@/lib/data';
import type { AppState, Party } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HeaderPartiesTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function HeaderPartiesTab({ state, dispatch }: HeaderPartiesTabProps) {
  const { metadata, applicants, respondents } = state;

  const PartyForm = ({ role, party }: { role: 'applicants' | 'respondents'; party: Party }) => (
    <Card className="mb-4 bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-base">{role === 'applicants' ? 'Applicant' : 'Respondent'}</CardTitle>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_PARTY', payload: { role, id: party.id }})}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input placeholder="Full Name" value={party.name} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'name', value: e.target.value } })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>ID No.</Label>
            <Input placeholder="ID No." value={party.idNumber} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'idNumber', value: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="Phone" value={party.phone} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'phone', value: e.target.value } })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={party.address.city} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.city', value } })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Subcity</Label>
            <Select value={party.address.subcity} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcity', value } })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Accordion type="multiple" defaultValue={['item-1', 'item-4', 'item-5']} className="w-full space-y-4">
      <AccordionItem value="item-1" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">Court &amp; Case Header</AccordionTrigger>
        <AccordionContent className="px-4 space-y-4">
          <div className="space-y-2">
            <Label>Court Tier (ደረጃ)</Label>
            <Select value={metadata.courtLevel} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'courtLevel', value } })}>
              <SelectTrigger><SelectValue placeholder="Select court tier" /></SelectTrigger>
              <SelectContent>{Object.keys(COURT_HIERARCHY).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Bench/Division (ችሎት)</Label>
             <Select value={metadata.bench} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value } })}>
                <SelectTrigger><SelectValue placeholder="Select bench" /></SelectTrigger>
                <SelectContent>{(COURT_HIERARCHY[metadata.courtLevel as keyof typeof COURT_HIERARCHY] || []).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>City (ከተማ)</Label>
            <Select value={metadata.city} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'city', value } })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>{CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>File No. (መዝገብ ቁጥር)</Label>
            <Input value={metadata.fileNumber} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'fileNumber', value: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <Label>Date (ቀን)</Label>
            <Input value={metadata.date} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'date', value: e.target.value } })} />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">Procedural &amp; Intro</AccordionTrigger>
        <AccordionContent className="px-4 space-y-4">
          <div className="space-y-2">
            <Label>Jurisdiction Law (Proc. No.)</Label>
            <Input value={metadata.jurisdictionLaw} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'jurisdictionLaw', value: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <Label>Representation (ውክልና)</Label>
            <RadioGroup value={metadata.representation} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'representation', value } })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="rep-self" /><Label htmlFor="rep-self">In person (ራሴ በመቅረብ ነው)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="lawyer" id="rep-lawyer" /><Label htmlFor="rep-lawyer">Through lawyer (በጠበቃዬ አማካይነት ነው)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="both" id="rep-both" /><Label htmlFor="rep-both">Both (በራሴ እና በጠበቃዬ)</Label></div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Summons Delivery (መጥሪያ)</Label>
            <RadioGroup value={metadata.summonsDelivery} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'summonsDelivery', value } })}>
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="sum-self" /><Label htmlFor="sum-self">By Myself (በራሴ)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="police" id="sum-police" /><Label htmlFor="sum-police">Police (በፖሊስ)</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="post" id="sum-post" /><Label htmlFor="sum-post">Post (በፖስታ)</Label></div>
            </RadioGroup>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-4" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">Plaintiff / Applicant</AccordionTrigger>
        <AccordionContent className="px-4">
          {applicants.map(p => <PartyForm key={p.id} role="applicants" party={p} />)}
          <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'applicants' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Applicant
          </Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-5" className="border rounded-lg bg-background">
        <AccordionTrigger className="px-4 text-primary">Defendant / Respondent</AccordionTrigger>
        <AccordionContent className="px-4">
          {respondents.map(p => <PartyForm key={p.id} role="respondents" party={p} />)}
           <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'respondents' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Respondent
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
