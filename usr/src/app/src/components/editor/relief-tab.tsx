

"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TEMPLATE_DATA } from '@/lib/data';
import type { AppState, CalculationConfig, Relief } from '@/lib/types';
import { Gavel, Info, Plus, X, BrainCircuit, Calendar as CalendarIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format, parseISO } from 'date-fns';

interface ReliefTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}


const parseSentenceWithInputs = (
  text: string,
  relief: Relief,
  dispatch: React.Dispatch<any>
) => {
  const parts = text.split(/(\[.*?\])|(\{\{.*?\}\})/g).filter(part => part);

  return parts.map((part, index) => {
    const placeholderMatch = part.match(/\[(.*?)\]/);
    const calculatorMatch = part.match(/\{\{(.*?)\}\}/);

    if (placeholderMatch) {
      const fieldKey = placeholderMatch[1];
      return (
        <Input
          key={`${relief.id}-${fieldKey}-${index}`}
          className="inline-block w-auto h-7 px-2 py-1 text-sm bg-white dark:bg-gray-800 border-dashed border-primary/50 focus:border-solid mx-1"
          placeholder={fieldKey}
          value={(relief.values && relief.values[fieldKey]) || ''}
          onChange={(e) => dispatch({
            type: 'UPDATE_RELIEF_VALUE',
            payload: { reliefId: relief.id, field: fieldKey, value: e.target.value }
          })}
        />
      );
    }
    
    if (calculatorMatch) {
      const fieldKey = calculatorMatch[1].trim();
      const allCalcValues = Object.values(relief.calculations || {}).reduce((acc, curr) => ({ ...acc, ...curr }), {});
      const value = allCalcValues[fieldKey];
      return (
         <span key={`${relief.id}-${fieldKey}-${index}`} className="font-bold text-accent mx-1">
          {(typeof value === 'number' ? value.toFixed(2) : value) || '...'}
        </span>
      );
    }

    return <span key={`${relief.id}-text-${index}`}>{part}</span>;
  });
};


const ReliefCalculator: React.FC<{
    calcKey: string;
    config: CalculationConfig;
    state: AppState;
    dispatch: React.Dispatch<any>;
}> = ({ calcKey, config, state, dispatch }) => {

    const calcState = state.calculations[calcKey];
    if (!calcState) return null;


    const handleInputChange = (field: string, value: any) => {
        dispatch({ type: 'UPDATE_CALCULATION', payload: { calcKey, field, value } });
    };

    return (
        <Card className="bg-blue-50/50 border-blue-200 dark:bg-blue-950/20">
            <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5"/>
                    {config.title}
                </CardTitle>
                <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.inputs.map(input => (
                        <div key={input.id} className="space-y-2">
                            <Label htmlFor={`calc-${calcKey}-${input.id}`}>{input.label}</Label>
                            {input.type === 'number' ? (
                                <Input
                                    id={`calc-${calcKey}-${input.id}`}
                                    type="number"
                                    placeholder={`ለምሳሌ፦ ${input.defaultValue}`}
                                    value={calcState[input.id] as number || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.valueAsNumber)}
                                />
                            ) : (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal bg-white",
                                        !calcState[input.id] && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {calcState[input.id] ? format(parseISO(calcState[input.id] as string), "PPP") : <span>ቀን ይምረጡ</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={calcState[input.id] ? parseISO(calcState[input.id] as string) : undefined}
                                      onSelect={(date) => handleInputChange(input.id, date?.toISOString().split('T')[0])}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                            )}
                        </div>
                    ))}
                </div>
                 {config.outputs.map(output => (
                    <div key={output.id} className="text-center rounded-lg border-2 border-dashed border-blue-400 bg-background p-4">
                        <p className="text-sm text-muted-foreground">{output.label}</p>
                        <p className="text-2xl font-bold text-foreground">
                            {(calcState[output.id] as number || 0).toFixed(2)} ብር
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};


export default function ReliefTab({ state, dispatch }: ReliefTabProps) {
  const { maintenance, selectedReliefs, selectedSubTemplate } = state;
  if (!selectedSubTemplate) return null;
  const customReliefs = selectedReliefs.filter(r => r.isCustom);
  const templateData = TEMPLATE_DATA[selectedSubTemplate];
  const standardReliefs = templateData?.reliefs || [];
  const calculationConfigs = templateData?.calculations;

  return (
    <div className="space-y-6">
      <Alert className="bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-200">
        <Gavel className="h-4 w-4 !text-purple-500" />
        <AlertTitle>የክስ ዳኝነት</AlertTitle>
        <AlertDescription>
         ፍርድ ቤቱ እንዲወስንልዎ የሚፈልጉትን ዳኝነት ከዚህ በታች ይምረጡ።
        </AlertDescription>
      </Alert>
      
      {calculationConfigs && Object.entries(calculationConfigs).map(([key, config]) => (
          <ReliefCalculator key={key} calcKey={key} config={config} state={state} dispatch={dispatch} />
      ))}


      <div className="space-y-3">
        {standardReliefs.map(item => {
          const isSelected = selectedReliefs.some(sr => sr.id === item.id);
          const selectedRelief = selectedReliefs.find(sr => sr.id === item.id);
          
          if (templateData?.id === 'family_divorce_dispute' && item.id === 'relief_child_support') {
             return (
                <div key={item.id} className="flex items-start space-x-3 rounded-md border bg-background p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 dark:has-[:checked]:bg-blue-950/30 transition-colors">
                  <Checkbox
                    id={`relief-${item.id}`}
                    checked={maintenance.active}
                    onCheckedChange={(checked) => dispatch({ type: 'TOGGLE_MAINTENANCE', payload: { checked: !!checked } })}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none flex-1">
                    <label htmlFor={`relief-${item.id}`} className="font-medium cursor-pointer leading-relaxed">
                        {item.text}
                    </label>
                  </div>
                </div>
              );
          }

          return (
            <div key={item.id} className="flex items-start space-x-3 rounded-md border bg-background p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 dark:has-[:checked]:bg-blue-950/30 transition-colors">
              <Checkbox
                id={`relief-${item.id}`}
                checked={isSelected}
                onCheckedChange={() => dispatch({ type: 'TOGGLE_RELIEF', payload: { reliefId: item.id } })}
                disabled={item.isDefault && !item.isDynamic}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none flex-1">
                <label htmlFor={`relief-${item.id}`} className="font-medium cursor-pointer leading-relaxed">
                   {selectedRelief ? parseSentenceWithInputs(item.text, { ...selectedRelief, calculations: state.calculations }, dispatch) : item.text.replace(/(\[.*?\])|(\{\{.*?\}\})/g, (match, key) => key ? `[${key}]` : '...')}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-4">
        {customReliefs.map(relief => (
          <Card key={relief.id} className="bg-muted/30">
              <CardHeader className="flex-row items-center justify-between p-4">
                  <CardTitle className="text-base">ብጁ ዳኝነት</CardTitle>
                   <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_CUSTOM_RELIEF', payload: { id: relief.id } })}>
                    <X className="h-4 w-4" />
                  </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                  <Textarea 
                      value={relief.text === 'Enter custom relief...' ? '' : relief.text}
                      onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_RELIEF', payload: { id: relief.id, text: e.target.value } })}
                      placeholder="ብጁ የዳኝነት ጥያቄዎን እዚህ ያስገቡ..."
                      rows={3}
                  />
              </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_CUSTOM_RELIEF' })}>
        <Plus className="mr-2 h-4 w-4" />
        ብጁ ዳኝነት ጨምር
      </Button>

    </div>
  );
}
