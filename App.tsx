
import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { Loader } from './components/Loader';
import { WeatherData, WeatherCondition } from './types';
import { getWeatherForecast } from './services/geminiService';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleSearch = useCallback(async (city: string) => {
    if (!city) {
      setError('请输入城市名称。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setInitialLoad(false);

    try {
      const data = await getWeatherForecast(city);
      if (data) {
        setWeatherData(data);
      } else {
        setError(`无法获取“${city}”的天气信息，请换个城市试试。`);
        setWeatherData(null);
      }
    } catch (err) {
      console.error(err);
      setError('调用服务时发生错误，请稍后重试。');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBackgroundImage = (condition: WeatherCondition): string => {
    switch (condition) {
      case '晴':
        return 'from-sky-400 to-blue-600';
      case '多云':
        return 'from-slate-500 to-slate-700';
      case '阴':
        return 'from-gray-600 to-gray-800';
      case '雨':
      case '雷阵雨':
        return 'from-blue-800 to-slate-900';
      case '雪':
        return 'from-blue-300 to-indigo-400';
      default:
        return 'from-slate-800 to-slate-900';
    }
  };
  
  const backgroundClass = weatherData ? getBackgroundImage(weatherData.current.condition) : 'from-slate-800 to-slate-900';

  return (
    <div className={`min-h-screen bg-slate-900 text-white font-sans transition-all duration-1000`}>
      <main className={`min-h-screen bg-gradient-to-br ${backgroundClass} transition-all duration-1000`}>
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-shadow">
              中国天气预报
            </h1>
            <p className="text-slate-300 mt-2">
              由 Gemini AI 驱动
            </p>
          </header>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            {isLoading && <Loader />}
            
            {error && !isLoading && (
              <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg mt-6">
                {error}
              </div>
            )}
            
            {initialLoad && !isLoading && (
              <div className="text-center text-slate-400 mt-10">
                <p className="text-lg">请输入一个中国城市名称开始查询，例如：“上海” 或 “成都”。</p>
              </div>
            )}

            {weatherData && !isLoading && (
              <div className="mt-6 animate-fade-in">
                <CurrentWeather data={weatherData.current} />
                <Forecast data={weatherData.forecast} />
              </div>
            )}
          </div>
           <footer className="text-center mt-8 text-slate-400 text-sm">
             <p>&copy; {new Date().getFullYear()} 天气预报平台. 天气数据由 wttr.in 提供。</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;