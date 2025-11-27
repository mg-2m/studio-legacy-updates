 {
  "templates": {
    "comm_sales_contract_breach": {
      "documentTitle": "የሽያጭ ውል መጥፋት የክስ ጥያቄ (Statement of Claim for Breach of Sales Contract)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 2272-2328 (Arts. 2272-2328 of the Civil Code - Sales)",
      "meta": {
        "keywords": ["ሽያጭ ውል", "የግዢ መጥፋት", "የሽያጭ ክስ", "sales contract", "breach of sale", "non-delivery"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ትንቢት የሽያጭ ውል ተቃውሞ ምክንያት ሽያጭ፣ አስከባሪ ወይም ጉዳት ለመጠየቅ ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሕግ አንቀጽ 1673(1) መሠረት በ10 ዓመታት ውስጥ ከጥቅል ቀን ጀምሮ መጠየቅ አለበት። (Art. 1673(1) Civil Code: 10 years from delivery date.)",
      "partyTitles": {
        "applicant": "ከሳሽ (ገዢ ተቃቂ) (Plaintiff (Buyer))",
        "respondent": "ተከሳሽ (ሽያጭ) (Defendant (Seller))"
      },
      "facts": {
        "group_1": {
          "title": "የሽያጭ ውል መኖር (Existence of Sales Contract)",
          "facets": [
            {
              "id": "comm_fact_valid_sales_contract",
              "legalText": "በ[ቀን] በ[ቦታ] ተፈቀደ ትክክለኛ ሽያጭ ውል ይገኛል። (Valid sales contract exists dated [Date] at [Place].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2272 (Civ. Code Art. 2272)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "የግዢ መጠን እና ባህሪ (Description of Goods)",
          "facets": [
            {
              "id": "comm_fact_goods_description",
              "legalText": "የተቃወመው ግዢ በቁጥር፣ ጽንሰ-ሐሳብ እና ባህሪ ተገለጸ ነው። ([Quantity], [Quality], [Specifications] as described.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2284 (Civ. Code Art. 2284)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        },
        "group_3": {
          "title": "ውል መጥፋት (Breach of Contract)",
          "facets": [
            {
              "id": "comm_fact_non_delivery",
              "legalText": "ተከሳሹ በ[ቀን] የተቃወመውን ግዢ አልሰጣም። (Seller failed to deliver goods by [Delivery Date].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2299 (Civ. Code Art. 2299)",
              "evidence": [],
              "mutexGroup": "breach_type"
            },
            {
              "id": "comm_fact_defective_goods",
              "legalText": "የተሰጠው ግዢ በተቃወመው ጽንሰ-ሐሳብ ያልተሟላ ነው። (Delivered goods do not conform to contracted quality.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2303 (Civ. Code Art. 2303)",
              "evidence": ["DeliveryNote"],
              "mutexGroup": "breach_type"
            }
          ]
        },
        "group_4": {
          "title": "የግዢ ዋጋ መከፍል (Payment Made)",
          "facets": [
            {
              "id": "comm_fact_payment_made",
              "legalText": "ከሳሹ የግዢ ዋጋውን በ[ቁጥር] በተሟላ መንገድ ከፈለ። (Buyer paid full contract price of [Amount] as agreed.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2289 (Civ. Code Art. 2289)",
              "evidence": ["PaymentReceipt"],
              "mutexGroup": null
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_specific_performance",
          "text": "ተከሳሹ በተቃወመው ደረጃ እና ጊዜ ግዢውን እንዲሰጥ መመሪያ። (Order specific performance - delivery as contracted.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_damages",
          "text": "ከግዢ መጥፋት የተጎዳ ጉዳት ማስከር። (Damages for losses from breach.)",
          "isDefault": false,
          "isDynamic": false
        },
        {
          "id": "comm_relief_rescission",
          "text": "ውሉን ማስቀረት እና የተከፈለውን ገንዘብ መመለስ። (Rescind contract and refund payments.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {
        "calc_damages": {
          "title": "የጉዳት ሂሳብ (Damages Calculation)",
          "description": "ከውል መጥፋት የተጎዳ ገንዘባዊ ጉዳት ለማስላት።",
          "inputs": [
            {"id": "contract_price", "label": "የውል ዋጋ (Contract Price)", "type": "number", "defaultValue": 0},
            {"id": "market_price", "label": "የገበያ ዋጋ (Market Price)", "type": "number", "defaultValue": 0},
            {"id": "days_delay", "label": "የመወዛወዝ ቀናት (Delay Days)", "type": "number", "defaultValue": 0}
          ],
          "outputs": [
            {"id": "total_damages", "label": "ጠቅላላ ጉዳት (Total Damages)"}
          ],
          "formula": "total_damages = (market_price - contract_price) + (days_delay * contract_price * 0.01)"
        }
      }
    },
    "comm_non_compete_violation": {
      "documentTitle": "የማይጠቃም ባለቤትነት መጥፋት የክስ ጥያቄ (Claim for Breach of Non-Compete Clause)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 2412 እና 2426 (Arts. 2412 & 2426 Civil Code - Lease of Enterprise)",
      "meta": {
        "keywords": ["ማይጠቃም ባለቤትነት", "የንግድ ልዩ", "non-compete", "goodwill protection"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ትንቢት የንግድ ልዩ ለመጠበቅ ማይጠቃም ባለቤትነት የተጠቀም ከሆነ ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሕግ አንቀጽ 1682 መሠረት በ5 ዓመታት ውስጥ ከመጥፋት ቀን ጀምሮ። (Art. 1682 Civil Code: 5 years from breach for delictual claims.)",
      "partyTitles": {
        "applicant": "ከሳሽ (ቀደምት ባለቤት) (Plaintiff (Former Owner))",
        "respondent": "ተከሳሽ (አዲስ ባለቤት) (Defendant (New Owner))"
      },
      "facts": {
        "group_1": {
          "title": "የንግድ ዝውውር ሽያጭ (Enterprise Sale)",
          "facets": [
            {
              "id": "comm_fact_enterprise_sale",
              "legalText": "በ[ቀን] ንግዱ በሙሉ ወይም በአንዳንድ ክፍሎች ተሸከመ። (Enterprise sold in whole/part on [Date].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2412 (Civ. Code Art. 2412)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "ማይጠቃም ባለቤትነት ትንቢት (Non-Compete Agreement)",
          "facets": [
            {
              "id": "comm_fact_noncompete_clause",
              "legalText": "በውል ውስጥ ለ[ጊዜ] በ[ቦታ] ተመሳሳይ ንግድ አይጀምርም ተብሎ ተፈለገ። (Contract prohibits similar business for [Period] in [Area].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2426 (Civ. Code Art. 2426)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        },
        "group_3": {
          "title": "ትንቢት መጥፋት (Breach of Prohibition)",
          "facets": [
            {
              "id": "comm_fact_competing_business",
              "legalText": "ተከሳሹ በ[ቦታ] ተመሳሳይ ንግድ ጀምሮ አገልጋል። (Defendant started competing business at [Location].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2426 (Civ. Code Art. 2426)",
              "evidence": ["PhotosVideoEvidence"],
              "mutexGroup": null
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_cease_competition",
          "text": "ተከሳሹ ተመሳሳይ ንግድ እንዲቆም መመሪያ። (Order defendant to cease competing business.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_damages_goodwill",
          "text": "ከልዩ ጉዳት ለመምለስ ጉዳት ማስከር። (Damages for loss of goodwill.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    "comm_unfair_competition": {
      "documentTitle": "ያልተገበረ ተፈጣሪነት የክስ ጥያቄ (Claim for Unfair Competition)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 2365-2372 (Arts. 2365-2372 Civil Code - Unfair Competition)",
      "meta": {
        "keywords": ["ያልተገበረ ተፈጣሪነት", "ምልክት ባለቤትነት", "unfair competition", "trademark", "trade secret"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ትንቢት የምልክት፣ ምርምር ወይም ገበያ ልዩ የሚጎዳ ተፈጣሪነት ላይ ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሕግ አንቀጽ 1682 መሠረት በ5 ዓመታት ውስጥ ከተፈጥሮ ቀን ጀምሮ። (Art. 1682 Civil Code: 5 years from act of unfair competition.)",
      "partyTitles": {
        "applicant": "ከሳሽ (ተጎዳ) (Plaintiff (Injured Party))",
        "respondent": "ተከሳሽ (ተፈጣሪ) (Defendant (Competitor))"
      },
      "facts": {
        "group_1": {
          "title": "የተጠበቀ ልዩ (Protected Goodwill)",
          "facets": [
            {
              "id": "comm_fact_established_goodwill",
              "legalText": "ከሳሹ በ[ጊዜ] ውስጥ በ[ቦታ] የተመሰረተ ልዩ/ምልክት ያለው ነው። (Plaintiff has established goodwill/trademark over [Time] in [Area].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2365 (Civ. Code Art. 2365)",
              "evidence": ["AuditReport"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "ያልተገበረ ተፈጣሪነት (Unfair Acts)",
          "facets": [
            {
              "id": "comm_fact_trademark_imitation",
              "legalText": "ተከሳሹ ከሳሹን ምልክት/ምስል ተመሳሳይ ተጠቅሟል። (Defendant imitated plaintiff's trademark/design.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2366 (Civ. Code Art. 2366)",
              "evidence": ["PhotosVideoEvidence"],
              "mutexGroup": "unfair_act"
            },
            {
              "id": "comm_fact_trade_secret_misuse",
              "legalText": "ተከሳሹ የተጠበቀ ምርምር/የዋጋ ልዩ ተጠቅመው ተጠቅሟል። (Defendant misused protected trade secret/price list.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2368 (Civ. Code Art. 2368)",
              "evidence": ["WrittenContract"],
              "mutexGroup": "unfair_act"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_cease_unfair_acts",
          "text": "ያልተገበረች ተፈጣሪነት እንዲቆም መመሪያ። (Order cessation of unfair competition acts.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_accounting_profits",
          "text": "ከተፈጣሪነት የተገኘውን ትርፍ ማስረቢያ። (Order accounting of profits from unfair acts.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    "comm_debt_collection": {
      "documentTitle": "የዕዳ መሰባሰቢያ የክስ ጥያቄ (Debt Collection Claim)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 1697-1715 (Arts. 1697-1715 Civil Code - Obligations)",
      "meta": {
        "keywords": ["ዕዳ መሰባሰቢያ", "የዋሸት መብት", "debt collection", "loan recovery"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ትንቢት የተከፈለ ወይም በውል ተመራገጠ ዕዳ ለመሰባሰብ ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሕግ አንቀጽ 1673(2) መሠረት በ10 ዓመታት ውስጥ ከዕዳ የመፈጸም ቀን ጀምሮ። (Art. 1673(2) Civil Code: 10 years from due date.)",
      "partyTitles": {
        "applicant": "ከሳሽ (ተዋሹ) (Plaintiff (Creditor))",
        "respondent": "ተከሳሽ (ዕዳ ተዋጊ) (Defendant (Debtor))"
      },
      "facts": {
        "group_1": {
          "title": "ዕዳ መፈጸም (Creation of Debt)",
          "facets": [
            {
              "id": "comm_fact_loan_disbursed",
              "legalText": "በ[ቀን] በ[ቁጥር] ዕዳ ተከፈለ ወይም ተመራገጠ። (Loan of [Amount] disbursed/owed on [Date].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1697 (Civ. Code Art. 1697)",
              "evidence": ["WrittenContract", "PaymentReceipt"],
              "mutexGroup": "debt_source"
            },
            {
              "id": "comm_fact_contractual_debt",
              "legalText": "በተፈቀደለት ውል ተመራገጠ የሚመጣ ዕዳ ነው። (Debt arising from valid contract.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1705 (Civ. Code Art. 1705)",
              "evidence": ["WrittenContract"],
              "mutexGroup": "debt_source"
            }
          ]
        },
        "group_2": {
          "title": "ክፍፍል አለመፍጠር (Non-Payment)",
          "facets": [
            {
              "id": "comm_fact_due_date_passed",
              "legalText": "ዕዳው በ[ቀን] መፈጸም አለበት ነገር አልተፈጸመምም። (Debt due on [Date] remains unpaid.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1710 (Civ. Code Art. 1710)",
              "evidence": ["NoticeofDefault"],
              "mutexGroup": null
            },
            {
              "id": "comm_fact_demand_made",
              "legalText": "በተደረገ ጥያቄ ተከሳሹ መከፍል አልተፈወስም። (Formal demand made; defendant refuses payment.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1712 (Civ. Code Art. 1712)",
              "evidence": ["NoticeofDefault", "AdmissionofDebt"],
              "mutexGroup": null
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_principal_debt",
          "text": "ዋና ዕዳ በተከፈለው ቁጥር ማስከር። (Payment of principal debt amount.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_interest",
          "text": "የዕዳ ዓትራፊት ከፈጠረ ጀምሮ ማስከር። (Legal interest from due date.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_execution",
          "text": "ፍርዱ የፈጠር ይገባ እንዲሆን መመሪያ። (Decree declared executable.)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {
        "calc_loan_interest": {
          "title": "የዕዳ ዓትራፊት ሂሳብ (Loan Interest Calculator)",
          "description": "የተከፈለ ዕዳ ከመፈጸም ቀን ጀምሮ የህግ ዓትራፊት።",
          "inputs": [
            {"id": "principal", "label": "ዋና ዕዳ (Principal)", "type": "number", "defaultValue": 0},
            {"id": "due_date", "label": "የመፈጸም ቀን (Due Date)", "type": "date", "defaultValue": null},
            {"id": "today", "label": "ዛሬን ቀን (Today)", "type": "date", "defaultValue": null}
          ],
          "outputs": [
            {"id": "interest_due", "label": "የሚከፈል ዓትራፊት (Interest Due)"},
            {"id": "total_owed", "label": "ጠቅላላ የሚከፈል (Total Owed)"}
          ],
          "formula": "days_past = (today - due_date) / 86400000; interest_due = principal * 0.09 * (days_past / 365); total_owed = principal + interest_due"
        }
      }
    },
    "comm_partnership_dissolution": {
      "documentTitle": "የትብብር መፍረስ የክስ ጥያቄ (Partnership Dissolution Claim)",
      "jurisdictionText": "የመግባቢያ ሕግ አንቀጽ 1985-2035 (Arts. 1985-2035 Civil Code - Partnership)",
      "meta": {
        "keywords": ["ትብብር", "መፍረስ", "የትብብር ዕቃዎች", "partnership", "dissolution"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ትንቢት ትብብር ለመፍረስ እና ዕቃዎች ለመከፋፈል ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሕግ አንቀጽ 1673 መሠረት በ10 ዓመታት ውስጥ ከመፍረስ መጠየቅ ቀን። (Art. 1673 Civil Code: 10 years from dissolution demand.)",
      "partyTitles": {
        "applicant": "ከሳሽ (ተብብር አባል) (Plaintiff (Partner))",
        "respondent": "ተከሳሽ (ተብብር አባል) (Defendant (Partner))"
      },
      "facts": {
        "group_1": {
          "title": "ትብብር መፍጠር (Partnership Formation)",
          "facets": [
            {
              "id": "comm_fact_partnership_exists",
              "legalText": "በ[ቀን] በ[ቦታ] ትብብር ተመሰረተ ነው። (Partnership formed on [Date] at [Place].)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 1985 (Civ. Code Art. 1985)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        },
        "group_2": {
          "title": "መፍረስ መሠረት (Grounds for Dissolution)",
          "facets": [
            {
              "id": "comm_fact_term_expiry",
              "legalText": "ትብብሩ በተወሰነ ጊዜ ገደብ ተጠናከረ። (Fixed term partnership expired.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2002 (Civ. Code Art. 2002)",
              "evidence": [],
              "mutexGroup": "dissolution_cause"
            },
            {
              "id": "comm_fact_breach_by_partner",
              "legalText": "ተከሳሹ ትብብር ተቃውሞ በተናጠል ነው። (Defendant partner committed serious breach.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2004 (Civ. Code Art. 2004)",
              "evidence": ["AuditReport"],
              "mutexGroup": "dissolution_cause"
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_dissolve_partnership",
          "text": "ትብብሩ መፍረስ እና ንብረት መከፋፈል መመሪያ። (Order dissolution and division of assets.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_accounting",
          "text": "ትብብር የገበያ መወረድ እና ስሪት ማስረቢያ። (Order partnership accounting and profit share.)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {
        "calc_partnership_share": {
          "title": "የትብብር ድርሻ አክሲዮን (Partnership Share Calculation)",
          "description": "አንድ ተብብር አባል የሚያገኝ ድርሻ።",
          "inputs": [
            {"id": "total_assets", "label": "ጠቅላላ ንብረት (Total Assets)", "type": "number", "defaultValue": 0},
            {"id": "capital_contrib", "label": "ዋስትና ውስጥ (Capital Contribution)", "type": "number", "defaultValue": 0},
            {"id": "profit_share_pct", "label": "% የትርፍ ድርሻ (% Profit Share)", "type": "number", "defaultValue": 50}
          ],
          "outputs": [
            {"id": "partner_share", "label": "የአባል ድርሻ (Partner Share)"}
          ],
          "formula": "partner_share = (capital_contrib / total_assets * total_assets * 0.5) + (total_assets * profit_share_pct / 100 * 0.5)"
        }
      }
    },
    "app_comm_injunction_counterfeit": {
      "documentTitle": "ተተከለ ምርት ለማቆም የአስፈላጊነት ጥያቄ (Urgent Injunction Against Counterfeit Goods)",
      "jurisdictionText": "የመግባቢያ ሥነሥርዓት ሕግ አንቀጽ 154 እና የመግባቢያ ሕግ አንቀጽ 2366 (Art. 154 CPC & Art. 2366 Civil Code)",
      "meta": {
        "keywords": ["ተተከለ ምርት", "አስፈላጊነት", "counterfeit", "trademark injunction"],
        "jurisdictionType": "Federal/Regional First Instance"
      },
      "templateDescription": "### መመሪያ \n ይህ ጥያቄ ተተከለ ምርቶች ለማምጣት እና ለማሰር አስፈላጊነት ነው። \n\n ### የጊዜ ገደብ (Period of Limitation) \n የመግባቢያ ሥነሥርዓት ሕግ አንቀጽ 154 መሠረት በድጋፍ የሚታደርግ፣ የጊዜ ገደብ የለም። (Art. 154 CPC: Urgent applications, no specific limitation.)",
      "partyTitles": {
        "applicant": "ጠያቂ (ምልክት ባለቤት) (Applicant (Trademark Owner))",
        "respondent": "ተቃራኒ (ተተከለ ተሽከርካሪ) (Respondent (Counterfeiter))"
      },
      "facts": {
        "group_1": {
          "title": "ድንገተኛነት እና ጉዳት (Urgency & Irreparable Harm)",
          "facets": [
            {
              "id": "comm_fact_counterfeit流通",
              "legalText": "ተከሳሹ ተተከለ ምርቶች በገበያ ይሸካማል። (Counterfeit goods actively circulating in market.)",
              "citation": "የመግባቢያ ሥነሥርዓት ሕግ አንቀጽ 154 (CPC Art. 154)",
              "evidence": ["PhotosVideoEvidence"],
              "mutexGroup": null
            },
            {
              "id": "comm_fact_brand_damage",
              "legalText": "ተተከለ ምርቶች ምልክት ልዩን ይጎዳሉ። (Counterfeits causing irreparable brand damage.)",
              "citation": "የመግባቢያ ሕግ አንቀጽ 2366 (Civ. Code Art. 2366)",
              "evidence": [],
              "mutexGroup": null
            },
            {
              "id": "comm_fact_prima_facie_right",
              "legalText": "ጠያቂ ምልክቱን ለመጠበቅ ግልጽ መብት ያለው። (Applicant shows prima facie trademark rights.)",
              "citation": "የመግባቢያ ሥነሥርዓት ሕግ አንቀጽ 154 (CPC Art. 154)",
              "evidence": ["WrittenContract"],
              "mutexGroup": null
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "comm_relief_stop_counterfeits",
          "text": "ተተከለ ምርቶች ማምጣት፣ ማስተዋወቅ እና ማስተካከል ማቆም መመሪያ። (Immediate cessation of counterfeit production/sale/distribution.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "comm_relief_destroy_goods",
          "text": "ተተከለ ምርቶች እና መሳሪያዎች ማጥፋት መመሪያ። (Order destruction of counterfeit goods/equipment.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    }
  }
}
