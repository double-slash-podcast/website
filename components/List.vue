<template>
  <ul class="flex flex-col">
    <li v-for="podcast in podcasts" :key="podcast.title" class="my-5">
      <ContentRenderer v-if="podcast" :value="podcast" />
    </li>
  </ul>
</template>

<script setup>
const podcasts = await queryCollection('content').path('/podcasts').find();
</script>
