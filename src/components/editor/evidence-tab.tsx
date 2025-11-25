
"use client";

import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { EVIDENCE_REGISTRY } from '@/lib/data';
import type { AppState, ManualEvidence } from '@/lib/types';
import { BrainCircuit, Info, Plus, X, File, Users, Gavel } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface EvidenceTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function EvidenceTab({ state, dispatch }: EvidenceTabProps) {
  const { smartEvidence, evidence } = state;
  const [evidenceType, setEvidenceType] = useState<'Document' | 'Witness' | 'CourtOrder'>('Document');

  const smartEvidenceList = Object.keys(smartEvidence)
    .map(id => ({ ...EVIDENCE_REGISTRY[id], regId: id }))
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
        {smartEvidenceList.length > 0 ? (
          smartEvidenceList.map(item => (
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
            የክስ ፍሬነገሮችን ሲመርጡ ማስረጃዎች በራስ-ሰር ይታያሉ።
          </div>
        )}
      </div>

      <Separator />

      <div>
        <Label className="font-bold">ተጨማሪ ማስረጃ ያስገቡ (Manual Evidence)</Label>
        <div className="mt-2 space-y-4">
          <ToggleGroup type="single" value={evidenceType} onValueChange={(value: 'Document' | 'Witness' | 'CourtOrder') => value && setEvidenceType(value)} className="w-full">
            <ToggleGroupItem value="Document" className="flex-1" aria-label="Toggle document">
                <File className="mr-2 h-4 w-4" /> ሰነድ (Document)
            </ToggleGroupItem>
            <ToggleGroupItem value="Witness" className="flex-1" aria-label="Toggle witness">
                <Users className="mr-2 h-4 w-4" /> የሰው ምስክር (Witness)
            </ToggleGroupItem>
            <ToggleGroupItem value="CourtOrder" className="flex-1" aria-label="Toggle court order">
                <Gavel className="mr-2 h-4 w-4" /> የፍ/ቤት ትዕዛዝ (Order)
            </ToggleGroupItem>
          </ToggleGroup>

          <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: evidenceType } })}>
            <Plus className="mr-2 h-4 w-4" /> Add Selected Type
          </Button>
        </div>
      </div>
      
      {evidence.length > 0 && <Separator />}

      <div className="space-y-4">
        {evidence.map((item: ManualEvidence) => (
          <Card key={item.id}>
             <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base">{item.type} (Manual)</CardTitle>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_EVIDENCE', payload: { id: item.id } })}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4">
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Input 
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })}
                    />
                </div>
                {item.type === 'Document' && (
                    <div className="space-y-2">
                        <Label>Reference No.</Label>
                        <Input 
                            placeholder="Reference No."
                            value={item.refNumber}
                            onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'refNumber', value: e.target.value } })}
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
