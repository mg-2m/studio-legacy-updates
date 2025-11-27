 {
  "meta": {
    "branchName": "Succession Law (የረጅም ተቋማት ሕግ)",
    "branchDescription": "Inheritance, wills, estate distribution, and succession proceedings under the Civil Code Book II Title V.",
    "icon": "Inheritance",
    "version": "1.0"
  },
  "templates": [
    {
      "id": "succ_intestate_children",
      "documentTitle": "የረጅም ተቋማት አባልነት የመፍሰስ ጥያቄ (Petition for Recognition of Intestate Heirship)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 829-842 (Arts. 829-842 Civil Code - Intestate Succession) [web:1][web:2]",
      "meta": {
        "keywords": ["ረጅም", "መረጃ", "የረጅም ተቋማት", "የልጅ ወርሻ", "inheritance", "intestate", "children heirs", "የቤተሰብ ሕግ"],
        "complexity": "Medium",
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n\nይህ ትንቢት የሞተው በተቋም ረጅም ተቋማት ላይ ለልጆቹ እና ተወልዶቹ የመፍሰስ ነው። \n\n### የጊዜ ገደብ (ይርጋ) \n\nየመግባቢያ ሕግ አንቀጽ 1000 መሠረት በ3 ዓመታት ውስጥ ከተቋሙ ቀን ወይም በ10 ዓመታት ከተነበበ በተፈቀረ አባል ከተደረገ ጀምሮ። (Cassation Bench consistent rulings) [web:1][web:4][web:17]",
      "partyTitles": {
        "applicant": "ጠያቂ (ረጅም ተቋማት ተቃዋሚ) (Petitioner (Heir))",
        "respondent": "ተቃራኒ (የንብረት ባክስ) (Respondent (Estate Holder))"
      },
      "facts": {
        "group_1": {
          "title": "የሞተው ሞት እና ተቋም (Death and Succession Opening)",
          "facets": [
            {
              "id": "succ_fact_death_date",
              "legalText": "ተቃዋሚ በ[ቀን] በ[ቦታ] አለመ [web:2]",
              "citation": "የመግባቢያ ሕግ አንቀጽ 827",
              "autoEvidence": ["proof_of_death"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "በተቋም ረጅም መኖር (Absence of Will)",
          "facets": [
            {
              "id": "succ_fact_no_will",
              "legalText": "ሞተው የረጅም ትንቢት አልተጻፈም። (No testamentary will exists.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 829",
              "autoEvidence": ["affidavit_no_will"],
              "mutexGroup": "succession_type"
            }
          ]
        },
        "group_3": {
          "title": "ልጆች መኖር (Existence of Children)",
          "facets": [
            {
              "id": "succ_fact_children_heirs",
              "legalText": "ሞተው በ[ቁጥር] ልጆች ተቃወመ፣ እነሱ የመጀመሪያ ደረጃ ተቋማት ናቸው። (Deceased survived by [Number] children, first heirs.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 842 [web:2]",
              "autoEvidence": ["proof_of_marriage", "birth_certificates"],
              "mutexGroup": "heir_class"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "succ_relief_heir_recognition",
          "text": "ጠያቂዎችን እንደ ረጅም ተቋማት መፍሰስ። (Recognize petitioners as intestate heirs.)",
          "isDefault": true
        },
        {
          "id": "succ_relief_share_certificate",
          "text": "የረጅም ተቋማት የማስረጃ ምስክር ማድረግ። (Issue inheritance certificate.) [web:21]",
          "isDefault": true
        }
      ],
      "calculations": {}
    },
    {
      "id": "succ_will_challenge_disinherit",
      "documentTitle": "የረጅም ትንቢት ጥያቄ ጥያቄ (Challenge to Will - Disinheritance)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 937-939 (Arts. 937-939 Civil Code - Disinheritance) [web:9]",
      "meta": {
        "keywords": ["የረጅም ትንቢት", "መብቀስ", "reserved portion", "የተጠበረ ወርሻ", "disinheritance", "የልጅ ወርሻ"],
        "complexity": "High",
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n\nይህ ትንቢት ለልጆች ወይም ተወልዶች ያለ መልካም ምክንያት የተባቀለ የረጅም ትንቢት ላይ ነው። \n\n### የጊዜ ገደብ (ይርጋ) \n\nየመግባቢያ ሕግ አንቀጽ 2264 መሠረት በ10 ዓመታት ውስጥ ከተቋሙ ቀን ጀምሮ። (Cassation: Insufficient reasons like 'did not care' invalid) [web:4][web:9]",
      "partyTitles": {
        "applicant": "ጠያቂ (ተባቀለ ረጅም ተቋማት) (Petitioner (Disinherited Heir))",
        "respondent": "ተቃራኒ (ተቋማት ተጠቃሚ) (Respondent (Beneficiary))"
      },
      "facts": {
        "group_1": {
          "title": "የረጅም ትንቢት መኖር (Existence of Will)",
          "facets": [
            {
              "id": "succ_fact_will_exists",
              "legalText": "ሞተው በ[ቀን] የረጅም ትንቢት ጻፈ። (Deceased executed will on [Date].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 912",
              "autoEvidence": ["proof_of_will"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "ያለ መልካም ምክንያት መብቀስ (Invalid Disinheritance)",
          "facets": [
            {
              "id": "succ_fact_no_valid_reason",
              "legalText": "ትንቢቱ ለጠያቂ ያለ መልካም ምክንያት መብቀስ አደረገ። (Will disinherits without valid reason.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 938(1) [web:9]",
              "autoEvidence": ["will_copy"],
              "mutexGroup": "disinherit_reason"
            },
            {
              "id": "succ_fact_reserved_portion",
              "legalText": "ጠያቂ የተጠበረ ወርሻ (reserved portion) ይገባል። (Petitioner entitled to reserved portion.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 915",
              "autoEvidence": ["family_tree"],
              "mutexGroup": "disinherit_reason"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "succ_relief_invalidate_disinherit",
          "text": "የመብቀስ ክፍል ያለፈት መልከ ማረጋገጥ። (Invalidate disinheritance clause.)",
          "isDefault": true
        },
        {
          "id": "succ_relief_reserved_share",
          "text": "የተጠበረ ወርሻ መስጠት። (Grant reserved portion share.)",
          "isDefault": true
        }
      ],
      "calculations": {
        "calc_reserved_portion": {
          "title": "የተጠበረ ወርሻ ሂሳብ (Reserved Portion Calculation)",
          "description": "ለልጆች የተጠበረ የረጅም ወርሻ ለማስላት።",
          "inputs": [
            {"id": "total_estate", "label": "ጠቅላላ ረጅም ተቋማት (Total Estate Value)", "type": "number", "defaultValue": 0},
            {"id": "num_children", "label": "ልጆች ቁጥር (Number of Children)", "type": "number", "defaultValue": 1}
          ],
          "outputs": [
            {"id": "reserved_share", "label": "የጠያቂ ወርሻ (Petitioner Reserved Share)"}
          ],
          "formula": "intestate_per_child = total_estate / num_children; reserved_share = intestate_per_child * 0.75"
        }
      }
    },
    {
      "id": "succ_partition_request",
      "documentTitle": "የረጅም ተቋማት መከፋፈያ ጥያቄ (Petition for Partition of Inheritance)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 1085 እና የሰበር ውሳኔ ቁጥር 186329 (Cassation File 186329 - 3 years limitation) [web:17]",
      "meta": {
        "keywords": ["ረጅም መከፋፈያ", "ወርሻ ክፍፍል", "partition", "inheritance division", "የረጅም ሰሪ"],
        "complexity": "Medium",
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n\nይህ ትንቢት የረጅም ተቋማት መከፋፈያ ለመጠየቅ ነው። \n\n### የጊዜ ገደብ (ይርጋ) \n\nCassation File 186329 መሠረት በ3 ዓመታት ውስጥ ከረጅም ማስረጃ ተደረገ ጀምሮ። [web:17]",
      "partyTitles": {
        "applicant": "ጠያቂ (ረጅም ተቋማት) (Petitioner (Co-Heir))",
        "respondent": "ተቃራኒዎች (ሌሎች ተቋማት) (Respondents (Other Heirs))"
      },
      "facts": {
        "group_1": {
          "title": "ረጅም ማስረጃ መኖር (Inheritance Certificate)",
          "facets": [
            {
              "id": "succ_fact_inheritance_cert",
              "legalText": "በ[ቀን] የረጅም ማስረጃ ተደረገ። (Inheritance certificate issued on [Date].)",
              "citation": "የመግባቢያ ሕግ",
              "autoEvidence": ["inheritance_certificate"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "የተቋሙ ንብረት (Estate Assets)",
          "facets": [
            {
              "id": "succ_fact_immovable_property",
              "legalText": "ረጅም ተቋማት በ[ቦታ] የሚገኝ ቤት/መሬት ይዟል። (Estate includes immovable property at [Location].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1085",
              "autoEvidence": ["title_deed"],
              "mutexGroup": null
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "succ_relief_order_partition",
          "text": "ረጅም ተቋማት መከፋፈያ መመሪያ። (Order partition of inheritance.)",
          "isDefault": true
        },
        {
          "id": "succ_relief_equal_shares",
          "text": "በተቻለ መጠን በእኩል መከፋፈያ። (Equal division among heirs.)",
          "isDefault": true
        }
      ],
      "calculations": {
        "calc_equal_partition": {
          "title": "እኩል መከፋፈያ ሂሳብ (Equal Partition Calculator)",
          "description": "ረጅም ተቋማት በልጆች መካከል እኩል ክፍፍል።",
          "inputs": [
            {"id": "total_value", "label": "ጠቅላላ ዋጋ (Total Value)", "type": "number", "defaultValue": 0},
            {"id": "num_heirs", "label": "ተቋማት ቁጥር (Number of Heirs)", "type": "number", "defaultValue": 1}
          ],
          "outputs": [
            {"id": "share_per_heir", "label": "በአንድ ተቋማት ወርሻ (Share per Heir)"}
          ],
          "formula": "share_per_heir = total_value / num_heirs"
        }
      }
    }
  ]
}



