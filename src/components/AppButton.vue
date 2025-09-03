<template>
  <button :class="buttonClasses" :type="type">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonSize } from '@/types/buttonSize';
import type { ButtonType } from '@/types/buttonType';
import type { ButtonVariant } from '@/types/buttonVariant';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    size?: ButtonSize;
    type?: ButtonType;
    variant?: ButtonVariant;
  }>(),
  {
    size: 'default',
    type: 'button',
    variant: 'primary',
  },
);

const buttonClasses = computed<string[]>(() => {
  const baseClasses = 'rounded-lg cursor-pointer';
  let sizeClasses = '';
  let variantClasses = '';

  switch (props.size) {
    case 'small':
      sizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'default':
    default:
      sizeClasses = 'px-4 py-2 text-base';
      break;
  }

  switch (props.variant) {
    case 'secondary':
      variantClasses = 'bg-zinc-100 text-black hover:bg-zinc-300';
      break;
    case 'primary':
    default:
      variantClasses = 'bg-zinc-800 hover:bg-zinc-950 text-white';
      break;
  }

  return [baseClasses, sizeClasses, variantClasses];
});
</script>
