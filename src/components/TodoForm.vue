<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2 mb-4">
      <label class="font-semibold text-sm">Task</label>
      <input v-model="task" class="border border-gray-300 p-2 rounded-lg" type="text" />
    </div>
    <button class="bg-gray-950 text-white px-4 py-2 rounded-lg cursor-pointer w-full" type="submit">
      Add Task
    </button>
  </form>
</template>

<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import { nanoid } from 'nanoid';
import { ref } from 'vue';

const todosStore = useTodosStore();

const task = ref<string>('');

const onSubmit = () => {
  if (task.value.trim() !== '') {
    const todo: Todo = {
      id: nanoid(),
      title: task.value,
      completed: false,
    };

    todosStore.addTodo(todo);
    task.value = '';
  }
};
</script>
