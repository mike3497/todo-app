<template>
  <li
    ref="target"
    class="bg-zinc-100 border border-zinc-300 p-2 rounded-lg flex items-center justify-between gap-4"
  >
    <div class="flex-1 flex items-center gap-2">
      <input
        class="accent-purple-600 w-4 h-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        type="checkbox"
        :id="`todo-completed-${todo.id}`"
        :checked="todo.completed"
        @change="onToggleComplete"
      />
      <span v-if="!isEditing" class="text-sm p-2" :class="{ 'line-through': todo.completed }">
        {{ todo.title }}
      </span>
      <input
        v-else
        v-model="titleValue"
        :id="`todo-title-${todo.id}`"
        class="border border-zinc-300 bg-white p-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        type="text"
        @keydown.enter="onKeydownEnter"
      />
    </div>
    <div v-if="!isEditing" class="flex items-center gap-1">
      <AppButton size="small" @click="onEditClick">
        <Pencil class="w-3 h-3" />
        <span class="sr-only">Edit</span>
      </AppButton>
      <AppButton size="small" @click="onDeleteClick">
        <Trash class="w-3 h-3" />
        <span class="sr-only">Delete</span>
      </AppButton>
    </div>
    <div v-else class="flex items-center gap-1">
      <AppButton size="small" @click="onSaveClick">
        <Save class="w-3 h-3" />
        <span class="sr-only">Save</span>
      </AppButton>
      <AppButton size="small" @click="onCancelClick">
        <Ban class="w-3 h-3" />
        <span class="sr-only">Cancel</span>
      </AppButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useConfirmationDialog } from '@/composables/useConfirmationDialog';
import type { Todo } from '@/models/todo';
import { useTodosStore } from '@/stores/todos';
import { onClickOutside } from '@vueuse/core';
import { Ban, Pencil, Save, Trash } from 'lucide-vue-next';
import { ref, useTemplateRef, watch } from 'vue';
import AppButton from './AppButton.vue';

const props = defineProps<{
  todo: Todo;
}>();

const { open } = useConfirmationDialog();
const todosStore = useTodosStore();

const target = useTemplateRef<HTMLElement>('target');
const isEditing = ref<boolean>(false);
const titleValue = ref<string>(props.todo.title);

const cancelEditing = () => {
  titleValue.value = props.todo.title;
  isEditing.value = false;
};

const save = () => {
  if (titleValue.value.trim() === '') {
    titleValue.value = props.todo.title;
  } else {
    todosStore.updateTodoTitle(props.todo.id, titleValue.value);
  }
  isEditing.value = false;
};

const onKeydownEnter = () => {
  save();
};

const onToggleComplete = () => {
  todosStore.toggleTodoCompleted(props.todo.id);
};

const onEditClick = () => {
  isEditing.value = true;
};

const onDeleteClick = () => {
  open({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this todo?',
    onConfirm: () => {
      todosStore.removeTodo(props.todo.id);
    },
  });
};

const onSaveClick = () => {
  save();
};

const onCancelClick = () => {
  cancelEditing();
};

watch(
  () => props.todo.title,
  (newTitle) => {
    titleValue.value = newTitle;
  },
);

onClickOutside(target, () => {
  cancelEditing();
});
</script>
