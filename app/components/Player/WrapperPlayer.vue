<script setup lang="ts">
/**
 * Always-on audio player shell. Keep Player synchronous (not LazyPlayer):
 * Vue 3.5 SSG hydration throws `Cannot read properties of null (reading 'refs')`
 * when an async component owns the <audio> template ref.
 */
import {usePlayerStore} from '~/stores/player';
import Player from './index.vue';

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
