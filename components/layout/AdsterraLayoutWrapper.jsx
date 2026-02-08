// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-4a4203db00ee1d954cb5bc10cc999ecb');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/4a4203db00ee1d954cb5bc10cc999ecb/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/c8/82/73/c882737e4b1e7d8dddffb5f9fe853dca.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="f75b67ddf5a1572d70b3eee3d410a02b"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/f7/5b/67/f75b67ddf5a1572d70b3eee3d410a02b.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}