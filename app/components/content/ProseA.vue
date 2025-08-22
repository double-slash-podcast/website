<script setup lang="ts">
/* eslint  no-useless-escape:0 */
const reg =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: false,
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
