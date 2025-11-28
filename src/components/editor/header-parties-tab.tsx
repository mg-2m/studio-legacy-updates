
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
import { COURT_HIERARCHY, REGIONS_AND_CITIES } from '@/lib/data';
import type { AppState } from '@/lib/types';
import PartyForm from './party-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';


interface HeaderPartiesTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function HeaderPartiesTab({ state, dispatch }: HeaderPartiesTabProps) {
  const { metadata, applicants, respondents, partyTitles } = state;
  
  return (
    <div className="w-full space-y-4">
      <Card className="bg-background">
        <CardHeader>
            <CardTitle className="text-base text-primary">የፍ/ቤት እና የክስ ራስጌ (Court & Header)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-2 gap-8">
            {/* Left Column for Court Details */}
            <div className="space-y-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                    <Label className="whitespace-nowrap">የፍ/ቤት ደረጃ</Label>
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
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                    <Label>ችሎት</Label>
                    <Select value={metadata.bench} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'bench', value } })}>
                        <SelectTrigger><SelectValue placeholder="Select bench" /></SelectTrigger>
                        <SelectContent>{(COURT_HIERARCHY[metadata.courtLevel as keyof typeof COURT_HIERARCHY] || []).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                    <Label>ከተማ</Label>
                    <Select value={metadata.city} onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'city', value } })}>
                        <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                        <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>

            {/* Right Column for Date and File Number */}
            <div className="space-y-2">
                <div className="space-y-2">
                  <Label>ቀን (Date)</Label>
                  <Input value={metadata.date} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'date', value: e.target.value } })} />
                </div>
                <div className="space-y-2">
                    <Label>የመዝገብ ቁጥር (File No.)</Label>
                    <Input value={metadata.fileNumber} onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'fileNumber', value: e.target.value } })} />
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-background">
        <CardHeader>
            <CardTitle className="text-base text-primary">ሥነ-ሥርዓት እና መግቢያ (Procedure & Intro)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>ውክልና</Label>
            <RadioGroup 
                value={metadata.representation} 
                onValueChange={(value) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'representation', value } })}
                className="flex space-x-6"
            >
                <div className="flex items-center space-x-2"><RadioGroupItem value="self" id="rep-self" /><Label htmlFor="rep-self">ራሴ በመቅረብ</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="lawyer" id="rep-lawyer" /><Label htmlFor="rep-lawyer">በጠበቃዬ አማካይነት</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="both" id="rep-both" /><Label htmlFor="rep-both">በራሴ እና በጠበቃዬ</Label></div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>መጥሪያ አደራረስ</Label>
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
      
      <Card className="bg-background">
         <CardHeader>
            <CardTitle className="text-base text-primary">{partyTitles.applicant}</CardTitle>
        </CardHeader>
        <CardContent>
          {applicants.map(p => <PartyForm key={p.id} role="applicants" party={p} dispatch={dispatch} />)}
          <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'applicants' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Applicant
          </Button>
        </CardContent>
      </Card>
      
      <Card className="bg-background">
        <CardHeader>
            <CardTitle className="text-base text-primary">{partyTitles.respondent}</CardTitle>
        </CardHeader>
        <CardContent>
          {respondents.map(p => <PartyForm key={p.id} role="respondents" party={p} dispatch={dispatch} />)}
           <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_PARTY', payload: { role: 'respondents' } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Respondent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
