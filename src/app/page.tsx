
"use client";

import React, { useReducer, useEffect, useCallback } from 'react';
import type { AppState } from '@/lib/types';
import { INITIAL_STATE, HONORIFICS, REGIONS_AND_CITIES, AA_SUBCITIES, EVIDENCE_LOCATIONS, DOCUMENT_ISSUERS, TEMPLATE_DATA, EVIDENCE_REGISTRY } from '@/lib/data';
import { suggestEvidence } from '@/ai/flows/evidence-suggestion';
import { provideMaintenanceContext } from '@/ai/flows/maintenance-calculator-assistance';
import { useToast } from '@/hooks/use-toast';

import MainLayout from '@/components/main-layout';

type Action =
  | { type: 'UPDATE_METADATA'; payload: { key: string; value: any } }
  | { type: 'ADD_PARTY'; payload: { role: 'applicants' | 'respondents' } }
  | { type: 'REMOVE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string } }
  | { type: 'UPDATE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string; field: string; value: any } }
  | { type: 'TOGGLE_FACT'; payload: { factId: string } }
  | { type: 'ADD_CUSTOM_FACT' }
  | { type: 'UPDATE_FACT_TEXT'; payload: { id: string; text: string } }
  | { type: 'REMOVE_CUSTOM_FACT'; payload: { id: string } }
  | { type: 'TOGGLE_MAINTENANCE'; payload: { checked: boolean } }
  | { type: 'UPDATE_MAINTENANCE'; payload: { key: string; value: any } }
  | { type: 'SET_MAINTENANCE_CONTEXT'; payload: string }
  | { type: 'ADD_EVIDENCE'; payload: { type: 'Document' | 'Witness' | 'CourtOrder' } }
  | { type: 'REMOVE_EVIDENCE'; payload: { id: string } }
  | { type: 'UPDATE_EVIDENCE'; payload: { id: string; field: string; value: any } }
  | { type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL'; payload: { registryId: string; credentialValue: string } }
  | { type: 'SET_SUGGESTED_EVIDENCE'; payload: { evidenceIds: string[] } }
  | { type: 'ADD_SMART_EVIDENCE'; payload: { registryId: string } }
  | { type: 'REMOVE_SMART_EVIDENCE'; payload: { registryId: string } }
  | { type: 'SET_SELECTED_SUB_TEMPLATE'; payload: { templateId: string; subTemplateId: string } }
  | { type: 'TOGGLE_RELIEF'; payload: { reliefId: string } }
  | { type: 'ADD_CUSTOM_RELIEF' }
  | { type: 'UPDATE_CUSTOM_RELIEF'; payload: { id: string; text: string } }
  | { type: 'REMOVE_CUSTOM_RELIEF'; payload: { id: string } };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...state, metadata: { ...state.metadata, [action.payload.key]: action.payload.value } };
    
    case 'ADD_PARTY': {
      const newParty = { id: Date.now().toString(), name: '', idNumber: '', phone: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1], subcityOther: '' } };
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
      const smartFactsForTemplate = TEMPLATE_DATA[state.selectedSubTemplate]?.facts || [];
      const factExists = state.selectedFacts.some(f => f.id === factId);
      let newSelectedFacts;
      
      if (factExists) {
        newSelectedFacts = state.selectedFacts.filter(f => f.id !== factId);
      } else {
        const factToAdd = smartFactsForTemplate.find(f => f.id === factId);
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
    
    case 'REMOVE_CUSTOM_FACT': {
      return { ...state, selectedFacts: state.selectedFacts.filter(f => f.id !== action.payload.id) };
    }

    case 'TOGGLE_MAINTENANCE': {
        if (state.selectedSubTemplate !== 'divorce') return state; // Only for divorce template
        const newActive = action.payload.checked;
        const newSmartEvidence = { ...state.smartEvidence };
        const newSelectedReliefs = [...state.selectedReliefs];
        const maintenanceRelief = TEMPLATE_DATA.divorce.reliefs.find(r => r.id === 'maintenance');

        if (newActive) {
          // Activate maintenance
          if (EVIDENCE_REGISTRY['birth_cert']) {
            newSmartEvidence['birth_cert'] = state.smartEvidence['birth_cert'] || { credentialId: '', active: false };
          }
          if (maintenanceRelief && !newSelectedReliefs.some(r => r.id === 'maintenance')) {
              newSelectedReliefs.push(maintenanceRelief);
          }
        } else {
          // Deactivate maintenance
          const isBirthCertRequiredByOtherFact = state.selectedFacts.some(fact => fact.autoEvidence?.includes('birth_cert'));
          if (!isBirthCertRequiredByOtherFact) {
            delete newSmartEvidence['birth_cert'];
          }
           if (maintenanceRelief) {
              const index = newSelectedReliefs.findIndex(r => r.id === 'maintenance');
              if (index > -1) {
                  newSelectedReliefs.splice(index, 1);
              }
          }
        }
        return { ...state, maintenance: { ...state.maintenance, active: newActive }, smartEvidence: newSmartEvidence, selectedReliefs: newSelectedReliefs };
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
        issuerOther: '',
        refNumber: '',
        pageCount: '',
        documentType: 'Copy' as const,
        originalLocation: EVIDENCE_LOCATIONS[0],
        originalLocationOther: '',
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
    case 'SET_SELECTED_SUB_TEMPLATE': {
        const { templateId, subTemplateId } = action.payload;
        if (state.selectedSubTemplate === subTemplateId) {
            return state; // No change
        }

        const templateData = TEMPLATE_DATA[subTemplateId];
        if (!templateData) return state; // Safety check

        // Reset state relevant to the template
        return {
            ...state,
            selectedTemplate: templateId,
            selectedSubTemplate: subTemplateId,
            partyTitles: templateData.partyTitles,
            selectedFacts: [],
            selectedReliefs: templateData.reliefs.filter(r => r.isDefault),
            smartEvidence: {},
            maintenance: { // Reset maintenance as it's specific to divorce
                active: false,
                income: 0,
                children: 1,
                result: 0,
                context: '',
            },
        };
    }

    case 'TOGGLE_RELIEF': {
      const { reliefId } = action.payload;
      if (reliefId === 'maintenance' && state.selectedSubTemplate === 'divorce') {
          return appReducer(state, { type: 'TOGGLE_MAINTENANCE', payload: { checked: !state.maintenance.active } });
      }
      const reliefItem = TEMPLATE_DATA[state.selectedSubTemplate]?.reliefs.find(r => r.id === reliefId);
      if (!reliefItem) return state;

      const isSelected = state.selectedReliefs.some(r => r.id === reliefId);
      
      if (isSelected) {
        return { ...state, selectedReliefs: state.selectedReliefs.filter(r => r.id !== reliefId) };
      } else {
        return { ...state, selectedReliefs: [...state.selectedReliefs, reliefItem] };
      }
    }
    
    case 'ADD_CUSTOM_RELIEF': {
      const newRelief = { id: 'cr' + Date.now(), text: 'Enter custom relief...', isDefault: false, isCustom: true };
      return { ...state, selectedReliefs: [...state.selectedReliefs, newRelief] };
    }

    case 'UPDATE_CUSTOM_RELIEF': {
      return { ...state, selectedReliefs: state.selectedReliefs.map(r => r.id === action.payload.id ? { ...r, text: action.payload.text } : r) };
    }

    case 'REMOVE_CUSTOM_RELIEF': {
      return { ...state, selectedReliefs: state.selectedReliefs.filter(r => r.id !== action.payload.id) };
    }

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const [isClient, setIsClient] = React.useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { selectedFacts } = state;

  const handleSuggestEvidence = useCallback(async () => {
    if (selectedFacts.length > 0) {
      try {
        const result = await suggestEvidence({ 
          selectedFacts: selectedFacts.map(({id, label, legalText}) => ({id, label, legalText})),
          evidenceRegistry: EVIDENCE_REGISTRY,
        });
        if (result && result.suggestedEvidence) {
          dispatch({ type: 'SET_SUGGESTED_EVIDENCE', payload: { evidenceIds: result.suggestedEvidence } });
        }
      } catch (error) {
        console.error("Error suggesting evidence:", error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not get evidence suggestions from AI.",
        });
      }
    }
  }, [selectedFacts, toast]);

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
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not get maintenance context from AI.",
        });
      }
    }
  }, [active, income, children, toast]);

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
