import React from 'react';
import { WeatherCondition } from '../types';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = '' }) => {
  // FIX: Changed type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  const iconMap: Record<WeatherCondition, React.ReactNode> = {
    '晴': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-yellow-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    '多云': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-slate-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.5 4.5 0 0 0 2.25 15Z" />
      </svg>
    ),
    '阴': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-slate-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.5 4.5 0 0 0 2.25 15Z" />
      </svg>
    ),
    '雨': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-blue-400">
         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l.75-1.5 1.5-3-1.5-3L9 3.75" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75h3.375l1.125 3 1.125-3H18" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 18.75l-1.125-3-1.125 3h2.25Z" />
      </svg>
    ),
    '雷阵雨': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-yellow-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.5 4.5 0 0 0 2.25 15Z" opacity={0.5} />
      </svg>
    ),
    '雪': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-cyan-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" opacity={0.3} />
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 4.5-1.5 1.5-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 4.5 1.5 1.5 1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 11.25 1.5 1.5-1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 11.25 1.5-1.5 1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75 9.75 15l-2.25-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 19.5 1.5-1.5 1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 19.5-1.5-1.5-1.5 1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 12.75-1.5-1.5 1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 12.75-1.5 1.5-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 11.25 2.25-2.25 2.25 2.25" />
      </svg>
    ),
  };
  
  return (
    <div className={className}>
      {iconMap[condition] || iconMap['多云']}
    </div>
  );
};
