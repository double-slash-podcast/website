<script setup>
const {path} = useRoute();

const {scrollDirection, scrollPosition} = useScrollDirection();

const {wrapperNav, handleOut, handleHover} = useNavAnimation();

const links = [
  {
    title: 'Podcasts',
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
    class="z-20 flex justify-center w-full space-x-1 text-white uppercase fixed top-0 left-0 right-0 pb-1 transition-[colors_transform] duration-300"
    :class="{
      'bg-dark/90': scrollPosition > 70,
      '-translate-y-full': scrollDirection === 'down' && scrollPosition > 140,
      'bg-transparent': scrollPosition <= 70,
    }"
  >
    <div ref="wrapperNav" class="relative flex justify-center pb-2">
      <nuxt-link
        to="/"
        title="accueil"
        class="flex items-center px-4 pt-4 pb-2 animate-link-underline"
        @mouseover="handleHover"
        @mouseleave="handleOut"
        ><Icon
          class="relative w-5 h-5 mr-1 -top-px pointer-events-none"
          name="material-symbols:home"
          title="Accueil"
        />//</nuxt-link
      >
      <nuxt-link
        v-for="{title, url} in links"
        :key="url"
        :to="url"
        :title="title"
        class="px-4 pt-4 pb-2 text-sm sm:text-base animate-link-underline"
        :class="{
          'router-link-active router-link-exact-active':
            (title === 'Podcasts' && path.search('podcasts') > 0) ||
            (title === 'Blog' && path.search('articles') > 0),
        }"
        @mouseover="handleHover"
        @mouseleave="handleOut"
        >{{ title }}</nuxt-link
      >
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
.router-link-exact-active {
  @apply border-primary text-primary;
}
</style>
