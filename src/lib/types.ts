

export interface Party {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  honorific: string;
  address: {
    city: string;
    subcity: string;
    subcityOther?: string;
  };
}

export interface Metadata {
  courtLevel: string;
  bench: string;
  city: string;
  fileNumber: string;
  date: string;
  jurisdictionLaw: string;
  representation: 'self' | 'lawyer' | 'both';
  summonsDelivery: 'self' | 'police' | 'post';
}

export interface Maintenance {
  active: boolean;
  income: number;
  children: number;
  result: number;
  context?: string;
}

export interface SmartEvidenceData {
  credentialId: string;
  active: boolean;
  type: 'auto' | 'ai';
}

export interface SmartEvidence {
  [key: string]: SmartEvidenceData;
}

export interface ManualEvidence {
  id: string;
  type: 'Document' | 'Witness' | 'CourtOrder';
  description: string;
  issuer: string;
  issuerOther?: string;
  refNumber: string;
  isManual: true;
  pageCount: string;
  documentType: 'Original' | 'Copy';
  originalLocation: string;
  originalLocationOther?: string;
}

export interface Fact {
  id: string;
  label: string;
  legalText: string;
  citation: string;
  autoEvidence: string[] | null;
  isCustom?: boolean;
  values: { [key: string]: string | number | undefined };
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

export interface TemplateData {
  facts: Fact[];
  reliefs: Relief[];
  partyTitles: PartyTitles;
  documentTitle: string;
  jurisdictionText: string;
  templateDescription?: string;
}


export interface EvidenceRegistryItem {
  id: string;
  label: string;
  type: 'Document' | 'Witness';
  credentialLabel: string;
  credentialPlaceholder: string;
}

export type EvidenceRegistry = { [key: string]: EvidenceRegistryItem };


export interface AppState {
  metadata: Metadata;
  applicants: Party[];
  respondents: Party[];
  selectedFacts: Fact[];
  selectedReliefs: Relief[];
  maintenance: Maintenance;
  evidence: ManualEvidence[];
  smartEvidence: SmartEvidence;
  partyTitles: PartyTitles;
  selectedTemplate: string;
  selectedSubTemplate: string;
}
