
import type { AppState } from './types';

export const initialState: AppState = {
  metadata: {
    courtLevel: '',
    bench: '',
    benchType: '',
    city: '',
    fileNumber: '',
    date: new Date().toISOString().split('T')[0],
    representation: 'self',
    summonsDelivery: 'self',
    claimPurpose: '',
    claimAmount: '',
  },
  applicants: [],
  respondents: [],
  selectedFacts: [],
  selectedReliefs: [],
  maintenance: {
    active: false,
    income: 0,
    children: 1,
    result: 0,
  },
  calculations: {},
  evidence: [],
  smartEvidence: {},
  partyTitles: {
    applicant: 'Applicant',
    respondent: 'Respondent',
  },
  selectedTemplate: '',
  selectedSubTemplate: 'template1',
};
