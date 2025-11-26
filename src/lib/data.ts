
import type { AppState, Template, Relief } from "./types";
import { FileText, Briefcase } from 'lucide-react';

export const COURT_HIERARCHY = {
  "Federal First Instance Court (የፌዴራል የመጀመሪያ ደረጃ ፍርድ ቤት)": [
    "Lideta Division, 1st Bench (ልደታ ምድብ 1ኛ ችሎት)", 
    "Lideta Division, 2nd Bench (ልደታ ምድብ 2ኛ ችሎት)",
    "Bole Division (ቦሌ ምድብ)",
    "Kirkos Division (ቂርቆስ ምድብ)",
    "Arada Division (አራዳ ምድብ)",
    "Yeka Division (የካ ምድብ)", 
    "Akaki Kality Division (አቃቂ ቃሊቲ ምድብ)",
    "Lideta Division, 1st Labour Relations Bench (ልደታ ምድб 1ኛ የሠራተኛ ግንኙነት ችሎት)",
    "Lideta Division, Tax Bench (ልደታ ምድብ የታክስ ችሎት)",
  ],
  "Federal High Court (የፌዴራል ከፍተኛ ፍርድ ቤት)": [
    "Lideta Division, 1st Civil Bench (ልደታ ምድብ 1ኛ ፍትሐብሔር ችሎት)",
    "Lideta Division, 2nd Civil Bench (ልደታ ምድብ 2ኛ ፍትሐብሔር ችሎት)",
    "Lideta Division, 1st Criminal Bench (ልደта ምድб 1ኛ ወንጀል ችሎት)",
    "Bole Division (ቦሌ ምድብ)",
    "Lideta Division, Commercial Bench (ልደታ ምድብ የንግድ ችሎት)",
    "Lideta Division, Labour Division (ልደታ ምድб የሠራተኛ ችሎት)",
  ],
  "Federal Supreme Court (የፌዴራል ጠቅላይ ፍርድ ቤት)": [
    "1st Cassation Bench (1ኛ ሰበር ሰሚ ችሎት)", 
    "2nd Cassation Bench (2ኛ ሰበር ሰሚ ችሎት)",
    "3rd Cassation Bench (3ኛ ሰበር ሰሚ ችሎት)",
    "1st Appellate Bench (1ኛ ይግባኝ ሰሚ ችሎት)"
  ]
};

export const REGIONS_AND_CITIES = [
  "Addis Ababa City Administration (የአዲስ አበባ ከተማ አስተዳደር)",
  "Afar Regional State (የአፋር ክልል)",
  "Amhara Regional State (የአማራ ክልል)",
  "Benishangul-Gumuz Regional State (የቤኒሻንጉል ጉሙዝ ክልል)",
  "Central Ethiopia Regional State (የማዕከላዊ ኢትዮጵያ ክልል)",
  "Dire Dawa City Administration (የድሬዳዋ ከተማ አስተዳደር)",
  "Gambela Regional State (የጋምቤላ ክልል)",
  "Harari Regional State (የሐረሪ ክልል)",
  "Oromia Regional State (የኦሮሚያ ክልል)",
  "Sidama Regional State (የሲዳማ ክልል)",
  "Somali Regional State (የሶማሌ ክልል)",
  "South Ethiopia Regional State (የደቡብ ኢትዮጵያ ክልል)",
  "South West Ethiopia Peoples' Regional State (የደቡብ ምዕራብ ኢትዮጵያ ህዝቦች ክልል)",
  "Tigray Regional State (የትግራይ ክልል)",
];

export const AA_SUBCITIES = [
  "Arada (አራዳ)", "Bole (ቦሌ)", "Addis Ketema (አዲስ ከተማ)", "Nifas Silk-Lafto (ኒፋስ ስልክ)",
  "Kirkos (ቂርቆስ)", "Gullele (ጉለሌ)", "Lideta (ልደታ)", "Akaki Kality (አቃቂ ቃליቲ)",
  "Yeka (የካ)", "Lemi Kura (ለሚ ኩራ)", "Kolfe Keranio (ኮልፌ ቀራኒዮ)"
];

export const HONORIFICS = ["አቶ (Mr.)", "ወ/ሮ (Mrs.)", "ወ/ሪት (Miss)"];

export const EVIDENCE_LOCATIONS = [
  "With Applicant (ከአመልካች ጋር)",
  "With Respondent (ከተከሳሽ ጋር)",
  "With the Court (ፍርድ ቤት ውስጥ)",
  "Lost (ጠፍቷል)",
  "N/A (የማይመለከተው)",
  "Other (ሌላ)",
];

export const DOCUMENT_ISSUERS = [
  // --- Law Enforcement & Justice ---
  "Federal Police Commission (የፌደራል ፖሊስ ኮሚሽን)",
  "Addis Ababa Police Commission (የአዲስ አበባ ፖሊስ ኮሚሽን)",
  "Oromia Police Commission (የኦሮሚያ ፖሊስ ኮሚሽን)",
  "Amhara Police Commission (የአማራ ፖליስ ኮሚሽን)",
  "Ministry of Justice (የፍትህ ሚኒስቴር)",
  "Federal Attorney General (የፌዴራል ጠቅላይ ዐቃቤ ሕግ)",
  
  // --- Vital Events, Civil Status & Documents ---
  "Vital Events Registration Agency (የወሳኝ ኩነት ምዝገባ ኤጀንሲ)",
  "Documents Authentication and Registration Service (DARA) (የሰነዶች ማረጋገጫ እና ምዝገባ አገልግሎት)",
  "Immigration and Citizenship Service (የኢሚግሬሽን እና የዜግነት አገልግሎት)",
  
  // --- Economy, Trade & Finance ---
  "Ministry of Trade and Regional Integration (የንግድ እና ቀጣናዊ ትስስር ሚኒስቴር)",
  "Ministry of Revenues (የገቢዎች ሚኒስቴር)",
  "Ministry of Finance (የገንዘብ ሚኒስቴር)",
  "Ethiopian Investment Commission (የኢትዮጵያ ኢንቨስትመንት ኮሚሽን)",
  "National Bank of Ethiopia (የኢትዮጵያ ብሔራዊ ባንክ)",
  "Commercial Bank of Ethiopia (የኢትዮጵያ ንግድ ባንክ)",

  // --- Land, Property & Infrastructure ---
  "Addis Ababa City Land Development and Management Bureau (የአ/አ ከተማ የመሬት ልማት እና ማኔጅመንት ቢሮ)",
  "Ministry of Urban and Infrastructure (የከተማ እና መሠረተ ልማት ሚኒስቴር)",
  "Ethiopian Roads Administration (የኢትዮጵያ መንገዶች አስተዳደር)",
  "Ministry of Transport and Logistics (የትራንስፖርት እና ሎጂስቲክס ሚኒስቴር)",
  "Ethiopian Electric Power (የኢትዮጵያ ኤሌክትሪክ ኃይል)",

  // --- Social & Health ---
  "Ministry of Health (የጤና ጥበቃ ሚኒስቴር)",
  "A hospital or clinic (ሆስፒታል ወይም ክሊኒክ)",
  "Ministry of Education (የትምህርት ሚኒስቴር)",
  "A university or educational institution (ዩኒቨርሲቲ ወይም የትምህርት ተቋም)",
  "Ministry of Labor and Skills (የሥራ እና ክህሎት ሚኒስቴር)",
  
  // --- Other ---
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

export const RELIEF_ITEMS: Relief[] = [
    {
        id: 'validate_facts',
        text: 'ከላይ የተዘረዘሩት የክሱ ፍሬ ነገሮች በፍ/ብ/ስ/ስ/ህ/ቁ 92 መሰረት እንዲረጋገጥልኝ፡፡',
        isDefault: true,
    },
    {
        id: 'grant_divorce',
        text: 'በተከሳሽና በአመልካች መካከል በህግ አግባብ የተመሰረተው የጋብቻ ውል በፍቺ እንዲፈርስልኝ፡፡',
        isDefault: true,
    },
    {
        id: 'maintenance',
        text: 'ተከሳሽ በወር {{{income}}} ብር ገቢ ስላላቸው፣ ለ {{{children}}} ልጅ/ልጆች አስተዳደግ እና ቀለብ ለእያንዳንዱ ልጅ በወር {{{result}}} ብር እንዲከፍሉ ይወሰንልኝ፡፡',
        isDefault: false,
        isDynamic: true,
    },
    {
        id: 'appropriate_judgment',
        text: 'ተገቢው የፍርድ ውሳኔ እንዲሰጠኝ፡፡',
        isDefault: true,
    },
    {
        id: 'costs_and_fees',
        text: 'ወጪ እና ኪሳራ እንዲተካ፡፡',
        isDefault: true,
    },
];

export const EVIDENCE_REGISTRY: { [key: string]: { id: string; label: string; type: 'Document' | 'Witness'; credentialLabel: string; credentialPlaceholder: string; } } = {
  marriage_cert: {
    id: 'marriage_cert',
    label: 'Marriage Certificate (የጋብቻ የምስክር ወረቀት)',
    type: 'Document',
    credentialLabel: 'Certificate Number (የምስክር ወareቀት ቁጥር)',
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

export const TEMPLATES: Template[] = [
  { id: 'divorce', label: 'የፍቺ ማመልከቻ (Divorce)', icon: FileText },
  { id: 'labour', label: 'የሠራተኛ ክርክር (Labour)', icon: Briefcase },
];

const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];

export const INITIAL_STATE: AppState = {
  metadata: {
    courtLevel: defaultCourtLevel,
    bench: defaultBench,
    city: REGIONS_AND_CITIES[0],
    fileNumber: '',
    date: new Date().toLocaleDateString('en-GB') + ' EC',
    jurisdictionLaw: '1234/2012',
    representation: 'self',
    summonsDelivery: 'self'
  },
  applicants: [{ id: '1', name: '', idNumber: '', phone: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1] } }],
  respondents: [],
  selectedFacts: [],
  selectedReliefs: RELIEF_ITEMS.filter(r => r.isDefault),
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
  },
  selectedTemplate: 'divorce',
};
