import type { ConfirmationDialogOptions } from '@/models/confirmationDialogOptions';
import { computed, ref } from 'vue';

const isOpen = ref<boolean>(false);
const options = ref<ConfirmationDialogOptions | null>(null);

export const useConfirmationDialog = () => {
  const title = computed<string>(() => options.value?.title ?? '');

  const message = computed<string>(() => options.value?.message ?? '');

  const open = (newOptions: ConfirmationDialogOptions) => {
    options.value = newOptions;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    setTimeout(() => {
      options.value = null;
    }, 200);
  };

  const confirm = () => {
    options.value?.onConfirm();
    close();
  };

  return { isOpen, open, close, confirm, title, message };
};
