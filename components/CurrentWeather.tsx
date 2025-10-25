
import React from 'react';
import { CurrentWeatherData } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg">
      <div className="flex items-center gap-6 mb-6 md:mb-0">
        <div className="w-24 h-24 md:w-32 md:h-32">
          <WeatherIcon condition={data.condition} />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold">{data.city}</h2>
          <p className="text-xl text-slate-300">{data.condition}</p>
        </div>
      </div>
      <div className="text-center md:text-right">
        <p className="text-7xl md:text-8xl font-extrabold tracking-tighter">
          {data.temperature}°<span className="text-6xl align-top">C</span>
        </p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-2 text-slate-300 text-sm">
            <span>体感: {data.feelsLike}°</span>
            <span>湿度: {data.humidity}%</span>
            <span>风速: {data.windSpeed}km/h</span>
        </div>
      </div>
    </div>
  );
};
