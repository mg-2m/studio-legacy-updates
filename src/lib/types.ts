

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
  bench: string;
  benchOther?: string;
  benchType: string;
  city: string;
  fileNumber: string;
  date: string;
  jurisdictionLaw: string;
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
