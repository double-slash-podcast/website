<script lang="ts">
/**
 * Markdown <a> renderer. Options API without setup() so ContentRenderer
 * does not wrap it in defineAsyncComponent (SSG hydration keeps a real <a>).
 */
import {defineComponent, type PropType} from 'vue';

const EXTERNAL_HREF =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export default defineComponent({
  name: 'ProseA',
  props: {
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
  },
  computed: {
    /** True when href is an absolute http(s) URL. */
    isExternal(): boolean {
      return EXTERNAL_HREF.test(this.href);
    },
  },
});
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
