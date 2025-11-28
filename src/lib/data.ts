
import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData, Calculation } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote, HeartPulse, Scale, FileX2, Gavel, Users, Map, Brain, UserCheck, LandmarkIcon, Siren, ShieldCheck, FileWarning, BadgeCheck, MessageSquareWarning, FileMinus, FilePlus, UserMinus } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';


// Import the raw JSON data from the new modular files
import * as baseData from '@/legal_branches/_base.json';
import * as contractLaw from '@/legal_branches/contract_law.json';
import * as familyLaw from '@/legal_branches/family_law.json';
import * as labourLaw from '@/legal_branches/labour_law.json';
import * as publicServiceLaw from '@/legal_branches/public_service_law.json';
import * as successionLaw from '@/legal_branches/succession_law.json';
import * as propertyAndLandLaw from '@/legal_branches/property_land_law.json';
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
    ...propertyAndLandLaw.templates,
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
  "የፌዴራል የመጀመሪያ ደረጃ ፍርድ ቤት": [
    "ልደታ ምድብ 1ኛ ችሎት", 
    "ልደታ ምድብ 2ኛ ችሎት",
    "ቦሌ ምድብ",
    "ቂርቆስ ምድብ",
    "አራዳ ምድብ",
    "የካ ምድብ", 
    "አቃቂ ቃሊቲ ምድብ",
    "ልደታ ምድብ 1ኛ የሠራተኛ ግንኙነት ችሎት",
    "ልደታ ምድብ የታክስ ችሎት",
  ],
  "የፌዴራል ከፍተኛ ፍርድ ቤት": [
    "ልደታ ምድብ 1ኛ ፍትሐብሔር ችሎት",
    "ልደታ ምድብ 2ኛ ፍትሐብሔር ችሎት",
    "ልደታ ምድብ 1ኛ ወንጀል ችሎት",
    "ቦሌ ምድብ",
    "ልደታ ምድብ የንግድ ችሎት",
    "ልደታ ምድብ የሠራተኛ ችሎት",
  ],
  "የፌዴራል ጠቅላይ ፍርድ ቤት": [
    "1ኛ ሰበር ሰሚ ችሎት", 
    "2ኛ ሰበር ሰሚ ችሎት",
    "3ኛ ሰበር ሰሚ ችሎት",
    "1ኛ ይግባኝ ሰሚ ችሎት"
  ]
};

export const REGIONS_AND_CITIES = [
  "የአዲስ አበባ ከተማ አስተዳደር",
  "የአፋር ክልል",
  "የአማራ ክልል",
  "የቤኒሻንጉል ጉሙዝ ክልል",
  "የማዕከላዊ ኢትዮጵያ ክልል",
  "የድሬዳዋ ከተማ አስተዳደር",
  "የጋምቤላ ክልል",
  "የሐረሪ ክልል",
  "የኦሮሚያ ክልል",
  "የሲዳማ ክልል",
  "የሶማሌ ክልል",
  "የደቡብ ኢትዮጵያ ክልል",
  "የደቡብ ምዕራብ ኢትዮጵያ ህዝቦች ክልል",
  "የትግራይ ክልል",
];

export const AA_SUBCITIES = [
  "አራዳ", "ቦሌ", "አዲስ ከተማ", "ኒፋስ ስልክ",
  "ቂርቆስ", "ጉለሌ", "ልደታ", "አቃቂ ቃሊቲ",
  "የካ", "ለሚ ኩራ", "ኮልፌ ቀራኒዮ", "ሌላ"
];

export const HONORIFICS = ["አቶ", "ወ/ሮ", "ወ/ሪት"];

export const EVIDENCE_LOCATIONS = [
  "ከአመልካች ጋር",
  "ከተከሳሽ ጋር",
  "ፍርድ ቤት ውስጥ",
  "ጠፍቷል",
  "የማይመለከተው",
  "ሌላ",
];

export const DOCUMENT_ISSUERS = [
  // --- Law Enforcement & Justice ---
  "የፌደራል ፖሊስ ኮሚሽን",
  "የአዲስ አበባ ፖሊስ ኮሚሽን",
  "የኦሮሚያ ፖሊስ ኮሚሽን",
  "የአማራ ፖሊስ ኮሚሽን",
  "የፍትህ ሚኒስቴር",
  "የፌዴራል ጠቅላይ ዐቃቤ ሕግ",
  
  // --- Vital Events, Civil Status & Documents ---
  "የወሳኝ ኩነት ምዝገባ ኤጀንሲ",
  "የሰነዶች ማረጋገጫ እና ምዝገባ አገልግሎት",
  "የኢሚግሬሽን እና የዜግነት አገልግሎት",
  
  // --- Economy, Trade & Finance ---
  "የንግድ እና ቀጣናዊ ትስስር ሚኒስቴር",
  "የገቢዎች ሚኒስቴር",
  "የገንዘብ ሚኒስቴር",
  "የኢትዮጵያ ኢንቨስትመንት ኮሚሽን",
  "የኢትዮጵያ ብሔራዊ ባንክ",
  "የኢትዮጵያ ንግድ ባንክ",

  // --- Land, Property & Infrastructure ---
  "የአ/አ ከተማ የመሬት ልማት እና ማኔጅመንት ቢሮ",
  "የከተማ እና መሠረተ ልማት ሚኒስቴር",
  "የኢትዮጵያ መንገዶች አስተዳደር",
  "የትራንስፖርት እና ሎጂስቲክስ ሚኒስቴር",
  "የኢትዮጵያ ኤሌክትሪክ ኃይል",

  // --- Social & Health ---
  "የጤና ጥበቃ ሚኒስቴር",
  "ሆስፒታል ወይም ክሊኒክ",
  "የትምህርት ሚኒስቴር",
  "ዩኒቨርሲቲ ወይም የትምህርት ተቋም",
  "የሥራ እና ክህሎት ሚኒስቴር",
  
  // --- IP ---
  "የኢትዮጵያ አእምሯዊ ንብረት ጽ/ቤት",
  
  // --- Other ---
  "ሌላ",
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
        { id: 'status_judicial_interdiction', label: 'የፍርድ እግድ (Judicial Interdiction)', icon: FileText },
        { id: 'status_name_change', label: 'የስም ለውጥ (Name Change)', icon: FileSignature },
        { id: 'status_birth_date_correction', label: 'የልደት ቀን ማስተካከያ (Birth Date Correction)', icon: FileSignature },
        { id: 'status_double_record_correction', label: 'የተደጋገመ መዝገብ ማስተካከያ (Double Record Correction)', icon: FileSignature },
        { id: 'status_ethiopian_descent_id', label: 'የትውልደ ኢትዮጵያዊ መታወቂያ (Ethiopian Origin ID)', icon: FileSignature },
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
        { id: 'app_tax_stay_of_execution', label: 'የአፈጻጸም እግዳ (Stay of Execution)', icon: Shield },
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
      { id: 'comm_appoint_auditors', label: 'ኦዲተር እንዲሾም መጠየቅ (Appoint Auditors)', icon: BookUser },
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
        { id: 'crim_defence_mitigation_plea', label: 'የቅጣት ማቅለያ ክርክር (Penalty Mitigation)', icon: UserMinus },
        { id: 'crim_objection_preliminary', label: 'የመጀመሪያ ደረጃ መቃወሚያ (Preliminary Objection)', icon: FileMinus },
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
      { id: 'app_stay_construction', label: 'ግንባታን የማገድ ትዕዛዝ (Suspend Construction)', icon: Shield },
      { id: 'app_local_inspection', label: 'የአካባቢ ምርመራ ትዕዛዝ (Local Inspection)', icon: Map },
      { id: 'app_servitude_temporary_passage', label: 'ጊዜያዊ የመተላለፊያ ትዕዛዝ (Temp. Passage)', icon: Map },
    ]
  }
];

// This function processes facts from the old structure to the new one.
const processFacts = (facts: any): Fact[] => {
    if (!facts) return [];
    
    // This is the NEW, ROBUST logic.
    // If it's the old nested structure, flatten it and add labels.
    if (typeof facts === 'object' && !Array.isArray(facts)) {
         return Object.values(facts).flatMap((group: any) => 
            (group.facets || []).map((facet: any) => ({
                ...facet,
                label: group.title // Use the group title as the label for grouping in the UI
            }))
        );
    }

    // If it's ALREADY a flat array (new structure), ensure every fact has a label.
    // This was the missing piece.
    if (Array.isArray(facts)) {
        let lastLabel = 'Facts'; // Default label if the first fact has no label
        return (facts as Fact[]).map(fact => {
            if (fact.label) {
                lastLabel = fact.label;
            } else {
                fact.label = lastLabel;
            }
            return fact;
        });
    }

    return [];
};

export const TEMPLATE_DATA: { [key: string]: TemplateData } = Object.entries(allTemplates).reduce((acc, [key, value] : [string, any]) => {
  if (!value) {
    console.error(`Template data for key "${key}" is missing or invalid. Skipping.`);
    return acc;
  }
  
  // Create a deep copy to avoid mutating the original `allTemplates` object
  const newTemplateData = JSON.parse(JSON.stringify(value));

  // Process facts for the copied data
  newTemplateData.facts = processFacts(newTemplateData.facts);
  
  acc[key] = newTemplateData;
  return acc;
}, {} as { [key: string]: TemplateData });


const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];
const initialTemplateId: string = TEMPLATES[0].id;
const initialSubTemplateId: string = TEMPLATES[0].subTemplates[0].id;
const initialTemplateData = TEMPLATE_DATA[initialSubTemplateId];

const initialCalculations: { [key: string]: Calculation } = {};

if (initialTemplateData && initialTemplateData.calculations) {
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
  applicants: [{ id: '1', name: '', idNumber: '', phone: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1], subcityOther: '', woreda: '' } }],
  respondents: [],
  selectedFacts: [],
  selectedReliefs: initialTemplateData ? initialTemplateData.reliefs.filter(r => r.isDefault) : [],
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
  partyTitles: initialTemplateData ? initialTemplateData.partyTitles : { applicant: 'Applicant', respondent: 'Respondent' },
  selectedTemplate: initialTemplateId,
  selectedSubTemplate: initialSubTemplateId,
};



