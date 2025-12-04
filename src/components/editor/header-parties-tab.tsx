

"use client";

import { Plus } from 'lucide-react';
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
import { COURT_HIERARCHY, REGIONS_AND_CITIES, BENCH_TYPES } from '@/lib/data';
import type { AppState } from '@/lib/types';
import PartyForm from './party-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SubjectOfClaim from './subject-of-claim';

interface HeaderPartiesTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function HeaderPartiesTab({ state, dispatch }: HeaderPartiesTabProps) {
  const { metadata, applicants, respondents, partyTitles } = state;
  const benches = COURT_HIERARCHY[metadata.courtLevel as keyof typeof COURT_HIERARCHY] || [];

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
            <CardTitle className="text-base text-primary">የፍ/ቤት እና የክስ ራስጌ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0">
          <div className="space-y-4">
             <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>የፍ/ቤት ደረጃ</Label>
              <Select 
                value={metadata.courtLevel} 
                onValueChange={(value) => {
                  dispatch({ type: 'UPDATE_METADATA', payload: { key: 'courtLevel', value } });
                  const newBenches = COURT_HIERARCHY[value as keyof typeof COURT_HIERARCHY] || [];
                  const newDefaultBench = newBenches.length > 0 ? newBenches[0] : 'ሌላ';
                  dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value: newDefaultBench } });
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.keys(COURT_HIERARCHY).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>የችሎት አካባቢ</Label>
               {metadata.bench === 'ሌላ' ? (
                 <Input 
                    value={metadata.benchOther || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'benchOther', value: e.target.value }})}
                    placeholder="የችሎቱን ስም ያስገቡ"
                />
               ) : (
                <Select value={metadata.bench} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value } })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{benches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
               )}
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>የችሎት አይነት</Label>
              <Select value={metadata.benchType} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'benchType', value } })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{BENCH_TYPES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label>ከተማ</Label>
              <Select value={metadata.city} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'city', value } })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label>ቀን</Label>
                    <Input value={metadata.date} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'date', value: e.target.value } })} />
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label>የመዝገብ ቁጥር</Label>
                    <Input value={metadata.fileNumber} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'fileNumber', value: e.target.value } })} />
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 space-y-2">
          {applicants.map(p => <PartyForm key={p.id} role="applicants" party={p} dispatch={dispatch} title={partyTitles.applicant} />)}
          <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'applicants' } })}>
            <Plus className="mr-2 h-4 w-4" /> {partyTitles.applicant} ጨምር
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 space-y-2">
          {respondents.map(p => <PartyForm key={p.id} role="respondents" party={p} dispatch={dispatch} title={partyTitles.respondent}/>)}
           <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'respondents' } })}>
            <Plus className="mr-2 h-4 w-4" /> {partyTitles.respondent} ጨምር
          </Button>
        </CardContent>
      </Card>

      <SubjectOfClaim state={state} dispatch={dispatch} />

      <Card>
        <CardContent className="space-y-6 p-4">
          <div className="space-y-2">
            <Label>ውክልና (ጉዳዩን የሚከታተለው ማን ነው?)</Label>
            <RadioGroup 
                value={metadata.representation} 
                onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'representation', value } })}
                className="flex space-x-6"
            >
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="rep-self" /><Label htmlFor="rep-self">በራሴ</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="lawyer" id="rep-lawyer" /><Label htmlFor="rep-lawyer">በጠበቃዬ</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="both" id="rep-both" /><Label htmlFor="rep-both">በራሴ እና በጠበቃዬ</Label></div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>መጥሪያ አደራረስ (ሂደት አንዴት መሆን አለበት?)</Label>
            <RadioGroup 
                value={metadata.summonsDelivery} 
                onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'summonsDelivery', value } })}
                className="flex space-x-6"
            >
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="sum-self" /><Label htmlFor="sum-self">በራሴ</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="police" id="sum-police" /><Label htmlFor="sum-police">በፖሊስ</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="post" id="sum-post" /><Label htmlFor="sum-post">በፖስታ</Label></div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
