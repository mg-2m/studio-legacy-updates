
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppState } from '@/lib/types';

interface DocumentPreviewProps {
  state: AppState;
}

export function DocumentPreview({ state }: DocumentPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}
