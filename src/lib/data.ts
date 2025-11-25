import type { AppState } from "./types";

export const COURT_HIERARCHY = {
  "Federal First Instance Court (የፌዴራል የመጀመሪያ ደረጃ ፍርድ ቤት)": [
    "Lideta (ልደታ)", "Bole (ቦሌ)", "Kirkos (ቂርቆስ)", "Arada (አራዳ)", "Menaharia (መናሃሪያ)", "Yeka (የካ)", "Akaki (አቃቂ)"
  ],
  "Federal High Court (የፌዴራል ከፍተኛ ፍርድ ቤት)": [
    "Lideta Appellate (ልደታ ይግባኝ)", "Criminal Division (ወንጀል ችሎት)", "Civil Division (ፍትሐብሔር ችሎት)", "Bole High Court (ቦሌ ከፍተኛ)"
  ],
  "Federal Supreme Court (የፌዴራል ጠቅላይ ፍርድ ቤት)": [
    "Cassation Bench (ሰበር ሰሚ ችሎት)", "Regular Bench (መደበኛ ችሎት)"
  ]
};

export const CITIES = ["Addis Ababa (አዲስ አበባ)", "Adama (አዳማ)", "Dire Dawa (ድሬዳዋ)", "Bahir Dar (ባህር ዳር)", "Hawassa (ሀዋሳ)"];

export const AA_SUBCITIES = [
  "Arada (አራዳ)", "Bole (ቦሌ)", "Addis Ketema (አዲስ ከተማ)", "Nifas Silk-Lafto (ኒፋስ ስልክ)",
  "Kirkos (ቂርቆስ)", "Gullele (ጉለሌ)", "Lideta (ልደታ)", "Akaki Kality (አቃቂ ቃሊቲ)",
  "Yeka (የካ)", "Lemi Kura (ለሚ ኩራ)"
];

export const EVIDENCE_LOCATIONS = [
  "With Applicant (ከአመልካች ጋር)",
  "With Respondent (ከተከሳሽ ጋር)",
  "With the Court (ፍርድ ቤት ውስጥ)",
  "Lost (ጠፍቷል)",
  "N/A (የማይመለከተው)",
  "Other (ሌላ)",
];

export const SMART_FACTS = [
  {
    id: 'conflict',
    label: 'Conflict / Irreconcilable Differences (ግጭት)',
    legalText: 'በተጋቢዎች መካከል በተፈጠረ አለመግባባት ምክንያት ሰላም የሌለ በመሆኑ እና በትዳር መቀጠል የማይችሉበት ደረጃ ላይ በመድረሳቸው',
    citation: 'Family Code Art. 75',
    autoEvidence: ['marriage_cert']
  },
  {
    id: 'separation',
    label: 'Separation for 2 Years (ለ2 ዓመት መለያየት)',
    legalText: 'ተጋቢዎች ለሁለት ዓመት እና ከዚያ በላይ ተለያይተው የኖሩ በመሆኑ',
    citation: 'Family Code Art. 81',
    autoEvidence: ['separation_witness']
  },
  {
    id: 'desertion',
    label: 'Desertion (መጥፋት)',
    legalText: 'ተከሳሽ ትዳሩን እና ቤተሰቡን ጥሎ ከጠፋ ረጅም ጊዜ የሆነው በመሆኑ',
    citation: 'Family Code Art. (Relevant)',
    autoEvidence: ['desertion_witness']
  }
];

export const EVIDENCE_REGISTRY: { [key: string]: { id: string; label: string; type: 'Document' | 'Witness'; credentialLabel: string; credentialPlaceholder: string; } } = {
  marriage_cert: {
    id: 'marriage_cert',
    label: 'Marriage Certificate (የጋብቻ የምስክር ወረቀት)',
    type: 'Document',
    credentialLabel: 'Certificate Number (የምስክር ወረቀት ቁጥር)',
    credentialPlaceholder: 'e.g., CERT-2020-12345',
  },
  birth_cert: {
    id: 'birth_cert',
    label: 'Child Birth Certificate (የልጅ የልደት የምስክር ወረቀት)',
    type: 'Document',
    credentialLabel: 'Certificate Number (የምስክር ወረቀት ቁጥር)',
    credentialPlaceholder: 'e.g., BC-2015-67890',
  },
  separation_witness: {
    id: 'separation_witness',
    label: 'Witness for Separation (የመለያየት ምስክር)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name (የምስክር ሙሉ ስም)',
    credentialPlaceholder: 'e.g., Ato Kebede Abebe',
  },
  desertion_witness: {
    id: 'desertion_witness',
    label: 'Witness for Desertion (የመጥፋት ምስክር)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name (የምስክር ሙሉ ስም)',
    credentialPlaceholder: 'e.g., Woizero Almaz Bogale',
  },
};

const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];

export const INITIAL_STATE: AppState = {
  metadata: {
    courtLevel: defaultCourtLevel,
    bench: defaultBench,
    city: CITIES[0],
    fileNumber: '',
    date: new Date().toLocaleDateString('en-GB') + ' EC',
    jurisdictionLaw: '1234/2012',
    representation: 'self',
    summonsDelivery: 'self'
  },
  applicants: [{ id: '1', name: '', idNumber: '', phone: '', address: { city: 'Addis Ababa (አዲስ አበባ)', subcity: AA_SUBCITIES[1] } }],
  respondents: [],
  selectedFacts: [],
  maintenance: { 
    active: false, 
    income: 0, 
    children: 1,
    result: 0,
    context: '',
  },
  evidence: [],
  smartEvidence: {},
  partyTitles: {
    applicant: 'አመልካች (Applicant)',
    respondent: 'ተጠሪ (Respondent)',
  }
};
