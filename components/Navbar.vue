<script setup>
const {path} = useRoute();
const links = [
  {
    title: 'podcasts',
    url: '/podcasts/',
  },
  {
    title: 'Soutenir',
    url: '/nous-soutenir/',
  },
  // {
  //   title: 'contact',
  //   url: '#',
  // },
];
</script>
<template>
  <div
    class="absolute top-0 z-20 flex space-x-4 text-white uppercase bg-transparent left-[50%] -translate-x-[50%]"
  >
    <nuxt-link
      to="/"
      class="px-2 py-2 hover:bg-gray-200 sm:hover:bg-yellowDs sm:hover:text-darkPurple"
      >HOME</nuxt-link
    >
    <nuxt-link
      v-for="{title, url} in links"
      :key="url"
      :to="url"
      class="px-2 py-2 hover:bg-gray-200 sm:hover:bg-yellowDs sm:hover:text-darkPurple"
      :class="{
        'router-link-active router-link-exact-active':
          title === 'podcasts' && path.search('podcasts') > 0,
      }"
      >{{ title }}</nuxt-link
    >
  </div>
</template>

<style scoped>
.router-link-exact-active {
  @apply bg-yellowDs text-darkPurple;
}
</style>
