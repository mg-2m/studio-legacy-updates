/**
 * MASTER LEGAL REASONING RESOLVER (V3 - ROBUST)
 * GEP Integration Phase - Final
 * Purpose: Dynamically discovers and dispatches queries to individual law modules.
 * This version is resilient to filename variations in the modules.
 */

const path = require('path');
const fs = require('fs');

// --- 1. SETUP & DYNAMIC MODULE REGISTRATION ---

// Base directory where all law modules are located.
const MODULES_DIR = path.join(__dirname, 'all derive export', 'law modules final v1');

const registeredModules = {};

console.log('---[ Master Resolver Initializing ]---');

try {
    // Get all directories in the modules folder (e.g., 'Family_Law_Module_V1_Final')
    const moduleDirectories = fs.readdirSync(MODULES_DIR);

    for (const dir of moduleDirectories) {
        const modulePath = path.join(MODULES_DIR, dir);
        
        // Check if it's actually a directory
        if (fs.statSync(modulePath).isDirectory()) {
            const filesInDir = fs.readdirSync(modulePath);
            
            // Find the resolver file using a flexible pattern.
            // It can be 'fl_core_resolver.js', 'pl_full_lrg_resolver.js', etc.
            const resolverFile = filesInDir.find(f => 
                f.endsWith('_resolver.js') || f.includes('_lrg_')
            );

            if (resolverFile) {
                const resolverPath = path.join(modulePath, resolverFile);
                // The module key is derived from the folder name (e.g., 'family')
                const moduleKey = dir.split('_')[0].toLowerCase();
                
                console.log(`- Registering module '${moduleKey}' from: ./${path.relative(__dirname, resolverPath)}`);
                
                // Require the discovered resolver file.
                registeredModules[moduleKey] = require(resolverPath);
            } else {
                console.log(`- WARNING: No resolver file found in directory: ${dir}`)
            }
        }
    }
} catch (error) {
    console.error('FATAL: Could not initialize master_resolver. Error during module discovery:', error);
    // Exit gracefully if module loading fails, to prevent silent crashes.
    process.exit(1); 
}

console.log('---[ Master Resolver Ready ]---\n');


// --- 2. MASTER DISPATCH FUNCTION ---

/**
 * [MASTER FUNCTION] Dispatches a legal query to the appropriate, dynamically-loaded module.
 * @param {string} lawModule - The key for the law module (e.g., 'family', 'property').
 * @param {object} userAnswers - The user's answers.
 * @returns {object} The result from the specific law module's resolver.
 */
function resolveLegalQuery(lawModule, userAnswers) {
    const resolver = registeredModules[lawModule];

    if (resolver && typeof resolver.resolve === 'function') {
        return resolver.resolve(userAnswers);
    } else {
        return {
            status: "ERROR: MODULE_NOT_FOUND",
            title_en: "Module Not Found",
            guidance_en: `The requested law module '${lawModule}' is not registered or is invalid.`,
            available_modules: Object.keys(registeredModules)
        };
    }
}

// --- 3. EXPORT ---

module.exports = {
    resolveLegalQuery,
    registeredModules // Exporting for testing/debugging purposes
};