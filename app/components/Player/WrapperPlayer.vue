<script setup lang="ts">
/**
 * Persistent audio bar. Import Player synchronously: LazyPlayer is an async
 * Suspense dependency and Vue 3.5 setRef crashes in production (null owner).
 */
import Player from '~/components/Player/index.vue';
import {usePlayerStore} from '~/stores/player';

const store = usePlayerStore();
</script>

<template>
  <Player
    :src="store.src || ''"
    :ds-slug="store.currentDsSlug || ''"
    :title="store.currentTitle || ''"
    :status="store.statusPlayer || ''"
    @status-change="store.setStatusPlayer"
  />
</template>
