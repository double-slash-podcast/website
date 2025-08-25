<script setup lang="ts">
import type {PropType} from 'vue';

const reg =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<
      | '_blank'
      | '_parent'
      | '_self'
      | '_top'
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false,
  },
});

const isExternal = computed((): boolean => reg.test(props.href));
</script>

<template>
  <NuxtLink
    :href="href"
    :target="isExternal ? '_blank' : '_self'"
    :rel="isExternal ? 'noopener noreferrer' : ''"
  >
    <slot />
  </NuxtLink>
</template>
