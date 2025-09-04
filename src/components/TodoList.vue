<template>
  <ul v-if="displayedTodos.length > 0" class="flex flex-col gap-4">
    <TodoListItem v-for="todo in displayedTodos" :key="todo.id" :todo="todo" />
  </ul>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
    <AppButton
      v-for="page in totalPages"
      :key="page"
      size="small"
      :variant="getPageButtonVariant(page)"
      @click="onPageChange(page)"
    >
      {{ page }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import TodoListItem from '@/components/TodoListItem.vue';
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import type { ButtonVariant } from '@/types/buttonVariant';
import { computed, ref, watch } from 'vue';
import AppButton from './AppButton.vue';

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

const getPageButtonVariant = (page: number): ButtonVariant => {
  if (currentPage.value === page) {
    return 'primary';
  } else {
    return 'secondary';
  }
};

watch(
  () => totalPages.value,
  (newTotalPages) => {
    if (currentPage.value > newTotalPages) {
      currentPage.value = Math.max(newTotalPages, 1);
    }
  },
);
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
