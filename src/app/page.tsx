"use client";

import React, { useReducer, useEffect, useMemo, useCallback } from 'react';
import type { AppState } from '@/lib/types';
import { INITIAL_STATE, SMART_FACTS, EVIDENCE_REGISTRY, HONORIFICS, REGIONS_AND_CITIES, AA_SUBCITIES, EVIDENCE_LOCATIONS, DOCUMENT_ISSUERS } from '@/lib/data';
import { suggestEvidence } from '@/ai/flows/evidence-suggestion';
import { provideMaintenanceContext } from '@/ai/flows/maintenance-calculator-assistance';

import MainLayout from '@/components/main-layout';

type Action =
  | { type: 'UPDATE_METADATA'; payload: { key: string; value: any } }
  | { type: 'UPDATE_PARTY_TITLE'; payload: { role: 'applicant' | 'respondent'; title: string } }
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
  | { type: 'SET_SUGGESTED_EVIDENCE'; payload: { evidenceIds: string[] } }
  | { type: 'ADD_SMART_EVIDENCE'; payload: { registryId: string } }
  | { type: 'REMOVE_SMART_EVIDENCE'; payload: { registryId: string } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...state, metadata: { ...state.metadata, [action.payload.key]: action.payload.value } };
    
    case 'UPDATE_PARTY_TITLE': {
      const { role, title } = action.payload;
      return { ...state, partyTitles: { ...state.partyTitles, [role]: title } };
    }

    case 'ADD_PARTY': {
      const newParty = { id: Date.now().toString(), name: '', idNumber: '', phone: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1] } };
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
      
      if (factExists) {
        newSelectedFacts = state.selectedFacts.filter(f => f.id !== factId);
      } else {
        const factToAdd = SMART_FACTS.find(f => f.id === factId);
        newSelectedFacts = factToAdd ? [...state.selectedFacts, factToAdd] : state.selectedFacts;
      }
      
      const newSmartEvidence: AppState['smartEvidence'] = {};
      newSelectedFacts.forEach(fact => {
        fact.autoEvidence?.forEach(evidenceId => {
          if (state.smartEvidence[evidenceId]) {
            newSmartEvidence[evidenceId] = state.smartEvidence[evidenceId];
          } else if (EVIDENCE_REGISTRY[evidenceId]) {
             newSmartEvidence[evidenceId] = { credentialId: '', active: false };
          }
        });
      });

      return { ...state, selectedFacts: newSelectedFacts, smartEvidence: newSmartEvidence };
    }

    case 'ADD_CUSTOM_FACT': {
      const newFact = { id: 'c' + Date.now(), label: 'Custom', legalText: 'Enter custom fact...', citation: '', autoEvidence: null, isCustom: true };
      return { ...state, selectedFacts: [...state.selectedFacts, newFact] };
    }

    case 'UPDATE_FACT_TEXT':
      return { ...state, selectedFacts: state.selectedFacts.map(f => f.id === action.payload.id ? { ...f, legalText: action.payload.text } : f) };

    case 'TOGGLE_MAINTENANCE': {
        const newActive = action.payload.checked;
        const newSmartEvidence = { ...state.smartEvidence };
        if (newActive && EVIDENCE_REGISTRY['birth_cert']) {
          newSmartEvidence['birth_cert'] = state.smartEvidence['birth_cert'] || { credentialId: '', active: false };
        } else if (!newActive) {
          // Only remove birth_cert if no other fact requires it
          const isBirthCertRequiredByOtherFact = state.selectedFacts.some(fact => fact.autoEvidence?.includes('birth_cert'));
          if (!isBirthCertRequiredByOtherFact) {
            delete newSmartEvidence['birth_cert'];
          }
        }
        return { ...state, maintenance: { ...state.maintenance, active: newActive }, smartEvidence: newSmartEvidence };
    }
      
    case 'UPDATE_MAINTENANCE': {
      const { key, value } = action.payload;
      const newMaintenance = { ...state.maintenance, [key]: value };
      const total = newMaintenance.income * 0.33;
      newMaintenance.result = newMaintenance.children > 0 ? total / newMaintenance.children : 0;
      return { ...state, maintenance: newMaintenance };
    }

    case 'SET_MAINTENANCE_CONTEXT':
      return { ...state, maintenance: { ...state.maintenance, context: action.payload } };
    
    case 'SET_SUGGESTED_EVIDENCE': {
      const suggestedIds = action.payload.evidenceIds;
      const newSmartEvidence = { ...state.smartEvidence };
      
      // Add suggested evidence if not already present
      suggestedIds.forEach(id => {
        if (EVIDENCE_REGISTRY[id] && !newSmartEvidence[id]) {
          newSmartEvidence[id] = { credentialId: '', active: false };
        }
      });

      return { ...state, smartEvidence: newSmartEvidence };
    }
    
    case 'ADD_SMART_EVIDENCE': {
        const { registryId } = action.payload;
        if(state.smartEvidence[registryId]) {
            return { ...state, smartEvidence: { ...state.smartEvidence, [registryId]: { ...state.smartEvidence[registryId], active: true } } };
        }
        return state;
    }

    case 'UPDATE_SMART_EVIDENCE_CREDENTIAL': {
      const { registryId, credentialValue } = action.payload;
       if(state.smartEvidence[registryId]) {
         return { ...state, smartEvidence: { ...state.smartEvidence, [registryId]: { ...state.smartEvidence[registryId], credentialId: credentialValue } } };
       }
       return state;
    }

    case 'REMOVE_SMART_EVIDENCE': {
        const { registryId } = action.payload;
        const factIsSelected = state.selectedFacts.some(f => f.autoEvidence?.includes(registryId));
        const maintenanceIsActive = state.maintenance.active && registryId === 'birth_cert';

        if (factIsSelected || maintenanceIsActive) {
            return { ...state, smartEvidence: { ...state.smartEvidence, [registryId]: { ...state.smartEvidence[registryId], active: false } } };
        } else {
             const newSmartEvidence = { ...state.smartEvidence };
             delete newSmartEvidence[registryId];
             return { ...state, smartEvidence: newSmartEvidence };
        }
    }
    
    case 'ADD_EVIDENCE': {
      const newEvidence = { 
        id: Date.now().toString(), 
        type: action.payload.type, 
        description: '', 
        issuer: DOCUMENT_ISSUERS[0], 
        refNumber: '',
        pageCount: '',
        documentType: 'Copy' as const,
        originalLocation: EVIDENCE_LOCATIONS[0],
        isManual: true as const 
      };
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
          dispatch({ type: 'SET_SUGGESTED_EVIDENCE', payload: { evidenceIds: result.suggestedEvidence } });
        }
      } catch (error) {
        console.error("Error suggesting evidence:", error);
      }
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
    <MainLayout state={state} dispatch={dispatch} />
  );
}
