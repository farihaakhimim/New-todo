
import React from 'react';
import { Filter } from '../types';

interface TodoFooterProps {
  activeCount: number;
  completedCount: number;
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
}

const FilterButton: React.FC<{
  filterType: Filter;
  currentFilter: Filter;
  onClick: (filter: Filter) => void;
  children: React.ReactNode;
}> = ({ filterType, currentFilter, onClick, children }) => {
  const isActive = filterType === currentFilter;
  return (
    <button
      onClick={() => onClick(filterType)}
      className={`transition-colors duration-300 ${
        isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};


const TodoFooter: React.FC<TodoFooterProps> = ({
  activeCount,
  completedCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 text-sm text-gray-400 border-t border-gray-700/50">
      <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
      <div className="flex gap-4 my-2 sm:my-0">
        <FilterButton filterType="all" currentFilter={currentFilter} onClick={onFilterChange}>All</FilterButton>
        <FilterButton filterType="active" currentFilter={currentFilter} onClick={onFilterChange}>Active</FilterButton>
        <FilterButton filterType="completed" currentFilter={currentFilter} onClick={onFilterChange}>Completed</FilterButton>
      </div>
      <button
        onClick={onClearCompleted}
        className="hover:text-white transition-colors duration-300 disabled:text-gray-600 disabled:cursor-not-allowed"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;
