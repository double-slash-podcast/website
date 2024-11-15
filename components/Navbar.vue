<script setup>
const {path} = useRoute();
const links = [
  {
    title: 'podcasts',
    url: '/podcasts/',
  },
  {
    title: 'Blog',
    url: '/articles/',
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
    class="z-20 flex justify-center w-full space-x-1 text-white uppercase bg-transparent"
  >
    <nuxt-link
      to="/"
      class="px-4 pt-4 pb-2 sm:hover:border-b-2 sm:hover:border-yellowDs"
      >HOME</nuxt-link
    >
    <nuxt-link
      v-for="{title, url} in links"
      :key="url"
      :to="url"
      class="px-4 pt-4 pb-2 sm:hover:border-b-2 sm:hover:border-yellowDs"
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
  @apply border-b-2 border-yellowDs text-yellowDs;
}
</style>
