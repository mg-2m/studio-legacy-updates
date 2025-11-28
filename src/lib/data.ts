
import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData, Calculation } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote, HeartPulse, Scale, FileX2, Gavel, Users, Map, Brain, UserCheck, LandmarkIcon, Siren, ShieldCheck, FileWarning, BadgeCheck, MessageSquareWarning } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';


// Import the raw JSON data from the new modular files
import * as baseData from '@/legal_branches/_base.json';
import * as contractLaw from '@/legal_branches/contract_law.json';
import * as familyLaw from '@/legal_branches/family_law.json';
import * as labourLaw from '@/legal_branches/labour_law.json';
import * as publicServiceLaw from '@/legal_branches/public_service_law.json';
import * as successionLaw from '@/legal_branches/succession_law.json';
import * as propertyLandLaw from '@/legal_branches/property_land_law.json';
import * as ipLaw from '@/legal_branches/ip_law.json';
import * as statusLaw from '@/legal_branches/status_law.json';
import * as taxCustomsLaw from '@/legal_branches/tax_customs_law.json';
import * as tortLaw from '@/legal_branches/tort_law.json';
import * as administrativeLaw from '@/legal_branches/administrative_law.json';
import * as commercialLaw from '@/legal_branches/commercial_law.json';
import * as criminalLaw from '@/legal_branches/criminal_law_defences.json';
import * as civilProcedure from '@/legal_branches/civil_procedure_adjudications.json';

const allTemplates = {
    ...contractLaw.templates,
    ...familyLaw.templates,
    ...labourLaw.templates,
    ...publicServiceLaw.templates,
    ...successionLaw.templates,
    ...propertyLandLaw.templates,
    ...ipLaw.templates,
    ...statusLaw.templates,
    ...taxCustomsLaw.templates,
    ...tortLaw.templates,
    ...administrativeLaw.templates,
    ...commercialLaw.templates,
    ...criminalLaw.templates,
    ...civilProcedure.templates,
};

const allEntities = {
    ...baseData.entities
};

// Formula Execution
function executeFormula(formula: string, data: { [key: string]: any }): any {
    const context = {
        ...data,
        differenceInDays: (date1: Date, date2: string | Date) => {
             if (!date1 || !date2) return 0;
            const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
            if (isNaN(d2.getTime())) return 0;
            return differenceInDays(date1, d2);
        }
    };
    
    const keys = Object.keys(context);
    const values = Object.values(context);
    
    try {
        const func = new Function(...keys, `return ${formula}`);
        return func(...values);
    } catch (e) {
        console.error("Error executing formula:", e);
        return 0; // Return 0 or some other default on error
    }
}


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
  "Documents Authentication and Registration Service (DARS) (የሰነዶች ማረጋገጫ እና ምዝገባ አገልግሎት)",
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
  "Ministry of Transport and Logistics (የትራንስፖርት እና ሎጂስቲክስ ሚኒስቴር)",
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

export const EVIDENCE_REGISTRY: EvidenceRegistry = Object.entries(allEntities).reduce((acc: EvidenceRegistry, [key, entity]: [string, any]) => {
    acc[key] = {
        id: key,
        label: entity.title,
        type: 'Document', // Defaulting to document, can be refined
        credentialLabel: entity.credentialLabel || `${entity.title} Reference`,
        credentialPlaceholder: entity.credentialPlaceholder || `e.g., ${key.substring(0, 3).toUpperCase()}-123`
    };
    return acc;
}, {});

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
       { id: 'labour_unlawful_termination', label: 'ሕገ-ወጥ ስንብት (Unlawful Termination)', icon: FileText },
       { id: 'labour_unpaid_wages', label: 'ያልተከፈለ ደመወዝ (Unpaid Wages)', icon: Receipt },
       { id: 'labour_employment_injury', label: 'የሥራ ላይ ጉዳት (Employment Injury)', icon: HeartPulse },
    ]
  },
   { 
    id: 'public_service_law', 
    label: 'የመንግስት ሰራተኛ ህግ (Public Service Law)', 
    icon: Landmark,
    subTemplates: [
       { id: 'pub_serv_disciplinary_appeal', label: 'የዲሲፕሊን ይግባኝ (Disciplinary Appeal)', icon: FileText },
       { id: 'pub_serv_termination_unlawful', label: 'ሕገ-ወጥ ስንብት ይግባኝ (Unlawful Termination Appeal)', icon: FileText },
       { id: 'pub_serv_benefits_grievance', label: 'የጥቅማጥቅም ቅሬታ (Benefits Grievance)', icon: FileText },
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
      { id: 'succ_app_appoint_liquidator', label: 'ዋና ከፋይ ሹመት (Appoint Liquidator)', icon: BookUser },
      { id: 'succ_app_seal_estate', label: 'የንብረት ማሸግ (Seal Estate)', icon: Shield }
    ]
  },
  {
    id: 'property_land_law',
    label: 'የንብረት እና መሬት ህግ (Property & Land)',
    icon: Map,
    subTemplates: [
        { id: 'prop_petitory_vindication', label: 'የይዞታ ክስ (Petitory Action)', icon: FileText },
        { id: 'prop_possessory_restoration', label: 'የተነጠቀ ይዞታን ማስመለስ (Possessory Action)', icon: FileText },
        { id: 'prop_boundary_encroachment', label: 'የድንበር መጣስ (Boundary Encroachment)', icon: Map },
        { id: 'prop_nuisance_cessation', label: 'የአደጋ መከላከል (Nuisance Cessation)', icon: ShieldAlert },
        { id: 'prop_servitude_right_of_way', label: 'የመንገድ መብት (Servitude)', icon: Map },
        { id: 'app_prop_stay_construction', label: 'ግንባታን የማገድ ትዕዛዝ (Suspend Construction)', icon: Shield },
        { id: 'app_prop_local_inspection', label: 'የአካባቢ ምርመራ ትዕዛዝ (Local Inspection)', icon: Map },
        { id: 'prop_possessory_disturbance', label: 'የይዞታ መረበሽ (Possessory Disturbance)', icon: FileText },
    ]
  },
  {
    id: 'ip_law',
    label: 'የአእምሯዊ ንብረት ህግ (IP Law)',
    icon: Brain,
    subTemplates: [
        { id: 'ip_trademark_infringement', label: 'የንግድ ምልክት ጥሰት (Trademark Infringement)', icon: FileWarning },
        { id: 'ip_trademark_opposition', label: 'የንግድ ምልክት መቃወሚያ (Trademark Opposition)', icon: MessageSquareWarning },
        { id: 'ip_patent_infringement', label: 'የፓተንት ጥሰት (Patent Infringement)', icon: FileWarning },
        { id: 'ip_copyright_infringement', label: 'የቅጂ መብት ጥሰት (Copyright Infringement)', icon: FileWarning },
        { id: 'ip_moral_rights_violation', label: 'የሞራል መብቶች ጥሰት (Moral Rights Violation)', icon: BadgeCheck },
        { id: 'app_ip_interlocutory_injunction', label: 'ጊዜያዊ እገዳ (Interlocutory Injunction)', icon: Shield },
        { id: 'app_ip_anton_piller', label: 'የማስረጃ መያዣ ትዕዛዝ (Seizure of Evidence)', icon: ShieldAlert },
    ]
  },
  {
    id: 'status_law',
    label: 'የሰው ህግ እና ሁኔታ (Law of Persons & Status)',
    icon: UserCheck,
    subTemplates: [
        { id: 'status_judicial_interdiction', label: 'የፍርድ እገዳ (Judicial Interdiction)', icon: FileText },
        { id: 'status_correction_civil_record', label: 'የሲቪል መዝገብ ማስተካከያ (Correction of Civil Record)', icon: FileSignature },
        { id: 'status_declaration_of_absence', label: 'የመጥፋት መግለጫ (Declaration of Absence)', icon: FileX2 },
        { id: 'app_status_provisional_curator', label: 'ጊዜያዊ ጠባቂ መሾም (Appoint Provisional Curator)', icon: BookUser },
        { id: 'app_status_lift_interdiction', label: 'የእገዳ ማንሳት (Lift Interdiction)', icon: Gavel },
    ]
  },
  {
    id: 'tax_customs_law',
    label: 'የግብር እና ጉምሩክ ህግ (Tax & Customs Law)',
    icon: LandmarkIcon,
    subTemplates: [
        { id: 'tax_objection_admin_review', label: 'የግብር መቃወሚያ (Tax Objection)', icon: FileText },
        { id: 'tax_appeal_ftac', label: 'የግብር ይግባኝ (Tax Appeal)', icon: Gavel },
        { id: 'customs_claim_for_refund', label: 'የጉምሩክ ተመላሽ ጥያቄ (Customs Refund Claim)', icon: Receipt },
        { id: 'app_tax_stay_of_execution', label: 'የአፈጻጸም እገዳ (Stay of Execution)', icon: Shield },
        { id: 'app_tax_adr_request', label: 'የአማራጭ መፍትሄ ጥያቄ (ADR Request)', icon: Handshake },
    ]
  },
  {
    id: 'tort_law',
    label: 'ከውል ውጭ ተጠያቂነት (Tort Law)',
    icon: Siren,
    subTemplates: [
      { id: 'tort_general_negligence_claim', label: 'አጠቃላይ የቸልተኝነት ክስ (General Negligence Claim)', icon: FileText },
      { id: 'tort_strict_liability_buildings', label: 'ጥብቅ ተጠያቂነት (ህንጻዎች) (Strict Liability - Buildings)', icon: Building2 },
    ]
  },
  {
    id: 'administrative_law',
    label: 'የአስተዳደር ህግ (Administrative Law)',
    icon: Landmark,
    subTemplates: [
      { id: 'admin_appeal_judicial_review', label: 'የውሳኔ ፍርድ ቤት ክለሳ (Judicial Review of Decision)', icon: Gavel },
      { id: 'admin_review_directive_legality', label: 'የመመሪያ ሕጋዊነት ክለሳ (Review of Directive)', icon: FileX2 },
    ]
  },
  {
    id: 'commercial_law',
    label: 'የንግድ ህግ (Commercial Law)',
    icon: Building2,
    subTemplates: [
      { id: 'comm_restitution_nonpayment', label: 'በንግድ መሣሪያ ላይ ክፍያ (Payment on Instrument)', icon: Banknote },
      { id: 'comm_preventive_restructuring', label: 'የዕዳ መልሶ ማዋቀር (Debt Restructuring)', icon: Shield },
      { id: 'comm_dissolution_by_court', label: 'የፍርድ ቤት መፍረስ (Judicial Dissolution)', icon: FileX2 },
    ]
  },
  {
    id: 'criminal_law_defences',
    label: 'የወንጀል መከላከያዎች (Criminal Law Defences)',
    icon: ShieldCheck,
    subTemplates: [
        { id: 'crim_defence_justification_self_defence', label: 'ራስን መከላከል (Self-Defence)', icon: Shield },
        { id: 'crim_defence_excuse_insanity', label: 'የአእምሮ ሕመም (Insanity)', icon: Brain },
        { id: 'crim_defence_justification_necessity', label: 'በግዴታ (Necessity)', icon: ShieldAlert },
    ]
  },
  {
    id: 'civil_procedure_adjudications',
    label: 'የፍትሐ ብሔር ሥነ ሥርዓት ውሳኔዎች (Civil Procedure)',
    icon: Gavel,
    subTemplates: [
      { id: 'civ_proc_amendment_of_pleading', label: 'የፍሬ ነገር ማሻሻያ (Amendment of Pleading)', icon: FileSignature },
      { id: 'civ_proc_intervention_by_third_party', label: 'የሶስተኛ ወገን ጣልቃ ገብነት (Intervention)', icon: Users },
      { id: 'civ_proc_joinder_of_third_party', label: 'የሶስተኛ ወገን ማካተት (Joinder)', icon: Users },
      { id: 'civ_proc_judgment_objection_default', label: 'የሌሉበት ፍርድ መቃወሚያ (Default Judgment Objection)', icon: ShieldAlert },
      { id: 'civ_proc_review_of_judgment', label: 'የፍርድ ዳግም ክለሳ (Review of Judgment)', icon: FileX2 },
    ]
  }
];


// This function processes facts from the old structure to the new one.
const processFacts = (facts: any): Fact[] => {
    if (!facts) return [];
    // Check if facts is already a flat array (new structure)
    if (Array.isArray(facts)) {
        return facts as Fact[];
    }
    // Process the old nested structure
    if (typeof facts === 'object' && !Array.isArray(facts)) {
         return Object.values(facts).flatMap((group: any) => 
            group.facets.map((facet: any) => ({
                ...facet,
                label: group.title // Use the group title as the label for grouping in the UI
            }))
        );
    }
    return [];
};

export const TEMPLATE_DATA: { [key: string]: TemplateData } = Object.entries(allTemplates).reduce((acc, [key, value] : [string, any]) => {
  acc[key] = {
    ...value,
    facts: processFacts(value.facts), // Process facts into the new flat structure with group labels
  };
  return acc;
}, {} as { [key: string]: TemplateData });


const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];
const initialTemplateId: string = TEMPLATES[0].id;
const initialSubTemplateId: string = TEMPLATES[0].subTemplates[0].id;
const initialTemplateData = TEMPLATE_DATA[initialSubTemplateId];

const initialCalculations: { [key: string]: Calculation } = {};

if (initialTemplateData.calculations) {
    for (const calcKey in initialTemplateData.calculations) {
        const calcConfig = initialTemplateData.calculations[calcKey];
        initialCalculations[calcKey] = {};
        calcConfig.inputs.forEach(input => {
            initialCalculations[calcKey][input.id] = input.defaultValue;
        });
        calcConfig.outputs.forEach(output => {
            initialCalculations[calcKey][output.id] = executeFormula(calcConfig.formula, initialCalculations[calcKey]);
        });
    }
}


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
  calculations: initialCalculations,
  evidence: [],
  smartEvidence: {},
  partyTitles: initialTemplateData.partyTitles,
  selectedTemplate: initialTemplateId,
  selectedSubTemplate: initialSubTemplateId,
};

