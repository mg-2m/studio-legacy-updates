
const mammoth = require("mammoth");
const fs = require("fs").promises;
const path = require("path");

async function healFile(filePath) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        let newFilePath = filePath.replace(".docx", "");
        
        // Ensure the new file has the correct extension if it was double-barreled
        if (!/\.(json|md|js)$/i.test(newFilePath)) {
            if (newFilePath.includes("json")) {
                newFilePath += ".json";
            } else if (newFilePath.includes("md")) {
                newFilePath += ".md";
            } else if (newFilePath.includes("js")) {
                newFilePath += ".js";
            }
        }
        
        await fs.writeFile(newFilePath, result.value);
        console.log(`Healed: ${filePath} -> ${newFilePath}`);
    } catch (error) {
        console.error(`Error healing ${filePath}:`, error);
    }
}

async function walkAndHeal(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await walkAndHeal(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".docx")) {
            await healFile(fullPath);
        }
    }
}

const rootDir = "all derive export";
walkAndHeal(rootDir)
    .then(() => console.log("\nArtifact healing process complete."))
    .catch(console.error);
