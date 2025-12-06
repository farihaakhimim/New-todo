
import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <p className="text-gray-400">Your list is empty.</p>
        <p className="text-gray-500 text-sm mt-1">Add a task or get a suggestion!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-700/50">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
