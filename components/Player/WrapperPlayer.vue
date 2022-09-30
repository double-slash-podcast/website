<script setup lang="ts">
import {useStore} from '~~/stores';

const store = useStore();
</script>

<template>
  <LazyPlayer
    :src="store.src"
    :title="store.currentTitle"
    :status="store.statusPlayer"
    @statusChange="store.setStatusPlayer"
  />
</template>
