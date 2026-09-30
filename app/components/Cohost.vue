<script setup lang="ts">
/**
 * Hosts block on the homepage. Content comes from app config.
 */
const {
  baseInfos: {siteUrl},
  cohosts,
} = useAppConfig();
</script>

<template>
  <HeadingsSection title="Les animateurs du podcast">
    <div
      class="flex flex-col items-center w-full px-4 py-8 space-y-12 md:gap-20 md:grid-cols-2 md:space-y-0 md:grid lg:max-w-3xl mx-auto"
    >
      <div
        v-for="(cohost, index) in cohosts"
        :key="cohost.lastName"
        class="flex w-full"
        :class="
          index === 1 ? 'md:justify-end md:flex-row-reverse' : 'md:justify-start'
        "
      >
        <AppImg
          :src="`${siteUrl}${cohost.picture}`"
          :alt="cohost.alt"
          width="160"
          height="160"
          sizes="xs:128px sm:160px"
          loading="lazy"
          decoding="async"
          class="border-2 rounded-lg border-solid w-40 h-40 border-primary "
        />
        <div
          class="uppercase font-sans"
          :class="
            index === 1
              ? 'flex-1 pl-6 text-left md:pr-6 md:pl-0 md:text-right lg:pl-6'
              : 'pl-6 text-left'
          "
        >
          <p class="text-4xl font-brand text-primary">{{ cohost.firstName }}</p>
          <p class="font-sans text-lg text-white">{{ cohost.lastName }}</p>
          <div
            class="flex flex-col gap-2 items-start mt-2 space-x-4"
            :class="{'lg:justify-end lg:items-end': index === 1}"
          >
            <NuxtLink
              v-for="link in cohost.links"
              :key="link.href"
              :to="link.href"
              target="_blank"
              :title="link.title"
              class="flex text-sm items-center gap-2 m-0 group"
            >
              <Icon
                :name="link.icon"
                size="20"
                class="text-white  duration-100 transform fill-white group-hover:text-primary "
              />
              <span class="text-white group-hover:text-primary">{{ link.title }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </HeadingsSection>
</template>
