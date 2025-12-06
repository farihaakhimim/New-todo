
import React, { useState, useRef, useEffect } from 'react';
import { Todo, ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  todos: Todo[];
}

const LoadingDots: React.FC = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, todos }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! How can I help you with your to-do list today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newUserMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(updatedMessages, todos);
      const newModelMessage: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, newModelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
      <div 
        className="w-full max-w-lg h-[80vh] max-h-[700px] bg-gray-800/80 border border-gray-700/50 rounded-2xl shadow-2xl shadow-purple-500/20 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0">
          <h2 id="chatbot-title" className="text-xl font-bold text-white">AI Assistant</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none" aria-label="Close chat">&times;</button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-3 ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-gray-700 text-gray-200 rounded-xl px-4 py-3">
                 <LoadingDots />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about your tasks..."
              className="flex-grow bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
