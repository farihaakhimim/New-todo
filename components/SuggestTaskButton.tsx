
import React from 'react';

interface SuggestTaskButtonProps {
  onSuggest: () => void;
  isLoading: boolean;
}

const SparkleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 3zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM4.032 4.032a.75.75 0 011.06 0l1.062 1.06a.75.75 0 01-1.06 1.06L4.032 5.092a.75.75 0 010-1.06zm10.876 10.876a.75.75 0 011.06 0l1.062 1.06a.75.75 0 01-1.06 1.06l-1.06-1.062a.75.75 0 010-1.06zM3 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 10zm12 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM5.092 15.968a.75.75 0 010-1.06l1.06-1.062a.75.75 0 111.06 1.06L6.152 15.968a.75.75 0 01-1.06 0zm10.876-10.876a.75.75 0 010-1.06l1.06-1.062a.75.75 0 111.06 1.06L16.152 5.092a.75.75 0 01-1.06 0z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC<{className?: string}> = ({className}) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const SuggestTaskButton: React.FC<SuggestTaskButtonProps> = ({ onSuggest, isLoading }) => {
  return (
    <button
      onClick={onSuggest}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-600/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
    >
      {isLoading ? (
        <>
            <LoadingSpinner className="w-4 h-4" />
            <span>Suggesting...</span>
        </>
      ) : (
        <>
            <SparkleIcon className="w-4 h-4"/>
            <span>Suggest Task</span>
        </>
      )}
    </button>
  );
};

export default SuggestTaskButton;
