
import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote } from 'lucide-react';

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
  "Afar Regional State (የአፋር ክልל)",
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
  "Kirkos (ቂርቆስ)", "Gullele (ጉለሌ)", "Lideta (ልደታ)", "Akaki Kality (አቃቂ ቃሊቲ)",
  "Yeka (የካ)", "Lemi Kura (ለሚ ኩራ)", "Kolfe Keranio (ኮልፌ ቀራኒዮ)", "Other (ሌላ)"
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
  "Amhara Police Commission (የአማራ ፖሊስ ኮሚሽን)",
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


export const EVIDENCE_REGISTRY: EvidenceRegistry = {
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
  employment_contract: {
    id: 'employment_contract',
    label: 'Employment Contract (የቅጥር ውል)',
    type: 'Document',
    credentialLabel: 'Contract Reference Number (የውል ቁጥር)',
    credentialPlaceholder: 'e.g., HR/CON/2022/056',
  },
  termination_letter: {
    id: 'termination_letter',
    label: 'Termination Letter (የስራ ስንብት ደብዳቤ)',
    type: 'Document',
    credentialLabel: 'Letter Reference Number (የደብዳቤ ቁጥር)',
    credentialPlaceholder: 'e.g., HR/TERM/2024/112',
  },
  unpaid_wage_witness: {
    id: 'unpaid_wage_witness',
    label: 'Witness for Unpaid Wages (ያልተከፈለ ደመወዝ ምስክር)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name (የምስክር ሙሉ ስም)',
    credentialPlaceholder: 'e.g., Ato Alemu Tadesse',
  },
};

export const TEMPLATES: Template[] = [
  { 
    id: 'family_law', 
    label: 'የቤተሰብ ሕግ (Family Law)', 
    icon: Handshake,
    subTemplates: [
      { id: 'divorce', label: 'የፍቺ ማመልከቻ (Divorce)', icon: FileText },
    ]
  },
  { 
    id: 'labour_law', 
    label: 'የሠራተኛ ሕግ (Labour Law)', 
    icon: Briefcase,
    subTemplates: [
       { id: 'labour', label: 'የሠራተኛ ክርክር (Labour)', icon: FileText },
    ]
  },
   { 
    id: 'administrative_law', 
    label: 'የአስተዳደር ሕግ (Administrative Law)', 
    icon: Landmark,
    subTemplates: [
       { id: 'admin_complaint', label: 'የአስተዳደር በደል (Complaint)', icon: FileText },
    ]
  },
   { 
    id: 'criminal_law', 
    label: 'የወንጀል ሕግ (Criminal Law)', 
    icon: Shield,
    subTemplates: [
       { id: 'bail_application', label: 'የዋስትና ማመልከቻ (Bail)', icon: FileText },
    ]
  },
  { 
    id: 'contract_law', 
    label: 'የውል ሕግ (Contract Law)', 
    icon: FileSignature,
    subTemplates: [
       { id: 'lease_agreement', label: 'የኪራይ ውል (Lease)', icon: FileText },
       { id: 'sales_agreement', label: 'የሽያጭ ውል (Sales)', icon: FileText },
    ]
  },
  { 
    id: 'succession_law', 
    label: 'የውርስ ሕግ (Succession Law)', 
    icon: BookUser,
    subTemplates: [
       { id: 'probate', label: 'የውርስ ማመልከቻ (Probate)', icon: FileText },
    ]
  },
  { 
    id: 'property_law', 
    label: 'የንብረት ሕግ (Property Law)', 
    icon: Home,
    subTemplates: [
       { id: 'property_dispute', label: 'የንብረት ክርክር (Dispute)', icon: FileText },
    ]
  },
  { 
    id: 'commercial_law', 
    label: 'የንግድና የኩባንያ ህግ (Commercial)', 
    icon: Building2,
    subTemplates: [
       { id: 'business_formation', label: 'የድርጅት ምስረታ (Formation)', icon: FileText },
    ]
  },
  { 
    id: 'tort_law', 
    label: 'ከውል ውጭ ጉዳት (Torts)', 
    icon: ShieldAlert,
    subTemplates: [
       { id: 'civil_damages', label: 'የፍትሐብሔር ካሳ (Damages)', icon: FileText },
    ]
  },
  { 
    id: 'tax_law', 
    label: 'የግብርና ቀረጥ ሕግ (Tax & Customs)', 
    icon: Receipt,
    subTemplates: [
       { id: 'tax_appeal', label: 'የታክስ ይግባኝ (Tax Appeal)', icon: FileText },
    ]
  },
  { 
    id: 'finance_law', 
    label: 'የገንዘብ ሕግ (Financial Law)', 
    icon: Banknote,
    subTemplates: [
       { id: 'negotiable_instrument', label: 'ተላላፊ ሰነዶች (Negotiable Inst.)', icon: FileText },
    ]
  },
];

export const TEMPLATE_DATA: { [key: string]: TemplateData } = {
  divorce: {
    documentTitle: 'የፍቺ ማመልከቻ',
    jurisdictionText: 'Revised Family Code Proc. No. 213/2000',
    partyTitles: {
      applicant: 'አመልካች (Applicant)',
      respondent: 'ተጠሪ (Respondent)',
    },
    facts: [
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
    ],
    reliefs: [
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
    ]
  },
  labour: {
    documentTitle: 'የሠራተኛ ክርክር ክስ',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'ከሳሽ (Plaintiff)',
      respondent: 'ተከሳሽ (Defendant)',
    },
    facts: [
      {
        id: 'unlawful_termination',
        label: 'Unlawful Termination (ህገ-ወጥ ስንብት)',
        legalText: 'ተከሳሹ የቅጥር ውሉን ያቋረጠው የሠራተኛ ሕግን ያልተከተለ እና ያለበቂ ምክንያት በመሆኑ',
        citation: 'Labour Proclamation No. 1156/2019',
        autoEvidence: ['employment_contract', 'termination_letter']
      },
      {
        id: 'unpaid_wages',
        label: 'Unpaid Wages (ያልተከፈለ ደመወዝ)',
        legalText: 'ተከሳሹ ለአመልካች የተወሰነ ወራት ደመወዝ ያልከፈለ በመሆኑ',
        citation: 'Labour Proclamation No. 1156/2019, Art. 53',
        autoEvidence: ['employment_contract', 'unpaid_wage_witness']
      },
    ],
    reliefs: [
      {
          id: 'validate_facts_labour',
          text: 'ከላይ የተዘረዘሩት የክሱ ፍሬ ነገሮች በፍ/ብ/ስ/ስ/ህ/ቁ 92 መሰረት እንዲረጋገጥልኝ፡፡',
          isDefault: true,
      },
      {
          id: 'declare_termination_unlawful',
          text: 'የተደረገው የሥራ ስንብት በህገ-ወጥ መንገድ የተፈጸመ መሆኑ እንዲረጋገጥልኝ፡፡',
          isDefault: false,
      },
      {
          id: 'reinstatement',
          text: 'ወደ ቀድሞ ስራዬ እንድመለስ ይወሰንልኝ፡፡',
          isDefault: false,
      },
      {
          id: 'severance_pay',
          text: 'የስንብት ክፍያ እንዲከፈለኝ፡፡',
          isDefault: false,
      },
      {
          id: 'unpaid_wages_relief',
          text: 'ያልተከፈለኝ ደመወዝ ከነወለዱ እንዲከፈለኝ፡፡',
          isDefault: false,
      },
      {
          id: 'costs_and_fees_labour',
          text: 'ወጪ እና ኪሳራ እንዲተካ፡፡',
          isDefault: true,
      },
    ]
  },
  admin_complaint: { 
    documentTitle: 'የአስተዳደር በደል ክስ',
    jurisdictionText: 'Administrative Procedure Proclamation No. 1183/2020',
    partyTitles: {
      applicant: 'አመልካች (Applicant)',
      respondent: 'ተጠሪ (Respondent)',
    },
    facts: [],
    reliefs: []
  },
  bail_application: {
    documentTitle: 'የዋስትና መብት ማመልከቻ',
    jurisdictionText: 'Criminal Procedure Code',
    partyTitles: {
      applicant: 'አመልካች (Applicant)',
      respondent: 'ዐቃቤ ሕግ (Prosecutor)',
    },
    facts: [],
    reliefs: []
  },
  lease_agreement: {
    documentTitle: 'የቤት ኪራይ ውል',
    jurisdictionText: 'Civil Code',
    partyTitles: { applicant: 'አከራይ (Lessor)', respondent: 'ተከራይ (Lessee)' },
    facts: [],
    reliefs: [],
  },
  sales_agreement: {
    documentTitle: 'የሽያጭ ውል',
    jurisdictionText: 'Civil Code',
    partyTitles: { applicant: 'ሻጭ (Seller)', respondent: 'ገዢ (Buyer)' },
    facts: [],
    reliefs: [],
  },
  probate: {
    documentTitle: 'የውርስ ማመልከቻ',
    jurisdictionText: 'Civil Code (Succession)',
    partyTitles: { applicant: 'ወራሽ (Heir)', respondent: 'ተጠሪ (Respondent)' },
    facts: [],
    reliefs: [],
  },
  property_dispute: {
    documentTitle: 'የንብረት ክርክር',
    jurisdictionText: 'Civil Code (Property)',
    partyTitles: { applicant: 'ከሳሽ (Plaintiff)', respondent: 'ተከሳሽ (Defendant)' },
    facts: [],
    reliefs: [],
  },
  business_formation: {
    documentTitle: 'የንግድ ድርጅት መመስረቻ ጽሑፍ',
    jurisdictionText: 'Commercial Code',
    partyTitles: { applicant: 'መሥራች (Founder)', respondent: 'ሚኒስቴር (Ministry)' },
    facts: [],
    reliefs: [],
  },
  civil_damages: {
    documentTitle: 'ከውል ውጭ ለደረሰ ጉዳት የካሳ ክስ',
    jurisdictionText: 'Civil Code (Extra-Contractual Liability)',
    partyTitles: { applicant: 'ከሳሽ (Plaintiff)', respondent: 'ተከሳሽ (Defendant)' },
    facts: [],
    reliefs: [],
  },
  tax_appeal: {
    documentTitle: 'የታክስ ይግባኝ',
    jurisdictionText: 'Tax Administration Proclamation',
    partyTitles: { applicant: 'ይግባኝ ባይ (Appellant)', respondent: 'የገቢዎች ሚኒስቴር (MoR)' },
    facts: [],
    reliefs: [],
  },
  negotiable_instrument: {
    documentTitle: 'በተላላፊ ሰነድ ላይ የተመሰረተ ክስ',
    jurisdictionText: 'Commercial Code',
    partyTitles: { applicant: 'ከሳሽ (Plaintiff)', respondent: 'ተከሳሽ (Defendant)' },
    facts: [],
    reliefs: [],
  },
};

const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];
const initialTemplateId: string = TEMPLATES[0].id;
const initialSubTemplateId: string = TEMPLATES[0].subTemplates[0].id;
const initialTemplateData = TEMPLATE_DATA[initialSubTemplateId];


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
  applicants: [{ id: '1', name: '', idNumber: '', phone: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1], subcityOther: '' } }],
  respondents: [],
  selectedFacts: [],
  selectedReliefs: initialTemplateData.reliefs.filter(r => r.isDefault),
  maintenance: { 
    active: false, 
    income: 0, 
    children: 1,
    result: 0,
    context: '',
  },
  evidence: [],
  smartEvidence: {},
  partyTitles: initialTemplateData.partyTitles,
  selectedTemplate: initialTemplateId,
  selectedSubTemplate: initialSubTemplateId,
};





    