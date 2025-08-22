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
      title="accueil"
      class="flex items-center px-4 pt-4 pb-2 border-b-2 border-transparent hover:border-yellowDs"
      ><Icon class="relative w-5 h-5 mr-1 top-[-1px]" name="material-symbols:home" title="Accueil" />//</nuxt-link
    >
    <nuxt-link
      v-for="{title, url} in links"
      :key="url"
      :to="url"
      :title="title"
      class="px-4 pt-4 pb-2 text-sm border-b-2 border-transparent sm:text-base hover:border-yellowDs"
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
  @apply border-yellowDs text-yellowDs;
}
</style>
