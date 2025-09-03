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
    disabled?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    variant?: ButtonVariant;
  }>(),
  {
    disabled: false,
    size: 'default',
    type: 'button',
    variant: 'primary',
  },
);

const buttonClasses = computed<string[]>(() => {
  const baseClasses = 'rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400';
  let sizeClasses = '';
  let variantClasses = '';
  let stateClasses = '';

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
      variantClasses = props.disabled
        ? 'bg-zinc-100 text-black'
        : 'bg-zinc-100 text-black hover:bg-zinc-300';
      break;
    case 'primary':
    default:
      variantClasses = props.disabled
        ? 'bg-zinc-800 text-white'
        : 'bg-zinc-800 hover:bg-zinc-950 text-white';
      break;
  }

  if (props.disabled) {
    stateClasses = 'opacity-50 cursor-not-allowed';
  } else {
    stateClasses = 'cursor-pointer';
  }

  return [baseClasses, sizeClasses, variantClasses, stateClasses];
});
</script>
