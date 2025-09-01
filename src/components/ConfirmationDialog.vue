<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6">
              <DialogTitle as="header" class="text-lg font-medium">
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <p>
                  {{ message }}
                </p>
              </div>
              <footer class="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  class="bg-gray-200 text-black px-4 py-2 rounded-lg cursor-pointer"
                  @click="onClose"
                >
                  No
                </button>
                <button
                  type="button"
                  class="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                  @click="onConfirm"
                >
                  Yes
                </button>
              </footer>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useConfirmationDialog } from '@/composables/useConfirmationDialog';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const { isOpen, close, confirm, title, message } = useConfirmationDialog();

const onConfirm = () => {
  confirm();
};

const onClose = () => {
  close();
};
</script>
