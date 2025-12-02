
"use client";

import React, { useReducer, useEffect, useCallback } from 'react';
import type { AppState, Fact, Calculation, ManualEvidence } from '@/lib/types';
import { INITIAL_STATE, HONORIFICS, REGIONS_AND_CITIES, AA_SUBCITIES, EVIDENCE_LOCATIONS, DOCUMENT_ISSUERS, TEMPLATE_DATA, EVIDENCE_REGISTRY } from '@/lib/data';
import { suggestEvidence } from '@/ai/flows/evidence-suggestion';
import { provideMaintenanceContext } from '@/ai/flows/maintenance-calculator-assistance';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, parseISO } from 'date-fns';


import MainLayout from '@/components/main-layout';

type Action =
  | { type: 'UPDATE_METADATA'; payload: { key: string; value: any } }
  | { type: 'ADD_PARTY'; payload: { role: 'applicants' | 'respondents' } }
  | { type: 'REMOVE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string } }
  | { type: 'UPDATE_PARTY'; payload: { role: 'applicants' | 'respondents'; id: string; field: string; value: any } }
  | { type: 'TOGGLE_FACT'; payload: { factId: string; mutexGroup?: string } }
  | { type: 'UPDATE_FACT_VALUE'; payload: { factId: string; field: string; value: string } }
  | { type: 'ADD_CUSTOM_FACT' }
  | { type: 'UPDATE_FACT_TEXT'; payload: { id: string; text: string } }
  | { type: 'REMOVE_CUSTOM_FACT'; payload: { id: string } }
  | { type: 'TOGGLE_MAINTENANCE'; payload: { checked: boolean } }
  | { type: 'UPDATE_MAINTENANCE'; payload: { key: string; value: any } }
  | { type: 'SET_MAINTENANCE_CONTEXT'; payload: string }
  | { type: 'UPDATE_CALCULATION'; payload: { calcKey: string; field: string; value: any } }
  | { type: 'ADD_EVIDENCE'; payload: { type: 'Document' | 'Witness' | 'CourtOrder' } }
  | { type: 'REMOVE_EVIDENCE'; payload: { id: string } }
  | { type: 'UPDATE_EVIDENCE'; payload: { id: string; field: string; value: any } }
  | { type: 'SET_AI_SUGGESTIONS'; payload: { evidenceIds: string[] } }
  | { type: 'ADD_SMART_EVIDENCE'; payload: { registryId: string } }
  | { type: 'DEACTIVATE_SMART_EVIDENCE'; payload: { registryId: string } }
  | { type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL'; payload: { registryId: string; credentialValue: string } }
  | { type: 'SET_SELECTED_SUB_TEMPLATE'; payload: { templateId: string; subTemplateId: string } }
  | { type: 'TOGGLE_RELIEF'; payload: { reliefId: string } }
  | { type: 'ADD_CUSTOM_RELIEF' }
  | { type: 'UPDATE_CUSTOM_RELIEF'; payload: { id: string; text: string } }
  | { type: 'REMOVE_CUSTOM_RELIEF'; payload: { id: string } };

function getAutoLinkedEvidence(selectedFacts: Fact[]): Set<string> {
    const autoLinked = new Set<string>();
    selectedFacts.forEach(fact => {
        fact.autoEvidence?.forEach(evidenceId => {
            if (EVIDENCE_REGISTRY[evidenceId]) {
                autoLinked.add(evidenceId);
            }
        });
    });
    return autoLinked;
}

// Formula Execution
function executeFormula(formula: string, data: { [key: string]: any }): any {
    const context = {
        ...data,
        differenceInDays: (date1: Date, date2: string | Date) => {
            if (!date1 || !date2) return 0;
            const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
             if (isNaN(d2.getTime())) return 0;
            return differenceInDays(date1, d2);
        }
    };
    
    const keys = Object.keys(context);
    const values = Object.values(context);
    
    try {
        const func = new Function(...keys, `return ${formula}`);
        return func(...values);
    } catch (e) {
        console.error("Error executing formula:", e);
        return 0; // Return 0 or some other default on error
    }
}


function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_METADATA':
      return { ...state, metadata: { ...state.metadata, [action.payload.key]: action.payload.value } };
    
    case 'ADD_PARTY': {
      const newParty = { id: Date.now().toString(), name: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1], subcityOther: '', woreda: '', houseNo: '' } };
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
        const { factId, mutexGroup } = action.payload;
        const allFactsForTemplate = TEMPLATE_DATA[state.selectedSubTemplate]?.facts || [];
        const factToAdd = allFactsForTemplate.find(f => f.id === factId);
        
        if (!factToAdd) return state;

        let newSelectedFacts: Fact[];

        const factExists = state.selectedFacts.some(f => f.id === factId);

        if (mutexGroup) {
            if (factExists) {
                // If it's a radio button and already selected, do nothing.
                newSelectedFacts = state.selectedFacts;
            } else {
                // Remove other facts from the same mutex group, then add the new one.
                newSelectedFacts = state.selectedFacts.filter(f => f.mutexGroup !== mutexGroup);
                newSelectedFacts.push({ ...factToAdd, values: {} });
            }
        } else {
            // Standard checkbox behavior
            newSelectedFacts = factExists
                ? state.selectedFacts.filter(f => f.id !== factId)
                : [...state.selectedFacts, { ...factToAdd, values: {} }];
        }

        const newAutoLinkedIds = getAutoLinkedEvidence(newSelectedFacts);
        const newSmartEvidence = { ...state.smartEvidence };

        // Add new auto-linked evidence
        newAutoLinkedIds.forEach(id => {
            if (!newSmartEvidence[id]) {
                newSmartEvidence[id] = { credentialId: '', active: true, type: 'auto' };
            } else {
                newSmartEvidence[id] = { ...newSmartEvidence[id], active: true, type: 'auto' };
            }
        });

        // Deactivate or remove old auto-linked evidence if no longer required
        for (const id in state.smartEvidence) {
            if (state.smartEvidence[id].type === 'auto' && !newAutoLinkedIds.has(id)) {
                delete newSmartEvidence[id];
            }
        }

        return { ...state, selectedFacts: newSelectedFacts, smartEvidence: newSmartEvidence };
    }
    
    case 'UPDATE_FACT_VALUE': {
      const { factId, field, value } = action.payload;
      return {
        ...state,
        selectedFacts: state.selectedFacts.map(f => {
          if (f.id === factId) {
            return { ...f, values: { ...f.values, [field]: value } };
          }
          return f;
        })
      };
    }

    case 'ADD_CUSTOM_FACT': {
      const newFact = { id: 'c' + Date.now(), label: 'Custom', legalText: 'Enter custom fact...', citation: '', autoEvidence: null, isCustom: true, values: {} };
      return { ...state, selectedFacts: [...state.selectedFacts, newFact] };
    }

    case 'UPDATE_FACT_TEXT':
      return { ...state, selectedFacts: state.selectedFacts.map(f => f.id === action.payload.id ? { ...f, legalText: action.payload.text } : f) };
    
    case 'REMOVE_CUSTOM_FACT': {
      return { ...state, selectedFacts: state.selectedFacts.filter(f => f.id !== action.payload.id) };
    }

    case 'TOGGLE_MAINTENANCE': {
        if (state.selectedSubTemplate !== 'family_divorce_dispute') return state;
        const newActive = action.payload.checked;
        const newSmartEvidence = { ...state.smartEvidence };
        const newSelectedReliefs = [...state.selectedReliefs];
        const maintenanceRelief = TEMPLATE_DATA.family_divorce_dispute.reliefs.find(r => r.id === 'relief_child_support');

        if (newActive) {
          if (EVIDENCE_REGISTRY['BirthCertificate']) {
              if (!newSmartEvidence['BirthCertificate']) {
                  newSmartEvidence['BirthCertificate'] = { credentialId: '', active: true, type: 'auto' };
              } else {
                  newSmartEvidence['BirthCertificate'].active = true;
              }
          }
          if (maintenanceRelief && !newSelectedReliefs.some(r => r.id === 'relief_child_support')) {
              newSelectedReliefs.push(maintenanceRelief);
          }
        } else {
          const isBirthCertRequiredByOtherFact = state.selectedFacts.some(fact => fact.autoEvidence?.includes('BirthCertificate'));
          if (!isBirthCertRequiredByOtherFact) {
              delete newSmartEvidence['BirthCertificate'];
          }
           if (maintenanceRelief) {
              const index = newSelectedReliefs.findIndex(r => r.id === 'relief_child_support');
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
    
    case 'UPDATE_CALCULATION': {
        const { calcKey, field, value } = action.payload;
        const currentTemplate = TEMPLATE_DATA[state.selectedSubTemplate];
        const calcConfig = currentTemplate?.calculations?.[calcKey];
        if (!calcConfig) return state;

        const newCalcData: Calculation = { ...state.calculations[calcKey], [field]: value };
        const newCalculations = { ...state.calculations, [calcKey]: newCalcData };

        // Re-run formula calculation
        calcConfig.outputs.forEach(output => {
            newCalculations[calcKey][output.id] = executeFormula(calcConfig.formula, newCalculations[calcKey]);
        });
        
        return { ...state, calculations: newCalculations };
    }
    
    case 'SET_AI_SUGGESTIONS': {
      const suggestedIds = action.payload.evidenceIds;
      const newSmartEvidence = { ...state.smartEvidence };
      
      // Clean up old AI suggestions that are not in the new list
      Object.keys(newSmartEvidence).forEach(id => {
        if(newSmartEvidence[id].type === 'ai' && !suggestedIds.includes(id)) {
          delete newSmartEvidence[id];
        }
      })

      // Add new AI suggestions
      suggestedIds.forEach(id => {
        if (EVIDENCE_REGISTRY[id] && !newSmartEvidence[id]) {
          newSmartEvidence[id] = { credentialId: '', active: false, type: 'ai' };
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

    case 'DEACTIVATE_SMART_EVIDENCE': {
        const { registryId } = action.payload;
        const evidenceItem = state.smartEvidence[registryId];

        if (!evidenceItem) return state;

        // Auto-linked evidence cannot be deactivated this way. It's controlled by fact selection.
        if (evidenceItem.type === 'auto') {
            return state;
        }

        // For AI-suggested or other types, just deactivate it.
        const newSmartEvidence = {
            ...state.smartEvidence,
            [registryId]: { ...evidenceItem, active: false }
        };
        return { ...state, smartEvidence: newSmartEvidence };
    }
    
    case 'ADD_EVIDENCE': {
        const newId = Date.now().toString();
        let newEvidence: ManualEvidence;

        switch (action.payload.type) {
            case 'Document':
                newEvidence = {
                    id: newId,
                    type: 'Document',
                    description: '',
                    issuer: '',
                    refNumber: '',
                    issueDate: '',
                    pageCount: '',
                    documentType: 'Copy',
                    originalLocation: '',
                    isManual: true,
                };
                break;
            case 'Witness':
                newEvidence = {
                    id: newId,
                    type: 'Witness',
                    honorific: HONORIFICS[0],
                    name: '',
                    city: REGIONS_AND_CITIES[0],
                    subcity: AA_SUBCITIES[0],
                    subcityOther: '',
                    woreda: '',
                    houseNo: '',
                    isManual: true,
                };
                break;
            case 'CourtOrder':
                newEvidence = {
                    id: newId,
                    type: 'CourtOrder',
                    description: '',
                    isManual: true,
                };
                break;
            default:
                // This should not happen with TypeScript
                return state;
        }
        return { ...state, evidence: [...state.evidence, newEvidence] };
    }

    case 'REMOVE_EVIDENCE':
      return { ...state, evidence: state.evidence.filter(e => e.id !== action.payload.id) };
    case 'UPDATE_EVIDENCE': {
      const { id, field, value } = action.payload;
       // Handle the 'temp' ID case for the first static item
        if (id.startsWith('temp_')) {
            const type = id.split('_')[1] as 'doc' | 'witness' | 'order';
            const newId = Date.now().toString();
            let newEvidence: ManualEvidence;

            switch(type) {
                case 'doc':
                    newEvidence = { id: newId, type: 'Document', description: '', issuer: '', refNumber: '', issueDate: '', pageCount: '', documentType: 'Copy', originalLocation: '', isManual: true, [field]: value };
                    break;
                case 'witness':
                    newEvidence = { id: newId, type: 'Witness', honorific: HONORIFICS[0], name: '', city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[0], woreda: '', houseNo: '', isManual: true, [field]: value };
                    break;
                case 'order':
                    newEvidence = { id: newId, type: 'CourtOrder', description: '', isManual: true, [field]: value };
                    break;
                default: return state;
            }
             // Since we're replacing a temp item, we just add the new one.
             // The old temp item doesn't exist in the state array.
            return { ...state, evidence: [...state.evidence, newEvidence] };
        }
      return { ...state, evidence: state.evidence.map(e => e.id === id ? { ...e, [field]: value } : e) };
    }
    case 'SET_SELECTED_SUB_TEMPLATE': {
        const { templateId, subTemplateId } = action.payload;
        if (state.selectedSubTemplate === subTemplateId) {
            return state; // No change
        }

        const templateData = TEMPLATE_DATA[subTemplateId];
        if (!templateData) {
            console.error(`Error: Template data not found for subTemplateId: ${subTemplateId}`);
            return state; // Safety check: Do not update state if data is missing
        }

        // Initialize calculations for the new template
        const newCalculations: { [key: string]: Calculation } = {};
        if (templateData.calculations) {
            for (const calcKey in templateData.calculations) {
                const calcConfig = templateData.calculations[calcKey];
                newCalculations[calcKey] = {};
                calcConfig.inputs.forEach(input => {
                    newCalculations[calcKey][input.id] = input.defaultValue;
                });
                // Perform initial calculation
                calcConfig.outputs.forEach(output => {
                    newCalculations[calcKey][output.id] = executeFormula(calcConfig.formula, newCalculations[calcKey]);
                });
            }
        }
        
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
            calculations: newCalculations,
        };
    }

    case 'TOGGLE_RELIEF': {
      const { reliefId } = action.payload;
      const currentTemplate = TEMPLATE_DATA[state.selectedSubTemplate];
      if (!currentTemplate) return state;

      const isMaintenanceCheckbox = currentTemplate.reliefs.some(r => r.id === 'relief_child_support');
      if (isMaintenanceCheckbox && reliefId === 'relief_child_support') {
          return appReducer(state, { type: 'TOGGLE_MAINTENANCE', payload: { checked: !state.maintenance.active } });
      }
      
      const reliefItem = currentTemplate.reliefs.find(r => r.id === reliefId);
      if (!reliefItem) return state;

      const isSelected = state.selectedReliefs.some(r => r.id === reliefId);
      
      if (isSelected) {
        return { ...state, selectedReliefs: state.selectedReliefs.filter(r => r.id !== reliefId) };
      } else {
        return { ...state, selectedReliefs: [...state.selectedReliefs, reliefItem] };
      }
    }
    
    case 'ADD_CUSTOM_RELIEF': {
      const newRelief = { id: 'cr' + Date.now(), text: 'Enter custom relief...', isDefault: false, isDynamic: false, isCustom: true };
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
    // Get auto-linked evidence to pass to the AI, so it doesn't suggest them again.
    const autoLinkedIds = Array.from(getAutoLinkedEvidence(selectedFacts));

    try {
      const result = await suggestEvidence({
        selectedFacts: selectedFacts.map(({ id, label, legalText }) => ({ id, label, legalText })),
        evidenceRegistry: EVIDENCE_REGISTRY,
        autoLinkedEvidenceIds: autoLinkedIds,
      });
      if (result && result.suggestedEvidence) {
        dispatch({ type: 'SET_AI_SUGGESTIONS', payload: { evidenceIds: result.suggestedEvidence } });
      }
    } catch (error) {
      console.error("Error suggesting evidence via AI:", error);
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Falling back to rule-based suggestions.",
      });

      // --- FALLBACK LOGIC ---
      const fallbackSuggestions = new Set<string>();
      selectedFacts.forEach(fact => {
        fact.suggestedEvidence?.forEach(id => {
          if (!autoLinkedIds.includes(id)) {
            fallbackSuggestions.add(id);
          }
        });
      });
      dispatch({ type: 'SET_AI_SUGGESTIONS', payload: { evidenceIds: Array.from(fallbackSuggestions) } });
    }
  }, [selectedFacts, toast]);


  useEffect(() => {
    const timer = setTimeout(() => {
        if(selectedFacts.length > 0) {
            handleSuggestEvidence();
        } else {
            // Clear suggestions if no facts are selected
            dispatch({ type: 'SET_AI_SUGGESTIONS', payload: { evidenceIds: [] } });
        }
    }, 500); // Debounce AI call
    return () => clearTimeout(timer);
  }, [selectedFacts, handleSuggestEvidence]);

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
