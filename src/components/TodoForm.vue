<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2 mb-4">
      <label class="font-semibold text-sm" for="todo-title">Todo Title</label>
      <input
        id="todo-title"
        v-model="todoTitle"
        :class="`border bg-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 mb-1 ${inputBorderClass}`"
        type="text"
        placeholder="e.g. Buy groceries"
        :maxlength="maxTodoTitleLength"
        @input="isTouched = true"
        @blur="isTouched = true"
      />
      <div class="flex items-center justify-between text-xs text-zinc-500">
        <span v-if="isTouched && !isInputValid" class="text-red-500">Title is required.</span>
        <span class="ml-auto">{{ remainingChars }} chars left</span>
      </div>
    </div>
    <AppButton class="w-full" type="submit" :disabled="!isInputValid">Add Todo</AppButton>
  </form>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import { nanoid } from 'nanoid';
import { computed, ref } from 'vue';

const todosStore = useTodosStore();

const maxTodoTitleLength = 64;
const todoTitle = ref<string>('');
const isTouched = ref<boolean>(false);

const remainingChars = computed<number>(() => {
  return maxTodoTitleLength - todoTitle.value.length;
});

const isInputValid = computed<boolean>(() => {
  return todoTitle.value.trim() !== '' && todoTitle.value.length <= maxTodoTitleLength;
});

const inputBorderClass = computed<string>(() => {
  if (isTouched.value && !isInputValid.value) {
    return 'border-red-500 focus:ring-red-400';
  }
  return 'border-zinc-300 focus:ring-purple-400';
});

const onSubmit = () => {
  isTouched.value = true;
  if (!isInputValid.value) {
    return;
  }

  const todo: Todo = {
    id: nanoid(),
    title: todoTitle.value.trim(),
    completed: false,
  };

  todosStore.addTodo(todo);
  todoTitle.value = '';
  isTouched.value = false;
};
</script>
