import {ref, watch, type Ref} from 'vue';

/**
 * Latch SearchModal onto the first open, including when isOpen is already true.
 * A lazy watcher would miss that current value, and a later open() is a no-op.
 */
export function bindSearchModalRender(isOpen: Ref<boolean>): Ref<boolean> {
  const shouldRender = ref(false);

  watch(
    isOpen,
    value => {
      if (value) {
        shouldRender.value = true;
      }
    },
    {immediate: true},
  );

  return shouldRender;
}
