<script setup lang="ts">
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/dist/style.css';

defineProps<{
  videoLink: string;
  videoTitle: string;
}>();
</script>

<template>
  <LiteYouTubeEmbed :id="videoLink" :title="videoTitle" />
</template>
