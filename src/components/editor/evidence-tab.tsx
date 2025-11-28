
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EVIDENCE_REGISTRY, EVIDENCE_LOCATIONS, DOCUMENT_ISSUERS, AA_SUBCITIES, REGIONS_AND_CITIES, HONORIFICS } from '@/lib/data';
import type { AppState, ManualEvidence } from '@/lib/types';
import { BrainCircuit, Plus, X, File, Users, Gavel, Link } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface EvidenceTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const ManualEvidenceCard: React.FC<{
  item: ManualEvidence;
  dispatch: React.Dispatch<any>;
}> = ({ item, dispatch }) => {

  return (
    <Card key={item.id} className="bg-muted/30">
      <CardHeader className="flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
            {item.type === 'Document' && <File className="h-5 w-5 text-primary" />}
            {item.type === 'Witness' && <Users className="h-5 w-5 text-primary" />}
            {item.type === 'CourtOrder' && <Gavel className="h-5 w-5 text-primary" />}
            <CardTitle className="text-base">
              {item.type === 'Document' && 'የሰነድ ማስረጃ'}
              {item.type === 'Witness' && 'የሰው ምስክር'}
              {item.type === 'CourtOrder' && 'የትዕዛዝ'}
            </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive"
          onClick={() => dispatch({ type: 'REMOVE_EVIDENCE', payload: { id: item.id } })}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        {item.type === 'Document' && (
          <div className="space-y-4">
             <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-x-4">
                <Label>ገለጻ</Label>
                <Input
                  className="h-9"
                  placeholder={'e.g., Police report about the incident'}
                  value={item.description}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_EVIDENCE',
                      payload: { id: item.id, field: 'description', value: e.target.value },
                    })
                  }
                />
                 <Label>አውጪ</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="h-9 flex-1"
                    placeholder="Enter issuer name..."
                    value={item.issuer}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_EVIDENCE',
                        payload: { id: item.id, field: 'issuer', value: e.target.value },
                      })
                    }
                  />
                  <Select
                    onValueChange={(value) =>
                        dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'issuer', value } })
                    }
                  >
                    <SelectTrigger className="h-9 w-auto">
                        <SelectValue placeholder="ይምረጡ" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_ISSUERS.map((issuer) => (
                        <SelectItem key={issuer} value={issuer}>
                          {issuer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
            </div>
            
            <div className="grid grid-cols-12 items-center gap-x-4">
                <Label className="col-span-1">ቁጥር</Label>
                <div className="col-span-2">
                  <Input
                    className="h-9"
                    value={item.refNumber}
                    onChange={(e) =>
                      dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'refNumber', value: e.target.value } })
                    }
                  />
                </div>
                <Label className="col-span-1 text-right">የተሰጠበት ቀን</Label>
                <div className="col-span-2">
                  <Input
                    className="h-9"
                    value={item.issueDate}
                    onChange={(e) =>
                      dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'issueDate', value: e.target.value } })
                    }
                  />
                </div>
                <Label className="col-span-1 text-right">የገጽ ብዛት</Label>
                <div className="col-span-1">
                  <Input
                    className="h-9"
                    type="number"
                    value={item.pageCount}
                    onChange={(e) =>
                      dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'pageCount', value: e.target.value } })
                    }
                  />
                </div>
                 <Label className="col-span-1 text-right">ኦርጅናሉ ያለበት</Label>
                <div className="col-span-3 flex items-center gap-2">
                    <Input
                        className="h-9 flex-1"
                        value={item.originalLocation}
                        onChange={(e) =>
                            dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'originalLocation', value: e.target.value } })
                        }
                    />
                    <Select
                      onValueChange={(value) =>
                        dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'originalLocation', value } })
                      }
                    >
                      <SelectTrigger className="h-9 w-auto">
                        <SelectValue placeholder="ይምረጡ"/>
                      </SelectTrigger>
                      <SelectContent>
                        {EVIDENCE_LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label>የሰነዱ አይነት</Label>
              <RadioGroup
                value={item.documentType}
                onValueChange={(value) =>
                  dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'documentType', value } })
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Original" id={`orig-${item.id}`} />
                  <Label htmlFor={`orig-${item.id}`}>ኦርጅናል</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Copy" id={`copy-${item.id}`} />
                  <Label htmlFor={`copy-${item.id}`}>ኮፒ</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
        {item.type === 'Witness' && (
            <div className="space-y-4">
                <div className="grid grid-cols-[auto_auto_100px_auto_1fr_auto] items-center gap-x-4">
                    <Label className="font-semibold">{item.type === 'Witness' && 'የሰው ምስክር'}</Label>
                    <Label className="whitespace-nowrap">ማዕረግ</Label>
                    <Select value={item.honorific} onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'honorific', value } })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{HONORIFICS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                    </Select>
                    <Label className="whitespace-nowrap">ሙሉ ስም</Label>
                    <Input value={item.name} onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'name', value: e.target.value } })} />
                </div>

                <div className="space-y-3 pt-2">
                     <div className="grid grid-cols-[auto_auto_1.5fr_auto_1fr_auto_0.5fr_auto_0.5fr] items-center gap-x-2 gap-y-3">
                        <Label className="font-semibold text-sm">አድራሻ</Label>
                        <Label className="text-xs">ከተማ/ክልል</Label>
                        <Select value={item.city} onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'city', value } })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{REGIONS_AND_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                        
                        <Label className="text-xs">ክ/ከተማ</Label>
                        <Select 
                            value={item.subcity} 
                            onValueChange={(value) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'subcity', value } })}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{AA_SUBCITIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                        
                        <Label className="text-xs">ወረዳ</Label>
                        <Input className="h-9" value={item.woreda} onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'woreda', value: e.target.value } })} />
                        
                        <Label className="text-xs">ቤት/ቁ</Label>
                        <Input className="h-9" value={item.houseNo} onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'houseNo', value: e.target.value } })} />
                    </div>
                    {item.subcity === 'ሌላ' && (
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 pt-1">
                            <Label className="text-xs">ሌላ ክ/ከተማ</Label>
                            <Input
                                value={item.subcityOther || ''}
                                onChange={(e) => dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'subcityOther', value: e.target.value }})}
                            />
                        </div>
                    )}
                </div>
            </div>
        )}
        {item.type === 'CourtOrder' && (
          <div className="space-y-2">
            <Label>የትዕዛዙ ዝርዝር</Label>
            <Input
              value={item.description}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field: 'description', value: e.target.value } })
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function EvidenceTab({ state, dispatch }: EvidenceTabProps) {
  const { smartEvidence, evidence } = state;

  const allSmartEvidence = Object.entries(smartEvidence)
    .map(([id, evData]) => ({ ...EVIDENCE_REGISTRY[id], regId: id, ...evData }))
    .filter((item) => item.label); // Ensure registry item exists

  const autoLinkedEvidence = allSmartEvidence.filter((item) => item.type === 'auto');
  const aiSuggestedEvidence = allSmartEvidence.filter((item) => item.type === 'ai' && !item.active);
  const activeUserAddedEvidence = allSmartEvidence.filter((item) => item.type === 'ai' && item.active);

  const manualDocuments = evidence.filter((e) => e.type === 'Document');
  const manualWitnesses = evidence.filter((e) => e.type === 'Witness');
  const manualCourtOrders = evidence.filter((e) => e.type === 'CourtOrder');

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
            autoLinkedEvidence.map((item) => (
              <Card key={item.regId} className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/20">
                <CardHeader className="flex-row items-center justify-between p-4">
                  <CardTitle className="text-base text-blue-800 dark:text-blue-300">{item.label}</CardTitle>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                    AUTOMATIC
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-2">
                    <Label>{item.credentialLabel}</Label>
                    <Input
                      placeholder={item.credentialPlaceholder}
                      value={smartEvidence[item.regId]?.credentialId || ''}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL',
                          payload: { registryId: item.regId, credentialValue: e.target.value },
                        })
                      }
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
                {aiSuggestedEvidence.map((item) => (
                  <Button
                    key={item.regId}
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch({ type: 'ADD_SMART_EVIDENCE', payload: { registryId: item.regId } })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(activeUserAddedEvidence.length > 0 || evidence.length > 0) && <Separator />}

          <div className="space-y-4">
            {activeUserAddedEvidence.map((item) => (
              <Card key={item.regId} className="bg-green-50/50 border-green-200 dark:bg-green-950/20">
                <CardHeader className="flex-row items-center justify-between p-4">
                  <CardTitle className="text-base text-green-800 dark:text-green-300">{item.label}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => dispatch({ type: 'DEACTIVATE_SMART_EVIDENCE', payload: { registryId: item.regId } })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-2">
                    <Label>{item.credentialLabel}</Label>
                    <Input
                      placeholder={item.credentialPlaceholder}
                      value={smartEvidence[item.regId]?.credentialId || ''}
                      onChange={(e) =>
                        dispatch({
                          type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL',
                          payload: { registryId: item.regId, credentialValue: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeUserAddedEvidence.length === 0 && aiSuggestedEvidence.length === 0 && evidence.length === 0 && (
            <div className="text-center text-sm text-muted-foreground p-4">No suggestions or manual evidence added yet.</div>
          )}
        </CardContent>
      </Card>

      {/* Manual Evidence Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <File className="h-5 w-5" />
            <span>ሰነዶች</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {manualDocuments.map((item) => (
            <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Document' } })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Document
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <span>የሰው ምስክሮች</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {manualWitnesses.map((item) => (
            <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Witness' } })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Witness
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Gavel className="h-5 w-5" />
            <span>የትዕዛዝ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {manualCourtOrders.map((item) => (
            <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'CourtOrder' } })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Court Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    