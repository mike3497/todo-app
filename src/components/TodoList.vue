<template>
  <ul class="flex flex-col gap-4">
    <TodoListItem v-for="todo in displayedTodos" :key="todo.id" :todo="todo" />
  </ul>
  <div class="flex items-center justify-center gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      class="px-2 py-1 text-sm rounded-lg cursor-pointer"
      :class="{
        'bg-black text-white': currentPage === page,
        'bg-gray-100 text-black': currentPage !== page,
      }"
      @click="onPageChange(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup lang="ts">
import TodoListItem from '@/components/TodoListItem.vue';
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import { computed, ref } from 'vue';

const todosStore = useTodosStore();

const todosPerPage = 5;
const currentPage = ref<number>(1);

const totalPages = computed<number>(() => Math.ceil(todosStore.todos.length / todosPerPage));

const displayedTodos = computed<Todo[]>(() => {
  const start = (currentPage.value - 1) * todosPerPage;
  const end = start + todosPerPage;
  return todosStore.todos.slice(start, end);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
};
</script>
