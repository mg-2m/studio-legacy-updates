"use client";

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EVIDENCE_REGISTRY, EVIDENCE_LOCATIONS } from '@/lib/data';
import type { AppState, ManualEvidence } from '@/lib/types';
import { BrainCircuit, Plus, X, File, Users, Gavel } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EvidenceTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EvidenceTab({ state, dispatch }: EvidenceTabProps) {
  const { smartEvidence, evidence } = state;

  const activeSmartEvidence = Object.entries(smartEvidence)
    .filter(([, ev]) => ev.active)
    .map(([id]) => ({ ...EVIDENCE_REGISTRY[id], regId: id }))
    .filter(Boolean);
    
  const suggestedSmartEvidence = Object.entries(smartEvidence)
    .filter(([, ev]) => !ev.active)
    .map(([id]) => ({ ...EVIDENCE_REGISTRY[id], regId: id }))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
        <BrainCircuit className="h-4 w-4 !text-blue-500" />
        <AlertTitle>ብልጥ ማስረጃ (Smart Evidence)</AlertTitle>
        <AlertDescription>
          በመረጧቸው የክስ ፍሬነገሮች ላይ ተመስርቶ በሲስተሙ የሚጠቆሙ ማስረጃዎች ከታች ይታያሉ።
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Label className="font-bold">የተጨመሩ ማስረጃዎች (Active Evidence)</Label>
        {activeSmartEvidence.length > 0 ? (
          activeSmartEvidence.map(item => (
            <Card key={item.regId} className="bg-green-50/50 border-accent/50 dark:bg-green-950/20">
              <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base text-accent">{item.label}</CardTitle>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_SMART_EVIDENCE', payload: { registryId: item.regId } })}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-2">
                  <Label>{item.credentialLabel}</Label>
                  <Input
                    placeholder={item.credentialPlaceholder}
                    value={smartEvidence[item.regId]?.credentialId || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL', payload: { registryId: item.regId, credentialValue: e.target.value } })}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-lg">
            ምንም የተመረጠ ማስረጃ የለም።
          </div>
        )}
      </div>

       {suggestedSmartEvidence.length > 0 && (
         <div className="space-y-2">
            <Label>የሚጠቆሙ ማስረጃዎች (Suggested Evidence)</Label>
            <div className="flex flex-wrap gap-2">
            {suggestedSmartEvidence.map(item => (
                <Button key={item.regId} variant="outline" size="sm" onClick={() => dispatch({ type: 'ADD_SMART_EVIDENCE', payload: { registryId: item.regId }})}>
                    <Plus className="mr-2 h-4 w-4" />
                    {item.label}
                </Button>
            ))}
            </div>
         </div>
       )}

      <Separator />

      <div>
        <Label className="font-bold">ተጨማሪ ማስረጃ ያስገቡ (Manual Evidence)</Label>
        <div className="mt-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" /> Add Manual Evidence
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Document' } })}>
                <File className="mr-2 h-4 w-4" />
                <span>ሰነድ (Document)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Witness' } })}>
                <Users className="mr-2 h-4 w-4" />
                <span>የሰው ምስክር (Witness)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'CourtOrder' } })}>
                <Gavel className="mr-2 h-4 w-4" />
                <span>የትዕዛዝ (Court Order)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {evidence.length > 0 && <Separator />}

      <div className="space-y-4">
        {evidence.map((item: ManualEvidence) => (
          <Card key={item.id}>
             <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base">{item.type === 'CourtOrder' ? 'Court Order' : item.type} (Manual)</CardTitle>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_EVIDENCE', payload: { id: item.id } })}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                
                {item.type === 'Document' && (
                    <>
                         <div className="space-y-2">
                            <Label>Description (תיאור)</Label>
                            <Input 
                                placeholder={"e.g., Police report about the incident"}
                                value={item.description}
                                onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Issuer (አውጪ)</Label>
                            <Input 
                                placeholder="e.g., Addis Ababa Police Commission"
                                value={item.issuer}
                                onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'issuer', value: e.target.value } })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Reference No. (ቁጥር)</Label>
                                <Input 
                                    placeholder="e.g., AA/Pol/123/24"
                                    value={item.refNumber}
                                    onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'refNumber', value: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Page Count (የገጽ ብዛት)</Label>
                                <Input 
                                    type="number"
                                    placeholder="e.g., 5"
                                    value={item.pageCount}
                                    onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'pageCount', value: e.target.value } })}
                                />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label>Document Type (የሰነዱ አይነት)</Label>
                            <RadioGroup
                                value={item.documentType}
                                onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'documentType', value }})}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Original" id={`orig-${item.id}`} />
                                    <Label htmlFor={`orig-${item.id}`}>Original (ኦርጅናል)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Copy" id={`copy-${item.id}`} />
                                    <Label htmlFor={`copy-${item.id}`}>Copy (ኮፒ)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label>Location of Original (ኦርጅናሉ ያለበት)</Label>
                            <Select 
                                value={item.originalLocation}
                                onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'originalLocation', value } })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {EVIDENCE_LOCATIONS.map(loc => (
                                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}
                 {(item.type === 'Witness' || item.type === 'CourtOrder') && (
                    <div className="space-y-2">
                        <Label>{item.type === 'Witness' ? 'Witness Full Name & Address' : 'Details of Court Order'}</Label>
                        <Input 
                            placeholder={item.type === 'Witness' ? "e.g., Ato Kebede, Addis Ababa, Bole Sub-city" : "e.g., Order for temporary injunction"}
                            value={item.description}
                            onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })}
                        />
                    </div>
                )}
              </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
