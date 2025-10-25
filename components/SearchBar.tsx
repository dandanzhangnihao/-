
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入城市名称，如：北京"
        className="flex-grow bg-slate-700/80 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-lg px-6 py-3 transition duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : '搜索'}
      </button>
    </form>
  );
};
