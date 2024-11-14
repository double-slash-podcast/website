<script setup lang="ts">
const {
  $config: {
    public: {siteUrl},
  },
} = useNuxtApp();
</script>

<template>
  <HeadingsSection title="Les animateurs">
    <div
      class="flex flex-col items-center w-full px-4 py-8 space-y-12 md:gap-20 md:grid-cols-2 md:space-y-0 md:grid"
    >
      <div class="flex w-10/12 md:w-full md:justify-start">
        <nuxt-img
          :src="`${siteUrl}/assets/pat_picture.jpg`"
          alt="Photo Patrick Faramaz"
          width="160px"
          height="160px"
          loading="lazy"
          decoding="async"
          sizes="xs:128px sm:160px"
          class="w-32 h-32 border-4 border-solid shadow-2xl sm:w-40 sm:h-40 border-yellowDs shadow-purple-500"
        />
        <div class="pl-6 text-left uppercase font-brand">
          <p class="text-5xl text-white">Patrick</p>
          <p class="text-3xl text-gray-400">FARAMAZ</p>
          <div class="space-x-4">
            <NuxtLink
              to="https://twitter.com/PatrickFaramaz"
              target="_blank"
              title="Twitter"
            >
              <Icon
                name="mdi:twitter"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://github.com/ipatate"
              target="_blank"
              title="Github"
            >
              <Icon
                name="mdi:github"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://www.goodmotion.fr/"
              target="_blank"
              title="Goodmotion"
            >
              <Icon
                name="iconoir:www"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex w-10/12 md:w-full md:justify-end md:flex-row-reverse">
        <nuxt-img
          :src="`${siteUrl}/assets/alex_picture.jpg`"
          alt="Photo Alex Duval"
          width="160px"
          height="160px"
          loading="lazy"
          decoding="async"
          sizes="xs:128px sm:160px"
          class="w-32 h-32 border-4 border-solid shadow-2xl sm:w-40 sm:h-40 border-yellowDs shadow-purple-500"
        />
        <div
          class="flex-1 pl-6 text-left uppercase md:pr-6 md:pl-0 md:text-right lg:pl-6 font-brand"
        >
          <p class="text-5xl text-white">Alex</p>
          <p class="text-3xl text-gray-400">DUVAL</p>
          <div class="space-x-4">
            <NuxtLink
              to="https://twitter.com/xlanex6"
              target="_blank"
              title="Twitter"
            >
              <Icon
                name="mdi:twitter"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://github.com/xlanex6"
              target="_blank"
              title="Github"
            >
              <Icon
                name="mdi:github"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
            <NuxtLink
              to="https://www.alexduval.fr/"
              target="_blank"
              title="alexduval.fr"
            >
              <Icon
                name="iconoir:www"
                size="20"
                class="text-gray-400 duration-100 transform fill-gray-400 hover:text-yellowDs hover:scale-125"
              ></Icon>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </HeadingsSection>
</template>
