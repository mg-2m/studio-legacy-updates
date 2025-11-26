
"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RELIEF_ITEMS } from '@/lib/data';
import type { AppState } from '@/lib/types';
import { Gavel, Info } from 'lucide-react';

interface ReliefTabProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function ReliefTab({ state, dispatch }: ReliefTabProps) {
  const { maintenance, selectedReliefs } = state;

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
        {RELIEF_ITEMS.filter(item => !(item.id === 'maintenance' && !maintenance.active)).map(item => (
          <div key={item.id} className="flex items-start space-x-3 rounded-md border bg-background p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 transition-colors">
            <Checkbox
              id={`relief-${item.id}`}
              checked={selectedReliefs.some(sr => sr.id === item.id)}
              onCheckedChange={() => dispatch({ type: 'TOGGLE_RELIEF', payload: { reliefId: item.id } })}
              disabled={item.isDefault && item.id !== 'maintenance'}
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor={`relief-${item.id}`} className="font-bold cursor-pointer">
                {item.text.split('(')[0]}
              </label>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
