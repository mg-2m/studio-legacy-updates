

"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TEMPLATE_DATA } from '@/lib/data';
import type { AppState, Fact } from '@/lib/types';
import { BrainCircuit, Info, Plus, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';


interface DynamicFieldProps {
  fact: Fact;
  field: string;
  dispatch: React.Dispatch<any>;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ fact, field, dispatch }) => {
  const fieldKey = field.replace(/[\[\]]/g, '');
  
  return (
    <div className="space-y-2">
      <Label htmlFor={`fact-${fact.id}-${fieldKey}`} className="capitalize text-sm">{fieldKey}</Label>
      <Input
        id={`fact-${fact.id}-${fieldKey}`}
        placeholder={`Enter ${fieldKey}...`}
        value={fact.values[fieldKey] as string || ''}
        onChange={(e) => dispatch({ type: 'UPDATE_FACT_VALUE', payload: { factId: fact.id, field: fieldKey, value: e.target.value } })}
      />
    </div>
  );
};

interface FactsTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function FactsTab({ state, dispatch }: FactsTabProps) {
  const { maintenance, selectedFacts, selectedSubTemplate } = state;
  const templateData = TEMPLATE_DATA[selectedSubTemplate];

  const templateFacts = templateData?.facts || [];

  // Group facts by their 'label' for standard groups, and by 'mutexGroup' for exclusive choices
  const groupedFacts = templateFacts.reduce((acc, fact) => {
    const key = fact.mutexGroup || `label_${fact.label}`;
    if (!acc[key]) {
        acc[key] = {
            title: fact.mutexGroup ? fact.label : fact.label,
            isMutex: !!fact.mutexGroup,
            facts: []
        };
    }
    acc[key].facts.push(fact);
    return acc;
  }, {} as Record<string, { title: string; isMutex: boolean; facts: Fact[] }>);


  // Function to extract placeholders like [Date] or [Amount]
  const getPlaceholders = (text: string): string[] => {
    const regex = /\[(.*?)\]/g;
    return (text.match(regex) || []);
  };

  const handleToggle = (fact: Fact) => {
      dispatch({ type: 'TOGGLE_FACT', payload: { factId: fact.id, mutexGroup: fact.mutexGroup } });
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
        <Info className="h-4 w-4 !text-blue-500" />
        <AlertTitle>የክስ ፍሬነገር ምርጫ (Fact Selection)</AlertTitle>
        <AlertDescription>
          ህጋዊ አንቀፆችን እና ተያያዥ ማስረጃዎችን በራስ-ሰር ለማስገባት ከዚህ በታች ያሉትን ምክንያቶች ይምረጡ።
        </AlertDescription>
      </Alert>

      {selectedSubTemplate === 'family_divorce_dispute' && (
        <>
            <div className="flex items-start space-x-3 rounded-md border border-accent bg-green-50 p-4 dark:bg-green-950/50">
                <Checkbox
                id="chk-custody"
                checked={maintenance.active}
                onCheckedChange={(checked) => dispatch({ type: 'TOGGLE_MAINTENANCE', payload: { checked: !!checked } })}
                className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                <label htmlFor="chk-custody" className="font-bold text-foreground cursor-pointer">
                    የልጅ አስተዳደግ እና ቀለብ (Child Custody & Maintenance)
                </label>
                <p className="text-sm text-green-700 dark:text-green-400">
                    ይህንን መምረጥ የቀለብ ማስያ ማሽን እንዲሰራ ያደርጋል።
                </p>
                </div>
            </div>

            {maintenance.active && (
                <Card className="bg-green-50/50 border-accent/50 dark:bg-green-950/20">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-accent flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5"/>
                                የቀለብ ማስያ (Maintenance Calculator)
                            </CardTitle>
                            <CardDescription>Rule: (Income × 33%) ÷ Children</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="calc-income">የተከሳሽ ወርሃዊ ገቢ (ብር)</Label>
                        <Input
                        id="calc-income"
                        type="number"
                        placeholder="e.g. 10000"
                        value={maintenance.income || ''}
                        onChange={(e) => dispatch({ type: 'UPDATE_MAINTENANCE', payload: { key: 'income', value: e.target.valueAsNumber } })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="calc-children">የልጆች ብዛት</Label>
                        <Input
                        id="calc-children"
                        type="number"
                        min="1"
                        value={maintenance.children || ''}
                        onChange={(e) => dispatch({ type: 'UPDATE_MAINTENANCE', payload: { key: 'children', value: e.target.valueAsNumber } })}
                        />
                    </div>
                    </div>
                    <div className="text-center rounded-lg border-2 border-dashed border-accent/50 bg-background p-4">
                    <p className="text-sm text-muted-foreground">ለአንድ ልጅ የሚገመት ቀለብ</p>
                    <p className="text-2xl font-bold text-foreground">{maintenance.result.toFixed(2)} ETB</p>
                    </div>
                    {maintenance.context && (
                    <Alert variant="default" className="bg-background">
                        <Info className="h-4 w-4" />
                        <AlertTitle>AI-Generated Context</AlertTitle>
                        <AlertDescription>
                            {maintenance.context}
                        </AlertDescription>
                    </Alert>
                    )}
                </CardContent>
                </Card>
            )}
        </>
      )}
      
      <Separator />

      <div className="space-y-4">
         {Object.values(groupedFacts).map((group, index) => (
             <Card key={index} className="bg-muted/20">
                <CardHeader className="p-4">
                    <CardTitle className="text-base font-semibold text-primary">{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                    {group.isMutex ? (
                        <RadioGroup 
                            value={selectedFacts.find(sf => group.facts.some(f => f.id === sf.id))?.id || ""}
                            onValueChange={(factId) => {
                                const fact = group.facts.find(f => f.id === factId);
                                if (fact) handleToggle(fact);
                            }}
                        >
                            {group.facts.map(fact => {
                                const isSelected = selectedFacts.some(sf => sf.id === fact.id);
                                const selectedFact = selectedFacts.find(sf => sf.id === fact.id);
                                const placeholders = getPlaceholders(fact.legalText);
                                return (
                                    <Collapsible key={fact.id} open={isSelected}>
                                        <div className="rounded-md border bg-background has-[[data-state=checked]]:bg-blue-50 has-[[data-state=checked]]:border-blue-200 transition-colors">
                                            <div className="flex items-start space-x-3 p-4">
                                                <RadioGroupItem value={fact.id} id={`fact-${fact.id}`} className="mt-1" />
                                                <div className="grid gap-1.5 leading-none flex-1">
                                                    <label htmlFor={`fact-${fact.id}`} className="font-medium cursor-pointer">
                                                        {fact.legalText}
                                                    </label>
                                                    <p className="text-sm text-muted-foreground">{fact.citation}</p>
                                                </div>
                                            </div>
                                            {isSelected && placeholders.length > 0 && (
                                                <CollapsibleContent>
                                                    <div className="border-t bg-blue-50/50 dark:bg-blue-950/20 p-4 space-y-4">
                                                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">Fact Details</h4>
                                                        {placeholders.map(p => (
                                                            <DynamicField key={p} fact={selectedFact!} field={p} dispatch={dispatch} />
                                                        ))}
                                                    </div>
                                                </CollapsibleContent>
                                            )}
                                        </div>
                                    </Collapsible>
                                );
                            })}
                        </RadioGroup>
                    ) : (
                        group.facts.map(fact => {
                            const isSelected = selectedFacts.some(sf => sf.id === fact.id);
                            const selectedFact = selectedFacts.find(sf => sf.id === fact.id);
                            const placeholders = getPlaceholders(fact.legalText);
                            return (
                                <Collapsible key={fact.id} open={isSelected} onOpenChange={() => handleToggle(fact)}>
                                    <div className="rounded-md border bg-background has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 transition-colors">
                                        <div className="flex items-start space-x-3 p-4">
                                            <CollapsibleTrigger asChild>
                                                <Checkbox id={`fact-${fact.id}`} checked={isSelected} className="mt-1" />
                                            </CollapsibleTrigger>
                                            <div className="grid gap-1.5 leading-none flex-1">
                                                <CollapsibleTrigger asChild>
                                                    <label htmlFor={`fact-${fact.id}`} className="font-medium cursor-pointer">
                                                        {fact.legalText}
                                                    </label>
                                                </CollapsibleTrigger>
                                                <p className="text-sm text-muted-foreground">{fact.citation}</p>
                                            </div>
                                        </div>
                                        {isSelected && placeholders.length > 0 && (
                                            <CollapsibleContent>
                                                <div className="border-t bg-blue-50/50 dark:bg-blue-950/20 p-4 space-y-4">
                                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Fact Details</h4>
                                                    {placeholders.map(p => (
                                                        <DynamicField key={p} fact={selectedFact!} field={p} dispatch={dispatch} />
                                                    ))}
                                                </div>
                                            </CollapsibleContent>
                                        )}
                                    </div>
                                </Collapsible>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        ))}
      </div>

       {selectedFacts.filter(f => f.isCustom).map(fact => (
        <Card key={fact.id} className="bg-muted/30">
            <CardHeader className="flex-row items-center justify-between p-4">
                <CardTitle className="text-base">Custom Fact</CardTitle>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_CUSTOM_FACT', payload: { id: fact.id } })}>
                  <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <Textarea 
                    value={fact.legalText === 'Enter custom fact...' ? '' : fact.legalText}
                    onChange={(e) => dispatch({ type: 'UPDATE_FACT_TEXT', payload: { id: fact.id, text: e.target.value } })}
                    placeholder="Enter custom fact details here..."
                    rows={4}
                />
            </CardContent>
        </Card>
       ))}

      <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_CUSTOM_FACT' })}>
        <Plus className="mr-2 h-4 w-4" />
        Add Custom Fact
      </Button>
    </div>
  );
}
