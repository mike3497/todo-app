import { type Todo } from '@/models/todo';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todosStore', () => {
  const todos = useLocalStorage<Todo[]>('todos', [
    { id: '1', title: 'Buy groceries', completed: false },
    { id: '2', title: 'Walk the dog', completed: true },
    { id: '3', title: 'Read a book', completed: true },
    { id: '4', title: 'Finish homework', completed: false },
    { id: '5', title: 'Call mom', completed: false },
    { id: '6', title: 'Clean the kitchen', completed: false },
    { id: '7', title: 'Pay bills', completed: false },
    { id: '8', title: 'Exercise', completed: true },
    { id: '9', title: 'Plan weekend trip', completed: false },
    { id: '10', title: 'Reply to emails', completed: true },
  ]);

  const addTodo = (todo: Todo) => {
    todos.value.unshift(todo);
  };

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const updateTodoTitle = (id: string, title: string) => {
    const index = todos.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.value[index].title = title;
    }
  };

  const toggleTodoCompleted = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  return {
    addTodo,
    removeTodo,
    todos,
    toggleTodoCompleted,
    updateTodoTitle,
  };
});
