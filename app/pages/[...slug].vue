<script setup>
const {path} = useRoute();
const pathStr = path.replace(/\/+$/, '');
// custom page are in content/custom
const {data} = await useAsyncData(`${pathStr}`, () =>
  queryCollection('custom').where('path', '=', `/custom${pathStr}`).first(),
);

if (!data.value?.title) {
  // redirect to 404 page
  navigateTo('/_404');
}
useHead({
  title: data.value?.title,
  meta: [
    {
      name: 'description',
      content: data.value?.description,
    },
  ],
});
useSchemaOrg([defineWebPage()]);
</script>
<template>
  <div class="">
    <Header />
    <main class="px-4">
      <ContentRenderer
        v-if="data"
        :value="data"
        class="prose min-h-[500px] py-6"
      />
    </main>
  </div>
</template>
