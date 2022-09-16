<script setup>

</script>

<template>
    <nuxt-link to="#" class="flex text-center text-white uppercase">
      <div class="w-1/3 text-6xl font-brand text-yellowDs">
        <span class="text-haiti spe">0</span>44
      </div>
      <div class="w-2/3 text-right">
        <h3 class="text-2xl ">titre de l'episode</h3>
        <div class="italic font-light text-gray-400 ">14 Sep 2022</div>
        <div class="flex items-center justify-end space-x-3 text-yellowDs">
          <Icon name="ic:baseline-play-circle-filled-white" size="30"/>
          <p>Ecouter l'episode //</p>
        </div>
      </div>
    </nuxt-link>
</template>

<style>
.spe {
  text-shadow: -2px -2px 0 #9123CB, 2px 2px 0 #9123CB, 2px -2px 0 #9123CB,-2px 2px 0 #9123CB;
}
</style>
