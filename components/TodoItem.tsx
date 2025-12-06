
import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between p-4 transition-colors duration-300 hover:bg-gray-800/60">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onToggle(todo.id)}>
        <button
            className={`w-6 h-6 flex-shrink-0 border-2 rounded-md flex items-center justify-center transition-all duration-300 ${
                todo.completed
                ? 'bg-purple-600 border-purple-600'
                : 'border-gray-500 group-hover:border-purple-500'
            }`}
        >
            {todo.completed && <CheckIcon className="w-4 h-4 text-white" />}
        </button>
        <span className={`transition-colors duration-300 ${
            todo.completed ? 'text-gray-500 line-through' : 'text-gray-200'
        }`}>
            {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Delete task"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;
