<script setup lang="ts">
const date = useLocalDate(Date.now(), {
  year: 'numeric',
});
</script>

<template>
  <footer class="relative h-12 bg-purple-800 border-t-4 border-yellowDs">
    <SlashIcon
      size="80"
      class="absolute top-[-50px] left-0 md:left-[20%] sm:left-[10%] fill-yellowDs"
    />
    <div
      class="flex items-center justify-center h-full max-w-2xl m-auto text-xs text-center text-gray-50"
    >
      Copyright DOUBLE-SLASH 2020 -
      {{ date }} - Tous les droits sont réservés.
    </div>
  </footer>
</template>
