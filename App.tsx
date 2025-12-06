
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, Filter } from './types';
import { suggestTask } from './services/geminiService';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import SuggestTaskButton from './components/SuggestTaskButton';
import ChatIcon from './components/ChatIcon';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<Filter>('all');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const handleSuggestTask = async () => {
    setIsSuggesting(true);
    setError(null);
    try {
      const suggestion = await suggestTask();
      if (suggestion) {
        addTodo(suggestion);
      }
    } catch (err) {
      setError('Failed to get suggestion. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);
  const completedCount = useMemo(() => todos.length - activeCount, [todos, activeCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 font-sans p-4 sm:p-6">
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
            Todo List
          </h1>
          <SuggestTaskButton onSuggest={handleSuggestTask} isLoading={isSuggesting} />
        </header>
        
        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl shadow-purple-500/10">
          <div className="p-6">
            <TodoInput onAddTodo={addTodo} />
          </div>
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
          {todos.length > 0 && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
      <ChatIcon onClick={() => setIsChatOpen(true)} />
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        todos={todos} 
      />
    </div>
  );
};

export default App;
