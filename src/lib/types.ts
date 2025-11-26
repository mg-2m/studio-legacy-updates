export interface Party {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  honorific: string;
  address: {
    city: string;
    subcity: string;
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

export interface SmartEvidence {
  [key: string]: {
    credentialId: string;
    active: boolean;
  };
}

export interface ManualEvidence {
  id: string;
  type: 'Document' | 'Witness' | 'CourtOrder';
  description: string;
  issuer: string;
  refNumber: string;
  isManual: true;
  pageCount: string;
  documentType: 'Original' | 'Copy';
  originalLocation: string;
}

export interface Fact {
  id: string;
  label: string;
  legalText: string;
  citation: string;
  autoEvidence: string[] | null;
  isCustom?: boolean;
}

export interface Relief {
    id: string;
    text: string;
    isDefault: boolean;
    isDynamic?: boolean;
    isCustom?: boolean;
}

export type Template = {
  id: 'divorce' | 'labour';
  label: string;
  icon: React.ElementType;
};

export interface AppState {
  metadata: Metadata;
  applicants: Party[];
  respondents: Party[];
  selectedFacts: Fact[];
  selectedReliefs: Relief[];
  maintenance: Maintenance;
  evidence: ManualEvidence[];
  smartEvidence: SmartEvidence;
  partyTitles: {
    applicant: 'አመልካች (Applicant)' | 'ከሳሽ (Plaintiff)';
    respondent: 'ተጠሪ (Respondent)' | 'ተከሳሽ (Defendant)';
  };
  selectedTemplate: 'divorce' | 'labour';
}
