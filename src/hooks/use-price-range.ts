import { useMemo } from 'react';
import { useLangCurr } from '@/context/langCurrContext';

export const usePriceRanges = () => {
  const { currency } = useLangCurr();

  const priceRanges = useMemo(() => {
    const getRanges = () => {
      switch (currency) {
        case 'USD':
          return [
            { min: 0, max: 100000, label: "Up to $100,000" },
            { min: 100000, max: 250000, label: "$100,000 - $250,000" },
          ];
        case 'EUR':
          return [
            { min: 0, max: 100000, label: "Up to €100,000" },
            { min: 100000, max: 250000, label: "€100,000 - €250,000" },
          ];
        case 'AED':
          return [
            { min: 0, max: 367000, label: "Up to AED 367,000" },
            { min: 367000, max: 918000, label: "AED 367,000 - AED 918,000" },
          ];
        default:
          return [
            { min: 0, max: 100000, label: "Up to €100,000" },
            { min: 100000, max: 250000, label: "€100,000 - €250,000" },
          ];
      }
    };

    return getRanges();
  }, [currency]);

  return priceRanges;
};