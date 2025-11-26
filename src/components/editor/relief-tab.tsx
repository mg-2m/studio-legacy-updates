
"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TEMPLATE_DATA } from '@/lib/data';
import type { AppState } from '@/lib/types';
import { Gavel, Info, Plus, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface ReliefTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function ReliefTab({ state, dispatch }: ReliefTabProps) {
  const { maintenance, selectedReliefs, selectedSubTemplate } = state;
  const customReliefs = selectedReliefs.filter(r => r.isCustom);
  const standardReliefs = TEMPLATE_DATA[selectedSubTemplate]?.reliefs || [];
  const isMaintenanceApplicable = standardReliefs.some(r => r.id === 'relief_child_support');

  return (
    <div className="space-y-6">
      <Alert className="bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-200">
        <Gavel className="h-4 w-4 !text-purple-500" />
        <AlertTitle>የክስ ዳኝነት (Judgment / Relief)</AlertTitle>
        <AlertDescription>
         ፍርድ ቤቱ እንዲወስንልዎ የሚፈልጉትን ዳኝነት ከዚህ በታች ይምረጡ።
        </AlertDescription>
      </Alert>
      
      <div className="space-y-3">
        {standardReliefs.map(item => {
          const isMaintenanceCheckbox = isMaintenanceApplicable && item.id === 'relief_child_support';

          return (
            <div key={item.id} className="flex items-start space-x-3 rounded-md border bg-background p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 transition-colors">
              <Checkbox
                id={`relief-${item.id}`}
                checked={isMaintenanceCheckbox ? maintenance.active : selectedReliefs.some(sr => sr.id === item.id)}
                onCheckedChange={(checked) => {
                  if (isMaintenanceCheckbox) {
                    dispatch({ type: 'TOGGLE_MAINTENANCE', payload: { checked: !!checked } });
                  } else {
                    dispatch({ type: 'TOGGLE_RELIEF', payload: { reliefId: item.id } });
                  }
                }}
                disabled={item.isDefault && !isMaintenanceCheckbox}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor={`relief-${item.id}`} className="font-bold cursor-pointer">
                  {item.text.split('(')[0]}
                </label>
                <p className="text-sm text-muted-foreground">{item.text}</p>
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
                  <CardTitle className="text-base">Custom Relief</CardTitle>
                   <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => dispatch({ type: 'REMOVE_CUSTOM_RELIEF', payload: { id: relief.id } })}>
                    <X className="h-4 w-4" />
                  </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                  <Textarea 
                      value={relief.text === 'Enter custom relief...' ? '' : relief.text}
                      onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_RELIEF', payload: { id: relief.id, text: e.target.value } })}
                      placeholder="Enter custom relief details here..."
                      rows={3}
                  />
              </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={() => dispatch({ type: 'ADD_CUSTOM_RELIEF' })}>
        <Plus className="mr-2 h-4 w-4" />
        Add Custom Relief
      </Button>

    </div>
  );
}

    