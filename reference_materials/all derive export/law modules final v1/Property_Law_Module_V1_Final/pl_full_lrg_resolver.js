
/**
 * Property Law LRG Resolver (V2 - Refactored)
 * GEP Integration Phase - V2
 * Purpose: Standardized resolver for the master_resolver.js. It wraps the original logic to produce a single, structured output.
 */

/**
 * [STANDARDIZED] Executes the Legal Reasoning Graph for Property Law.
 * @param {object} userAnswers - An object where keys are facet IDs (e.g., 'PL-01-F01') and values are boolean.
 * @returns {object} The final legal determination in a standardized format.
 */
function resolve(userAnswers) {
    const internalConclusions = [];
    const check = (facetId) => userAnswers[facetId] === true;

    // --- ORIGINAL LOGIC TO GATHER ALL APPLICABLE CONCLUSIONS ---
    // This logic remains the same, but pushes to 'internalConclusions'

    // R01: Property Classification
    if ((check('PL-01-F01') || check('PL-01-F02') || check('PL-01-F03')) && (!check('PL-01-F04'))) {
        internalConclusions.push({ rule: "PL-R01", title_en: "Property Classification", title_am: "የንብረት ምደባ", guidance_am: "ንብረቱ ለግል ንብረት ሕግ ተገዢ ነው::", guidance_en: "The property is subject to private property law." });
    }
    if (check('PL-01-F04')) {
        internalConclusions.push({ rule: "PL-R01", title_en: "Public Property Status", title_am: "የሕዝብ ንብረት ሁኔታ", guidance_am: "ንብረቱ የሕዝብ ንብረት በመሆኑ በልዩ ሕጎች ተገዢ ነው::", guidance_en: "The property is public property and is governed by special laws." });
    }

    // R02: Ownership and Limits
    if (check('PL-02-F01')) {
        let limitation_am = check('PL-02-F02') || check('PL-02-F03') || check('PL-02-F04') ? "ሆኖም የመብቱ አጠቃቀም በሕግ ወይም በጎረቤት ግንኙነት ገደብ ተጥሎበታል::" : "";
        let limitation_en = check('PL-02-F02') || check('PL-02-F03') || check('PL-02-F04') ? "However, the use of the right is limited by law or neighborly relations." : "";
        internalConclusions.push({ rule: "PL-R02", title_en: "Ownership Rights", title_am: "የባለቤትነት መብቶች", guidance_am: `የባለቤትነት መብት አለ:: ${limitation_am}`.trim(), guidance_en: `Ownership rights exist. ${limitation_en}`.trim() });
    }

    // R04: Valid Acquisition
    if ((check('PL-04-F01') && check('PL-10-F01')) || check('PL-04-F02') || check('PL-04-F03') || check('PL-04-F04')) {
        internalConclusions.push({ rule: "PL-R04", title_en: "Valid Acquisition", title_am: "ሕጋዊ የባለቤትነት ማግኛ", guidance_am: "ባለቤትነት በሕጋዊ መንገድ (በውል፣ በይዞታ ወይም በውርስ/ጊዜ ገደብ) ተገኝቷል::", guidance_en: "Ownership was acquired legally (by contract, possession, or succession/prescription)." });
    }
    
    // R09: Mortgage Validity
    if (check('PL-09-F01') && check('PL-09-F02') && check('PL-09-F04')) {
        internalConclusions.push({ rule: "PL-R09", title_en: "Valid Mortgage", title_am: "የጸና የብድር መያዣ", guidance_am: "ብድር መያዣው (Mortgage) በምዝገባ ምክንያት ሕጋዊና ፍጹም ነው፣ አበዳሪው የመቅደም መብት አለው::", guidance_en: "The mortgage is legal and perfected due to registration; the creditor has priority rights." });
    }
    
    // R10: Registration Effect
    if (check('PL-10-F01') && !check('PL-10-F02')) {
        internalConclusions.push({ rule: "PL-R10", title_en: "Registered Right", title_am: "የተመዘገበ መብት", guidance_am: "የማይንቀሳቀሰው መብት ተመዝግቧል እና በሁሉም ሶስተኛ ወገኖች ላይ የጸና ነው::", guidance_en: "The immovable right is registered and is effective against all third parties." });
    }
    if (check('PL-10-F01') && check('PL-10-F02')) {
         internalConclusions.push({ rule: "PL-R10", title_en: "Non-Registration Effect", title_am: "ያልተመዘገበ መብት ውጤት", guidance_am: "መብቱ ባለመመዝገቡ ምክንያት በተዋዋይ ወገኖች መካከልም እንኳ ሕጋዊ ውጤት የማያመጣ ይሆናል::", guidance_en: "Due to non-registration, the right may not have legal effect, even between the contracting parties." });
    }

    // --- CONCLUSION PROCESSING ---
    if (internalConclusions.length === 0) {
        return {
            status: "INFO: NO_CONCLUSION",
            title_en: "No Specific Conclusion Drawn",
            guidance_en: "The provided facts did not trigger a specific legal rule in the Property Law module.",
            title_am: "ልዩ መደምደሚያ አልተገኘም",
            guidance_am: "የተሰጡት እውነታዎች በንብረት ሕግ ሞጁል ውስጥ የተለየ የሕግ ደንብ አላስነሱም።",
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
