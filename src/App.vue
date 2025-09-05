<template>
  <div class="w-full h-svh flex flex-col items-center justify-center gap-1 p-6">
    <div class="bg-white w-lg rounded-lg p-6 flex flex-col gap-4">
      <h1 class="font-bold text-3xl text-center">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
    <footer class="text-sm text-white opacity-75">
      Created by
      <a class="underline" href="https://michaelcarillon.com/" target="_blank">Michael Carillon</a>
    </footer>
  </div>
  <ConfirmationDialog />
</template>

<script setup lang="ts">
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
</script>
