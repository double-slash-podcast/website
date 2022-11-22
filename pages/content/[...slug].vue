<script setup>
const {path} = useRoute();
const {data} = await useAsyncData(path, () =>
  queryContent()
    .where({_path: {$eq: path.replace(/\/+$/, '')}})
    .findOne(),
);
if (!data.value?.title) {
  // redirect to 404 page
  navigateTo('/404/pagenotfound');
}
</script>
<template>
  <div class="">
    <Header :height="90"></Header>
    <main>
      <ContentRenderer :value="data" class="prose min-h-[500px] py-6" />
    </main>
  </div>
</template>
