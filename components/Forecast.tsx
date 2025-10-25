
import React from 'react';
import { DailyForecastData } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface ForecastProps {
  data: DailyForecastData[];
}

const ForecastItem: React.FC<{item: DailyForecastData}> = ({ item }) => (
    <div className="flex flex-col items-center bg-slate-700/50 p-4 rounded-lg text-center backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-slate-700/80">
        <p className="font-bold text-lg">{item.day}</p>
        <p className="text-xs text-slate-400 mb-2">{item.date}</p>
        <div className="w-12 h-12">
            <WeatherIcon condition={item.condition} />
        </div>
        <p className="text-lg font-semibold mt-2">{item.high}° / {item.low}°</p>
        <p className="text-sm text-slate-400">{item.condition}</p>
    </div>
);


export const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div className="mt-8 pt-6 border-t border-slate-700">
      <h3 className="text-2xl font-bold mb-4 px-2">未来3天预报</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((day, index) => (
          <ForecastItem key={index} item={day} />
        ))}
      </div>
    </div>
  );
};