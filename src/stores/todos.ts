import { type Todo } from '@/models/todo';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodosStore = defineStore('todosStore', () => {
  const todos = ref<Todo[]>([]);

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
