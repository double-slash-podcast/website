<script setup lang="ts">
const {public: config} = useRuntimeConfig();
const props = withDefaults(
  defineProps<{
    count: number;
    page?: string;
    path?: string;
  }>(),
  {
    count: 0,
    page: '1',
    path: 'podcasts',
  },
);

const list = Array.from(
  {length: Math.ceil(props.count / config.numberEpisodesList)},
  (_, i) => i + 1,
);
</script>

<template>
  <div class="flex flex-col w-full gap-4">
    <div class="flex items-center justify-end">
      <span class="text-gray-400">{{ props.count }} épisodes</span>
    </div>
    <div class="flex items-center justify-center gap-x-2">
      <NuxtLink
        v-for="pg in list"
        :key="pg"
        :to="`/${path}/${pg > 1 ? pg : ''}`"
        class="px-4 py-2 font-bold transition-opacity rounded hover:opacity-70"
        :class="{
          'bg-purpleDs': pg === +page,
          'text-white': pg === +page,
          'bg-yellowDs': pg !== +page,
        }"
        >{{ pg }}</NuxtLink
      >
    </div>
  </div>
</template>
