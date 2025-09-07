"use client"

import { useState, useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

export default function ConsentManager() {
  const [consentGiven, setConsentGiven] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('gtm:consent');
    const timestamp = localStorage.getItem('gtm:timestamp');
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    if (timestamp) {
      const timeElapsed = Date.now() - parseInt(timestamp, 10);
      if (timeElapsed > oneWeekInMilliseconds) {
        localStorage.removeItem('gtm:consent');
        localStorage.removeItem('gtm:timestamp');
        setConsentGiven("undefined");
      }
    } else if (consent === "true") {
      setConsentGiven("true");
    } else if (consent === "false") {
      setConsentGiven("false");
    } else {
      setConsentGiven("undefined");
    }
  }, []);

  const handleConsent = () => {
    setConsentGiven("true");
    localStorage.setItem('gtm:consent', 'true');
  };

  const handleDecline = () => {
    setConsentGiven("false");
    localStorage.setItem('gtm:consent', 'false');
    localStorage.setItem('gtm:timestamp', Date.now().toString());
  };

  return (
    <>
      {consentGiven === "true" && <GoogleTagManager gtmId="GTM-56ZBLFZR" />}
      {consentGiven === "undefined" && (
        <div className="fixed bottom-0 z-50 w-full bg-zinc-50 dark:text-secondary-foreground dark:bg-zinc-800 p-4 text-sm">
          <p>このサイトでは、利便性、品質維持・向上を目的に、Google Tag Manager (GTM) を使用して利用者の情報を収集しています。GTM による情報の収集に同意しますか？</p>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleConsent}
              className="bg-primary text-primary-foreground px-2 pt-0.5 rounded-md hover:bg-primary/60 h-8">
              同意する
            </button>
            <button onClick={handleDecline}
              className="bg-secondary text-secondary-foreground px-2 pt-0.5 rounded-md hover:text-secondary-foreground/60 h-8">
              同意しない
            </button>
          </div>
        </div>
      )}
    </>
  );
} 
