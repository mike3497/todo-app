<template>
  <div class="w-full h-svh flex items-center justify-center">
    <div class="bg-white w-lg rounded-lg p-6 flex flex-col gap-4">
      <h1 class="font-bold text-3xl text-center">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
</script>
