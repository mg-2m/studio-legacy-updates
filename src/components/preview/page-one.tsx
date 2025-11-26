
"use client";

import type { AppState, Party, Relief } from '@/lib/types';

interface PageOneProps {
  state: AppState;
}

export default function PageOne({ state }: PageOneProps) {
  const { metadata: meta, applicants, respondents, selectedFacts, maintenance, partyTitles, selectedReliefs } = state;

  const summonsMap = {
    self: 'በራሴ አደርሳለው (I will serve summons myself)',
    police: 'በፖሊስ (Through Police)',
    post: 'በፖስታ (Through Post Office)',
  };

  const repMap = {
    self: '1. ራሴ በመቅረብ ነው',
    lawyer: '2. በጠበቃዬ አማካይነት ነው',
    both: '3. በራሴ እና በጠበቃዬ',
  };

  const formatReliefText = (relief: Relief) => {
    let text = relief.text;
    if (relief.id === 'maintenance' && maintenance.active) {
        text = text.replace('{{{income}}}', maintenance.income.toString());
        text = text.replace('{{{children}}}', maintenance.children.toString());
        text = text.replace('{{{result}}}', maintenance.result.toFixed(2));
    }
    return text;
  };

  const getPluralizedTitle = (title: string, count: number): string => {
    if (count <= 1) return title.toUpperCase();
    
    if (!title.includes('(') || !title.includes(')')) {
        return (title + 'S').toUpperCase();
    }

    const amharicPart = title.split('(')[0].trim();
    const englishPart = title.split('(')[1].replace(')', '').trim();
    
    const pluralAmharic = amharicPart + 'ዎች';
    const pluralEnglish = englishPart.endsWith('s') ? englishPart : englishPart + 's';

    return `${pluralAmharic} (${pluralEnglish})`.toUpperCase();
  };

  const formatPartyList = (parties: Party[]) => {
    if (parties.length === 0) {
      return <div className="font-bold text-base">________________</div>;
    }
    return (
      <ol className="list-decimal list-inside">
        {parties.map((party, index) => (
          <li key={index} className="mb-2">
            <span className="font-bold text-base">{party.honorific.split('(')[0].trim()} {party.name}</span>
            <div className="text-sm pl-6">
              አድራሻ፡ {party.address.city}, {party.address.subcity}
            </div>
          </li>
        ))}
      </ol>
    );
  };
  
  const applicantTitle = getPluralizedTitle(partyTitles.applicant, applicants.length);
  const respondentTitle = getPluralizedTitle(partyTitles.respondent, respondents.length);

  return (
    <div className="a4-page">
      <div className="header-block">
        <div className="text-right mb-1">
          <span className="green-box">ቀን: {meta.date || '___________'}</span>
        </div>
        <div>
          <span className="black-box text-lg">ለ: {meta.courtLevel || '___________'}</span>
        </div>
        <div className="mt-1">
          <span className="green-box">{meta.bench || '___________'}</span>
        </div>
        <div className="mt-1">
          <span className="black-box">{meta.city || '___________'}</span>
        </div>
        <div className="mt-2 inline-block border-2 border-black px-2 py-0.5 font-bold">
          መዝገብ ቁጥር: {meta.fileNumber || '___________'}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-start">
            <div className="purple-box flex-shrink-0">{applicantTitle}</div>
            <div className="text-right w-3/4">
                {formatPartyList(applicants)}
            </div>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-start">
            <div className="purple-box flex-shrink-0">{respondentTitle}</div>
            <div className="text-right w-3/4">
                {formatPartyList(respondents)}
            </div>
        </div>
      </div>

      <div className="text-center my-8">
        <span className="bg-black text-white px-5 py-1.5 font-bold text-lg" style={{ border: '4px double white', boxShadow: '0 0 0 2px black' }}>
          የፍቺ አቤቱታ (Divorce)
        </span>
      </div>

      <div className="border-l-2 border-gray-300 pl-4 mb-5">
        <h4 className="m-0 mb-2 underline font-bold">መግቢያ (Introduction)፡</h4>
        <ul className="list-none p-0 leading-relaxed">
          <li>➤ ይህ <strong>{meta.courtLevel}</strong> በ <strong>{`{ ፌዴራል ፍርድ ቤቶች አዋጅ ቁጥር ${meta.jurisdictionLaw} }`}</strong> መሰረት ይህን ጉዳይ የማየት ሥልጣን አለው፡፡</li>
          <li>➤ አመልካች ጉዳዩን የምከታተለው፡ <strong>[{repMap[meta.representation]}]</strong></li>
          <li>➤ መጥሪያውን፡ <strong>{summonsMap[meta.summonsDelivery]}</strong></li>
          <li>➤ ክሱ በፍ/ብ/ሥ/ሥ/ሕግ ቁጥር 223 መሰረት በማስረጃ ተሙዋልቶ ቀርቡዋል::</li>
        </ul>
      </div>

      <div className="mb-5">
        <div className="black-box mb-2">የክሱ ፍሬ ነገሮች (STATEMENT OF FACTS)</div>
        <ol className="ml-5 list-decimal">
          {selectedFacts.length > 0 ? selectedFacts.map((f, i) => (
            <li key={i} className="mb-2 text-justify">
              <span className="bg-yellow-100 px-1">{f.legalText}</span>
              {f.citation && <span className="text-xs font-bold ml-1">[{f.citation}]</span>}
            </li>
          )) : <li className="text-gray-500 italic">Select facts from the editor...</li>}
        </ol>
      </div>

      <div className="mb-5">
        <div className="black-box mb-2">ዳኝነት (RELIEF SOUGHT)</div>
        <div className="border-l-2 border-black pl-4">
          <p>ስለዚህ የተከበረው ፍርድ ቤት እንዲወስንልኝ የምጠይቀው፡</p>
          <ol className="list-decimal ml-5">
             {selectedReliefs
                .filter(item => !(item.id === 'maintenance' && !maintenance.active))
                .map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatReliefText(item) }} />)}
          </ol>
        </div>
      </div>

      <div className="mt-12">
        <div className="black-box">ማረጋገጫ (VERIFICATION)</div>
        <p>ከላይ የቀረበው አቤቱታ እውነት መሆኑን በፍ/ብ/ሥ/ሥ/ሕግ ቁ. 92 መሰረት አረጋግጣለሁ፡፡</p>
        <div className="text-right mt-10">
          <div className="inline-block text-center w-52">
            <div className="border-b-2 border-black h-8"></div>
            <strong>የአመልካች ፊርማ (Applicant's Signature)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
