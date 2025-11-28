

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
        <Card className="mb-4 bg-muted/30 border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
            <CardTitle className="text-base capitalize"></CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_PARTY', payload: { role, id: party.id }})}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
                <Label className="whitespace-nowrap">ማዕረግ</Label>
                 <Select value={party.honorific} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'honorific', value } })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{HONORIFICS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                 </Select>
            </div>
             <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
                <Label className="whitespace-nowrap">ሙሉ ስም</Label>
                <Input placeholder="Full Name" value={party.name} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'name', value: e.target.value } })} />
            </div>

            <div className="space-y-2 pt-2">
                <Label className="font-semibold">አድራሻ</Label>
                <div className="space-y-3">
                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
                        <Label>ከተማ/ክልል</Label>
                        <Select value={party.address.city} onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.city', value } })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-x-4 gap-y-3">
                        <Label>ክፍለ ከተማ</Label>
                        <Select 
                            value={party.address.subcity} 
                            onValueChange={(value) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcity', value } })}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                        
                        <Label>ወረዳ</Label>
                        <Input className="h-9" placeholder="e.g., 03" value={party.address.woreda} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.woreda', value: e.target.value } })} />
                        
                        <Label>የቤት ቁጥር</Label>
                         <Input className="h-9" placeholder="e.g., 1234" value={party.address.houseNo} onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.houseNo', value: e.target.value } })} />
                    </div>
                    {party.address.subcity === 'ሌላ' && (
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 pt-1">
                             <Label>ሌላ ክ/ከተማ</Label>
                             <Input
                                placeholder="Please specify other subcity"
                                value={party.address.subcityOther || ''}
                                onChange={(e) => dispatch({ type: 'UPDATE_PARTY', payload: { role, id: party.id, field: 'address.subcityOther', value: e.target.value }})}
                            />
                        </div>
                    )}
                </div>
            </div>
          </CardContent>
        </Card>
      );
}
