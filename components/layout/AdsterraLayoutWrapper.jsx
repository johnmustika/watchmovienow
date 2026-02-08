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

        const nativeContainer = document.getElementById('container-496dde0123448ad6ccb4db9daf5371c8');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/496dde0123448ad6ccb4db9daf5371c8/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/32/73/16/327316ab0a81189db86199c83a7057e6.js' }
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
            if(document.querySelector(`script[src*="fe33cfed1f1aa1da1d2ade6c912e18e8"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/fe/33/cf/fe33cfed1f1aa1da1d2ade6c912e18e8.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}