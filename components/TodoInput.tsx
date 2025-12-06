
import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-grow bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
