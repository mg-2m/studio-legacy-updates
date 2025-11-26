"use client";

import type { AppState } from '@/lib/types';
import { EVIDENCE_REGISTRY } from '@/lib/data';

interface PageTwoProps {
  state: AppState;
}

export default function PageTwo({ state }: PageTwoProps) {
  const { metadata: meta, smartEvidence, evidence } = state;

  const allEvidence: { label: string; details: string; type: string }[] = [];

  // Process Smart (Auto-Linked) Evidence
  Object.entries(smartEvidence).forEach(([regId, smartEv]) => {
    if (!smartEv.active) return;
    const registryItem = EVIDENCE_REGISTRY[regId];
    if (registryItem) {
      allEvidence.push({
        label: registryItem.label,
        details: smartEv.credentialId ? `${registryItem.credentialLabel}: ${smartEv.credentialId}` : 'No details provided',
        type: 'Auto-Linked'
      });
    }
  });

  // Process Manual Evidence
  evidence.forEach(e => {
    let details = e.description || e.type;
    if (e.type === 'Document') {
        const issuer = e.issuer === 'Other (ሌላ)' ? e.issuerOther : e.issuer;
        const location = e.originalLocation === 'Other (ሌላ)' ? e.originalLocationOther : e.originalLocation;
        details = `${e.description} (Ref: ${e.refNumber || 'N/A'}, Issuer: ${issuer || 'N/A'}, Pages: ${e.pageCount || 'N/A'}, Type: ${e.documentType}, Location: ${location || 'N/A'})`;
    }
    allEvidence.push({
      label: e.description || e.type,
      details: details,
      type: `Manual (${e.type})`
    });
  });

  const hasEvidence = allEvidence.length > 0;

  if (!hasEvidence) {
    return null; // Don't render page two if there's no evidence at all
  }

  return (
    <div className="a4-page">
      <div className="border-b-2 border-black pb-2 mb-5">
        <div className="text-sm font-bold mb-1">{meta.courtLevel}</div>
        <div className="text-xs">File No: {meta.fileNumber} | Date: {meta.date}</div>
      </div>

      <div style={{ borderTop: '4px double black' }} className="my-5"></div>

      <div className="text-center mb-5">
        <div className="black-box text-lg">የማስረጃ ዝርዝር (EVIDENCE LIST)</div>
      </div>

      <ol className="ml-5 list-decimal" style={{ lineHeight: 1.8 }}>
        {allEvidence.map((e, i) => (
          <li key={i} className="mb-3 text-justify">
            <strong>{e.label}</strong>
            <span className="text-xs text-gray-500 ml-2 font-sans italic">[{e.type}]</span>
            <p className="text-sm text-gray-800 pl-4 border-l-2 border-gray-200 ml-2 mt-1">
              {e.details}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 pt-5 border-t-2 border-black">
        <div className="black-box mb-4">ማረጋገጫ (VERIFICATION)</div>
        <p className="text-justify leading-relaxed">
          ከላይ የተዘረዘረው ማስረጃ ሁሉ እውነት መሆኑን ተምሪ ነኝ። መረጃዎቹ በፍርድ ቤት ስሙ ውስጥ ስሚ በተጠየቀ ጊዜ ዋናውን ማስረጃ ቀርቦ አረጋግጣለሁ።
        </p>
        <div className="text-right mt-10">
          <div className="inline-block text-center w-52">
            <div className="border-b-2 border-black h-8"></div>
            <strong className="text-sm">የአመልካች ፊርማ (Applicant's Signature)</strong>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-2 border-t border-gray-200 text-center text-xs text-gray-400 font-sans">
        ADDIS CROWN LEGAL-TECH PLATFORM | EVIDENCE ANNEX PAGE
      </div>
    </div>
  );
}
