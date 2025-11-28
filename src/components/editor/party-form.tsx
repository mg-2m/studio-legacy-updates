
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { REGIONS_AND_CITIES, AA_SUBCITIES, HONORIFICS } from '@/lib/data';
import type { Party } from '@/lib/types';
import { X } from 'lucide-react';
import { Separator } from '../ui/separator';

interface PartyFormProps {
  role: 'applicants' | 'respondents';
  party: Party;
  dispatch: React.Dispatch<any>;
}

export default function PartyForm({ role, party, dispatch }: PartyFormProps) {
    return (
        <div className="mb-4">
          <div className="flex items-center justify-end">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_PARTY', payload: { role, id: party.id }})}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4 p-0">
            <div className="grid grid-cols-[auto_150px_auto_1fr] items-center gap-x-4">
                <Label className="whitespace-nowrap">ማዕረግ</Label>
                 <Select value={party.honorific} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'honorific', value } })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{HONORIFICS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                 </Select>
                <Label className="whitespace-nowrap">ሙሉ ስም</Label>
                <Input value={party.name} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'name', value: e.target.value } })} />
            </div>

            <div className="space-y-3 pt-2">
                <Label className="font-semibold text-sm">አድራሻ</Label>
                 <div className="grid grid-cols-[auto_1.5fr_auto_1.5fr_auto_1fr_auto_1fr] items-center gap-x-2 gap-y-3">
                    <Label className="text-xs">ከተማ/ክልል</Label>
                    <Select value={party.address.city} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.city', value } })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    
                    <Label className="text-xs">ክ/ከተማ</Label>
                    <Select 
                        value={party.address.subcity} 
                        onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcity', value } })}
                    >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                    
                    <Label className="text-xs">ወረዳ</Label>
                    <Input className="h-9" value={party.address.woreda} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.woreda', value: e.target.value } })} />
                    
                    <Label className="text-xs">ቤት/ቁ</Label>
                     <Input className="h-9" value={party.address.houseNo} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.houseNo', value: e.target.value } })} />
                </div>
                {party.address.subcity === 'ሌላ' && (
                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 pt-1">
                         <Label className="text-xs">ሌላ ክ/ከተማ</Label>
                         <Input
                            value={party.address.subcityOther || ''}
                            onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcityOther', value: e.target.value }})}
                        />
                    </div>
                )}
            </div>
          </div>
          <Separator className="mt-4"/>
        </div>
      );
}
