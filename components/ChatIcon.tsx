
import React from 'react';

const ChatBubbleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

interface ChatIconProps {
    onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-purple-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Open chat assistant"
        >
            <ChatBubbleIcon className="w-8 h-8" />
        </button>
    );
};

export default ChatIcon;
