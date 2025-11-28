

"use client";

import type { AppState, ManualEvidence, Party } from '@/lib/types';
import { EVIDENCE_REGISTRY } from '@/lib/data';

interface PageTwoProps {
  state: AppState;
}

// Function to strip english parenthetical text
const stripEnglish = (text: string) => {
    if (!text) return '';
    const match = text.match(/^(.*?)\s*\(/);
    return match ? match[1].trim() : text;
}


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

            return (
              <li key={index} className="mb-2">
                 <div className="grid grid-cols-1 text-left">
                    <span className="font-bold text-base whitespace-nowrap">{stripEnglish(party.honorific)} {party.name}</span>
                    <div></div>
                </div>
                <div className="text-sm pl-6">
                  አድራሻ፡ {party.address.city}, {subcity}{woreda}
                </div>
              </li>
            )
        })}
      </ol>
    );
  };


export default function PageTwo({ state }: PageTwoProps) {
  const { metadata: meta, applicants, respondents, partyTitles, smartEvidence, evidence } = state;

  const getPluralizedTitle = (title: string, count: number): string => {
    if (count <= 1) return stripEnglish(title).toUpperCase();
    return `${stripEnglish(title)}ዎች`.toUpperCase();
  };

  const applicantTitle = getPluralizedTitle(partyTitles.applicant, applicants.length);
  const respondentTitle = getPluralizedTitle(partyTitles.respondent, respondents.length);

  const documentEvidence: { description: string }[] = [];
  const witnessEvidence: { label: string; details: string }[] = [];
  const courtOrderEvidence: { label: string; details: string }[] = [];

  // Process Smart Evidence
  Object.entries(smartEvidence).forEach(([regId, smartEv]) => {
    if (!smartEv.active) return;
    const registryItem = EVIDENCE_REGISTRY[regId];
    if (registryItem) {
        documentEvidence.push({
            description: `${registryItem.label}${smartEv.credentialId ? `፣ ${registryItem.credentialLabel}: ${smartEv.credentialId}` : ''}`
        });
    }
  });

  // Process Manual Evidence
  evidence.forEach((e: ManualEvidence) => {
    if (e.type === 'Document') {
        let fullDescription = e.description || 'የሰነድ ማስረጃ';
        
        let detailsParts = [];
        if (e.refNumber) detailsParts.push(`ቁጥር: ${e.refNumber}`);
        if (e.issueDate) detailsParts.push(`የተሰጠበት ቀን: ${e.issueDate}`);
        if (e.issuer) {
            const issuerText = e.issuer === 'ሌላ' ? e.issuerOther : e.issuer;
            if (issuerText) detailsParts.push(`አውጪ: ${issuerText}`);
        }
        if (e.pageCount) detailsParts.push(`ገጽ: ${e.pageCount}`);

        if (detailsParts.length > 0) {
            fullDescription += `፣ ${detailsParts.join('፣ ')}`;
        }
        
        if (e.documentType === 'Copy') {
          fullDescription += '፣ ኮፒ';
        } else if (e.documentType === 'Original') {
          fullDescription += '፣ ኦርጅናል';
        }

        fullDescription += " ተያይዙዋል";

        if (e.originalLocation && e.originalLocation !== 'የማይመለከተው') {
            const location = e.originalLocation === 'ሌላ' ? e.originalLocationOther : e.originalLocation;
            if (location) fullDescription += `፣ ኦርጅናሉ ${location} የሚገኝ።`;
        } else {
             fullDescription += "።";
        }


        documentEvidence.push({ description: fullDescription });

    } else if (e.type === 'Witness') {
        const label = `${stripEnglish(e.honorific)} ${e.name}` || 'Unnamed Witness';
        let subcity = e.subcity === 'ሌላ' ? e.subcityOther : e.subcity;
        if(subcity && subcity !== 'ሌላ') {
            subcity += ' ክፍለ ከተማ';
        }
        const woreda = e.woreda ? `, ወረዳ ${e.woreda}` : '';
        const houseNo = e.houseNo ? `, የቤት ቁጥር ${e.houseNo}` : '';
        const details = `አድራሻ: ${e.city}, ${subcity}${woreda}${houseNo}`;
        witnessEvidence.push({ label, details });
    } else if (e.type === 'CourtOrder') {
        const label = e.description || stripEnglish(e.type);
        const details = e.description;
        courtOrderEvidence.push({ label, details });
    }
  });


  const hasEvidence = documentEvidence.length > 0 || witnessEvidence.length > 0 || courtOrderEvidence.length > 0;

  if (!hasEvidence) {
    return null; // Don't render page two if there's no evidence at all
  }

  return (
    <div className="a4-page">
       <div className="header-block">
         <div className="text-right mb-1">
          <span className="green-box">ቀን: {meta.date || '___________'}</span>
          <div className="mt-2 inline-block border-2 border-black px-2 py-0.5 font-bold">
            መዝገብ ቁጥር: {meta.fileNumber || '___________'}
          </div>
        </div>
        <div>
          <span className="black-box text-lg">ለ: {stripEnglish(meta.courtLevel) || '___________'}</span>
        </div>
        <div className="mt-1">
          <span className="green-box">{stripEnglish(meta.bench) || '___________'}</span>
        </div>
        <div className="mt-1">
          <span className="black-box">{stripEnglish(meta.city) || '___________'}</span>
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
        <h2 className="font-bold italic underline">በ/ፍ/ብ/ስ/ስ/ህ/ቁ፦222/223 መሰረት ከከሳሽ የቀረበ የማስረጃ ዝርዝር</h2>
      </div>

      <div className="space-y-4">
        {documentEvidence.length > 0 && (
          <div>
            <h3 className="font-bold">ሀ). የሰነድ ማስረጃ</h3>
            <ol className="ml-8 list-decimal" style={{ lineHeight: 1.8 }}>
              {documentEvidence.map((e, i) => (
                <li key={`doc-${i}`} className="mb-3 text-justify" dangerouslySetInnerHTML={{ __html: e.description }} />
              ))}
            </ol>
          </div>
        )}

        {witnessEvidence.length > 0 && (
          <div>
            <h3 className="font-bold">ለ). የሰው ማስረጃ</h3>
            <ol className="ml-8 list-decimal" style={{ lineHeight: 1.8 }}>
              {witnessEvidence.map((e, i) => (
                <li key={`wit-${i}`} className="mb-3 text-justify">
                  <strong>{stripEnglish(e.label)}</strong>
                  <p className="text-sm text-gray-800 pl-4 border-l-2 border-gray-200 ml-2 mt-1">
                    {stripEnglish(e.details)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {courtOrderEvidence.length > 0 && (
          <div>
            <h3 className="font-bold">ሐ). በ/ፍ/ብ/ስ/ስ/ህ/ቁ፦145 መሰረት በፍርድ ቤት ትዕዛዝ የሚቀርብ የማስረጃ ዝርዝር</h3>
            <ol className="ml-8 list-decimal" style={{ lineHeight: 1.8 }}>
              {courtOrderEvidence.map((e, i) => (
                <li key={`co-${i}`} className="mb-3 text-justify">
                  {e.details ? (
                    <span dangerouslySetInnerHTML={{ __html: stripEnglish(e.details) }} />
                  ) : (
                    <strong>{stripEnglish(e.label)}</strong>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="mt-12 pt-5 border-t-2 border-black">
        <div className="black-box mb-4">ማረጋገጫ</div>
        <p className="text-justify leading-relaxed">
          ከላይ የተዘረዘረው ማስረጃ ሁሉ እውነት መሆኑን ተምሪ ነኝ። መረጃዎቹ በፍርድ ቤት ስሙ ውስጥ ስሚ በተጠየቀ ጊዜ ዋናውን ማስረጃ ቀርቦ አረጋግጣለሁ።
        </p>
        <div className="text-right mt-10">
          <div className="inline-block text-center w-52">
            <div className="border-b-2 border-black h-8"></div>
            <strong className="text-sm">የአመልካች ፊርማ</strong>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-2 border-t border-gray-200 text-center text-xs text-gray-400 font-sans">
        ADDIS CROWN LEGAL-TECH PLATFORM | EVIDENCE ANNEX PAGE
      </div>
    </div>
  );
}
