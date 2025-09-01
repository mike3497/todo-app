<template>
  <ul class="flex flex-col gap-4">
    <TodoListItem v-for="todo in todosStore.todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<script setup lang="ts">
import TodoListItem from '@/components/TodoListItem.vue';
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
</script>
