
import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote, HeartPulse, Scale, FileX2, Gavel, Users, Map, Brain, UserCheck, LandmarkIcon, Siren, ShieldCheck } from 'lucide-react';

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
    "Lideta Division, 1st Criminal Bench (ልደታ ምድб 1ኛ ወንጀል ችሎት)",
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
  "South Ethiopia Regional State (የደቡብ ኢትዮጵያ ክልל)",
  "South West Ethiopia Peoples' Regional State (የደቡብ ምዕራብ ኢትዮጵIA ህዝቦች ክልል)",
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
  "Vital Events Registration Agency (VERA) (የወሳኝ ኩነት ምዝገባ ኤጀንሲ)",
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
  
  // --- IP ---
  "Ethiopian Intellectual Property Office (EIPO) (የኢትዮጵያ አእምሯዊ ንብረት ጽ/ቤት)",
  
  // --- Other ---
  "Other (ሌላ)",
];


export const EVIDENCE_REGISTRY: EvidenceRegistry = {
  written_contract: {
    id: 'written_contract',
    label: 'Written Contract',
    type: 'Document',
    credentialLabel: 'Contract Reference Number',
    credentialPlaceholder: 'e.g., CON-2023-001',
  },
  notice_of_default: {
    id: 'notice_of_default',
    label: 'Notice of Default (Warning Letter)',
    type: 'Document',
    credentialLabel: 'Letter Reference Number',
    credentialPlaceholder: 'e.g., NTC-2024-002',
  },
  payment_receipt: {
    id: 'payment_receipt',
    label: 'Payment Receipt / Bank Advice',
    type: 'Document',
    credentialLabel: 'Receipt or Transaction Number',
    credentialPlaceholder: 'e.g., TRN-123456789',
  },
  delivery_note: {
    id: 'delivery_note',
    label: 'Delivery Note (Model 19/22)',
    type: 'Document',
    credentialLabel: 'Delivery Note Number',
    credentialPlaceholder: 'e.g., DN-2024-987',
  },
  admission_of_debt: {
    id: 'admission_of_debt',
    label: 'Admission of Debt',
    type: 'Document',
    credentialLabel: 'Document Reference',
    credentialPlaceholder: 'e.g., ADM-2024-001',
  },
  audit_report: {
    id: 'audit_report',
    label: 'Audit Report',
    type: 'Document',
    credentialLabel: 'Report Reference Number',
    credentialPlaceholder: 'e.g., AUD-FIN-2024-001',
  },
  TitleDeed: {
    id: 'TitleDeed',
    label: 'Title Deed (Librec/Carta)',
    type: 'Document',
    credentialLabel: 'Title Deed Number',
    credentialPlaceholder: 'e.g., TD-AA-12345',
  },
  SitePlan: {
    id: 'SitePlan',
    label: 'Site Plan',
    type: 'Document',
    credentialLabel: 'Plan Number',
    credentialPlaceholder: 'e.g., SP-123-2024',
  },
  TaxLandRentReceipts: {
    id: 'TaxLandRentReceipts',
    label: 'Tax/Land Rent Receipts',
    type: 'Document',
    credentialLabel: 'Latest Receipt Number',
    credentialPlaceholder: 'e.g., TAX-2024-9876',
  },
  KebeleConfirmation: {
    id: 'KebeleConfirmation',
    label: 'Kebele Confirmation',
    type: 'Document',
    credentialLabel: 'Letter Reference',
    credentialPlaceholder: 'e.g., KC/YKA/2024/45',
  },
  SurveyorsReport: {
    id: 'SurveyorsReport',
    label: 'Surveyor\'s Report',
    type: 'Document',
    credentialLabel: 'Report ID',
    credentialPlaceholder: 'e.g., SR-ENG-2024-01',
  },
  WitnessAffidavitsNuisance: {
    id: 'WitnessAffidavitsNuisance',
    label: 'Witness Affidavits (Nuisance)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name',
    credentialPlaceholder: 'e.g., Ato Kebede Abebe',
  },
  PhotosVideoEvidence: {
    id: 'PhotosVideoEvidence',
    label: 'Photos/Video Evidence',
    type: 'Document',
    credentialLabel: 'Description of evidence',
    credentialPlaceholder: 'e.g., Video of factory smoke',
  },
  CertificateOfRegistrationEIPO: {
    id: 'CertificateOfRegistrationEIPO',
    label: 'Certificate of Registration (EIPO)',
    type: 'Document',
    credentialLabel: 'Registration Number',
    credentialPlaceholder: 'e.g., TM/PAT/12345/2024'
  },
  ProductSampleSpecimen: {
    id: 'ProductSampleSpecimen',
    label: 'Product Sample / Specimen',
    type: 'Document',
    credentialLabel: 'Description of the sample',
    credentialPlaceholder: 'e.g., Photo of the infringing product'
  },
  CeaseAndDesistLetter: {
    id: 'CeaseAndDesistLetter',
    label: 'Cease and Desist Letter',
    type: 'Document',
    credentialLabel: 'Date Sent',
    credentialPlaceholder: 'e.g., 20/05/2024'
  },
  MarketSurveyAffidavit: {
    id: 'MarketSurveyAffidavit',
    label: 'Market Survey / Affidavit',
    type: 'Document',
    credentialLabel: 'Date of Survey/Affidavit',
    credentialPlaceholder: 'e.g., June 2024'
  },
  CustomsInspectionReport: {
    id: 'CustomsInspectionReport',
    label: 'Customs Inspection Report',
    type: 'Document',
    credentialLabel: 'Report Number',
    credentialPlaceholder: 'e.g., CUS/INSP/2024/567'
  },
  TechnicalExpertReport: {
    id: 'TechnicalExpertReport',
    label: 'Technical Expert Report',
    type: 'Document',
    credentialLabel: 'Report Reference',
    credentialPlaceholder: 'e.g., EXP/TECH/2024/002'
  },
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
    credentialLabel: 'Contract Reference Number (የውל ቁጥር)',
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
  dismissal_letter: {
    id: 'dismissal_letter',
    label: 'Dismissal/Penalty Letter (የፍቺ/ቅጣት ደብዳቤ)',
    type: 'Document',
    credentialLabel: 'Letter Reference Number',
    credentialPlaceholder: 'e.g., CS/DIS/2024/034',
  },
  grievance_submission: {
    id: 'grievance_submission',
    label: 'Grievance Submission Proof (የቅሬታ ማቅረቢያ ማረጋገጫ)',
    type: 'Document',
    credentialLabel: 'Submission Date or Ref No.',
    credentialPlaceholder: 'e.g., 15/05/2024',
  },
  police_report_domestic_violence: {
    id: 'police_report_domestic_violence',
    label: 'Police Report (Domestic Violence)',
    type: 'Document',
    credentialLabel: 'Report Number',
    credentialPlaceholder: 'e.g., AA/Pol/2024/789',
  },
  witness_statements: {
    id: 'witness_statements',
    label: 'Witness Statement(s)',
    type: 'Witness',
    credentialLabel: 'Witness Name(s)',
    credentialPlaceholder: 'e.g., Ato Kebede Abebe',
  },
  list_of_common_property: {
    id: 'list_of_common_property',
    label: 'List of Common Property',
    type: 'Document',
    credentialLabel: 'Inventory Date or Reference',
    credentialPlaceholder: 'e.g., Inventory as of 20/06/2024',
  },
  proof_of_income: {
    id: 'proof_of_income',
    label: 'Proof of Income',
    type: 'Document',
    credentialLabel: 'Document Type (e.g., Payslip, Bank Statement)',
    credentialPlaceholder: 'e.g., June 2024 Payslip',
  },
  copy_of_divorce_judgment: {
    id: 'copy_of_divorce_judgment',
    label: 'Copy of Divorce Judgment',
    type: 'Document',
    credentialLabel: 'Case/File Number',
    credentialPlaceholder: 'e.g., FHC/CV/1234/2023',
  },
  proof_of_inheritance_donation: {
    id: 'proof_of_inheritance_donation',
    label: 'Proof of Inheritance/Donation',
    type: 'Document',
    credentialLabel: 'Document Reference',
    credentialPlaceholder: 'e.g., Will of Ato Abebe Kebede',
  },
  pre_marital_ownership_documents: {
    id: 'pre_marital_ownership_documents',
    label: 'Pre-marital Ownership Documents',
    type: 'Document',
    credentialLabel: 'Document Reference (e.g., Title Deed No.)',
    credentialPlaceholder: 'e.g., Title Deed 5678/99',
  },
  title_deeds_librec: {
    id: 'title_deeds_librec',
    label: 'Title Deeds / Librec',
    type: 'Document',
    credentialLabel: 'Title Deed/Librec Number',
    credentialPlaceholder: 'e.g., LDR/TD/9876',
  },
  DeathCertificate: {
    id: 'DeathCertificate',
    label: 'Death Certificate',
    type: 'Document',
    credentialLabel: 'Certificate Number',
    credentialPlaceholder: 'e.g., DC-2024-54321',
  },
  WillTestament: {
    id: 'WillTestament',
    label: 'Will (Testament)',
    type: 'Document',
    credentialLabel: 'Will Registration Number (if any)',
    credentialPlaceholder: 'e.g., DARA/WILL/2023/987',
  },
  KebeleFamilyID: {
    id: 'KebeleFamilyID',
    label: 'Kebele ID / Family Certificate',
    type: 'Document',
    credentialLabel: 'ID or Certificate Number',
    credentialPlaceholder: 'e.g., AA/YKA/98765',
  },
  InventoryofEstate: {
    id: 'InventoryofEstate',
    label: 'Inventory of Estate',
    type: 'Document',
    credentialLabel: 'Inventory Date or Reference',
    credentialPlaceholder: 'e.g., Estate Inventory 20/07/2024',
  },
  WitnessAffidavitsSuccession: {
    id: 'WitnessAffidavitsSuccession',
    label: 'Witness Affidavits (Succession)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name(s)',
    credentialPlaceholder: 'e.g., Ato Tadesse, Woizero Birknesh',
  },
  CertificateofHeirship: {
    id: 'CertificateofHeirship',
    label: 'Certificate of Heirship',
    type: 'Document',
    credentialLabel: 'Certificate Number',
    credentialPlaceholder: 'e.g., COH-2024-112233',
  },
  MedicalBoardCertificate: {
    id: 'MedicalBoardCertificate',
    label: 'Medical Board Certificate',
    type: 'Document',
    credentialLabel: 'Certificate Reference No.',
    credentialPlaceholder: 'e.g., MED/CERT/2024/005',
  },
  IdentityCard: {
    id: 'IdentityCard',
    label: 'Identity Card (Kebele/National ID)',
    type: 'Document',
    credentialLabel: 'ID Number',
    credentialPlaceholder: 'e.g., 1000123456789',
  },
  BirthMarriageCertificateVERA: {
    id: 'BirthMarriageCertificateVERA',
    label: 'Birth/Marriage Certificate (VERA)',
    type: 'Document',
    credentialLabel: 'Certificate Number',
    credentialPlaceholder: 'e.g., VERA/BC/2024/999',
  },
  PublicNoticeOfAbsence: {
    id: 'PublicNoticeOfAbsence',
    label: 'Public Notice of Absence',
    type: 'Document',
    credentialLabel: 'Newspaper Name & Date',
    credentialPlaceholder: 'e.g., Addis Zemen, 20/05/2024',
  },
  GenealogicalAffidavit: {
    id: 'GenealogicalAffidavit',
    label: 'Genealogical Affidavit',
    type: 'Document',
    credentialLabel: 'Reference Number',
    credentialPlaceholder: 'e.g., AFF/GEN/2024/001',
  },
  TaxAssessmentNotice: {
    id: 'TaxAssessmentNotice',
    label: 'Tax Assessment Notice',
    type: 'Document',
    credentialLabel: 'Notice Reference Number',
    credentialPlaceholder: 'e.g., MOR/ASSMT/2024/123'
  },
  NoticeOfObjectionInitial: {
    id: 'NoticeOfObjectionInitial',
    label: 'Notice of Objection (Initial)',
    type: 'Document',
    credentialLabel: 'Date of Submission',
    credentialPlaceholder: 'e.g., 25/06/2024'
  },
  AccountingRecords: {
    id: 'AccountingRecords',
    label: 'Accounting Records (Ledgers, Invoices)',
    type: 'Document',
    credentialLabel: 'Description of Records',
    credentialPlaceholder: 'e.g., FY 2023 Sales Ledger'
  },
  ImportExportDeclarationSAD: {
    id: 'ImportExportDeclarationSAD',
    label: 'Import/Export Declaration (SAD)',
    type: 'Document',
    credentialLabel: 'SAD Number',
    credentialPlaceholder: 'e.g., SAD-IMPORT-2024-9876'
  },
  PaymentReceiptsTaxCustoms: {
    id: 'PaymentReceiptsTaxCustoms',
    label: 'Payment Receipts (Tax/Customs)',
    type: 'Document',
    credentialLabel: 'Receipt Number',
    credentialPlaceholder: 'e.g., TAX-DEP-2024-5432'
  },
  ExternalAuditReport: {
    id: 'ExternalAuditReport',
    label: 'External Audit Report',
    type: 'Document',
    credentialLabel: 'Report Reference',
    credentialPlaceholder: 'e.g., EXT-AUD/2024/CLIENT-A'
  },
  PoliceAccidentReport: {
    id: 'PoliceAccidentReport',
    label: 'Police/Traffic Accident Report',
    type: 'Document',
    credentialLabel: 'Report Number',
    credentialPlaceholder: 'e.g., TFC-2024-12345'
  },
  MedicalExpenseReceipts: {
    id: 'MedicalExpenseReceipts',
    label: 'Medical Expense Receipts and Invoices',
    type: 'Document',
    credentialLabel: 'Total Amount or Invoice Number',
    credentialPlaceholder: 'e.g., INV-HOSP-5678'
  },
  DoctorAssessment: {
    id: 'DoctorAssessment',
    label: 'Medical Doctor\'s Assessment and Certificate',
    type: 'Document',
    credentialLabel: 'Certificate Reference',
    credentialPlaceholder: 'e.g., MED-ASSESS-2024-987'
  },
  LostEarningProof: {
    id: 'LostEarningProof',
    label: 'Proof of Lost Earnings (Salary Slips/Tax Docs)',
    type: 'Document',
    credentialLabel: 'Document Description',
    credentialPlaceholder: 'e.g., May 2024 Salary Slip'
  },
  FinalAdminDecision: {
    id: 'FinalAdminDecision',
    label: 'Final Administrative Decision (የመጨረሻ የአስተዳደር ውሳኔ)',
    type: 'Document',
    credentialLabel: 'Decision Reference Number',
    credentialPlaceholder: 'e.g., DEC-MIN-2024-00123'
  },
  DecisionNotificationProof: {
    id: 'DecisionNotificationProof',
    label: 'Proof of Decision Notification Date (ውሳኔው የደረሰበት ማስረጃ)',
    type: 'Document',
    credentialLabel: 'Describe how it was received (e.g., Date Stamp)',
    credentialPlaceholder: 'e.g., Stamp dated 25/06/2024'
  },
  InternalRemedyExhaustion: {
    id: 'InternalRemedyExhaustion',
    label: 'Proof of Exhaustion of Internal Remedies (የውስጥ ቅሬታ መሟጠጥ ማስረጃ)',
    type: 'Document',
    credentialLabel: 'Internal Complaint Reference No.',
    credentialPlaceholder: 'e.g., COMP-2024-05-001'
  },
  AgencyDirectiveCopy: {
    id: 'AgencyDirectiveCopy',
    label: 'Copy of the Challenged Directive (የሚጠየቀው መመሪያ ቅጂ)',
    type: 'Document',
    credentialLabel: 'Directive Number or Title',
    credentialPlaceholder: 'e.g., Directive No. 55/2023'
  },
  ShareholdersResolution: {
    id: 'ShareholdersResolution',
    label: 'Shareholders\' / Partners\' Resolution (የአክሲዮን ባለቤቶች/አጋሮች ውሳኔ)',
    type: 'Document',
    credentialLabel: 'Resolution Date',
    credentialPlaceholder: 'e.g., 25/06/2024'
  },
  MemorandumAndArticles: {
    id: 'MemorandumAndArticles',
    label: 'Memorandum & Articles of Association (የማኅበር መመስረቻና መተዳደሪያ ደንብ)',
    type: 'Document',
    credentialLabel: 'Registration Number',
    credentialPlaceholder: 'e.g., MT/AA/12345/2010'
  },
  NotarizedCheque: {
    id: 'NotarizedCheque',
    label: 'Notarized Cheque or Promissory Note (በኖታሪ የተረጋገጠ ቼክ ወይም የብድር ቃል ኪዳን)',
    type: 'Document',
    credentialLabel: 'Cheque/Note Number',
    credentialPlaceholder: 'e.g., 100012345'
  },
  ProtestCertificate: {
    id: 'ProtestCertificate',
    label: 'Certificate of Protest / Non-Payment (የክፍያ እምቢታ ማረጋገጫ)',
    type: 'Document',
    credentialLabel: 'Protest Certificate Number',
    credentialPlaceholder: 'e.g., PROT/2024/543'
  },
  BalanceSheetAndAudit: {
    id: 'BalanceSheetAndAudit',
    label: 'Recent Audited Financial Statements (የቅርብ ጊዜ ኦዲት የተደረገ የሒሳብ መግለጫ)',
    type: 'Document',
    credentialLabel: 'Financial Year',
    credentialPlaceholder: 'e.g., 2023/2024 FY'
  },
  ListofCreditors: {
    id: 'ListofCreditors',
    label: 'Comprehensive List of Creditors (የአበዳሪዎች ዝርዝር)',
    type: 'Document',
    credentialLabel: 'Date of Compilation',
    credentialPlaceholder: 'e.g., 30/06/2024'
  },
  MedicalCertificateMentalState: {
    id: 'MedicalCertificateMentalState',
    label: 'Medical Certificate of Mental State (የአእምሮ ሁኔታ የህክምና ማስረጃ)',
    type: 'Document',
    credentialLabel: 'Certificate Reference',
    credentialPlaceholder: 'e.g., PSY-CERT-2024-001'
  },
  ProofOfImminentDanger: {
    id: 'ProofOfImminentDanger',
    label: 'Proof of Imminent Danger (የቅርብ አደጋ ማስረጃ)',
    type: 'Document',
    credentialLabel: 'Evidence Description (e.g., Photo, Report No.)',
    credentialPlaceholder: 'e.g., Police Report TFC-2024-123'
  },
  OfficialOrderDocument: {
    id: 'OfficialOrderDocument',
    label: 'Official Order or Warrant (ኦፊሴላዊ ትዕዛዝ ወይም ማዘዣ)',
    type: 'Document',
    credentialLabel: 'Order/Warrant Reference Number',
    credentialPlaceholder: 'e.g., ORD-2024-555'
  },
  VictimConsentForm: {
    id: 'VictimConsentForm',
    label: 'Victim\'s Written Consent (ተጎጂው የሰጠው የጽሑፍ ፈቃድ)',
    type: 'Document',
    credentialLabel: 'Date of Consent',
    credentialPlaceholder: 'e.g., 25/06/2024'
  },
  WitnessStatementsIntoxication: {
    id: 'WitnessStatementsIntoxication',
    label: 'Witness Statements on Intoxication (ስለ ስካር ሁኔታ የምስክርነት ቃል)',
    type: 'Witness',
    credentialLabel: 'Witness Full Name',
    credentialPlaceholder: 'e.g., Ato Tadesse Geremew'
  }
};

export const TEMPLATES: Template[] = [
  { 
    id: 'contract_law', 
    label: 'የውል ሕግ (Contract Law)', 
    icon: FileSignature,
    subTemplates: [
      { id: 'contract_debt_recovery', label: 'የብድር/እዳ ክስ (Debt Recovery)', icon: Banknote },
      { id: 'contract_specific_performance', label: 'ውል ይፈጸምልኝ ክስ (Specific Performance)', icon: Gavel },
      { id: 'contract_termination_claim', label: 'የውል ማፍረስ ክስ (Contract Cancellation)', icon: FileX2 },
      { id: 'app_attachment_before_judgment', label: 'ከፍርድ በፊት እግድ (Attachment)', icon: Shield },
      { id: 'app_judgment_on_admission', label: 'በእምነት ላይ ፍርድ (Judgment on Admission)', icon: BookUser },
    ]
  },
  { 
    id: 'family_law', 
    label: 'የቤተሰብ ሕግ (Family Law)', 
    icon: Handshake,
    subTemplates: [
      { id: 'family_divorce_dispute', label: 'የፍቺ ክርክር (Divorce Dispute)', icon: Scale },
      { id: 'family_divorce_agreement', label: 'የፍቺ ስምምነት (Divorce Agreement)', icon: Handshake },
      { id: 'family_paternity_claim', label: 'የአባትነት ክስ (Paternity Claim)', icon: FileText },
      { id: 'family_post_judgment_partition', label: 'ከፍቺ በኋላ የንብረት ክፍፍል (Post-Divorce Partition)', icon: Building2 },
      { id: 'app_temporary_maintenance', label: 'ጊዜያዊ ቀለብ ጥያቄ (Temp Maintenance)', icon: Receipt },
      { id: 'app_property_preservation', label: 'የንብረት እግድ ጥያቄ (Property Injunction)', icon: Home },
      { id: 'app_protective_order', label: 'የጥበቃ ትዕዛዝ ጥያቄ (Protective Order)', icon: ShieldAlert },
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
    id: 'public_service_law', 
    label: 'የመንግስት ሰራተኛ ህግ (Public Service Law)', 
    icon: Landmark,
    subTemplates: [
       { id: 'civil_service_disciplinary_appeal', label: 'Disciplinary Appeal', icon: FileText },
       { id: 'civil_service_termination_unlawful', label: 'Unlawful Termination Appeal', icon: FileText },
       { id: 'civil_service_benefits_grievance', label: 'Benefits & Rights Grievance', icon: FileText },
    ]
  },
  {
    id: 'succession_law',
    label: 'የውርስ ሕግ (Law of Succession)',
    icon: Users,
    subTemplates: [
      { id: 'succession_heirship_declaration', label: 'የወራሽነት ማረጋገጫ (Heirship Declaration)', icon: FileText },
      { id: 'succession_probate_will', label: 'የኑዛዜ ማጽደቅ (Probate of Will)', icon: Gavel },
      { id: 'succession_partition_estate', label: 'የውርስ ንብረት ክፍፍል (Estate Partition)', icon: Building2 },
      { id: 'app_appoint_liquidator', label: 'ዋና ከፋይ διορισμός (Appoint Liquidator)', icon: BookUser },
      { id: 'app_seal_estate', label: 'የንብረት ማሸግ (Seal Estate)', icon: Shield }
    ]
  },
  {
    id: 'property_land_law',
    label: 'የንብረት እና መሬት ህግ (Property & Land)',
    icon: Map,
    subTemplates: [
        { id: 'property_petitory_vindication', label: 'Petitory Action (Vindication)', icon: FileText },
        { id: 'property_possessory_restoration', label: 'Possessory Action (Restoration)', icon: FileText },
        { id: 'property_boundary_encroachment', label: 'Boundary Encroachment', icon: Map },
        { id: 'property_nuisance_cessation', label: 'Nuisance Cessation', icon: ShieldAlert },
        { id: 'property_servitude_right_of_way', label: 'Servitude (Right of Way)', icon: Map },
        { id: 'app_stay_construction', label: 'Suspend Construction Order', icon: Shield },
        { id: 'app_local_inspection', label: 'Local Inspection Order', icon: Map },
        { id: 'property_possessory_disturbance', label: 'Possessory Action (Disturbance)', icon: FileText },
    ]
  },
  {
    id: 'ip_law',
    label: 'የአእምሯዊ ንብረት ህግ (IP Law)',
    icon: Brain,
    subTemplates: [
        { id: 'ip_trademark_infringement', label: 'Trademark Infringement', icon: FileText },
        { id: 'ip_patent_infringement', label: 'Patent Infringement', icon: FileText },
        { id: 'ip_copyright_infringement', label: 'Copyright Infringement', icon: FileText },
        { id: 'app_ip_interlocutory_injunction', label: 'Interlocutory Injunction', icon: Shield },
        { id: 'app_ip_anton_piller', label: 'Seizure of Evidence Order', icon: ShieldAlert },
    ]
  },
  {
    id: 'status_law',
    label: 'Law of Persons & Status',
    icon: UserCheck,
    subTemplates: [
        { id: 'status_judicial_interdiction', label: 'Judicial Interdiction', icon: FileText },
        { id: 'status_correction_civil_record', label: 'Correction of Civil Record', icon: FileSignature },
        { id: 'status_declaration_of_absence', label: 'Declaration of Absence', icon: FileX2 },
        { id: 'app_status_provisional_curator', label: 'Appoint Provisional Curator', icon: BookUser },
        { id: 'app_status_lift_interdiction', label: 'Lift Interdiction', icon: Gavel },
    ]
  },
  {
    id: 'tax_customs_law',
    label: 'Tax & Customs Law',
    icon: LandmarkIcon,
    subTemplates: [
        { id: 'tax_objection_admin_review', label: 'Tax Objection (Admin Review)', icon: FileText },
        { id: 'tax_appeal_ftac', label: 'Tax Appeal (FTAC)', icon: Gavel },
        { id: 'customs_claim_for_refund', label: 'Customs Refund Claim', icon: Receipt },
        { id: 'app_tax_stay_of_execution', label: 'Stay of Execution', icon: Shield },
        { id: 'app_tax_adr_request', label: 'ADR Request', icon: Handshake },
    ]
  },
  {
    id: 'tort_law',
    label: 'Extra-Contractual (Tort) Law',
    icon: Siren,
    subTemplates: [
      { id: 'tort_general_negligence_claim', label: 'General Negligence Claim', icon: FileText },
      { id: 'tort_strict_liability_buildings', label: 'Strict Liability (Buildings)', icon: Building2 },
    ]
  },
  {
    id: 'administrative_law',
    label: 'Administrative Law',
    icon: Landmark,
    subTemplates: [
      { id: 'admin_appeal_judicial_review', label: 'Judicial Review of Decision', icon: Gavel },
      { id: 'admin_review_directive_legality', label: 'Judicial Review of Directive', icon: FileX2 },
    ]
  },
  {
    id: 'commercial_law',
    label: 'Commercial Law',
    icon: Building2,
    subTemplates: [
      { id: 'comm_restitution_nonpayment', label: 'Payment on Negotiable Instrument', icon: Banknote },
      { id: 'comm_preventive_restructuring', label: 'Preventive Debt Restructuring', icon: Shield },
      { id: 'comm_dissolution_by_court', label: 'Judicial Dissolution', icon: FileX2 },
    ]
  },
  {
    id: 'criminal_law_defences',
    label: 'Criminal Law Defences',
    icon: ShieldCheck,
    subTemplates: [
        { id: 'crim_defence_justification_self_defence', label: 'Justification: Self-Defence', icon: Shield },
        { id: 'crim_defence_excuse_insanity', label: 'Excuse: Insanity / Non-Culpability', icon: Brain },
        { id: 'crim_defence_justification_necessity', label: 'Justification: Necessity', icon: ShieldAlert },
    ]
  }
];

export const TEMPLATE_DATA: { [key: string]: TemplateData } = {
  contract_debt_recovery: {
    documentTitle: "Statement of Claim for Recovery of Loan/Debt",
    jurisdictionText: "Art. 216 et seq. of the Civil Procedure Code & Civil Code Art. 2471.",
    partyTitles: {
      applicant: "Plaintiff (Creditor)",
      respondent: "Defendant (Debtor)"
    },
    facts: [
      {
        id: "fact_loan_agreement",
        label: "Formation of Contract",
        legalText: "On [Date], the Plaintiff and Defendant entered into a written loan agreement.",
        citation: "Civ. Code Art. 2471",
        autoEvidence: [
          "written_contract",
          "admission_of_debt"
        ]
      },
      {
        id: "fact_disbursement",
        label: "Formation of Contract",
        legalText: "The Plaintiff disbursed the sum of [Amount] ETB to the Defendant.",
        citation: "",
        autoEvidence: [
          "payment_receipt"
        ]
      },
      {
        id: "fact_payment_due",
        label: "Default",
        legalText: "The repayment period agreed upon expired on [Date].",
        citation: "Civ. Code Art. 1857",
        autoEvidence: []
      },
      {
        id: "fact_failure_to_pay",
        label: "Default",
        legalText: "Despite the maturity of the debt, the Defendant failed to effect payment.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_notice_given",
        label: "Default",
        legalText: "The Plaintiff served a formal notice of default on [Date].",
        citation: "Civ. Code Art. 1772",
        autoEvidence: [
          "notice_of_default"
        ]
      }
    ],
    reliefs: [
      {
        id: "relief_principal_amount",
        text: "Judgment ordering the Defendant to pay the principal sum of [Amount] ETB.",
        isDefault: true
      },
      {
        id: "relief_legal_interest",
        text: "Order payment of legal interest (9%) calculated from the date of default.",
        citation: "Civ. Code Art. 1751",
        isDefault: true
      },
      {
        id: "relief_contractual_interest",
        text: "Order payment of contractual interest agreed at [Percentage] (max 12%).",
        citation: "Civ. Code Art. 2479",
        isDefault: false
      }
    ]
  },
  contract_specific_performance: {
    documentTitle: "Statement of Claim for Specific Performance of Contract",
    jurisdictionText: "Art. 1776 of the Civil Code & Civil Procedure Code.",
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant"
    },
    facts: [
      {
        id: "fact_valid_contract",
        label: "Contractual Obligation",
        legalText: "A valid contract exists between the parties regarding [Subject Matter].",
        citation: "Civ. Code Art. 1678",
        autoEvidence: [
          "written_contract"
        ]
      },
      {
        id: "fact_plaintiff_performance",
        label: "Contractual Obligation",
        legalText: "The Plaintiff has fully performed their obligations under the contract.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_non_performance",
        label: "Breach",
        legalText: "The Defendant has failed to perform [Specific Obligation] without lawful cause.",
        citation: "Civ. Code Art. 1771",
        autoEvidence: []
      },
      {
        id: "fact_special_interest",
        label: "Breach",
        legalText: "Specific performance is of special interest to the Plaintiff and does not affect the personal liberty of the Defendant.",
        citation: "Civ. Code Art. 1776",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_enforce_performance",
        text: "Order the Defendant to specifically perform the contract by [Action, e.g., transferring title].",
        isDefault: true
      },
      {
        id: "relief_alt_damages",
        text: "Alternatively, if performance is impossible, order payment of damages.",
        isDefault: false
      }
    ]
  },
  contract_termination_claim: {
    documentTitle: "Statement of Claim for Judicial Cancellation of Contract",
    jurisdictionText: "Art. 1784 & 1785 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant"
    },
    facts: [
      {
        id: "fact_fundamental_breach",
        label: "Breach Analysis",
        legalText: "The Defendant's non-performance constitutes a fundamental breach affecting the essence of the contract.",
        citation: "Civ. Code Art. 1785",
        autoEvidence: []
      },
      {
        id: "fact_payments_made",
        label: "Restitution",
        legalText: "The Plaintiff has already paid [Amount] to the Defendant.",
        citation: "",
        autoEvidence: [
          "payment_receipt"
        ]
      }
    ],
    reliefs: [
      {
        id: "relief_judicial_cancellation",
        text: "Judgment declaring the contract cancelled/terminated.",
        isDefault: true
      },
      {
        id: "relief_reinstatement",
        text: "Order the parties to be reinstated to their former position (Restitution).",
        citation: "Civ. Code Art. 1815",
        isDefault: true
      }
    ]
  },
  app_attachment_before_judgment: {
    documentTitle: "Application for Attachment of Property Before Judgment",
    jurisdictionText: "Art. 151 & 152 of the Civil Procedure Code.",
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant"
    },
    facts: [
      {
        id: "fact_intent_to_obstruct",
        label: "Obstruction of Justice",
        legalText: "The Defendant is about to dispose of their property or remove it from the court's jurisdiction with intent to obstruct the execution of the decree.",
        citation: "CPC Art. 151",
        autoEvidence: []
      },
      {
        id: "fact_prima_facie_case",
        label: "Obstruction of Justice",
        legalText: "The Applicant has a strong prima facie case and is likely to succeed in the main suit.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_attach_property",
        text: "Order the attachment of the Defendant's property [Specify Property] pending final judgment.",
        isDefault: true
      },
      {
        id: "relief_security_bond",
        text: "Alternatively, order the Defendant to furnish security for the amount claimed.",
        isDefault: false
      }
    ]
  },
  app_judgment_on_admission: {
    documentTitle: "Application for Judgment on Admissions",
    jurisdictionText: "Art. 242 of the Civil Procedure Code.",
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant"
    },
    facts: [
      {
        id: "fact_clear_admission",
        label: "Admission",
        legalText: "In their Statement of Defense, the Respondent has clearly admitted the existence of the contract and the debt.",
        citation: "CPC Art. 242",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_immediate_judgment",
        text: "Enter immediate judgment for the Plaintiff on the admitted portion of the claim.",
        isDefault: true
      }
    ]
  },
  family_divorce_dispute: {
    documentTitle: 'Statement of Claim for Dissolution of Marriage',
    jurisdictionText: 'Art. 11(2) of Federal Courts Proc. 25/96 and Art. 76 of the Revised Family Code.',
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant"
    },
    facts: [
      {
        id: "fact_marriage_existence",
        label: "Marriage Validity",
        legalText: "The Plaintiff and Defendant were legally married on [Date].",
        citation: "RFC Art. 1",
        autoEvidence: ["marriage_cert"]
      },
      {
        id: "fact_irretrievable_breakdown",
        label: "Grounds for Dissolution",
        legalText: "There are irreconcilable differences making the continuation of the marriage impossible.",
        citation: "RFC Art. 76",
        autoEvidence: []
      },
      {
        id: "fact_period_of_separation",
        label: "Grounds for Dissolution",
        legalText: "The parties have lived separately for a period exceeding [Number] months.",
        citation: "RFC Art. 81",
        autoEvidence: []
      },
      {
        id: "fact_children_existence",
        label: "Children & Custody",
        legalText: "The marriage produced [Number] children.",
        citation: "RFC Art. 113",
        autoEvidence: ["birth_cert"]
      }
    ],
    reliefs: [
      { id: "relief_dissolution", text: "Judgment dissolving the marriage between the Plaintiff and Defendant.", isDefault: true },
      { id: "relief_custody", text: "Order granting sole/joint custody of the minor children to the Plaintiff.", isDefault: false },
      { id: "relief_child_support", text: "Order for the Defendant to pay monthly child maintenance.", isDefault: false },
      { id: "relief_property_partition", text: "Order for the liquidation and partition of common marital property.", isDefault: false },
    ]
  },
  family_divorce_agreement: {
      documentTitle: "Petition for Approval of Divorce by Mutual Consent",
      jurisdictionText: "Art. 77 of the Revised Family Code.",
      partyTitles: { applicant: "First Petitioner", respondent: "Second Petitioner" },
      facts: [
          { id: "fact_mutual_agreement", label: "Consent Details", legalText: "Both parties have voluntarily agreed to dissolve their marriage.", citation: "RFC Art. 77", autoEvidence: ["marriage_cert"] },
          { id: "fact_agreement_doc", label: "Terms of Agreement", legalText: "The parties have prepared a comprehensive agreement regarding the division of property and custody of children.", citation: "RFC Art. 82", autoEvidence: ["list_of_common_property"] }
      ],
      reliefs: [{ id: "relief_approve_agreement", text: "Order approving the divorce agreement and dissolving the marriage.", isDefault: true }]
  },
  family_paternity_claim: {
      documentTitle: "Statement of Claim for Judicial Declaration of Paternity",
      jurisdictionText: "Art. 143 of the Revised Family Code.",
      partyTitles: { applicant: "Plaintiff (Child/Guardian)", respondent: "Defendant (Alleged Father)" },
      facts: [
          { id: "fact_sexual_intercourse", label: "Sexual Relations", legalText: "The mother and the Defendant had sexual relations during the legal period of conception.", citation: "RFC Art. 143", autoEvidence: [] },
          { id: "fact_possession_status", label: "Possession of Status", legalText: "The Defendant has treated the child as his own in public and private spheres.", citation: "RFC Art. 136", autoEvidence: ["witness_statements"] }
      ],
      reliefs: [
          { id: "relief_declare_paternity", text: "Judgment declaring the Defendant is the biological father of the child.", isDefault: true },
          { id: "relief_reimbursement", text: "Order for reimbursement of expenses related to birth and maintenance.", isDefault: false }
      ]
  },
  family_post_judgment_partition: {
    documentTitle: "Application for Liquidation and Partition of Common Property",
    jurisdictionText: "Art. 85 & 90 of the Revised Family Code and Art. 219 of the Civil Procedure Code (Execution Proceedings).",
    partyTitles: {
      applicant: "Decree Holder (Applicant)",
      respondent: "Judgment Debtor (Respondent)"
    },
    facts: [
      {
        id: "fact_prior_dissolution",
        label: "Procedural History",
        legalText: "This Honorable Court has already rendered a judgment dissolving the marriage between the parties under this file number.",
        citation: "Civil Procedure Code Art. 182",
        autoEvidence: [
          "copy_of_divorce_judgment"
        ]
      },
      {
        id: "fact_custody_settled",
        label: "Procedural History",
        legalText: "Issues regarding child custody and maintenance have already been adjudicated.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_existence_common_property",
        label: "Identification of Property",
        legalText: "The parties acquired movable and immovable property during the existence of the marriage which constitutes Common Property.",
        citation: "RFC Art. 62",
        autoEvidence: [
          "list_of_common_property",
          "title_deeds_librec"
        ]
      },
      {
        id: "fact_property_possession",
        label: "Identification of Property",
        legalText: "The property is currently in the sole possession/control of the Respondent/Applicant.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_personal_property_claim",
        label: "Restitution of Personal Property (Pre-Partition)",
        legalText: "The Applicant possesses proof of personal property owned prior to the marriage or acquired by succession/donation, which must be withdrawn before partition.",
        citation: "RFC Art. 57 & 86",
        autoEvidence: [
          "proof_of_inheritance_donation",
          "pre_marital_ownership_documents"
        ]
      },
      {
        id: "fact_dispute_valuation",
        label: "Valuation & Dispute",
        legalText: "The parties are unable to agree on the value or mode of partition of the assets.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_expert_need",
        label: "Valuation & Dispute",
        legalText: "The complexity of the assets (e.g., business shares, real estate) requires professional valuation.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_appoint_liquidator",
        text: "Order the appointment of a court-verified expert/liquidator to inventory and value the common property.",
        isDefault: true
      },
      {
        id: "relief_withdraw_personal",
        text: "Order the restitution/withdrawal of the Applicant's personal property [List Items] prior to partition.",
        isDefault: false
      },
      {
        id: "relief_partition_equal",
        text: "Order the remaining common property be divided equally (50/50) between the parties.",
        isDefault: true
      },
      {
        id: "relief_auction_sale",
        text: "Order the sale by auction of indivisible property and the division of the proceeds.",
        isDefault: false
      }
    ]
  },
  app_temporary_maintenance: {
      documentTitle: "Application for Order of Provisional Maintenance",
      jurisdictionText: "Art. 83(2) of the Revised Family Code & Art. 154 Civil Procedure Code.",
      partyTitles: { applicant: "Applicant", respondent: "Respondent" },
      facts: [
          { id: "fact_pendency_of_suit", label: "Urgency & Need", legalText: "A main suit for divorce is currently pending between the parties.", citation: "RFC Art. 83", autoEvidence: [] },
          { id: "fact_immediate_need", label: "Urgency & Need", legalText: "The Applicant has no independent income to support themselves/the children during the litigation.", citation: "RFC Art. 106", autoEvidence: ["proof_of_income"] },
          { id: "fact_ability_to_pay", label: "Urgency & Need", legalText: "The Respondent has sufficient income to provide provisional support.", citation: "", autoEvidence: [] }
      ],
      reliefs: [{ id: "relief_prov_maintenance", text: "Order the Respondent to pay [Amount] ETB monthly until final judgment.", isDefault: true }]
  },
  app_property_preservation: {
      documentTitle: "Application for Attachment and Preservation of Common Property",
      jurisdictionText: "Art. 154 Civil Procedure Code & Art. 83 Revised Family Code.",
      partyTitles: { applicant: "Applicant", respondent: "Respondent" },
      facts: [
          { id: "fact_intent_to_defraud", label: "Risk of Dissipation", legalText: "There is a reasonable apprehension that the Respondent is attempting to sell, transfer, or hide common marital assets.", citation: "CPC Art. 154", autoEvidence: [] },
          { id: "fact_common_ownership", label: "Risk of Dissipation", legalText: "The property in question is common property acquired during the marriage.", citation: "RFC Art. 62", autoEvidence: ["list_of_common_property"] }
      ],
      reliefs: [
          { id: "relief_injunction_transfer", text: "Order restraining the Respondent from transferring or selling specific assets.", isDefault: true },
          { id: "relief_freeze_accounts", text: "Order freezing the joint bank accounts pending final partition.", isDefault: false }
      ]
  },
  app_protective_order: {
      documentTitle: "Application for Urgent Protective Order",
      jurisdictionText: "Art. 154 Civil Procedure Code (Inherent Power) & Criminal Code References.",
      partyTitles: { applicant: "Applicant", respondent: "Respondent" },
      facts: [
          { id: "fact_imminent_danger", label: "Safety & Harm", legalText: "The Applicant faces immediate physical danger from the Respondent.", citation: "", autoEvidence: ["police_report_domestic_violence"] },
          { id: "fact_balance_convenience", label: "Safety & Harm", legalText: "The harm to the Applicant if the order is not granted outweighs any inconvenience to the Respondent.", citation: "", autoEvidence: [] }
      ],
      reliefs: [
          { id: "relief_vacate_home", text: "Order the Respondent to temporarily vacate the matrimonial home.", isDefault: true },
          { id: "relief_restrain_contact", text: "Order restraining the Respondent from coming within [Distance] meters of the Applicant.", isDefault: false }
      ]
  },
  labour_unlawful_termination: {
    documentTitle: 'Statement of Claim for Unlawful Termination',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee / Applicant (አመልካች/ሰራተኛ)',
      respondent: 'Employer / Organization (ተጠሪ/ቀጣሪ)',
    },
    facts: [
        {
            id: 'indefinite_contract',
            label: 'The Contractual Relationship (Prerequisites)',
            legalText: 'Existence of an indefinite period employment contract.',
            citation: 'Art. 9 of Proc. 1156/2019',
            autoEvidence: ['employment_contract'],
        },
        {
            id: 'definite_contract_ended',
            label: 'The Contractual Relationship (Prerequisites)',
            legalText: 'A definite period or probationary contract existed, and the period has concluded, implying conversion to an indefinite contract.',
            citation: 'Art. 10, 11 of Proc. 1156/2019',
            autoEvidence: ['employment_contract'],
        },
        {
            id: 'no_prior_notice',
            label: 'The Act of Termination: Procedural Violations',
            legalText: 'Termination was effected without any prior written notice specifying the reasons and date of termination.',
            citation: 'Violation of Art. 35(1) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'insufficient_notice',
            label: 'The Act of Termination: Procedural Violations',
            legalText: 'The notice period provided was insufficient and less than the legal minimum based on years of service.',
            citation: 'Violation of Art. 35(2) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'union_membership_termination',
            label: 'The Act of Termination: Substantive Violations (Unlawful Grounds)',
            legalText: 'Termination was due to the employee\'s membership in a trade union or participation in union activities.',
            citation: 'Art. 26(2)(a) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'maternity_termination',
            label: 'The Act of Termination: Substantive Violations (Unlawful Grounds)',
            legalText: 'Termination was due to the employee\'s pregnancy or maternity leave status.',
            citation: 'Art. 26(2)(d) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'whistleblower_termination',
            label: 'The Act of Termination: Substantive Violations (Unlawful Grounds)',
            legalText: 'Termination was due to the employee giving information or filing a complaint against the employer regarding a breach of law.',
            citation: 'Art. 26(2)(b) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'discriminatory_termination',
            label: 'The Act of Termination: Substantive Violations (Unlawful Grounds)',
            legalText: 'Termination was based on discriminatory grounds such as race, color, sex, religion, political opinion, national extraction, or social origin.',
            citation: 'Art. 26(2)(c) of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'no_valid_reason',
            label: 'The Act of Termination: The "No Reason" Defense',
            legalText: 'The employer failed to provide a valid reason for termination related to the worker\'s capacity or conduct, or the organizational needs of the undertaking.',
            citation: 'Violation of Art. 27 of Proc. 1156/2019',
            autoEvidence: ['termination_letter'],
        },
        {
            id: 'constructive_dismissal',
            label: 'The Act of Termination: Constructive Dismissal',
            legalText: 'Employee was forced to resign due to the employer\'s unlawful or abusive actions (e.g., sexual harassment, assault, danger to safety), which constitutes termination by the employer.',
            citation: 'Art. 32 of Proc. 1156/2019',
            autoEvidence: [],
        },
    ],
    reliefs: [
        {
            id: 'declare_termination_unlawful',
            text: 'Judgment declaring the termination unlawful pursuant to Art. 43.',
            isDefault: true,
        },
        {
            id: 'reinstatement',
            text: 'Order for reinstatement to previous position with full back pay from the date of termination until reinstatement (Art. 43(1)).',
            isDefault: false,
        },
        {
            id: 'compensation_in_lieu',
            text: 'Payment of compensation in lieu of reinstatement, equivalent to 180 times the average daily wage, and an additional 30 days for each year of service (not to exceed 12 months total) (Art. 43(2,3)).',
            isDefault: false,
        },
        {
            id: 'severance_pay',
            text: 'Payment of Severance Pay as per the calculation in Art. 39 & 40 (Only if not reinstated).',
            isDefault: false,
        },
        {
            id: 'notice_compensation',
            text: 'Payment of Compensation for lack of proper notice, equivalent to salary for the notice period (Art. 44).',
            isDefault: false,
        },
        {
            id: 'costs_and_fees_labour',
            text: 'Costs and fees to be covered by the respondent.',
            isDefault: true,
        },
    ],
  },
  labour_unpaid_wages: {
    documentTitle: 'Statement of Claim for Outstanding Payments',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee / Applicant (አመልካች/ሰራተኛ)',
      respondent: 'Employer / Organization (ተጠሪ/ቀጣሪ)',
    },
    facts: [
      {
        id: 'unpaid_salary',
        label: 'Salary Arrears',
        legalText: 'Non-payment of regular monthly salary for the month(s) of [Specify Months].',
        citation: 'Art. 53 (Payment obligations)',
        autoEvidence: ['unpaid_wage_witness'],
      },
      {
        id: 'unlawful_deduction',
        label: 'Salary Arrears',
        legalText: 'An unlawful deduction was made from the salary without employee consent or a valid court order.',
        citation: 'Art. 59 (Prohibition of deductions)',
        autoEvidence: ['unpaid_wage_witness'],
      },
      {
        id: 'unpaid_overtime',
        label: 'Statutory Benefits',
        legalText: 'Employee worked beyond the standard 8 hours/day or 48 hours/week without receiving overtime compensation at the legally mandated rates.',
        citation: 'Art. 66 & 68 (Calculation rates)',
        autoEvidence: ['unpaid_wage_witness'],
      },
      {
        id: 'unpaid_annual_leave',
        label: 'Statutory Benefits',
        legalText: 'Employee was not permitted to take annual leave and was not compensated for the accrued, unused leave upon termination of employment.',
        citation: 'Art. 77 & 79 (Conversion to cash only upon termination)',
        autoEvidence: [],
      },
      {
        id: 'unpaid_holiday_work',
        label: 'Statutory Benefits',
        legalText: 'Employee worked on public holidays but was not compensated at a rate of two times their ordinary hourly rate.',
        citation: 'Art. 73',
        autoEvidence: [],
      },
    ],
    reliefs: [
      {
        id: 'payment_principal',
        text: 'An order for the Respondent to pay the total principal amount of all outstanding wages and benefits.',
        isDefault: true,
      },
      {
        id: 'payment_interest',
        text: 'An order for the payment of statutory interest on the delayed payments as per the relevant provisions of the Civil Code.',
        isDefault: false,
      },
      {
        id: 'payment_overtime_specific',
        text: 'A specific order for the payment of calculated overtime wages.',
        isDefault: false,
      },
      {
        id: 'costs_and_fees_labour_wages',
        text: 'Costs and fees to be covered by the respondent.',
        isDefault: true,
      },
    ],
  },
  labour_employment_injury: {
    documentTitle: 'Claim for Employment Injury Compensation',
    jurisdictionText: 'Labour Proclamation No. 1156/2019',
    partyTitles: {
      applicant: 'Employee / Applicant (አመልካች/ሰራተኛ)',
      respondent: 'Employer / Organization (ተጠሪ/ቀጣሪ)',
    },
    facts: [
      {
        id: 'injury_at_work',
        label: 'The Incident',
        legalText: 'The injury occurred during the performance of the employee\'s duties within the regular working hours and at the designated workplace.',
        citation: 'Art. 95(1)(a)',
        autoEvidence: [],
      },
      {
        id: 'injury_commuting',
        label: 'The Incident',
        legalText: 'The injury occurred while the employee was commuting directly between their residence and the workplace, using transport provided by the employer.',
        citation: 'Art. 95(1)(c)',
        autoEvidence: [],
      },
      {
        id: 'injury_on_order',
        label: 'The Incident',
        legalText: 'The injury occurred outside the regular workplace while the employee was carrying out a specific order given by the employer.',
        citation: 'Art. 95(1)(b)',
        autoEvidence: [],
      },
      {
        id: 'occupational_disease',
        label: 'The Incident',
        legalText: 'The employee has contracted an occupational disease as a direct result of exposure to hazards in the work environment.',
        citation: 'Art. 98',
        autoEvidence: [],
      },
      {
        id: 'permanent_partial_disability',
        label: 'The Damage',
        legalText: 'A permanent partial disability has been sustained as a result of the injury, confirmed by a medical board certificate.',
        citation: 'Art. 109 & 110',
        autoEvidence: [],
      },
      {
        id: 'temporary_total_disability',
        label: 'The Damage',
        legalText: 'A temporary total disability was sustained, rendering the employee unable to work for a specific period.',
        citation: 'Art. 106',
        autoEvidence: [],
      },
    ],
    reliefs: [
      {
        id: 'medical_expenses',
        text: 'An order for the full payment of all medical, surgical, pharmaceutical, and hospital care expenses incurred due to the injury (Art. 105).',
        isDefault: true,
      },
      {
        id: 'disability_compensation',
        text: 'Payment of disability compensation, calculated based on the employee\'s salary and the percentage of disability as determined by the medical board (Art. 109 & 110).',
        isDefault: false,
      },
      {
        id: 'periodical_payment',
        text: 'Payment for temporary disability, equivalent to 75% of the employee\'s daily wage, for the duration of the disability (Art. 106).',
        isDefault: false,
      },
      {
        id: 'costs_and_fees_injury',
        text: 'Costs and fees to be covered by the respondent.',
        isDefault: true,
      },
    ],
  },
  civil_service_disciplinary_appeal: {
    documentTitle: 'Memorandum of Appeal to the Administrative Tribunal',
    jurisdictionText: 'Federal Civil Servants Proclamation No. 1064/2017',
    partyTitles: {
      applicant: 'Civil Servant / Appellant (የመንግስት ሰራተኛ/ይግባኝ ባይ)',
      respondent: 'Institution / Office (መስሪያ ቤት/መልስ ሰጪ)',
    },
    facts: [
      {
        id: 'measure_dismissal',
        label: 'The Disciplinary Measure (The Trigger)',
        legalText: 'Dismissal from Service.',
        citation: 'Art. 81(1)(b) of Proc. 1064/2017',
        autoEvidence: ['dismissal_letter'],
      },
      {
        id: 'measure_demotion',
        label: 'The Disciplinary Measure (The Trigger)',
        legalText: 'Downgrading of job position/grade.',
        citation: 'Art. 81(1)(b) of Proc. 1064/2017',
        autoEvidence: ['dismissal_letter'],
      },
      {
        id: 'measure_fine',
        label: 'The Disciplinary Measure (The Trigger)',
        legalText: 'Imposition of a fine exceeding one month\'s salary.',
        citation: 'Art. 81(1)(b) of Proc. 1064/2017',
        autoEvidence: ['dismissal_letter'],
      },
      {
        id: 'no_right_to_be_heard',
        label: 'Procedural Violations (The Defense)',
        legalText: 'The Institution took the measure without giving the Appellant a chance to present a defense.',
        citation: 'Violation of Art. 69 of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'limitation_period_1yr',
        label: 'Procedural Violations (The Defense)',
        legalText: 'The rigorous measure was taken more than 1 year after the offense was known, barring it by limitation.',
        citation: 'Art. 76(2) of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'limitation_period_6mo',
        label: 'Procedural Violations (The Defense)',
        legalText: 'The simple measure was taken more than 6 months after the offense was known, barring it by limitation.',
        citation: 'Art. 76(1) of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'improper_committee',
        label: 'Procedural Violations (The Defense)',
        legalText: 'The Disciplinary Committee was not constituted according to Regulation 77/2002 (e.g., no staff representative).',
        citation: 'Reg. 77/2002',
        autoEvidence: [],
      },
      {
        id: 'not_an_offense',
        label: 'Substantive Defenses (The Merits)',
        legalText: 'The alleged act does not constitute a disciplinary offense under the law.',
        citation: '',
        autoEvidence: [],
      },
      {
        id: 'disproportionate_penalty',
        label: 'Substantive Defenses (The Merits)',
        legalText: 'The penalty is disproportionate to the offense committed.',
        citation: '',
        autoEvidence: [],
      },
      {
        id: 'double_jeopardy',
        label: 'Substantive Defenses (The Merits)',
        legalText: 'The appellant was already punished for the same alleged offense.',
        citation: '',
        autoEvidence: [],
      },
    ],
    reliefs: [
      {
        id: 'quash_decision',
        text: 'To quash/annul the administrative decision of the Respondent Institution.',
        isDefault: true,
      },
      {
        id: 'reinstate_with_pay',
        text: 'To order the reinstatement of the Appellant to their former position and payment of full salary for the period of suspension (Art. 81(3)).',
        isDefault: false,
      },
      {
        id: 'expunge_record',
        text: 'To order the expunging of the disciplinary measure from the Appellant\'s personal file.',
        isDefault: false,
      },
    ],
  },
  civil_service_termination_unlawful: {
    documentTitle: 'Appeal Against Administrative Termination',
    jurisdictionText: 'Federal Civil Servants Proclamation No. 1064/2017',
    partyTitles: {
      applicant: 'Civil Servant / Appellant (የመንግስት ሰራተኛ/ይግባኝ ባይ)',
      respondent: 'Institution / Office (መስሪያ ቤት/መልስ ሰጪ)',
    },
    facts: [
      {
        id: 'inefficiency_not_consecutive',
        label: 'Grounds: Inefficiency (Performance)',
        legalText: 'Termination for performance was unlawful as the Appellant did not receive two consecutive "unsatisfactory" evaluations.',
        citation: 'Art. 84(1) of Proc. 1064/2017',
        autoEvidence: ['performance_review'],
      },
      {
        id: 'inefficiency_no_training',
        label: 'Grounds: Inefficiency (Performance)',
        legalText: 'Termination for performance was unlawful as the Appellant was not provided with necessary training and support to improve.',
        citation: 'Art. 84(1) of Proc. 1064/2017',
        autoEvidence: ['performance_review'],
      },
      {
        id: 'illness_before_leave_exhausted',
        label: 'Grounds: Illness / Medical',
        legalText: 'Termination due to illness was unlawful as it occurred before the Appellant had exhausted all available sick leave (8 months on full pay, 4 months on half pay).',
        citation: 'Art. 83(1) of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'illness_no_medical_board',
        label: 'Grounds: Illness / Medical',
        legalText: 'Termination due to illness was unlawful as no Medical Board certificate was produced to declare permanent disability.',
        citation: 'Art. 83(2) of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'redundancy_no_offer',
        label: 'Grounds: Force Majeure / Redundancy',
        legalText: 'Termination due to abolition of position (redundancy) was unlawful as the Appellant was not offered a similar vacant position before termination.',
        citation: 'Art. 85(2) of Proc. 1064/2017',
        autoEvidence: [],
      },
    ],
    reliefs: [
      {
        id: 'quash_termination',
        text: 'To quash/annul the administrative decision of termination.',
        isDefault: true,
      },
      {
        id: 'reinstate_civil_servant',
        text: 'To order the reinstatement of the Appellant to their former position with full back pay.',
        isDefault: true,
      },
    ],
  },
  civil_service_benefits_grievance: {
    documentTitle: 'Appeal on Service Rights & Benefits',
    jurisdictionText: 'Federal Civil Servants Proclamation No. 1064/2017',
    partyTitles: {
      applicant: 'Civil Servant / Appellant (የመንግስት ሰራተኛ/ይግባኝ ባይ)',
      respondent: 'Institution / Office (መስሪያ ቤት/መልስ ሰጪ)',
    },
    facts: [
      {
        id: 'exhaustion_grievance_submitted',
        label: 'Exhaustion of Remedies (Mandatory)',
        legalText: 'A complaint was submitted to the institutional Grievance Handling Committee on [Date], but the decision was unsatisfactory or not rendered in time.',
        citation: 'Art. 81(1)(e) of Proc. 1064/2017',
        autoEvidence: ['grievance_submission'],
      },
      {
        id: 'promotion_denied',
        label: 'The Grievance',
        legalText: 'The Appellant was unlawfully denied a promotion despite scoring higher points than the selected candidate, in violation of the merit principle.',
        citation: 'Art. 13 of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'salary_increment_denied',
        label: 'The Grievance',
        legalText: 'The Appellant was unlawfully denied a periodic salary increment despite meeting all performance requirements.',
        citation: 'Art. 81(1)(c) of Proc. 1064/2017',
        autoEvidence: [],
      },
      {
        id: 'acting_allowance_denied',
        label: 'The Grievance',
        legalText: 'The Appellant served in a higher position in an acting capacity but was unlawfully denied the acting allowance for that period.',
        citation: 'Relevant Regulations',
        autoEvidence: [],
      },
    ],
    reliefs: [
      {
        id: 'grant_promotion',
        text: 'To order the Respondent Institution to grant the promotion due to the Appellant.',
        isDefault: false,
      },
      {
        id: 'grant_salary_increment',
        text: 'To order the payment of the denied salary increment, with retroactive effect.',
        isDefault: false,
      },
      {
        id: 'refund_deductions',
        text: 'To order the refund of any unlawfully deducted salary.',
        isDefault: false,
      },
    ],
  },
  succession_heirship_declaration: {
    documentTitle: "Application for Declaration of Heirship",
    jurisdictionText: "Art. 996 of the Civil Code & Civil Procedure Code.",
    partyTitles: {
      applicant: "Applicant / Interested Parties",
      respondent: "Public Notice"
    },
    facts: [
      {
        id: "fact_deceased_identity",
        label: "Fact of Death",
        legalText: "The Deceased, [Name], passed away on [Date] at [Place].",
        citation: "Civ. Code Art. 826",
        autoEvidence: ["DeathCertificate"]
      },
      {
        id: "fact_relationship_descendant",
        label: "Relationship (Intestate Rules)",
        legalText: "The Applicants are the children/descendants of the deceased.",
        citation: "Civ. Code Art. 842",
        autoEvidence: []
      },
      {
        id: "fact_no_will",
        label: "Relationship (Intestate Rules)",
        legalText: "The Deceased left no will, necessitating an intestate succession.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_witness_testimony",
        label: "Witnesses",
        legalText: "Three witnesses are present to testify that the Applicants are the only known heirs.",
        citation: "",
        autoEvidence: ["WitnessAffidavitsSuccession"]
      }
    ],
    reliefs: [
      { id: "relief_declare_heirs", text: "Judgment declaring the Applicants as the sole legal heirs of the Deceased.", isDefault: true },
      { id: "relief_certificate_issuance", text: "Order the issuance of a Certificate of Heirship.", isDefault: true }
    ]
  },
  succession_probate_will: {
    documentTitle: "Application for Probate of Will",
    jurisdictionText: "Art. 881 (Public), 885 (Holographic) of the Civil Code.",
    partyTitles: {
      applicant: "Petitioner (Executor/Beneficiary)",
      respondent: "N/A"
    },
    facts: [
      {
        id: "fact_will_existence",
        label: "Validity of Will",
        legalText: "The Deceased left a valid will dated [Date].",
        citation: "",
        autoEvidence: ["WillTestament"]
      },
      {
        id: "fact_formality_public",
        label: "Validity of Will",
        legalText: "The will was read in the presence of four witnesses and the Registrar.",
        citation: "Civ. Code Art. 881",
        autoEvidence: []
      },
      {
        id: "fact_formality_holographic",
        label: "Validity of Will",
        legalText: "The will is entirely written, dated, and signed by the hand of the deceased.",
        citation: "Civ. Code Art. 885",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_validate_will", text: "Judgment declaring the Will to be valid and the true last wish of the Deceased.", isDefault: true },
      { id: "relief_appoint_executor", text: "Order confirming the Petitioner as the Executor of the will.", isDefault: true }
    ]
  },
  succession_partition_estate: {
    documentTitle: "Application for Partition of Hereditary Estate",
    jurisdictionText: "Art. 1060 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff (Heir)",
      respondent: "Defendant (Co-Heir)"
    },
    facts: [
      {
        id: "fact_heirship_established",
        label: "Co-ownership",
        legalText: "The parties have been legally declared as co-heirs.",
        citation: "Civ. Code Art. 1060",
        autoEvidence: ["CertificateofHeirship"]
      },
      {
        id: "fact_liquidation_complete",
        label: "Estate Status",
        legalText: "The debts of the estate have been paid, and the assets are ready for division.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_disagreement",
        label: "Estate Status",
        legalText: "The Co-heirs cannot agree on a voluntary division of the assets.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_partition_kind", text: "Order the physical division of the property in kind among the heirs.", isDefault: true },
      { id: "relief_partition_sale", text: "Order the sale of the property and division of proceeds (if division in kind is impossible).", isDefault: false }
    ]
  },
  app_appoint_liquidator: {
    documentTitle: "Application for Appointment of Liquidator",
    jurisdictionText: "Art. 950 of the Civil Code.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "N/A"
    },
    facts: [
      {
        id: "fact_estate_complexity",
        label: "Necessity",
        legalText: "The estate involves complex debts and multiple assets requiring professional management.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_no_nominee",
        label: "Necessity",
        legalText: "The will did not nominate an executor, or the heirs cannot agree on one.",
        citation: "Civ. Code Art. 950",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_appoint_official", text: "Order the appointment of a neutral Liquidator to administer the estate.", isDefault: true }
    ]
  },
  app_seal_estate: {
    documentTitle: "Application for Affixing of Seals",
    jurisdictionText: "Art. 946 of the Civil Code & Civil Procedure Code.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "N/A"
    },
    facts: [
      {
        id: "fact_risk_misappropriation",
        label: "Urgency",
        legalText: "There is an imminent risk that movables or documents may be removed or hidden.",
        citation: "Civ. Code Art. 946",
        autoEvidence: []
      },
      {
        id: "fact_minor_heirs",
        label: "Urgency",
        legalText: "There are minor heirs whose interests require protection.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_affix_seals", text: "Order the court registrar to affix official seals on the deceased's property/safe.", isDefault: true }
    ]
  },
  property_petitory_vindication: {
    documentTitle: "Statement of Claim for Vindication of Property (Petitory Action)",
    jurisdictionText: "Art. 1206 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff (Owner)",
      respondent: "Defendant (Unlawful Holder)"
    },
    facts: [
      {
        id: "fact_ownership_proof",
        label: "Proof of Title",
        legalText: "The Plaintiff is the legal owner/holder of the immovable property situated at [Location].",
        citation: "Civ. Code Art. 1204",
        autoEvidence: ["TitleDeed"]
      },
      {
        id: "fact_chain_of_custody",
        label: "Proof of Title",
        legalText: "The Plaintiff acquired the property through [Sale/Succession/Grant] on [Date].",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_defendant_possession",
        label: "Unlawful Holding",
        legalText: "The Defendant is currently in possession of the property without any legal title or right.",
        citation: "Civ. Code Art. 1206",
        autoEvidence: []
      },
      {
        id: "fact_refusal_vacate",
        label: "Unlawful Holding",
        legalText: "Despite demands, the Defendant refuses to vacate the property.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_declare_ownership",
        text: "Judgment declaring the Plaintiff as the sole legal owner/holder of the property.",
        isDefault: true,
      },
      {
        id: "relief_eviction_order",
        text: "Order the Defendant to vacate the property and hand it over to the Plaintiff.",
        isDefault: true,
      },
      {
        id: "relief_mesne_profits",
        text: "Order the Defendant to pay compensation (fruits/rent) for the period of unlawful occupation.",
        isDefault: false,
      }
    ]
  },
  property_possessory_restoration: {
    documentTitle: "Statement of Claim for Restoration of Possession",
    jurisdictionText: "Art. 1149 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff (Dispossessed)",
      respondent: "Defendant (Usurper)"
    },
    facts: [
      {
        id: "fact_actual_possession",
        label: "Fact of Possession",
        legalText: "The Plaintiff was in peaceful and continuous possession of the property.",
        citation: "Civ. Code Art. 1140",
        autoEvidence: ["TaxLandRentReceipts", "KebeleConfirmation"]
      },
      {
        id: "fact_usurpation_act",
        label: "Illicit Interference (Usurpation)",
        legalText: "The Defendant took possession by force/fraud on [Date].",
        citation: "Civ. Code Art. 1148",
        autoEvidence: []
      },
      {
        id: "fact_timeliness",
        label: "Illicit Interference (Usurpation)",
        legalText: "This claim is filed within two years of the usurpation.",
        citation: "Civ. Code Art. 1149",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_restore_possession",
        text: "Order the immediate restoration of possession to the Plaintiff (without prejudice to questions of title).",
        isDefault: true
      }
    ]
  },
  property_boundary_encroachment: {
    documentTitle: "Statement of Claim for Removal of Boundary Encroachment",
    jurisdictionText: "Art. 1204 & 1211 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff",
      respondent: "Defendant (Neighbor)"
    },
    facts: [
      {
        id: "fact_defined_boundary",
        label: "Boundary Lines",
        legalText: "The legal boundary between the Plaintiff's and Defendant's plots is defined by the official Site Plan.",
        citation: "",
        autoEvidence: ["SitePlan"]
      },
      {
        id: "fact_encroachment_act",
        label: "The Encroachment",
        legalText: "The Defendant has constructed a wall/structure that crosses the boundary line by [Meters].",
        citation: "",
        autoEvidence: ["SurveyorsReport"]
      }
    ],
    reliefs: [
      {
        id: "relief_demolition",
        text: "Order the Defendant to demolish the encroaching structure.",
        isDefault: true
      },
      {
        id: "relief_boundary_restitution",
        text: "Order the restoration of the boundary markers to their original position.",
        isDefault: true
      }
    ]
  },
  app_stay_construction: {
    documentTitle: "Application for Urgent Order to Suspend Construction",
    jurisdictionText: "Art. 154 of the Civil Procedure Code.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_ongoing_construction",
        label: "Irreparable Injury",
        legalText: "The Respondent is currently engaged in active construction on the disputed land.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_irreparable_harm",
        label: "Irreparable Injury",
        legalText: "If the construction is completed, demolition will be difficult and the Applicant's rights will be permanently prejudiced.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_prima_facie",
        label: "Irreparable Injury",
        legalText: "The Applicant has demonstrated a strong prima facie case of ownership.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_suspend_works",
        text: "Order the immediate suspension of all construction activities on the disputed plot pending final judgment.",
        isDefault: true
      }
    ]
  },
  app_local_inspection: {
    documentTitle: "Application for Order of Local Inspection",
    jurisdictionText: "Art. 136 of the Civil Procedure Code.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_physical_dispute",
        label: "Clarification",
        legalText: "The oral testimonies and documents regarding the physical features/boundaries of the land are contradictory.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_necessity_to_view",
        label: "Clarification",
        legalText: "A just decision cannot be rendered without the Court (or its registrar) physically viewing the site.",
        citation: "CPC Art. 136",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_order_visit",
        text: "Order a local inspection of the property to verify boundaries/possession.",
        isDefault: true
      }
    ]
  },
  property_nuisance_cessation: {
    documentTitle: "Statement of Claim for Cessation of Abnormal Inconvenience (Nuisance)",
    jurisdictionText: "Art. 1225 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff (Injured Party)",
      respondent: "Defendant (Source of Nuisance)"
    },
    facts: [
      {
        id: "fact_nature_inconvenience",
        label: "The Disturbance",
        legalText: "The Defendant's actions involve [Noise/Smell/Vibration] originating from [Source].",
        citation: "Civ. Code Art. 1225",
        autoEvidence: []
      },
      {
        id: "fact_abnormal_degree",
        label: "The Disturbance",
        legalText: "The inconvenience caused by the Defendant is abnormal and exceeds the level normally expected of the neighborhood.",
        citation: "",
        autoEvidence: ["WitnessAffidavitsNuisance", "PhotosVideoEvidence"]
      },
      {
        id: "fact_notice_to_stop",
        label: "Knowledge and Refusal",
        legalText: "The Defendant was formally notified of the inconvenience but failed to take corrective measures.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_order_cessation",
        text: "Judgment ordering the Defendant to immediately cease the source of the abnormal inconvenience.",
        isDefault: true
      },
      {
        id: "relief_damages_past",
        text: "Order payment of damages suffered by the Plaintiff prior to the cessation.",
        citation: "Civ. Code Art. 1226",
        isDefault: false
      }
    ]
  },
  property_servitude_right_of_way: {
    documentTitle: "Statement of Claim for Establishment of Servitude (Right of Way)",
    jurisdictionText: "Art. 1332 of the Civil Code.",
    partyTitles: {
      applicant: "Dominant Tenement (Applicant)",
      respondent: "Servient Tenement (Respondent)"
    },
    facts: [
      {
        id: "fact_property_enclaved",
        label: "Enclave Status (Necessity)",
        legalText: "The Applicant's property has no adequate access to a public road.",
        citation: "Civ. Code Art. 1332",
        autoEvidence: ["SurveyorsReport", "SitePlan"]
      },
      {
        id: "fact_no_other_means",
        label: "Enclave Status (Necessity)",
        legalText: "There are no other practical or less onerous routes available for access.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_least_onerous",
        label: "Requested Route",
        legalText: "The requested right of way across the Respondent's land is the route least detrimental to the Servient Tenement (Respondent).",
        citation: "Civ. Code Art. 1334",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_establish_servitude",
        text: "Judgment establishing a Servitude of Right of Way across the Respondent's property.",
        isDefault: true
      },
      {
        id: "relief_compensation_fee",
        text: "Order the Dominant Tenement to pay fair compensation to the Servient Tenement for the damage caused by the passage.",
        citation: "Civ. Code Art. 1333",
        isDefault: false
      }
    ]
  },
  property_possessory_disturbance: {
    documentTitle: "Statement of Claim for Cessation of Disturbance of Possession",
    jurisdictionText: "Art. 1148 of the Civil Code.",
    partyTitles: {
      applicant: "Plaintiff (Possessor)",
      respondent: "Defendant (Disturber)"
    },
    facts: [
      {
        id: "fact_actual_possession",
        label: "Fact of Possession",
        legalText: "The Plaintiff was in peaceful and continuous possession of the property/right.",
        citation: "Civ. Code Art. 1140",
        autoEvidence: []
      },
      {
        id: "fact_disturbance_act",
        label: "Disturbance Act",
        legalText: "The Defendant has performed specific actions that interfere with the Plaintiff's peaceful possession (e.g., removing fences, obstructing access).",
        citation: "Civ. Code Art. 1148",
        autoEvidence: ["WitnessAffidavitsNuisance", "PhotosVideoEvidence"]
      },
      {
        id: "fact_timeliness",
        label: "Disturbance Act",
        legalText: "This claim is filed within two years of the disturbance.",
        citation: "Civ. Code Art. 1149",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_stop_disturbance",
        text: "Order the Defendant to cease all acts of disturbance.",
        isDefault: true
      },
      {
        id: "relief_restore_status",
        text: "Order the restoration of the property to the state it was in before the disturbance.",
        isDefault: true
      }
    ]
  },
  ip_trademark_infringement: {
    documentTitle: "Statement of Claim for Trademark Infringement and Damages",
    jurisdictionText: "Art. 18 of Trademark Proclamation No. 501/2006.",
    partyTitles: {
      applicant: "Plaintiff (Trademark Owner)",
      respondent: "Defendant (Infringer)"
    },
    facts: [
      {
        id: "fact_tm_registration",
        label: "Right of Ownership",
        legalText: "The Plaintiff is the registered owner of Trademark No. [Number] for goods/services in Class [Class].",
        citation: "Proclamation 501/2006 Art. 11",
        autoEvidence: ["CertificateOfRegistrationEIPO"]
      },
      {
        id: "fact_unauthorized_use",
        label: "Infringement Act",
        legalText: "The Defendant is using an identical or confusingly similar mark in the course of trade.",
        citation: "Proclamation 501/2006 Art. 18",
        autoEvidence: ["ProductSampleSpecimen", "MarketSurveyAffidavit"]
      },
      {
        id: "fact_consumer_confusion",
        label: "Infringement Act",
        legalText: "The Defendant's use is likely to cause confusion among the relevant consumers.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_permanent_injunction",
        text: "Judgment granting a permanent injunction restraining the Defendant from further use of the infringing mark.",
        isDefault: true
      },
      {
        id: "relief_damages_ip",
        text: "Order payment of damages suffered by the Plaintiff due to the infringement.",
        isDefault: true
      },
      {
        id: "relief_destruction_goods",
        text: "Order the destruction of all infringing materials and goods.",
        isDefault: false
      }
    ]
  },
  ip_patent_infringement: {
    documentTitle: "Statement of Claim for Patent Infringement and Compensation",
    jurisdictionText: "Art. 21 of Patent Proclamation No. 123/1995.",
    partyTitles: {
      applicant: "Plaintiff (Patent Holder)",
      respondent: "Defendant (Infringer)"
    },
    facts: [
      {
        id: "fact_patent_validity",
        label: "Right of Ownership",
        legalText: "The Plaintiff holds Patent No. [Number], which is valid and in force.",
        citation: "Proclamation 123/1995 Art. 6",
        autoEvidence: ["CertificateOfRegistrationEIPO", "TechnicalExpertReport"]
      },
      {
        id: "fact_unauthorized_manufacture",
        label: "Infringement Act",
        legalText: "The Defendant is manufacturing/selling a product that falls within the scope of the patent claims.",
        citation: "Proclamation 123/1995 Art. 21",
        autoEvidence: []
      },
      {
        id: "fact_commercial_loss",
        label: "Damage",
        legalText: "The infringement has resulted in direct commercial loss of [Amount] due to lost sales.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_stop_manufacture",
        text: "Judgment ordering the Defendant to cease all acts of manufacturing and selling the infringing product.",
        isDefault: true
      },
      {
        id: "relief_compensation_royalty",
        text: "Order payment of compensation calculated based on a reasonable royalty fee.",
        citation: "Proclamation 123/1995 Art. 21",
        isDefault: true
      },
      {
        id: "relief_seize_equipment",
        text: "Order the seizure and disposal of the machinery primarily used to produce the infringing articles.",
        isDefault: false
      }
    ]
  },
  ip_copyright_infringement: {
    documentTitle: "Statement of Claim for Copyright Violation and Statutory Damages",
    jurisdictionText: "Art. 38 of Copyright and Neighboring Rights Proclamation No. 410/2004.",
    partyTitles: {
      applicant: "Plaintiff (Author/Creator)",
      respondent: "Defendant (Pirate/Reproducer)"
    },
    facts: [
      {
        id: "fact_original_work",
        label: "Right of Authorship",
        legalText: "The Plaintiff is the author of the original work [Title] published/fixed on [Date].",
        citation: "Proclamation 410/2004 Art. 38",
        autoEvidence: []
      },
      {
        id: "fact_unauthorized_reproduction",
        label: "Infringement Act",
        legalText: "The Defendant has reproduced, distributed, or publicly performed the work without authorization.",
        citation: "Proclamation 410/2004 Art. 9",
        autoEvidence: ["ProductSampleSpecimen"]
      },
      {
        id: "fact_commercial_scale",
        label: "Infringement Act",
        legalText: "The infringement was committed on a commercial scale.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_statutory_damages",
        text: "Order payment of statutory damages as provided by law, or actual damages suffered.",
        isDefault: true
      },
      {
        id: "relief_injunction_copyright",
        text: "Order a final injunction prohibiting further unauthorized use.",
        isDefault: true
      },
      {
        id: "relief_impoundment",
        text: "Order the impoundment of all copies of the infringing work.",
        isDefault: false
      }
    ]
  },
  app_ip_interlocutory_injunction: {
    documentTitle: "Application for Interlocutory Injunction to Restrain Infringement",
    jurisdictionText: "Art. 154 of the Civil Procedure Code (General Injunction) and specific IP enabling clauses.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_prima_facie_case",
        label: "Urgency & Harm",
        legalText: "The Applicant has established a strong prima facie case of infringement.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_irreparable_harm",
        label: "Urgency & Harm",
        legalText: "The continued infringement will cause irreparable harm to the Applicant's market share and reputation.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_balance_convenience",
        label: "Urgency & Harm",
        legalText: "The balance of convenience favors granting the injunction (i.e., less harm to stop than to continue).",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_temporary_restraint",
        text: "Order the Respondent to temporarily cease all manufacture, sale, or distribution of the infringing goods pending final judgment.",
        isDefault: true
      }
    ]
  },
  app_ip_anton_piller: {
    documentTitle: "Application for Preservation and Seizure of Evidence",
    jurisdictionText: "Art. 154 of the Civil Procedure Code (Inherent Power) & Art. 10 of Proclamation 410/2004.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_concealment_risk",
        label: "Preservation of Evidence",
        legalText: "There is a serious risk that the Defendant will destroy or conceal crucial evidence of infringement (e.g., molds, accounts).",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_specific_evidence",
        label: "Preservation of Evidence",
        legalText: "The Applicant has specific knowledge of the location and nature of the evidence.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_seize_evidence",
        text: "Order a court officer to enter the Respondent's premises to seize and preserve evidence relating to the infringement.",
        isDefault: true
      }
    ]
  },
  status_judicial_interdiction: {
    documentTitle: "Petition for Judicial Interdiction and Appointment of Curator",
    jurisdictionText: "Art. 339 of the Civil Code.",
    partyTitles: {
      applicant: "Petitioner (Relative/Interested Party)",
      respondent: "Interdicted Person (Respondent)"
    },
    facts: [
      {
        id: "fact_incapacity_medical",
        label: "Incapacity",
        legalText: "The Respondent suffers from a permanent mental illness/disability rendering them unable to manage their own affairs.",
        citation: "Civ. Code Art. 339",
        autoEvidence: ["MedicalBoardCertificate"]
      },
      {
        id: "fact_risk_of_loss",
        label: "Incapacity",
        legalText: "The Respondent's incapacity exposes their property/rights to imminent loss or dissipation.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_relationship_claim",
        label: "Necessity",
        legalText: "The Petitioner is a close relative of the Respondent and has a legal interest in protecting their affairs.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_declare_incapacity", text: "Judgment declaring the Respondent to be judicially interdicted.", isDefault: true },
      { id: "relief_appoint_curator", text: "Order the appointment of the Petitioner (or another suitable person) as Curator to the Respondent.", citation: "Civ. Code Art. 343", isDefault: true }
    ]
  },
  status_correction_civil_record: {
    documentTitle: "Petition for Correction of Civil Record (Birth Date/Name)",
    jurisdictionText: "Art. 418 of the Civil Procedure Code (Non-Contentious Procedure).",
    partyTitles: {
      applicant: "Petitioner",
      respondent: "Concerned Public Body (e.g., VERA)"
    },
    facts: [
      {
        id: "fact_document_error",
        label: "The Error",
        legalText: "The Petitioner's [Birth Certificate/ID] contains an error, stating the date of birth is [Incorrect Date] instead of [Correct Date].",
        citation: "",
        autoEvidence: ["BirthMarriageCertificateVERA", "IdentityCard"]
      },
      {
        id: "fact_proof_of_correctness",
        label: "The Error",
        legalText: "The correct information is proven by the attached [Secondary Document].",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_administrative_refusal",
        label: "Procedural Prerequisite",
        legalText: "The relevant administrative body has been requested to correct the error but has failed or refused to do so.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_order_correction", text: "Judgment ordering the Vital Events Registration Agency (VERA) to correct the record to state the Petitioner's name/date of birth as [Correct Information].", isDefault: true }
    ]
  },
  status_declaration_of_absence: {
    documentTitle: "Petition for Declaration of Absence and Administration of Property",
    jurisdictionText: "Art. 154 and 158 of the Civil Code.",
    partyTitles: {
      applicant: "Petitioner (Relative/Interested Party)",
      respondent: "The Absent Person (Named Respondent)"
    },
    facts: [
      {
        id: "fact_absence_duration",
        label: "Fact of Absence",
        legalText: "The named person, [Name], has disappeared and not been heard from for more than five years.",
        citation: "Civ. Code Art. 158",
        autoEvidence: []
      },
      {
        id: "fact_domicile_proof",
        label: "Fact of Absence",
        legalText: "The person's last known domicile was [Address].",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_public_notice_given",
        label: "Publicity",
        legalText: "A public notice requesting information on the absent person was published in accordance with the law.",
        citation: "",
        autoEvidence: ["PublicNoticeOfAbsence"]
      }
    ],
    reliefs: [
      { id: "relief_declare_absence", text: "Judgment formally declaring the person to be absent.", isDefault: true },
      { id: "relief_appoint_administrator", text: "Order the appointment of an administrator to provisionally manage the property of the absent person.", isDefault: true }
    ]
  },
  app_status_provisional_curator: {
    documentTitle: "Application for Appointment of Provisional Curator/Administrator",
    jurisdictionText: "Art. 154 of the Civil Procedure Code (Injunction) & Civ. Code Art. 154/343.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_immediate_necessity",
        label: "Urgency",
        legalText: "Due to the immediate inability of the person to act, their property is at risk of misuse or loss.",
        citation: "",
        autoEvidence: []
      },
      {
        id: "fact_petition_pending",
        label: "Urgency",
        legalText: "A main petition for Interdiction/Absence has been filed and is currently pending.",
        citation: "",
        autoEvidence: []
      }
    ],
    reliefs: [
      { id: "relief_appoint_provisional", text: "Order the immediate, temporary appointment of a named person to act as Provisional Curator/Administrator.", isDefault: true }
    ]
  },
  app_status_lift_interdiction: {
    documentTitle: "Petition for Termination of Judicial Interdiction",
    jurisdictionText: "Art. 358 of the Civil Code.",
    partyTitles: {
      applicant: "Petitioner",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_cause_ceased",
        label: "Cessation of Cause",
        legalText: "The medical/physical condition that necessitated the interdiction has ceased, and the interdicted person has regained capacity.",
        citation: "Civ. Code Art. 358",
        autoEvidence: ["MedicalBoardCertificate"]
      }
    ],
    reliefs: [
      { id: "relief_terminate_interdiction", text: "Judgment terminating the judicial interdiction and restoring full legal capacity to the individual.", isDefault: true }
    ]
  },
  tax_objection_admin_review: {
    documentTitle: "Notice of Objection to Tax Assessment",
    jurisdictionText: "Art. 54 of the Federal Tax Administration Proclamation (FTAP) No. 983/2016.",
    partyTitles: {
      applicant: "Applicant (Taxpayer)",
      respondent: "Respondent (Ministry of Revenue Branch Office)"
    },
    facts: [
      {
        id: "fact_assessment_received",
        label: "Procedural Compliance (Time Limit)",
        legalText: "The Tax Assessment Notice was received on [Date].",
        citation: "FTAP Art. 54",
        autoEvidence: []
      },
      {
        id: "fact_objection_timely",
        label: "Procedural Compliance (Time Limit)",
        legalText: "This Objection is filed within the required 21 days of receipt.",
        citation: "FTAP Art. 54",
        autoEvidence: []
      },
      {
        id: "fact_erroneous_income_calc",
        label: "Grounds for Error",
        legalText: "The MoR erred by failing to recognize [Specific Deduction/Exemption].",
        autoEvidence: ["AccountingRecords", "ExternalAuditReport"]
      },
      {
        id: "fact_estimated_basis_wrong",
        label: "Grounds for Error",
        legalText: "The assessment was based on an estimate, and the actual gross income is proven by the attached records.",
        autoEvidence: []
      }
    ],
    reliefs: [
      {
        id: "relief_revoke_assessment",
        text: "Order the Ministry of Revenue to revoke the current assessment.",
        isDefault: true
      },
      {
        id: "relief_recalculate_tax",
        text: "Order the Ministry to re-calculate the tax liability to [Correct Amount].",
        isDefault: true
      }
    ]
  },
  tax_appeal_ftac: {
    documentTitle: "Petition of Appeal to the Federal Tax Appeal Commission",
    jurisdictionText: "Art. 88 of the Federal Tax Administration Proclamation (FTAP).",
    partyTitles: {
      applicant: "Appellant (Taxpayer)",
      respondent: "Respondent (Ministry of Revenue)"
    },
    facts: [
      {
        id: "fact_objection_rejected",
        label: "Prerequisites",
        legalText: "The MoR issued a decision rejecting the Taxpayer's Objection on [Date]."
      },
      {
        id: "fact_50_percent_deposit",
        label: "Prerequisites",
        legalText: "The Taxpayer has deposited 50% of the disputed tax amount (excluding penalties/interest).",
        citation: "FTAP Art. 88",
        autoEvidence: ["PaymentReceiptsTaxCustoms"]
      },
      {
        id: "fact_mof_error",
        label: "Grounds for Appeal",
        legalText: "The MoR's internal review decision is erroneous because [Specific Reason, e.g., misapplication of VAT Proclamation 1341/2024]."
      }
    ],
    reliefs: [
      {
        id: "relief_ftac_overrule",
        text: "Judgment overturning the MoR's decision and adjusting the tax liability.",
        isDefault: true
      },
      {
        id: "relief_ftac_remand",
        text: "Order the MoR to undertake a new assessment using correct legal principles.",
        isDefault: false
      }
    ]
  },
  customs_claim_for_refund: {
    documentTitle: "Application to the Customs Commission for Refund of Duty",
    jurisdictionText: "Provisions of the Customs Proclamation No. 859/2014 concerning refunds.",
    partyTitles: {
      applicant: "Applicant (Importer/Exporter)",
      respondent: "Respondent (Customs Commission)"
    },
    facts: [
      {
        id: "fact_duty_paid",
        label: "Overpayment",
        legalText: "The Applicant paid Customs Duty of [Amount] for goods imported/exported under Declaration No. [SAD No.]."
      },
      {
        id: "fact_grounds_for_refund",
        label: "Overpayment",
        legalText: "The duty was refundable because [e.g., the goods were defective and re-exported, or the valuation was miscalculated].",
        autoEvidence: ["ImportExportDeclarationSAD", "PaymentReceiptsTaxCustoms"]
      },
      {
        id: "fact_refusal_to_pay",
        label: "Commission Refusal",
        legalText: "The Customs Commission has refused or failed to process the refund application."
      }
    ],
    reliefs: [
      {
        id: "relief_order_refund",
        text: "Order the Customs Commission to refund the overpaid duty amount of [Amount].",
        isDefault: true
      }
    ]
  },
  app_tax_stay_of_execution: {
    documentTitle: "Application for Stay of Execution of Tax Payment",
    jurisdictionText: "Art. 154 of the Civil Procedure Code (Injunction) applied to tax execution.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_execution_pending",
        label: "Grounds for Stay",
        legalText: "The MoR has begun execution procedures (e.g., freezing bank accounts) to collect the disputed tax."
      },
      {
        id: "fact_irreparable_harm",
        label: "Grounds for Stay",
        legalText: "Forcing payment of the full amount now would render the company insolvent, causing irreparable harm to the business."
      },
      {
        id: "fact_prima_facie",
        label: "Grounds for Stay",
        legalText: "The Taxpayer has a strong likelihood of success on appeal."
      }
    ],
    reliefs: [
      {
        id: "relief_suspend_payment",
        text: "Order the Ministry of Revenue to suspend the execution of the outstanding tax liability until the final decision of the FTAC/Court.",
        isDefault: true
      }
    ]
  },
  app_tax_adr_request: {
    documentTitle: "Application for Referral to Tax Dispute Alternative Resolution",
    jurisdictionText: "Tax Administration Proclamations often include provisions allowing for settlement or ADR.",
    partyTitles: {
      applicant: "Applicant",
      respondent: "Respondent"
    },
    facts: [
      {
        id: "fact_willingness_to_settle",
        label: "Grounds for ADR",
        legalText: "Both the Taxpayer and the MoR have indicated a willingness to resolve the dispute through mutual agreement."
      },
      {
        id: "fact_complex_facts",
        label: "Grounds for ADR",
        legalText: "The dispute involves complex factual issues that would be better resolved through expert negotiation than court litigation."
      }
    ],
    reliefs: [
      {
        id: "relief_refer_to_adr",
        text: "Order the establishment of a joint committee or referral to a mediator to reach a binding settlement agreement.",
        isDefault: true
      }
    ]
  },
  tort_general_negligence_claim: {
    documentTitle: "Statement of Claim for Extra-Contractual Damages (Negligence)",
    jurisdictionText: "Arts. 2028-2061 of the Civil Code of 1960 (Liability arising out of fault).",
    partyTitles: {
      applicant: "Plaintiff (ከሳሽ)",
      respondent: "Defendant (ተከሳሽ)"
    },
    facts: [
      {
        id: "fact_fault_negligence_omission",
        label: "The Causal Event & Negligence",
        legalText: "The Defendant committed a negligent act or omission that violated the general duty of care (Art. 2028).",
        citation: "Civil Code Art. 2028",
        autoEvidence: ["PoliceAccidentReport", "witness_statements"]
      },
      {
        id: "fact_traffic_violation",
        label: "The Causal Event & Negligence",
        legalText: "The fault arose from a specific breach of traffic laws or other legal/regulatory duty of caution.",
        citation: "Civil Code Art. 2029",
        autoEvidence: ["PoliceAccidentReport"]
      },
      {
        id: "fact_liability_for_another_person",
        label: "The Causal Event & Negligence",
        legalText: "The Defendant is liable for the act of a minor, apprentice, or employee under their supervision or control (Art. 2085 et seq.).",
        citation: "Civil Code Art. 2085",
        autoEvidence: ["witness_statements", "PoliceAccidentReport"]
      },
      {
        id: "fact_bodily_injury_damage",
        label: "The Damage Sustained",
        legalText: "The Plaintiff sustained bodily injury and incurred expenses for treatment, hospitalization, and rehabilitation.",
        citation: "Civil Code Art. 2035",
        autoEvidence: ["MedicalExpenseReceipts", "DoctorAssessment"]
      },
      {
        id: "fact_property_damage_loss",
        label: "The Damage Sustained",
        legalText: "The Plaintiff's property (e.g., vehicle, structure) was damaged or destroyed, requiring repair or replacement.",
        citation: "Civil Code Art. 2035",
        autoEvidence: ["PropertyValuationReport", "PoliceAccidentReport"]
      },
      {
        id: "fact_moral_damage_pain",
        label: "The Damage Sustained",
        legalText: "The Plaintiff suffered moral damage, including pain and suffering, emotional distress, and loss of amenity.",
        citation: "Civil Code Art. 2036",
        autoEvidence: ["DoctorAssessment", "witness_statements"]
      },
      {
        id: "fact_direct_causation",
        label: "Causation & Foreseeability",
        legalText: "There is a direct and certain causal link between the Defendant's fault and the damage sustained by the Plaintiff (Art. 2034).",
        citation: "Civil Code Art. 2034",
        autoEvidence: ["PoliceAccidentReport", "DoctorAssessment"]
      },
      {
        id: "fact_mitigation_of_damages",
        label: "Causation & Foreseeability",
        legalText: "The Plaintiff has taken reasonable steps to mitigate and reduce the extent of the damages sustained.",
        citation: "Civil Code Art. 2043",
        autoEvidence: ["MedicalExpenseReceipts", "PropertyValuationReport"]
      }
    ],
    reliefs: [
      {
        id: "relief_medical_expenses",
        text: "To order the Defendant to pay all costs incurred for medical treatment, hospital stay, and rehabilitation, in the amount of Birr [AMOUNT].",
        isDefault: true
      },
      {
        id: "relief_property_repair_cost",
        text: "To order the Defendant to pay the cost of repairing/replacing the damaged property, in the amount of Birr [AMOUNT].",
        isDefault: true
      },
      {
        id: "relief_lost_earnings",
        text: "To order the Defendant to pay compensation for lost earnings and future loss of income due to permanent incapacity, in the amount of Birr [AMOUNT].",
        isDefault: true
      },
      {
        id: "relief_moral_damages",
        text: "To award the Plaintiff compensation for moral damage (pain, suffering, and distress) in the amount of Birr [AMOUNT].",
        isDefault: true
      }
    ]
  },
  tort_strict_liability_buildings: {
    documentTitle: "Statement of Claim for Damages (Strict Liability for Buildings)",
    jurisdictionText: "Art. 2068 of the Civil Code of 1960 (Liability of the owner of a building).",
    partyTitles: {
      applicant: "Plaintiff (ከሳሽ)",
      respondent: "Owner of the Building (የህንፃው ባለቤት)"
    },
    facts: [
      {
        id: "fact_building_owner_status",
        label: "Basis for Strict Liability",
        legalText: "The Respondent is the owner of the building or structure from which the damage originated.",
        citation: "Civil Code Art. 2068",
        autoEvidence: []
      },
      {
        id: "fact_damage_caused_by_ruin",
        label: "Basis for Strict Liability",
        legalText: "The damage was caused by the total or partial ruin of the building, which was due to lack of repair or a defect in construction.",
        citation: "Civil Code Art. 2068",
        autoEvidence: ["witness_statements", "PropertyValuationReport"]
      },
      {
        id: "fact_bodily_injury_building",
        label: "Damage & Causation",
        legalText: "The Plaintiff sustained bodily injury as a direct result of the building's ruin.",
        citation: "Civil Code Art. 2068 & 2035",
        autoEvidence: ["MedicalExpenseReceipts", "DoctorAssessment"]
      },
      {
        id: "fact_property_damage_building",
        label: "Damage & Causation",
        legalText: "The Plaintiff's property was damaged as a direct result of the building's ruin.",
        citation: "Civil Code Art. 2068 & 2035",
        autoEvidence: ["PropertyValuationReport"]
      }
    ],
    reliefs: [
      {
        id: "relief_building_repair_cost",
        text: "To order the Defendant to pay the cost of repairing the resulting property damage, in the amount of Birr [AMOUNT].",
        isDefault: true
      },
      {
        id: "relief_building_medical_expenses",
        text: "To order the Defendant to pay all costs incurred for bodily injury and treatment, in the amount of Birr [AMOUNT].",
        isDefault: true
      }
    ]
  },
  admin_appeal_judicial_review: {
    documentTitle: "Petition for Judicial Review of Administrative Decision (የአስተዳደር ውሳኔ በፍርድ ቤት እንዲታይ አቤቱታ)",
    jurisdictionText: "Federal Administrative Procedure Proclamation No. 1183/2020, Art. 51 (የፌደራል የአስተዳደር ሥነ-ሥርዓት አዋጅ ቁጥር ፩ሺ፩፻፹፫/፪ሺ፲፪፣ አንቀጽ ፶፩).",
    partyTitles: {
      applicant: "Petitioner / Appellant (አቤቱታ አቅራቢ/ይግባኝ ባይ)",
      respondent: "Respondent Agency (መልስ ሰጪ ተቋም)"
    },
    facts: [
      {
        id: "fact_final_decision_issued",
        label: "Jurisdictional Prerequisites (የዳኝነት ቅድመ ሁኔታዎች)",
        legalText: "The Respondent Agency issued a final, binding administrative decision affecting the rights or interests of the Petitioner on [Date]. (መልስ ሰጪው ተቋም የመጨረሻ የአስተዳደር ውሳኔ አሳልፏል።)",
        citation: "Proc. 1183/2020 Art. 48(1)",
        autoEvidence: ["FinalAdminDecision"]
      },
      {
        id: "fact_exhausted_remedies",
        label: "Jurisdictional Prerequisites (የዳኝነት ቅድመ ሁኔታዎች)",
        legalText: "The Petitioner has exhausted all available administrative remedies within the Agency, or the Agency failed to render a decision on the complaint within the legal timeframe. (አቤቱታ አቅራቢው በ ተቋሙ ያለውን የውስጥ ቅሬታ የመፍቻ መንገድ ተጠቅሟል ወይም ተቋሙ በጊዜ ውሳኔ መስጠት አልቻለም።)",
        citation: "Proc. 1183/2020 Art. 48(2)",
        autoEvidence: ["InternalRemedyExhaustion"]
      },
      {
        id: "fact_petition_is_timely",
        label: "Jurisdictional Prerequisites (የዳኝነት ቅድመ ሁኔታዎች)",
        legalText: "This petition is filed within the thirty (30) day period prescribed from the date of notification of the decision. (ይህ አቤቱታ ውሳኔው ከደረሰበት ቀን አንስቶ በሰላሳ (፴) ቀን ውስጥ የቀረበ ነው።)",
        citation: "Proc. 1183/2020 Art. 51(1)",
        autoEvidence: ["DecisionNotificationProof"]
      },
      {
        id: "fact_procedural_violation_hearing",
        label: "Grounds for Annulment (የውሳኔው መሻር ምክንያቶች)",
        legalText: "The decision was made without affording the Petitioner an adequate opportunity for a proper hearing (Art. 34) or without considering relevant evidence. (ውሳኔው አቤቱታ አቅራቢው በአግባቡ ሳይሰማ ቀርቷል (አንቀጽ ፴፬) ወይም አግባብነት ያላቸው ማስረጃዎች ሳይታዩ ቀርቷል።)",
        citation: "Proc. 1183/2020 Art. 34",
        autoEvidence: []
      },
      {
        id: "fact_substantive_error_of_law",
        label: "Grounds for Annulment (የውሳኔው መሻር ምክንያቶች)",
        legalText: "The decision is based on a fundamental error of law, misinterpreting or misapplying the governing Proclamation, Regulation, or Directive. (ውሳኔው ህጉን በመሳት፣ ወይም አዋጁን፣ ደንቡን ወይም መመሪያውን በተሳሳተ መንገድ በመተርጎም የተሰጠ ነው።)",
        citation: "Proc. 1183/2020 Art. 52(1)(a)",
        autoEvidence: ["FinalAdminDecision"]
      },
      {
        id: "fact_failure_to_state_reason",
        label: "Grounds for Annulment (የውሳኔው መሻር ምክንያቶች)",
        legalText: "The Agency failed to provide an adequate and reasoned decision, thus violating the Petitioner's right to a reasoned decision (Art. 37). (ተቋሙ አቤቱታ አቅራቢው ምክንያት ያለው ውሳኔ የማግኘት መብቱን በመጣስ በቂ እና ምክንያት ያለበት ውሳኔ መስጠት ተስኖታል።)",
        citation: "Proc. 1183/2020 Art. 37",
        autoEvidence: ["FinalAdminDecision"]
      },
      {
        id: "fact_abuse_of_discretion",
        label: "Grounds for Annulment (የውሳኔው መሻር ምክንያቶች)",
        legalText: "The Agency abused its discretionary power by acting outside the scope of its legal mandate or for an improper purpose (Art. 39). (ተቋሙ ሕጋዊ ሥልጣኑን ያለአግባብ በመጠቀም، ወይም ለተገቢ ላልሆነ ዓላማ ውሳኔ በመስጠት የሕግ አቅሙን አላግባብ ተጠቅሟል።)",
        citation: "Proc. 1183/2020 Art. 39",
        autoEvidence: ["FinalAdminDecision"]
      }
    ],
    reliefs: [
      {
        id: "relief_quash_decision",
        text: "To quash and annul the decision of the Respondent Agency. (የመልስ ሰጪውን ተቋም ውሳኔ ሙሉ በሙሉ እንዲሻር።)",
        isDefault: true
      },
      {
        id: "relief_remand_for_revision",
        text: "To order the Administrative Agency to revise or reconsider its decision by rectifying the shortcomings identified by the Court. (ፍርድ ቤቱ ባገኘው ክፍተት መሰረት ተቋሙ ውሳኔውን እንዲያስተካክል ወይም እንደገና እንዲያየው እንዲታዘዝ።)",
        isDefault: true
      },
      {
        id: "relief_damages_fault",
        text: "To order the Respondent Agency to pay compensation for damages incurred as a result of the fault committed through the administrative decision (Art. 54). (በአስተዳደራዊ ውሳኔው በደረሰው ስህተት ምክንያት ለደረሰበት ጉዳት ካሳ እንዲከፍለው።)",
        isDefault: false
      }
    ]
  },
  admin_review_directive_legality: {
    documentTitle: "Petition for Judicial Review of Legality of a Directive (የአስተዳደር መመሪያ ሕጋዊነት በፍርድ ቤት እንዲታይ አቤቱታ)",
    jurisdictionText: "Federal Administrative Procedure Proclamation No. 1183/2020, Art. 49 (የፌደራል የአስተዳደር ሥነ-ሥርዓት አዋጅ ቁጥር ፩ሺ፩፻፹፫/፪ሺ፲፪፣ አንቀጽ ፵፱).",
    partyTitles: {
      applicant: "Petitioner (አቤቱታ አቅራቢ)",
      respondent: "Respondent Agency (መልስ ሰጪ ተቋም)"
    },
    facts: [
      {
        id: "fact_directive_unlawful_delegation",
        label: "Directive Authority and Compliance (የመመሪያ ስልጣን እና ተገዢነት)",
        legalText: "The Directive was issued without proper delegation of power by law, or it exceeds the scope of the delegating Proclamation. (መመሪያው በሕግ ተገቢው ስልጣን ሳይሰጥ የተሰጠ ነው፣ ወይም ከአዋጁ ወሰን በላይ አልፏል።)",
        citation: "Proc. 1183/2020 Art. 49(2)(a)",
        autoEvidence: ["AgencyDirectiveCopy"]
      },
      {
        id: "fact_directive_violates_constitution",
        label: "Directive Authority and Compliance (የመመሪያ ስልጣን እና ተገዢነት)",
        legalText: "The Directive violates the Constitution or other superior law. (መመሪያው ሕገ-መንግስትን ወይም ሌላ የላቀ ህግን ይጥሳል።)",
        citation: "Proc. 1183/2020 Art. 49(2)(a)",
        autoEvidence: ["AgencyDirectiveCopy"]
      },
      {
        id: "fact_directive_procedural_flaw",
        label: "Directive Authority and Compliance (የመመሪያ ስልጣን እና ተገዢነት)",
        legalText: "The Directive was adopted without following the mandatory procedure (e.g., public notice, soliciting comments, or FAG consultation) required by law (Arts. 7-12). (መመሪያው ሲወጣ በህግ የተደነገገው የግዴታ ሂደት (ለምሳሌ የህዝብ አስተያየት መጠየቅ ወይም ጠቅላይ ዓቃቤ ህግን ማማከር) ሳይከተል ቀርቷൽ (አንቀጽ ፯-፲፪)።)",
        citation: "Proc. 1183/2020 Art. 7-12",
        autoEvidence: ["AgencyDirectiveCopy"]
      },
      {
        id: "fact_directive_affects_rights",
        label: "Injury to Interest (ጥቅም መጎዳት)",
        legalText: "The Directive directly affects the Petitioner's rights or interests. (መመሪያው የአቤቱታ አቅራቢውን መብት ወይም ጥቅም በቀጥታ ይነካል።)",
        citation: "Proc. 1183/2020 Art. 48(1)",
        autoEvidence: ["AgencyDirectiveCopy"]
      }
    ],
    reliefs: [
      {
        id: "relief_invalidate_directive",
        text: "To invalidate the Directive in whole or in part. (መመሪያው ሙሉ በሙሉ ወይም በከፊል ውድቅ እንዲደረግለት።)",
        isDefault: true
      },
      {
        id: "relief_order_compliance",
        text: "To order the Agency to rectify the procedural flaw and readopt the Directive in compliance with the law. (ተቋሙ የሥነ-ሥርዓት ጉድለቱን እንዲያስተካክል እና መመሪያውን በሕጉ መሠረት ዳግም እንዲያወጣ ትዕዛዝ እንዲሰጥ።)",
        isDefault: false
      }
    ]
  },
  comm_restitution_nonpayment: {
    documentTitle: "Statement of Claim for Payment on a Negotiable Instrument (በንግድ መሣሪያ ላይ የክፍያ ጥያቄ አቤቱታ)",
    jurisdictionText: "Commercial Code Proclamation No. 1243/2021, Arts. 715 et seq. (የንግድ ሕግ አዋጅ ቁጥር ፲፪፻፵፫/፪ሺ፲፫፣ አንቀጽ ፯፻፲፭ እና ተከታዮቹ).",
    partyTitles: {
      applicant: "Holder/Plaintiff (መሣሪያውን የያዘ/ከሳሽ)",
      respondent: "Drawee/Drawer/Endorser/Defendant (ከፋይ/አዋጪ/ተላልፊ/ተከሳሽ)"
    },
    facts: [
      {
        id: "fact_instrument_valid_form",
        label: "The Instrument & Validity (የንግድ መሣሪያው እና ሕጋዊነት)",
        legalText: "The instrument (Cheque/Note/Bill) fulfills all formal and essential requirements prescribed by the Code and is valid. (መሣሪያው በሕጉ የተደነገጉትን የቅርጽና አስፈላጊነት መስፈርቶች ያሟላል።)",
        citation: "Comm. Code Arts. 735/823/827",
        autoEvidence: ["NotarizedCheque"]
      },
      {
        id: "fact_due_date_lapsed",
        label: "The Instrument & Validity (የንግድ መሣሪያው እና ሕጋዊነት)",
        legalText: "The instrument was presented for payment on the due date/within the legal period, and payment was refused. (መሣሪያው በተወሰነው ቀን/በሕግ በተቀመጠው ጊዜ ለክፍያ ቀርቧል፣ ነገር ግን ተከስቷል።)",
        citation: "Comm. Code Art. 760",
        autoEvidence: ["NotarizedCheque"]
      },
      {
        id: "fact_protest_duly_filed",
        label: "The Instrument & Validity (የንግድ መሣሪያው እና ሕጋዊነት)",
        legalText: "A Certificate of Protest/Non-Payment was duly obtained and registered to protect the Plaintiff's right of recourse against endorsers and other parties. (በተላልፊዎች እና በሌሎች ላይ ያለውን የመመለስ መብት ለማስጠበቅ የክፍያ እምቢታ ማረጋገጫ በሕግ መሠረት ተመዝግቧል።)",
        citation: "Comm. Code Art. 763",
        autoEvidence: ["ProtestCertificate"]
      },
      {
        id: "fact_drawer_liability",
        label: "Liability & Recourse (ኃላፊነት እና የማስመለስ ጥያቄ)",
        legalText: "The Defendant, as the Drawer/Maker, is primarily liable for non-payment of the instrument. (ተከሳሹ እንደ አዋጪ/አስመጪ የመሣሪያውን ክፍያ ባለመፈፀም ቀዳሚ ኃላፊነት አለበት።)",
        citation: "Comm. Code Art. 759/824",
        autoEvidence: ["NotarizedCheque"]
      },
      {
        id: "fact_endorser_recourse",
        label: "Liability & Recourse (ኃላፊነት እና የማስመለስ ጥያቄ)",
        legalText: "The Defendant, as an Endorser, is liable to the Plaintiff through the exercise of the right of recourse. (ተከሳሹ እንደ ተላልፊ፣ የመመለስ መብት አጠቃቀም አማካኝነት ከሳሹ ለጠየቀው ክፍያ ኃላፊነት አለበት።)",
        citation: "Comm. Code Art. 767",
        autoEvidence: ["NotarizedCheque", "ProtestCertificate"]
      }
    ],
    reliefs: [
      {
        id: "relief_order_principal_payment",
        text: "To order the Defendant to pay the principal amount of the instrument, in the amount of Birr [AMOUNT]. (ተከሳሹ የመሣሪያውን ዋና መጠን ብር [AMOUNT] እንዲከፍል እንዲታዘዝ።)",
        isDefault: true
      },
      {
        id: "relief_order_interest_penalty",
        text: "To order the Defendant to pay legal interest and collection charges as provided by the Commercial Code. (ተከሳሹ በንግድ ሕጉ የተደነገገውን የሕግ ወለድ እና የክፍያ መሰብሰቢያ ወጪ እንዲከፍል እንዲታዘዝ።)",
        isDefault: true
      }
    ]
  },
  comm_preventive_restructuring: {
    documentTitle: "Application for Preventive Debt Restructuring Proceedings (የዕዳ መልሶ ማዋቀር ጥያቄ ማቅረቢያ)",
    jurisdictionText: "Commercial Code Proclamation No. 1243/2021, Art. 598 et seq. (የንግድ ሕግ አዋጅ ቁጥር ፲፪፻፵፫/፪ሺ፲፫፣ አንቀጽ ፭፻፺፰ እና ተከታዮቹ).",
    partyTitles: {
      applicant: "Debtor Business Organization (ዕዳ ያለበት የንግድ ድርጅት)",
      respondent: "Creditors (አበዳሪዎች)"
    },
    facts: [
      {
        id: "fact_financial_distress",
        label: "Conditions for Restructuring (የመልሶ ማዋቀር ቅድመ ሁኔታዎች)",
        legalText: "The Applicant is facing serious financial distress but has not yet defaulted on all its debts, and the business is still a viable going concern. (አመልካቹ ከባድ የገንዘብ ችግር ገጥሞታል፣ ነገር ግን በሁሉም ዕዳዎች ላይ መክፈል አላቆመም፣ እና ድርጅቱ አሁንም ሊቀጥል የሚችል ነው።)",
        citation: "Comm. Code Art. 600(1)",
        autoEvidence: ["BalanceSheetAndAudit"]
      },
      {
        id: "fact_restructuring_plan_ready",
        label: "Conditions for Restructuring (የመልሶ ማዋቀር ቅድመ ሁኔታዎች)",
        legalText: "The Applicant has prepared a concrete and detailed Preventive Restructuring Plan for negotiation with creditors. (አመልካቹ ከአበዳሪዎች ጋር ለመደራደር የተሟላ የመከላከያ መልሶ ማዋቀር ዕቅድ አዘጋጅቷል።)",
        citation: "Comm. Code Art. 600(2)",
        autoEvidence: []
      },
      {
        id: "fact_list_of_creditors_submitted",
        label: "Conditions for Restructuring (የመልሶ ማዋቀር ቅድመ ሁኔታዎች)",
        legalText: "A comprehensive list of all known creditors, their contact details, and the amount of debt owed to each is attached. (የሁሉም አበዳሪዎች የተሟላ ዝርዝር እና የእዳቸው መጠን ተያይዟል።)",
        citation: "Comm. Code Art. 600(3)",
        autoEvidence: ["ListofCreditors"]
      },
      {
        id: "fact_need_stay_of_proceedings",
        label: "Need for Court Protection (የፍርድ ቤት ጥበቃ አስፈላጊነት)",
        legalText: "A stay of individual enforcement proceedings against the Debtor is necessary to facilitate successful restructuring and prevent liquidation. (መልሶ ማዋቀሩን ለማስቻል እና ኪሳራን ለመከላከል የግል አስፈጻሚ ሂደቶች መቆም ያስፈልጋል።)",
        citation: "Comm. Code Art. 608",
        autoEvidence: ["BalanceSheetAndAudit"]
      }
    ],
    reliefs: [
      {
        id: "relief_open_preventive_procedure",
        text: "To open the Preventive Debt Restructuring Proceedings for the Applicant Business Organization. (ለአመልካቹ የንግድ ድርጅት የመከላከያ ዕዳ መልሶ ማዋቀር ሂደት እንዲከፈት።)",
        isDefault: true
      },
      {
        id: "relief_grant_stay_of_proceedings",
        text: "To grant a provisional stay of all individual enforcement proceedings by creditors for a maximum of four months. (በሁሉም ግለሰባዊ የማስፈጸሚያ ሂደቶች ላይ ለከፍተኛው አራት ወራት የሚቆይ ጊዜያዊ እገዳ እንዲጣልበት።)",
        isDefault: true
      }
    ]
  },
  comm_dissolution_by_court: {
    documentTitle: "Petition for Judicial Dissolution of a Business Organization (የንግድ ድርጅት በፍርድ ቤት እንዲፈርስ አቤቱታ)",
    jurisdictionText: "Commercial Code Proclamation No. 1243/2021, Art. 525 (for PLCs) and Art. 384 (for SCs) et seq. (የንግድ ሕግ አዋጅ ቁጥር ፲፪፻፵፫/፪ሺ፲፫፣ አንቀጽ ፭፻፳፭ እና ፫፻፹፬ እና ተከታዮቹ).",
    partyTitles: {
      applicant: "Shareholder/Partner/Plaintiff (አክሲዮን ባለቤት/አጋር/ከሳሽ)",
      respondent: "Business Organization (የንግድ ድርጅት)"
    },
    facts: [
      {
        id: "fact_company_purpose_impossible",
        label: "Grounds for Dissolution (የመፍረስ ምክንያቶች)",
        legalText: "The attainment of the company's objective has become impossible, or the company is no longer a going concern. (የኩባንያው ዓላማ መሳካት የማይቻል ሆኗል፣ ወይም ኩባንያው ሥራውን መቀጠል አይችልም።)",
        citation: "Comm. Code Art. 525(1)(b)",
        autoEvidence: ["BalanceSheetAndAudit", "ShareholdersResolution"]
      },
      {
        id: "fact_deadlock_between_partners",
        label: "Grounds for Dissolution (የመፍረስ ምክንያቶች)",
        legalText: "A persistent deadlock exists among the partners/shareholders, making the proper functioning of the company impossible (Art. 525). (በአጋሮች/ባለአክሲዮኖች መካከል የማያቋርጥ የሀሳብ ልዩነት አለ، ይህም ኩባንያው በአግባቡ እንዳይሠራ አድርጓል።)",
        citation: "Comm. Code Art. 525(1)(c)",
        autoEvidence: ["ShareholdersResolution"]
      },
      {
        id: "fact_capital_below_minimum",
        label: "Grounds for Dissolution (የመፍረስ ምክንያቶች)",
        legalText: "The company's net assets have fallen below the minimum capital requirement (Birr 15,000 for PLC) and the loss has not been covered or the capital reduced. (የኩባንያው ንብረቶች ከዝቅተኛው ካፒታል በታች ወርዷል እና ኪሳራው አልተሸፈነም።)",
        citation: "Comm. Code Art. 524",
        autoEvidence: ["BalanceSheetAndAudit"]
      },
      {
        id: "fact_no_internal_solution",
        label: "Procedural Compliance (የሥነ-ሥርዓት መሟላት)",
        legalText: "All possible internal remedies and efforts to resolve the issue (e.g., General Assembly resolution) have failed. (ጉዳዩን ለመፍታት የተደረጉ ሁሉም ውስጣዊ ጥረቶች አልተሳኩም።)",
        citation: "Comm. Code Art. 525",
        autoEvidence: ["ShareholdersResolution", "MemorandumAndArticles"]
      }
    ],
    reliefs: [
      {
        id: "relief_order_dissolution_liquidation",
        text: "To order the judicial dissolution and liquidation of the Business Organization. (የንግድ ድርጅቱ በፍርድ ቤት እንዲፈርስ እና ንብረቱ እንዲወረስ እንዲታዘዝ።)",
        isDefault: true
      },
      {
        id: "relief_appoint_liquidator",
        text: "To appoint an Official Liquidator to take control of the company's assets and affairs. (የኩባንያውን ንብረቶች እና ጉዳዮች እንዲቆጣጠር ኦፊሴላዊ አጣሪ እንዲሾምለት።)",
        isDefault: true
      }
    ]
  },
  crim_defence_justification_self_defence: {
    documentTitle: "Plea of Justification: Self-Defence (የሕጋዊነት መቃወሚያ፡- በራስ መከላከል)",
    jurisdictionText: "Criminal Code Proclamation No. 414/2004, Arts. 79-80 (የወንጀል ሕግ አዋጅ ቁጥር ፬፻፲፬/፲፱፻፺፮፣ አንቀጽ ፸፱-፹).",
    partyTitles: {
      applicant: "Defendant (ተከሳሽ)",
      respondent: "Public Prosecutor (ዐቃቤ ሕግ)"
    },
    facts: [
      {
        id: "fact_imminent_unlawful_attack",
        label: "The Nature of the Attack (የጥቃቱ ባሕሪ)",
        legalText: "The Defendant was facing an actual, imminent, and unlawful attack upon their life, limb, or property. (ተከሳሹ በሕይወቱ፣ በአካሉ ወይም በንብረቱ ላይ ሊደርስ ያለ ትክክለኛ፣ የቅርብ እና ሕገ-ወጥ ጥቃት ገጥሞት ነበር።)",
        citation: "Crim. Code Art. 79(1)",
        autoEvidence: ["ProofOfImminentDanger"]
      },
      {
        id: "fact_defence_of_third_party",
        label: "The Nature of the Attack (የጥቃቱ ባሕሪ)",
        legalText: "The Defendant acted to defend a third party who was also facing an imminent, unlawful attack. (ተከሳሹ ጥቃት ሊደርስበት ያለን ሌላ ሰው ለመከላከል እርምጃ ወስዷል።)",
        citation: "Crim. Code Art. 79(2)",
        autoEvidence: ["ProofOfImminentDanger", "witness_statements"]
      },
      {
        id: "fact_no_other_means",
        label: "Proportionality and Necessity (ምጥጥን እና አስፈላጊነት)",
        legalText: "The act of defence was necessary because there was no other possible means of preventing the attack. (ጥቃቱን ለመከላከል ሌላ አማራጭ መንገድ ስላልነበረው የመከላከል ተግባሩ አስፈላጊ ነበር።)",
        citation: "Crim. Code Art. 80(1)",
        autoEvidence: ["witness_statements"]
      },
      {
        id: "fact_proportionality",
        label: "Proportionality and Necessity (ምጥጥን እና አስፈላጊነት)",
        legalText: "The means used for defence were proportional to the gravity of the attack and the threatened harm. (ለመከላከል ጥቅም ላይ የዋለው ዘዴ ከጥቃቱ ክብደት እና ከሚሰጋው ጉዳት ጋር የተመጣጣኝ ነበር።)",
        citation: "Crim. Code Art. 80(2)",
        autoEvidence: ["ProofOfImminentDanger", "witness_statements"]
      }
    ],
    reliefs: [
      {
        id: "relief_acquittal_justification",
        text: "To acquit the Defendant on the ground that the act was justified and therefore lawful. (ድርጊቱ ህጋዊነት ያለው በመሆኑ በነጻ እንዲሰናበትለት።)",
        isDefault: true
      }
    ]
  },
  crim_defence_excuse_insanity: {
    documentTitle: "Plea of Excuse: Insanity / Non-Culpability (የማስተንፈሻ መቃወሚያ፡- የአእምሮ ሕመም/ተጠያቂነት አለመኖር)",
    jurisdictionText: "Criminal Code Proclamation No. 414/2004, Art. 50 (የወንጀል ሕግ አዋጅ ቁጥር ፬፻፲፬/፲፱፻፺፮፣ አንቀጽ ፶).",
    partyTitles: {
      applicant: "Defendant (ተከሳሽ)",
      respondent: "Public Prosecutor (ዐቃቤ ሕግ)"
    },
    facts: [
      {
        id: "fact_insane_incapable_understanding",
        label: "Mental State at the Time of Offence (በወንጀል ጊዜ የነበረው የአእምሮ ሁኔታ)",
        legalText: "At the time of the act, the Defendant was suffering from severe mental disease or deficiency that rendered them incapable of understanding the criminal nature of the act. (በድርጊቱ ጊዜ ተከሳሹ የድርጊቱን የወንጀልነት ባህሪ ለመረዳት በማይችል ደረጃ በከፍተኛ የአእምሮ ሕመም ይሠቃይ ነበር።)",
        citation: "Crim. Code Art. 50(1)",
        autoEvidence: ["MedicalCertificateMentalState"]
      },
      {
        id: "fact_insane_incapable_control",
        label: "Mental State at the Time of Offence (በወንጀል ጊዜ የነበረው የአእምሮ ሁኔታ)",
        legalText: "At the time of the act, the Defendant was suffering from severe mental disease or deficiency that rendered them incapable of controlling their conduct. (በድርጊቱ ጊዜ ተከሳሹ አካሄዱን መቆጣጠር በማይችልበት ደረጃ በከፍተኛ የአእምሮ ሕመም ይሠቃይ ነበር።)",
        citation: "Crim. Code Art. 50(1)",
        autoEvidence: ["MedicalCertificateMentalState"]
      },
      {
        id: "fact_intoxication_non_culpable",
        label: "Intoxication (በስካር ሁኔታ)",
        legalText: "The Defendant was in a state of involuntary or non-culpable intoxication (e.g., administered by force or error) that led to the lack of culpability. (ተከሳሹ በግዴታ ወይም በስህተት በተፈጠረ የስካር ሁኔታ ውስጥ የነበረ ሲሆን ይህም ተጠያቂ እንዳይሆን አድርጎታል።)",
        citation: "Crim. Code Art. 54",
        autoEvidence: ["WitnessStatementsIntoxication", "MedicalCertificateMentalState"]
      },
      {
        id: "fact_intoxication_culpable_negligence",
        label: "Intoxication (በስካር ሁኔታ)",
        legalText: "The Defendant was in a state of culpable intoxication, but the offense committed was only foreseeable as a light offense (for mitigation). (ተከሳሹ በግዴታ በተፈጠረ የስካር ሁኔታ ውስጥ የነበረ ቢሆንም የተፈፀመው ወንጀል በቀላል ደረጃ የሚገመት ነበር (ለቅጣት ማቅለያ)።)",
        citation: "Crim. Code Art. 54(3)",
        autoEvidence: ["WitnessStatementsIntoxication"]
      }
    ],
    reliefs: [
      {
        id: "relief_acquittal_excuse",
        text: "To acquit the Defendant on the grounds of non-culpability and order appropriate security or medical measures (Art. 50(3)). (ተከሳሹ በተጠያቂነት እጦት በነጻ እንዲሰናበት እና ተገቢ የጥበቃ ወይም የህክምና እርምጃ እንዲወሰድበት።)",
        isDefault: true
      }
    ]
  },
  crim_defence_justification_necessity: {
    documentTitle: "Plea of Justification: Necessity (የሕጋዊነት መቃወሚያ፡- በግዴታ)",
    jurisdictionText: "Criminal Code Proclamation No. 414/2004, Art. 81 (የወንጀል ሕግ አዋጅ ቁጥር ፬፻፲፬/፲፱፻፺፮፣ አንቀጽ ፹፩).",
    partyTitles: {
      applicant: "Defendant (ተከሳሽ)",
      respondent: "Public Prosecutor (ዐቃቤ ሕግ)"
    },
    facts: [
      {
        id: "fact_imminent_threat_necessity",
        label: "The Threat and Choice of Harm (አደጋው እና የጉዳት ምርጫ)",
        legalText: "The Defendant was facing an imminent and unavoidable threat to life, limb, or other vital interest (of self or third party). (ተከሳሹ በሕይወቱ፣ በአካሉ ወይም በሌላ ወሳኝ ጥቅም ላይ ሊደርስ ያለ የቅርብ እና ሊቀር የማይችል አደጋ ገጥሞት ነበር።)",
        citation: "Crim. Code Art. 81(1)",
        autoEvidence: ["ProofOfImminentDanger"]
      },
      {
        id: "fact_interest_protected_greater",
        label: "The Threat and Choice of Harm (አደጋው እና የጉዳት ምርጫ)",
        legalText: "The interest protected by the act (the interest saved) was evidently of a greater or equal value than the interest infringed (the harm caused). (በድርጊቱ የተጠበቀው ጥቅም (የተረፈው) ከተጎዳው ጥቅም (ከተፈጠረው ጉዳት) የበለጠ ወይም እኩል ዋጋ ነበረው።)",
        citation: "Crim. Code Art. 81(1)",
        autoEvidence: ["witness_statements"]
      },
      {
        id: "fact_order_of_superior",
        label: "Official Order / Consent (ኦፊሴላዊ ትዕዛዝ / ፈቃድ)",
        legalText: "The Defendant acted in execution of an official order issued by a superior public authority, and the order's illegality was not immediately manifest. (ተከሳሹ በበላይ የሕዝብ ባለሥልጣን የተሰጠውን ኦፊሴላዊ ትዕዛዝ ለመፈጸም እርምጃ ወስዷል፣ እናም የትዕዛዙ ሕገወጥነት ግልጽ አልነበረም።)",
        citation: "Crim. Code Art. 82",
        autoEvidence: ["OfficialOrderDocument"]
      },
      {
        id: "fact_victim_consent_valid",
        label: "Official Order / Consent (ኦፊሴላዊ ትዕዛዝ / ፈቃድ)",
        legalText: "The victim freely and clearly consented to the minor bodily injury or damage to property, where such consent is valid under the law. (ተጎጂው በሕግ ተቀባይነት ባለው መንገድ ለደረሰበት ቀላል የአካል ጉዳት ወይም የንብረት ጉዳት በነጻ ፈቃዱን ሰጥቷል።)",
        citation: "Crim. Code Art. 83",
        autoEvidence: ["VictimConsentForm"]
      }
    ],
    reliefs: [
      {
        id: "relief_acquittal_necessity",
        text: "To acquit the Defendant on the ground that the act was justified by necessity and lawful. (ድርጊቱ በግዴታ ሕጋዊነት ያለው በመሆኑ በነጻ እንዲሰናበትለት።)",
        isDefault: true
      },
      {
        id: "relief_mitigation_necessity",
        text: "Alternatively, to mitigate the penalty due to the presence of a threatening situation that rendered the offense less culpable (mitigating circumstance). (በአማራጭ፣ ወንጀሉን በተጠያቂነት እንዲቀንስ በሚያስችል አስጊ ሁኔታ በመኖሩ ምክንያት ቅጣቱ እንዲቀልለት።)",
        isDefault: false
      }
    ]
  }
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



