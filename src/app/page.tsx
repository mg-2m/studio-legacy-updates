"use client";

import React, { useReducer, useEffect, useMemo, useCallback } from 'react';
import type { AppState } from '@/lib/types';
import { INITIAL_STATE, SMART_FACTS, EVIDENCE_REGISTRY } from '@/lib/data';
import { suggestEvidence } from '@/ai/flows/evidence-suggestion';
import { provideMaintenanceContext } from '@/ai/flows/maintenance-calculator-assistance';

import MainLayout from '@/components/main-layout';

type Action =
  | { type: 'UPDATE_METADATA'; payload: { key: string; value: any } }
  | { type: 'ADD_PARTY'; payload: { role: 'applicants' | 'respondents' } }
  | { type: 'REMOVE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string } }
  | { type: 'UPDATE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string; field: string; value: any } }
  | { type: 'TOGGLE_FACT'; payload: { factId: string } }
  | { type: 'ADD_CUSTOM_FACT' }
  | { type: 'UPDATE_FACT_TEXT'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_MAINTENANCE'; payload: { checked: boolean } }
  | { type: 'UPDATE_MAINTENANCE'; payload: { key: string; value: any } }
  | { type: 'SET_MAINTENANCE_CONTEXT'; payload: string }
  | { type: 'ADD_EVIDENCE'; payload: { type: 'Document' | 'Witness' | 'CourtOrder' } }
  | { type: 'REMOVE_EVIDENCE'; payload: { id: string } }
  | { type: 'UPDATE_EVIDENCE'; payload: { id: string; field: string; value: any } }
  | { type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL'; payload: { registryId: string; credentialValue: string } }
  | { type: 'SET_SMART_EVIDENCE'; payload: { evidenceIds: string[] } }
  | { type: 'REMOVE_SMART_EVIDENCE'; payload: { registryId: string } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...state, metadata: { ...state.metadata, [action.payload.key]: action.payload.value } };
    
    case 'ADD_PARTY': {
      const newParty = { id: Date.now().toString(), name: '', idNumber: '', phone: '', address: { city: 'Addis Ababa (አዲስ አበባ)', subcity: 'Bole (ቦሌ)' } };
      return { ...state, [action.payload.role]: [...state[action.payload.role], newParty] };
    }

    case 'REMOVE_PARTY':
      return { ...state, [action.payload.role]: state[action.payload.role].filter(p => p.id !== action.payload.id) };
      
    case 'UPDATE_PARTY': {
      const { role, id, field, value } = action.payload;
      return {
        ...state,
        [role]: state[role].map(p => {
          if (p.id === id) {
            if (field.includes('.')) {
              const [key1, key2] = field.split('.');
              return { ...p, [key1]: { ...(p as any)[key1], [key2]: value } };
            }
            return { ...p, [field]: value };
          }
          return p;
        })
      };
    }

    case 'TOGGLE_FACT': {
      const { factId } = action.payload;
      const factExists = state.selectedFacts.some(f => f.id === factId);
      let newSelectedFacts;
      let newSmartEvidence = { ...state.smartEvidence };

      if (factExists) {
        newSelectedFacts = state.selectedFacts.filter(f => f.id !== factId);
        const originalFact = SMART_FACTS.find(f => f.id === factId);
        if (originalFact?.autoEvidence && newSmartEvidence[originalFact.autoEvidence]) {
          delete newSmartEvidence[originalFact.autoEvidence];
        }
      } else {
        const factToAdd = SMART_FACTS.find(f => f.id === factId);
        if (factToAdd) {
          newSelectedFacts = [...state.selectedFacts, factToAdd];
        } else {
          newSelectedFacts = state.selectedFacts;
        }
      }
      return { ...state, selectedFacts: newSelectedFacts, smartEvidence: newSmartEvidence };
    }

    case 'ADD_CUSTOM_FACT': {
      const newFact = { id: 'c' + Date.now(), label: 'Custom', legalText: 'Enter custom fact...', citation: '', autoEvidence: null, isCustom: true };
      return { ...state, selectedFacts: [...state.selectedFacts, newFact] };
    }

    case 'UPDATE_FACT_TEXT':
      return { ...state, selectedFacts: state.selectedFacts.map(f => f.id === action.payload.id ? { ...f, legalText: action.payload.text } : f) };

    case 'TOGGLE_MAINTENANCE':
      return { ...state, maintenance: { ...state.maintenance, active: action.payload.checked } };
      
    case 'UPDATE_MAINTENANCE': {
      const { key, value } = action.payload;
      const newMaintenance = { ...state.maintenance, [key]: value };
      const total = newMaintenance.income * 0.33;
      newMaintenance.result = newMaintenance.children > 0 ? total / newMaintenance.children : 0;
      return { ...state, maintenance: newMaintenance };
    }

    case 'SET_MAINTENANCE_CONTEXT':
      return { ...state, maintenance: { ...state.maintenance, context: action.payload } };

    case 'SET_SMART_EVIDENCE': {
      const newSmartEvidence: AppState['smartEvidence'] = {};
      action.payload.forEach(id => {
        if (EVIDENCE_REGISTRY[id]) {
          newSmartEvidence[id] = state.smartEvidence[id] || { credentialId: '', active: true };
        }
      });
      const currentManualEvidenceIds = Object.keys(state.smartEvidence);
      const allEvidenceIds = [...new Set([...action.payload, ...currentManualEvidenceIds])];
      const finalSmartEvidence: AppState['smartEvidence'] = {};
      allEvidenceIds.forEach(id => {
         if (EVIDENCE_REGISTRY[id] && (newSmartEvidence[id] || state.smartEvidence[id])) {
            finalSmartEvidence[id] = newSmartEvidence[id] || state.smartEvidence[id];
         }
      })
      return { ...state, smartEvidence: finalSmartEvidence };
    }

    case 'UPDATE_SMART_EVIDENCE_CREDENTIAL': {
      const { registryId, credentialValue } = action.payload;
      return { ...state, smartEvidence: { ...state.smartEvidence, [registryId]: { ...state.smartEvidence[registryId], credentialId: credentialValue } } };
    }

    case 'REMOVE_SMART_EVIDENCE': {
      const newSmartEvidence = { ...state.smartEvidence };
      delete newSmartEvidence[action.payload.registryId];
      return { ...state, smartEvidence: newSmartEvidence };
    }
    
    case 'ADD_EVIDENCE': {
      const newEvidence = { id: Date.now().toString(), type: action.payload.type, description: '', issuer: '', refNumber: '', isManual: true as const };
      return { ...state, evidence: [...state.evidence, newEvidence] };
    }
    case 'REMOVE_EVIDENCE':
      return { ...state, evidence: state.evidence.filter(e => e.id !== action.payload.id) };
    case 'UPDATE_EVIDENCE': {
      const { id, field, value } = action.payload;
      return { ...state, evidence: state.evidence.map(e => e.id === id ? { ...e, [field]: value } : e) };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectedFactIds = useMemo(() => state.selectedFacts.map(f => f.id), [state.selectedFacts]);

  const handleSuggestEvidence = useCallback(async () => {
    if (selectedFactIds.length > 0) {
      try {
        const result = await suggestEvidence({ selectedFacts: selectedFactIds });
        if (result && result.suggestedEvidence) {
          dispatch({ type: 'SET_SMART_EVIDENCE', payload: result.suggestedEvidence });
        }
      } catch (error) {
        console.error("Error suggesting evidence:", error);
      }
    } else {
        dispatch({ type: 'SET_SMART_EVIDENCE', payload: [] });
    }
  }, [selectedFactIds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSuggestEvidence();
    }, 500); // Debounce AI call
    return () => clearTimeout(timer);
  }, [handleSuggestEvidence]);

  const { income, children, active } = state.maintenance;

  const handleMaintenanceContext = useCallback(async () => {
    if (active && income > 0 && children > 0) {
      try {
        const result = await provideMaintenanceContext({ income, children });
        if (result && result.context) {
          dispatch({ type: 'SET_MAINTENANCE_CONTEXT', payload: result.context });
        }
      } catch (error) {
        console.error("Error providing maintenance context:", error);
      }
    }
  }, [active, income, children]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMaintenanceContext();
    }, 500); // Debounce AI call
    return () => clearTimeout(timer);
  }, [handleMaintenanceContext]);


  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <main>
      <MainLayout state={state} dispatch={dispatch} />
    </main>
  );
}
