<script setup lang="ts">
/**
 * Markdown <a> renderer. Lives in global/ so ContentRenderer resolves it
 * synchronously (components/content is local and hydrates via async import).
 */
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

/** True when href is an absolute http(s) URL. */
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
