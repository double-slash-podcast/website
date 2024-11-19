<script setup>
const {socialList} = useAppConfig();
</script>

<template>
  <HeadingsSection :dark="dark" title="Rejoignez-nous sur les réseaux sociaux">
    <ul
      class="flex items-center justify-center mt-4 space-x-5 space-y-3 sm:space-x-8"
    >
      <li v-for="(plateform, index) in socialList" :key="plateform.icon">
        <a :href="plateform.href" :title="plateform.title" target="_blank">
          <Icon
            class="w-12 h-12 text-white duration-300 fill-white hover:text-gray-400 hover:-translate-y-2 sm:h-14 sm:w-14"
            :class="{'text-haiti': dark, 'mt-3': index === 0}"
            :name="plateform.icon"
          />
        </a>
      </li>
    </ul>
  </HeadingsSection>
</template>
