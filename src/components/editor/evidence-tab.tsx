
"use client";

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EVIDENCE_REGISTRY, EVIDENCE_LOCATIONS, DOCUMENT_ISSUERS, AA_SUBCITIES, REGIONS_AND_CITIES } from '@/lib/data';
import type { AppState, ManualEvidence } from '@/lib/types';
import { BrainCircuit, Plus, X, File, Users, Gavel, Link } from 'lucide-react';
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

  const allSmartEvidence = Object.entries(smartEvidence)
    .map(([id, evData]) => ({ ...EVIDENCE_REGISTRY[id], regId: id, ...evData }))
    .filter(item => item.label); // Ensure registry item exists

  const autoLinkedEvidence = allSmartEvidence.filter(item => item.type === 'auto');
  const aiSuggestedEvidence = allSmartEvidence.filter(item => item.type === 'ai' && !item.active);
  const activeUserAddedEvidence = allSmartEvidence.filter(item => item.type === 'ai' && item.active);


  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
           <CardTitle className="flex items-center gap-2 text-primary">
            <Link className="h-5 w-5" />
            <span>Required Evidence (Auto-Linked)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {autoLinkedEvidence.length > 0 ? (
            autoLinkedEvidence.map(item => (
              <Card key={item.regId} className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/20">
                <CardHeader className="flex-row items-center justify-between p-4">
                  <CardTitle className="text-base text-blue-800 dark:text-blue-300">{item.label}</CardTitle>
                   <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">AUTOMATIC</div>
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
              No facts selected that require specific evidence.
            </div>
          )}
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <BrainCircuit className="h-5 w-5" />
            <span>AI Suggested & Manual Evidence</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {aiSuggestedEvidence.length > 0 && (
            <div className="space-y-2">
                <Label className="font-bold">Suggestions from AI Assistant</Label>
                <div className="flex flex-wrap gap-2">
                {aiSuggestedEvidence.map(item => (
                    <Button key={item.regId} variant="outline" size="sm" onClick={() => dispatch({ type: 'ADD_SMART_EVIDENCE', payload: { registryId: item.regId }})}>
                        <Plus className="mr-2 h-4 w-4" />
                        {item.label}
                    </Button>
                ))}
                </div>
            </div>
            )}

            {(activeUserAddedEvidence.length > 0 || evidence.length > 0) && <Separator/>}

            <div className="space-y-4">
                {activeUserAddedEvidence.map(item => (
                    <Card key={item.regId} className="bg-green-50/50 border-green-200 dark:bg-green-950/20">
                    <CardHeader className="flex-row items-center justify-between p-4">
                        <CardTitle className="text-base text-green-800 dark:text-green-300">{item.label}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'DEACTIVATE_SMART_EVIDENCE', payload: { registryId: item.regId } })}>
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
                ))}
                
                {evidence.map((item: ManualEvidence) => (
                <Card key={item.id} className="bg-muted/30">
                    <CardHeader className="flex-row items-center justify-between p-4">
                        <CardTitle className="text-base">
                        {item.type === 'Document' && 'Document (ሰነድ)'}
                        {item.type === 'Witness' && 'Witness (የሰው ምስክር)'}
                        {item.type === 'CourtOrder' && 'Court Order (የትዕዛዝ)'}
                        <span className="font-normal text-muted-foreground text-sm ml-2">(Manual)</span>
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_EVIDENCE', payload: { id: item.id } })}>
                        <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 pb-4">
                        
                        {item.type === 'Document' && (
                            <>
                                <div className="space-y-2">
                                    <Label>Description (ገለጻ)</Label>
                                    <Input 
                                        placeholder={"e.g., Police report about the incident"}
                                        value={item.description}
                                        onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Issuer (አውጪ)</Label>
                                    <Select 
                                        value={item.issuer}
                                        onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'issuer', value } })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select issuer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DOCUMENT_ISSUERS.map(issuer => (
                                                <SelectItem key={issuer} value={issuer}>{issuer}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {item.issuer === 'Other (ሌላ)' && (
                                        <Input
                                            className="mt-2"
                                            placeholder="Please specify other issuer"
                                            value={item.issuerOther || ''}
                                            onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'issuerOther', value: e.target.value }})}
                                        />
                                    )}
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
                                    {item.originalLocation === 'Other (ሌላ)' && (
                                        <Input
                                            className="mt-2"
                                            placeholder="Please specify other location"
                                            value={item.originalLocationOther || ''}
                                            onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'originalLocationOther', value: e.target.value }})}
                                        />
                                    )}
                                </div>
                            </>
                        )}
                        {item.type === 'Witness' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Witness Full Name (የምስክር ሙሉ ስም)</Label>
                                    <Input
                                        placeholder="e.g., Ato Kebede Alemayehu"
                                        value={item.name}
                                        onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'name', value: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">City/Region (ከተማ/ክልል)</Label>
                                    <Select
                                        value={item.city}
                                        onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'city', value } })}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Select City/Region" /></SelectTrigger>
                                        <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Subcity (ክፍለ ከተማ)</Label>
                                        <Select
                                            value={item.subcity}
                                            onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'subcity', value } })}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Select Subcity" /></SelectTrigger>
                                            <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Woreda (ወረዳ)</Label>
                                        <Input
                                            placeholder="e.g., 03"
                                            value={item.woreda}
                                            onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'woreda', value: e.target.value } })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">House No. (የቤት ቁጥር)</Label>
                                    <Input
                                        placeholder="e.g., 1234"
                                        value={item.houseNo}
                                        onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'houseNo', value: e.target.value } })}
                                    />
                                </div>
                            </div>
                        )}
                        {item.type === 'CourtOrder' && (
                            <div className="space-y-2">
                                <Label>Details of Court Order (የትዕዛዙ ዝርዝር)</Label>
                                <Input 
                                    placeholder="e.g., Order for temporary injunction on property"
                                    value={item.description}
                                    onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
                ))}
            </div>

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

            {activeUserAddedEvidence.length === 0 && aiSuggestedEvidence.length === 0 && evidence.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-4">
                    No suggestions or manual evidence added yet.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
