<script setup lang="ts">
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
