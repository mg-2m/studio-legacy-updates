"use client";

import type { AppState } from '@/lib/types';
import { EVIDENCE_REGISTRY } from '@/lib/data';

interface PageTwoProps {
  state: AppState;
}

export default function PageTwo({ state }: PageTwoProps) {
  const { metadata: meta, smartEvidence, evidence } = state;

  const allEvidence: { label: string; credential?: string; type: string }[] = [];

  Object.entries(smartEvidence).forEach(([regId, smartEv]) => {
    if (!smartEv.active) return;
    const registryItem = EVIDENCE_REGISTRY[regId];
    if (registryItem) {
      allEvidence.push({
        label: registryItem.label,
        credential: smartEv.credentialId,
        type: 'Auto-Linked'
      });
    }
  });

  evidence.forEach(e => {
    allEvidence.push({
      label: e.description || e.type,
      credential: e.refNumber,
      type: 'Manual'
    });
  });

  const hasEvidence = allEvidence.length > 0;

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

      {hasEvidence ? (
        <ol className="ml-5 list-decimal" style={{ lineHeight: 1.8 }}>
          {allEvidence.map((e, i) => (
            <li key={i} className="mb-3 text-justify">
              <strong>{e.label}</strong>
              {e.credential && ` (${e.credential})`}
              {e.type === 'Auto-Linked' && <span className="text-xs text-green-700 ml-2 font-sans">[Auto-Linked]</span>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-center text-gray-500 p-5">ምንም ማስረጃ አልተዘረዘረም (No evidence listed)</div>
      )}

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
