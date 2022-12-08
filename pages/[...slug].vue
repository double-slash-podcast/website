<script setup>
const {path} = useRoute();
// custom page are in content/custom
const {data} = await useAsyncData(`${path.replace(/\/+$/, '')}`, () =>
  queryContent()
    .where({_path: {$eq: `/custom${path.replace(/\/+$/, '')}`}})
    .findOne(),
);

if (!data.value?.title) {
  // redirect to 404 page
  navigateTo('/_404');
}
useHead({
  title: data.value?.title,
  description: data.value?.description,
});
useSchemaOrg([defineWebPage()]);
</script>
<template>
  <div class="bg-gradient-to-b from-purple-50 to-purple-100">
    <Header :height="160"></Header>
    <main>
      <ContentRenderer :value="data" class="prose min-h-[500px] py-6" />
    </main>
  </div>
</template>
