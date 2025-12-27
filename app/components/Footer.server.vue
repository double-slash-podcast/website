<script setup lang="ts">
const date = useLocalDate(Date.now(), {
  year: 'numeric',
});
</script>

<template>
  <footer class="relative py-4 bg-purple-800 border-t-4 min-h-12 border-yellowDs">
    <SlashIcon
      size="80"
      class="absolute top-[-50px] left-0 md:left-[20%] sm:left-[10%] fill-yellowDs"
    />
    <div
      class="flex flex-col items-center justify-center h-full max-w-2xl gap-2 m-auto text-xs text-center text-gray-50"
    >
      <span>

        Copyright DOUBLE-SLASH 2020 -
        {{ date }} - Tous les droits sont réservés.
      </span>
      <span class="flex items-center gap-4">
        <a href="https://github.com/double-slash-podcast/website" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-1 underline">
          <Icon name="mdi:github" mode="css" size="16" /> Code source du site
        </a><a href="/llms.txt" class="inline-flex underline">llms.txt</a>
      </span>
    </div>
  </footer>
</template>
