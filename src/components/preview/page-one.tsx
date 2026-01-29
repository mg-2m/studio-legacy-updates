
"use client";

import type { AppState, Party, Relief, Fact } from '@/lib/types';
import { TEMPLATE_DATA } from '@/lib/data';
import { toWords } from 'number-to-words';

// A placeholder for a proper Amharic number-to-word converter
const toAmharicWords = (num: number): string => {
    try {
        const amharicNumerals = {
            1: 'አንድ', 2: 'ሁለት', 3: 'ሶስት', 4: 'አራት', 5: 'አምስት', 
            6: 'ስድስት', 7: 'ሰባት', 8: 'ስምንት', 9: 'ዘጠኝ', 10: 'አስር',
            20: 'ሃያ', 30: 'ሰላሳ', 40: 'አርባ', 50: 'ሃምሳ', 60: 'ስልሳ', 
            70: 'ሰባ', 80: 'ሰማንያ', 90: 'ዘጠና', 100: 'መቶ', 1000: 'ሺህ'
        };
        if (num in amharicNumerals) {
            return amharicNumerals[num as keyof typeof amharicNumerals];
        }
        return toWords(num).replace(/[\w\s-]+/g, ''); 
    } catch {
        return "";
    }
};

const formatFactPlaceholders = (text: string, values: { [key: string]: any }): string => {
  let formattedText = text;
  const regex = /\[(.*?)\]/g;

  formattedText = formattedText.replace(regex, (match, key) => {
    const value = values[key.trim()];
    if (value) {
      return `<span class="font-bold text-blue-600">${value}</span>`;
    } else {
      return `<span class="font-bold text-blue-600">______</span>`;
    }
  });
  return formattedText;
};


const composeNarrative = (facts: Fact[]): string => {
  if (facts.length === 0) {
    return `<li class="text-gray-500 italic">Select facts from the editor to build the narrative...</li>`;
  }

  const groupedFacts: { [key: string]: Fact[] } = facts.reduce((acc: { [key: string]: Fact[] }, fact: Fact) => {
    const key = fact.label || 'Ungrouped Facts';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(fact);
    return acc;
  }, {} as { [key: string]: Fact[] });

  const narrativeParts = Object.values(groupedFacts).map(factGroup => {
    let paragraph = '';
    factGroup.forEach((fact, index) => {
      let sentence = formatFactPlaceholders(fact.legalText, fact.values);
      
      let connector = '';
      if (index === 0) {
        connector = fact.rhetoric?.intro || '';
      } else {
        connector = fact.rhetoric?.transition || '';
      }
      
      paragraph += `${connector} ${sentence} `;
    });
    return paragraph.trim();
  });

  return narrativeParts.map((p: string) => `<li class="mb-2 text-justify">${p}</li>`).join('');
};


export default function PageOne({ state }: { state: AppState }) {
  const { metadata: meta, applicants, respondents, selectedFacts, maintenance, calculations, partyTitles, selectedReliefs, selectedSubTemplate } = state;
  const currentTemplateData = selectedSubTemplate ? TEMPLATE_DATA[selectedSubTemplate] : null;
  
  if (!currentTemplateData) {
    return <div className="a4-page">Loading...</div>;
  }
  
  const { documentTitle, jurisdictionText } = currentTemplateData;


  const summonsMap: { [key: string]: string } = {
    self: 'መጥሪያውን በራሴ አደርሳለው፡፡',
    police: 'መጥሪያውን በፖሊስ እንዲደርስልኝ እጠይቃለሁ፡፡',
    post: 'መጥሪያውን በፖስታ እንዲላክልኝ እጠይቃለሁ፡፡',
  };

  const repMap: { [key: string]: string } = {
    self: 'ራሴ በመቅረብ ነው፡፡',
    lawyer: 'በጠበቃዬ አማካይነት ነው፡፡',
    both: 'በራሴ እና በጠበቃዬ ነው፡፡',
  };

  const formatReliefText = (relief: Relief): string => {
    let text = relief.text;

    if (relief.isDynamic && calculations) {
        const allCalcValues = Object.values(calculations).reduce((acc, curr) => ({ ...acc, ...curr }), {});
        text = text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
            const value = allCalcValues[placeholder as keyof typeof allCalcValues];
            if (typeof value === 'number') {
                return `<strong><u>${value.toFixed(2)}</u></strong>`;
            }
             if (typeof value === 'string' && value.includes('-')) {
                 try {
                    return `<strong><u>${new Date(value).toLocaleDateString('en-GB')}</u></strong>`;
                } catch(e) { /* ignore */ }
            }
            return `<strong><u>${value || '______'}</u></strong>`;
        });
    }
    text = text.replace(/\[(.*?)\]/g, (match, key) => {
        const value = relief.values[key.trim()];
        return `<strong><u>${value || '______'}</u></strong>`;
    });


    return text;
  };


  const getPluralizedTitle = (title: string, count: number): string => {
    if (count <= 1) return title.toUpperCase();
    return `${title}ዎች`.toUpperCase();
  };

  const formatPartyList = (parties: Party[]) => {
    if (parties.length === 0) {
      return <div className="font-bold text-base">________________</div>;
    }
    return (
      <ol className="list-decimal list-inside">
        {parties.map((party, index) => {
            let subcity = party.address.subcity === 'ሌላ' ? party.address.subcityOther : party.address.subcity;
            if(subcity && subcity !== 'ሌላ') {
                subcity += ' ክፍለ ከተማ';
            }
            const woreda = party.address.woreda ? `, ወረዳ ${party.address.woreda}` : '';
            const houseNo = party.address.houseNo ? `, የቤት ቁ. ${party.address.houseNo}` : '';


            return (
              <li key={index} className="mb-2">
                <div className="grid grid-cols-[auto_1fr] text-left">
                    <span className="font-bold text-base whitespace-nowrap">{party.honorific} {party.name}</span>
                    <div></div>
                </div>
                <div className="text-sm pl-6">
                  አድራሻ፡ {party.address.city}, {subcity}{woreda}{houseNo}
                </div>
              </li>
            )
        })}
      </ol>
    );
  };
  
  const applicantTitle = getPluralizedTitle(partyTitles.applicant, applicants.length);
  const respondentTitle = getPluralizedTitle(partyTitles.respondent, respondents.length);
  
  const finalNarrative = composeNarrative(selectedFacts);

  const reliefSummary = selectedFacts.length > 0 
    ? selectedFacts
        .map(f => f.rhetoric?.summary_keyword)
        .filter(Boolean)
        .join('፣ ')
    : 'የቀረቡት ምክንያቶች';
  
  const renderSubjectOfClaim = () => {
    const purpose = meta.claimPurpose || (currentTemplateData.meta && currentTemplateData.meta.purpose);
    const allCalcValues = Object.values(calculations).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    
    let valueText = '(በብር ****** ግምት የቀረበ ክስ ነው)';

    let amount: number | null = null;
    
    if (meta.isManualAmount && meta.claimAmount) {
        const numericAmount = parseFloat(meta.claimAmount);
        if (!isNaN(numericAmount)) {
             amount = numericAmount;
        }
    } else if (!meta.isManualAmount && Object.keys(allCalcValues).length > 0) {
        const primaryOutputKey = Object.keys(allCalcValues).find(k => k.toLowerCase().includes('amount') || k.toLowerCase().includes('pay') || k.toLowerCase().includes('principal'));
        const primaryValue = primaryOutputKey ? allCalcValues[primaryOutputKey] as number : Object.values(allCalcValues)[0] as number;
        
        if(primaryValue && typeof primaryValue === 'number' && primaryValue > 0) {
            amount = primaryValue;
        }
    }

    if (amount !== null) {
      try {
          const amountInAmharicWords = toAmharicWords(amount) || toWords(amount).replace(/[\w\s-]+/g, '');
          valueText = `ብር ${amount.toFixed(2)} (${amountInAmharicWords} ብር)`;
      } catch (e) {
          console.error("Failed to convert number to words:", e);
          valueText = `ብር ${amount.toFixed(2)}`;
      }
    }
    
    const pleader = applicants.length > 0 ? `በ${partyTitles.applicant}` : '';

    if (!purpose) return null;

    return (
        <div className="text-center my-4">
            <h3 className="font-bold underline">የክሱ ምክንያት፡-</h3>
            <p className="text-justify">
                {purpose} {valueText} ለማስከፈል {pleader} የቀረበ ክስ ነው።
            </p>
        </div>
    );
  };
  
  const displayCourtLevel = meta.courtLevel === 'ሌላ' ? (meta.courtLevelOther || '___________') : meta.courtLevel;
  const displayBench = meta.bench === 'ሌላ' ? (meta.benchOther || '___________') : meta.bench;
  const displayBenchType = meta.benchType === 'ሌላ' ? (meta.benchTypeOther || '___________') : meta.benchType;
  const displayCity = meta.city === 'ሌላ' ? (meta.cityOther || '___________') : meta.city;

  return (
    <div className="a4-page">
      <div className="header-block">
        <div className="text-right mb-2">
          <div className="mt-2">
              <span className="green-box">ቀን: {meta.date || '___________'}</span>
          </div>
          <div className="mt-2">
              <div className="inline-block border-2 border-black px-2 py-0.5 font-bold">
              መዝገብ ቁጥር: {meta.fileNumber || '___________'}
              </div>
          </div>
        </div>
        <div>
          <span className="black-box text-lg">ለ: {displayCourtLevel}</span>
        </div>
        <div className="mt-1">
          <span className="green-box">{displayBench} - {displayBenchType}</span>
        </div>
        <div className="mt-1">
          <span className="black-box">{displayCity}</span>
        </div>
      </div>

      <div className="mb-5">
        <div className="grid grid-cols-3 items-start">
            <div className="purple-box flex-shrink-0 col-span-1">{applicantTitle}</div>
            <div className="text-left col-span-2">
                {formatPartyList(applicants)}
            </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="grid grid-cols-3 items-start">
            <div className="purple-box flex-shrink-0 col-span-1">{respondentTitle}</div>
            <div className="text-left col-span-2">
                {formatPartyList(respondents)}
            </div>
        </div>
      </div>

      <div className="text-center my-8">
        <span className="bg-black text-white px-5 py-1.5 font-bold text-lg" style={{ border: '4px double white', boxShadow: '0 0 0 2px black' }}>
          {documentTitle}
        </span>
      </div>

      {renderSubjectOfClaim()}


      <div className="border-l-2 border-gray-300 pl-4 mb-5">
        <h4 className="m-0 mb-2 underline font-bold">መግቢያ:</h4>
        <ul className="list-none p-0 leading-relaxed">
          <li>➤ ይህ የተከበረ ፍርድ ቤት በ{jurisdictionText} መሰረት ይህን ጉዳይ የማየት ሥልጣን አለው፡፡</li>
          <li>➤ {applicants.length > 1 ? "አመልካቾች" : "አመልካች"} ጉዳዩን የምንከታተለው፡ {repMap[meta.representation]}</li>
          <li>➤ {summonsMap[meta.summonsDelivery]}</li>
          <li>➤ ክሱ በፍ/ብ/ሥ/ሥ/ሕግ ቁጥር 223 መሰረት በማስረጃ ተሙዋልቶ ቀርቡዋል፡፡</li>
        </ul>
      </div>

      <div className="mb-5">
        <div className="black-box mb-2">የክሱ ፍሬ ነገሮች</div>
        <ol className="ml-5 list-decimal" dangerouslySetInnerHTML={{ __html: finalNarrative }} />
      </div>

      <div className="mb-5">
        <div className="black-box mb-2">ዳኝነት</div>
        <div className="border-l-2 border-black pl-4">
          <p>
            ስለዚህ ከላይ በተዘረዘሩት የፍሬ ነገር ምክንያቶች <strong>({reliefSummary})</strong> የተከበረው ፍርድ ቤት እንዲወስንልን የምንጠይቀው፡
          </p>
          <ol className="list-decimal ml-5">
             {selectedReliefs
                .filter((item: Relief) => !(item.id === 'relief_child_support' && !maintenance.active))
                .map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatReliefText(item) }} />)}
          </ol>
        </div>
      </div>

      <div className="mt-12">
        <div className="black-box">ማረጋገጫ</div>
        <p>ከላይ የቀረበው አቤቱታ እውነት መሆኑን በፍ/ብ/ሥ/ሥ/ሕግ ቁ. 92 መሰረት አረጋግጣለሁ፡፡</p>
        <div className="text-right mt-10">
          <div className="inline-block text-center w-52">
            <div className="border-b-2 border-black h-8"></div>
            <strong>{applicants.length > 1 ? "የአመልካቾች ፊርማ" : "የአመልካች ፊርማ"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
