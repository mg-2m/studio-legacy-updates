 {
  "meta": {
    "branchName": "Contract Law (የውል ህግ)",
    "branchDescription": "General contract formation, performance, breach, remedies, and extinction under the Ethiopian Civil Code Title XII (Arts. 1675-1850) and specialized contract types governed by Title XV-XX.",
    "icon": "FileText",
    "version": "2.0",
    "lastUpdated": "2025-11-27",
    "jurisdiction": "Federal Democratic Republic of Ethiopia - Federal & Regional Courts (First Instance & Appellate)",
    "cassationBinding": "All templates reference binding Cassation Bench File Numbers (መዝገብ ቁጥር) where applicable"
  },
  "templates": [
    {
      "id": "cont_formation_consent_vitiation",
      "documentTitle": "ጥያቄ ለውል ስምምነት መጣስ - Petition for Invalidation of Contract Due to Vitiated Consent (Mistake/Fraud/Duress)",
      "jurisdictionText": "የኢትዮጵያ ሲቪል ኮድ አንቀጽ 1696-1714 (Civil Code of Ethiopia 1960, Arts. 1696-1714); የህዳሴ ሕግ አንቀጽ 1810-1820 (Invalidation and Cancellation, Arts. 1810-1820)",
      "meta": {
        "keywords": [
          "ውል ስምምነት",
          "መጣስ ስምምነት",
          "ስወር",
          "ታተቅ",
          "ጭፍጨት",
          "vitiated consent",
          "mistake",
          "fraud",
          "duress",
          "invalidation"
        ],
        "complexity": "High",
        "jurisdictionType": "Federal/Regional First Instance; Cassation authority on interpretation"
      },
      "templateDescription": "### መመሪያ\n\nይህ ትንቢት ውል የተደረገ ስምምነት በተግባራዊ ስውር (ስህተት)፣ ታተቅ (ማጭበርበር)፣ ወይም ጭፍጨት (ግፊት) ተጎዳ ለኬለ ነው።\n\n### Period of Limitation (ይርጋ)\n\nPer Civil Code Art. 1813: 2 years from date ground for invalidation disappeared.\n\n### Prerequisites\n\n1. Valid Contract Formation (Art. 1675-1680)\n2. Proof of Specific Vice (mistake, fraud, or duress)\n3. Materiality of Vice to contract\n4. Evidence of Causation",
      "partyTitles": {
        "applicant": "አቤቱታ አቅራቢ (Petitioner - Injured Party)",
        "respondent": "አቤቱታ ተቀባይ (Respondent - Other Party)"
      },
      "facts": {
        "group_1": {
          "title": "Valid Contract Formation",
          "facets": [
            {
              "id": "cont_fact_contract_validly_formed",
              "legalText": "Valid contract formed per Art. 1675-1680",
              "citation": "Civil Code Art. 1675, Art. 1680",
              "autoEvidence": [
                "proof_of_contract",
                "written_agreement"
              ],
              "mutexGroup": "nil"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "cont_relief_declare_invalid",
          "text": "Declare contract invalid with full restitution",
          "isDefault": true,
          "isDynamic": false
        }
      ]
    }
  ]
}

#part two
{
  "meta": {
    "branchName": "Contract Law (የውል ህግ)",
    "branchDescription": "General contracts, formation, performance, breach, remedies, and extinction under the Ethiopian Civil Code Title XII (Arts. 1675-1850) and specialized contracts under Title XV-XX. Governed exclusively by Civil Code 1960 with binding Cassation Bench interpretation.",
    "icon": "FileText",
    "version": "2.0",
    "lastUpdated": "2025-11-27",
    "jurisdiction": "Federal Democratic Republic of Ethiopia - Federal & Regional First Instance Courts; Federal Supreme Court Cassation Division (Binding Interpretation)",
    "legalBasis": "Civil Code of Ethiopia 1960 (Proclamation No. 165 of 1960), as amended; Civil Procedure Code 1965; Commercial Code 1960 (for specialized contracts)"
  },
  "templates": [
    {
      "id": "cont_consent_vitiation_mistake",
      "documentTitle": "ውል ሕጋዊ ያልሆነ ሆኖ - ስህተት በስምምነት ውስጥ | Petition for Invalidation of Contract (Essential Mistake)",
      "jurisdictionText": "የሲቪል ኮድ አንቀጽ 1675-1714 (Arts. 1675-1714); Art. 1810-1820 (Invalidation/Cancellation); Art. 1697-1703 (Mistake Standards); File No. [Cassation Volume on Mistake in Consent]",
      "meta": {
        "keywords": [
          "ስህተት በስምምነት",
          "ተግባራዊ ስውር",
          "ውሉ ሕጋዊ ያልሆነ",
          "mistake vitiating consent",
          "essential error",
          "fundamental mistake",
          "ውሉ ማስወቅ",
          "invalidation petition"
        ],
        "complexity": "High",
        "jurisdictionType": "Federal/Regional First Instance; Cassation Review",
        "evidenceStandard": "Clear and convincing proof that reasonable person would not have contracted had truth been known"
      },
      "templateDescription": "### መመሪያ (Guide)\n\nይህ ትንቢት ውል በስምምነት ውስጥ ተግባራዊ ስውር (essential mistake) ተጎዳ ለውል ሕጋዊ ያልሆነ ሆኖ ጠይቆ ነው። አቤቱታ አቅራቢ ስህተቱ ውሉ ተግባር ጣቢያ ላይ ፈጠር ወይም ሕጋዊ ሁኔታ ስህተት መሆንን ሊያሳይ ይገባል።\n\n**Application:** When contract formed through fundamental mistake regarding essential element. Petitioner must prove: (1) mistake existed at formation; (2) mistake was material/essential; (3) reasonable person would not have contracted had truth been known; (4) mistake was not merely motive.\n\n### Period of Limitation (ይርጋ / Time Limit)\n\n**Art. 1813 (Civil Code):** 2 years from date ground for invalidation disappeared (e.g., discovery of error)\n\n**Strict enforcement:** Court must dismiss claim if outside 2-year window. No equitable exceptions.\n\n### Prerequisites (አስፈላጊ ቅድመ-ሁኔታዎች)\n\n1. **Valid Contract Formation** - All elements present except defective consent\n2. **Mistake must be fundamental** - Relate to nature of contract, identity of party, or essential quality (Art. 1699-1700)\n3. **Petitioner's state of mind** - Must prove would not have contracted if truth known (Art. 1697)\n4. **Causation** - Mistake directly led to entry into contract",
      "partyTitles": {
        "applicant": "አቤቱታ አቅራቢ (ስህተት ተጎዳ) | Petitioner (Party Suffering Mistake)",
        "respondent": "አቤቱታ ተቀባይ (ሌላ ተዋሊ) | Respondent (Other Contracting Party)"
      },
      "facts": {
        "group_1": {
          "title": "Valid Contract Formation (ውሉ ሕጋዊ ሁኔታ) - Art. 1675-1680",
          "facets": [
            {
              "id": "cont_fact_contract_validly_formed_elements",
              "legalText": "በ[Date] በ[Place] ከአቤቱታ ተቀባይ ጋር ሕጋዊ ውል ተመሰረተ በሙሉ ስምምነት፣ ሕጋዊ ነገር፣ እና ሕጋዊ ምጥንት ጋር (Art. 1675, 1680)።",
              "citation": "Civil Code Art. 1675 (Contract Defined); Art. 1680 (No Valid Contract Without Capacity, Consent, Legal Object, Proper Form)",
              "autoEvidence": ["written_contract", "signed_by_both_parties", "dated_and_placed"],
              "mutexGroup": "nil"
            }
          ]
        },
        "group_2": {
          "title": "Essential Mistake - Fundamental to Contract (Art. 1697-1703)",
          "facets": [
            {
              "id": "cont_fact_mistake_identity_party",
              "legalText": "አቤቱታ አቅራቢ [በስህተት / በአወቃቀር ስህተት] በአቤቱታ ተቀባይ ሞሙ ወይም ሙሙ ምስረታ ተግባር ሙሙ ሊሆን ሳይአወቅ ውሉ ሰጠ (Art. 1700)። ሙሙ ግላዊ ሙሙ / ብስራት ውሉ ጣቢያ ነው።",
              "citation": "Civil Code Art. 1700 (Mistake regarding Identity/Qualifications of Party as Essential Element)",
              "autoEvidence": ["identity_evidence", "qualifications_documentation", "prior_dealings"],
              "mutexGroup": "mistake_type"
            },
            {
              "id": "cont_fact_mistake_nature_contract",
              "legalText": "አቤቱታ አቅራቢ [ውሉ ምስረታ / ውሉ ተግባር] ስህተት ተገደለ። ለምሳሌ፤ የ[Sales Contract] ትንቢት ሆኖ ያልታወቀ ለ[Loan Contract]። ስህተት ውሉ ተግባር ፈጠር (Art. 1699)።",
              "citation": "Civil Code Art. 1699 (Mistake regarding Nature of Contract as Fundamental)",
              "autoEvidence": ["contract_language_analysis", "correspondence", "witness_testimony"],
              "mutexGroup": "mistake_type"
            },
            {
              "id": "cont_fact_mistake_substantial_performance",
              "legalText": "አቤቱታ አቅራቢ ስህተት ውሉ ሰጠ ይህ [ሙሉ ተግባር ሙሙ/ትንሹ ዋጋ] [ከሰጠ / ከወሰዱ] እንደ [ሕጋዊ ግዴታ] ይልቅ [ሕጋዊ ተወሲድ]። (Art. 1699 - Petitioner undertook substantially greater performance or received substantially smaller consideration than intended.)",
              "citation": "Civil Code Art. 1699(b) (Mistake regarding Substantially Different Performance or Consideration)",
              "autoEvidence": ["contract_terms_comparison", "market_value_evidence", "accounting_records"],
              "mutexGroup": "mistake_type"
            },
            {
              "id": "cont_fact_mistake_not_motive",
              "legalText": "ስህተቱ [ምክንያት / ስሕተት ራዖ] ኢኢ ሳይሆን በውሉ ጣቢያ ተግባር ውስጥ ነው። ለምሳሌ፤ ውሉ ፍ[Economy / ገበያ ሁኔታ] ስህተት ረክ። (Per Art. 1702, mistakes concerning only motives/reasons do not vitiate consent.)",
              "citation": "Civil Code Art. 1702 (Mistakes regarding Only Motives Cannot Vitiate Consent)",
              "autoEvidence": ["contract_substance_analysis", "legal_expert_opinion"],
              "mutexGroup": "nil"
            }
          ]
        },
        "group_3": {
          "title": "Petitioner's Intent (Would Not Have Contracted) - Art. 1697-1698",
          "facets": [
            {
              "id": "cont_fact_causation_would_not_contract",
              "legalText": "አቤቱታ አቅራቢ እውነታ ውሉ ውስጥ ከገቢ ሳይሆን [ስህተት/ሌላ ሁኔታ]። ውሉ ሰጠ ተግባራዊ ስህተት ውለዋ (Art. 1697-1698)።",
              "citation": "Civil Code Art. 1697 (Party Must Establish Would Not Have Entered if Known Truth); Art. 1698 (Burden of Proof on Mistaken Party)",
              "autoEvidence": ["party_testimony", "prior_negotiations", "business_practices", "expert_evidence"],
              "mutexGroup": "nil"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "cont_relief_declare_invalid_restitution",
          "text": "ኢኢ | Declare Contract Invalid with Full Restitution - ፍርድ ቤት ውሉ ሕጋዊ ያልሆነ ሆኖ ሙሉ ወደ ሕጋዊ ሁኔታ መልሶ (Art. 1817-1819)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "cont_relief_partial_invalidation",
          "text": "Partial Invalidation - Only defective portion voided (Art. 1819)",
          "isDefault": false,
          "isDynamic": false
        },
        {
          "id": "cont_relief_damages",
          "text": "Damages Where Full Restitution Impossible (Art. 1816-1820)",
          "isDefault": false,
          "isDynamic": false
        }
      ]
    },
    {
      "id": "cont_breach_nonperformance_full_remedies",
      "documentTitle": "ውሉ አለመፈጸም ክስ | Claim for Non-Performance (Breach) with Full Remedies",
      "jurisdictionText": "Civil Code Art. 1771-1807 (Non-Performance & Remedies); Art. 1845-1850 (Limitation of Actions - 10 years from due date); Art. 1792-1796 (Force Majeure Exceptions)",
      "meta": {
        "keywords": ["breach of contract", "ውል መጥፋት", "ግዴታ አለመፈጸም", "forced performance", "cancellation", "damages", "default notice", "ማተም"],
        "complexity": "Medium-High",
        "jurisdictionType": "Federal/Regional First Instance; Cassation for Interpretation of Fundamental Breach",
        "remedyFramework": "Forced Performance (Art. 1776-1778) → Cancellation (Art. 1785-1787) → Damages (Art. 1799-1805)"
      },
      "templateDescription": "### መመሪያ\n\nይህ ትንቢት አቤቱታ ተቀባይ በውል ስር ጉልህ ግዴታ አለመፈጸም በክስ ስር ነው። አቤቱታ አቅራቢ (creditor) ሦስት ዋና ዕርምጃ ሊጠይቅ ይችላል፤ (1) ግዴታ ሙሉ ማውጣት (forced performance) (Art. 1776); (2) ውሉ ሂድ ሙሉ (cancellation) (Art. 1785); ወይም (3) ጉዳት ማስከር (damages) (Art. 1799)።\n\n**Application:** When debtor fails to perform essential contractual obligations. Remedies are cumulative unless inconsistent. Court must determine whether breach is fundamental before ordering cancellation.\n\n### Period of Limitation (ይርጋ) - CRITICAL\n\n**Art. 1845 (Civil Code):** 10 YEARS from date performance was due (not from date of breach)\n\n**ABSOLUTE BAR:** No equitable exceptions. Court dismisses claim if outside 10-year window.\n\n### Prerequisites (Must Prove)\n\n1. **Valid Contract Formation** (Art. 1675-1680)\n2. **Default Notice (ማተም)** - Written notice required except Art. 1775 exceptions\n3. **Reasonable Period for Cure** - Unless obligation is to refrain from acts\n4. **Actual Non-Performance** - Complete failure or material defect\n5. **Fundamental Breach** - For cancellation remedy (Art. 1785)",
      "partyTitles": {
        "applicant": "አቤቱታ አቅራቢ (ተ ጠየቂ/ተ creditor) | Petitioner (Creditor/Performing Party)",
        "respondent": "አቤቱታ ተቀባይ (ተ debtor) | Respondent (Non-Performing Debtor)"
      },
      "facts": {
        "group_1": {
          "title": "Valid Contract & Essential Obligation (Art. 1675-1680, 1785)",
          "facets": [
            {
              "id": "cont_fact_valid_essential_obligation",
              "legalText": "ውሉ በ[Date] በሕጋዊ ምጥንት ተፈጸመ። ግዴታ [Obligation Description] ውሉ ጣቢያ ነው (Art. 1785 - fundamental)।",
              "citation": "Civil Code Art. 1675-1680 (Contract Formation); Art. 1785 (Fundamental Breach)",
              "autoEvidence": ["contract_document", "signed_agreement", "dated_evidence"],
              "mutexGroup": "nil"
            }
          ]
        },
        "group_2": {
          "title": "Default Notice (ማተም) - Art. 1772-1775",
          "facets": [
            {
              "id": "cont_fact_notice_given_written",
              "legalText": "አቤቱታ አቅራቢ በ[Date] በተጻፈ ማተም አቤቱታ ተቀባይን ለግዴታ ማውጣት አስተማረቀ በ[Reasonable Period] ውስጥ (Art. 1772-1774)።",
              "citation": "Civil Code Art. 1772-1774 (Notice Requirement, Reasonable Period)",
              "autoEvidence": ["notice_document", "proof_of_delivery", "registered_mail", "attorney_letter"],
              "mutexGroup": "notice_status"
            },
            {
              "id": "cont_fact_notice_exemption_applies",
              "legalText": "ማተም አይቀሩም ምክንያቱ: [Obligation to Refrain / Fixed Deadline Expired / Written Refusal / Party Agreement] (Art. 1775(a)-(d))።",
              "citation": "Civil Code Art. 1775 (Exceptions to Notice Requirement)",
              "autoEvidence": ["contract_language", "written_refusal", "express_waiver"],
              "mutexGroup": "notice_status"
            }
          ]
        },
        "group_3": {
          "title": "Actual Non-Performance (Art. 1771, 1776-1787)",
          "facets": [
            {
              "id": "cont_fact_complete_failure",
              "legalText": "አቤቱታ ተቀባይ [Specific Obligation] ገብዞ አልገባ በ[Due Date]। ተግባር ቁራ ወይም ሙሉ ወታ ነው (Art. 1771)።",
              "citation": "Civil Code Art. 1771 (Non-Performance Includes Defective Performance)",
              "autoEvidence": ["non_delivery_evidence", "inspection_report", "breach_documentation"],
              "mutexGroup": "performance_status"
            },
            {
              "id": "cont_fact_defective_performance",
              "legalText": "ግዴታ ተገብ ሳይሆን በተወሰነ ሁኔታ ወይም የቅ [Quality/Quantity/Time] ስህተት (Art. 1780-1782)።",
              "citation": "Civil Code Art. 1780-1782 (Remedies for Defective Performance)",
              "autoEvidence": ["quality_inspection", "expert_report", "comparison_with_contract"],
              "mutexGroup": "performance_status"
            }
          ]
        },
        "group_4": {
          "title": "No Force Majeure & Causation (Art. 1792-1796)",
          "facets": [
            {
              "id": "cont_fact_no_force_majeure_absolute",
              "legalText": "አለመፈጸም force majeure ምክንያት ሳይሆን ከአቤቱታ ተቀባይ ሞወዳ ወይም ታቁ (Art. 1792-1796)። Force majeure ፍ [Unforeseen Act / Natural Catastrophe / War] ኢኢ ሳይሆን (Art. 1794)።",
              "citation": "Civil Code Art. 1792-1796 (Force Majeure Definition & Exceptions); Art. 1793 (Strikes, Price Changes, New Legislation NOT Force Majeure)",
              "autoEvidence": ["business_records", "expert_evidence", "proof_of_causation"],
              "mutexGroup": "excuse_status"
            },
            {
              "id": "cont_fact_fault_or_strict_liability",
              "legalText": "ግዴታ \"ተግባር ውጤት\" ነው (strict liability) OR አቤቱታ ተቀባይ ስህተት ሆኖ ታወሲድ (Art. 1791)።",
              "citation": "Civil Code Art. 1791 (Fault Requirement vs. Strict Liability for Result Obligations)",
              "autoEvidence": ["negligence_evidence", "business_records"],
              "mutexGroup": "excuse_status"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "cont_relief_forced_performance_order",
          "text": "ወታ ግዴታ ሙሉ ማውጣት - Forced Performance Order (Art. 1776-1778)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "cont_relief_cancellation_restitution",
          "text": "ውሉ ሂድ ሙሉ - Contract Cancellation with Restitution (Art. 1785-1787)",
          "isDefault": false,
          "isDynamic": false
        },
        {
          "id": "cont_relief_damages_comprehensive",
          "text": "ጉዳት ማስከር - Damages (Art. 1799-1805); +Interest (Art. 1751)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {
        "calc_damages": {
          "title": "የጉዳት ሂሳብ",
          "description": "Direct damages + consequential damages (if known) + legal interest",
          "formula": "Direct Loss = Market Value @ Performance Date - Contract Price; Interest = Direct Loss × 9% p.a.; Consequential (if respondent knew special circumstances) = Lost Profits; Total = Direct + Interest + Consequential"
        }
      }
    }
  ]
}
