
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * Cloud Function: getExpertTemplate
 * Trigger: HTTPS Request
 * Fetches a complete LRG module for the "Expert Mode" UI.
 */
exports.getExpertTemplate = functions.https.onCall(async (data, context) => {
  const templateId = data.templateId;

  if (!templateId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with one argument 'templateId'."
    );
  }

  try {
    const docRef = db.collection("lrg_modules").doc(templateId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        `No expert template found with ID: ${templateId}`
      );
    }

    console.log(`Successfully fetched expert template: ${templateId}`);
    return doc.data();

  } catch (error) {
    console.error("Error fetching expert template:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to retrieve expert template."
    );
  }
});

/**
 * Cloud Function: getNextSocraticNode
 * Trigger: HTTPS Request
 * Determines and fetches the next conversational node for the "Socratic Mode" UI.
 */
exports.getNextSocraticNode = functions.https.onCall(async (data, context) => {
  const currentNodeId = data.currentNodeId;
  const userAnswers = data.userAnswers || {};

  if (!currentNodeId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'currentNodeId'."
    );
  }

  try {
    // This is a simplified logic for the MVP.
    // A real implementation would have a complex rules engine here to evaluate userAnswers.
    const docRef = db.collection("lrg_nodes").doc(currentNodeId);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        `No Socratic node found with ID: ${currentNodeId}`
      );
    }

    const nodeData = doc.data();

    // MVP LOGIC: For now, we assume a simple linear progression.
    // The 'next_node_ids' array in the Firestore document would define the next possible steps.
    // We will select the first one by default.
    const nextNodeId = nodeData.next_node_ids ? nodeData.next_node_ids[0] : null;

    let nextNode = null;
    if (nextNodeId) {
        const nextDocRef = db.collection("lrg_nodes").doc(nextNodeId);
        const nextDoc = await nextDocRef.get();
        if(nextDoc.exists) {
            nextNode = nextDoc.data();
        }
    }

    console.log(`Socratic transition: ${currentNodeId} -> ${nextNodeId}`);
    
    // The function returns the content of the *current* node that the UI should display,
    // and provides the ID of the *next* node for the UI to request upon user action.
    return {
        currentNode: nodeData,
        nextNode: nextNode // Sending the next node's data for pre-loading if desired
    };

  } catch (error) {
    console.error("Error fetching Socratic node:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to retrieve Socratic node."
    );
  }
});
