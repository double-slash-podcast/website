<script setup lang="ts">
/**
 * Sync shell around the GitHub Sponsors listing.
 * Inner setup awaits `/github-sponsor.json` so SSG HTML includes the block;
 * this Suspense boundary covers episode pages and MDC `::Sponsor`.
 */
import SponsorContent from './SponsorContent.vue';

withDefaults(
  defineProps<{
    withList?: boolean;
  }>(),
  {withList: true},
);
</script>

<template>
  <SponsorContent :with-list="withList" />
</template>
