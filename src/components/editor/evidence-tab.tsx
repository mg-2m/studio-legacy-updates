
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

interface EmbeddedInputProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  options?: readonly string[];
  fieldKey: string;
}

const EmbeddedInput: React.FC<EmbeddedInputProps> = ({ id, value, placeholder, onChange, options, fieldKey }) => {
  return (
    <span className="inline-flex items-center gap-1 mx-1">
      <Input
        id={id}
        className="inline-block w-48 h-8 px-2 py-1 text-sm bg-white dark:bg-gray-800 border-dashed border-primary/50 focus:border-solid"
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {options && (
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="inline-flex w-auto h-8 p-1 text-xs">
             <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>
      )}
    </span>
  );
};


const parseSentence = (template: string, data: any, dispatch: React.Dispatch<any>, id: string, type: 'manual' | 'smart', evidenceKey: string) => {
    const parts = template.split(/(\[.*?\])/g).filter(part => part);

    const updateField = (field: string, value: any) => {
        if (type === 'manual') {
            dispatch({ type: 'UPDATE_EVIDENCE', payload: { id, field, value } });
        } else {
            dispatch({ type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL', payload: { registryId: evidenceKey, credentialValue: value, field } });
        }
    };

    return parts.map((part, index) => {
        const match = part.match(/\[(.*?)\]/);
        if (match) {
            const fieldKey = match[1];
            let options: readonly string[] | undefined = undefined;
            if (fieldKey === 'issuer') options = DOCUMENT_ISSUERS;
            if (fieldKey === 'originalLocation') options = EVIDENCE_LOCATIONS;
            if (fieldKey === 'city') options = REGIONS_AND_CITIES;
            if (fieldKey === 'subcity') options = AA_SUBCITIES;
            if (fieldKey === 'honorific') options = HONORIFICS;

            if (fieldKey === 'documentType') {
                 return (
                    <RadioGroup key={`${id}-${index}`} value={data?.documentType || 'ኮፒ'} onValueChange={(v) => updateField('documentType', v)} className="inline-flex gap-3 mx-2 align-middle">
                        <div className="flex items-center space-x-1"><RadioGroupItem value="ኮፒ" id={`copy-${id}-${index}`} /><Label htmlFor={`copy-${id}-${index}`}>ኮፒ</Label></div>
                        <div className="flex items-center space-x-1"><RadioGroupItem value="ኦርጅናል" id={`orig-${id}-${index}`} /><Label htmlFor={`orig-${id}-${index}`}>ኦርጅናል</Label></div>
                    </RadioGroup>
                 )
            }


            return (
                <EmbeddedInput
                    key={`${id}-${index}`}
                    id={`${id}-${fieldKey}`}
                    value={(data && data[fieldKey]) || ''}
                    placeholder={`e.g., ${EVIDENCE_REGISTRY[evidenceKey]?.credentialPlaceholder || fieldKey}`}
                    onChange={(value) => updateField(fieldKey, value)}
                    options={options}
                    fieldKey={fieldKey}
                />
            );
        }
        return <span key={`${id}-${index}`}>{part}</span>;
    });
};

const ManualEvidenceCard: React.FC<{
  item: ManualEvidence;
  dispatch: React.Dispatch<any>;
  isFirstItem?: boolean;
}> = ({ item, dispatch, isFirstItem = false }) => {

  const updateField = (field: string, value: any) => {
    dispatch({ type: 'UPDATE_EVIDENCE', payload: { id: item.id, field, value } });
  };
  
  const renderDocument = (item: any) => (
    <p>
      <EmbeddedInput id={`${item.id}-description`} placeholder="የሰነዱ ገለጻ" value={item.description} onChange={(v) => updateField('description', v)} fieldKey="description" />
      ከ <EmbeddedInput id={`${item.id}-issuer`} placeholder="አውጪ ተቋም" value={item.issuer} onChange={(v) => updateField('issuer', v)} options={DOCUMENT_ISSUERS} fieldKey="issuer" />
      የተሰጠ፣ ቁጥር <EmbeddedInput id={`${item.id}-refNumber`} placeholder="ቁ." value={item.refNumber} onChange={(v) => updateField('refNumber', v)} fieldKey="refNumber" />
      ፣ ቀን <EmbeddedInput id={`${item.id}-issueDate`} placeholder="ቀን" value={item.issueDate} onChange={(v) => updateField('issueDate', v)} fieldKey="issueDate" />
      ፣ <EmbeddedInput id={`${item.id}-pageCount`} placeholder="ገጽ" value={item.pageCount} onChange={(v) => updateField('pageCount', v)} fieldKey="pageCount" /> ገጽ ያለው
      <RadioGroup value={item.documentType} onValueChange={(v) => updateField('documentType', v)} className="inline-flex gap-3 mx-2 align-middle">
        <div className="flex items-center space-x-1"><RadioGroupItem value="Copy" id={`copy-${item.id}`} /><Label htmlFor={`copy-${item.id}`}>ኮፒ</Label></div>
        <div className="flex items-center space-x-1"><RadioGroupItem value="Original" id={`orig-${item.id}`} /><Label htmlFor={`orig-${item.id}`}>ኦርጅናል</Label></div>
      </RadioGroup>
      ሲሆን ዋናው <EmbeddedInput id={`${item.id}-originalLocation`} placeholder="ያለበት ወገን" value={item.originalLocation} onChange={(v) => updateField('originalLocation', v)} options={EVIDENCE_LOCATIONS} fieldKey="originalLocation" /> እጅ የሚገኝ።
    </p>
  );

  const renderWitness = (item: any) => (
     <p>
        <EmbeddedInput id={`${item.id}-honorific`} placeholder="ማዕረግ" value={item.honorific} onChange={(v) => updateField('honorific', v)} options={HONORIFICS} fieldKey="honorific" />
        <EmbeddedInput id={`${item.id}-name`} placeholder="ሙሉ ስም" value={item.name} onChange={(v) => updateField('name', v)} fieldKey="name" />
        አድራሻቸው <EmbeddedInput id={`${item.id}-city`} placeholder="ከተማ" value={item.city} onChange={(v) => updateField('city', v)} options={REGIONS_AND_CITIES} fieldKey="city" />
        ፣ <EmbeddedInput id={`${item.id}-subcity`} placeholder="ክ/ከተማ" value={item.subcity} onChange={(v) => updateField('subcity', v)} options={AA_SUBCITIES} fieldKey="subcity" />
        {item.subcity === 'ሌላ' && <EmbeddedInput id={`${item.id}-subcityOther`} placeholder="ሌላ ክ/ከተማ" value={item.subcityOther} onChange={(v) => updateField('subcityOther', v)} fieldKey="subcityOther"/>}
        ፣ ወረዳ <EmbeddedInput id={`${item.id}-woreda`} placeholder="ወረዳ" value={item.woreda} onChange={(v) => updateField('woreda', v)} fieldKey="woreda" />
        ፣ የቤት ቁጥር <EmbeddedInput id={`${item.id}-houseNo`} placeholder="ቤት/ቁ" value={item.houseNo} onChange={(v) => updateField('houseNo', v)} fieldKey="houseNo" /> የሆኑ ምስክር።
     </p>
  );
  
  const renderCourtOrder = (item: any) => (
      <p>
        <EmbeddedInput id={`${item.id}-description`} placeholder="የትዕዛዙ ዝርዝር" value={item.description} onChange={(v) => updateField('description', v)} fieldKey="description" />
      </p>
  );


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
        {!isFirstItem && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={() => dispatch({ type: 'REMOVE_EVIDENCE', payload: { id: item.id } })}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4">
        <div className="text-sm leading-relaxed">
            {item.type === 'Document' && renderDocument(item)}
            {item.type === 'Witness' && renderWitness(item)}
            {item.type === 'CourtOrder' && renderCourtOrder(item)}
        </div>
      </CardContent>
    </Card>
  );
};

interface EvidenceTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

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

  const updateSmartCredential = (registryId: string, credentialValue: string, field: string) => {
      dispatch({ type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL', payload: { registryId, credentialValue, field } });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Link className="h-5 w-5" />
            <span>በራስ-ሰር የተገናኙ ማስረጃዎች</span>
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
                  <div className="text-sm leading-relaxed">
                    {item.sentenceTemplate ? (
                        parseSentence(item.sentenceTemplate, smartEvidence[item.regId], dispatch, item.regId, 'smart', item.regId)
                    ) : (
                        <p>
                            {item.credentialLabel}: 
                            <Input
                            className="inline-block w-64 h-8 mx-1"
                            placeholder={item.credentialPlaceholder}
                            value={smartEvidence[item.regId]?.credentialId || ''}
                            onChange={(e) => updateSmartCredential(item.regId, e.target.value, 'credentialId')}
                            />
                        </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-lg">
              ከፍሬነገሮች ጋር የሚገናኝ ማስረጃ አልተመረጠም።
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <BrainCircuit className="h-5 w-5" />
            <span>በAI የቀረቡ እና በእጅ የሚገቡ ማስረጃዎች</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiSuggestedEvidence.length > 0 && (
            <div className="space-y-2">
              <Label className="font-bold">በAI ረዳት የቀረቡ ጥቆማዎች</Label>
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
                  <div className="text-sm leading-relaxed">
                     {item.sentenceTemplate ? (
                        parseSentence(item.sentenceTemplate, smartEvidence[item.regId], dispatch, item.regId, 'smart', item.regId)
                    ) : (
                        <p>
                            {item.credentialLabel}: 
                            <Input
                            className="inline-block w-64 h-8 mx-1"
                            placeholder={item.credentialPlaceholder}
                            value={smartEvidence[item.regId]?.credentialId || ''}
                            onChange={(e) => updateSmartCredential(item.regId, e.target.value, 'credentialId')}
                            />
                        </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {manualDocuments.length === 0 && (
                <ManualEvidenceCard
                    item={{
                        id: 'temp_doc', type: 'Document', description: '', issuer: '', refNumber: '',
                        issueDate: '', pageCount: '', documentType: 'Copy', originalLocation: '', isManual: true
                    }}
                    dispatch={dispatch}
                    isFirstItem={true}
                />
            )}
            {manualDocuments.map((item) => (
              <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
            ))}
             <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Document' } })}
              >
                <Plus className="mr-2 h-4 w-4" /> ሌላ ሰነድ ጨምር
              </Button>
            
            <Separator />
            
            {manualWitnesses.length === 0 && (
                 <ManualEvidenceCard
                    item={{
                        id: 'temp_witness', type: 'Witness', honorific: HONORIFICS[0], name: '', city: REGIONS_AND_CITIES[0],
                        subcity: AA_SUBCITIES[0], woreda: '', houseNo: '', isManual: true
                    }}
                    dispatch={dispatch}
                    isFirstItem={true}
                />
            )}
            {manualWitnesses.map((item) => (
              <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
            ))}
             <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'Witness' } })}
              >
                <Plus className="mr-2 h-4 w-4" /> ሌላ ምስክር ጨምር
              </Button>
            
            <Separator />

            {manualCourtOrders.length === 0 && (
                <ManualEvidenceCard
                    item={{ id: 'temp_order', type: 'CourtOrder', description: '', isManual: true }}
                    dispatch={dispatch}
                    isFirstItem={true}
                />
            )}
            {manualCourtOrders.map((item) => (
              <ManualEvidenceCard key={item.id} item={item} dispatch={dispatch} />
            ))}
             <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => dispatch({ type: 'ADD_EVIDENCE', payload: { type: 'CourtOrder' } })}
              >
                <Plus className="mr-2 h-4 w-4" /> ሌላ ትዕዛዝ ጨምር
              </Button>

          </div>

          {activeUserAddedEvidence.length === 0 && aiSuggestedEvidence.length === 0 && evidence.length === 0 && (
            <div className="text-center text-sm text-muted-foreground p-4">ምንም ጥቆማዎች ወይም በእጅ የገባ ማስረጃ የለም።</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
