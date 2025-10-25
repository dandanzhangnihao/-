
import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';
import { WeatherData, WeatherCondition, CurrentWeatherData, DailyForecastData } from '../types';

// Helper function to map wttr.in weather descriptions to our WeatherCondition type
const mapWeatherCondition = (description: string): WeatherCondition => {
    const desc = description.toLowerCase();
    if (desc.includes('thunder')) return '雷阵雨';
    if (desc.includes('snow') || desc.includes('sleet') || desc.includes('ice') || desc.includes('blizzard')) return '雪';
    if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) return '雨';
    if (desc.includes('sunny') || desc.includes('clear')) return '晴';
    if (desc.includes('cloudy') || desc.includes('overcast')) return '多云';
    if (desc.includes('mist') || desc.includes('fog')) return '阴';
    return '多云'; // Default case
};

// Function to fetch and parse real weather data from wttr.in
const fetchRealWeatherData = async (city: string): Promise<WeatherData | null> => {
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=zh-cn`);
        if (!response.ok) {
            console.error(`Weather API error for ${city}: ${response.statusText}`);
            return null;
        }
        const data = await response.json();

        // Map current weather
        const currentCondition = data.current_condition[0];
        const current: CurrentWeatherData = {
            // SIMPLIFIED: Rely on wttr.in's chinese name, but fallback to the name Gemini provided (which should be Chinese).
            // This avoids falling back to an English name from nearest_area.
            city: data.weather?.[0]?.['lang_zh-cn']?.[0]?.value || city,
            temperature: parseInt(currentCondition.temp_C, 10),
            condition: mapWeatherCondition(currentCondition.weatherDesc[0].value),
            feelsLike: parseInt(currentCondition.FeelsLikeC, 10),
            humidity: parseInt(currentCondition.humidity, 10),
            windSpeed: parseInt(currentCondition.windspeedKmph, 10),
        };

        // Map forecast
        const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const forecast: DailyForecastData[] = data.weather.map((day: any) => {
            const date = new Date(day.date);
            // API returns days in UTC, which might be off by one day depending on timezone.
            // A simple adjustment for display.
            date.setDate(date.getDate() + 1);
            return {
                day: weekDays[date.getDay()],
                date: `${date.getMonth() + 1}月${date.getDate()}日`,
                condition: mapWeatherCondition(day.hourly[4].weatherDesc[0].value), // Use noon weather
                high: parseInt(day.maxtempC, 10),
                low: parseInt(day.mintempC, 10),
            };
        });

        return { current, forecast };

    } catch (error) {
        console.error(`Failed to fetch or parse weather data for ${city}:`, error);
        return null;
    }
};

const getWeatherFunctionDeclaration: FunctionDeclaration = {
    name: 'get_weather_forecast',
    description: '获取指定中国城市的天气预报。',
    parameters: {
        type: Type.OBJECT,
        properties: {
            city: {
                type: Type.STRING,
                description: '中国的城市名称，必须为中文。例如: 北京。',
            },
        },
        required: ['city'],
    },
};

export const getWeatherForecast = async (query: string): Promise<WeatherData | null> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query, // Use the raw query as content
            config: {
                // Add a system instruction to enforce Chinese translation
                systemInstruction: '你是一个天气查询助手。用户的输入是一个城市名称。你的唯一任务是调用 get_weather_forecast 工具。如果用户提供的城市名是英文或拼音，你必须先将其翻译成正确的中文名称再调用工具。例如，如果用户输入 "beijing"，你必须使用 "北京" 来调用工具。',
                tools: [{ functionDeclarations: [getWeatherFunctionDeclaration] }],
            },
        });
        
        const functionCalls = response.functionCalls;
        let cityToFetch = query; // Fallback to user query

        if (functionCalls && functionCalls.length > 0) {
            const firstCall = functionCalls[0];
            if (firstCall.name === 'get_weather_forecast' && firstCall.args.city) {
                cityToFetch = firstCall.args.city;
            }
        } else {
             console.warn("Gemini did not return a valid function call. Using raw query.");
        }
        
        return await fetchRealWeatherData(cityToFetch);

    } catch (error) {
        console.error("Error in getWeatherForecast:", error);
        console.log(`Gemini failed, falling back to fetch weather for "${query}" directly.`);
        return await fetchRealWeatherData(query);
    }
};
