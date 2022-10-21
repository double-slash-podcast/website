<script setup lang="ts">
import {usePlayerStore} from '~~/stores/player';

const store = usePlayerStore();
</script>

<template>
  <LazyPlayer
    :src="store.src"
    :title="store.currentTitle"
    :status="store.statusPlayer"
    @statusChange="store.setStatusPlayer"
  />
</template>
