<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2 mb-4">
      <label class="font-semibold text-sm" for="todo-title">Todo Title</label>
      <input
        v-model="todoTitle"
        class="border border-gray-300 p-2 rounded-lg"
        id="todo-title"
        type="text"
      />
    </div>
    <button class="bg-gray-950 text-white px-4 py-2 rounded-lg cursor-pointer w-full" type="submit">
      Add Todo
    </button>
  </form>
</template>

<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import { nanoid } from 'nanoid';
import { ref } from 'vue';

const todosStore = useTodosStore();

const todoTitle = ref<string>('');

const onSubmit = () => {
  if (todoTitle.value.trim() !== '') {
    const todo: Todo = {
      id: nanoid(),
      title: todoTitle.value,
      completed: false,
    };

    todosStore.addTodo(todo);
    todoTitle.value = '';
  }
};
</script>
