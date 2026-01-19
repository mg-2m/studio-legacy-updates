{
  "meta": {
    "branchName": "የንብረት እና የመሬት ሕግ (Property & Land Law)",
    "branchDescription": "Claims related to ownership, possession, boundaries, and use of immovable property.",
    "icon": "Home",
    "version": "1.0"
  },
  "templates": [
    {
      "id": "prop_petitory_vindication",
      "documentTitle": "የንብረት ባለቤትነትን ለማረጋገጥ የክስ ማመልከቻ (Statement of Claim for Vindication of Property - Petitory Action)",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1206 (Art. 1206 of the Civil Code)",
      "meta": {
        "keywords": [
          "petitory action",
          "vindication",
          "unlawful possession",
          "ownership claim",
          "የይዞታ ክስ",
          "የባለቤትነት ማረጋገጫ"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት የንብረትዎ ህጋዊ ባለቤት መሆንዎን ነገር ግን ንብረቱ በሌላ ሰው እጅ ያለአግባብ ተይዞ ሲገኝ፣ የባለቤትነት መብትዎን በፍርድ ቤት ለማረጋገጥ እና ንብረቱ እንዲመለስልዎ ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nይህ ክስ መታየት ያለበት ንብረቱ በሚገኝበት ቦታ ስልጣን ባለው ፍርድ ቤት ነው።\n\n### የጊዜ ገደብ (Period of Limitation)\nበፍትሐ ብሔር ሕግ አንቀጽ 1845 መሠረት፣ የማይንቀሳቀስ ንብረትን በተመለከተ የባለቤትነት ክስ ለማቅረብ ያለው የይርጋ ጊዜ ገደብ 10 ዓመት ነው።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **ማስረጃ (Required Evidence):** የባለቤትነት ማረጋገጫ ካርታ (TitleDeed) እና ንብረቱን እንዴት እንዳገኙ የሚያሳይ ሰነድ (ለምሳሌ የሽያጭ ውል)።",
      "partyTitles": {
        "applicant": "ከሳሽ (ባለቤት) (Plaintiff (Owner))",
        "respondent": "ተከሳሽ (ያለአግባብ የያዘ) (Defendant (Unlawful Holder))"
      },
      "facts": {
        "group_1": {
          "title": "የባለቤትነት ማረጋገጫ (Proof of Title)",
          "facets": [
            {
              "id": "prop_fact_ownership_proof",
              "legalText": "ከሳሹ በ {{location}} የሚገኘው የማይንቀሳቀስ ንብረት ህጋዊ ባለቤት/ባለይዞታ ነው። (The Plaintiff is the legal owner/holder of the immovable property situated at {{location}}.)",
              "citation": "Civ. Code Art. 1204",
              "autoEvidence": [
                "TitleDeed"
              ]
            },
            {
              "id": "prop_fact_chain_of_custody",
              "legalText": "ከሳሹ ንብረቱን በ {{acquisition_method}} በ {{date}} አግኝቷል። (The Plaintiff acquired the property through {{acquisition_method}} on {{date}}.)",
              "citation": "",
              "autoEvidence": []
            }
          ]
        },
        "group_2": {
          "title": "ያለአግባብ መያዝ (Unlawful Holding)",
          "facets": [
            {
              "id": "prop_fact_defendant_possession",
              "legalText": "ተከሳሹ በአሁኑ ጊዜ ንብረቱን ያለ ምንም ህጋዊ መብት ወይም ባለቤትነት ይይዛል። (The Defendant is currently in possession of the property without any legal title or right.)",
              "citation": "Civ. Code Art. 1206",
              "autoEvidence": [
                "KebeleConfirmation"
              ]
            },
            {
              "id": "prop_fact_refusal_vacate",
              "legalText": "ተደጋጋሚ ጥያቄ ቢቀርብም ተከሳሹ ንብረቱን ለቆ ለመውጣት ፈቃደኛ አልሆነም። (Despite demands, the Defendant refuses to vacate the property.)",
              "citation": "",
              "autoEvidence": [
                "NoticeofDefault"
              ]
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_declare_ownership",
          "text": "ከሳሹ የንብረቱ ብቸኛ ህጋዊ ባለቤት/ባለይዞታ መሆኑን የሚገልጽ ፍርድ እንዲሰጥ። (Judgment declaring the Plaintiff as the sole legal owner/holder of the property.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_eviction_order",
          "text": "ተከሳሹ ንብረቱን ለቆ ለከሳሽ እንዲያስረክብ ትዕዛዝ እንዲሰጥ። (Order the Defendant to vacate the property and hand it over to the Plaintiff.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_mesne_profits",
          "text": "ተከሳሹ በህገ-ወጥ ይዞታው ወቅት ላገኘው ጥቅም (ፍራፍሬ/ኪራይ) ካሳ እንዲከፍል ትዕዛዝ እንዲሰጥ። (Order the Defendant to pay compensation (fruits/rent) for the period of unlawful occupation.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "prop_possessory_restoration",
      "documentTitle": "የተነጠቀን ይዞታ ለማስመለስ የክስ ማመልከቻ (Statement of Claim for Restoration of Possession)",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1149 (Art. 1149 of the Civil Code)",
      "meta": {
        "keywords": [
          "possessory action",
          "usurpation",
          "dispossession",
          "የይዞታ ክስ",
          "ማስመለስ"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት ይዞታዎ በጉልበት ወይም በማታለል ሲነጠቅ፣ የባለቤትነት ጥያቄ ውስጥ ሳይገባ ይዞታው ብቻ በፍጥነት እንዲመለስልዎ ለመጠየቅ ያገለግላል። ዋናው ዓላማው ሰላምን ማስጠበቅ ነው።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nንብረቱ በሚገኝበት ቦታ ስልጣን ባለው የመጀመሪያ ደረጃ ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nይዞታው ከተነጠቀበት ቀን ጀምሮ ባሉት ሁለት (2) ዓመታት ውስጥ መቅረብ አለበት (አንቀጽ 1149(2))።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **ማስረጃ (Required Evidence):** ንብረቱን በሰላም ይዘውት እንደነበር የሚያረጋግጡ ማስረጃዎች (ለምሳሌ የግብር ደረሰኞች፣ የቀበሌ ማረጋገጫ)።",
      "partyTitles": {
        "applicant": "ከሳሽ (ይዞታው የተነጠቀ) (Plaintiff (Dispossessed))",
        "respondent": "ተከሳሽ (ነጣቂ) (Defendant (Usurper))"
      },
      "facts": {
        "group_1": {
          "title": "የይዞታ እውነታ (Fact of Possession)",
          "facets": [
            {
              "id": "prop_fact_actual_possession",
              "legalText": "ከሳሹ ንብረቱን በሰላም እና ቀጣይነት ባለው መልኩ ይዞት ነበር። (The Plaintiff was in peaceful and continuous possession of the property.)",
              "citation": "Civ. Code Art. 1140",
              "autoEvidence": [
                "TaxLandRentReceipts",
                "KebeleConfirmation"
              ]
            }
          ]
        },
        "group_2": {
          "title": "ሕገ-ወጥ ጣልቃ ገብነት (መንጠቅ) (Illicit Interference (Usurpation))",
          "facets": [
            {
              "id": "prop_fact_usurpation_act",
              "legalText": "ተከሳሹ በ {{date}} በጉልበት/በማጭበርበር ይዞታውን ወስዷል። (The Defendant took possession by force/fraud on {{date}}.)",
              "citation": "Civ. Code Art. 1148",
              "autoEvidence": ["PhotosVideoEvidence", "WitnessAffidavitsNuisance"]
            },
            {
              "id": "prop_fact_timeliness",
              "legalText": "ይህ ክስ ይዞታው ከተነጠቀ በሁለት ዓመት ጊዜ ውስጥ የቀረበ ነው። (This claim is filed within two years of the usurpation.)",
              "citation": "Civ. Code Art. 1149(2)",
              "autoEvidence": []
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_restore_possession",
          "text": "ይዞታው ወዲያውኑ ለከሳሽ እንዲመለስ ትዕዛዝ እንዲሰጥ (የባለቤትነት ጥያቄዎችን ሳይነካ)። (Order the immediate restoration of possession to the Plaintiff (without prejudice to questions of title).)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "prop_boundary_encroachment",
      "documentTitle": "የድንበር መጣስ እንዲወገድ የክስ ማመልከቻ (Statement of Claim for Removal of Boundary Encroachment)",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1204 እና 1211 (Art. 1204 & 1211 of the Civil Code)",
      "meta": {
        "keywords": [
          "boundary dispute",
          "encroachment",
          "neighbor dispute",
          "demolition",
          "የድንበር ክርክር",
          "መጣስ"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት የእርስዎ ጎረቤት በህጋዊ የድንበር መስመርዎ ላይ ግንባታ ሲፈጽም (ለምሳሌ አጥር ወይም የቤት ክፍል)፣ ያንን ግንባታ እንዲያፈርስ ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nንብረቱ በሚገኝበት ቦታ ስልጣን ባለው ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nበአጠቃላይ የ10 ዓመት የይርጋ ጊዜ ገደብ ተፈጻሚ ይሆናል።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **ማስረጃ (Required Evidence):** የቦታውን ህጋዊ ድንበር የሚያሳይ የሳይት ፕላን (SitePlan) እና ጥሰቱን የሚያረጋግጥ የባለሙያ (ሰርቬየር) ሪፖርት (SurveyorsReport)።",
      "partyTitles": {
        "applicant": "ከሳሽ (Plaintiff)",
        "respondent": "ተከሳሽ (ጎረቤት) (Defendant (Neighbor))"
      },
      "facts": {
        "group_1": {
          "title": "የድንበር መስመሮች (Boundary Lines)",
          "facets": [
            {
              "id": "prop_fact_defined_boundary",
              "legalText": "በከሳሽ እና በተከሳሽ ይዞታዎች መካከል ያለው ህጋዊ ድንበር በኦፊሴላዊው የቦታ ፕላን ይገለጻል። (The legal boundary between the Plaintiff's and Defendant's plots is defined by the official Site Plan.)",
              "citation": "",
              "autoEvidence": [
                "SitePlan"
              ]
            }
          ]
        },
        "group_2": {
          "title": "መጣሱ (The Encroachment)",
          "facets": [
            {
              "id": "prop_fact_encroachment_act",
              "legalText": "ተከሳሹ የድንበር መስመሩን በ {{distance}} ሜትር የሚያልፍ ግድግዳ/ግንባታ ሰርቷል። (The Defendant has constructed a wall/structure that crosses the boundary line by {{distance}}.)",
              "citation": "",
              "autoEvidence": [
                "SurveyorsReport",
                "PhotosVideoEvidence"
              ]
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_demolition",
          "text": "ተከሳሹ የጣሰውን ግንባታ እንዲያፈርስ ትዕዛዝ እንዲሰጥ። (Order the Defendant to demolish the encroaching structure.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_boundary_restitution",
          "text": "የድንበር ምልክቶቹ ወደ ቀድሞ ቦታቸው እንዲመለሱ ትዕዛዝ እንዲሰጥ። (Order the restoration of the boundary markers to their original position.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "app_stay_construction",
      "documentTitle": "ግንባታ እንዲቆም የሚጠይቅ አስቸኳይ ማመልከቻ (Application for Urgent Order to Suspend Construction)",
      "jurisdictionText": "የፍትሐ ብሔር ሥነ ሥርዓት ሕግ አንቀጽ 154 (Art. 154 of the Civil Procedure Code)",
      "meta": {
        "keywords": [
          "injunction",
          "stay of construction",
          "urgent application",
          "የግንባታ እግድ",
          "አስቸኳይ"
        ],
        "jurisdictionType": "Court Handling the Main Case"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አስቸኳይ ማመልከቻ፣ ክርክር ባለበት መሬት ላይ ተቃራኒ ወገን ግንባታ እየሰራ ከሆነ፣ ዋናው ክስ እስኪያልቅ ድረስ ግንባታው እንዲቆም (እንዲታገድ) ለማድረግ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nማመልከቻው ዋናው ክስ እየታየ ባለበት ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nአስቸኳይ ማመልከቻ በመሆኑ የተወሰነ የጊዜ ገደብ የለውም፤ በማንኛውም የክርክር ወቅት ሊቀርብ ይችላል።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **የማይተካ ጉዳት (Irreparable Harm):** ግንባታው ከቀጠለ ሊጠገን የማይችል ጉዳት እንደሚደርስ ማሳየት።\n*   **ጠንካራ ክስ (Prima Facie Case):** በዋናው ክስ ላይ የማሸነፍ እድልዎ ከፍተኛ መሆኑን ማሳየት።",
      "partyTitles": {
        "applicant": "አመልካች (Applicant)",
        "respondent": "ተጠሪ (Respondent)"
      },
      "facts": {
        "group_1": {
          "title": "የማይተካ ጉዳት (Irreparable Injury)",
          "facets": [
            {
              "id": "prop_fact_ongoing_construction",
              "legalText": "ተጠሪው በአሁኑ ጊዜ በተከራካሪው መሬት ላይ ንቁ ግንባታ ላይ ተሰማርቷል። (The Respondent is currently engaged in active construction on the disputed land.)",
              "citation": "",
              "autoEvidence": ["PhotosVideoEvidence"]
            },
            {
              "id": "prop_fact_irreparable_harm",
              "legalText": "ግንባታው ከተጠናቀቀ ማፍረሱ አስቸጋሪ ስለሚሆን የአመልካች መብቶች በቋሚነት ይጎዳሉ። (If the construction is completed, demolition will be difficult and the Applicant's rights will be permanently prejudiced.)",
              "citation": "",
              "autoEvidence": []
            },
            {
              "id": "prop_fact_prima_facie",
              "legalText": "አመልካቹ ጠንካራ የባለቤትነት መብት እንዳለው አሳይቷል። (The Applicant has demonstrated a strong prima facie case of ownership.)",
              "citation": "",
              "autoEvidence": ["TitleDeed"]
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_suspend_works",
          "text": "የመጨረሻ ፍርድ እስከሚሰጥ ድረስ በተከራካሪው ይዞታ ላይ ያሉ ሁሉም የግንባታ ስራዎች ወዲያውኑ እንዲቆሙ ትዕዛዝ እንዲሰጥ። (Order the immediate suspension of all construction activities on the disputed plot pending final judgment.)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "app_local_inspection",
      "documentTitle": "የአካባቢ ምርመራ ትዕዛዝ እንዲሰጥ ማመልከቻ (Application for Order of Local Inspection)",
      "jurisdictionText": "የፍትሐ ብሔር ሥነ ሥርዓት ሕግ አንቀጽ 136 (Art. 136 of the Civil Procedure Code)",
      "meta": {
        "keywords": [
          "local inspection",
          "site visit",
          "court inspection",
          "የአካባቢ ምርመራ",
          "ቦታ መጎብኘት"
        ],
        "jurisdictionType": "Court Handling the Main Case"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ ማመልከቻ በክርክሩ ውስጥ ያሉ ወገኖች ስለ ንብረቱ አካላዊ ገጽታ (ለምሳሌ ስለ ድንበር ወይም ስለ ይዞታ) የሚሰጡት ቃል ወይም ሰነድ ሲጋጭ፣ ፍርድ ቤቱ እውነታውን ለማረጋገጥ ቦታው ድረስ ሄዶ እንዲመለከት ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nዋናው ክስ በሚታይበት ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nየተወሰነ የጊዜ ገደብ የለውም።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **አስፈላጊነት፡** ፍርድ ቤቱ ቦታውን በአካል ሳያይ ፍትሃዊ ውሳኔ መስጠት እንደማይቻል ማሳመን ያስፈልጋል።",
      "partyTitles": {
        "applicant": "አመልካች (Applicant)",
        "respondent": "ተጠሪ (Respondent)"
      },
      "facts": {
        "group_1": {
          "title": "ማብራሪያ (Clarification)",
          "facets": [
            {
              "id": "prop_fact_physical_dispute",
              "legalText": "ስለ መሬቱ አካላዊ ገጽታዎች/ድንበሮች የሚቀርቡት የቃል ምስክርነቶች እና ሰነዶች እርስ በርሳቸው የሚጋጩ ናቸው። (The oral testimonies and documents regarding the physical features/boundaries of the land are contradictory.)",
              "citation": "",
              "autoEvidence": []
            },
            {
              "id": "prop_fact_necessity_to_view",
              "legalText": "ፍርድ ቤቱ (ወይም ሬጅስትራሩ) ቦታውን በአካል ሳይመለከት ፍትሃዊ ውሳኔ ሊሰጥ አይችልም። (A just decision cannot be rendered without the Court (or its registrar) physically viewing the site.)",
              "citation": "CPC Art. 136",
              "autoEvidence": []
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_order_visit",
          "text": "ድንበሮችን/ይዞታን ለማረጋገጥ የንብረቱ አካባቢያዊ ምርመራ እንዲደረግ ትዕዛዝ እንዲሰጥ። (Order a local inspection of the property to verify boundaries/possession.)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "property_nuisance_cessation",
      "documentTitle": "ያልተለመደ ችግር እንዲቆም የክስ ማመልከቻ (Nuisance) (Statement of Claim for Cessation of Abnormal Inconvenience (Nuisance))",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1225 (Art. 1225 of the Civil Code)",
      "meta": {
        "keywords": [
          "nuisance",
          "abnormal inconvenience",
          "noise",
          "smell",
          "neighbor dispute",
          "ችግር",
          "ጩኸት",
          "ሽታ"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት የእርስዎ ጎረቤት ወይም በአቅራቢያዎ የሚገኝ ሰው በሚያደርገው ተግባር (ለምሳሌ ከልክ ያለፈ ጩኸት፣ መጥፎ ሽታ፣ ንዝረት) ሰላምዎ ሲደፈርስ እና ችግሩ ከአካባቢው መደበኛ ሁኔታ ያለፈ ሲሆን፣ ያንን ተግባር እንዲያቆም ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nችግሩ በሚከሰትበት ቦታ ስልጣን ባለው የመጀመሪያ ደረጃ ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nከውል ውጭ ተጠያቂነትን የሚመለከት በመሆኑ፣ የ5 ዓመት የይርጋ ጊዜ ገደብ አለው (አንቀጽ 1851)።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **ማስረጃ (Required Evidence):** የችግሩን ሁኔታ የሚያሳይ ማስረጃ (PhotosVideoEvidence)፣ የምስክሮች ቃል (WitnessAffidavitsNuisance) እና ችግሩ እንዲቆም በጽሑፍ ማስጠንቀቂያ መስጠትዎን የሚያሳይ ማስረጃ።",
      "partyTitles": {
        "applicant": "ከሳሽ (የተጎዳ ወገን) (Plaintiff (Injured Party))",
        "respondent": "ተከሳሽ (የችግሩ ምንጭ) (Defendant (Source of Nuisance))"
      },
      "facts": {
        "group_1": {
          "title": "ችግሩ (The Disturbance)",
          "facets": [
            {
              "id": "prop_fact_nature_inconvenience",
              "legalText": "የተከሳሽ ድርጊቶች ከ {{source}} የሚመነጭ {{nuisance_type}} ያካትታሉ። (The Defendant's actions involve {{nuisance_type}} originating from {{source}}.)",
              "citation": "Civ. Code Art. 1225",
              "autoEvidence": []
            },
            {
              "id": "prop_fact_abnormal_degree",
              "legalText": "በተከሳሹ የሚፈጠረው ችግር ያልተለመደ እና ከአካባቢው ከሚጠበቀው ደረጃ ይበልጣል። (The inconvenience caused by the Defendant is abnormal and exceeds the level normally expected of the neighborhood.)",
              "citation": "",
              "autoEvidence": [
                "WitnessAffidavitsNuisance",
                "PhotosVideoEvidence"
              ]
            }
          ]
        },
        "group_2": {
          "title": "ማወቅ እና እምቢተኝነት (Knowledge and Refusal)",
          "facets": [
            {
              "id": "prop_fact_notice_to_stop",
              "legalText": "ተከሳሹ ስለ ችግሩ በይፋ እንዲያውቅ ተደርጎ ነበር ነገር ግን የማስተካከያ እርምጃዎችን አልወሰደም። (The Defendant was formally notified of the inconvenience but failed to take corrective measures.)",
              "citation": "",
              "autoEvidence": ["NoticeofDefault"]
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_order_cessation",
          "text": "ተከሳሹ ያልተለመደውን ችግር ምንጭ ወዲያውኑ እንዲያቆም የሚገልጽ ፍርድ እንዲሰጥ። (Judgment ordering the Defendant to immediately cease the source of the abnormal inconvenience.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_damages_past",
          "text": "ከማቆሙ በፊት በከሳሽ የደረሰውን ጉዳት ካሳ እንዲከፍል ትዕዛዝ እንዲሰጥ። (Order payment of damages suffered by the Plaintiff prior to the cessation.)",
          "citation": "Civ. Code Art. 1226",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "property_servitude_right_of_way",
      "documentTitle": "የመተላለፊያ መብት (Servitude) እንዲቋቋም የክስ ማመልከቻ (Statement of Claim for Establishment of Servitude (Right of Way))",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1332 (Art. 1332 of the Civil Code)",
      "meta": {
        "keywords": [
          "servitude",
          "right of way",
          "enclaved property",
          "passage",
          "የመተላለፊያ መብት",
          "የመንገድ መብት"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት የእርስዎ ይዞታ ወደ ህዝብ መንገድ መውጫ የሌለው (የተዘጋ) ሲሆን፣ በጎረቤትዎ ይዞታ በኩል የመተላለፊያ መብት እንዲሰጥዎ ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nይዞታዎቹ በሚገኙበት ቦታ ስልጣን ባለው ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nየመተላለፊያ መብት በማንኛውም ጊዜ ሊጠየቅ ይችላል፤ የተወሰነ የይርጋ ጊዜ ገደብ የለውም።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **አስፈላጊነት (Necessity):** የእርስዎ ይዞታ በእርግጥ ሌላ አማራጭ መውጫ እንደሌለው በባለሙያ (ሰርቬየር) ማስረጃ ማረጋገጥ።\n*   **ማስረጃ (Required Evidence):** የይዞታዎን እና የጎረቤትዎን ይዞታ የሚያሳይ የሳይት ፕላን (SitePlan) እና የሰርቬየር ሪፖርት (SurveyorsReport)።",
      "partyTitles": {
        "applicant": "ዋና ይዞታ (አመልካች) (Dominant Tenement (Applicant))",
        "respondent": "አገልጋይ ይዞታ (ተጠሪ) (Servient Tenement (Respondent))"
      },
      "facts": {
        "group_1": {
          "title": "የተዘጋ ይዞታ ሁኔታ (አስፈላጊነት) (Enclave Status (Necessity))",
          "facets": [
            {
              "id": "prop_fact_property_enclaved",
              "legalText": "የአመልካች ንብረት ወደ ህዝብ መንገድ በቂ መዳረሻ የለውም። (The Applicant's property has no adequate access to a public road.)",
              "citation": "Civ. Code Art. 1332",
              "autoEvidence": [
                "SurveyorsReport",
                "SitePlan"
              ]
            },
            {
              "id": "prop_fact_no_other_means",
              "legalText": "ለመዳረሻ ምንም ሌሎች ተግባራዊ ወይም አነስተኛ ጉዳት የሚያስከትሉ መንገዶች የሉም። (There are no other practical or less onerous routes available for access.)",
              "citation": "",
              "autoEvidence": []
            }
          ]
        },
        "group_2": {
          "title": "የተጠየቀው መንገድ (Requested Route)",
          "facets": [
            {
              "id": "prop_fact_least_onerous",
              "legalText": "በተጠሪው መሬት ላይ የተጠየቀው የመተላለፊያ መብት ለአገልጋይ ይዞታ (ተጠሪ) አነስተኛ ጉዳት የሚያስከትል መንገድ ነው። (The requested right of way across the Respondent's land is the route least detrimental to the Servient Tenement (Respondent).)",
              "citation": "Civ. Code Art. 1334",
              "autoEvidence": []
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_establish_servitude",
          "text": "በተጠሪው ንብረት ላይ የመተላለፊያ መብት (Servitude of Right of Way) የሚቋቋም ፍርድ እንዲሰጥ። (Judgment establishing a Servitude of Right of Way across the Respondent's property.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_compensation_fee",
          "text": "ዋናው ይዞታ በመተላለፊያው ለሚደርሰው ጉዳት ለአገልጋይ ይዞታ ፍትሃዊ ካሳ እንዲከፍል ትዕዛዝ እንዲሰጥ። (Order the Dominant Tenement to pay fair compensation to the Servient Tenement for the damage caused by the passage.)",
          "citation": "Civ. Code Art. 1333",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "property_possessory_disturbance",
      "documentTitle": "የይዞታ መረበሽ እንዲቆም የክስ ማመልከቻ (Statement of Claim for Cessation of Disturbance of Possession)",
      "jurisdictionText": "የፍትሐ ብሔር ሕግ አንቀጽ 1148 (Art. 1148 of the Civil Code)",
      "meta": {
        "keywords": [
          "possessory disturbance",
          "interference",
          "peaceful possession",
          "የይዞታ መረበሽ",
          "ጣልቃ ገብነት"
        ],
        "jurisdictionType": "Federal/Regional First Instance Court"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አብነት አንድ ሰው ይዞታዎን ሳይነጥቅ ነገር ግን ሰላማዊ ይዞታዎን በሚረብሹ ድርጊቶች (ለምሳሌ አጥር ማፍረስ፣ መተላለፊያ መዝጋት) ሲያስቸግርዎት፣ እነዚያን የረብሻ ድርጊቶች እንዲያቆም ለመጠየቅ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nንብረቱ በሚገኝበት ቦታ ስልጣን ባለው የመጀመሪያ ደረጃ ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nረብሻው ከተጀመረበት ቀን ጀምሮ ባሉት ሁለት (2) ዓመታት ውስጥ መቅረብ አለበት (አንቀጽ 1149(2))።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **ማስረጃ (Required Evidence):** ረብሻውን የሚያሳይ ማስረጃ (ፎቶ፣ ቪዲዮ) እና የምስክሮች ቃል።",
      "partyTitles": {
        "applicant": "ከሳሽ (ባለይዞታ) (Plaintiff (Possessor))",
        "respondent": "ተከሳሽ (ረባሽ) (Defendant (Disturber))"
      },
      "facts": {
        "group_1": {
          "title": "የይዞታ እውነታ (Fact of Possession)",
          "facets": [
            {
              "id": "prop_fact_actual_possession_disturbance",
              "legalText": "ከሳሹ ንብረቱን/መብቱን በሰላም እና ቀጣይነት ባለው መልኩ ይዞት ነበር። (The Plaintiff was in peaceful and continuous possession of the property/right.)",
              "citation": "Civ. Code Art. 1140",
              "autoEvidence": ["TaxLandRentReceipts", "KebeleConfirmation"]
            }
          ]
        },
        "group_2": {
          "title": "የረብሻ ድርጊት (Disturbance Act)",
          "facets": [
            {
              "id": "prop_fact_disturbance_act",
              "legalText": "ተከሳሹ የከሳሽን ሰላማዊ ይዞታ የሚረብሹ የተወሰኑ ድርጊቶችን ፈጽሟል (ለምሳሌ አጥሮችን ማስወገድ፣ መዳረሻን መዝጋት)። (The Defendant has performed specific actions that interfere with the Plaintiff's peaceful possession (e.g., removing fences, obstructing access).)",
              "citation": "Civ. Code Art. 1148",
              "autoEvidence": [
                "WitnessAffidavitsNuisance",
                "PhotosVideoEvidence"
              ]
            },
            {
              "id": "prop_fact_timeliness_disturbance",
              "legalText": "ይህ ክስ ረብሻው ከተጀመረ በሁለት ዓመት ጊዜ ውስጥ የቀረበ ነው። (This claim is filed within two years of the disturbance.)",
              "citation": "Civ. Code Art. 1149(2)",
              "autoEvidence": []
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_stop_disturbance",
          "text": "ተከሳሹ ሁሉንም የረብሻ ድርጊቶች እንዲያቆም ትዕዛዝ እንዲሰጥ። (Order the Defendant to cease all acts of disturbance.)",
          "isDefault": true,
          "isDynamic": false
        },
        {
          "id": "prop_relief_restore_status",
          "text": "ንብረቱ ከረብሻው በፊት ወደነበረበት ሁኔታ እንዲመለስ ትዕዛዝ እንዲሰጥ። (Order the restoration of the property to the state it was in before the disturbance.)",
          "isDefault": false,
          "isDynamic": false
        }
      ],
      "calculations": {}
    },
    {
      "id": "app_servitude_temporary_passage",
      "documentTitle": "ጊዜያዊ የመተላለፊያ ትዕዛዝ እንዲሰጥ አስገዳጅ ማመልከቻ (Application for Temporary Mandatory Order to Grant Passage)",
      "jurisdictionText": "የፍትሐ ብሔር ሥነ ሥርዓት ሕግ አንቀጽ 154 (Injunction) እና የፍትሐ ብሔር ሕግ አንቀጽ 1332 (Necessity). (Art. 154 CPC & Art. 1332 Civil Code)",
      "meta": {
        "keywords": [
          "temporary injunction",
          "mandatory order",
          "passage",
          "servitude",
          "ጊዜያዊ እግድ",
          "የመንገድ መብት"
        ],
        "jurisdictionType": "Court Handling the Main Case"
      },
      "templateDescription": "### መመሪያ (Guide)\nይህ አስቸኳይ ማመልከቻ፣ ዋናው የመተላለፊያ መብት ክስ እየታየ ባለበት ወቅት፣ ተቃራኒ ወገን ብቸኛ መውጫዎን ሙሉ በሙሉ ሲዘጋው፣ ፍርድ ቤቱ ለጊዜው መተላለፊያ እንዲሰጥዎ ለማስገደድ ያገለግላል።\n\n### የዳኝነት ሥልጣን (Jurisdiction)\nዋናው የመተላለፊያ መብት ክስ በሚታይበት ፍርድ ቤት ይቀርባል።\n\n### የጊዜ ገደብ (Period of Limitation)\nአስቸኳይ ማመልከቻ በመሆኑ የተወሰነ የጊዜ ገደብ የለውም።\n\n### ቅድመ ሁኔታዎች (Prerequisites)\n*   **አስቸኳይነት (Urgency):** መተላለፊያው መዘጋቱ ሊጠገን የማይችል ጉዳት እያስከተለ መሆኑን ማሳየት።",
      "partyTitles": {
        "applicant": "አመልካች (Applicant)",
        "respondent": "ተጠሪ (Respondent)"
      },
      "facts": {
        "group_1": {
          "title": "አስቸኳይነት እና ከፍተኛ ፍላጎት (Urgency & Extreme Need)",
          "facets": [
            {
              "id": "prop_fact_complete_blockade",
              "legalText": "ተጠሪው የአመልካችን ብቸኛ መውጫ ወደ ህዝብ መንገድ ሙሉ በሙሉ ዘግቷል። (The Respondent has completely blocked the Applicant's only access to the public road.)",
              "citation": "",
              "autoEvidence": ["PhotosVideoEvidence"]
            },
            {
              "id": "prop_fact_imminent_damage",
              "legalText": "እገዳው የአመልካችን የመኖር/የንግድ ሥራ ችሎታን አደጋ ላይ ይጥላል፣ ይህም ሊጠገን የማይችል የገንዘብ ጉዳት ያስከትላል። (The blockade threatens the Applicant's ability to live/operate their business, causing imminent and irreparable financial damage.)",
              "citation": "",
              "autoEvidence": []
            }
          ]
        }
      },
      "reliefs": [
        {
          "id": "prop_relief_grant_temporary_access",
          "text": "ዋናው የመተላለፊያ መብት ክስ ላይ የመጨረሻ ውሳኔ እስከሚሰጥ ድረስ ተጠሪው ለአመልካች ጊዜያዊ መተላለፊያ እንዲሰጥ ትዕዛዝ እንዲሰጥ። (Order the Respondent to grant temporary passage to the Applicant pending the final decision on the main servitude claim.)",
          "isDefault": true,
          "isDynamic": false
        }
      ],
      "calculations": {}
    }
  ]
}
    