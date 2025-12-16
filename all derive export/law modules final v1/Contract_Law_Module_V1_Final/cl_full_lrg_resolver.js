/**
 * Contract Law LRG Resolver (V2 - Refactored)
 * GEP Integration Phase - V2
 * Purpose: Standardized resolver for the master_resolver.js. It wraps the original logic to produce a single, structured output.
 */

/**
 * [STANDARDIZED] Executes the Legal Reasoning Graph for Contract Law.
 * @param {object} userAnswers - An object where keys are facet IDs (e.g., 'CL-01-F01') and values are boolean.
 * @returns {object} The final legal determination in a standardized format.
 */
function resolve(userAnswers) {
    const internalConclusions = [];
    const check = (facetId) => userAnswers[facetId] === true;

    // --- ORIGINAL LOGIC TO GATHER ALL APPLICABLE CONCLUSIONS ---

    // R01: Valid Contract
    if (check('CL-01-F01') && check('CL-01-F02') && check('CL-01-F03') && check('CL-01-F04')) {
        internalConclusions.push({ rule: "CL-R01", title_en: "Valid Contract", title_am: "የጸና ውል", guidance_en: "The contract is valid as it meets all formation requirements.", guidance_am: "ውሉ ሁሉንም የምስረታ መስፈርቶች ስለሚያሟላ የጸና ነው።" });
    }

    // R02: Invalidity due to Incapacity/Consent
    if (!check('CL-01-F01') || !check('CL-01-F02')) {
        internalConclusions.push({ rule: "CL-R02", title_en: "Invalid Contract (Incapacity/Consent)", title_am: "የማይጸና ውል (ችሎታ/ስምምነት)", guidance_en: "The contract is invalid due to lack of capacity or consent.", guidance_am: "ውሉ በችሎታ ወይም በስምምነት እጦት ምክንያት የማይጸና ነው።" });
    }

    // R03: Invalidity due to Object/Form
    if (!check('CL-01-F03') || !check('CL-01-F04')) {
        internalConclusions.push({ rule: "CL-R03", title_en: "Invalid Contract (Object/Form)", title_am: "የማይጸና ውል (ነገር/ቅጽ)", guidance_en: "The contract is invalid because its object is impossible/illicit, or it fails to meet formal requirements.", guidance_am: "የውሉ ነገር የማይቻል/ሕገ-ወጥ ስለሆነ ወይም የቅጽ መስፈርቶችን ባለማሟላቱ ውሉ የማይጸና ነው።" });
    }

    // R05: Non-performance
    if (check('CL-05-F01') && !check('CL-05-F02') && !check('CL-05-F03')) {
        internalConclusions.push({ rule: "CL-R05", title_en: "Non-performance", title_am: "አለመፈጸም", guidance_en: "Non-performance by the debtor is established.", guidance_am: "በዕዳው ላይ ያለመፈጸም ተረጋግጧል።" });
    }
    
    // --- CONCLUSION PROCESSING ---
    if (internalConclusions.length === 0) {
        return {
            status: "INFO: NO_CONCLUSION",
            title_en: "No Specific Conclusion Drawn",
            guidance_en: "The provided facts did not trigger a specific legal rule in the Contract Law module.",
            title_am: "ልዩ መደምደሚያ አልተገኘም",
            guidance_am: "የተሰጡት እውነታዎች በውል ሕግ ሞጁል ውስጥ የተለየ የሕግ ደንብ አላስነሱም።",
            secondary_findings: []
        };
    }

    const primary = internalConclusions[0];
    const secondary = internalConclusions.slice(1);

    return {
        status: `SUCCESS: ${primary.rule}`,
        title_en: primary.title_en,
        guidance_en: primary.guidance_en,
        title_am: primary.title_am,
        guidance_am: primary.guidance_am,
        secondary_findings: secondary
    };
}

// --- EXPORT FOR FIREBASE/NODE.JS ---
module.exports = {
    resolve
};
