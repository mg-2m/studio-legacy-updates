

export interface Party {
  id: string;
  name: string;
  honorific: string;
  address: {
    city: string;
    subcity: string;
    subcityOther?: string;
    woreda: string;
    houseNo: string;
  };
}

export interface Metadata {
  courtLevel: string;
  courtLevelOther?: string;
  bench: string;
  benchOther?: string;
  benchType: string;
  benchTypeOther?: string;
  city: string;
  cityOther?: string;
  fileNumber: string;
  date: string;
  representation: 'self' | 'lawyer' | 'both';
  summonsDelivery: 'self' | 'police' | 'post';
  claimPurpose: string;
  claimAmount: string;
  isManualAmount?: boolean;
}

export interface Maintenance {
  active: boolean;
  income: number;
  children: number;
  result: number;
  context?: string;
}

export interface Calculation {
    [key: string]: number | string;
}

export interface SmartEvidenceData {
  credentialId: string;
  active: boolean;
  type: 'auto' | 'ai';
}

export interface SmartEvidence {
  [key: string]: SmartEvidenceData;
}

interface BaseManualEvidence {
  id: string;
  isManual: true;
}

interface ManualDocumentEvidence extends BaseManualEvidence {
    type: 'Document';
    description: string;
    issuer: string;
    issuerOther?: string;
    refNumber: string;
    issueDate: string;
    pageCount: string;
    documentType: 'Original' | 'Copy';
    originalLocation: string;
    originalLocationOther?: string;
}

interface ManualWitnessEvidence extends BaseManualEvidence {
    type: 'Witness';
    honorific: string;
    name: string;
    city: string;
    subcity: string;
    subcityOther?: string;
    woreda: string;
    houseNo: string;
}

interface ManualCourtOrderEvidence extends BaseManualEvidence {
    type: 'CourtOrder';
    description: string;
}

export type ManualEvidence = ManualDocumentEvidence | ManualWitnessEvidence | ManualCourtOrderEvidence;


export interface Fact {
  id: string;
  label: string;
  legalText: string;
  citation: string;
  autoEvidence: string[] | null;
  suggestedEvidence?: string[] | null; // New field for fallback suggestions
  isCustom?: boolean;
  values: { [key: string]: string | number | undefined };
  mutexGroup?: string;
  rhetoric?: {
    intro?: string;
    transition?: string;
    summary_keyword?: string;
  };
}

export interface Relief {
    id: string;
    text: string;
    isDefault: boolean;
    isDynamic?: boolean;
    isCustom?: boolean;
    values: { [key: string]: string | number | undefined };
    calculations?: {
      [key: string]: Calculation;
    };
}

export interface SubTemplate {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface Template {
  id: string;
  label: string;
  icon: React.ElementType;
  subTemplates: SubTemplate[];
}


export interface PartyTitles {
  applicant: string;
  respondent: string;
}

export interface CalculationInput {
  id: string;
  label: string;
  type: 'number' | 'date';
  defaultValue: number | string;
}

export interface CalculationOutput {
  id: string;
  label: string;
}

export interface CalculationConfig {
  title: string;
  description: string;
  inputs: CalculationInput[];
  outputs: CalculationOutput[];
  formula: string;
}


export interface TemplateData {
  facts: Fact[];
  reliefs: Relief[];
  partyTitles: PartyTitles;
  documentTitle: string;
  jurisdictionText: string;
  templateDescription?: string;
  calculations?: {
    [key: string]: CalculationConfig;
  };
  meta?: {
      purpose?: string;
  }
}


export interface EvidenceRegistryItem {
  id: string;
  label: string;
  type: 'Document' | 'Witness';
  credentialLabel: string;
  credentialPlaceholder: string;
  sentenceTemplate?: string;
}

export type EvidenceRegistry = { [key: string]: EvidenceRegistryItem };


export interface AppState {
  metadata: Metadata;
  applicants: Party[];
  respondents: Party[];
  selectedFacts: Fact[];
  selectedReliefs: Relief[];
  maintenance: Maintenance;
  calculations: {
    [key: string]: Calculation;
  };
  evidence: ManualEvidence[];
  smartEvidence: SmartEvidence;
  partyTitles: PartyTitles;
  selectedTemplate: string;
  selectedSubTemplate: string | null;
}

export type Action =
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
  | { type: 'UPDATE_SMART_EVIDENCE_CREDENTIAL'; payload: { registryId: string; credentialValue: string; field: string; } }
  | { type: 'SET_SELECTED_SUB_TEMPLATE'; payload: { templateId: string; subTemplateId: string } }
  | { type: 'TOGGLE_RELIEF'; payload: { reliefId: string } }
  | { type: 'UPDATE_RELIEF_VALUE'; payload: { reliefId: string; field: string; value: string } }
  | { type: 'ADD_CUSTOM_RELIEF' }
  | { type: 'UPDATE_CUSTOM_RELIEF'; payload: { id: string; text: string } }
  | { type: 'REMOVE_CUSTOM_RELIEF'; payload: { id: string } };
