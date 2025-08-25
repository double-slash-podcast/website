<script setup lang="ts">
import {usePlayerStore} from '~/stores/player';

const store = usePlayerStore();
</script>

<template>
  <LazyPlayer
    :src="store.src || ''"
    :title="store.currentTitle || ''"
    :status="store.statusPlayer || ''"
    @status-change="store.setStatusPlayer"
  />
</template>
