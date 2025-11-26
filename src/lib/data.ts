
import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote, HeartPulse, Scale } from 'lucide-react';

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
  "South West Ethiopia Peoples' Regional State (የደቡብ ምዕራብ ኢትዮጵيا ህዝቦች ክልል)",
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
  "Ministry of Finance (የገንዘብ ሚనిስቴር)",
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
  warning_letter: {
    id: 'warning_letter',
    label: 'Warning Letter(s) (የማስጠንቀቂያ ደብዳቤ(ዎች))',
    type: 'Document',
    credentialLabel: 'Letter Reference Number(s)',
    credentialPlaceholder: 'e.g., HR/WARN/2023/089',
  },
  performance_review: {
    id: 'performance_review',
    label: 'Performance Review(s) (የአፈጻጸም ግምገማ(ዎች))',
    type: 'Document',
    credentialLabel: 'Review Period/Date',
    credentialPlaceholder: 'e.g., Q4 2023 Review',
  },
};

export const TEMPLATES: Template[] = [
  { 
    id: 'family_law', 
    label: 'የቤተሰብ ሕግ (Family Law)', 
    icon: Handshake,
    subTemplates: [
      { id: 'divorce', label: 'የፍቺ ማመልከቻ (Divorce)', icon: Scale },
    ]
  },
  { 
    id: 'labour_law', 
    label: 'የሠራተኛ ሕግ (Labour Law)', 
    icon: Briefcase,
    subTemplates: [
       { id: 'labour_unlawful_termination', label: 'Unlawful Termination Claim', icon: FileText },
       { id: 'labour_unpaid_wages', label: 'Unpaid Wages Claim', icon: Receipt },
       { id: 'labour_employment_injury', label: 'Employment Injury Claim', icon: HeartPulse },
    ]
  },
   { 
    id: 'administrative_law', 
    label: 'የአስተዳደር ሕግ (Admin Law)', 
    icon: Landmark,
    subTemplates: [
       { id: 'admin_complaint', label: 'Administrative Complaint', icon: FileText },
    ]
  },
   { 
    id: 'criminal_law', 
    label: 'የወንጀል ሕግ (Criminal Law)', 
    icon: Shield,
    subTemplates: [
       { id: 'bail_application', label: 'Bail Application', icon: FileText },
    ]
  },
  { 
    id: 'contract_law', 
    label: 'የውል ሕግ (Contract Law)', 
    icon: FileSignature,
    subTemplates: [
       { id: 'lease_agreement', label: 'Lease Agreement', icon: FileText },
       { id: 'sales_agreement', label: 'Sales Agreement', icon: FileText },
    ]
  },
  { 
    id: 'succession_law', 
    label: 'የውርስ ሕግ (Succession Law)', 
    icon: BookUser,
    subTemplates: [
       { id: 'probate', label: 'Probate Application', icon: FileText },
    ]
  },
  { 
    id: 'property_law', 
    label: 'የንብረት ሕግ (Property Law)', 
    icon: Home,
    subTemplates: [
       { id: 'property_dispute', label: 'Property Dispute', icon: FileText },
    ]
  },
  { 
    id: 'commercial_law', 
    label: 'የንግድ ሕግ (Commercial)', 
    icon: Building2,
    subTemplates: [
       { id: 'business_formation', label: 'Business Formation', icon: FileText },
    ]
  },
  { 
    id: 'tort_law', 
    label: 'ከውል ውጭ ጉዳት (Torts)', 
    icon: ShieldAlert,
    subTemplates: [
       { id: 'civil_damages', label: 'Civil Damages Claim', icon: FileText },
    ]
  },
  { 
    id: 'tax_law', 
    label: 'የግብርና ቀረጥ ሕግ (Tax Law)', 
    icon: Receipt,
    subTemplates: [
       { id: 'tax_appeal', label: 'Tax Appeal', icon: FileText },
    ]
  },
  { 
    id: 'financial_law', 
    label: 'የገንዘብ ሕግ (Financial Law)', 
    icon: Banknote,
    subTemplates: [
       { id: 'negotiable_instrument', label: 'Negotiable Instrument Claim', icon: FileText },
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
        label: 'General Grounds for Divorce (አጠቃላይ የፍቺ ምክንያቶች)',
        legalText: 'Irreconcilable Differences: በተጋቢዎች መካከል በተፈጠረ አለመግባባት ምክንያት ሰላም የሌለ በመሆኑ እና በትዳር መቀጠል የማይችሉበት ደረጃ ላይ በመድረሳቸው',
        citation: 'Family Code Art. 75',
        autoEvidence: ['marriage_cert']
      },
      {
        id: 'separation',
        label: 'General Grounds for Divorce (አጠቃላይ የፍቺ ምክንያቶች)',
        legalText: 'Separation for 2 Years: ተጋቢዎች ለሁለት ዓመት እና ከዚያ በላይ ተለያይተው የኖሩ በመሆኑ',
        citation: 'Family Code Art. 81',
        autoEvidence: ['separation_witness']
      },
      {
        id: 'desertion',
        label: 'General Grounds for Divorce (አጠቃላይ የፍቺ ምክንያቶች)',
        legalText: 'Desertion: ተከሳሽ ትዳሩን እና ቤተሰቡን ጥሎ ከጠፋ ረጅም ጊዜ የሆነው በመሆኑ',
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
  labour_unlawful_termination: {
    documentTitle: 'Statement of Claim for Unlawful Termination',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee (ሰራተኛ)',
      respondent: 'Employer (ቀጣሪ)',
    },
    facts: [
      {
        id: 'indefinite_contract',
        label: 'The Contractual Relationship',
        legalText: 'Existence of indefinite period employment contract.',
        citation: 'Art. 4 & 9',
        autoEvidence: ['employment_contract']
      },
      {
        id: 'definite_contract',
        label: 'The Contractual Relationship',
        legalText: 'Existence of definite period (probationary) contract, and probation period had ended.',
        citation: 'Art. 11',
        autoEvidence: ['employment_contract']
      },
      {
        id: 'no_prior_notice',
        label: 'Procedural Violations',
        legalText: 'Termination was effected without any prior notice.',
        citation: 'Violation of Art. 35',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'insufficient_notice',
        label: 'Procedural Violations',
        legalText: 'Termination notice period was insufficient (less than legal minimum based on service years).',
        citation: 'Violation of Art. 35',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'union_termination',
        label: 'Substantive Violations (Unlawful Grounds)',
        legalText: 'Termination was due to Employee joining a Trade Union.',
        citation: 'Art. 26',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'pregnancy_termination',
        label: 'Substantive Violations (Unlawful Grounds)',
        legalText: 'Termination was due to pregnancy or maternity leave status.',
        citation: 'Art. 26',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'discrimination_termination',
        label: 'Substantive Violations (Unlawful Grounds)',
        legalText: 'Termination was due to race, color, sex, religion, or political opinion.',
        citation: 'Art. 26',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'no_valid_reason',
        label: 'The "No Reason" Defense',
        legalText: 'The Employer provided no valid reason for termination as required by Art. 27.',
        citation: 'Art. 27',
        autoEvidence: ['termination_letter']
      },
      {
        id: 'constructive_dismissal',
        label: 'Constructive Dismissal',
        legalText: 'Employee was forced to resign due to Employer\'s unlawful actions (e.g., sexual harassment, danger to safety).',
        citation: 'Treated as termination by Art. 32',
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: 'declare_termination_unlawful',
        text: 'Judgment declaring the termination unlawful pursuant to Art. 43.',
        isDefault: true,
      },
      {
        id: 'reinstatement',
        text: 'Order for reinstatement to previous position with full back pay (Art. 48).',
        isDefault: false,
      },
      {
        id: 'compensation_in_lieu',
        text: 'Payment of compensation (180 days wages) in lieu of reinstatement (Art. 43(4)).',
        isDefault: false,
      },
      {
        id: 'severance_pay',
        text: 'Payment of Severance Pay (Art. 39 & 40) - only if not reinstated.',
        isDefault: false,
      },
      {
        id: 'notice_compensation',
        text: 'Payment of Compensation for lack of Notice (Art. 44).',
        isDefault: false,
      },
      {
        id: 'costs_and_fees_labour',
        text: 'ወጪ እና ኪሳራ እንዲተካ፡፡',
        isDefault: true,
      },
    ]
  },
  labour_unpaid_wages: {
    documentTitle: 'Statement of Claim for Outstanding Payments',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee (ሰራተኛ)',
      respondent: 'Employer (ቀጣሪ)',
    },
    facts: [
      {
        id: 'unpaid_salary',
        label: 'Salary Arrears',
        legalText: 'Non-payment of regular monthly salary for specific months.',
        citation: 'Art. 53',
        autoEvidence: ['unpaid_wage_witness']
      },
      {
        id: 'unlawful_deduction',
        label: 'Salary Arrears',
        legalText: 'Unlawful deduction from salary (without employee consent or court order).',
        citation: 'Art. 59',
        autoEvidence: ['unpaid_wage_witness']
      },
      {
        id: 'unpaid_overtime',
        label: 'Statutory Benefits',
        legalText: 'Employee worked beyond 8 hours/day or 48 hours/week without overtime compensation.',
        citation: 'Art. 66 & 68',
        autoEvidence: ['unpaid_wage_witness']
      },
      {
        id: 'unpaid_annual_leave',
        label: 'Statutory Benefits',
        legalText: 'Employee was denied annual leave and not compensated for it upon termination.',
        citation: 'Art. 77 & 79',
        autoEvidence: ['unpaid_wage_witness']
      },
      {
        id: 'unpaid_holiday_work',
        label: 'Statutory Benefits',
        legalText: 'Employee worked on public holidays without legally mandated compensation.',
        citation: 'Relevant Articles',
        autoEvidence: ['unpaid_wage_witness']
      }
    ],
    reliefs: [
      {
        id: 'payment_principal',
        text: 'Order Respondent to pay the total principal amount calculated.',
        isDefault: true,
      },
      {
        id: 'payment_interest',
        text: 'Order payment of statutory interest on the delayed payments.',
        isDefault: false,
      },
      {
        id: 'payment_overtime',
        text: 'Order payment of specific calculated overtime amount.',
        isDefault: false,
      },
      {
        id: 'costs_and_fees_labour_wages',
        text: 'ወጪ እና ኪሳራ እንዲተካ፡፡',
        isDefault: true,
      },
    ]
  },
  labour_employment_injury: {
    documentTitle: 'Claim for Employment Injury Compensation',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee (ሰራተኛ)',
      respondent: 'Employer (ቀጣሪ)',
    },
    facts: [
      {
        id: 'injury_at_work',
        label: 'The Incident',
        legalText: 'Injury occurred during working hours at the workplace.',
        citation: 'Art. 95',
        autoEvidence: []
      },
      {
        id: 'injury_outside_work',
        label: 'The Incident',
        legalText: 'Injury occurred while carrying out employer\'s orders outside the workplace.',
        citation: 'Art. 95',
        autoEvidence: []
      },
      {
        id: 'occupational_disease',
        label: 'The Incident',
        legalText: 'Occupational Disease was contracted due to the nature of the work.',
        citation: 'Art. 98',
        autoEvidence: []
      },
      {
        id: 'partial_disability',
        label: 'The Damage',
        legalText: 'Permanent Partial Disability was sustained as a result of the incident.',
        citation: 'Art. 109',
        autoEvidence: []
      },
      {
        id: 'temporary_disability',
        label: 'The Damage',
        legalText: 'Temporary Total Disability (unable to work for a specific period) was sustained.',
        citation: 'Art. 106',
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: 'medical_expenses',
        text: 'Order payment of Medical Expenses incurred (Art. 105).',
        isDefault: true,
      },
      {
        id: 'disability_compensation',
        text: 'Order payment of Disability Compensation (Calculated based on Art. 109 & 110).',
        isDefault: false,
      },
      {
        id: 'costs_and_fees_injury',
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

