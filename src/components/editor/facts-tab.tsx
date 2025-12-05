

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
import { cn } from '@/lib/utils';


const parseSentenceWithInputs = (
  text: string,
  fact: Fact,
  dispatch: React.Dispatch<any>
) => {
  const parts = text.split(/(\[.*?\])/g).filter(part => part);

  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]/);
    if (match) {
      const fieldKey = match[1];
      return (
        <Input
          key={`${fact.id}-${fieldKey}-${index}`}
          className="inline-block w-auto h-7 px-2 py-1 text-sm bg-white dark:bg-gray-800 border-dashed border-primary/50 focus:border-solid mx-1"
          placeholder={fieldKey === 'Date' ? 'ቀን' : fieldKey === 'Amount' ? 'የብር መጠን' : fieldKey}
          value={(fact.values && fact.values[fieldKey]) || ''}
          onChange={(e) => dispatch({
            type: 'UPDATE_FACT_VALUE',
            payload: { factId: fact.id, field: fieldKey, value: e.target.value }
          })}
        />
      );
    }
    return <span key={`${fact.id}-text-${index}`}>{part}</span>;
  });
};


interface FactsTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function FactsTab({ state, dispatch }: FactsTabProps) {
  const { maintenance, selectedFacts, selectedSubTemplate } = state;
  if (!selectedSubTemplate) return null;
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
        <AlertTitle>የክስ ፍሬነገር ምርጫ</AlertTitle>
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
                    የልጅ አስተዳደግ እና ቀለብ
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
                                የቀለብ ማስያ
                            </CardTitle>
                            <CardDescription>(የገቢ × 33%) ÷ የልጆች ብዛት</CardDescription>
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
                        placeholder="ለምሳሌ፦ 10000"
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
                    <p className="text-2xl font-bold text-foreground">{maintenance.result.toFixed(2)} ብር</p>
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
                                
                                return (
                                    <div key={fact.id} className={cn("rounded-md border bg-background has-[[data-state=checked]]:bg-blue-50 has-[[data-state=checked]]:border-blue-200 dark:has-[[data-state=checked]]:bg-blue-950/30 transition-colors p-4 flex items-start space-x-3")}>
                                        <RadioGroupItem value={fact.id} id={`fact-${fact.id}`} className="mt-1" />
                                        <div className="grid gap-1.5 leading-none flex-1">
                                            <label htmlFor={`fact-${fact.id}`} className="font-medium cursor-pointer leading-relaxed">
                                                {selectedFact ? parseSentenceWithInputs(fact.legalText, selectedFact, dispatch) : fact.legalText.replace(/\[(.*?)\]/g, (match, key) => `[${key === 'Date' ? 'ቀን' : key === 'Amount' ? 'የብር መጠን' : key}]`)}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    ) : (
                        group.facts.map(fact => {
                            const isSelected = selectedFacts.some(sf => sf.id === fact.id);
                            const selectedFact = selectedFacts.find(sf => sf.id === fact.id);
                           
                            return (
                                <div key={fact.id} className={cn("rounded-md border bg-background has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 dark:has-[:checked]:bg-blue-950/30 transition-colors p-4 flex items-start space-x-3")}>
                                    <Checkbox 
                                        id={`fact-${fact.id}`}
                                        checked={isSelected}
                                        onCheckedChange={() => handleToggle(fact)}
                                        className="mt-1"
                                    />
                                    <div className="grid gap-1.5 leading-none flex-1">
                                        <label htmlFor={`fact-${fact.id}`} className="font-medium cursor-pointer leading-relaxed">
                                            {selectedFact ? parseSentenceWithInputs(fact.legalText, selectedFact, dispatch) : fact.legalText.replace(/\[(.*?)\]/g, (match, key) => `[${key === 'Date' ? 'ቀን' : key === 'Amount' ? 'የብር መጠን' : key}]`)}
                                        </label>
                                    </div>
                                </div>
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
                <CardTitle className="text-base">ብጁ ፍሬነገር</CardTitle>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_CUSTOM_FACT', payload: { id: fact.id } })}>
                  <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <Textarea 
                    value={fact.legalText === 'Enter custom fact...' ? '' : fact.legalText}
                    onChange={(e) => dispatch({ type: 'UPDATE_FACT_TEXT', payload: { id: fact.id, text: e.target.value } })}
                    placeholder="ብጁ የክስ ፍሬነገርዎን እዚህ ያስገቡ..."
                    rows={4}
                />
            </CardContent>
        </Card>
       ))}

      <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_CUSTOM_FACT' })}>
        <Plus className="mr-2 h-4 w-4" />
        ብጁ ፍሬነገር ጨምር
      </Button>
    </div>
  );
}
