
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TEMPLATE_DATA } from '@/lib/data';
import type { AppState } from '@/lib/types';
import { FileText } from 'lucide-react';
import { useEffect } from 'react';
import { Checkbox } from '../ui/checkbox';

interface SubjectOfClaimProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export default function SubjectOfClaim({ state, dispatch }: SubjectOfClaimProps) {
  const { metadata, selectedSubTemplate, calculations } = state;
  const templateData = selectedSubTemplate ? TEMPLATE_DATA[selectedSubTemplate] : null;

  const hasCalculator = templateData && Object.keys(templateData.calculations || {}).length > 0;

  const allCalcValues = Object.values(calculations).reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const primaryOutputKey = Object.keys(allCalcValues).find(k => k.toLowerCase().includes('amount') || k.toLowerCase().includes('pay') || k.toLowerCase().includes('principal'));
  const calculatedAmount = primaryOutputKey ? allCalcValues[primaryOutputKey] as number : null;

  useEffect(() => {
    if (templateData?.meta?.purpose) {
      dispatch({ type: 'UPDATE_METADATA', payload: { key: 'claimPurpose', value: templateData.meta.purpose } });
    }
  }, [templateData, dispatch]);

  const isManualAmountEnabled = !hasCalculator || metadata.isManualAmount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-primary flex items-center gap-2">
          <FileText className="w-5 h-5" />
          የክሱ ምክንያት
        </CardTitle>
        <CardDescription>የክሱን ዋና ዓላማ እና ዋጋ የሚገልጽ ክፍል።</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="claim-purpose">የክሱ ዓላማ</Label>
          <Textarea
            id="claim-purpose"
            placeholder="የክሱን ምክንያት ያስገቡ..."
            value={metadata.claimPurpose}
            onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'claimPurpose', value: e.target.value } })}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="claim-amount">የክሱ ዋጋ (ከተቻለ)</Label>
          {calculatedAmount && calculatedAmount > 0 && !metadata.isManualAmount ? (
            <Input
              id="claim-amount"
              value={`ብር ${calculatedAmount.toFixed(2)} (በካልኩሌተር የተሰላ)`}
              readOnly
              className="bg-muted"
            />
          ) : (
            <Input
              id="claim-amount"
              placeholder="ለምሳሌ፦ 50,000"
              value={metadata.claimAmount || ''}
              onChange={(e) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'claimAmount', value: e.target.value } })}
              disabled={!isManualAmountEnabled}
            />
          )}
          {hasCalculator && (
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="manual-amount-toggle"
                checked={metadata.isManualAmount}
                onCheckedChange={(checked) => dispatch({ type: 'UPDATE_METADATA', payload: { key: 'isManualAmount', value: !!checked }})}
              />
              <Label htmlFor="manual-amount-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                በእጅ ለማስገባት
              </Label>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            የክሱ ዋጋ ከላይ ካለው የዕዳ ማስያ የሚገኝ ከሆነ በራስ-ሰር ይገባል።
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
