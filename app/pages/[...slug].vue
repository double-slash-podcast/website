<script setup>
const {path} = useRoute();
const pathStr = path.replace(/\/+$/, '');
const {
  baseInfos: {siteUrl},
} = useAppConfig();
// custom page are in content/custom
const {data} = await useAsyncData(`${pathStr}`, () =>
  queryCollection('custom').where('path', '=', `/custom${pathStr}`).first(),
);

if (!data.value?.title) {
  throw createError(notFoundErrorOptions);
}

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
  ogUrl: `${siteUrl}${path}`,
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
