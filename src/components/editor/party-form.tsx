

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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PartyFormProps {
  role: 'applicants' | 'respondents';
  party: Party;
  dispatch: React.Dispatch<any>;
}

export default function PartyForm({ role, party, dispatch }: PartyFormProps) {
    return (
        <Card className="mb-4 bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-base capitalize">{role.slice(0, -1)}</CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_PARTY', payload: { role, id: party.id }})}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 px-4 pb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 col-span-1">
                 <Label>ማዕረግ (Title)</Label>
                 <Select value={party.honorific} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'honorific', value } })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{HONORIFICS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                 </Select>
              </div>
              <div className="space-y-2 col-span-3">
                <Label>ሙሉ ስም (Full Name)</Label>
                <Input placeholder="Full Name" value={party.name} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'name', value: e.target.value } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>የመታወቂያ ቁ. (ID No.)</Label>
                <Input placeholder="ID No." value={party.idNumber} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'idNumber', value: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <Label>ስልክ (Phone)</Label>
                <Input placeholder="Phone" value={party.phone} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'phone', value: e.target.value } })} />
              </div>
            </div>
            <div className="space-y-2">
                <Label>አድራሻ (Address)</Label>
                <div className="grid grid-cols-1 gap-4 border p-3 rounded-md">
                    <div className="space-y-2">
                        <Label className="text-xs">ከተማ/ክልል (City/Region)</Label>
                        <Select value={party.address.city} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.city', value } })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs">ክፍለ ከተማ (Subcity)</Label>
                            <Select 
                                value={party.address.subcity} 
                                onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcity', value } })}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                            {party.address.subcity === 'Other (ሌላ)' && (
                                <Input
                                    className="mt-2"
                                    placeholder="Please specify other subcity"
                                    value={party.address.subcityOther || ''}
                                    onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcityOther', value: e.target.value }})}
                                />
                            )}
                        </div>
                         <div className="space-y-2">
                            <Label className="text-xs">ወረዳ (Woreda)</Label>
                            <Input placeholder="e.g., 03" value={party.address.woreda} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.woreda', value: e.target.value } })} />
                        </div>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      );
}
