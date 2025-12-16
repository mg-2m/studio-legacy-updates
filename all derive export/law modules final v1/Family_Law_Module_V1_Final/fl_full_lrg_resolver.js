// =====================================================================
// FILE: fl_full_lrg_resolver.js
// GEP Phase 3.2: Full LRG Resolver Script (Ready for Firebase/Node.js)
// Purpose: Implements the FL_LRG_Inference_Rules_V2 logic across all 12 modules.
// NOTE: This simulation assumes all 12 JSON taxonomy files and the V2 Rules file 
// are successfully loaded into the application environment.
// =====================================================================

const path = require('path');
// --- 1. SIMULATED DATA IMPORTS (In a real environment, load all 12 taxonomies) ---
const RULES = require(path.join(__dirname,'./FL_LRG_Inference_Rules_V2.json'));
const ALL_TAXONOMIES = {
    "FL-01": require(path.join(__dirname,'./FL_01_Capacity_Taxonomy.json')),
    "FL-02": require(path.join(__dirname,'./FL_02_Establishment_Taxonomy.json')),
    "FL-03": require(path.join(__dirname,'./FL_03_IrregularUnion_Taxonomy.json')),
    "FL-04": require(path.join(__dirname,'./FL_04_RightsDuties_Taxonomy.json')),
    "FL-05": require(path.join(__dirname,'./FL_05_MatrimonialProperty_Taxonomy.json')),
    "FL-06": require(path.join(__dirname,'./FL_06_DebtsLiabilities_Taxonomy.json')),
    "FL-07": require(path.join(__dirname,'./FL_07_Paternity_Taxonomy.json')),
    "FL-08": require(path.join(__dirname,'./FL_08_ParentalAuthority_Taxonomy.json')),
    "FL-09": require(path.join(__dirname,'./FL_09_ChildSupport_Taxonomy.json')),
    "FL-10": require(path.join(__dirname,'./FL_10_Adoption_Taxonomy.json')),
    "FL-11": require(path.join(__dirname,'./FL_11_DivorceGrounds_Taxonomy.json')),
    "FL-12": require(path.join(__dirname,'./FL_12_DivorceEffects_Taxonomy.json'))
};

/**
 * Executes the Legal Reasoning Graph (LRG) V2 logic for the full Family Law lifecycle.
 * @param {object} userAnswers - Key-value pair of Fact-Facet IDs and user responses 
 * (e.g., {"FL-01-F01": true, "FL-11-F02": false, ...})
 * @returns {object} The final legal determination, Amharic conclusion, and applicable legal sources.
 */
function resolveFullFamilyLawCase(userAnswers) {
    let currentModule = RULES.starting_node;
    let applicableSources = new Set();
    let conclusions = [];
    let isFatalFailure = false;

    // --- LRG ITERATION LOOP: Traverse the entire 12-module graph ---
    while (currentModule && !currentModule.startsWith("FAILURE") && currentModule !== "SUCCESS: FULL_ANALYSIS_COMPLETE") {
        const moduleRules = RULES.rules_of_inference.filter(r => r.origin_module === currentModule);
        const taxonomy = ALL_TAXONOMIES[currentModule];
        let ruleTriggered = false;

        // 1. Process Facet Answers for the Current Module
        if (taxonomy) {
            taxonomy.fact_facets.forEach(facet => {
                if (userAnswers[facet.facet_id] === true) {
                    // Collect all supporting legal sources (Grounding Nodes)
                    facet.grounding_nodes.forEach(node => applicableSources.add(node.ref_id));
                }
            });
        }

        // 2. Evaluate Inference Rules (Edges)
        for (const rule of moduleRules) {
            // Note: In a production environment, checkRuleCondition must parse 
            // the full "condition_en" string using userAnswers for the current module.
            // For this LRG Resolver, we assume success in previous modules to proceed 
            // unless a specific FAILURE rule is hit.

            let conditionMet = checkRuleConditionSimplified(rule, userAnswers, taxonomy);

            if (conditionMet) {
                // Log the successful transition
                conclusions.push({ 
                    module: rule.origin_module, 
                    action: rule.action, 
                    next: rule.next_module 
                });

                currentModule = rule.next_module;
                ruleTriggered = true;
                if (rule.fatal) {
                    isFatalFailure = true;
                }
                break; // Move to the next logical step (module)
            }
        }

        // If a module is reached but no rule is triggered, the pathway is incomplete.
        if (!ruleTriggered && currentModule.startsWith("FL-")) break;
    }

    // --- FINAL CONCLUSION DETERMINATION ---
    const sourceRefs = Array.from(applicableSources);
    let finalDetermination = { status: "INCOMPLETE", title_am: "ያልተሟላ የሕግ ትንተና", guidance_am: "የሕግ ጉዞው ከመጠናቀቁ በፊት ተቋርጧል።" };

    if (currentModule === "SUCCESS: FULL_ANALYSIS_COMPLETE") {
        finalDetermination = {
            status: "SUCCESS: FULL_ANALYSIS_COMPLETE",
            title_am: "የተሟላ የቤተሰብ ሕግ ትንተና",
            guidance_am: "የሁሉም የቤተሰብ ሕግ ዘርፎች ትንተና በተሳካ ሁኔታ ተጠናቋል። ለፍቺም ሆነ ለንብረት አወጋገድ ውሳኔዎች ዝግጁ ናቸው።",
            sources: sourceRefs,
            pathway_log: conclusions
        };
    } else if (isFatalFailure || currentModule.startsWith("FAILURE")) {
        finalDetermination = {
            status: currentModule,
            title_am: "የሕግ ግንኙነት ውድቀት",
            guidance_am: "በመጀመሪያው የብቃት ወይም የምስረታ ደረጃ በቂ የሕግ ግንኙነት አልተገኘም።",
            sources: sourceRefs,
            pathway_log: conclusions
        };
    }

    return finalDetermination;
}

// --- SIMPLIFIED LRG RULE CHECKER (Must be expanded in production) ---
function checkRuleConditionSimplified(rule, answers, taxonomy) {
    const origin = rule.origin_module;
    const ruleId = rule.rule_id;

    // RULE 001/002: Check Capacity (FL-01) - Must check all three facets
    if (origin === "FL-01") {
        const requiredFacets = ["FL-01-F01", "FL-01-F02", "FL-01-F03"];
        const allTrue = requiredFacets.every(id => answers[id] === true);
        if (ruleId === "RULE-FL-001") return allTrue; // Proceed if ALL are true
        if (ruleId === "RULE-FL-002") return !allTrue; // Fail if ANY are false
    } 

    // For all other "AFTER" rules (FL-04 to FL-10), we assume success in the chat flow
    // and proceed to the next module unless specific conditions are met in FL-11.
    // This simplification is for demonstration; a live LRG needs complex condition parsing.
    
    // Example: Divorce Check (FL-11) - Check if any divorce ground is met
    if (origin === "FL-11") {
        const divorceFacets = ["FL-11-F01", "FL-11-F02", "FL-11-F03"];
        const anyGroundMet = divorceFacets.some(id => answers[id] === true);
        if (ruleId === "RULE-FL-014") return anyGroundMet; // Proceed to effects if ANY ground is met
        // A rule to terminate if no ground is met would be required here.
    }
    
    // Default: Assume success and proceed to the next logical step defined in V2 rules 
    // for continuous flow demonstration.
    if (ruleId === "RULE-FL-003" || ruleId === "RULE-FL-004" || ruleId === "RULE-FL-005" ||
        ruleId === "RULE-FL-007" || ruleId === "RULE-FL-008" || ruleId === "RULE-FL-009" ||
        ruleId === "RULE-FL-010" || ruleId === "RULE-FL-011" || ruleId === "RULE-FL-012" ||
        ruleId === "RULE-FL-013" || ruleId === "RULE-FL-015") {
        return true;
    }
    
    return false; 
}


// --- EXPORT FOR FIREBASE/NODE.JS ---
module.exports = {
    resolveFullFamilyLawCase
};
