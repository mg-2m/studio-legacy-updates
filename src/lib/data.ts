

import type { AppState, Template, Relief, Fact, PartyTitles, EvidenceRegistry, TemplateData, Calculation } from "./types";
import { FileText, Briefcase, Handshake, Shield, Landmark, FileSignature, BookUser, Home, Building2, ShieldAlert, Receipt, Banknote, HeartPulse, Scale, FileX2, Gavel, Users, Map, Brain, UserCheck, LandmarkIcon, Siren, ShieldCheck, FileWarning, BadgeCheck, MessageSquareWarning, FileMinus, FilePlus, UserMinus } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';


// Import the raw JSON data from the new modular files
import * as baseData from '@/legal_branches/_base.json';

// Import individual succession law templates
import * as succession_heirship_declaration from '@/legal_branches/succession_law/succession_heirship_declaration.json';
import * as succession_probate_will from '@/legal_branches/succession_law/succession_probate_will.json';
import * as succession_partition_estate from '@/legal_branches/succession_law/succession_partition_estate.json';


// Import individual public service law templates
import * as pub_serv_disciplinary_appeal from '@/legal_branches/public_service_law/pub_serv_disciplinary_appeal.json';
import * as pub_serv_termination_unlawful from '@/legal_branches/public_service_law/pub_serv_termination_unlawful.json';
import * as pub_serv_benefits_grievance from '@/legal_branches/public_service_law/pub_serv_benefits_grievance.json';


// Import individual contract law templates
import * as contract_debt_recovery from '@/legal_branches/contract_law/contract_debt_recovery.json';
import * as contract_specific_performance from '@/legal_branches/contract_law/contract_specific_performance.json';
import * as contract_termination_claim from '@/legal_branches/contract_law/contract_termination_claim.json';
import * as app_attachment_before_judgment from '@/legal_branches/contract_law/app_attachment_before_judgment.json';
import * as app_judgment_on_admission from '@/legal_branches/contract_law/app_judgment_on_admission.json';


// Import individual property law templates
import * as prop_petitory_vindication from '@/legal_branches/property_and_land_law/prop_petitory_vindication.json';
import * as prop_possessory_restoration from '@/legal_branches/property_and_land_law/prop_possessory_restoration.json';
import * as prop_boundary_encroachment from '@/legal_branches/property_and_land_law/prop_boundary_encroachment.json';
import * as property_nuisance_cessation from '@/legal_branches/property_and_land_law/property_nuisance_cessation.json';
import * as property_servitude_right_of_way from '@/legal_branches/property_and_land_law/property_servitude_right_of_way.json';
import * as property_possessory_disturbance from '@/legal_branches/property_and_land_law/property_possessory_disturbance.json';
import * as app_stay_construction from '@/legal_branches/property_and_land_law/app_stay_construction.json';
import * as app_local_inspection from '@/legal_branches/property_and_land_law/app_local_inspection.json';
import * as app_servitude_temporary_passage from '@/legal_branches/property_and_land_law/app_servitude_temporary_passage.json';

// Import individual family law templates
import * as family_divorce_dispute from '@/legal_branches/family_law/family_divorce_dispute.json';
import * as family_divorce_agreement from '@/legal_branches/family_law/family_divorce_agreement.json';
import * as family_paternity_claim from '@/legal_branches/family_law/family_paternity_claim.json';
import * as family_post_judgment_partition from '@/legal_branches/family_law/family_post_judgment_partition.json';
import * as app_temporary_maintenance from '@/legal_branches/family_law/app_temporary_maintenance.json';
import * as app_property_preservation from '@/legal_branches/family_law/app_property_preservation.json';
import * as app_protective_order from '@/legal_branches/family_law/app_protective_order.json';

// Import individual labour law templates
import * as labour_unlawful_termination from '@/legal_branches/labour_law/labour_unlawful_termination.json';
import * as labour_unpaid_wages from '@/legal_branches/labour_law/labour_unpaid_wages.json';
import * as labour_employment_injury from '@/legal_branches/labour_law/employment_injury.json';

// Import individual IP law templates
import * as ip_trademark_infringement from '@/legal_branches/ip_law/ip_trademark_infringement.json';
import * as ip_trademark_opposition from '@/legal_branches/ip_law/ip_trademark_opposition.json';
import * as ip_patent_infringement from '@/legal_branches/ip_law/ip_patent_infringement.json';
import * as ip_copyright_infringement from '@/legal_branches/ip_law/ip_copyright_infringement.json';
import * as ip_moral_rights_violation from '@/legal_branches/ip_law/ip_moral_rights_violation.json';
import * as app_ip_interlocutory_injunction from '@/legal_branches/ip_law/app_ip_interlocutory_injunction.json';
import * as app_ip_anton_piller from '@/legal_branches/ip_law/app_ip_anton_piller.json';

// Import individual status law templates
import * as status_judicial_interdiction from '@/legal_branches/status_law/status_judicial_interdiction.json';
import * as status_name_change from '@/legal_branches/status_law/status_name_change.json';
import * as status_birth_date_correction from '@/legal_branches/status_law/status_birth_date_correction.json';
import * as status_double_record_correction from '@/legal_branches/status_law/status_double_record_correction.json';
import * as status_ethiopian_descent_id from '@/legal_branches/status_law/status_ethiopian_descent_id.json';
import * as status_declaration_of_absence from '@/legal_branches/status_law/status_declaration_of_absence.json';
import * as app_status_provisional_curator from '@/legal_branches/status_law/app_status_provisional_curator.json';
import * as app_status_lift_interdiction from '@/legal_branches/status_law/app_status_lift_interdiction.json';

// Import individual tax & customs law templates
import * as tax_objection_admin_review from '@/legal_branches/tax_customs_law/tax_objection_admin_review.json';
import * as tax_appeal_ftac from '@/legal_branches/tax_customs_law/tax_appeal_ftac.json';
import * as customs_claim_for_refund from '@/legal_branches/tax_customs_law/customs_claim_for_refund.json';
import * as app_tax_stay_of_execution from '@/legal_branches/tax_customs_law/app_tax_stay_of_execution.json';
import * as app_tax_adr_request from '@/legal_branches/tax_customs_law/app_tax_adr_request.json';

// Import individual tort law templates
import * as tort_general_negligence_claim from '@/legal_branches/tort_law/tort_general_negligence_claim.json';
import * as tort_strict_liability_buildings from '@/legal_branches/tort_law/tort_strict_liability_buildings.json';

// Import individual administrative law templates
import * as admin_appeal_judicial_review from '@/legal_branches/administrative_law/admin_appeal_judicial_review.json';
import * as admin_review_directive_legality from '@/legal_branches/administrative_law/admin_review_directive_legality.json';

// Import individual commercial law templates
import * as comm_restitution_nonpayment from '@/legal_branches/commercial_law/comm_restitution_nonpayment.json';
import * as comm_preventive_restructuring from '@/legal_branches/commercial_law/comm_preventive_restructuring.json';
import * as comm_dissolution_by_court from '@/legal_branches/commercial_law/comm_dissolution_by_court.json';
import * as comm_appoint_auditors from '@/legal_branches/commercial_law/comm_appoint_auditors.json';

// Import individual criminal law defences templates
import * as crim_defence_justification_self_defence from '@/legal_branches/criminal_law_defences/crim_defence_justification_self_defence.json';
import * as crim_defence_excuse_insanity from '@/legal_branches/criminal_law_defences/crim_defence_excuse_insanity.json';
import * as crim_defence_justification_necessity from '@/legal_branches/criminal_law_defences/crim_defence_justification_necessity.json';
import * as crim_defence_mitigation_plea from '@/legal_branches/criminal_law_defences/crim_defence_mitigation_plea.json';
import * as crim_objection_preliminary from '@/legal_branches/criminal_law_defences/crim_objection_preliminary.json';

// Import individual civil procedure templates
import * as civ_proc_amendment_of_pleading from '@/legal_branches/civil_procedure_adjudications/civ_proc_amendment_of_pleading.json';
import * as civ_proc_intervention_by_third_party from '@/legal_branches/civil_procedure_adjudications/civ_proc_intervention_by_third_party.json';
import * as civ_proc_joinder_of_third_party from '@/legal_branches/civil_procedure_adjudications/civ_proc_joinder_of_third_party.json';
import * as civ_proc_judgment_objection_default from '@/legal_branches/civil_procedure_adjudications/civ_proc_judgment_objection_default.json';
import * as civ_proc_review_of_judgment from '@/legal_branches/civil_procedure_adjudications/civ_proc_review_of_judgment.json';
import * as succ_app_appoint_liquidator from '@/legal_branches/civil_procedure_adjudications/succ_app_appoint_liquidator.json';
import * as succ_app_seal_estate from '@/legal_branches/civil_procedure_adjudications/succ_app_seal_estate.json';


const contractLawTemplates = {
    contract_debt_recovery,
    contract_specific_performance,
    contract_termination_claim,
    app_attachment_before_judgment,
    app_judgment_on_admission
};

const propertyAndLandLawTemplates = {
    prop_petitory_vindication,
    prop_possessory_restoration,
    prop_boundary_encroachment,
    property_nuisance_cessation,
    property_servitude_right_of_way,
    property_possessory_disturbance,
    app_stay_construction,
    app_local_inspection,
    app_servitude_temporary_passage
};

const familyLawTemplates = {
    family_divorce_dispute,
    family_divorce_agreement,
    family_paternity_claim,
    family_post_judgment_partition,
    app_temporary_maintenance,
    app_property_preservation,
    app_protective_order
};

const labourLawTemplates = {
    labour_unlawful_termination,
    labour_unpaid_wages,
    labour_employment_injury
};

const publicServiceLawTemplates = {
    pub_serv_disciplinary_appeal,
    pub_serv_termination_unlawful,
    pub_serv_benefits_grievance
};

const successionLawTemplates = {
    succession_heirship_declaration,
    succession_probate_will,
    succession_partition_estate,
};

const ipLawTemplates = {
    ip_trademark_infringement,
    ip_trademark_opposition,
    ip_patent_infringement,
    ip_copyright_infringement,
    ip_moral_rights_violation,
    app_ip_interlocutory_injunction,
    app_ip_anton_piller
};

const statusLawTemplates = {
    status_judicial_interdiction,
    status_name_change,
    status_birth_date_correction,
    status_double_record_correction,
    status_ethiopian_descent_id,
    status_declaration_of_absence,
    app_status_provisional_curator,
    app_status_lift_interdiction
};

const taxCustomsLawTemplates = {
    tax_objection_admin_review,
    tax_appeal_ftac,
    customs_claim_for_refund,
    app_tax_stay_of_execution,
    app_tax_adr_request,
};

const tortLawTemplates = {
    tort_general_negligence_claim,
    tort_strict_liability_buildings,
};

const administrativeLawTemplates = {
    admin_appeal_judicial_review,
    admin_review_directive_legality,
};

const commercialLawTemplates = {
    comm_restitution_nonpayment,
    comm_preventive_restructuring,
    comm_dissolution_by_court,
    comm_appoint_auditors
};

const criminalLawDefencesTemplates = {
    crim_defence_justification_self_defence,
    crim_defence_excuse_insanity,
    crim_defence_justification_necessity,
    crim_defence_mitigation_plea,
    crim_objection_preliminary
};

const civilProcedureAdjudicationsTemplates = {
    civ_proc_amendment_of_pleading,
    civ_proc_intervention_by_third_party,
    civ_proc_joinder_of_third_party,
    civ_proc_judgment_objection_default,
    civ_proc_review_of_judgment,
    succ_app_appoint_liquidator,
    succ_app_seal_estate
};

const allTemplates = {
    ...contractLawTemplates,
    ...familyLawTemplates,
    ...labourLawTemplates,
    ...publicServiceLawTemplates,
    ...successionLawTemplates,
    ...propertyAndLandLawTemplates,
    ...ipLawTemplates,
    ...statusLawTemplates,
    ...taxCustomsLawTemplates,
    ...tortLawTemplates,
    ...administrativeLawTemplates,
    ...commercialLawTemplates,
    ...criminalLawDefencesTemplates,
    ...civilProcedureAdjudicationsTemplates,
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
        const func = new Function(...keys, `return ${'return ' + formula}`);
        return func(...values);
    } catch (e) {
        console.error("Error executing formula:", e);
        return 0; // Return 0 or some other default on error
    }
}


export const AA_SUBCITIES = [
  "አራዳ", "ቦሌ", "አዲስ ከተማ", "ኒፋስ ስልክ",
  "ቂርቆስ", "ጉለሌ", "ልደታ", "አቃቂ ቃሊቲ",
  "የካ", "ለሚ ኩራ", "ኮልፌ ቀራኒዮ", "ሌላ"
];

const AA_FIRST_INSTANCE_BENCHES = AA_SUBCITIES.map(sc => sc === 'ሌላ' ? sc : `${sc} ምድብ`);


export const BENCH_TYPES = [
    "ፍትሐብሔር ችሎት",
    "ቤተሰብ ችሎት",
    "ወንጀል ችሎት",
    "የንግድ ችሎት",
    "የሠራተኛ ግንኙነት ችሎት",
    "የታክስ ችሎት",
    "ይግባኝ ሰሚ ችሎት",
    "ሰበር ሰሚ ችሎት",
    "ሌላ"
];


export const COURT_HIERARCHY = {
  "የፌዴራል የመጀመሪያ ደረጃ ፍርድ ቤት": [
    "ልደታ ምድብ", 
    "ቦሌ ምድብ",
    "ቂርቆስ ምድብ",
    "አራዳ ምድብ",
    "የካ ምድብ", 
    "አቃቂ ቃሊቲ ምድብ",
    "ሌላ"
  ],
  "የፌዴራል ከፍተኛ ፍርድ ቤት": [
    "ልደታ ምድብ",
    "ቦሌ ምድብ",
    "አራዳ ምድብ",
    "አቃቂ ቃሊቲ ምድብ",
    "ሌላ"
  ],
  "የፌዴራል ጠቅላይ ፍርድ ቤት": [
    "ይግባኝ ሰሚ ችሎት", 
    "ሰበር ሰሚ ችሎት",
    "ሌላ"
  ],
  "የአዲስ አበባ ከተማ አስተዳደር የመጀመሪያ ደረጃ ፍርድ ቤት": AA_FIRST_INSTANCE_BENCHES,
  "የአዲስ አበባ ከተማ አስተዳደር ይግባኝ ሰሚ ፍርድ ቤት": ["ይግባኝ ሰሚ ችሎት", "ሌላ"],
  "የአዲስ አበባ ከተማ አስተዳደር ሰበር ሰሚ ችሎት": ["ሰበር ሰሚ ችሎት", "ሌላ"],
  "ሌላ": ["ሌላ"],
};

export const REGIONS_AND_CITIES = [
  "አዲስ አበባ",
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
  "ሌላ"
];

export const HONORIFICS = ["አቶ", "ወ/ሮ", "ወ/ሪት"];

export const EVIDENCE_LOCATIONS = [
  "በአመልካች እጅ",
  "በተከሳሽ እጅ",
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

const stripEnglish = (text: string) => {
    if (!text) return '';
    const match = text.match(/^(.*?)\s*\(/);
    return match ? match[1].trim() : text;
}


export const EVIDENCE_REGISTRY: EvidenceRegistry = Object.entries(allEntities).reduce((acc: EvidenceRegistry, [key, entity]: [string, any]) => {
    acc[key] = {
        id: key,
        label: stripEnglish(entity.title),
        type: 'Document', // Defaulting to document, can be refined
        credentialLabel: entity.credentialLabel || `${stripEnglish(entity.title)} ማጣቀሻ`,
        credentialPlaceholder: entity.credentialPlaceholder || `ለምሳሌ፦ ${key.substring(0, 3).toUpperCase()}-123`,
        sentenceTemplate: entity.sentenceTemplate || `${stripEnglish(entity.title)} ማስረጃ`
    };
    return acc;
}, {});

export const TEMPLATES: Template[] = [
  { 
    id: 'contract_law', 
    label: 'የውል ሕግ', 
    icon: FileSignature,
    subTemplates: [
      { id: 'contract_debt_recovery', label: 'የብድር/ዕዳ ክስ', icon: Banknote },
      { id: 'contract_specific_performance', label: 'ውል ይፈጸምልኝ ክስ', icon: Gavel },
      { id: 'contract_termination_claim', label: 'የውል ማፍረስ ክስ', icon: FileX2 },
    ]
  },
  { 
    id: 'family_law', 
    label: 'የቤተሰብ ሕግ', 
    icon: Handshake,
    subTemplates: [
      { id: 'family_divorce_dispute', label: 'የፍቺ ክርክር', icon: Scale },
      { id: 'family_divorce_agreement', label: 'የፍቺ ስምምነት', icon: Handshake },
      { id: 'family_paternity_claim', label: 'የአባትነት ክስ', icon: FileText },
      { id: 'family_post_judgment_partition', label: 'ከፍቺ በኋላ የንብረት ክፍፍል', icon: Building2 },
    ]
  },
  { 
    id: 'labour_law', 
    label: 'የሠራተኛ ሕግ', 
    icon: Briefcase,
    subTemplates: [
       { id: 'labour_unlawful_termination', label: 'ሕገ-ወጥ ስንብት', icon: FileText },
       { id: 'labour_unpaid_wages', label: 'ያልተከፈለ ደመወዝ', icon: Receipt },
       { id: 'labour_employment_injury', label: 'የሥራ ላይ ጉዳት', icon: HeartPulse },
    ]
  },
   { 
    id: 'public_service_law', 
    label: 'የመንግስት ሰራተኛ ህግ', 
    icon: Landmark,
    subTemplates: [
       { id: 'pub_serv_disciplinary_appeal', label: 'የዲሲፕሊን ይግባኝ', icon: FileText },
       { id: 'pub_serv_termination_unlawful', label: 'ሕገ-ወጥ ስንብት ይግባኝ', icon: FileText },
       { id: 'pub_serv_benefits_grievance', label: 'የጥቅማጥቅም ቅሬታ', icon: FileText },
    ]
  },
  {
    id: 'succession_law',
    label: 'የውርስ ሕግ',
    icon: Users,
    subTemplates: [
      { id: 'succession_heirship_declaration', label: 'የወራሽነት ማረጋገጫ', icon: FileText },
      { id: 'succession_probate_will', label: 'የኑዛዜ ማጽደቅ', icon: Gavel },
      { id: 'succession_partition_estate', label: 'የውርስ ንብረት ክፍፍል', icon: Building2 },
    ]
  },
  {
    id: 'property_and_land_law',
    label: 'የንብረት እና መሬት ህግ',
    icon: Map,
    subTemplates: [
        { id: 'prop_petitory_vindication', label: 'የይዞታ ክስ', icon: FileText },
        { id: 'prop_possessory_restoration', label: 'የተነጠቀ ይዞታን ማስመለስ', icon: FileText },
        { id: 'prop_boundary_encroachment', label: 'የድንበር መጣስ', icon: Map },
        { id: 'property_nuisance_cessation', label: 'የአደጋ መከላከል', icon: ShieldAlert },
        { id: 'property_servitude_right_of_way', label: 'የመንገድ መብት', icon: Map },
        { id: 'prop_possessory_disturbance', label: 'የይዞታ መረበሽ', icon: FileText },
    ]
  },
  {
    id: 'ip_law',
    label: 'የአእምሯዊ ንብረት ህግ',
    icon: Brain,
    subTemplates: [
        { id: 'ip_trademark_infringement', label: 'የንግድ ምልክት ጥሰት', icon: FileWarning },
        { id: 'ip_trademark_opposition', label: 'የንግድ ምልክት መቃወሚያ', icon: MessageSquareWarning },
        { id: 'ip_patent_infringement', label: 'የፓተንት ጥሰት', icon: FileWarning },
        { id: 'ip_copyright_infringement', label: 'የቅጂ መብት ጥሰት', icon: FileWarning },
        { id: 'ip_moral_rights_violation', label: 'የሞራል መብቶች ጥሰት', icon: BadgeCheck },
    ]
  },
  {
    id: 'status_law',
    label: 'የሰው ህግ እና ሁኔታ',
    icon: UserCheck,
    subTemplates: [
        { id: 'status_judicial_interdiction', label: 'የፍርድ እግድ', icon: FileText },
        { id: 'status_name_change', label: 'የስም ለውጥ', icon: FileSignature },
        { id: 'status_birth_date_correction', label: 'የልደት ቀን ማስተካከያ', icon: FileSignature },
        { id: 'status_double_record_correction', label: 'የተደጋገመ መዝገብ ማስተካከያ', icon: FileSignature },
        { id: 'status_ethiopian_descent_id', label: 'የትውልደ ኢትዮጵያዊ መታወቂያ', icon: FileSignature },
        { id: 'status_declaration_of_absence', label: 'የመጥፋት መግለጫ', icon: FileX2 },
    ]
  },
  {
    id: 'tax_customs_law',
    label: 'የግብር እና ጉምሩክ ህግ',
    icon: LandmarkIcon,
    subTemplates: [
        { id: 'tax_objection_admin_review', label: 'የግብር መቃወሚያ', icon: FileText },
        { id: 'tax_appeal_ftac', label: 'የግብር ይግባኝ', icon: Gavel },
        { id: 'customs_claim_for_refund', label: 'የጉምሩክ ተመላሽ ጥያቄ', icon: Receipt },
    ]
  },
  {
    id: 'tort_law',
    label: 'ከውል ውጭ ተጠያቂነት',
    icon: Siren,
    subTemplates: [
      { id: 'tort_general_negligence_claim', label: 'አጠቃላይ የቸልተኝነት ክስ', icon: FileText },
      { id: 'tort_strict_liability_buildings', label: 'ጥብቅ ተጠያቂነት (ህንጻዎች)', icon: Building2 },
    ]
  },
  {
    id: 'administrative_law',
    label: 'የአስተዳደር ህግ',
    icon: Landmark,
    subTemplates: [
      { id: 'admin_appeal_judicial_review', label: 'የውሳኔ ፍርድ ቤት ክለሳ', icon: Gavel },
      { id: 'admin_review_directive_legality', label: 'የመመሪያ ሕጋዊነት ክለሳ', icon: FileX2 },
    ]
  },
  {
    id: 'commercial_law',
    label: 'የንግድ ህግ',
    icon: Building2,
    subTemplates: [
      { id: 'comm_restitution_nonpayment', label: 'በንግድ መሣሪያ ላይ ክፍያ', icon: Banknote },
      { id: 'comm_preventive_restructuring', label: 'የዕዳ መልሶ ማዋቀር', icon: Shield },
      { id: 'comm_dissolution_by_court', label: 'የፍርድ ቤት መፍረስ', icon: FileX2 },
      { id: 'comm_appoint_auditors', label: 'ኦዲተር እንዲሾም መጠየቅ', icon: BookUser },
    ]
  },
  {
    id: 'criminal_law_defences',
    label: 'የወንጀል መከላከያዎች',
    icon: ShieldCheck,
    subTemplates: [
        { id: 'crim_defence_justification_self_defence', label: 'ራስን መከላከል', icon: Shield },
        { id: 'crim_defence_excuse_insanity', label: 'የአእምሮ ሕመም', icon: Brain },
        { id: 'crim_defence_justification_necessity', label: 'በግዴታ', icon: ShieldAlert },
        { id: 'crim_defence_mitigation_plea', label: 'የቅጣት ማቅለያ ክርክር', icon: UserMinus },
        { id: 'crim_objection_preliminary', label: 'የመጀመሪያ ደረጃ መቃወሚያ', icon: FileMinus },
    ]
  },
  {
    id: 'civil_procedure_adjudications',
    label: 'የፍትሐ ብሔር ሥነ ሥርዓት',
    icon: Gavel,
    subTemplates: [
      { id: 'civ_proc_amendment_of_pleading', label: 'የፍሬ ነገር ማሻሻያ', icon: FileSignature },
      { id: 'civ_proc_intervention_by_third_party', label: 'የሶስተኛ ወገን ጣልቃ ገብነት', icon: Users },
      { id: 'civ_proc_joinder_of_third_party', label: 'የሶስተኛ ወገን ማካተት', icon: Users },
      { id: 'civ_proc_judgment_objection_default', label: 'የሌሉበት ፍርድ መቃወሚያ', icon: ShieldAlert },
      { id: 'civ_proc_review_of_judgment', label: 'የፍርድ ዳግም ክለሳ', icon: FileX2 },
      { id: 'app_attachment_before_judgment', label: 'ከፍርድ በፊት እግድ', icon: Shield },
      { id: 'app_judgment_on_admission', label: 'በእምነት ላይ ፍርድ', icon: BookUser },
      { id: 'app_temporary_maintenance', label: 'ጊዜያዊ ቀለብ ጥያቄ', icon: Receipt },
      { id: 'app_property_preservation', label: 'የንብረት እግድ ጥያቄ', icon: Home },
      { id: 'app_protective_order', label: 'የጥበቃ ትዕዛዝ ጥያቄ', icon: ShieldAlert },
      { id: 'succ_app_appoint_liquidator', label: 'ዋና ከፋይ ሹመት', icon: BookUser },
      { id: 'succ_app_seal_estate', label: 'የንብረት ማሸግ', icon: Shield },
      { id: 'app_ip_interlocutory_injunction', label: 'ጊዜያዊ እገዳ', icon: Shield },
      { id: 'app_ip_anton_piller', label: 'የማስረጃ መያዣ ትዕዛዝ', icon: ShieldAlert },
      { id: 'app_status_provisional_curator', label: 'ጊዜያዊ ጠባቂ መሾም', icon: BookUser },
      { id: 'app_status_lift_interdiction', label: 'የእገዳ ማንሳት', icon: Gavel },
      { id: 'app_tax_stay_of_execution', label: 'የአፈጻጸም እግዳ', icon: Shield },
      { id: 'app_tax_adr_request', label: 'የአማራጭ መፍትሄ ጥያቄ', icon: Handshake },
      { id: 'app_stay_construction', label: 'ግንባታን የማገድ ትዕዛዝ', icon: Shield },
      { id: 'app_local_inspection', label: 'የአካባቢ ምርመራ ትዕዛዝ', icon: Map },
      { id: 'app_servitude_temporary_passage', label: 'ጊዜያዊ የመተላለፊያ ትዕዛዝ', icon: Map },
    ]
  }
];

// This function processes facts from the old structure to the new one.
const processFacts = (facts: any): Fact[] => {
    if (!facts) return [];
    
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
  
  const newTemplateData = JSON.parse(JSON.stringify(value));
  
  newTemplateData.facts = processFacts(newTemplateData.facts);

  newTemplateData.documentTitle = stripEnglish(newTemplateData.documentTitle);
  
  if (newTemplateData.jurisdictionText) {
    newTemplateData.jurisdictionText = stripEnglish(newTemplateData.jurisdictionText);
  }
  
  if (newTemplateData.partyTitles) {
      newTemplateData.partyTitles.applicant = stripEnglish(newTemplateData.partyTitles.applicant);
      newTemplateData.partyTitles.respondent = stripEnglish(newTemplateData.partyTitles.respondent);
  }

  if (newTemplateData.facts) {
    newTemplateData.facts.forEach((fact: Fact) => {
      fact.legalText = stripEnglish(fact.legalText);
      fact.label = stripEnglish(fact.label);
    });
  }

  if (newTemplateData.reliefs) {
    newTemplateData.reliefs.forEach((relief: Relief) => {
      relief.text = stripEnglish(relief.text);
    });
  }

  if (newTemplateData.templateDescription) {
    newTemplateData.templateDescription = newTemplateData.templateDescription.replace(/\s*\([^)]*\)/g, '').replace(/###\s*(.*?)\s*\n/g, '### $1\n').replace(/-\s/g, '');
  }
  
  if (newTemplateData.calculations) {
      Object.values(newTemplateData.calculations).forEach((calc: any) => {
          calc.title = stripEnglish(calc.title);
          calc.description = stripEnglish(calc.description);
          calc.inputs.forEach((input: any) => {
              input.label = stripEnglish(input.label);
          });
          calc.outputs.forEach((output: any) => {
              output.label = stripEnglish(output.label);
          });
      });
  }


  acc[key] = newTemplateData;
  return acc;
}, {} as { [key: string]: TemplateData });


const defaultCourtLevel = Object.keys(COURT_HIERARCHY)[0];
const defaultBench = COURT_HIERARCHY[defaultCourtLevel as keyof typeof COURT_HIERARCHY][0];
const defaultBenchType = BENCH_TYPES[0];

export const INITIAL_STATE: AppState = {
  metadata: {
    courtLevel: defaultCourtLevel,
    bench: defaultBench,
    benchType: defaultBenchType,
    city: REGIONS_AND_CITIES[0],
    fileNumber: '',
    date: new Date().toLocaleDateString('en-GB') + ' ዓ/ም',
    representation: 'self',
    summonsDelivery: 'self',
    claimPurpose: '',
    claimAmount: '',
    isManualAmount: false,
  },
  applicants: [{ id: '1', name: '', honorific: HONORIFICS[0], address: { city: REGIONS_AND_CITIES[0], subcity: AA_SUBCITIES[1], subcityOther: '', woreda: '', houseNo: '' } }],
  respondents: [],
  selectedFacts: [],
  selectedReliefs: [],
  maintenance: { 
    active: false, 
    income: 0, 
    children: 1,
    result: 0,
    context: '',
  },
  calculations: {},
  evidence: [],
  smartEvidence: {},
  partyTitles: { applicant: 'አመልካች', respondent: 'ተከሳሽ' },
  selectedTemplate: '',
  selectedSubTemplate: null,
};
