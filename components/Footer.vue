<template>
  <footer class="relative h-12 bg-purple-800 border-t-4 border-yellowDs">
    <Icon
      name="SlashIcon" 
      size="80" 
      class="absolute top-[-50px] left-0 md:left-[20%] sm:left-[10%] fill-yellowDs"
    />
    <div class="flex items-center justify-center h-full max-w-2xl m-auto text-xs text-gray-50" >
      Copyright DOUBLE-SLASH 2020 - {{ $dayjs(Date.now()).format('YYYY') }} - Tous les droits sont réservés.
    </div>
  </footer>
</template>
