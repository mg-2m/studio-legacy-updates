"use client";

import type { AppState } from '@/lib/types';

interface PageOneProps {
  state: AppState;
}

export default function PageOne({ state }: PageOneProps) {
  const { metadata: meta, applicants, respondents, selectedFacts, maintenance } = state;

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

  const reliefItems = [
    'ከላይ የተዘረዘሩት የክሱ ፍሬ ነገሮች በፍ/ብ/ስ/ስ/ህ/ቁ 92 መሰረት እንዲረጋገጥልኝ፡፡',
    maintenance.active && maintenance.income > 0 && `ተከሳሽ በወር ${maintenance.income} ብር ገቢ ስላላቸው፣ ለ ${maintenance.children} ልጅ/ልጆች አስተዳደግ እና ቀለብ ለእያንዳንዱ ልጅ በወር ${maintenance.result.toFixed(2)} ብር እንዲከፍሉ ይወሰንልኝ፡፡`,
    'ተገቢው የፍርድ ውሳኔ እንዲሰጠኝ፡፡',
    'ወጪ እና ኪሳራ እንዲተካ፡፡'
  ].filter(Boolean);

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
        <div className="purple-box">PLAINTIFF / APPLICANT (አመልካች / ክሳሽ)</div>
        {applicants.map((p, i) => (
          <div key={i} className="border-l-4 border-black pl-3 mt-1">
            <div className="font-bold text-base">{p.name || '___________'}</div>
            <div className="text-sm">ID: {p.idNumber || '___'} | Tel: {p.phone || '___'}</div>
            <div className="text-sm italic">Address: {p.address.city}, {p.address.subcity}</div>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <div className="purple-box">DEFENDANT / RESPONDENT (ተጠሪ / ተከሳሽ)</div>
        {respondents.length > 0 ? respondents.map((p, i) => (
          <div key={i} className="border-l-4 border-black pl-3 mt-1">
            <div className="font-bold text-base">{p.name || '___________'}</div>
            <div className="text-sm italic">Address: {p.address.city}, {p.address.subcity}</div>
          </div>
        )) : <div className="text-gray-500 italic pl-3">[No Respondent]</div>}
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
            {reliefItems.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item as string }} />)}
          </ol>
        </div>
      </div>

      <div className="mt-12">
        <div className="black-box">ማረጋገጫ (VERIFICATION)</div>
        <p>ከላይ የቀረበው አቤቱታ እውነት መሆኑን በፍ/ብ/ሥ/ሥ/ሕግ ቁ. 92 መሰረት አረጋግጣለሁ፡፡</p>
        <div className="text-right mt-10">
          <div className="inline-block text-center w-52">
            <div className="border-b-2 border-black h-8"></div>
            <strong>Applicant's Signature</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
