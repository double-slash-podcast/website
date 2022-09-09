<template>
  <main>
    <Header :height="500">
      <template #baseline>
        <h2>le podcast <br class="sm:hidden" />des developpeurs web</h2>
        <p class="font-light text-center text-white">
          par <span class="font-normal">PATRICK FARAMAZ</span> et
          <span class="font-normal">ALEX DUVAL</span>
        </p>
      </template>

      <template #player> <p class="text-white">mon player</p> </template>
    </Header>
    <!-- <List /> -->
  </main>
</template>
